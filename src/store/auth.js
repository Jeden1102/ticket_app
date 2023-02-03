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
            axios.post(`${process.env.VUE_APP_API_URL}auth/local/register?populate=*`, user).then(res => {
                this.setUserData(res.data)
            }).catch(err => {
                console.log(err)
                this.registerError = err.response.data.error.message
            })
        },
        login(user) {
            axios.post(`${process.env.VUE_APP_API_URL}auth/local?populate=*`, user).then(res => {
                this.getUserData(res.data.jwt)
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
        getUserData(jwt) {
            const config = {
                headers: { Authorization: `Bearer ${jwt}` }
            };
            localStorage.setItem('go-tickets__jwt', jwt);
            axios.get(`${process.env.VUE_APP_API_URL}users/me?populate=*`, config).then(res => {
                this.setUserData(res.data)
            }).catch(err => {
                console.log(err)
                this.loginError = err.response.data.error.message
            })
        },
        setUserData(data) {
            this.user = data
            localStorage.setItem('go-tickets__user', JSON.stringify(data));
            router.push({ name: 'Account' })
        },
        refreshUserData() {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('go-tickets__jwt')}` }
            };
            axios.get(`${process.env.VUE_APP_API_URL}users/me?populate=*`, config).then(res => {
                this.user = res.data
                localStorage.setItem('go-tickets__user', JSON.stringify(res.data));
                console.log(this.user)
            }).catch(err => {
                console.log(err)
                this.loginError = err.response.data.error.message
            })
        },
        checkUserLoggedIn() {
            if (!localStorage.getItem('go-tickets__jwt')) return;
            this.user = JSON.parse(localStorage.getItem('go-tickets__user'))
        }
    }
})