<template>
  <el-row>
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input
              v-model="filters.name"
              placeholder="用户名/姓名/昵称"
              style="min-width: 240px;"
              @keyup.enter.native="handleSearch">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showAddDialog">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column label="序号" prop="userId" width="80">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" sortable>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="120" sortable>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="160" sortable>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期" min-width="160" sortable>
        </el-table-column>
        <el-table-column prop="addr" label="地址" sortable>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removeUser(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>
      <!-- 添加界面 -->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker type="date" placeholder="出生日期" v-model="addForm.birth"></el-date-picker>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleIds">
            <el-checkbox-group v-model="roleIds">
              <el-checkbox v-for="role in roles" :label="role.roleId" :key="role.roleId">{{role.roleName}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
      <!-- 编辑界面 -->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker type="date" placeholder="出生日期" v-model="editForm.birth"></el-date-picker>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleIds">
            <el-checkbox-group v-model="roleIds">
              <el-checkbox v-for="role in roles" :label="role.roleId" :key="role.roleId">{{role.roleName}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>

    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiUser from '../../services/user';
import ApiRole from '../../services/role';
@Component
export default class UserManage extends Vue {
  data() {
    return {
      filters: {
        name: '',
      },
      loading: false,
      users: [],
      roles: [],
      roleIds: [],
      total: 0,
      page: 1,
      limit: 10,
      addFormVisible: false,
      editFormVisible: false,
      editFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [{required: true, message: '请输入作者', trigger: 'blur'}],
        name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
      },
      editForm: {
        username: '',
        password: '',
        name: '',
        email: '',
        roleIds: [],
      },
      // 新增相关数据
      addLoading: false,
      addFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [{required: true, message: '请输入作者', trigger: 'blur'}],
        name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
      },
      addForm: {
        username: '',
        password: '',
        name: '',
        email: '',
        roleIds: [],
      },
    };
  }
  // @TODO: set this to app common filter
  formatSex(row: any) {
    console.log(row);
    return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知';
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.search();
  }
  handleSearch() {
    this.$data.total = 0;
    this.$data.page = 1;
    this.search();
  }
  // 获取用户列表
  async search() {
    const params = {
      page: this.$data.page,
      limit: 10,
      name: this.$data.filters.name,
    };

    this.$data.loading = true;
    const res = await ApiRole.findList(params);
    console.log(res);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    const result = res.data;
    console.log(result);
    if (result.page.rows) {
      this.$data.total = result.page.total;
      this.$data.users = result.page.rows;
    }
  }
  async showAddDialog() {
    this.$data.addFormVisible = true;
    this.$data.roleIds = [];
    const res = await ApiRole.findList(null);
    if (!res.isSuccess) {
      return;
    }
    this.$data.roles = res.data.rows;
  }
  async showEditDialog(index: number, row: any) {
    this.$data.roleIds = [];
    this.$data.editFormVisible = true;
    this.$data.editForm = Object.assign({}, row);
    try {
      const res = await ApiRole.findList(null);
      this.$data.roles = res.data.rows;
      const roleRes = await ApiRole.findById(row.userId);
      this.$data.roleIds = roleRes.data;
    } catch (err) {
      console.log(err);
    }
  }
  async addSubmit() {
    // (this.$refs.addForm as any).validate((valid: boolean) => {
    //   if (valid) {
    //     this.$data.loading = true;
    //     let params = Object.assign({}, this.addForm);
    //     params.roleIds = this.roleIds
    //     const res = await ApiUser.addUser(params);
    //     this.$data.loading = false;
    //     this.$message.success({
    //       showClose: true,
    //       message: "新增成功",
    //       duration: 2000,
    //     });
    //     (this.$refs.addForm as any).resetFields();
    //     this.$data.addFormVisible = false;
    //     this.search();
    //   }
    // });
  }
  async editSubmit() {
    // this.$refs.editForm.validate(async (valid: boolean) => {
    //   if (valid) {
    //     this.$data.loading = true;
    //     const params = Object.assign({}, this.editForm);
    //     params.roleIds = this.$data.roleIds;
    //     const res = await ApiUser.editUser(params);
    //   }
    // });
  }
  async removeUser(index: number, row: any) {
    // const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
      // if (!isConfirm) {
      //   return;
      // }
      // const res = await ApiUser.removeUser({ id: row.userId });
      // if (!res.isSuccess) {
      //   return;
      // }
      // this.$message.success({
      //   showClose: true,
      //   message: '删除成功',
      //   duration: 1500
      // });
      // this.search();
  }
  mounted() {
    this.handleSearch();
  }
}
</script>

<style scoped lang="less">
</style>