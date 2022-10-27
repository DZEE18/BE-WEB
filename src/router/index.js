import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './../views/login'
import Register from './../views/register'
import CreateOrder from './../views/create-order'
import ListOrder from './../views/list-order'
import Admin from './../views/admin'
import AdminOrder from './../views/admin/order'
import AdminProduct from './../views/admin/product'
import AdminRefund from './../views/admin/refund'
import AdminCustomer from './../views/admin/customer'
import AdminDelivery from './../views/admin/delivery'
import AdminPayment from './../views/admin/payment'

const needLogin = (to, from, next) => {
    if (!Vue.$cookies.get('user')) {
        return router.push({ name: 'login' });
    }
    return next();
}

const noNeedLogin = (to, from, next) => {
    let user = Vue.$cookies.get('user')
    if (user) {
        if(user.role == 'admin'){
            return router.push({ name: 'admin-product' });
        }else{
            return router.push({ name: 'home' });
        }
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
    { path: '/admin', name: 'admin', component: Admin, beforeEnter: needLogin, children: [
        { path: 'order', name: 'admin-order', component: AdminOrder, beforeEnter: needLogin },
        { path: 'product', name: 'admin-product', component: AdminProduct, beforeEnter: needLogin },
        { path: 'refund', name: 'admin-refund', component: AdminRefund, beforeEnter: needLogin },
        { path: 'customer', name: 'admin-customer', component: AdminCustomer, beforeEnter: needLogin },
        { path: 'delivery', name: 'admin-delivery', component: AdminDelivery, beforeEnter: needLogin },
        { path: 'payment', name: 'admin-payment', component: AdminPayment, beforeEnter: needLogin },
    ]},
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router