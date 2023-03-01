<template>
  <div class="navigation">
    <button
      class="navigation__back"
      @click="changeStep('prev')"
      :disabled="createEventStore.currentStep == 0"
    >
      Back
    </button>
    <button
      class="navigation__next"
      @click="changeStep('next')"
      :disabled="
        createEventStore.currentStep === createEventStore.steps.length - 1
      "
    >
      Next
    </button>
    <button @click="createEvent">Add event</button>
  </div>
</template>

<script>
import { useCreateEventStore } from "../../store/create_event";
export default {
  setup() {
    const createEventStore = useCreateEventStore();
    // @todo na kliknięciu 'next' walidacja danych i jeśli ok to przechodzimy
    function changeStep(direction) {
      createEventStore.changeStep(direction);
    }
    function createEvent() {
      createEventStore.createEvent();
    }
    return {
      changeStep,
      createEventStore,
      createEvent,
    };
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  gap: 16px;

  &__back {
    @include button-base(rgb(255, 255, 91), black);
  }

  &__next {
    @include button-primary;
  }

  &__back,
  &__next {
    &:disabled {
      opacity: 0.6;
    }
  }
}
</style>