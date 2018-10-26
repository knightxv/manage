<template>
<div class="container">
  <el-form :model="addForm" label-width="130px" class="form-box" :rules="addFormRules" ref="addForm">
    <el-form-item label="主播名" prop="masterName">
      <el-input v-model="addForm.masterName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="直播标题" prop="liveTitle">
      <el-input v-model="addForm.liveTitle" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="封面" prop="coverImage">
      <app-upload :imgUrl.sync="addForm.coverImage"></app-upload>
    </el-form-item>
    <el-form-item label="预留封面" prop="homeImage">
      <app-upload :imgUrl.sync="addForm.homeImage"></app-upload>
    </el-form-item>
    <el-form-item label="电脑直播播放地址" prop="pcLiveUrl">
      <el-input v-model="addForm.pcLiveUrl" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机直播播放地址" prop="phoneLiveUrl">
      <el-input v-model="addForm.phoneLiveUrl" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="直播简介" prop="liveRemark">
      <el-input v-model="addForm.liveRemark" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="直播类型" prop="liveType">
      <el-radio-group v-model="addForm.liveType">
        <el-radio :label="$app.typeDef.liveType.BASKETBALL">篮球</el-radio>
        <el-radio :label="$app.typeDef.liveType.OTHER">其他</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="人数显示类型" prop="personCountType">
      <el-radio-group v-model="addForm.personCountType">
        <el-radio
          v-for="type in $app.typeDef.personCountType"
          :label="type"
          :key="type"
        >
          {{ $app.typeDef.personCountTypeLabMap[type] }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="addForm.personCountType == $app.typeDef.personCountType.CLICK" label="点击倍数" prop="clickMultiply">
      <el-input v-model="addForm.clickMultiply" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="addForm.personCountType == $app.typeDef.personCountType.REAL" label="在线人数倍数" prop="clickMultiply">
      <el-input v-model="addForm.onlineMultiply" auto-complete="off"></el-input>
    </el-form-item>
    <template v-if="addForm.personCountType === $app.typeDef.personCountType.VIRTUAL">
      <el-form-item label="最高人数" prop="personCountMax">
        <el-input v-model="addForm.personCountMax" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="最低人数" prop="personCountMin">
        <el-input v-model="addForm.personCountMin" auto-complete="off"></el-input>
      </el-form-item>
    </template>
    <el-form-item label="微信分享图标" prop="wechatShareIco">
      <app-upload :imgUrl.sync="addForm.wechatShareIco"></app-upload>
    </el-form-item>
    <el-form-item label="微信分享详情" prop="wechatShareRemark">
      <el-input v-model="addForm.wechatShareRemark" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="微信分享标题" prop="wechatShareTitle">
      <el-input v-model="addForm.wechatShareTitle" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div>
    <el-button type="primary" @click.native="addSubmit" :loading="loading">提交</el-button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiLive from '@/services/liveapp/live';
@Component
export default class AddLive extends Vue {
  data() {
    return {
      loading: false,
      addFormVisible: false,
      addLoading: false,
      addFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      addForm: {},
    };
  }
  addSubmit() {
    (this.$refs.addForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      this.$data.addLoading = true;
      const params = this.$data.addForm;
      const res = await ApiLive.create(params);
      this.$data.addLoading = false;
      if (!res.isSuccess) {
        return;
      }
      this.$data.addFormVisible = false;
      this.$router.back();
      this.$message.success('新增成功');
      this.resetAddForm();
    });
  }
  resetAddForm() {
    this.$data.addForm = {
      personCountType: this.$app.typeDef.personCountType.VIRTUAL,
      liveType: this.$app.typeDef.liveType.BASKETBALL,
    };
  }
  mounted() {
    this.resetAddForm();
  }
}
</script>

<style scoped lang="less">

</style>