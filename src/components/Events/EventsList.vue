<template>
    <div class="events__list">
        <EventBox v-for="event in eventsStore.events" :key="event.id" :event="event"></EventBox>
    </div>
</template>

<script>
import EventBox from '../EventBox.vue';
import { useEventsStore } from '../../store/events';
export default {
    components: {
        EventBox
    },
    setup() {
        const eventsStore = useEventsStore()

        return {
            eventsStore
        }
    }
}
</script>

<style lang="scss" scoped>
.events__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;

    @media(min-width:676px) {
        grid-template-columns: 1fr 1fr;
    }

    @media(min-width:1121px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
}
</style>