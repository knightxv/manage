<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-button @click="goAddPage" type="primary">添加竞猜</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="guessList" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column prop="matchScheduleGuessGameId" label="id" >
      </el-table-column>
      <el-table-column prop="title" label="竞猜标题">
      </el-table-column>
      <el-table-column prop="tailName" label="反面名称" sortable>
      </el-table-column>
      <el-table-column prop="tailOdds" label="反面赔率" sortable>
      </el-table-column>
      <el-table-column prop="headName" label="正面名称" sortable>
      </el-table-column>
      <el-table-column prop="headOdds" label="正面赔率" sortable>
      </el-table-column>
      <el-table-column prop="guessGameValueType" label="投注值类型" sortable>
      </el-table-column>
      <el-table-column prop="guessBankerType" label="竞猜庄家类型" :formatter="guessBankerTypeFormatter" sortable>
      </el-table-column>
      <el-table-column prop="guessGameStatusType" label="竞猜状态" :formatter="guessGameStatusTypeFormatter" sortable>
      </el-table-column>
      <el-table-column prop="gameWinner" label="胜方" :formatter="gameWinnerFormatter" sortable>
      </el-table-column>
      <el-table-column prop="remark" label="额外说明" sortable>
      </el-table-column>
      <el-table-column prop="guessStopTime" label="封盘时间" sortable :formatter="$app.formatter.dateSecTime">
      </el-table-column>
      <el-table-column label="操作" width="600">
        <template slot-scope="scope">
          <el-button v-if="scope.row.guessGameStatusType === $app.typeDef.guessGameStatusType.UN_START" size="mini" @click="startGuess(scope.row.matchScheduleGuessGameId)">开启竞猜</el-button>
          <el-button v-if="scope.row.guessGameStatusType === $app.typeDef.guessGameStatusType.DOING" size="mini" @click="stopGuess(scope.row.matchScheduleGuessGameId)">竞猜封盘</el-button>
          <el-button v-if="scope.row.guessGameStatusType === $app.typeDef.guessGameStatusType.STOP" size="mini" @click="endGuess(scope.row.guessGameId)">结算竞猜</el-button>
          <el-button v-if="scope.row.guessGameStatusType === $app.typeDef.guessGameStatusType.STOP" size="mini" @click="cancelGuess(scope.row.guessGameId)">流局竞猜</el-button>
          <el-button size="mini" type="warning" @click="goEditPage(scope.row.matchScheduleGuessGameId)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteItem(scope.row.matchScheduleGuessGameId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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
import ApiSchedule from '@/services/liveapp/schedule';
import { gameWinnerLabelMap, gameWinner, guessGameStatusType, guessGameStatusTypeLabMap,
guessBankerTypeLabMap } from '@/app/typeDef';
@Component
export default class MatchScheduleGuessList extends Vue {
  data() {
    return {
      filters: {
        name: '',
      },
      guessList: [],
      loading: false,
      total: 0,
      page: 1,
      limit: 10,
    };
  }
  mounted() {
    this.getList();
  }
  goAddPage() {
    const { scheduleId } = this.$route.params;
    this.$router.push({ name: 'CreateMatchScheduleGuess', params: { scheduleId } });
  }
  goEditPage(matchScheduleGuessGameId: string) {
    this.$router.push({ name: 'EditMatchScheduleGuess', params: { matchScheduleGuessGameId } });
  }
  async startGuess(matchScheduleGuessGameId: number) {
    const res = await ApiSchedule.startMatchScheduleGuessGame(matchScheduleGuessGameId);
    if (!res.isSuccess) {
      return;
    }
    this.getList();
    this.$message.success('操作成功');
  }
  async stopGuess(matchScheduleGuessGameId: number) {
    const res = await ApiSchedule.stopMatchScheduleGuessGame(matchScheduleGuessGameId);
    if (!res.isSuccess) {
      return;
    }
    this.getList();
    this.$message.success('操作成功');
  }
  async cancelGuess(matchScheduleGuessGameId: number) {
    const res = await ApiSchedule.cancelMatchScheduleGuessGame(matchScheduleGuessGameId);
    if (!res.isSuccess) {
      return;
    }
    this.getList();
    this.$message.success('操作成功');
  }
  async endGuess(matchScheduleGuessGameId: number) {
    let selectGameWinner;
    try {
      const isConfirm = await this.$confirm('选择竞猜正反方?', '提示',
        {type: 'warning', cancelButtonText: gameWinnerLabelMap[gameWinner.HEAD],
        confirmButtonText: gameWinnerLabelMap[gameWinner.TAIL], beforeClose(action, instance, done) {
          if (action === 'cancel') {
            selectGameWinner = gameWinner.HEAD;
          }
          done();
        }},
      );
      if (isConfirm) {
        selectGameWinner = gameWinner.TAIL;
      }
    } catch (err) {
      //
    }
    if (!selectGameWinner) {
      return;
    }
    const params = {
      guessGameId: matchScheduleGuessGameId,
      gameWinner: selectGameWinner,
    };
    const res = await ApiSchedule.endMatchScheduleGuessGame(params);
    if (!res.isSuccess) {
      return;
    }
    this.getList();
    this.$message.success('操作成功');
  }
  async getList() {
    const { scheduleId } = this.$route.params;
    this.$data.loading = true;
    const res = await ApiSchedule.getMatchScheduleGuessGameList(scheduleId);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.total = res.data.total;
    this.$data.guessList = res.data;
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getList();
  }
  async deleteItem(matchScheduleGuessGameId: number) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiSchedule.deleteMatchScheduleGuessGame(matchScheduleGuessGameId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.getList();
  }
  gameWinnerFormatter(row: any) {
    if (row == null) {
      return;
    }
    if (row.gameWinner == null) {
      return '';
    }
    return gameWinnerLabelMap[row.gameWinner];
  }
  guessGameStatusTypeFormatter(row: any) {
    return guessGameStatusTypeLabMap[row.guessGameStatusType];
  }
  guessBankerTypeFormatter(row: any) {
    return guessBankerTypeLabMap[row.guessBankerType];
  }
}
</script>

<style scoped lang="less">
</style>