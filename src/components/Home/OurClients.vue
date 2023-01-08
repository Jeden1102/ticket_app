<template>
    <div class="our__clients container">
        <h2>Join these brands</h2>
        <p>We've had the pleasure of working with industry-defining brands. These are just some of them.</p>
        <Carousel :breakpoints="breakpoints">
            <Slide v-for="client in clientsStore.clients" :key="client.id">
                <img :src="getImageURL(client)" alt="">
            </Slide>
            <template #addons>
                <Navigation />
            </template>
        </Carousel>
    </div>
</template>

<script>
import { onMounted } from 'vue';
import { useClientsStore } from '../../store/clients';
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
export default {
    components: {
        Carousel,
        Slide,
        Navigation,
    },
    setup () {
        function getImageURL(event) {
            return `${process.env.VUE_APP_IMAGES_API}${event.attributes.image.data.attributes.url}`;
        }
        const clientsStore = useClientsStore()
        onMounted(() => {
            clientsStore.getClients()
        })
        
        const breakpoints = {
            0: {
                itemsToShow: 1,
                snapAlign: 'center',
            },
            576: {
                itemsToShow: 2,
                snapAlign: 'center',
            },
            768: {
                itemsToShow: 3,
                snapAlign: 'center',
            },
            // 992 and up
            992: {
                itemsToShow: 4,
                snapAlign: 'start',
            },
            1200: {
                itemsToShow: 4,
                snapAlign: 'start',
            },
        }

        return {
            clientsStore,
            breakpoints,
            getImageURL
        }
    }
}
</script>

<style lang="scss" scoped>
.our__clients{
    margin-top: 64px;
    padding:40px;
    h2{
        text-align: center;
        font-size:2rem;
        color:$secondary-blue;
        font-weight: 600;
    }
    p{
        text-align: center;
        margin-top:32px;
        margin-bottom: 32px;
        font-size:1.1rem;
        font-weight: 200;
    }
    img{
        width:140px;
    }
}
</style>