<template>
<el-row>
  <!--工具条-->
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-button @click="goAddSchedule" type="primary">添加</el-button>
  </el-col>

  <el-table :data="schedules" highlight-current-row v-loading="loading" style="width: 100%;">
    <el-table-column type="index" width="60">
    </el-table-column>
    <el-table-column prop="matchScheduleName" label="赛程名称" >
    </el-table-column>
    <el-table-column prop="live.id" label="直播间id" >
    </el-table-column>
    <el-table-column prop="live.liveTitle" label="直播间名称" >
    </el-table-column>
    <el-table-column prop="matchStageType" label="赛程阶段" sortable>
    </el-table-column>
    <el-table-column prop="matchType" label="赛程类型" :formatter="matchTypeFormatter" sortable>
    </el-table-column>
    <el-table-column prop="startTime" label="比赛时间" sortable :formatter="$app.formatter.dateSecTime">
    </el-table-column>
    <!-- <el-table-column prop="homeCourtTeamId" label="主场" sortable>
    </el-table-column>
    <el-table-column prop="opponentTeamName" label="客场" sortable>
    </el-table-column> -->
    <!-- <el-table-column prop="viewType" label="是否隐藏" sortable>
    </el-table-column> -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.viewType === 'HIDDEN'"
          size="mini"
          @click="showSchedule(scope.row.id)"
          type="success"
        >显示</el-button>
        <el-button
          v-if="scope.row.viewType === 'SHOW'"
          size="mini"
          @click="hideSchedule(scope.row.id)"
          type="primary"
        >隐藏</el-button>
        <el-button size="mini" type="infor" @click="goEditSchedule(scope.row.id)">编辑</el-button>
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
import ApiSchedule from '@/services/liveapp/schedule';
import { IMatchScheduleInfoItem } from '@/services/apiDataType';
import { matchTypeLabMap } from '@/app/typeDef';
@Component
export default class Schedules extends Vue {
  data() {
    return {
      total: 0,
      page: 1,
      loading: false,
      schedules: [],
    };
  }
  goAddSchedule(scheduleId: number) {
    const matchId = this.$route.params.id;
    this.$router.push({
      path: `/ball/match/detail/${matchId}/addSchedule`,
    });
  }
  goEditSchedule(scheduleId: number) {
    const matchId = this.$route.params.id;
    this.$router.push({
      path: `/ball/match/detail/${matchId}/editSchedule/${scheduleId}`,
    });
  }
  async removeSchedule(id: number) {
    const res = await ApiSchedule.delete(id);
    this.getSchedules();
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
  }
  async showSchedule(scheduleId: number) {
    const res = await ApiSchedule.show(scheduleId);
    this.getSchedules();
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('操作成功');
  }
  async hideSchedule(scheduleId: number) {
    const res = await ApiSchedule.hidden(scheduleId);
    this.getSchedules();
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('操作成功');
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
      pageNum: this.$data.page - 1,
      pageSize: 10,
      matchId,
    };
    this.$data.loading = true;
    const res = await ApiSchedule.schedules(params);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.schedules = res.data.data;
    this.$data.total = res.data.total;
  }
  matchTypeFormatter(row: IMatchScheduleInfoItem) {
    const matchType = row.matchType;
    console.log(matchTypeLabMap);
    if (matchType == null) {
      return '';
    }
    return matchTypeLabMap[matchType];
  }
}
</script>

<style scoped lang="less">
</style>