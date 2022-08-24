import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './../views/login'
import Register from './../views/register'
import CreateOrder from './../views/create-order'
import ListOrder from './../views/list-order'

const needLogin = (to, from, next) => {
    if (!Vue.$cookies.get('user')) {
        return router.push({ name: 'login' });
    }
    return next();
}

const noNeedLogin = (to, from, next) => {
    if (Vue.$cookies.get('user')) {
        return router.push({ name: 'create-order' });
    }
    return next();
}

Vue.use(VueRouter)

const routes = [
    { path: '/login', name: 'login', component: Login, beforeEnter: noNeedLogin },
    { path: '/register', name: 'register', component: Register, beforeEnter: noNeedLogin },
    { path: '/', name: 'home', component: CreateOrder, beforeEnter: needLogin },
    { path: '/create-order', name: 'create-order', component: CreateOrder, beforeEnter: needLogin },
    { path: '/list-order', name: 'list-order', component: ListOrder, beforeEnter: needLogin },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router