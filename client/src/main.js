import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

import global_ from './components/common/Global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面

Vue.config.productionTip = false;
Vue.config.tools = true;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 《编译原理》试题库与辅助出卷系统`;
    const role = localStorage.getItem('user');
    if (!role && to.path !== '/login') {
        next('/login');
    } 
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        else if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
