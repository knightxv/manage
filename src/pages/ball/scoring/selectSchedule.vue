<template>
<div :class="{container: true, 'phone': true}">
  <el-select @change="onSelectChange" v-model="selectMatchId" filterable placeholder="请选择赛事">
    <el-option
      v-for="item in matchs"
      :key="item.id"
      :label="`${item.matchName}[${item.matchAddress}]`"
      :value="item.id"
      class="option-item"
      >
    </el-option>
  </el-select>
  <el-row v-if="schedules.length > 0" type="flex" :gutter="24" style="flex-wrap: wrap;" v-loading="scheduleLoading">
    <template v-if="!inPhone">
      <el-col :span="4" v-for="(scheduleInfo, index) in schedules" :key="index" :offset="1" class="card-wrap">
        <el-card :body-style="{ padding: '0px', paddingBottom: '8px' }">
          <div class="card-title">{{ $app.helps.formatDateBySecTime(scheduleInfo.startTime, 'MM月dd月 HH:mm') }}</div>
          <el-row type="flex" justify="space-around" align="middle">
            <div v-if="scheduleInfo.homeCourtTeam">
              <div class="team-icon-wrap">
                <app-net-img :imgUrl="scheduleInfo.homeCourtTeam.teamIco"></app-net-img>
              </div>
              <p class="team-name">{{ scheduleInfo.homeCourtTeam.teamName }}</p>
            </div>
            <div>
              <div class="vs-icon">
                VS
              </div>
              <el-tag type="success">{{ $app.typeDef.matchStageTypeLab[scheduleInfo.matchStageType] || '比赛中'  }}</el-tag>
            </div>
            <div v-if="scheduleInfo.opponentTeam">
              <div class="team-icon-wrap">
                <app-net-img :imgUrl="scheduleInfo.opponentTeam.teamIco"></app-net-img>
              </div>
              <p class="team-name">{{ scheduleInfo.opponentTeam.teamName }}</p>
            </div>
          </el-row>
          <el-row type="flex" justify="center">
            <el-button @click="goScoringPage(scheduleInfo.id)" type="info" plain>进入计分</el-button>
          </el-row>
        </el-card>
      </el-col>
    </template>
    <div v-else class="phone-card-wrap">
      <div v-for="(scheduleInfo, index) in schedules" :key="index" class="schedule-info-item">
        <div class="left-wrap">
          <div class="info-item">
            <div>{{ $app.helps.formatDateBySecTime(scheduleInfo.startTime, 'MM月dd月') }}</div>
            <div>{{ $app.helps.formatDateBySecTime(scheduleInfo.startTime, 'HH:mm') }}</div>
            <div>{{ $app.typeDef.matchStageTypeLab[scheduleInfo.matchStageType] }}</div>
          </div>
          <div class="info-item">
            <div class="team-name-lab">{{ scheduleInfo.homeCourtTeam.teamName }}</div>
            <div>VS</div>
            <div class="team-name-lab">{{ scheduleInfo.opponentTeam.teamName }}</div>
          </div>
        </div>
        <el-button @click="goScoringPage(scheduleInfo.id)" class="count-button">进入计时</el-button>
      </div>
    </div>
  </el-row>
  <el-row v-else class="empty-tip">
    没有数据
  </el-row>
  <el-col v-if="total" :span="24" class="toolbar">
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="10"
      :total="total"
      style="float:right;"
    >
    </el-pagination>
  </el-col>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiSchedule from '@/services/liveapp/schedule';
import ApiMatch from '@/services/liveapp/match';
import { inPc } from '@/app/system';
@Component
export default class SelectSchedule extends Vue {
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      selectMatchId: '',
      matchs: [],
      schedules: [],
      scheduleLoading: false,
      inPhone: !inPc,
    };
  }
  onSelectChange() {
    this.$data.page = 1;
    this.getSchedules();
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getSchedules();
  }
  mounted() {
    this.getMatchs();
  }
  goScoringPage(scheduleId: string) {
    if (inPc) {
      this.$router.push({ name: 'scoring', params: { scheduleId } });
      return;
    }
    this.$router.push({ name: 'PhoneScoring', params: { scheduleId } });
  }
  async getMatchs() {
    const res = await ApiMatch.matchs({
      pageNum: 0,
      pageSize: 999,
    });
    if (!res.isSuccess) {
      return;
    }
    if (res.data.data.length <= 0) {
      return;
    }
    this.$data.matchs = res.data.data;
    this.$data.selectMatchId = this.$data.matchs[0].id;
    this.getSchedules();
  }
  async getSchedules() {
    const matchId = this.$data.selectMatchId;
    const params = {
      pageNum: this.$data.page - 1,
      pageSize: this.$data.size,
      matchId,
    };
    this.$data.scheduleLoading = true;
    const res = await ApiSchedule.schedules(params);
    this.$data.scheduleLoading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.schedules = res.data.data;
    this.$data.total = res.data.total;
  }
}
</script>

<style scoped lang="less">
.card-title {
  text-align: center;
  color: rgb(37, 75, 118);
  line-height: 40px;
  height: 40px;
  font-size: 16px;
  border-bottom: 1px solid #e9eaec;
  box-shadow: 0 1px 5px 0 rgba(0,0,0,.1);
}
.match-title-name {
  color: #5cc9fd;
  font-size: 1.2rem;
  font-weight: 700;
  padding-left: 30px;
}
.card-wrap {
  margin-top: 20px;
}
.team-icon-wrap {
  margin-top: 5px;
  width: 75px;
  height: 75px;
  display: block;
}
.vs-icon {
  // width: 40px;
  // height: 40px;
  text-align: center;
  padding-bottom: 5px;
}
.team-name {
  max-width: 75px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.empty-tip {
  text-align: center;
  padding: 10px 0;
}
.option-item {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.phone-card-wrap {
  width: 100%;
  margin-top: 10px;
  .schedule-info-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 70px;
    border: 1px solid #ccc;
    border-radius: 5px;
    justify-content: space-between;
    .left-wrap {
      flex: 1;
      .info-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 20px;
        justify-content: space-between;
      }
    }
  }
  .team-name-lab {
    width: 80px;
    padding: 5px 0;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .count-button {
    margin-right: 10px;
  }
}
</style>