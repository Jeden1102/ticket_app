import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router';
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        loginError: null,
        registerError: null,
    }),
    actions: {
        register(user) {
            console.log(user)
            axios.post(`${process.env.VUE_APP_API_URL}auth/local/register`, user).then(res => {
                this.setUserData(res.data)
                router.push({ name: 'Account' })
                console.log(res)
            }).catch(err => {
                console.log(err)
                this.registerError = err.response.data.error.message
            })
        },
        login(user) {
            console.log(user)
            axios.post(`${process.env.VUE_APP_API_URL}auth/local`, user).then(res => {
                this.setUserData(res.data)
                router.push({ name: 'Account' })
                console.log(res)
            }).catch(err => {
                this.loginError = err.response.data.error.message
            })
        },
        logout() {
            this.user = null;
            localStorage.removeItem('go-tickets__user');
            localStorage.removeItem('go-tickets__jwt');
            router.push({ name: 'Home' })
        },
        setUserData(data) {
            this.user = data.user
            localStorage.setItem('go-tickets__user', JSON.stringify(data.user));
            localStorage.setItem('go-tickets__jwt', data.jwt);
        },
        checkUserLoggedIn() {
            if (!localStorage.getItem('go-tickets__jwt')) return;
            this.user = JSON.parse(localStorage.getItem('go-tickets__user'))
        }
    }
})