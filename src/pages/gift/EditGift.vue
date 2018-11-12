<template>
<div class="container">
  <el-form :model="editForm" label-width="130px" class="form-box" :rules="editFormRules" ref="editForm">
    <el-form-item label="礼物名称" prop="giftName">
      <el-input v-model="editForm.giftName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="礼物排序" prop="giftOrder">
      <el-input v-model="editForm.giftOrder" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="前端标记" prop="webMark">
      <el-input v-model="editForm.webMark" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="礼物价格(分)" prop="giftPrice">
      <el-input type="number" v-model="editForm.giftPrice" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="赠送礼物经验奖励" prop="experienceReward">
      <el-input type="number" v-model="editForm.experienceReward" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="积分奖励" prop="bonusPointReward">
      <el-input type="number" v-model="editForm.bonusPointReward" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="支持率上升点数" prop="supportReward">
      <el-input type="number" v-model="editForm.supportReward" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="礼物赠送限制" prop="giftProceType">
      <el-radio-group v-model="giveLimit">
        <el-radio :label="false">无限</el-radio>
        <el-radio :label="true">限制次数</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="giveLimit" label="比赛可赠送次数" prop="useLimit">
      <el-input type="number" v-model="editForm.useLimit" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="礼物图标" prop="giftIco">
      <app-upload :imgUrl.sync="editForm.giftIco"></app-upload>
    </el-form-item>
    <el-form-item label="礼物价格类型" prop="giftPriceType">
      <el-radio-group v-model="editForm.giftPriceType">
        <el-radio
          v-for="item in $app.typeDef.giftPriceType"
          :label="item"
          :key="item"
        >
          {{ $app.typeDef.giftPriceTypeLabMap[item] }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
  <div style="margin-left: 300px;margin-top: 30px;">
    <el-button type="primary" @click.native="addSubmit" :loading="loading">提交</el-button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiGift from '@/services/liveapp/gift';
import { giftPriceType } from '@/app/typeDef';
@Component
export default class EditGift extends Vue {
  data() {
    return {
      loading: false,
      giveLimit: false,
      editFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      editForm: {
        giftPriceType: giftPriceType.BONUS_POINT,
      },
    };
  }
  addSubmit() {
    (this.$refs.editForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const { giveLimit } = this.$data;
      const params = Object.assign(this.$data.editForm);
      if (!giveLimit) {
        params.useLimit = -1;
      }
      const res = await ApiGift.editGift(params);
      if (!res.isSuccess) {
        return;
      }
      this.$router.back();
    });
  }
  mounted() {
    this.getGift();
  }
  async getGift() {
    const { giftId } = this.$route.params;
    const res = await ApiGift.getGiftDetail(giftId);
    if (!res.isSuccess || res.data == null) {
      return;
    }
    this.$data.editForm = res.data;
    this.$data.giveLimit = +res.data.useLimit !== -1;
  }
}
</script>

<style scoped lang="less">
</style>