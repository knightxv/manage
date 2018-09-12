<template>
  <div class="home">
    首页可以放一些直播数据表格
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
// import { mapState, mapActions } from 'vuex';
// import { IUserInfoState } from '../../stores/modules/userInfo';
// import { Getter, Action, State } from 'vuex-class';
// import { MY_USER_NAME } from '../../stores/getters-types';

@Component({
  name: '',
  components: {
    // HelloWorld,
  },
})
export default class Home extends Vue {
  // @Getter(MY_USER_NAME) userName!: string;
  // @State userInfo!: IUserInfoState;
  public data() {
    return {
      a: '344',
    };
  }
  public created() {
    // console.log(this.userInfo.userName);
    // console.log(this.$store.state.userInfo);
  }
}
</script>
