<template>
<div class="home">
  实时在线观看人数：{{ onlineCount }}
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UPDATE_LIVE_COUNT_TIME_INTERVAL } from '@/app/config';
import ApiSocket from '@/services/common/socket';

@Component
export default class AllCount extends Vue {
  // @Getter(MY_USER_NAME) userName!: string;
  // @State userInfo!: IUserInfoState;
  liveCountTimer!: any;
  public data() {
    return {
      onlineCount: 0,
    };
  }
  mounted() {
    this.updateCountUser();
    this.setTimerToShowLiveUserCount();
  }
  /** 更新在线直播人数 */
  async updateCountUser() {
    const res = await ApiSocket.getAllOnlineCount();
    if (!res.isSuccess) {
      this.clearTimerToShowLiveUserCount();
      return;
    }
    this.$data.onlineCount = res.data;
  }
  setTimerToShowLiveUserCount() {
    this.clearTimerToShowLiveUserCount();
    this.liveCountTimer = setTimeout(() => {
      this.updateCountUser();
      this.setTimerToShowLiveUserCount();
    }, UPDATE_LIVE_COUNT_TIME_INTERVAL * 1000);
  }
  clearTimerToShowLiveUserCount() {
    if (this.liveCountTimer == null) {
      return;
    }
    clearTimeout(this.liveCountTimer);
  }
  destroyed() {
    this.clearTimerToShowLiveUserCount();
  }
}
</script>

<style scoped lang="less">
</style>