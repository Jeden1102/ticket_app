<template>
    <div class="events__filters container">
        <button class="collapse__filters" @click="filtersVisible = !filtersVisible">
            <span v-if="filtersVisible">Hide filters</span>
            <span v-else>Show filters</span>
        </button>
        <div class="events__filters__filters" :class="{ 'events__filters__filters--active': filtersVisible}">
            <div class="flex">
                <div class="filter__box">
                    <div class="filter__box--floating">
                        <label for="event-name">
                            <input @keyup="setFilter('Title')" v-model="currentFilters.Title" type="text"
                                id="event-name" placeholder="Event name">
                            <span>Event name</span>
                        </label>
                    </div>
                </div>
                <div class="filter__box">
                    <div class="filter__box--floating">
                        <label for="event-place">
                            <GMapAutocomplete v-model="currentFilters.Location" id="event-place"
                                placeholder="This is a placeholder" @place_changed="setPlace">
                            </GMapAutocomplete>
                            <span>Event Place</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="filter__box ">
                <h4>Event date</h4>
                <div class="filter__box--dates">
                    <div>
                        <span>from</span>
                        <Datepicker @closed="setFilter('date_from')" :upperLimit="currentFilters.date_to"
                            :clearable="true" v-model="currentFilters.date_from" />
                    </div>
                    <div>
                        <span>to</span>
                        <Datepicker @closed="setFilter('date_to')" :lowerLimit="currentFilters.date_from"
                            :clearable="true" v-model="currentFilters.date_to" />
                    </div>
                </div>

            </div>
            <div class="filter__box">
                <h4>Category</h4>
                <div class="filter__box--radios">
                    <div v-for="category in eventsStore.eventCategories" :key="category.id" class="filter__box--radio">
                        <input @change="setFilter('event_category')" v-model="currentFilters.event_category"
                            :value="category.attributes.Name" name="category" :id="category.attributes.Name"
                            type="radio">
                        <label :for="category.attributes.Name">
                            <span>{{ category.attributes.Name }}</span>
                        </label>
                    </div>
                    <div class="filter__box--radio">
                        <input @change="setFilter('event_category')" v-model="currentFilters.event_category" value="all"
                            name="all" id="all" type="radio">
                        <label for="all">
                            <span>All</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="filter__box">
                <h4>Others</h4>
                <div class="filter__box--checkbox">
                    <label for="cbx-12">Featured only</label>
                    <div class="checkbox-wrapper-12">
                        <div class="cbx">
                            <input @change="setFilter('Featured')" v-model="currentFilters.Featured" id="cbx-12"
                                type="checkbox" />
                            <label for="cbx-12"></label>
                            <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                                <path d="M2 8.36364L6.23077 12L13 2"></path>
                            </svg>
                        </div>
                        <!-- Gooey-->
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                                <filter id="goo-12">
                                    <fegaussianblur in="SourceGraphic" stddeviation="4" result="blur"></fegaussianblur>
                                    <fecolormatrix in="blur" mode="matrix"
                                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12">
                                    </fecolormatrix>
                                    <feblend in="SourceGraphic" in2="goo-12"></feblend>
                                </filter>
                            </defs>
                        </svg>
                    </div>
                </div>
                <button class="clear__all" @click="clearAll">
                    Clear all filters
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import { useEventsStore } from '../../store/events';
import { onMounted, ref } from 'vue';
import Datepicker from 'vue3-datepicker'
export default {
    components: { Datepicker },
    setup() {
        const eventsStore = useEventsStore();
        const filtersVisible = ref(false);
        const currentFilters = ref({
            event_category: null,
            Featured: false,
            Title: '',
            date_from: null,
            date_to: null,
            Location: null,
        })
        function setFilter(field) {
            eventsStore.setFilter({
                field: field,
                value: currentFilters.value[field]
            })
            eventsStore.getEvents({ filters: eventsStore.filters })

        }
        function setPlace(place) {
            currentFilters.value.Location = place.formatted_address
            setFilter('Location');
        }

        function clearAll() {
            currentFilters.value = {
                event_category: null,
                Featured: false,
                Title: '',
                date_from: null,
                date_to: null,
                Location: null,
            }
            eventsStore.getEvents('all')
        }

        onMounted(() => {
            eventsStore.getEventCategories()
        })
        return {
            eventsStore,
            currentFilters,
            setFilter,
            setPlace,
            clearAll,
            filtersVisible
        }
    }
}
</script>

<style lang="scss" scoped>
.events__filters {
    @include glass-card;
    display: flex;
    flex-direction: column;
    gap: 0;

    .collapse__filters {
        @include button-primary();
        max-width: 300px;
        margin-left: auto;
    }

    &__filters{
        max-height: 0;
        overflow: hidden;
        &--active{
            max-height: 100%;
            overflow: unset;
        }
    }

    .flex {
        gap: 16px;
        flex-direction: column;

        @media(min-width:768px) {
            flex-direction: row;
        }

        .filter__box {
            flex: 1;
        }
    }

    .filter__box {
        margin: 4px 0;

        h4 {
            font-size: 1.2rem;
            font-weight: 600;
            margin: 12px 0;
        }

        &--dates {
            display: flex;
            gap: 16px;
            flex-direction: column;

            @media(min-width:576px) {
                flex-direction: row;
            }

            div {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }
        }

        &--floating {
            @include floating-input-box();

            input {
                color: black;
                font-weight: 500;
                font-size: 1.1rem;
            }

            span {
                transform: unset;
                color: black;
            }

            label:focus-within>span,
            input:not(:placeholder-shown)+span {
                transform: translateY(-20px);
                color: black;
            }
        }

        &--radios {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }

        &--radio {
            input {
                display: none;

                &:checked+label {
                    @include button-base($primary-blue, white);
                }
            }

            label {
                @include button-base(white, $primary-blue);
                display: grid;
                place-content: center;
                min-width: 200px;
            }
        }

        &--checkbox {
            display: flex;
            gap: 8px;
            align-items: center;

            .checkbox-wrapper-12 {
                @include checkbox();
            }
        }

        .clear__all {
            @include button-primary();
            margin-top: 16px;
        }
    }
}
</style>