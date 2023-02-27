import { defineStore } from 'pinia'
// import axios from 'axios'
export const useCreateEventStore = defineStore('create_event', {
    state: () => ({
        eventData: {
            step_1: {
                name: '',
                description: '',
                location: '',
                date: '',
                category: null,
            }

        }

    }),
    actions: {
        createEvent() {
            console.log(this)
        }
    }
})