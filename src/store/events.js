import { defineStore } from 'pinia'
import axios from 'axios'
export const useEventsStore = defineStore('events', {
    state: () => ({
        events: null,
        eventsFeatured: null,
        eventsNewest: null,
        eventsTrending: null,
    }),
    actions: {
        getEvents(filter) {
            let filterString = ``;
            let groupingString = "?";
            let pagination = ``
            if (filter !== 'all') {
                pagination = `?pagination[start]=${filter.start}&pagination[limit]=${filter.limit}`
                if (filter.filters) {
                    filter.filters.forEach(filter => {
                        filterString += `[filters][${filter.field}][${filter.sign}]=${filter.value}&`;
                    })
                }
                if (filter.ordering) {
                    filter.ordering.forEach((filter, key) => {
                        groupingString += `[sort][${key}]=${filter.field}%3A${filter.direction}&`;
                    })
                }
            }
            axios.get(`${process.env.VUE_APP_API_URL}events${groupingString}${filterString}?${pagination}&populate=*`).then(res => {
                if (!filter.name) {
                    this.events = res.data.data
                } else {
                    this[filter.name] = res.data.data;
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
})