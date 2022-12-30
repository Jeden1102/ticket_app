import { defineStore } from 'pinia'
import axios from 'axios'
export const useReviewsStore = defineStore('reviews', {
    state: () => ({
        reviews: null,
    }),
    actions: {
        getReviews() {
            axios.get(`${process.env.VUE_APP_API_URL}reviews?[filters][visible][$eq]=true&populate=*`).then(res => {
                this.reviews = res.data.data;
            }).catch(err => {
                console.log(err)
            })
        }
    }
})