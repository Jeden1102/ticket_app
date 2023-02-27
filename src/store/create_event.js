import { defineStore } from 'pinia'
// import axios from 'axios'
export const useCreateEventStore = defineStore('create_event', {
    state: () => ({
        currentStep: 0,
        steps: ['GeneralInfoStep', 'SettingsStep', 'TicketsStep', 'SummaryStep'],
        validationErrors: null,
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
                images: [],
            }
        }

    }),
    actions: {
        createEvent() {
            console.log(this)
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