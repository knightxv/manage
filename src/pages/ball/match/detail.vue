<template>
<el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
  <el-tab-pane v-for="item in tabs" lazy :label="item.label" :name="item.name" :key="item.name">
    <router-view v-if="item.name === activeName"></router-view>
  </el-tab-pane>
  <!-- <el-tab-pane label="球队管理" name="team">
    <router-view></router-view>
  </el-tab-pane> -->
</el-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import ApiMatch from '@/services/liveapp/match';
// import matchInfo from './matchInfo.vue';
// import matchSchedules from './schedule/schedules.vue';
// // import matchInfo from './Team.vue';
@Component
export default class MatchDetail extends Vue {
  data() {
    return {
      activeName: '',
      tabs: [
        {
          label: '赛事信息',
          name: 'info',
        },
        {
          label: '赛程列表',
          name: 'schedule',
        },
        {
          label: '球队管理',
          name: 'team',
        },
      ],
    };
  }
  handleClick(tab: any, event: any) {
    this.goTabPath(tab.name);
  }
  goTabPath(tabName: string) {
    const id = this.$route.params.id;
    this.$router.replace({ path: `/ball/match/detail/${id}/${tabName}` });
  }
  mounted() {
    // const {id, tabName} = this.$route.params;
    const tabName = this.$route.meta.tabName || 'info';
    this.$data.activeName = tabName;
    // const tabName = this.$route.hash.replace('#', '') || 'detail';
    // this.goTabPath(tabName);
  }
}
</script>

<style scoped lang="less">

</style>