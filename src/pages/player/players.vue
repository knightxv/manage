<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input
            v-model="filters.name"
            placeholder="用户名/姓名/昵称"
            style="min-width: 240px;"
          >
          <!-- @keyup.enter.native="handleSearch" -->
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addFormVisible = true">添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="players" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="playerName" label="姓名" >
        </el-table-column>
        <el-table-column prop="phoneNumber" label="电话" sortable>
        </el-table-column>
        <el-table-column prop="sexType" label="性别" :formatter="$app.formatter.sexLab" sortable>
        </el-table-column>
        <el-table-column prop="playerRemark" label="球员备注" sortable>
        </el-table-column>
        <!-- <el-table-column prop="liveAddress" label="地址" sortable>
        </el-table-column> -->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removePlayer(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
                      style="float:right;">
      </el-pagination>
    </el-col>
    <!-- 添加界面 -->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名" prop="playerName">
          <el-input v-model="addForm.playerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户头像" prop="playerHeadImg">
          <app-upload :imgUrl.sync="addForm.playerHeadImg"></app-upload>
        </el-form-item>
        <el-form-item label="电话" prop="phoneNumber">
          <el-input v-model="addForm.phoneNumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sexType">
          <el-radio-group v-model="addForm.sexType">
            <el-radio :label="$app.typeDef.sex.BOY">男</el-radio>
            <el-radio :label="$app.typeDef.sex.GIRL">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="球员备注" prop="playerRemark">
          <el-input v-model="addForm.playerRemark" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色">
          <el-checkbox-group v-model="addForm.roleIds">
            <el-checkbox v-for="role in roles" :label="role.roleId" :key="role.roleId">
              {{role.roleName}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="姓名" prop="playerName">
          <el-input v-model="editForm.playerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户头像" prop="playerHeadImg">
          <app-upload :imgUrl.sync="editForm.playerHeadImg"></app-upload>
        </el-form-item>
        <el-form-item label="电话" prop="phoneNumber">
          <el-input v-model="editForm.phoneNumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sexType">
          <el-radio-group v-model="editForm.sexType">
            <el-radio :label="$app.typeDef.sex.BOY">男</el-radio>
            <el-radio :label="$app.typeDef.sex.GIRL">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="球员备注" prop="playerRemark">
          <el-input v-model="editForm.playerRemark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiBallPlayer from '@/services/liveapp/player';
@Component
export default class Players extends Vue {
  data() {
    return {
      filters: {
        name: '',
      },
      players: [],
      loading: true,
      total: 0,
      page: 0,
      limit: 10,
      // 新增表单数据
      addFormVisible: false,
      addLoading: false,
      addFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      addForm: {},
      // 新增表单数据
      editFormVisible: false,
      editLoading: false,
      editFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      editForm: {},
    };
  }
  async getPlayer() {
    const params = {
      pageNum: this.$data.page,
      pageSize: 10,
      playerName: this.$data.filters.name,
    };
    this.$data.loading = true;
    const res = await ApiBallPlayer.players(params);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.players = res.data.data;
  }
  addSubmit() {
    (this.$refs.addForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      this.$data.addLoading = true;
      const params = this.$data.addForm;
      const res = await ApiBallPlayer.create(params);
      this.$data.addLoading = false;
      if (!res.isSuccess) {
        return;
      }
      this.$data.addFormVisible = false;
      this.$message.success('新增成功');
      this.resetAddForm();
      this.getPlayer();
    });
  }
  async showEditDialog(index: number, row: any) {
    this.$data.editFormVisible = true;
    this.$data.editForm = Object.assign({}, row);
  }
  editSubmit() {
    (this.$refs.editForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      this.$data.editLoading = true;
      const params = this.$data.editForm;
      const res = await ApiBallPlayer.edit(params);
      this.$data.editLoading = false;
      if (!res.isSuccess) {
        return;
      }
      this.$data.editFormVisible = false;
      this.$message.success('修改成功');
      this.resetEditForm();
      this.getPlayer();
    });
  }
  async removePlayer(index: number, row: any) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiBallPlayer.delete(row.id);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.reLoadInfo();
  }
  mounted() {
    this.resetAddForm();
    this.resetEditForm();
    this.reLoadInfo();
  }
  reLoadInfo() {
    this.getPlayer();
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getPlayer();
  }
  resetAddForm() {
    this.$data.addForm = {
      sex: this.$app.typeDef.sex.BOY,
      playerHeadImg: '',
    };
  }
  resetEditForm() {
    this.$data.addForm = {
      sex: this.$app.typeDef.sex.BOY,
      playerHeadImg: '',
    };
  }
}
</script>

<style scoped lang="less">

</style>