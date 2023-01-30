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
        },
        children: [{
                path: 'map',
                name: 'EventsMap',
                component: function() {
                    return import ('../components/Events/EventsMap.vue')
                },
            },
            {
                path: 'list',
                name: 'EventsList',
                component: function() {
                    return import ('../components/Events/EventsList.vue')
                },
            },
        ]
    },
    {
        path: '/account',
        name: 'Account',
        component: function() {
            return import ('../views/Account.vue')
        }
    },
    {
        path: '/faq',
        name: 'Faq',
        component: function() {
            return import ('../views/Faq.vue')
        }
    },
    {
        path: '/login-register',
        name: 'LoginRegister',
        component: function() {
            return import ('../views/LoginRegister.vue')
        },
        children: [{
                path: 'login',
                name: 'Login',
                component: function() {
                    return import ('../components/LoginRegister/Login.vue')
                },
            },
            {
                path: 'register',
                name: 'Register',
                component: function() {
                    return import ('../components/LoginRegister/Register.vue')
                },
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router