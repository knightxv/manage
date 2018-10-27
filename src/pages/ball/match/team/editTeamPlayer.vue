<template>
  <el-row>
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="addFormVisible = true">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table :data="teamPlayers" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="id" label="id">
        </el-table-column>
        <el-table-column prop="playerName" label="球员名字">
        </el-table-column>
        <el-table-column prop="playerTeamNum" label="球号">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deletePlayer(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加界面 -->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form label-width="80px" ref="addForm">
          <el-form-item label="球号" prop="playerTeamNum">
            <el-input ref="addTeamNumInput" type="number" v-model="playerTeamNum" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="球员" prop="playerId">
            <el-transfer
              class="transfer-wrap"
              filterable
              :filter-method="filterMethod"
              filter-placeholder="请输入球员名字"
              v-model="selectPlayers"
              :data="allCanSelectPlayers"
              @change="handleSelectChange"
              @left-check-change="onLeftCheckChange"
            >
            <span slot-scope="{ option }">{{ option.label }}{{ selectPlayerMap[option.key] ? `-${selectPlayerMap[option.key]}号` : '' }}</span>
            </el-transfer>
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
          <el-form-item label="球员名字" prop="playerName">
            <el-input v-model="editForm.playerName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="球号" prop="roleName">
            <el-input v-model="editForm.playerTeamNum" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>

    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiPlayer from '@/services/liveapp/player';
import ApiTeam from '@/services/liveapp/team';
import Players from '@/pages/player/players.vue';
import { ITeamPlayerVOs, IScheduleTeamPlayerInfo } from '@/services/apiDataType';
@Component({
  computed: {
    allCanSelectPlayers() {
      const self = this as EditScheduleTeamPlayer;
      const allPlayers = self.$data.allPlayers;
      const teamPlayers = self.$data.teamPlayers as ITeamPlayerVOs[];
      return allPlayers
        .filter((player: any) => {
          return !teamPlayers.some((teamPlayer) => {
            return teamPlayer.playerId === player.id;
          });
        })
        .map((player: any) => {
          return {
            label: `${player.playerName}${player.playerRemark ? `[${player.playerRemark}]` : ''}`,
            key: player.id,
            playerId: player.id,
            playerName: player.playerName,
          };
        });
    },
  },
})
export default class EditScheduleTeamPlayer extends Vue {
  data() {
    return {
      // allCanSelectPlayers: [],
      allPlayers: [],
      selectPlayers: [],
      selectPlayerMap: {},
      playerTeamNum: undefined,
      filterMethod(query: string, item: any) {
        if (item.playerName == null) {
          return false;
        }
        return item.playerName.indexOf(query) > -1;
      },

      teamPlayers: [],
      // players: [],
      loading: false,
      // 修改表单数据
      editFormVisible: false,
      editLoading: false,
      editFormRules: {},
      editForm: {},
      // 新增表单数据
      addFormVisible: false,
      addLoading: false,
      // addFormRules: {},
      // addForm: {},
    };
  }
  mounted() {
    this.getTeamPlayer();
    this.getAllPlayers();
  }
  async getTeamPlayer() {
    const { matchTeamId } = this.$route.params;
    const res = await ApiTeam.getTeamInfo(matchTeamId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.teamPlayers = res.data.matchTeamPlayerVOs || [];
  }
  async getAllPlayers() {
    const res = await ApiPlayer.players({ pageNum: 0, pageSize: 999, playerName: '' });
    if (!res.isSuccess) {
      return;
    }
    const players = res.data.data;
    this.$data.allPlayers = players;
  }
  async addSubmit() {
    const { matchTeamId } = this.$route.params;
    const createMatchTeamPlayerQOList = this.$data.selectPlayers.map((playerId: number) => {
      return {
        matchTeamId,
        playerId,
        playerTeamNum: this.$data.selectPlayerMap[playerId],
      };
    });
    this.$data.addLoading = true;
    const params = {
      createMatchTeamPlayerQOList,
    };
    const res = await ApiTeam.batchAddTeamPlayer(params);
    this.$data.addLoading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.addFormVisible = false;
    this.getTeamPlayer();
  }
  showEditDialog(row: any) {
    this.$data.editForm = row;
    this.$data.editFormVisible = true;
  }
  async editSubmit() {
    const params = this.$data.editForm;
    this.$data.editLoading = true;
    const res = await ApiTeam.editTeamPlayer(params);
    this.$data.editLoading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.editFormVisible = false;
    this.$message.success('修改成功');
    this.getTeamPlayer();
  }
  async deletePlayer(teamPlayerId: number) {
    const res = await ApiTeam.deleteTeamPlayer(teamPlayerId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.getTeamPlayer();
  }
  handleSelectChange(value: number[], direction: 'left' | 'right', movedKeys: number[]) {
    if (direction === 'left') {
      movedKeys.forEach((key) => {
        delete this.$data.selectPlayerMap[key];
      });
      return;
    }
    movedKeys.forEach((key) => {
      this.$data.selectPlayerMap[key] = this.$data.playerTeamNum;
    });
    this.$data.playerTeamNum = undefined;
  }
  onLeftCheckChange() {
    const addTeamNumInput = this.$refs.addTeamNumInput as any;
    addTeamNumInput.focus();
  }
}
</script>

<style scoped lang="less">
.transfer-wrap /deep/ .el-transfer-panel__body {
  height: 500px;
}
.transfer-wrap /deep/ .el-transfer-panel__list.is-filterable {
  height: 460px;
}
</style>