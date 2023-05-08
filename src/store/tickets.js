import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth';
export const useTicketsStore = defineStore('tickets', {
    state: () => ({ userTickets: null }),
    actions: {
        createTickets(tickets) {
            for (const key in tickets._value) {
                const element = tickets._value[key];
                for (let i = 0; i < element; i++) {
                    const config = {
                        method: 'post',
                        url: `${process.env.VUE_APP_API_URL}tickets`,
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('go-tickets__jwt')}`,
                            "Content-Type": "application/json",
                        },
                        data: JSON.stringify({
                            data: {
                                code: `${key}_${Math.random().toString(36).substr(2, 9).slice(0,3) + '-' + Date.now().toString(36).slice(4)}`,
                                used: false,
                                email: useAuthStore().user.email,
                                ticket_pool: key,
                            }
                        })
                    };
                    axios(config)
                        .then((res) => {
                            console.log(res)
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                }
            }
        },
        getUserTickets() {
            const config = {
                method: 'get',
                url: `${process.env.VUE_APP_API_URL}tickets?[filters][email][$eq]=${useAuthStore().user.email}&populate=ticket_pool.event`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('go-tickets__jwt')}`,
                    "Content-Type": "application/json",
                },
            };
            axios(config)
                .then((res) => {
                    console.log(res)
                    this.userTickets = res.data
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }
})