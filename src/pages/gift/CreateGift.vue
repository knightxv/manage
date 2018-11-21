<template>
<div class="container">
  <el-form :model="addForm" label-width="130px" class="form-box" :rules="addFormRules" ref="addForm">
    <el-form-item label="礼物名称" prop="giftName">
      <el-input v-model="addForm.giftName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="礼物排序" prop="giftOrder">
      <el-input v-model="addForm.giftOrder" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="特效类型" prop="selectEffectType">
      <el-radio-group v-model="addForm.webMark">
        <el-radio
          v-for="item in $app.typeDef.giftEffectType"
          :label="item"
          :key="item"
        >
          {{ $app.typeDef.giftEffectTypeMap[item] }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="礼物价格(分)" prop="giftPrice">
      <el-input type="number" v-model="addForm.giftPrice" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="赠送礼物经验奖励" prop="experienceReward">
      <el-input type="number" v-model="addForm.experienceReward" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="积分奖励" prop="bonusPointReward">
      <el-input type="number" v-model="addForm.bonusPointReward" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="支持率上升点数" prop="supportReward">
      <el-input type="number" v-model="addForm.supportReward" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="礼物赠送限制" prop="giftProceType">
      <el-radio-group v-model="giveLimit">
        <el-radio :label="false">无限</el-radio>
        <el-radio :label="true">限制次数</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="giveLimit" label="比赛可赠送次数" prop="useLimit">
      <el-input type="number" v-model="addForm.useLimit" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="礼物图标" prop="giftIco">
      <app-upload :imgUrl.sync="addForm.giftIco"></app-upload>
    </el-form-item>
    <el-form-item label="礼物特效图标" prop="dynamicGiftIco">
      <app-upload :imgUrl.sync="addForm.dynamicGiftIco"></app-upload>
    </el-form-item>
    <el-form-item label="礼物价格类型" prop="giftPriceType">
      <el-radio-group v-model="addForm.giftPriceType">
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
import { giftPriceType, giftEffectType } from '@/app/typeDef';
@Component
export default class CreateGift extends Vue {
  data() {
    return {
      loading: false,
      giveLimit: false,
      addFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      addForm: {
        giftPriceType: giftPriceType.BONUS_POINT,
        useLimit: -1,
        webMark: giftEffectType.NORMAL_EFFECT,
      },
    };
  }
  addSubmit() {
    (this.$refs.addForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const { giveLimit } = this.$data;
      const params = Object.assign({}, this.$data.addForm);
      if (!giveLimit) {
        params.useLimit = -1;
      }
      const res = await ApiGift.createGift(params);
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