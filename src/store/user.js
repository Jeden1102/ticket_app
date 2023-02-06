import { defineStore } from 'pinia'
import axios from 'axios'
export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        loginError: null,
        registerError: null,
    }),
    actions: {
        updateUser(user) {
            let FormData = require('form-data');
            let data = new FormData();

            for (const key in user) {
                if (Object.hasOwnProperty.call(user, key)) {
                    if (key === 'avatar')
                        continue;

                    if (key === 'birth_date') {
                        if (typeof(user[key]) !== 'string') {
                            data.append(key, new Date(user[key]).toISOString().slice(0, 10));
                            continue
                        } else {
                            data.append(key, user[key]);
                            continue
                        }
                    }

                    console.log(key, user[key])
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
    }
})