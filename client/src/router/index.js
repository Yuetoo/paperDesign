import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    
    routes: [
       
        {
            path:'/index',
            redirect:'/home'
        },
        {
            path: '/index',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/home',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Index.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/questionTable',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/QuestionTable.vue'),
                    meta: { title: '试题库管理' }
                },
                {
                    path: '/paperTable',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/PaperTable.vue'),
                    meta: { title: '试卷管理' }
                },
                {
                    path: '/manualCreate',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/ManualCreate.vue'),
                    meta: { title: '手动组卷' }
                },
                {
                    path: '/bulletin',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Bulletin.vue'),
                    meta: { title: '通知公告' }
                },

                {
                    path: '/inputForm',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/InputForm.vue'),
                    meta: { title: '手工录入' }
                },
                {
                    // 富文本编辑器组件
                    path: '/autoCreate',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/autoCreate.vue'),
                    meta: { title: '智能组卷' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/Analysis.vue'),
                    meta: { title: '试卷分析' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/userAdmin',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/UserAdmin.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path:'/modifyPassword',
                    component:() => import('../components/page/modifyPassword.vue'),
                    meta:{title:'修改密码'}
                }
               
            ]
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录'}
           
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
