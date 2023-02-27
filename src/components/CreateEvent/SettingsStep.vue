<template>
  <div class="step step__general">
    <h3 class="step__title">
      Event settings <font-awesome-icon icon="fa-solid fa-gear" />
    </h3>
    <div class="step__field step__field--checkbox">
      <label for="cbx-12">Show as featured</label>
      <div class="checkbox-wrapper-12">
        <div class="cbx">
          <input
            v-model="createEventsStore.eventData.step_2.featured"
            id="cbx-12"
            type="checkbox"
          />
          <label for="cbx-12"></label>
          <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
            <path d="M2 8.36364L6.23077 12L13 2"></path>
          </svg>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo-12">
              <fegaussianblur
                in="SourceGraphic"
                stddeviation="4"
                result="blur"
              ></fegaussianblur>
              <fecolormatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                result="goo-12"
              ></fecolormatrix>
              <feblend in="SourceGraphic" in2="goo-12"></feblend>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
    <div class="step__field step__field--checkbox">
      <label for="published">Published</label>
      <div class="checkbox-wrapper-12">
        <div class="cbx">
          <input
            v-model="createEventsStore.eventData.step_2.published"
            id="published"
            type="checkbox"
          />
          <label for="published"></label>
          <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
            <path d="M2 8.36364L6.23077 12L13 2"></path>
          </svg>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo-12">
              <fegaussianblur
                in="SourceGraphic"
                stddeviation="4"
                result="blur"
              ></fegaussianblur>
              <fecolormatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                result="goo-12"
              ></fecolormatrix>
              <feblend in="SourceGraphic" in2="goo-12"></feblend>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
    <div class="step__field">
      <label for="">Images</label>
      <div v-for="i in imagesCount" :key="i" class="image__box">
        <label :for="'image-' + i">image{{ i }}</label>
        <input :id="'image-' + i" type="file" />
      </div>
    </div>
    <button @click="validateStep" class="validation__btn-0"></button>
  </div>
</template>

<script>
import { useCreateEventStore } from "../../store/create_event";
import { useEventsStore } from "../../store/events";
import { onMounted, computed } from "vue";

import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  components: {},
  setup() {
    const eventsStore = useEventsStore();
    const createEventsStore = useCreateEventStore();
    const imagesCount = 6;
    const rules = computed(() => {
      return {
        name: { required },
        description: { required },
        category: { required },
        date: { required },
      };
    });

    function validateStep() {
      this.v$.$validate();

      if (this.v$.$error) {
        createEventsStore.validationErrors = true;
        return;
      }
      createEventsStore.validationErrors = false;
    }

    onMounted(() => {
      eventsStore.getEventCategories();
    });
    const v$ = useValidate(rules, createEventsStore.eventData.step_1);

    return {
      eventsStore,
      createEventsStore,
      validateStep,
      v$,
      imagesCount,
    };
  },
};
</script>

<style lang="scss" scoped>
.step {
  &__field {
    &--checkbox {
      display: flex;
      gap: 8px;

      .checkbox-wrapper-12 {
        @include checkbox();
      }
    }
  }
}
</style>