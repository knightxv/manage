<template>
<div>
  <el-form :model="addForm" label-width="130px" class="form-box" :rules="addFormRules" ref="addForm">
    <el-form-item label="视频标题" prop="videoTitle">
      <el-input v-model="addForm.videoTitle" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="播放地址" prop="videoUrl">
      <el-input v-model="addForm.videoUrl" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="视频介绍" prop="videoIntroduction">
      <el-input v-model="addForm.videoIntroduction" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="赛程关联" prop="videoIntroduction">
      <el-select v-model="addForm.matchScheduleId" filterable placeholder="选择要关联赛程">
        <el-option
          v-for="item in schedules"
          :key="item.id"
          :label="`${item.matchScheduleName}`"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="视频封面" prop="videoImage">
      <app-upload :imgUrl.sync="addForm.videoImage"></app-upload>
    </el-form-item>
    <el-form-item label="记录时间" prop="recordTime">
      <el-date-picker
        v-model="addForm.recordTime"
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
import ApiMatchVideo from '@/services/liveapp/matchVideo';
@Component
export default class MatchVideoCreate extends Vue {
  data() {
    return {
      loading: false,
      addForm: {
        // matchId: null,
        matchScheduleId: null,
        videoImage: '',
        videoIntroduction: '',
        videoTitle: '',
        videoUrl: '',
        recordTime: new Date().getTime(),
      },
      addFormRules: {},
      schedules: [],
    };
  }
  mounted() {
    this.getSchedules();
  }
  async getSchedules() {
    const matchId = +this.$route.params.id;
    const params = {
      pageNum: 0,
      pageSize: 999,
      matchId,
    };
    this.$data.loading = true;
    const res = await ApiSchedule.schedules(params);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.schedules = res.data.data;
  }
  async addSubmit() {
    const matchId = +this.$route.params.id;
    const params = {
      ...this.$data.addForm,
      matchId,
      recordTime: Math.floor(this.$data.addForm.recordTime / 1000),
    };
    const res = await ApiMatchVideo.createVideo(params);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('创建成功');
    this.$router.back();
  }
}
</script>

<style scoped lang="less">
</style>