<template>
  <div class="home">
    <HeroSection />
    <EventsSplide :events="eventsStore.eventsFeatured" title="Featured"/>
    <EventsSplide :events="eventsStore.eventsNewest" title="Newest"/>
    <EventsSplide :events="eventsStore.eventsTrending" title="Trending"/>
    <ClientReviews :reviews="reviewsStore.reviews"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HeroSection from '@/components/HeroSection.vue'
import EventsSplide from '@/components/EventsSplide.vue';
import ClientReviews from '@/components/ClientReviews.vue';
import { useEventsStore } from '../store/events';
import { useReviewsStore } from '../store/reviews';
import { onMounted } from 'vue';
export default {
  name: 'Home',
  components: {
    HeroSection,
    EventsSplide,
    ClientReviews
  },
  setup() {
    const eventsStore = useEventsStore();
    const reviewsStore = useReviewsStore();
    onMounted(() => {
      const eventsObjects = [
        {
          name: 'eventsFeatured',
          start:0,
          limit:10,
          filters: [
            {
              field: 'Featured',
              sign: '$eq',
              value: true,
            },
          ],
        },
        {
          name: 'eventsNewest',
          start:0,
          limit:10,
          ordering: [
            {
              field: 'createdAt',
              direction: 'desc',
            }
          ]
        },
        {
          name: 'eventsTrending',
          start:0,
          limit:10,
          ordering: [
            {
              field: 'attendants',
              direction: 'desc',
            }
          ]
        },
      ];
      reviewsStore.getReviews();

      eventsObjects.forEach(eventObj=>{
      eventsStore.getEvents(eventObj);
      })
    });
    return {
      eventsStore,
      reviewsStore
    }
  }
}
</script>
