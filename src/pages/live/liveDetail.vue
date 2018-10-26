<template>
<div class="container">
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-form :inline="true">
      <el-form-item>
        <el-button type="warning" @click="clearClickCount">清空点击数</el-button>
      </el-form-item>
      <el-form-item label="上热播">
        <el-switch v-model="homePageShow" @change="changeHotLiveHandler"></el-switch>
      </el-form-item>
    </el-form>
  </el-col>
  <el-card class="box-card">
    <el-row slot="header" type="flex" align="middle">
      <el-col>
        幻灯片列表
      </el-col>
      <el-select v-model="selectSlideshowId" filterable placeholder="要绑定的幻灯片">
        <el-option
          v-for="item in allSlideshow"
          :key="item.id"
          :label="`${item.slideshowName}`"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button @click="addSlideshow" type="primary">添加</el-button>
    </el-row>
    <el-row
      v-for="(item, index) in bindSlideshows"
      :key="index"
      type="flex"
      justify="space-between"
      align="middle"
      class="slide-content-item"
    >
      <el-row type="flex">
        <div class="link-url">名称：{{ item.slideshowVO.slideshowName }}</div>
      </el-row>
      <el-row type="flex">
        <el-button
        type="danger"
        @click="deleteSlideshow(item.slideshowVO.id)"
        >删除</el-button>
      </el-row>
    </el-row>
  </el-card>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiLive from '@/services/liveapp/live';
import ApiSlideShow from '@/services/cms/slideShow';
import { systemType } from '@/app/typeDef';
@Component
export default class LiveDetail extends Vue {
  data() {
    return {
      loading: false,
      homePageShow: false,
      // slide show
      selectSlideshowId: '',
      bindSlideshows: [],
      allSlideshow: [],
    };
  }
  mounted() {
    this.getDetail();
    this.getScheduleSlideshows();
    this.getAllSlideshows();
  }
  async getDetail() {
    const { liveId } = this.$route.params;
    const res = await ApiLive.getLive(liveId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.homePageShow = res.data.homePageShow;
  }
  async changeHotLiveHandler(val: boolean) {
    const { liveId } = this.$route.params;
    const res = await ApiLive.editHomePageShow(liveId, val);
    if (!res.isSuccess) {
      this.$data.homePageShow = !val;
      return;
    }
  }
  // 幻灯片
  async getScheduleSlideshows() {
    const { liveId } = this.$route.params;
    const res = await ApiLive.getLiveSlideShowList(liveId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.bindSlideshows = res.data;
  }
  async getAllSlideshows() {
    const params = {
      pageNum: 0,
      pageSize: 999,
      systemType: systemType.APP,
    };
    const res = await ApiSlideShow.slideShowList(params);
    if (!res.isSuccess) {
      return;
    }
    this.$data.allSlideshow = res.data.data;
  }
  async addSlideshow() {
    const slideshowId = this.$data.selectSlideshowId;
    const { liveId } = this.$route.params;
    const params = {
      liveId,
      slideshowId,
    };
    const res = await ApiLive.addBindSlideshow(params);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('添加成功');
    this.getScheduleSlideshows();
  }
  async deleteSlideshow(slideshowId: number) {
    const { liveId } = this.$route.params;
    const params = {
      liveId,
      slideshowId,
    };
    const res = await ApiLive.unBindSlideShow(params);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.getScheduleSlideshows();
  }
  async clearClickCount() {
    const { liveId } = this.$route.params;
    const res = await ApiLive.clearLiveUserClickTimes(liveId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('清空完毕');
  }
}
</script>

<style scoped lang="less">
.box-card {
  max-width: 600px;
}
</style>