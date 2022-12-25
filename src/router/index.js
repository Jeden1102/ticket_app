import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: function() {
            return import ('../views/About.vue')
        }
    },
    {
        path: '/events',
        name: 'Events',
        component: function() {
            return import ('../views/Events.vue')
        }
    },
    {
        path: '/account',
        name: 'Account',
        component: function() {
            return import ('../views/Account.vue')
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router