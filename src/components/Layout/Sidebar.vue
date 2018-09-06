<template>
    <el-aside class="app-sidebar" width="auto">
        <el-menu 
            class="sidebar-el-menu" :default-active="onRoutes" :collapse="appState.menuCollapse"
            background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff"
            unique-opened router
        >
            <template v-for="item in menus">
                <template v-if="item.children">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span class="menu-title" slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span class="menu-title" slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        
    </el-aside>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IAppState } from '../../stores/modules/app';
import { USER_MENUS } from '../../stores/getters-types';
import { State, Getter } from 'vuex-class';
@Component({
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        },
    },
})
export default class Sidebar extends Vue {
  @State('app') appState!: IAppState;
  @Getter(USER_MENUS) menus!: any[];
}
// [
//   {
//       icon: 'el-icon-setting',
//       index: '',
//       title: '系统首页',
//       children: [
//           {
//               index: '/admin/user',
//               title: '用户管理',
//           },
//           {
//               index: '/admin/role',
//               title: '角色管理',
//           },
//           {
//               index: '/admin/menu',
//               title: '菜单管理',
//           },
//       ],
//   },
// ],
</script>

<style scoped lang="less">
.app-sidebar {
    align-items: stretch;
    background: #2f4050;
    color: #fff;
}
.sidebar::-webkit-scrollbar{
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse){
    width: 180px;
}
// .menu-title {
//     padding: 0 15px;
// }
</style>