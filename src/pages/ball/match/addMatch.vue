<template>
<div class="container">
  <el-form :model="addForm" label-width="130px" class="form-box" :rules="addFormRules" ref="addForm">
    <el-form-item label="赛事名称" prop="matchName">
      <el-input v-model="addForm.matchName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="赛事地点" prop="matchAddress">
      <el-input v-model="addForm.matchAddress" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="封面" prop="mainImage">
      <app-upload :imgUrl.sync="addForm.mainImage"></app-upload>
    </el-form-item>
    <el-form-item label="主办方" prop="matchHost">
      <el-input v-model="addForm.matchHost" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="承包商" prop="matchUndertake">
      <el-input v-model="addForm.matchUndertake" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="冠名商" prop="namingQuotient">
      <el-input v-model="addForm.namingQuotient" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="面板排序" prop="tabOrder">
      <el-input v-model="addForm.tabOrder" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="报名时间" prop="signUpTime">
      <el-date-picker
        v-model="signUpTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="timestamp"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="比赛时间" prop="matchTime">
      <el-date-picker
        v-model="matchTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
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
import ApiMatch from '@/services/liveapp/match';
@Component
export default class AddMatch extends Vue {
  data() {
    return {
      loading: false,
      addFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      signUpTime: [],
      matchTime: [],
      addForm: {},
    };
  }
  addSubmit() {
    (this.$refs.addForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      let [startSignUpTime, endSignUpTime] = this.$data.signUpTime;
      let [startMatchTime, endMatchTime] = this.$data.matchTime;
      startSignUpTime /= 1000;
      endSignUpTime /= 1000;
      startMatchTime /= 1000;
      endMatchTime /= 1000;
      const params = Object.assign({}, this.$data.addForm, {
        startSignUpTime, endSignUpTime, startMatchTime, endMatchTime,
      });
      this.$data.loading = true;
      const res = await ApiMatch.create(params);
      this.$data.loading = false;
      if (!res.isSuccess) {
        return;
      }
      this.$router.back();
      this.$message.success('新增成功');
    });
  }
}
</script>

<style scoped lang="less">

</style>