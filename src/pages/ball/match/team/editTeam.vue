<template>
<div>
  <el-form :model="editForm" label-width="130px" class="form-box" :rules="editFormRules" ref="editForm">
    <el-form-item label="队名" prop="teamName">
      <el-input v-model="editForm.teamName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="教练名" prop="teamCoachName">
      <el-input v-model="editForm.teamCoachName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="赛事组" prop="matchGroup">
      <el-input v-model="editForm.matchGroup" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="队标" prop="teamIco">
      <app-upload :imgUrl.sync="editForm.teamIco"></app-upload>
    </el-form-item>
    <el-form-item label="队伍宣传图" prop="teamImage">
      <app-upload :imgUrl.sync="editForm.teamImage"></app-upload>
    </el-form-item>
    <el-card class="box-card">
      <el-row slot="header" type="flex" align="middle">
        <el-col>
          成员
        </el-col>
        <el-col>
          <el-select v-model="readyAddPlayer" filterable placeholder="请选择球员">
            <el-option
              v-for="item in filterPlayers"
              :key="item.id"
              :label="`${item.playerName}[${item.id}]`"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col>
          <el-input placeholder="球号" v-model="readyAddplayerTeamNum"></el-input>
        </el-col>
        <el-button @click.native="addPlayer" style="margin-left: 5px;" type="primary">添加</el-button>
      </el-row>
      <div v-for="item in editForm.matchTeamPlayerQOs" :key="item.playerId" class="text item">
        <el-row type="flex" justify="space-between" align="middle" class="player-list-item">
          <div>{{ `[${item.playerTeamNum}号]:${item.playerName}` }}</div>
          <el-button @click.native="removeSelectPlayer(item.playerId)" type="danger" icon="el-icon-delete" circle></el-button>
        </el-row>
      </div>
    </el-card>
  </el-form>
  <div style="margin-left: 60px;margin-top: 30px;">
    <el-button type="primary" @click.native="editSubmit" :loading="loading">提交</el-button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiPlayer from '@/services/liveapp/player';
import ApiMatch from '@/services/liveapp/match';
import ApiTeam from '@/services/liveapp/team';
import { ITeamPlayerVOs } from '@/services/apiDataType';

@Component({
  computed: {
    filterPlayers() {
      return this.$data.players.filter((player: any) => {
        return !this.$data.editForm.matchTeamPlayerQOs.some((playerInfo: any) => {
          return playerInfo.playerId === player.id;
        });
      });
    },
  },
})
export default class EditTeam extends Vue {
  data() {
    return {
      loading: false,
      editFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      editForm: {
        matchTeamPlayerQOs: [], // { playerId , playerTeamNum, playerName }[]
      },
      players: [],
      readyAddPlayer: null, // 待添加球员
      readyAddplayerTeamNum: '', // 带添加球员号数
    };
  }
  editSubmit() {
    (this.$refs.editForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const params = this.$data.editForm;
      this.$data.loading = true;
      const res = await ApiTeam.edit(params);
      this.$data.loading = false;
      if (!res.isSuccess) {
        return;
      }
      this.$router.back();
      this.$message.success('新增成功');
    });
  }
  addPlayer() {
    if (!this.$data.readyAddPlayer) {
      return;
    }
    let playerInfo: any;
    this.$data.players.some((player: { id: number, playerName: string }) => {
      if (player.id !== this.$data.readyAddPlayer) {
        return false;
      }
      playerInfo = {
        playerId: player.id,
        playerName: player.playerName,
        playerTeamNum: this.$data.readyAddplayerTeamNum,
      };
      return true;
    });
    if (!playerInfo) {
      return;
    }
    this.$data.readyAddPlayer = '';
    this.$data.readyAddTeamNum = '';
    this.$data.editForm.matchTeamPlayerQOs.push(playerInfo);
  }
  removeSelectPlayer(playerId: string) {
    this.$data.editForm.matchTeamPlayerQOs = this.$data.editForm.matchTeamPlayerQOs.filter((player: any) => {
      return player.playerId !== +playerId;
    });
  }
  mounted() {
    this.reSeteditForm();
    this.getPlayers();
  }
  async getPlayers() {
    const res = await ApiPlayer.players({ pageNum: 0, pageSize: 999, playerName: '' });
    if (!res.isSuccess) {
      return;
    }
    this.$data.players = res.data.data;
  }
  async reSeteditForm() {
    const { id, scheduleId } = this.$route.params;
    if (isNaN(+scheduleId)) {
      return;
    }
    const res = await ApiTeam.getTeam(+scheduleId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.editForm = {
      ...res.data,
      matchTeamPlayerQOs: res.data.matchTeamPlayerVOs || [],
    };
  }
}
</script>

<style scoped lang="less">
.box-card {
  margin-left: 50px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.player-list-item {
  padding-bottom: 10px;
  border-bottom: 1px solid #e9eaec;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>