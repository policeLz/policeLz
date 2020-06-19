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
            component: () => import ('@/views/manager/index.vue'),
            children: [
                // 用户管理
                {
                    path: '/manager/system/user',
                    name: 'user',
                    component: () => import ('@/views/manager/system/user.vue')
                },
                // 角色管理
                {
                    path: '/manager/system/role',
                    name: 'role',
                    component: () => import ('@/views/manager/system/role.vue')
                },
                // 权限管理
                {
                    path: '/manager/system/authority',
                    name: 'authority',
                    component: () => import ('@/views/manager/system/authority.vue')
                }
            ]
        }
    ]
}
)
