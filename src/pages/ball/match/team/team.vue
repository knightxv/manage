<template>
<el-row>
  <!--工具条-->
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-button @click="goAddTeam" type="primary">添加</el-button>
  </el-col>

  <el-table :data="teams" highlight-current-row v-loading="loading" style="width: 100%;">
    <el-table-column type="index" width="60">
    </el-table-column>
    <el-table-column prop="id" label="id" >
    </el-table-column>
    <el-table-column prop="matchGroup" label="赛事组" >
    </el-table-column>
    <el-table-column prop="teamCoachName" label="教练名" >
    </el-table-column>
    <el-table-column prop="teamName" label="队名" sortable>
    </el-table-column>
    <el-table-column prop="teamPoints" label="队伍积分">
      <template slot-scope="scope">
        <div v-if="editScoreId == scope.row.id"><el-input v-model="teamPoints" placeholder="请输入积分"></el-input></div>
        <div v-else>{{ scope.row.teamPoints }}</div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="warning" v-if="!editScoreId" @click="editTeamScore(scope.row.id, scope.row.teamPoints)">修改积分</el-button>
        <el-button size="mini" type="primary" v-if="editScoreId == scope.row.id" @click="confirmEditTeamScore(scope.row.id)">确认修改</el-button>
        <el-button size="mini" @click="goEdit(scope.row.id)">编辑</el-button>
        <el-button size="mini" type="danger" @click="removeSchedule(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-col :span="24" class="toolbar">
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="10"
      :total="total"
      style="float:right;"
    >
    </el-pagination>
  </el-col>
</el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiTeam from '@/services/liveapp/team';
@Component
export default class Team extends Vue {
  data() {
    return {
      total: 0,
      page: 0,
      loading: false,
      editScoreId: null, // 目前哪个队伍正在修改积分
      teamPoints: null,
      teams: [],
    };
  }
  goAddTeam() {
    const id = this.$route.params.id;
    this.$router.push({
      path: `/ball/match/detail/${id}/addTeam`,
    });
  }
  editTeamScore(teamId: number, teamPoints: number) {
    this.$data.editScoreId = teamId;
    this.$data.teamPoints = teamPoints;
  }
  async confirmEditTeamScore() {
    const res = await ApiTeam.editMatchTeamPoints({
      id: this.$data.editScoreId,
      teamPoints: this.$data.teamPoints,
    });
    this.getSchedules();
    if (res.isSuccess) {
      this.$message.success('修改积分成功');
    }
    this.$data.editScoreId = null;
    this.$data.teamPoints = null;
  }
  goEdit(scheduleId: number) {
    const matchId = this.$route.params.id;
    this.$router.push({
      path: `/ball/match/detail/${matchId}/editTeam/${scheduleId}`,
    });
  }
  async removeSchedule(id: number) {
    const res = await ApiTeam.delete(id);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.getSchedules();
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getSchedules();
  }
  mounted() {
    this.getSchedules();
  }
  async getSchedules() {
    const matchId = +this.$route.params.id;
    const params = {
      pageNum: this.$data.page,
      pageSize: 10,
      matchId,
    };
    this.$data.loading = true;
    const res = await ApiTeam.teams(params);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.teams = res.data.data;
    this.$data.total = res.data.total;
  }
}
</script>

<style scoped lang="less">
</style>