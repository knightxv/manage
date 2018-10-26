<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <router-link to="/live/addLive">
            <el-button type="primary">添加</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="lives" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="id" label="id" >
      </el-table-column>
      <el-table-column prop="liveTitle" label="直播间名称" >
      </el-table-column>
      <el-table-column prop="masterName" label="主播名" sortable>
      </el-table-column>
      <el-table-column prop="liveType" label="直播间类型" sortable>
      </el-table-column>
      <!-- <el-table-column prop="personCountType" :formatter="personCountTypeFormatter" label="人数显示类型" sortable>
      </el-table-column> -->
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" @click="goLiveDetailPage(scope.row.id)">操作</el-button>
          <el-button size="mini" type="danger" @click="removeLive(scope.$index,scope.row)">删除</el-button>
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
import ApiLive from '@/services/liveapp/live';
import { ILiveInfoItem } from '../../services/apiDataType';
import { personCountType } from '@/app/typeDef';
@Component
export default class Lives extends Vue {
  data() {
    return {
      filters: {
        name: '',
      },
      lives: [],
      loading: true,
      total: 0,
      page: 1,
      limit: 10,
    };
  }
  async getLives() {
    const params = {
      pageNum: this.$data.page - 1,
      pageSize: 10,
    };
    this.$data.loading = true;
    const res = await ApiLive.lives(params);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.total = res.data.total;
    this.$data.lives = res.data.data;
  }
  async showEditDialog(index: number, row: any) {
    this.$router.push({
      name: 'editLive',
      params: {
        id: row.id,
      },
    });
    this.$data.editFormVisible = true;
    this.$data.editForm = Object.assign({}, row);
  }
  async removeLive(index: number, row: any) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiLive.delete(row.id);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.reLoadInfo();
  }
  goLiveDetailPage(liveId: string) {
    this.$router.push({
      name: 'LiveDetail',
      params: {
        liveId,
      },
    });
  }
  mounted() {
    this.reLoadInfo();
  }
  reLoadInfo() {
    this.getLives();
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getLives();
  }
  personCountTypeFormatter(row: ILiveInfoItem) {
    if (row.personCountType === this.$app.typeDef.personCountType.REAL) {
      return '真实';
    }
    if (row.personCountType === this.$app.typeDef.personCountType.VIRTUAL) {
      return '虚假';
    }
    return '未知';
  }
}
</script>

<style scoped lang="less">

</style>