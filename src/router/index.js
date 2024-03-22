import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from "js-cookie";

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'login',
        component: () =>
            import ('@/views/Login.vue')
    },
    {
        path: '*',
        redirect: '/'
    }, {
        path: '/admin',
        name: 'admin',
        beforeEnter: (to, from, next) => {
            const cookie = Cookies.get('admininfo');
            if (cookie == null) {
                return next('/');
            }
            next();
        },
        component: () =>
            import ('@/views/Main.vue'),
        children: [{
                path: 'managearticle',
                name: 'article0',
                component: () =>
                    import ('@/views/Article/Articles.vue')
            },
            {
                path: 'banarticle',
                name: 'article_1',
                component: () =>
                    import ('@/views/Article/Article_ban.vue')
            },
            {
                path: 'allowedarticle',
                name: 'article1',
                component: () =>
                    import ('@/views/Article/Article_allowed.vue')
            },
            {
                path: 'topics',
                name: 'topics0',
                component: () =>
                    import ('@/views/Topic/Topics.vue')
            },
            {
                path: 'topics_allowed',
                name: 'topics1',
                component: () =>
                    import ('@/views/Topic/AllowedTopic.vue')
            },
            {
                path: 'normaluser',
                name: 'normaluser',
                component: () =>
                    import ('@/views/User/User.vue')
            },
            {
                path: 'root',
                name: 'root',
                component: () =>
                    import ('@/views/User/Admin.vue')
            },
            {
                path: 'new',
                name: 'addroot',
                component: () =>
                    import ('@/views/User/Newadmin.vue')
            }
        ]
    }

]

const router = new VueRouter({
    routes
})

export default router