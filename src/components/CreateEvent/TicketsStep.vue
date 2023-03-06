<template>
  <div class="step step__tickets">
    <h3 class="step__title">
      Tickets <font-awesome-icon icon="fa-solid fa-ticket" />
    </h3>
    <TicketsStepPool
      v-for="(i, key) in createEventStore.ticketPools"
      :key="i.id"
      :poolID="i.id"
      :poolNr="key + 1"
    />
    <button class="step__add-pool" @click="addPool">Add ticket pool</button>
  </div>
</template>

<script>
import TicketsStepPool from "./TicketsStepPool.vue";
import { useCreateEventStore } from "../../store/create_event";

export default {
  components: {
    TicketsStepPool,
  },
  setup() {
    const createEventStore = useCreateEventStore();
    function addPool() {
      createEventStore.addNewPool(Date.now());
    }
    return {
      addPool,
      createEventStore,
    };
  },
};
</script>

<style lang="scss" scoped>
.step {
  &__add-pool {
    @include button-primary();
    width: fit-content;
  }
}
</style>