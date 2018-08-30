<template>
    <el-aside class="app-sidebar" width="auto">
        <el-menu 
            class="sidebar-el-menu" :default-active="onRoutes" :collapse="appState.menuCollapse"
            background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff"
            unique-opened router
        >
            <template v-for="item in items">
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

import { State } from 'vuex-class';

@Component({
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        },
    },
})
export default class Sidebar extends Vue {
    @State('app') appState!: IAppState;
    data() {
        return {
            items: [
                {
                    icon: 'el-icon-setting',
                    index: '/home',
                    title: '系统首页',
                },
                {
                    icon: 'el-icon-tickets',
                    index: '/admin/user',
                    title: '用户管理',
                },
                {
                    icon: 'el-icon-message',
                    index: 'about',
                    title: 'tab选项卡',
                },
                {
                    icon: 'el-icon-date',
                    index: '3',
                    title: '表单相关',
                    children: [
                        {
                            index: 'form',
                            title: '基本表单',
                        },
                        {
                            index: 'editor',
                            title: '富文本编辑器',
                        },
                        {
                            index: 'markdown',
                            title: 'markdown编辑器',
                        },
                        {
                            index: 'upload',
                            title: '文件上传',
                        },
                    ],
                },
                {
                    icon: 'el-icon-star-on',
                    index: 'charts',
                    title: 'schart图表',
                },
                {
                    icon: 'el-icon-rank',
                    index: 'drag',
                    title: '拖拽列表',
                },
                {
                    icon: 'el-icon-warning',
                    index: 'permission',
                    title: '权限测试',
                },
                {
                    icon: 'el-icon-error',
                    index: '404',
                    title: '404页面',
                },
            ],
        };
    }
}
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