<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <router-link :to="{name: 'CreateMatchVideo'}">
            <el-button type="primary">添加</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="videoList" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column prop="id" label="id" >
      </el-table-column>
      <el-table-column prop="matchVideoType" label="录播类型" :formatter="matchVideoTypeFormatter" >
      </el-table-column>
      <el-table-column prop="videoTitle" label="视频标题" sortable>
      </el-table-column>
      <el-table-column prop="videoIntroduction" label="视频介绍" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="goEditPage(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteVideo(scope.$index,scope.row)">删除</el-button>
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
import ApiMatchVideo from '@/services/liveapp/matchVideo';
// import { ILiveInfoItem } from '@/services/apiDataType';
// import { personCountType } from '@/app/typeDef';
@Component
export default class MatchVideoList extends Vue {
  data() {
    return {
      filters: {
        name: '',
      },
      videoList: [],
      loading: true,
      total: 0,
      page: 1,
      limit: 10,
    };
  }
  async getList() {
    const id = this.$route.params.id;
    const params = {
      pageNum: this.$data.page - 1,
      pageSize: 10,
      matchId: id,
      // matchVideoType
    };
    this.$data.loading = true;
    const res = await ApiMatchVideo.videoList(params);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.total = res.data.total;
    this.$data.videoList = res.data.data;
  }
  async goEditPage(videoId: number) {
    this.$router.push({ name: 'EditMatchVideo', params: { videoId: String(videoId) } });
  }
  async deleteVideo(index: number, row: any) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiMatchVideo.deleteVideo(row.id);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.reLoadInfo();
  }
  matchVideoTypeFormatter(row: any) {
    const matchVideoType = row.matchVideoType;
    if (matchVideoType === 'MATCH_RECORD') {
      return '比赛录像';
    }
    if (matchVideoType === 'MATCH_MOMENTS') {
      return '精彩集锦';
    }
  }
  mounted() {
    this.reLoadInfo();
  }
  reLoadInfo() {
    this.getList();
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getList();
  }
}
</script>

<style scoped lang="less">

</style>