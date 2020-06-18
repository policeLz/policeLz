import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)

export default new Router({
    routes: [
        { 
            path: '/', 
            redirect: '/BMap' 
        },
        {
            path: '/BMap',
            name: 'BMap',
            component: () =>
                import ('@/views/BMap/index.vue')
        },
        // 管理系统首页
        {
            path: '/manager',
            name: 'manager',
            component: () =>
                import ('@/views/manager/index.vue')
        }
    ]
}
)
