<template>
<div>
  <el-form :model="addForm" label-width="130px" class="form-box" :rules="addFormRules" ref="addForm">
    <el-form-item label="赛程名称" prop="matchScheduleName">
      <el-input v-model="addForm.matchScheduleName" auto-complete="off"></el-input>
    </el-form-item>
    
    <el-form-item label="比赛地点" prop="matchAddress">
      <el-input v-model="addForm.matchAddress" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="主场球队" prop="homeCourtTeamId">
      <el-select v-model="addForm.homeCourtTeamId" filterable placeholder="请选择主场球队">
        <el-option
          v-for="item in teams"
          :key="item.id"
          :label="`${item.teamName}[${item.matchGroup}]`"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="客场球队" prop="opponentTeamId">
      <el-select v-model="addForm.opponentTeamId" filterable placeholder="请选择客场球队">
        <el-option
          v-for="item in teams"
          :key="item.id"
          :label="`${item.teamName}[${item.matchGroup}]`"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="直播间" prop="liveId">
      <el-select v-model="addForm.liveId" filterable placeholder="请选择绑定的直播间">
        <el-option
          v-for="item in lives"
          :key="item.id"
          :label="`${item.liveTitle}[${item.masterName}]`"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="比赛时间" prop="startTime">
      <el-date-picker
        v-model="startTime"
        type="datetime"
        value-format="timestamp"
      ></el-date-picker>
    </el-form-item>
  </el-form>
  <div style="margin-left: 60px;margin-top: 30px;">
    <el-button type="primary" @click.native="addSubmit" :loading="loading">提交</el-button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiSchedule from '@/services/liveapp/schedule';
import ApiLive from '@/services/liveapp/live';
import ApiTeam from '@/services/liveapp/team';
@Component
export default class AddSchedule extends Vue {
  data() {
    return {
      loading: false,
      addFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      addForm: {},
      teams: [],
      lives: [],
      startTime: new Date().getTime(),
    };
  }
  addSubmit() {
    (this.$refs.addForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const params = Object.assign({}, this.$data.addForm, {
        startTime: this.$data.startTime / 1000,
      });
      this.$data.loading = true;
      const res = await ApiSchedule.create(params);
      this.$data.loading = false;
      if (!res.isSuccess) {
        return;
      }
      this.$router.back();
      this.$message.success('新增成功');
    });
  }
  mounted() {
    this.reSetAddForm();
    this.getLives();
    this.getTeams();
  }
  async getLives() {
    const res = await ApiLive.lives({
      pageNum: 0,
      pageSize: 999,
    });
    if (!res.isSuccess) {
      return;
    }
    this.$data.lives = res.data.data;
  }
  async getTeams() {
    const matchId = this.$route.params.id;
    const res = await ApiTeam.teams({
      pageNum: 0,
      pageSize: 999,
      matchId: +matchId,
    });
    if (!res.isSuccess) {
      return;
    }
    this.$data.teams = res.data.data;
  }
  reSetAddForm() {
    const matchId = this.$route.params.id;
    this.$data.addForm = {
      matchId,
    };
  }
}
</script>

<style scoped lang="less">
</style>