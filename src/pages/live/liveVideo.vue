<template>
<div class="container">
  直播测试
  <el-form label-width="130px" class="form-box">
    <el-form-item label="直播地址" prop="url">
      <el-input v-model="url" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div>
    <el-button type="primary" @click.native="addSubmit">提交</el-button>
  </div>
  <div id="wrapper" class="wrapper">
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiLive from '@/services/liveapp/live';
import Chimee from 'chimee';
import flv from 'chimee-kernel-flv';
import hls from 'chimee-kernel-hls';
@Component
export default class LiveVideo extends Vue {
  data() {
    return {
      url: '',
      liveUrl: null,
    };
  }
  async addSubmit() {
    const url = this.$data.url;
    if (!url) {
      return;
    }
    const res = await ApiLive.getQuanMinUrl(url);
    if (!res.isSuccess) {
      return;
    }
    const urlData = JSON.parse(res.data);
    console.log(urlData);
    const flvObj = urlData.live.ws.flv;
    const liveUrl = flvObj[Object.keys(flvObj)[0]].src;
    this.$data.liveUrl = liveUrl;
    this.initChimee(liveUrl);
  }
  // mounted() {
  //   this.initChimee();
  // }
  initChimee(liveUrl: string) {
    const chimee = new Chimee({
      wrapper: '#wrapper',
      src: liveUrl,
      isLive: true,
      controls: true,
      autoplay: true,
      kernels: {
        flv,
        hls,
      },
    });
    chimee.play();
  }
}
</script>

<style scoped lang="less">
#wrapper {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  margin-top: 30px;
  video {
    width: 100%;
    height: 100%;
    display: block;
    background-color: #000;
  }
  video:focus,
  video:active {
    outline: none;
  }
}
</style>