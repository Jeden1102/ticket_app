<template>
    <div class="container">
        <div class="events__heading">
            <h2>{{ title }}</h2>
            <router-link :to="{ name: 'Events' }">See All</router-link>
        </div>
        <Carousel :settings="settings" :breakpoints="breakpoints">
            <Slide v-for="event in events" :key="event.id">
                <EventBox :event="event" />
            </Slide>
            <template #addons>
                <Navigation />
            </template>
        </Carousel>
    </div>

</template>
  
<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import EventBox from './EventBox.vue';
import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
    name: 'Breakpoints',
    components: {
        Carousel,
        Slide,
        Navigation,
        EventBox
    },
    props: ['events', 'title'],
    setup() {
        const breakpoints = {
            0: {
                itemsToShow: 1.2,
                snapAlign: 'center',
            },
            450: {
                itemsToShow: 1.5,
                snapAlign: 'center',
            },
            576: {
                itemsToShow: 2,
                snapAlign: 'center',
            },
            768: {
                itemsToShow: 2.5,
                snapAlign: 'center',
            },
            // 1024 and up
            992: {
                itemsToShow: 3,
                snapAlign: 'start',
            },
            1200: {
                itemsToShow: 3.2,
                snapAlign: 'start',
            },
        }
        return {
            breakpoints
        }
    },
})
</script>
<style lang="scss" scoped>
.container {
    margin-top: 36px;
}

.events__heading {
    display: flex;
    justify-content: space-between;

    h2 {
        font-size: 2rem;
        font-weight: 200;
        margin-bottom: 24px;

        @media(min-width:992px) {
            margin-bottom: 32px;
        }
    }
    a{
        font-size: 1.3rem;
        color:$secondary-blue;
        font-weight: 500;
    }
}

.event__card {
    width: 100%;
    @include glass-card;
    padding: 0;
    box-shadow: unset;
    border: 1px solid rgb(226, 226, 226);
    margin: 0 6px;

    &__image {
        width: 100%;
        height: 200px;

        img {
            border-radius: 20px 20px 0 0;
            width: 100%;
            height: 100%;
        }
    }

    &__content {
        padding: 20px 25px;

        h2 {
            font-weight: 600;
            font-size: 1.3rem;
            text-align: left;
        }
    }
}
</style>
  