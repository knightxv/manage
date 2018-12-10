<template>
<div class="container">
  <el-form :model="editForm" label-width="130px" class="form-box" :rules="editFormRules" ref="editForm">
    <el-form-item label="竞猜标题" prop="title">
      <el-input v-model="editForm.title" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="反面名称" prop="tailName">
      <el-input v-model="editForm.tailName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="反面赔率" prop="tailOdds">
      <el-input v-model="editForm.tailOdds" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="正面赔率" prop="headOdds">
      <el-input v-model="editForm.headOdds" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="正面名称" prop="headName">
      <el-input v-model="editForm.headName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="额外说明" prop="remark">
      <el-input v-model="editForm.remark" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="获胜方" prop="gameWinner">
      <el-radio-group v-model="editForm.gameWinner">
        <el-radio
          v-for="type in $app.typeDef.gameWinner"
          :label="type"
          :key="type"
        >{{ $app.typeDef.gameWinnerLabelMap[type] }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="竞猜庄家类型" prop="guessBankerType">
      <el-radio-group v-model="editForm.guessBankerType">
        <el-radio
          v-for="type in $app.typeDef.guessBankerType"
          :label="type"
          :key="type"
        >{{ $app.typeDef.guessBankerTypeLabelMap[type] }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="投注值类型" prop="guessGameValueType">
      <el-radio-group v-model="editForm.guessGameValueType">
        <el-radio
          v-for="type in $app.typeDef.guessGameValueType"
          :label="type"
          :key="type"
        >{{ $app.typeDef.guessGameValueTypeLabelMap[type] }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="封盘时间" prop="guessStopTime">
      <el-date-picker
        v-model="editForm.guessStopTime"
        type="datetime"
        value-format="timestamp"
      ></el-date-picker>
    </el-form-item>
  </el-form>
  <div style="margin-left: 300px;margin-top: 30px;">
    <el-button type="primary" @click.native="addSubmit" :loading="loading">提交</el-button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiGuess from '@/services/cms/guess';
import { guessBankerType, guessGameValueType } from '@/app/typeDef';
@Component
export default class EditGuess extends Vue {
  data() {
    return {
      loading: false,
      editFormRules: {
      },
      editForm: {
      },
    };
  }
  mounted() {
    this.getDetail();
  }
  async getDetail() {
    const { guessId } = this.$route.params;
    const res = await ApiGuess.getGuessDetail(guessId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.editForm = {
      ...res.data,
      guessStopTime: res.data.guessStopTime * 1000,
    };
  }
  addSubmit() {
    (this.$refs.editForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const { guessStopTime } = this.$data.editForm;
      const params = Object.assign({}, this.$data.editForm, {
        guessStopTime: Math.floor(guessStopTime / 1000),
      });
      const res = await ApiGuess.editGuessGame(params);
      if (!res.isSuccess) {
        return;
      }
      this.$router.back();
    });
  }
}
</script>

<style scoped lang="less">
</style>