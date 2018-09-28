<template>
  <div class="container">
    <el-row type="flex" justify="space-between" align="middle" >
      <el-col :span="9">
        <el-button
          :type="status === 'ALL' ? 'primary' : ''"
          round
          @click="status = 'ALL'"
        >
        全部
        </el-button>
        <el-button
          :type="status === 'ENABLE' ? 'primary' : ''"
          round
          @click="status = 'ENABLE'"
        >
        已上架
        </el-button>
        <el-button
          :type="status === 'UNABLE' ? 'primary' : ''"
          round
          @click="status = 'UNABLE'"
        >
        已下架
        </el-button>
      </el-col>
      <el-col :span="3">
        <router-link to="/ball/match/addMatch">
          <el-button type="primary">创建赛事</el-button>
        </router-link>
      </el-col>
    </el-row>

    <div class="match-list-container">
      <el-row v-for="item in filterMatchs"
        class="list-item"
        type="flex"
        justify="space-between"
        align="middle"
        :key="item.id"
      >
        <el-col :span="18">
          <el-row type="flex">
            <router-link :to="`/ball/match/detail/${item.id}/info`" class="match-cover-container">
              <div class="match-cover-img-wrap">
                <app-net-img :imgUrl="item.mainImage" alt=""></app-net-img>
              </div>
              <span v-if="item.enabled ==='ON'" class="status ENABLE">已上架</span>
              <span v-if="item.enabled ==='OFF'" class="status UNABLE">已下架</span>
            </router-link>
            <div>
              <router-link :to="`/ball/match/detail/${item.id}/info`" class="match-title">
                {{ item.matchName }}
              </router-link>
              <p class="match-mater-name">
                赛事报名时间: 
                <span>
                  {{ $app.helps.formatDateBySecTime(item.startSignUpTime) }}
                  ~ 
                  {{ $app.helps.formatDateBySecTime(item.endSignUpTime) }}
                </span>
              </p>
              <p class="match-mater-name">
                比赛时间
                <span>
                  {{ $app.helps.formatDateBySecTime(item.startMatchTime) }}
                  ~ 
                  {{ $app.helps.formatDateBySecTime(item.endMatchTime) }}
                </span>
              </p>
              <p class="match-mater-name">
                冠名商: <span>{{ item.namingQuotient }}</span> 承办方 <span>{{ item.matchUndertake }}</span>
              </p>
            </div>
          </el-row>
        </el-col>
        <el-col :span="5" :pull="1">
          <el-row type="flex" justify="end">
            <el-button v-if="item.enabled ==='OFF'" type="success" @click="grounding(item.id)">上架</el-button>
            <el-button v-if="item.enabled ==='ON'" type="warning" @click="undercarriage(item.id)">下架</el-button>
            <el-button v-if="item.enabled !='ON'" type="primary" @click="goEditPage(item.id)">编辑</el-button>
            <el-button
              v-if="item.enabled !='ON'"
              type="danger"
              @click="remove(item.id)"
            >删除</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiMatch from '@/services/liveapp/match';
import { IMatchInfoItem } from '@/services/apiDataType';
@Component({
  computed: {
    filterMatchs() {
      return this.$data.matchs.filter((mathInfo: IMatchInfoItem) => {
        const status = this.$data.status;
        if (status === 'ALL') {
          return true;
        }
        if (status === 'ENABLE') {
          return mathInfo.enabled === 'ON';
        }
        if (status === 'UNABLE') {
          return mathInfo.enabled === 'OFF';
        }
        if (status === 'DELETED') {
          return mathInfo.deleted;
        }
        return false;
      });
    },
  },
})
export default class Match extends Vue {
  data() {
    return {
      status: 'ALL',
      matchs: [],
    };
  }
  handleClick(tab: any, event: any) {
    console.log(tab, event);
  }
  mounted() {
    this.getMatchs();
  }
  /** 跳转编辑页面 */
  goEditPage(id: string) {
    this.$router.push({
      name: 'editMatch',
      params: {
        id,
      },
    });
  }
  // 上架
  async grounding(id: number) {
    const res = await ApiMatch.enable(id);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('上架成功');
    this.getMatchs();
  }
  // 下架
  async undercarriage(id: number) {
    const res = await ApiMatch.unable(id);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('下架成功');
    this.getMatchs();
  }
  async getMatchs() {
    const res = await ApiMatch.matchs({
      pageNum: 0,
      pageSize: 999,
    });
    if (!res.isSuccess) {
      return;
    }
    this.$data.matchs = res.data.data;
  }
  async remove(id: number) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiMatch.delete(id);
    if (!res.isSuccess) {
      return;
    }
    this.getMatchs();
  }
}
</script>

<style scoped lang="less">
// linear-gradient(90deg,#2d8cf0,rgba(45,140,240,.2))
.match-list-container {
  margin-top: 15px;
  font-size: 14px;
  p {
    color: #999;
    span {
      color: #333;
    }
  }
}
.match-cover-container {
  position: relative;
  cursor: pointer;
  .status {
    position: absolute;
    left: -5px;
    top: 10px;
    padding: 3px 15px 3px 10px;
    color: #fff;
  }
  .ENABLE {
    background: linear-gradient(90deg,#2d8cf0,rgba(45,140,240,.2));
  }
  .UNABLE {
    background: linear-gradient(90deg,#19be6b,rgba(25,190,107,.2));
  }
  .DELETE {
    background: linear-gradient(90deg,#ed3f14,rgba(237,63,20,.2));
  }
}
.list-item {
  border-top: 1px solid #dddee1;
  padding: 20px 10px;
}

.match-cover-img-wrap{
  width: 180px;
  height: 120px;
  overflow: hidden;
  margin-right: 20px;
}
.match-title {
  font-size: 1.3em;
  font-weight: 700;
  color: #333;
  text-decoration: none;
}
</style>