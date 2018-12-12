<template>
<div class="container">
  <el-form class="form-box" >
    <template v-if="allSlideshow">
      <el-form-item label="赛事页面绑定的幻灯片" prop="matchSelectSlideshowId">
          <el-select v-model="matchSelectSlideshowId" filterable placeholder="请选择">
            <el-option key="-1" label="null" :value="null"> </el-option>
            <el-option
              v-for="item in allSlideshow"
              :key="item.id"
              :label="item.slideshowName"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="录播页面绑定的幻灯片" prop="playBackSelectSlideshowId">
          <el-select v-model="playBackSelectSlideshowId" filterable placeholder="请选择">
            <el-option key="-1" label="null" :value="null"> </el-option>
            <el-option
              v-for="item in allSlideshow"
              :key="item.id"
              :label="item.slideshowName"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="直播间默认幻灯片" prop="liveDefaultSlideShowId">
          <el-select v-model="liveDefaultSlideShowId" filterable placeholder="请选择">
            <el-option key="-1" label="null" :value="null"> </el-option>
            <el-option
              v-for="item in allSlideshow"
              :key="item.id"
              :label="item.slideshowName"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
    </template>
  </el-form>
  <div>
    <el-button @click="submit" type="primary">提交</el-button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiGlobalProperties from '@/services/cms/globalProperties';
import { systemType, globalPropertiesType } from '@/app/typeDef';
import ApiSlideShow from '@/services/cms/slideShow';
@Component
export default class GlobalProperties extends Vue {
  data() {
    return {
      allSlideshow: null,
      matchSelectSlideshowId: null,
      playBackSelectSlideshowId: null,
      // globalProperties: [],
      liveDefaultSlideShowId: null,
    };
  }
  mounted() {
    this.getAllSlideshows();
    this.getGlobalProperties();
  }
  async getGlobalProperties() {
    const res = await ApiGlobalProperties.getGlobalProperties();
    if (!res.isSuccess) {
      return;
    }
    if (res.data == null) {
      return;
    }
    const properties = res.data;
    properties.forEach((propertie: any) => {
      if (propertie.globalPropertiesType === globalPropertiesType.HOME_PAGE_SLIDESHOW) {
        this.$data.matchSelectSlideshowId = +propertie.value;
      }
      if (propertie.globalPropertiesType === globalPropertiesType.VIDEO_PAGE_SLIDESHOW) {
        this.$data.playBackSelectSlideshowId = +propertie.value;
      }
      if (propertie.globalPropertiesType === globalPropertiesType.DEFAULT_LIVE_SLIDESHOW) {
        this.$data.liveDefaultSlideShowId = +propertie.value;
      }
    });
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
  async submit() {
    const clearRes = await ApiGlobalProperties.clearCache();
    if (!clearRes.isSuccess) {
      return;
    }
    const globalProperties: any[] = [];
    this.setMatchSlidePropertie(globalProperties);
    this.setPlayBackSlidePropertie(globalProperties);
    this.setDefaultLiveSlidePropertie(globalProperties);
    const res = await ApiGlobalProperties.saveProperties(globalProperties);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('更新成功');
  }
  setMatchSlidePropertie(globalProperties: any[]) {
    const matchSelectSlideshowId = this.$data.matchSelectSlideshowId;
    if (!matchSelectSlideshowId) {
      return;
    }
    globalProperties.push({
      globalPropertiesType: globalPropertiesType.HOME_PAGE_SLIDESHOW,
      id: 0,
      value: matchSelectSlideshowId,
    });
  }
  setPlayBackSlidePropertie(globalProperties: any[]) {
    const playBackSelectSlideshowId = this.$data.playBackSelectSlideshowId;
    if (!playBackSelectSlideshowId) {
      return;
    }
    globalProperties.push({
      globalPropertiesType: globalPropertiesType.VIDEO_PAGE_SLIDESHOW,
      id: 1,
      value: playBackSelectSlideshowId,
    });
  }
  setDefaultLiveSlidePropertie(globalProperties: any[]) {
    const liveDefaultSlideShowId = this.$data.liveDefaultSlideShowId;
    if (!liveDefaultSlideShowId) {
      return;
    }
    globalProperties.push({
      globalPropertiesType: globalPropertiesType.DEFAULT_LIVE_SLIDESHOW,
      id: 2,
      value: liveDefaultSlideShowId,
    });
  }
}
</script>

<style scoped lang="less">
.box-card {
  max-width: 600px;
}
</style>