import { defineStore } from 'pinia'
import axios from 'axios'
export const useClientsStore = defineStore('clients', {
    state: () => ({
        clients: null,
    }),
    actions: {
        getClients() {
            axios.get(`${process.env.VUE_APP_API_URL}clients?populate=*`).then(res => {
                this.clients = res.data.data;
            }).catch(err => {
                console.log(err)
            })
        }
    }
})