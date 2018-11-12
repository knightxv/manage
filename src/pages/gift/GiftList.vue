<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-button @click="goAddPage" type="primary">添加礼物</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="list" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column prop="id" label="id" >
      </el-table-column>
      <el-table-column prop="giftName" label="礼物名称">
      </el-table-column>
      <el-table-column prop="giftPrice" label="礼物价格(分)">
      </el-table-column>
      <el-table-column prop="bonusPointReward" label="积分奖励">
      </el-table-column>
      <el-table-column prop="experienceReward" label="赠礼经验奖励">
      </el-table-column>
      <el-table-column prop="giftProceType" label="礼物价格类型" :formatter="priceTypeFormatter">
      </el-table-column>
      <el-table-column prop="supportReward" label="支持率上升点数">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="goEditPage(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="removeVideo(scope.row.id)">删除</el-button>
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
import ApiGift from '@/services/liveapp/gift';
import { giftPriceTypeLabMap } from '@/app/typeDef';
@Component
export default class GiftList extends Vue {
  data() {
    return {
      filters: {
        name: '',
      },
      list: [],
      loading: false,
      total: 0,
      page: 1,
      limit: 10,
    };
  }
  mounted() {
    this.getList();
  }
  priceTypeFormatter(row: any) {
    if (row == null) {
      return;
    }
    const { giftPriceType } = row;
    return giftPriceTypeLabMap[giftPriceType];
  }
  goAddPage() {
    this.$router.push({ name: 'CreateGift' });
  }
  goEditPage(giftId: string) {
    this.$router.push({ name: 'EditGift', params: { giftId } });
  }
  async getList() {
    const params = {
      pageNum: this.$data.page - 1,
      pageSize: 10,
    };
    this.$data.loading = true;
    const res = await ApiGift.giftList(params);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.total = res.data.total;
    this.$data.list = res.data.data;
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getList();
  }
  async removeVideo(giftId: number) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiGift.deleteGift(giftId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.getList();
  }
}
</script>

<style scoped lang="less">
</style>