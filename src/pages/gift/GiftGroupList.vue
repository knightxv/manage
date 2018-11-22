<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-button @click="addFormVisible = true" type="primary">添加礼物组</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="list" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column prop="id" label="id" >
      </el-table-column>
      <el-table-column prop="supportGiftGroupName" label="礼物组名称">
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editGiftList(scope.row.id)">修改礼物</el-button>
          <el-button size="mini" type="primary" @click="showEditDialog(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
        <el-form-item label="礼物组名称" prop="supportGiftGroupName">
          <el-input v-model="addForm.supportGiftGroupName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="礼物组名称" prop="supportGiftGroupName">
          <el-input v-model="editForm.supportGiftGroupName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!-- <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="total"
        style="float:right;"
      >
      </el-pagination>
    </el-col> -->
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiGift from '@/services/liveapp/gift';
import { giftPriceTypeLabMap } from '@/app/typeDef';
@Component
export default class GiftGroupList extends Vue {
  data() {
    return {
      filters: {
        name: '',
      },
      list: [],
      loading: false,
      total: 0,
      // page: 1,
      // limit: 10,
      addFormVisible: false,
      addFormRules: {},
      addForm: {},
      addLoading: false,
      // edit
      editFormVisible: false,
      editFormRules: {},
      editForm: {},
      editLoading: false,
    };
  }
  mounted() {
    this.getList();
  }
  showEditDialog(giftGroupBody: any) {
    this.$data.editFormVisible = true;
    this.$data.editForm  = giftGroupBody;
  }
  async addSubmit() {
    const { supportGiftGroupName } = this.$data.addForm;
    this.$data.addLoading = true;
    const res = await ApiGift.createGiftGroup(supportGiftGroupName);
    this.$data.addLoading = false;
    this.getList();
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('添加成功');
    this.$data.addFormVisible = false;
    this.$data.addForm = {};
  }
  async editSubmit() {
    const editForm = this.$data.editForm;
    this.$data.editLoading = true;
    const res = await ApiGift.editGiftGroup(editForm);
    this.$data.editLoading = false;
    this.getList();
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('修改成功');
    this.$data.editFormVisible = false;
    this.$data.editForm = {};
  }
  async getList() {
    // const params = {
    //   pageNum: this.$data.page - 1,
    //   pageSize: 10,
    // };
    this.$data.loading = true;
    const res = await ApiGift.getGiftGroupList();
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    // this.$data.total = res.data.total;
    this.$data.list = res.data;
  }
  editGiftList(giftGroupId: string) {
    this.$router.push({ name: 'EditGiftGroupGift', params: { giftGroupId } });
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getList();
  }
  async deleteItem(giftGroupId: number) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiGift.deleteGiftGroup(giftGroupId);
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