import { defineStore } from 'pinia'
import axios from 'axios'
export const useCreateEventStore = defineStore('create_event', {
    state: () => ({
        currentStep: 0,
        steps: ['GeneralInfoStep', 'SettingsStep', 'TicketsStep', 'SummaryStep'],
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
                category: null,
            },
            step_2: {
                featured: false,
                published: false,
                Main_image: null,
                images: [],
            }
        }

    }),
    actions: {
        createEvent() {
            console.log(this.eventData.step_2.Main_image)
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
                    }
                })
            };
            axios(config)
                .then(function(res) {
                    console.log(res)
                })
                .catch(function(err) {
                    console.log(err);
                });
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