<template>
<div>
  <el-form :model="editForm" label-width="130px" class="form-box" :rules="editFormRules" ref="editForm">
    <el-form-item label="赛程名称" prop="matchScheduleName">
      <el-input v-model="editForm.matchScheduleName" auto-complete="off"></el-input>
    </el-form-item>
    
    <el-form-item label="比赛地点" prop="matchAddress">
      <el-input v-model="editForm.matchAddress" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="主场球队" prop="homeCourtTeamId">
      <el-select v-model="editForm.homeCourtTeam.id" filterable placeholder="请选择主场球队">
        <el-option
          v-for="item in teams"
          :key="item.id"
          :label="`${item.teamName}`"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="客场球队" prop="opponentTeamId">
      <el-select v-model="editForm.opponentTeam.id" filterable placeholder="请选择客场球队">
        <el-option
          v-for="item in teams"
          :key="item.id"
          :label="`${item.teamName}`"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="直播间" prop="liveId">
      <el-select v-model="editForm.live.id" filterable placeholder="请选择绑定的直播间">
        <el-option
          v-for="item in lives"
          :key="item.id"
          :label="`${item.liveTitle}[${item.masterName}]`"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="赛事类型" prop="liveType">
      <el-radio-group v-model="editForm.matchType">
        <el-radio
          v-for="item in $app.typeDef.matchType"
          :label="item"
          :key="item"
        >{{ $app.typeDef.matchTypeLabMap[item] }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="比赛时间" prop="startTime">
      <el-date-picker
        v-model="startTime"
        type="datetime"
        value-format="timestamp"
      ></el-date-picker>
    </el-form-item>
  </el-form>
  <div style="margin-left: 60px;margin-top: 30px;">
    <el-button type="primary" @click.native="addSubmit" :loading="loading">提交</el-button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiSchedule from '@/services/liveapp/schedule';
import ApiLive from '@/services/liveapp/live';
import ApiTeam from '@/services/liveapp/team';
import ApiSlideshow from '@/services/cms/slideShow';
@Component
export default class EditSchedule extends Vue {
  data() {
    return {
      loading: false,
      editFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
        // liveId: [{required: true, message: '直播间必须选', trigger: 'blur'}],
      },
      editForm: {
        opponentTeam: {},
        homeCourtTeam: {},
        live: {},
      },
      teams: [],
      lives: [],
      startTime: null,
    };
  }
  addSubmit() {
    (this.$refs.editForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const params = Object.assign({}, this.$data.editForm, {
        startTime: Math.floor(this.$data.startTime / 1000),
        liveId: this.$data.editForm.live.id,
        homeCourtTeamId: this.$data.editForm.homeCourtTeam.id,
        opponentTeamId: this.$data.editForm.opponentTeam.id,
      });
      this.$data.loading = true;
      const res = await ApiSchedule.edit(params);
      this.$data.loading = false;
      if (!res.isSuccess) {
        return;
      }
      this.$router.back();
      this.$message.success('新增成功');
    });
  }
  mounted() {
    this.reSeteditForm();
    this.getLives();
    this.getTeams();
  }
  async getLives() {
    const res = await ApiLive.lives({
      pageNum: 0,
      pageSize: 999,
    });
    if (!res.isSuccess) {
      return;
    }
    this.$data.lives = res.data.data;
  }
  async getTeams() {
    const matchId = this.$route.params.id;
    const res = await ApiTeam.teams({
      pageNum: 0,
      pageSize: 999,
      matchId: +matchId,
    });
    if (!res.isSuccess) {
      return;
    }
    this.$data.teams = res.data.data;
  }
  async reSeteditForm() {
    const scheduleId = this.$route.params.scheduleId;
    const res = await ApiSchedule.getSchedule(+scheduleId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.editForm = {
      ...res.data,
    };
    this.$data.startTime = res.data.startTime * 1000;
  }
}
</script>

<style scoped lang="less">
.slide-content-item {
  margin-bottom: 10px;
}
</style>