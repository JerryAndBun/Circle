import vue from "vue"
import vueRouter from 'vue-router'

vue.use(vueRouter)
const routes = new vueRouter({
    mode: 'history',
    routes: [{
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
        path: '/userpage', component: () => import('../pages/UserPage.vue')
    }
    ]
})
export default routes