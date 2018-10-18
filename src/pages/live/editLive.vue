<template>
<div class="container">
  <el-form :model="editForm" label-width="130px" class="form-box" :rules="editFormRules" ref="editForm">
    <el-form-item label="主播名" prop="masterName">
      <el-input v-model="editForm.masterName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="直播标题" prop="liveTitle">
      <el-input v-model="editForm.liveTitle" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="封面" prop="coverImage">
      <app-upload :imgUrl.sync="editForm.coverImage"></app-upload>
    </el-form-item>
    <el-form-item label="预留封面" prop="homeImage">
      <app-upload :imgUrl.sync="editForm.homeImage"></app-upload>
    </el-form-item>
    <el-form-item label="电脑直播播放地址" prop="pcLiveUrl">
      <el-input v-model="editForm.pcLiveUrl" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机直播播放地址" prop="phoneLiveUrl">
      <el-input v-model="editForm.phoneLiveUrl" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="直播简介" prop="liveRemark">
      <el-input v-model="editForm.liveRemark" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="直播类型" prop="liveType">
      <el-radio-group v-model="editForm.liveType">
        <el-radio :label="$app.typeDef.liveType.BASKETBALL">篮球</el-radio>
        <el-radio :label="$app.typeDef.liveType.OTHER">其他</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="人数显示类型" prop="personCountType">
      <el-radio-group v-model="editForm.personCountType">
        <el-radio
          v-for="type in $app.typeDef.personCountType"
          :label="type"
          :key="type"
        >
          {{ $app.typeDef.personCountTypeLabMap[type] }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
     <el-form-item v-if="editForm.personCountType == $app.typeDef.personCountType.CLICK" label="点击倍数" prop="clickMultiply">
      <el-input v-model="editForm.clickMultiply" auto-complete="off"></el-input>
    </el-form-item>
    <template v-if="editForm.personCountType === $app.typeDef.personCountType.VIRTUAL">
      <el-form-item label="最高人数" prop="personCountMax">
        <el-input v-model="editForm.personCountMax" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="最低人数" prop="personCountMin">
        <el-input v-model="editForm.personCountMin" auto-complete="off"></el-input>
      </el-form-item>
    </template>
    <el-form-item label="微信分享图标" prop="wechatShareIco">
      <app-upload :imgUrl.sync="editForm.wechatShareIco"></app-upload>
    </el-form-item>
    <el-form-item label="微信分享详情" prop="wechatShareRemark">
      <el-input v-model="editForm.wechatShareRemark" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="微信分享标题" prop="wechatShareTitle">
      <el-input v-model="editForm.wechatShareTitle" auto-complete="off"></el-input>
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
export default class EditLive extends Vue {
  data() {
    return {
      loading: false,
      editFormVisible: false,
      editFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      editForm: {},
    };
  }
  addSubmit() {
    (this.$refs.editForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      this.$data.loading = true;
      const params = this.$data.editForm;
      const res = await ApiLive.edit(params);
      this.$data.loading = false;
      if (!res.isSuccess) {
        return;
      }
      this.$message.success('修改成功');
      this.$router.back();
    });
  }
  async setFormInfo() {
    const liveId = +this.$route.params.id;
    if (isNaN(liveId)) {
      this.$message.error('传入参数有误');
      this.$router.back();
      return;
    }
    const res = await ApiLive.getLive(liveId);
    if (!res.isSuccess) {
      return;
    }
    const data = res.data;
    this.$data.editForm = res.data;
  }
  mounted() {
    this.setFormInfo();
  }
}
</script>

<style scoped lang="less">

</style>