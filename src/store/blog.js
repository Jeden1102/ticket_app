import { defineStore } from 'pinia'
import axios from 'axios'
export const useBlogsStore = defineStore('blogs', {
    state: () => ({
        blogs: null,
    }),
    actions: {
        getBlogs() {
            axios.get(`${process.env.VUE_APP_API_URL}blogs?populate=*`).then(res => {
                this.blogs = res.data.data;
            }).catch(err => {
                console.log(err)
            })
        }
    }
})