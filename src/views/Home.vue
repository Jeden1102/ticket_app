<template>
  <div class="home">
    <HeroSection />
    <EventsSplide :events="eventsStore.eventsFeatured" title="Featured"/>
    <EventsSplide :events="eventsStore.eventsNewest" title="Newest"/>
    <EventsSplide :events="eventsStore.eventsTrending" title="Trending"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HeroSection from '@/components/HeroSection.vue'
import EventsSplide from '@/components/EventsSplide.vue';
import { useEventsStore } from '../store/events';
import { onMounted } from 'vue';
export default {
  name: 'Home',
  components: {
    HeroSection,
    EventsSplide
  },
  setup() {
    const eventsStore = useEventsStore();
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
      eventsObjects.forEach(eventObj=>{
      eventsStore.getEvents(eventObj);
      })
    });
    return {
      eventsStore,
    }
  }
}
</script>
