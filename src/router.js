import Vue from 'vue'
import VueRouter from 'vue-router';

//view components
import Home from './views/Home.vue';
import Client from './views/Client.vue';
import Balance from './views/Balance.vue';
import Pay from './views/Pay.vue';
import Verify from './views/Verify.vue';
import Recharge from './views/Recharge.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes: [
        {
            path:'/',
            name:'home',
            component:Home
        },
        {
            path:'/client',
            name:'client',
            component:Client
        },
        {
            path:'/balance',
            name:'balance',
            component:Balance
        },
        {
            path:'/recharge',
            name:'recharge',
            component:Recharge
        },
        {
            path:'/verification/:session',
            name:'verify',
            component:Verify
        },
        {
            path:'/pay',
            name:'pay',
            component:Pay
        }
    ]
})