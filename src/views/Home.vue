<template>
  <div class="home">
    <HeroSection />
    <EventsSplide />

  </div>
</template>

<script>
// @ is an alias to /src
import HeroSection from '@/components/HeroSection.vue'
import EventsSplide from '@/components/EventsSplide.vue';
export default {
  name: 'Home',
  components: {
    HeroSection,
    EventsSplide
  },
  setup() {
    const events = {
    }
    return {
      events
    }
  }
}
</script>
