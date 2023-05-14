import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth';
import { useToast } from 'vue-toastification'
const toast = useToast()
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
                            toast.info("Ticket purchased succesfully!", {
                                timeout: 5000
                            });
                        })
                        .catch(function(err) {
                            console.log(err);
                            toast.error("There was an error purchasing your ticket!", {
                                timeout: 5000
                            });
                        });
                }
            }
        },
        getUserTickets() {
            const config = {
                method: 'get',
                url: `${process.env.VUE_APP_API_URL}tickets?[sort]=id%3Adesc&[filters][email][$eq]=${useAuthStore().user.email}&populate=ticket_pool.event`,
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
        },
        refundTicket(code) {
            const config = {
                method: 'get',
                url: `${process.env.VUE_APP_API_URL}tickets?[filters][code][$eq]=${code}&populate=ticket_pool.event`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('go-tickets__jwt')}`,
                    "Content-Type": "application/json",
                },
            };
            axios(config)
                .then((res) => {
                    console.log(res)
                    if (res.data.data.length === 1) {
                        console.log('dalej')
                        if (res.data.data[0].attributes.ticket_pool.data.attributes.event.data.attributes.ticket_refundable) {
                            if (!res.data.data[0].attributes.returned) {
                                this.sendRefundRequest(res.data.data[0].id)
                            } else {
                                toast.error("This ticket was already returned", {
                                    timeout: 5000
                                });
                            }
                        } else {
                            toast.error("This ticket is not returnable.", {
                                timeout: 5000
                            });
                        }
                    } else {
                        toast.error("There is no ticket with such code :(", {
                            timeout: 5000
                        });
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        sendRefundRequest(id) {
            const config = {
                method: 'put',
                url: `${process.env.VUE_APP_API_URL}tickets/${id}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('go-tickets__jwt')}`,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    data: {
                        returned: true
                    }
                })
            };
            axios(config)
                .then((res) => {
                    console.log(res)
                    toast.info("Ticket has been returned", {
                        timeout: 5000
                    });
                })
                .catch(function(err) {
                    console.log(err);
                    toast.error("There was an error returning your ticket", {
                        timeout: 5000
                    });
                });
        }
    }
})