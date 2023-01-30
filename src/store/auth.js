import { defineStore } from 'pinia'
import axios from 'axios'
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    actions: {
        register(user) {
            console.log(user)
            axios.post(`${process.env.VUE_APP_API_URL}auth/local/register`, user).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
        login(user) {
            console.log(user)
            axios.post(`${process.env.VUE_APP_API_URL}auth/local`, user).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }
})