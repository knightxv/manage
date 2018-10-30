<template>
  <div class="container">
    <el-row v-if="scheduleInfo">
      <el-button
        v-if="scheduleInfo.matchStageType === 'UN_START'"
        :disabled="updateLoading"
        type="primary"
        @click="gameStart"
      >开始比赛</el-button>
      <el-button
        v-if="scheduleInfo.matchStageType === 'END'"
        :disabled="updateLoading"
        type="primary"
        @click="gameStart"
      >重新计分</el-button>
      <template  v-if="scheduleInfo.matchStageType !== 'UN_START'">
        <div style="padding-bottom: 20px;" v-if="scheduleInfo.matchStageType !== 'END'">
          <el-button :disabled="updateLoading" v-if="step > 0" @click="preStep">上一步</el-button>
          <el-button :disabled="updateLoading" v-if="step < matchSteps.length - 1" type="primary" @click="nextStep">下一步</el-button>
          <el-button :disabled="updateLoading" v-if="hasOverTime" @click="cancelOverTimeStep">取消加时赛</el-button>
          <el-button :disabled="updateLoading" type="warning" v-if="step >= matchSteps.length - 1 && !hasOverTime" @click="goOverTimeStep">添加加时赛</el-button>
          <el-button :disabled="updateLoading" type="success" v-if="step >= matchSteps.length - 1" @click="complateSchedule">完成比赛</el-button>
        </div>
        <el-steps :space="200" :active="step" finish-status="success" align-center>
          <el-step v-for="item in matchSteps" :key="item" :title="item"></el-step>
        </el-steps>
      </template>
    </el-row>
    <el-row
      class="table-wrap"
      v-if="scheduleInfo && scheduleInfo.matchStageType !== 'END'"
    >
      <el-row type="flex" justify="space-between" align="middle">
        <div class="scoring-title">
          <p>计分管理</p> 
          <el-button type="primary" @click="showScoringToolsDiaLog">修改计分工具</el-button>
          <el-button type="primary" @click="changeGoCourtDialogVisible = true">选择上场球员</el-button>
          <el-button type="primary" @click="refreshPlayerActionCache">更新球员缓存</el-button>
          <el-button type="primary" @click="addPlayerDialogVisible = true">添加球员</el-button>
        </div>
        <!-- <div>直播人数: {{ onlineCount }}</div> -->
      </el-row>
      <div class="table-group-title">
        主场球队:{{ homeCourtTeam.matchTeamName }}
        <span class="team-score">总得分：{{ homeCourtTeamScoreCount }}</span>
      </div>
      <el-table :data="homeOnTheCourtTeamPlayers" highlight-current-row v-loading="tableLoading" align="center" style="width: 100%;">
        <el-table-column type="expand" width="20px">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="球员名字">
                <span>{{ props.row.playerName }}</span>
              </el-form-item>
              <el-form-item label="球号">
                <span>{{ props.row.playerTeamNum }}</span>
              </el-form-item>
              <el-form-item v-for="tool in userScoringTools" :key="tool.toolVal" :label="tool.toolName">
                <span>{{ getToolInfoByActions(props.row.matchScheduleTeamPlayerActions, tool.toolVal) }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="playerTeamNum" label="球号" width="45px" >
        </el-table-column>
        <el-table-column prop="playerName" label="姓名" width="70px">
        </el-table-column>
        <el-table-column prop="matchScheduleTeamPlayerActions" label="分数" width="50px" :formatter="scoreFormatter">
        </el-table-column>
        <el-table-column v-for="tool in userScoringTools" :key="tool.toolVal" :prop="tool.toolVal" :label="tool.toolName" align="center">
          <el-button-group slot-scope="scope">
            <el-button class="btn-small" icon="el-icon-plus" :disabled="scheduleInfo.matchStageType === 'UN_START' || updateActionLoading" v-if="tool.actions.indexOf('ADD') > -1" size="mini" type="primary" @click="addPlayerAction(scope.row.matchTeamPlayerId, tool.toolVal)"></el-button>
            <el-button class="btn-small" icon="el-icon-minus" :disabled="scheduleInfo.matchStageType === 'UN_START' || updateActionLoading" v-if="tool.actions.indexOf('MINUS') > -1" size="mini" type="info" @click="minusPlayerAction(scope.row.matchTeamPlayerId, tool.toolVal)"></el-button>
            <el-button class="btn-small" icon="el-icon-close" :disabled="scheduleInfo.matchStageType === 'UN_START' || updateActionLoading" v-if="tool.actions.indexOf('MISS') > -1" size="mini" type="success" @click="missPlayerAction(scope.row.matchTeamPlayerId, tool.toolVal)"></el-button>
          </el-button-group>
        </el-table-column>
      </el-table>
      <div class="table-group-title">
        客场球队:{{ opponentTeam.matchTeamName }}
        <span class="team-score">总得分：{{ opponentTeamcoreCount }}</span>
      </div>
      <el-table :data="opponentOnTheCourtTeamPlayers" :show-header="false" highlight-current-row v-loading="tableLoading" align="center" style="width: 100%;">
        <el-table-column type="expand" width="20px">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="球员名字">
                <span>{{ props.row.playerName }}</span>
              </el-form-item>
              <el-form-item label="球号">
                <span>{{ props.row.playerTeamNum }}</span>
              </el-form-item>
              <el-form-item v-for="tool in userScoringTools" :key="tool.toolVal" :label="tool.toolName">
                <span>{{ getToolInfoByActions(props.row.matchScheduleTeamPlayerActions, tool.toolVal) }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="playerTeamNum" label="球号" width="45px" >
        </el-table-column>
        <el-table-column prop="playerName" label="姓名" width="70px">
        </el-table-column>
        <el-table-column prop="matchScheduleTeamPlayerActions" label="分数" width="50px" :formatter="scoreFormatter">
        </el-table-column>
        <el-table-column v-for="tool in userScoringTools" :key="tool.toolVal" :prop="tool.toolVal" :label="tool.toolName" align="center">
          <el-button-group slot-scope="scope">
            <el-button class="btn-small" icon="el-icon-plus" :disabled="scheduleInfo.matchStageType === 'UN_START' || updateActionLoading" v-if="tool.actions.indexOf('ADD') > -1" size="mini" type="primary" @click="addPlayerAction(scope.row.matchTeamPlayerId, tool.toolVal)"></el-button>
            <el-button class="btn-small" icon="el-icon-minus" :disabled="scheduleInfo.matchStageType === 'UN_START' || updateActionLoading" v-if="tool.actions.indexOf('MINUS') > -1" size="mini" type="info" @click="minusPlayerAction(scope.row.matchTeamPlayerId, tool.toolVal)"></el-button>
            <el-button class="btn-small" icon="el-icon-close" :disabled="scheduleInfo.matchStageType === 'UN_START' || updateActionLoading" v-if="tool.actions.indexOf('MISS') > -1" size="mini" type="success" @click="missPlayerAction(scope.row.matchTeamPlayerId, tool.toolVal)"></el-button>
          </el-button-group>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog title="计分工具" :visible.sync="toolDialogVisible" :close-on-click-modal="false">
      <el-form label-width="120px" ref="toolForm">
        <el-form-item label="需要的计分工具">
          <el-checkbox-group v-model="selectTools">
            <el-checkbox v-for="toolVal in allTools" :label="toolVal" :key="toolVal">
              {{ $app.typeDef.playerActionTypeMap[toolVal] }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="toolDialogVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editTools">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="上场球员" :visible.sync="changeGoCourtDialogVisible" :close-on-click-modal="false">
      <el-form label-width="120px" ref="goCourtForm">
        <el-form-item label="主队">
          <el-checkbox-group v-model="selectGoCourts">
            <el-checkbox v-for="player in homeCourtTeamPlayers" :label="player.matchTeamPlayerId" :key="player.matchTeamPlayerId">
              {{player.playerName}}[{{ player.playerTeamNum }}号]
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <el-form label-width="120px" ref="goCourtForm">
        <el-form-item label="客队">
          <el-checkbox-group v-model="selectGoCourts">
            <el-checkbox v-for="player in opponentTeamPlayers" :label="player.matchTeamPlayerId" :key="player.matchTeamPlayerId">
              {{player.playerName}}[{{ player.playerTeamNum }}号]
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="changeGoCourtDialogVisible = false">取消</el-button>
        <el-button type="primary" @click.native="submitPlayersState">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加球员" :visible.sync="addPlayerDialogVisible" :close-on-click-modal="false">
      <el-form label-width="120px" ref="addPlayerForm">
        <el-form-item label="球员名字" prop="playerName">
          <el-input v-model="addPlayerForm.playerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="球员备注" prop="playerRemark">
          <el-input v-model="addPlayerForm.playerRemark" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="球号" prop="playerTeamNum">
          <el-input v-model="addPlayerForm.playerTeamNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sexType">
          <el-radio-group v-model="selectSexType">
            <el-radio :label="$app.typeDef.sex.BOY">男</el-radio>
            <el-radio :label="$app.typeDef.sex.GIRL">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="球队" prop="matchTeamId">
          <el-radio-group v-model="selectMatchTeamId">
            <el-radio :label="homeCourtTeam.matchTeamId">主队[{{ homeCourtTeam.matchTeamName }}]</el-radio>
            <el-radio :label="opponentTeam.matchTeamId">客队[{{ opponentTeam.matchTeamName }}]</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addPlayerDialogVisible = false">取消</el-button>
        <el-button type="primary" v-loading="addPlayerLoading" @click.native="submitAddPlayerForm">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiScoring from '@/services/liveapp/scoring';
import ApiSchedule from '@/services/liveapp/schedule';
import ApiLive from '@/services/liveapp/live';
import { Getter, Mutation } from 'vuex-class';
import { UPDATE_USER_SELECT_TOOLS } from '../../../stores/mutation-types';
import { IScheduleTeamPlayerInfo, ISchedulePlayerActions } from '@/services/apiDataType';
import { clearTimeout, setTimeout } from 'timers';
import {
  matchTypeStageMap, matchType, matchStageType,
  matchStageTypeLab, matchTypeActionsMap, playerActionTypeArr,
} from '@/app/typeDef';
import { USER_SCORING_SELECT_TOOLS_MAP } from '@/stores/getters-types';
import schedule from '@/services/liveapp/schedule';
@Component({
  computed: {
    hasOverTime() {
      return this.$data.matchSteps.indexOf('加时赛') > -1;
    },
    // userScoringTools() {
    //   const self = this as BallScoring;
    //   const selectTools = self.$data.selectTools;
    //   return playerActionTypeArr.filter((toolInfo: { toolVal: string, toolName: string, actions: string[] }) => {
    //     return selectTools.indexOf(toolInfo.toolVal) > -1;
    //   });
    // },
    homeOnTheCourtTeamPlayers() {
      return (this as any).homeCourtTeamPlayers.filter((playerInfo: any) => {
        return this.$data.selectGoCourts.indexOf(playerInfo.matchTeamPlayerId) > -1;
      });
    },
    opponentOnTheCourtTeamPlayers() {
      return (this as any).opponentTeamPlayers.filter((playerInfo: any) => {
        return this.$data.selectGoCourts.indexOf(playerInfo.matchTeamPlayerId) > -1;
      });
    },
    homeCourtTeamPlayers() {
      return this.$data.schedulePlayers.filter((playerInfo: any) => {
        return playerInfo.matchTeamId === this.$data.homeCourtTeam.matchTeamId;
      });
    },
    opponentTeamPlayers() {
      return this.$data.schedulePlayers.filter((playerInfo: any) => {
        return playerInfo.matchTeamId === this.$data.opponentTeam.matchTeamId;
      });
    },
    homeCourtTeamScoreCount() {
      const self = this as any;
      return self.homeCourtTeamPlayers.reduce((before: number, cur: IScheduleTeamPlayerInfo) => {
        return self.scoreFormatter(cur) + before;
      }, 0);
    },
    opponentTeamcoreCount() {
      const self = this as any;
      return self.opponentTeamPlayers.reduce((before: number, cur: IScheduleTeamPlayerInfo) => {
        return self.scoreFormatter(cur) + before;
      }, 0);
    },
  },
})
export default class BallScoring extends Vue {
  @Getter(USER_SCORING_SELECT_TOOLS_MAP) toolMatchTypeMap!: {[key: string]: string[]};
  @Mutation(UPDATE_USER_SELECT_TOOLS) updateMatchTool !: (params: { matchType: string, tools: string[] }) => {};
  // 是否有加时赛
  hasOverTime!: boolean;
  data() {
    // const matchSteps
    return {
      step: 0,
      updateLoading: false,
      scheduleInfo: null,
      matchSteps: ['第一节', '第二节', '第三节', '第四节' ],
      matchStepAction: ['PART_ONE', 'PART_TWO', 'PART_THREE', 'PART_FOUR', 'OVERTIME', 'END'],
      // scoring tools
      loading: false,
      tableLoading: false,
      toolDialogVisible: false,
      updateActionLoading: false,
      allTools: [],
      selectTools: [],
      userScoringTools: [],
      schedulePlayers: [],
      homeCourtTeam: {
        matchTeamName: '',
        matchTeamId: '',
      },
      opponentTeam: {
        matchTeamName: '',
        matchTeamId: '',
      },
      // live count
      // onlineCount: 0,
      // player status
      changeGoCourtDialogVisible: false,
      selectGoCourts: [], // 上场球员id列表
      // 添加球员
      addPlayerDialogVisible: false,
      selectSexType: this.$app.typeDef.sex.BOY,
      selectMatchTeamId: null,
      addPlayerForm: {},
      addPlayerLoading: false,
    };
  }
  async mounted() {
    const matchScheduleId = +this.$route.params.scheduleId;
    if (isNaN(matchScheduleId)) {
      return;
    }
    await this.getSchedule(matchScheduleId);
    this.setTools();
    this.getPlayersOnTheCourtState(matchScheduleId);
    // this.setTimeoutToUpdateLiveCount();
  }
  preStep() {
    if (this.$data.step <= 0) {
      return;
    }
    this.$data.step --;
    this.updateActionByStep();
  }
  nextStep() {
    if (this.$data.step >= this.$data.matchSteps.length) {
      return;
    }
    this.$data.step ++;
    this.updateActionByStep();
  }
  gameStart() {
    this.$data.step = 0;
    this.updateActionByStep();
  }
  goOverTimeStep() {
    if (this.hasOverTime) {
      return;
    }
    this.$data.matchSteps.push('加时赛');
  }
  cancelOverTimeStep() {
    this.$data.matchSteps.splice(this.$data.matchSteps.length - 1, 1);
    if (this.$data.step >= this.$data.matchSteps.length) {
      this.$data.step = this.$data.matchSteps.length - 1;
      this.updateActionByStep();
    }
  }
  updateActionByStep() {
    const actionType = this.$data.matchStepAction[this.$data.step];
    if (!actionType) {
      this.$message.error('找不到动作信息');
      return;
    }
    this.updateScheduleState(actionType);
  }
  async getMatchScheduleInfo(matchPlayerActionTypes: string[]) {
    const matchScheduleId = +this.$route.params.scheduleId;
    if (isNaN(matchScheduleId)) {
      return false;
    }
    const res = await ApiScoring.getMatchScheduleInfo({
      matchScheduleId,
      matchPlayerActionTypes,
    });
    if (!res.isSuccess) {
      return false;
    }
    const homeCourtTeam = res.data.homeCourtTeam;
    const opponentTeam = res.data.opponentTeam;
    this.$data.homeCourtTeam = homeCourtTeam;
    this.$data.opponentTeam = opponentTeam;
    const homeCourtTeamPlayers = homeCourtTeam.matchScheduleTeamPlayers.map((player) => {
      return {
        matchTeamName: homeCourtTeam.matchTeamName,
        matchTeamId: homeCourtTeam.matchTeamId,
        tagType: 'success',
        ...player,
      };
    });
    const opponentTeamPlayers = opponentTeam.matchScheduleTeamPlayers.map((player) => {
      return {
        matchTeamName: opponentTeam.matchTeamName,
        matchTeamId: opponentTeam.matchTeamId,
        tagType: 'danger',
        ...player,
      };
    });
    this.$data.schedulePlayers = [...homeCourtTeamPlayers, ...opponentTeamPlayers];
    return true;
  }
  async getSchedule(matchScheduleId: number) {
    const res = await ApiSchedule.getSchedule(matchScheduleId);
    if (!res.isSuccess) {
      return;
    }
    const scheduleInfo = res.data;
    this.$data.scheduleInfo = {
      ...scheduleInfo,
    };
    this.$data.selectMatchTeamId = scheduleInfo.homeCourtTeam.id;
    this.setMatchSteps();
  }
  setMatchSteps() {
    const scheduleInfo = this.$data.scheduleInfo;
    let setMatchType = scheduleInfo.matchType;
    const matchCurStageType: string = scheduleInfo.matchStageType;
    if (setMatchType == null) {
      setMatchType = matchType.BASKETBALL;
    }
    const matchSteps = matchTypeStageMap[setMatchType];
    if (matchSteps == null) {
      return;
    }
    this.$data.matchSteps = matchSteps.map((type: string) => {
      return matchStageTypeLab[type];
    });
    if (matchCurStageType === matchStageType.OVERTIME) {
      this.goOverTimeStep();
    }
    this.$data.matchStepAction = [...matchSteps, matchStageType.OVERTIME, matchStageType.END];
    this.$data.step = this.$data.matchStepAction.indexOf(matchCurStageType);
  }
  /** 更新比赛阶段状态 */
  async updateScheduleState(stageAction: string) {
    const matchScheduleId = +this.$route.params.scheduleId;
    this.$data.updateLoading = true;
    const res = await ApiSchedule.changeMatchStage({
      matchScheduleId,
      matchStageType: stageAction,
    });
    this.$data.updateLoading = false;
    if (!res.isSuccess) {
      return;
    }
    Vue.set(this.$data.scheduleInfo, 'matchStageType', stageAction);
    this.$data.step = this.$data.matchStepAction.indexOf(stageAction);
  }
  complateSchedule() {
    this.updateScheduleState('END');
  }
  // ----工具类计分
  setTools() {
    let selectTools = this.getSaveTools();
    this.$data.allTools = this.getAllToos();
    if (selectTools.length <= 0) {
      selectTools = this.$data.allTools.slice(0, 3);
    }
    this.$data.selectTools = selectTools;
    this.submitTools();
  }
  showScoringToolsDiaLog() {
    this.$data.toolDialogVisible = true;
    const selectTools = this.getSaveTools();
    this.$data.selectTools = selectTools;
  }
  getSaveTools(): string[] {
    let selectTools: string[] = [];
    if (this.$data.scheduleInfo == null) {
      return [];
    }
    let setMatchType = this.$data.scheduleInfo.matchType;
    if (setMatchType == null) {
      setMatchType = matchType.BASKETBALL;
    }
    if (this.toolMatchTypeMap[setMatchType]) {
      selectTools = this.toolMatchTypeMap[setMatchType];
    }
    return selectTools;
  }
  getAllToos() {
    let selectTools: string[] = [];
    let setMatchType = this.$data.scheduleInfo.matchType;
    if (setMatchType == null) {
      setMatchType = matchType.BASKETBALL;
    }
    if (matchTypeActionsMap[setMatchType]) {
      selectTools = matchTypeActionsMap[setMatchType];
    }
    return selectTools;
  }
  async editTools() {
    this.$data.toolDialogVisible = true;
    this.$data.tableLoading = true;
    const isSuccess = await this.submitTools();
    this.$data.tableLoading = false;
    if (!isSuccess) {
      return;
    }
    this.$data.toolDialogVisible = false;
  }
  /** 提交工具更改 */
  async submitTools() {
    const isSuccess = await this.getMatchScheduleInfo(this.$data.selectTools);
    if (!isSuccess) {
      return false;
    }
    this.$data.userScoringTools = playerActionTypeArr.filter((tool) => {
      return this.$data.selectTools.some((selectToolVal: string) => {
        return tool.toolVal === selectToolVal;
      });
    });
    let setMatchType = this.$data.scheduleInfo.matchType;
    if (setMatchType == null) {
      setMatchType = matchType.BASKETBALL;
    }
    this.updateMatchTool({
      matchType: setMatchType,
      tools: this.$data.selectTools,
    });
    return true;
  }
  addPlayerAction(matchTeamPlayerId: number, matchPlayerActionType: string) {
    this.pushAction({
      failTimes: 0,
      matchTeamPlayerId,
      successTimes: 1,
      matchPlayerActionType,
    });
  }
  minusPlayerAction(matchTeamPlayerId: number, matchPlayerActionType: string) {
    this.pushAction({
      failTimes: 0,
      matchTeamPlayerId,
      successTimes: -1,
      matchPlayerActionType,
    });
  }
  missPlayerAction(matchTeamPlayerId: number, matchPlayerActionType: string) {
    this.pushAction({
      failTimes: 1,
      matchTeamPlayerId,
      successTimes: 0,
      matchPlayerActionType,
    });
  }
  async pushAction(editInfo: any) {
    const matchScheduleId = +this.$route.params.scheduleId;
    if (isNaN(matchScheduleId)) {
      return false;
    }
    this.$data.updateActionLoading = true;
    const res = await ApiScoring.edit({
      matchScheduleId,
      ...editInfo,
    });
    this.$data.updateActionLoading = false;
    if (!res.isSuccess) {
      return;
    }
    this.updatePlayerTableAction(res.data);
    ApiScoring.pushLive(matchScheduleId);
    this.$notify.success('更新成功');
  }
  updatePlayerTableAction(updateData: ISchedulePlayerActions) {
    const schedulePlayers: IScheduleTeamPlayerInfo[] = this.$data.schedulePlayers;
    const playerIndex = schedulePlayers
      .findIndex((player) => player.matchTeamPlayerId === updateData.matchTeamPlayerId);
    if (playerIndex === -1) {
      this.$message.error('更新错误，请手动刷新浏览器更新分数');
      return;
    }
    const schedulePlayerInfo = schedulePlayers[playerIndex];
    if (schedulePlayerInfo.matchScheduleTeamPlayerActions == null) {
      schedulePlayerInfo.matchScheduleTeamPlayerActions = [updateData];
      return;
    }
    const actionIndex = schedulePlayerInfo.matchScheduleTeamPlayerActions.
      findIndex((action) => action.matchPlayerActionType === updateData.matchPlayerActionType
      && action.matchStageType === updateData.matchStageType);
    if (actionIndex === -1) {
      schedulePlayerInfo.matchScheduleTeamPlayerActions.push(updateData);
      return;
    }
    schedulePlayerInfo.matchScheduleTeamPlayerActions.splice(actionIndex, 1, updateData);
  }
  scoreFormatter(row: IScheduleTeamPlayerInfo) {
    if (row.matchScheduleTeamPlayerActions == null) {
      return 0;
    }
    return row.matchScheduleTeamPlayerActions.reduce((before, cur) => {
      const { matchPlayerActionType, successTimes } = cur;
      const score = this.getScoreByMatchPlayerActionType(matchPlayerActionType) * successTimes;
      return before + score;
    }, 0);
  }
  /** 通过工具来获取分数 */
  getScoreByMatchPlayerActionType(matchPlayerActionType: string): number {
    let score = 0;
    this.$app.typeDef.playerActionTypeArr.some((actionInfo: { toolVal: string, score: number }) => {
      if (actionInfo.score == null) {
        return false;
      }
      if (matchPlayerActionType === actionInfo.toolVal) {
        score = actionInfo.score;
        return true;
      }
      return false;
    });
    return score;
  }
  /** 根据球员动作获取属性详情 */
  getToolInfoByActions(matchScheduleTeamPlayerActions: ISchedulePlayerActions[], toolName: string): string | number {
    if (matchScheduleTeamPlayerActions == null) {
      return '0次';
    }
    const toolsActions = matchScheduleTeamPlayerActions.filter((action) => {
      return action.matchPlayerActionType === toolName;
    });
    const successTimes = toolsActions.reduce((before, cur) => {
      return cur.successTimes + before;
    }, 0);
    const failTimes = toolsActions.reduce((before, cur) => {
      return cur.failTimes + before;
    }, 0);
    if (failTimes === 0) {
      return `共${successTimes}次`;
    }
    return `${successTimes}/${failTimes + successTimes}`;
  }
  async submitPlayersState() {
    const matchScheduleId = +this.$route.params.scheduleId;
    if (isNaN(matchScheduleId)) {
      return;
    }
    const batchChangeMatchSchedulePlayer = this.$data.schedulePlayers.map((player: IScheduleTeamPlayerInfo) => {
      let matchSchedulePlayerStatus = 'OFF';
      if (this.$data.selectGoCourts.indexOf(player.matchTeamPlayerId) > -1) {
        matchSchedulePlayerStatus = 'ON';
      }
      return {
        matchScheduleId,
        matchTeamPlayerId: player.matchTeamPlayerId,
        matchSchedulePlayerStatus,
      };
    });
    const res = await ApiSchedule.batchChangeMatchSchedulePlayer(batchChangeMatchSchedulePlayer);
    this.getPlayersOnTheCourtState(matchScheduleId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.changeGoCourtDialogVisible = false;
    this.$message.success('修改成功');
  }
  /** 获取球员上场情况 */
  async getPlayersOnTheCourtState(matchScheduleId: number) {
    const res = await ApiSchedule.getPlayersOnTheCourtState(matchScheduleId);
    if (!res.isSuccess) {
      return;
    }
    const selectGoCourts: number[] = [];
    const homePlayerStatuInfos = res.data.homeCourtTeam;
    const opponentPlayerStatuInfos = res.data.opponentTeam;
    homePlayerStatuInfos.forEach((player: any) => {
      if (player.matchSchedulePlayerStatusType === 'ON') {
        selectGoCourts.push(player.matchTeamPlayerId);
      }
    });
    opponentPlayerStatuInfos.forEach((player: any) => {
      if (player.matchSchedulePlayerStatusType === 'ON') {
        selectGoCourts.push(player.matchTeamPlayerId);
      }
    });
    this.$data.selectGoCourts = selectGoCourts;
  }
  async refreshPlayerActionCache() {
    const matchScheduleId = +this.$route.params.scheduleId;
    if (isNaN(matchScheduleId)) {
      return;
    }
    const res = await ApiSchedule.refreshPlayerActionCache(matchScheduleId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('更新成功');
  }
  async submitAddPlayerForm() {
    this.$data.addPlayerLoading = true;
    const res = await ApiSchedule.addPlayerAndAddMatchTeamRel({
      ...this.$data.addPlayerForm,
      sexType: this.$data.selectSexType,
      matchTeamId: this.$data.selectMatchTeamId,
    });
    this.$data.addPlayerLoading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('添加成功');
    this.$data.addPlayerDialogVisible = false;
  }
}
</script>

<style scoped lang="less">
.container {
  margin: -20px;
}
.table-wrap {
  margin-top: 50px;
}
.scoring-title {
  font-weight: 700;
  font-size: 1.2em;
}
.table-group-title {
  font-size: 1.2em;
  font-weight: 700;
  padding: 10px 6px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.team-score {
  padding-left: 20px;
}
.btn-small {
  padding: 5px;
}
</style>