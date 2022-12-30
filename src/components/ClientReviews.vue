<template>
    <div class="client__reviews container">
        <h2 class="client__reviews__heading">
            <span>Our clients</span> reviews
        </h2>
        <Carousel :breakpoints="breakpoints">
            <Slide v-for="review in reviews" :key="review.id">
                <ClientReview :review="review" />
            </Slide>
            <template #addons>
                <Navigation />
            </template>
        </Carousel>
    </div>
</template>

<script>
import ClientReview from './ClientReview.vue';
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
export default defineComponent({
    components: {
        Carousel,
        Slide,
        Navigation,
        ClientReview
    },
    props: ['reviews'],
    setup() {
        const breakpoints = {
            0: {
                itemsToShow: 1,
                snapAlign: 'center',
            },
        }
        return {
            breakpoints
        }
    },
})
</script>

<style lang="scss" scoped>
.client__reviews {
    margin-top: 24px;

    @media(min-width:992px) {
        margin-top: 48px;
    }

    &__heading {
        @include base-heading;
        margin-bottom: 24px;
    }
}
</style>