import { defineStore } from 'pinia'
import axios from 'axios'
export const usePricingStore = defineStore('pricings', {
    state: () => ({
        pricings: null,
    }),
    actions: {
        getPricings() {
            console.log("okkdawdaww")
            axios.get(`${process.env.VUE_APP_API_URL}pricings`).then(res => {
                this.pricings = res.data.data;
            }).catch(err => {
                console.log(err)
            })
        }
    }
})