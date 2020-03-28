<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
           
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
            <template v-if="userRank == 1">
                <el-menu-item :index="userAdmin.index" >
                    <i :class="userAdmin.icon"></i>
                    <span slot="title">{{ userAdmin.title }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'home',
                    title: '首页'
                },
                 {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '试题录入',
                    subs: [
                        {
                            index: 'inputForm',
                            title: '手工方式'
                        },
                    
                        {
                            index: 'upload',
                            title: '批量方式'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'questionTable',
                    title: '试题库管理'
                },
                 {
                    icon:"el-icon-lx-news",
                    index:'1',
                    title:'创建试卷',
                    subs:[{
                        index:'manualCreate',
                        title:'手动组卷'
                    }]
                },
                {
                    icon: 'el-icon-lx-punch',
                    index: 'paperTable',
                    title: '试卷管理'
                },
                 {
                    icon: 'el-icon-pie-chart',
                    index: 'charts',
                    title: '试卷分析'
                } ,
                {
                    icon:'el-icon-lx-people',
                    index:'2',
                    title:'个人中心',
                    subs:[{
                        index:'modifyPassword',
                        title:"修改密码"
                    }]
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'bulletin',
                    title: '通知公告'
                }
               
               
            ],
            userAdmin: {
                    icon: 'el-icon-lx-group',
                    index: 'userAdmin',
                    title: '用户管理'
                },
            userRank:-1,
        };
    },

    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
       
       this.userRank = sessionStorage.getItem('userRank');
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
