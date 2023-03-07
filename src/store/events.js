import { defineStore } from 'pinia'
import axios from 'axios'
export const useEventsStore = defineStore('events', {
    state: () => ({
        eventCategories: null,
        eventTicketPool: null,
        events: null,
        eventsFeatured: null,
        eventsNewest: null,
        eventsTrending: null,
        filters: [{
                field: 'Title',
                sign: '$containsi',
                value: null,
            },
            {
                field: 'Location',
                sign: '$containsi',
                value: null,
            },
            {
                field: 'event_category',
                sign: '$eq',
                value: null,
            },
            {
                field: 'Date',
                sign: '$lte',
                value: null,
            },
            {
                field: 'Date',
                sign: '$gte',
                value: null,
            },
            {
                field: 'Featured',
                sign: '$eq',
                value: null,
            },
        ]
    }),
    actions: {
        setFilter(filter) {
            let filterIdx = null;
            this.filters.forEach((x, idx) => {
                if (x.field == filter.field) {
                    filterIdx = idx;
                }
            })
            this.filters[filterIdx].value = filter.value
        },
        getEvents(filter) {
            let filterString = ``;
            let groupingString = "?";
            let pagination = ``
            if (filter !== 'all') {
                pagination = `?pagination[start]=${filter.start ? filter.start:  0}&pagination[limit]=${filter.limit ? filter.limit:   999}`
                if (filter.filters) {
                    filter.filters.forEach(filter => {
                        if (filter.value === null || filter.value === "") return
                        if (filter.field === 'event_category' && filter.value === 'all') return

                        if (filter.field === 'event_category') {
                            filterString += `[filters][${filter.field}][Name][${filter.sign}]=${filter.value}&`;
                            return
                        }
                        if (filter.field === 'Featured' && filter.value === false) return
                        filterString += `[filters][${filter.field}][${filter.sign}]=${filter.value}&`;
                    })
                }
                if (filter.ordering) {
                    filter.ordering.forEach((filter, key) => {
                        groupingString += `[sort][${key}]=${filter.field}%3A${filter.direction}&`;
                    })
                }
            }
            console.log(`${process.env.VUE_APP_API_URL}events${groupingString}${filterString}?${pagination}&populate=*`)
            axios.get(`${process.env.VUE_APP_API_URL}events${groupingString}${filterString}?${pagination}&populate=*`).then(res => {
                if (!filter.name) {
                    this.events = res.data.data
                    console.log(this.events)
                } else {
                    this[filter.name] = res.data.data;
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getEventTicketPool(id) {
            axios
                .get(
                    `${process.env.VUE_APP_API_URL}ticket-pools?[sort]=price&[filters][event][id][$eq]=${id}&populate=*`
                )
                .then((res) => {
                    this.eventTicketPool = res.data.data
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getEventCategories() {
            axios.get(`${process.env.VUE_APP_API_URL}event-categories`).then(res => {
                this.eventCategories = res.data.data
            }).catch(err => {
                console.log(err)
            })

        }
    }
})