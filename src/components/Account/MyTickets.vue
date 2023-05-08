<template>
  <div class="my-tickets">My tickets {{ ticketsStore.userTickets }}</div>
</template>

<script>
import { useTicketsStore } from "../../store/tickets";
import { onMounted } from "vue";
export default {
  setup() {
    const ticketsStore = useTicketsStore();
    onMounted(() => {
      ticketsStore.getUserTickets();
    });
    return { ticketsStore };
  },
};
</script>

<style lang="scss" scoped>
.my-tickets {
  @include glass-card;
}
</style>