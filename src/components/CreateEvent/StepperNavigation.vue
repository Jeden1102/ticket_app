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
      v-if="createEventStore.currentStep !== createEventStore.steps.length - 1"
    >
      Next
    </button>
    <button
      @click="createEvent"
      class="navigation__add"
      v-if="createEventStore.currentStep === createEventStore.steps.length - 1"
    >
      Add event
    </button>
  </div>
</template>

<script>
import { useCreateEventStore } from "../../store/create_event";
export default {
  setup() {
    const createEventStore = useCreateEventStore();
    function changeStep(direction) {
      createEventStore.changeStep(direction);
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  &__add {
    @include button-base(rgb(0, 139, 0), white);
  }

  &__back,
  &__next {
    &:disabled {
      opacity: 0.6;
    }
  }
}
</style>