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
        // 登录
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('@/views/login.vue')
        },
        // 注册
        {
            path: '/register',
            name: 'register',
            component: () =>
                import ('@/views/register.vue')
        },
        // 手机验证
        {
            path: '/phoneVerification',
            name: 'phoneVerification',
            component: () =>
                import ('@/views/phoneVerification.vue')
        },
        // 验证码登录
        {
            path: '/verification',
            name: 'verification',
            component: () =>
                import ('@/views/verification.vue')
        },
        // 人脸识别登录
        {
            path: '/faceRfecognition',
            name: 'faceRfecognition',
            component: () =>
                import ('@/views/faceRfecognition.vue')
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
