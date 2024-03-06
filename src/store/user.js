import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'
const toast = useToast()
import { useAuthStore } from './auth'
export const useUserStore = defineStore('user', {
    state: () => ({
        changePasswordError: null,
    }),
    actions: {
        async updateUser(user, avatar) {
            let FormData = require('form-data');
            let data = new FormData();

            for (const key in user) {
                if (Object.hasOwnProperty.call(user, key)) {
                    if (key === 'avatar') {
                        if (avatar) {
                            console.log(avatar)
                            const formData = new FormData();
                            formData.append("files", avatar);
                            formData.append("ref", "api::user.user");
                            formData.append("refId", user.id);
                            formData.append("field", "avatar");

                            const image = await fetch(`${process.env.VUE_APP_API_URL}upload`, {
                                method: 'POST',
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('go-tickets__jwt')}`
                                },
                                body: formData
                            });
                            console.log(image)
                        }
                        continue;
                    }

                    if (key === 'birth_date') {
                        console.log(user[key])
                        if (user[key] === null) {
                            data.append(key, null);
                            continue
                        }
                        if (typeof(user[key]) !== 'string') {
                            data.append(key, new Date(user[key]).toISOString().slice(0, 10));
                            continue
                        } else {
                            data.append(key, user[key]);
                            continue
                        }
                    }

                    if (user[key] === null) {
                        data.append(key, '');
                    }

                    data.append(key, user[key]);
                }
            }
            const config = {
                method: 'put',
                url: `${process.env.VUE_APP_API_URL}users/${user.id}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('go-tickets__jwt')}`,
                },
                data: data
            };

            axios(config)
                .then(function(res) {
                    console.log(res)
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        changePassword(user) {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('go-tickets__jwt')}` }
            };
            axios.post(`${process.env.VUE_APP_API_URL}auth/change-password`, user, config).then(res => {
                console.log(res)
                toast.info("Profile updated succesfully!", {
                    timeout: 5000
                });
            }).catch(err => {
                this.changePasswordError = err.response.data.error.message
                console.log(err.response.data.error.message)
                toast.error("There was some error updating profile details", {
                    timeout: 5000
                });
            })
        },
        removeAccount(password) {
            axios.post(`${process.env.VUE_APP_API_URL}auth/local?populate=*`, {
                identifier: useAuthStore().user.username,
                password: password
            }).then(res => {
                console.log(res)
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('go-tickets__jwt')}` }
                };
                axios.delete(`${process.env.VUE_APP_API_URL}users/${useAuthStore().user.id}`, config).then((res) => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
                toast.error("Invalid password", {
                    timeout: 5000
                });
            })
        }
    }
})