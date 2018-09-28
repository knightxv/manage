<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-main">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="原密码">
          <el-input v-model="form.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="form.confirmPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="handleChangepwd">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class UserChangePwd extends Vue {
    data() {
      return {
        form: {
          oldPwd: '',
          newPwd: '',
          confirmPwd: '',
        },
      };
    }
    handleChangepwd() {
        this.$message('此功能只是让你看看，不会开发！');
    }
}
</script>

<style scoped lang="less">
</style>