import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './stores/store';

import Element from 'element-ui';
Vue.use(Element, { size: 'small', zIndex: 3000 });

// const requireComponent = require.context(
//   // 其组件目录的相对路径
//   './components',
//   // 是否查询其子目录
//   false,
//   // 匹配基础组件文件名的正则表达式
//   /Base[A-Z]\w+\.(vue|js)$/
// );
// console.log(requireComponent);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
