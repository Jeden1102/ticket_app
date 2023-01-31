<template>
  <Navbar />
  <div class="app-content">
    <router-view />
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { onMounted } from 'vue';
import { useAuthStore } from './store/auth';
export default {
  name: 'Home',
  components: {
    Navbar,
    Footer
  },
  setup() {
    const authStore = useAuthStore();
    onMounted(() => {
      authStore.checkUserLoggedIn()
    })
    return {
      authStore
    }
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
@import './scss/styles.scss';
</style>