<template>
  <div id="app">
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { globalEvent } from './app/typeDef';
@Component({
})
export default class App extends Vue {
  public routerTimer!: any;
  public created() {
    this.$root.$on(globalEvent.NO_LOGIN, () => {
      clearTimeout(this.routerTimer);
      this.routerTimer = setTimeout(() => {
        clearTimeout(this.routerTimer);
        this.$router.push('/login');
      }, 300);
    });
  }
  destroyed() {
    console.log('app destroy');
    // tslint:disable-next-line:no-debugger
    debugger;
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
body, html {
  margin: 0;
  width: 100%;
  height: 100%;
}
.el-menu {
  border-right: 0;
}
// common
.container {
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
}
.form-box {
    max-width: 600px;
}
img {
  width: 100%;
  height: 100%;
}
a {
  color: #409EFF;
}
</style>
