<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
interface TagsListItem {
    title: string;
    path: string;
    name: string;
}
@Component({
    computed: {
        showTags() {
            console.log(this.$data.tagsList);
            return this.$data.tagsList.length > 0;
        },
    },
    watch: {
        $route(newValue, oldValue) {
            (this as Tags).setTags(newValue);
        },
    },
})
export default class Tags extends Vue {
    data() {
        return {
            tagsList: [],
        };
    }
    isActive(path: string) {
        return path === this.$route.fullPath;
    }
    // 关闭单个标签
    closeTags(index: number) {
        const delItem = this.$data.tagsList.splice(index, 1)[0];
        const item = this.$data.tagsList[index] ? this.$data.tagsList[index] : this.$data.tagsList[index - 1];
        if (!item) {
            this.$router.push('/');
            return;
        }
        if (delItem.path === this.$route.fullPath) {
            this.$router.push(item.path);
        }
    }
    // 关闭全部标签
    closeAll() {
        this.$data.tagsList = [];
        this.$router.push('/');
    }
    // 关闭其他标签
    closeOther() {
        const curItem = this.$data.tagsList.filter((item: TagsListItem) => {
            return item.path === this.$route.fullPath;
        });
        this.$data.tagsList = curItem;
    }
    // 设置标签
    setTags(route: any) {
        const isExist = this.$data.tagsList.some((item: TagsListItem) => {
            return item.path === route.fullPath;
        });
        if (isExist) {
            return;
        }
        this.$data.tagsList.push({
            title: route.meta.title,
            path: route.fullPath,
            name: route.meta.title,
        });
        // bus.$emit('tags', this.tagsList);
    }
    handleTags(command: string) {
        command === 'other' ? this.closeOther() : this.closeAll();
    }
    created() {
        this.setTags(this.$route);
    }
}
</script>

<style scoped lang="less">
    .tags {
        position: relative;
        height: 50px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        float: left;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: rgb(26, 211, 103);
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: rgb(26, 211, 103);
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 10px;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }

</style>