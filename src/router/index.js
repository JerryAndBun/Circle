import vue from "vue"
import vueRouter from 'vue-router'

vue.use(vueRouter)
const routes = new vueRouter({
    mode: 'history',
    routes: [
        {
            path: '/', component: () => import('../pages/Main.vue')
        },
        {
            path: '/login', component: () => import('../pages/Login.vue'),
            children: [
                {
                    path: '/', component: () => import('../components/Codelogin.vue')
                },
                {
                    path: 'register', component: () => import('../components/Register.vue')
                }
            ]

        },
        {
            path: '/userpage/:myuid', component: () => import('../pages/UserPage.vue'),
            children: [
                {
                    path: '/', redirect: 'space'
                },
                {
                    path: 'space', component: () => import('../components/Space')
                },
                {
                    path: 'videolist', component: () => import('../components/VideoList')
                },
                {
                    path: 'fanslist', component: () => import('../components/FansList')
                },
                {
                    path: 'setting', component: () => import('../components/Setting'),
                    children: [
                        {
                            path: '/', redirect: 'basicinfo'
                        },
                        {
                            path: 'basicinfo', component: () => import('../components/BasicInfo.vue'),
                        },
                        {
                            path: 'accountsecurity', component: () => import('../components/AccountSecurity.vue'),
                        },
                    ]
                },
            ]
        },
        {
            path: '/searchresult', component: () => import('../pages/SearchResult.vue'),
            children: [
                {
                    path: '/', redirect: 'video'
                },
                {
                    path: 'video', component: () => import('../components/VideoResult.vue')
                },
                {
                    path: 'user', component: () => import('../components/UserResult.vue')
                }
            ]
        },
        {
            path: '/messagepage', component: () => import('../pages/MessagePage.vue'),
            children: [
                {
                    path: ':uid', name: 'window', component: () => import('../components/MessageWindow.vue'),
                },
            ]
        },
        {
            path: '/contribution', component: () => import('../pages/Contribution.vue'),
        },
        {
            path: '/video', component: () => import('../components/VideoPlay.vue'),
            children: [
                { path: ':cv', component: () => import('../components/VideoPlay.vue') }
            ]
        }
    ]
})
export default routes