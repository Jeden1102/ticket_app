<template>
  <div class="hero__search container">
    <div class="hero__search__flex">
      <div class="hero__search__box hero__search__box--floating">
        <label for="event-name">
          <input v-model="eventName" type="text" id="event-name" placeholder="Event name">
          <span>Event name</span>
        </label>
      </div>
      <div class="hero__search__box hero__search__box--floating">
        <label for="event-place">
          <input v-model="eventPlace" type="text" id="event-place" placeholder="Event place">
          <span>Event place</span>
        </label>
      </div>
      <div class="hero__search__box hero__search__box--select">
        <label for="">Event Category</label>
        <VueMultiselect v-model="eventCategory" :options="options" :showLabels="false">
        </VueMultiselect>
      </div>
    </div>
    <div class="hero__search__box hero__search__box--btn">
      <button @click="searchEvents">Search</button>
    </div>
  </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
import { ref } from 'vue';
import router from "../router";
export default {
  components: { VueMultiselect },
  setup() {
    const eventCategory = ref(null);
    const eventName = ref(null);
    const eventPlace = ref(null);
    const options = ['Music', 'Concert', 'Stand-up', 'Rap battle', 'Others'];
    function searchEvents() {
      console.log("ok")
      router.push({ name: 'Events', query: { event_category: eventCategory.value, event_name: eventName.value, event_place: eventPlace.value } })
    }
    return {
      eventCategory,
      options,
      eventName,
      eventPlace,
      searchEvents
    }
  }
}
</script>
<style lang="scss" scoped>
.hero__search {
  @include glass-card;
  padding: 40px 20px;

  background: #242565;
  transform: translateY(100px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-direction: column;

  @media(min-width:992px) {
    flex-direction: row;
  }

  &__flex {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 24px;
    width: 100%;
    flex-direction: column;

    @media(min-width:576px) {
      flex-direction: row;
      gap: 12px;
    }
  }

  &__box {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    @media(min-width:576px) {
      width: unset;
    }

    label {
      color: white;
    }

    &--floating {
      @include floating-input-box;
    }

    &--select {
      width: 100%;

      @media(min-width:576px) {
        width: 200px;
      }
    }

    &--btn {
      width: fit-content;
      margin-top: auto;
      align-items: flex-start;
      margin-right: auto;
      width: 100%;

      @media(min-width:992px) {
        margin-left: auto;
        align-items: unset;
        width: unset;
      }
    }

    button {
      @include button-primary;
      max-width: 300px;
    }
  }
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css">

</style>