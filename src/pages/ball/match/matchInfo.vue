<template>
  <div>
    <p>赛事名称: {{ matchInfo.matchName }}</p>
    <p>承包商: {{ matchInfo.matchUndertake }}</p>
    <p>冠名商: {{ matchInfo.namingQuotient }}</p>
    <p>主办方: {{ matchInfo.matchHost }}</p>
    <p>赛事地点: {{ matchInfo.matchAddress }}</p>
    <p>状态: {{ matchInfo.enabled ? '已上架' : '未上架' }}</p>
    <div>封面图: 
      <div class="match-cover-img-wrap">
        <app-net-img :imgUrl="matchInfo.mainImage" alt=""></app-net-img>
      </div>
    </div>
    <p>
      报名时间: 
      {{ $app.helps.formatDateBySecTime(matchInfo.startSignUpTime) }}
      ~ 
      {{ $app.helps.formatDateBySecTime(matchInfo.endSignUpTime) }}
    </p>
    <p>
      比赛时间: 
      {{ $app.helps.formatDateBySecTime(matchInfo.startMatchTime) }}
      ~ 
      {{ $app.helps.formatDateBySecTime(matchInfo.endMatchTime) }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiMatch from '@/services/liveapp/match';
@Component
export default class MatchDetailInfo extends Vue {
  data() {
    return {
      matchInfo: {},
    };
  }
  mounted() {
    this.getMatchDetail();
  }
  async getMatchDetail() {
    const matchId = +this.$route.params.id;
    if (isNaN(matchId)) {
      this.$message.error('传入参数有误');
      // this.$router.back();
      return;
    }
    const res = await ApiMatch.getMatch(matchId);
    if (!res.isSuccess) {
      return;
    }
    const data = res.data;
    this.$data.editForm = res.data;
    if (!res.isSuccess) {
      return;
    }
    this.$data.matchInfo = res.data;
  }
}
</script>

<style scoped lang="less">
.match-cover-img-wrap{
  width: 180px;
  height: 120px;
  overflow: hidden;
  margin-right: 20px;
}
</style>