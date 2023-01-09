<template>
    <div class="events__filters container">
        <div class="filter__box">
            <div class="filter__box--floating">
                <label for="event-name">
                    <input v-model="currentFilters.search" type="text" id="event-name" placeholder="Event name">
                    <span>Event name</span>
                </label>
            </div>
        </div>
        <div class="filter__box">
            <div class="filter__box--floating">
                <label for="event-place">
                    <GMapAutocomplete id="event-place" placeholder="This is a placeholder" @place_changed="setPlace">
                    </GMapAutocomplete>
                    <span>Event Place</span>
                </label>
            </div>

        </div>
        <div class="filter__box ">
            <h4>Event date</h4>
            <div class="filter__box--dates">
                <div>
                    <span>from</span>
                    <Datepicker :upperLimit="currentFilters.dateTo" clearable="true" v-model="currentFilters.dateFrom" />
                </div>
                <div>
                    <span>to</span>
                    <Datepicker :lowerLimit="currentFilters.dateFrom" clearable="true" v-model="currentFilters.dateTo" />
                </div>
            </div>

        </div>
        <div class="filter__box">
            <h4>Category</h4>
            <div class="filter__box--radios">
                <div v-for="category in eventsStore.eventCategories" :key="category.id" class="filter__box--radio">
                    <input v-model="currentFilters.category" :value="category.attributes.Name" name="category"
                        :id="category.attributes.Name" type="radio">
                    <label :for="category.attributes.Name">
                        <span>{{ category.attributes.Name }}</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="filter__box">
            <h4>Timeline</h4>
            <div class="filter__box--radios">
                <div v-for="time in timeline" :key="time" class="filter__box--radio">
                    <input v-model="currentFilters.timeline" :value="time" name="time" :id="time" type="radio">
                    <label :for="time">
                        <span>{{ time }}</span>
                    </label>
                </div>
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
        const timeline = ['opcoming', 'past', 'all'];
        const currentFilters = ref({
            category: null,
            timeline: 'all',
            search: '',
            dateFrom: null,
            dateTo: '',
        })

        onMounted(() => {
            eventsStore.getEventCategories()
        })
        return {
            eventsStore,
            currentFilters,
            timeline,
        }
    }
}
</script>

<style lang="scss" scoped>
.events__filters {
    @include glass-card;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .filter__box {
        margin: 4px 0;

        h4 {
            font-size: 1.2rem;
            font-weight: 600;
            margin: 12px 0;
        }

        &--dates {
            display: flex;
            gap:16px;
            flex-direction: column;
            @media(min-width:576px){
                flex-direction: row;
            }
            div{
                display:flex;
                flex-direction: column;
                gap:6px;
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
    }
}
</style>