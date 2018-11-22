<template>
<div class="container">
  <el-form label-width="80px" ref="addForm">
    <el-form-item label="礼物">
      <el-checkbox-group v-model="supportGiftIds">
        <el-checkbox v-for="gift in supportAllGifts" :label="gift.id" :key="gift.id">
          {{gift.giftName}}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
  </el-form>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiGift from '@/services/liveapp/gift';
@Component
export default class EditGiftGroupGift extends Vue {
  data() {
    return {
      supportGiftIds: [],
      supportAllGifts: [],
      addLoading: false,
    };
  }
  mounted() {
    this.getAllGiftList();
    this.getGiftGroupDetail();
  }
  async getGiftGroupDetail() {
    const { giftGroupId } = this.$route.params;
    const res = await ApiGift.getGiftGroupDetail(giftGroupId);
    if (!res.isSuccess || res.data == null) {
      return;
    }
    const supportGiftVOS = res.data.supportGiftVOS;
    if (supportGiftVOS == null) {
      return;
    }
    this.$data.supportGiftIds = supportGiftVOS.map((gift: any) => {
      return gift.id;
    });
  }
  async addSubmit() {
    const supportGiftIds = this.$data.supportGiftIds;
    const res = await ApiGift.editSupportGiftToGroup({
      supportGiftIds,
      supportGiftToGroupId: this.$route.params.giftGroupId,
    });
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('修改成功');
    this.$router.back();
  }
  async getAllGiftList() {
    const params = {
      pageNum: 0,
      pageSize: 999,
    };
    const res = await ApiGift.giftList(params);
    if (!res.isSuccess) {
      return;
    }
    this.$data.supportAllGifts = res.data.data;
  }
}
</script>

<style scoped lang="less">
</style>