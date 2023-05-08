import { defineStore } from 'pinia'
import axios from 'axios'
export const useFaqsStore = defineStore('faqs', {
    state: () => ({
        faqs: null,
    }),
    actions: {
        getFaqs() {
            axios.get(`${process.env.VUE_APP_API_URL}faqs?populate=*`).then(res => {
                this.faqs = res.data.data;
            }).catch(err => {
                console.log(err)
            })
        }
    }
})