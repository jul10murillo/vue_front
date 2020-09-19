import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/Home.vue'
import Login from './components/Login.vue'
import Apartamentos from './components/Apartamentos.vue'
import Apartamento from './components/Apartamento.vue'
import Nuevoapartamento from './components/Nuevoapartamento.vue'
import Interesado from './components/Interesados.vue'
import Register from './components/Register.vue'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/Apartamentos',
            name: 'apartamentos',
            component: Apartamentos,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/apartamento',
            name: 'apartamentos',
            component: Apartamento,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/apartamento/crear',
            name: 'apartamento_nuevo',
            component: Nuevoapartamento,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/interesado',
            name: 'interesado',
            component: Interesado,
            meta: {
                requiresAuth: true
            }
        }

    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router