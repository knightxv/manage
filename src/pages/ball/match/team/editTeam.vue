<template>
<div>
  <el-form :model="editForm" label-width="130px" class="form-box" :rules="editFormRules" ref="editForm">
    <el-form-item label="队名" prop="teamName">
      <el-input v-model="editForm.teamName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="教练名" prop="teamCoachName">
      <el-input v-model="editForm.teamCoachName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="赛事组" prop="matchGroup">
      <el-input v-model="editForm.matchGroup" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="队标" prop="teamIco">
      <app-upload :imgUrl.sync="editForm.teamIco"></app-upload>
    </el-form-item>
    <el-form-item label="队伍宣传图" prop="teamImage">
      <app-upload :imgUrl.sync="editForm.teamImage"></app-upload>
    </el-form-item>
  </el-form>
  <div style="margin-left: 60px;margin-top: 30px;">
    <el-button type="primary" @click.native="editSubmit" :loading="loading">提交</el-button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiMatch from '@/services/liveapp/match';
import ApiTeam from '@/services/liveapp/team';
import { ITeamPlayerVOs } from '@/services/apiDataType';

@Component
export default class EditTeam extends Vue {
  data() {
    return {
      loading: false,
      editFormRules: {},
      editForm: {},
    };
  }
  editSubmit() {
    (this.$refs.editForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const params = this.$data.editForm;
      this.$data.loading = true;
      const res = await ApiTeam.edit(params);
      this.$data.loading = false;
      if (!res.isSuccess) {
        return;
      }
      this.$router.back();
      this.$message.success('新增成功');
    });
  }
  mounted() {
    this.reSeteditForm();
  }
  async reSeteditForm() {
    const { id, scheduleId } = this.$route.params;
    if (isNaN(+scheduleId)) {
      return;
    }
    const res = await ApiTeam.getTeam(+scheduleId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.editForm = {
      ...res.data,
    };
  }
}
</script>

<style scoped lang="less">
.box-card {
  margin-left: 50px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.player-list-item {
  padding-bottom: 10px;
  border-bottom: 1px solid #e9eaec;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>