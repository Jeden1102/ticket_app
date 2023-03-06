import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'
const toast = useToast()
export const useCreateEventStore = defineStore('create_event', {
    state: () => ({
        currentStep: 0,
        steps: ['GeneralInfoStep', 'SettingsStep', 'TicketsStep'],
        validationErrors: null,
        filesUrl: {
            0: null,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
        },
        eventData: {
            step_1: {
                name: '',
                description: '',
                location: '',
                date: '',
                category: 5,
            },
            step_2: {
                featured: false,
                published: false,
                Main_image: 0,
                images: [],
            }
        },
        ticketPools: [{ id: Date.now() }]

    }),
    actions: {
        createEvent() {
            const config = {
                method: 'post',
                url: `${process.env.VUE_APP_API_URL}events`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('go-tickets__jwt')}`,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    data: {
                        Title: this.eventData.step_1.name,
                        Description: this.eventData.step_1.description,
                        Published: this.eventData.step_2.published,
                        Featured: this.eventData.step_2.featured,
                        Main_image: this.eventData.step_2.Main_image,
                        Date: new Date(this.eventData.step_1.date).toISOString(),
                        attendants: 0,
                        Location: this.eventData.step_1.location.formatted_address,
                        geolocation: this.eventData.step_1.location,
                        event_category: this.eventData.step_1.category,
                    }
                })
            };
            axios(config)
                .then((res) => {
                    let formData = new FormData();
                    formData.append('ref', 'api::event.event')
                    formData.append('refId', res.data.data.id)
                    formData.append('field', 'Images')
                    this.eventData.step_2.images.forEach(img => {
                        formData.append(`files`, img.img, img.img.name)
                    })
                    toast.info("Event added succesfully!", {
                        timeout: 5000
                    });
                    this.createPools(res.data.data.id)
                    axios.post(`${process.env.VUE_APP_API_URL}upload`, formData).then(res => {
                        console.log(res)
                    }).catch(err => {
                        console.log(err)

                    })
                })
                .catch(function(err) {
                    console.log(err);
                    toast.error("There was some error :(", {
                        timeout: 5000
                    });
                });
        },
        addNewPool(id) {
            this.ticketPools.push({ id: id })
        },
        removePool(id) {
            this.ticketPools = this.ticketPools.filter(pool => pool.id !== id)
        },
        createPools(eventID) {
            this.ticketPools.forEach(pool => {
                const config = {
                    method: 'post',
                    url: `${process.env.VUE_APP_API_URL}ticket-pools`,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('go-tickets__jwt')}`,
                        "Content-Type": "application/json",
                    },
                    data: JSON.stringify({
                        data: {
                            type: pool.types,
                            variant: pool.variant,
                            price: pool.price,
                            amount: pool.amount,
                            event: eventID,
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
            })

        },
        uploadEventFiles(res) {
            console.log(res)
        },
        changeStep(direction) {
            // Validate step
            // if (direction === 'next') {
            //     document.querySelector(`.validation__btn-${this.currentStep}`).click()
            //     if (this.validationErrors) {
            //         return
            //     }
            // }

            let newStep = this.currentStep;
            if (direction === 'next' || direction === 'prev') {
                if (direction === 'next') {
                    newStep = ++this.currentStep;
                } else {
                    newStep = --this.currentStep;
                }
            }
            this.currentStep = newStep;
        }
    }
})