<template>
<div>
  <el-form :model="form" label-width="130px" class="form-box" :rules="formRules" ref="addForm">
    <el-form-item label="视频标题" prop="videoTitle">
      <el-input v-model="form.videoTitle" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="播放地址" prop="videoUrl">
      <el-input v-model="form.videoUrl" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="视频介绍" prop="videoIntroduction">
      <el-input v-model="form.videoIntroduction" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="赛程关联" prop="videoIntroduction">
      <el-select v-model="form.matchScheduleId" filterable placeholder="选择要关联赛程">
        <el-option
          v-for="item in schedules"
          :key="item.id"
          :label="`${item.matchScheduleName}`"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="视频封面" prop="videoImage">
      <app-upload :imgUrl.sync="form.videoImage"></app-upload>
    </el-form-item>
    <el-form-item label="记录时间" prop="recordTime">
      <el-date-picker
        v-model="form.recordTime"
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
import ApiVideoGroup from '@/services/cms/videoGroup';
@Component
export default class MatchVideoEdit extends Vue {
  data() {
    return {
      loading: false,
      form: {
        // matchId: null,
        matchScheduleId: null,
        matchVideoType: 'MATCH_RECORD',
        videoImage: '',
        videoIntroduction: '',
        videoTitle: '',
        videoUrl: '',
      },
      formRules: {},
      schedules: [],
      videoGroupList: [],
    };
  }
  mounted() {
    this.getSchedules();
    this.getVideoInfo();
  }
  async getVideoInfo() {
    const { videoId } = this.$route.params;
    const res = await ApiMatchVideo.getVideo(videoId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.form = {
      ...res.data,
      recordTime: res.data.recordTime * 1000,
    };
  }
  async getSchedules() {
    const matchId = +this.$route.params.id;
    const params = {
      pageNum: 0,
      pageSize: 999,
      matchId,
    };
    const res = await ApiSchedule.schedules(params);
    if (!res.isSuccess) {
      return;
    }
    this.$data.schedules = res.data.data;
  }
  async addSubmit() {
    const matchId = +this.$route.params.id;
    const params = {
      ...this.$data.form,
      recordTime: Math.floor(this.$data.form.recordTime / 1000),
    };
    this.$data.loading = true;
    const res = await ApiMatchVideo.editVideo(params);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('修改成功');
    this.$router.back();
  }
}
</script>

<style scoped lang="less">
</style>