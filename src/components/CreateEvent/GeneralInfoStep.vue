<template>
  <div class="step step__general">
    <h3 class="step__title">
      General information <font-awesome-icon icon="fa-solid fa-circle-info" />
    </h3>
    <div class="step__field">
      <label for="">Event name</label>
      <input v-model="createEventsStore.eventData.step_1.name" type="text" />
      <span class="error-box" v-if="v$.name.$error">
        {{ v$.name.$errors[0].$message }}
      </span>
    </div>
    <div class="step__field">
      <label for="">Event description</label>
      <ckeditor
        v-model="createEventsStore.eventData.step_1.description"
        :editor="editor"
        :config="editorConfig"
      >
      </ckeditor>
      <span class="error-box" v-if="v$.description.$error">
        {{ v$.description.$errors[0].$message }}
      </span>
    </div>
    <div class="step__field">
      <label for="">Event category</label>
      <div class="step__field--radios">
        <div
          v-for="category in eventsStore.eventCategories"
          :key="category.id"
          class="step__field--radio"
        >
          <input
            v-model="createEventsStore.eventData.step_1.category"
            :value="category.id"
            name="category"
            :id="category.attributes.Name"
            type="radio"
          />
          <label :for="category.attributes.Name">
            <span>{{ category.attributes.Name }}</span>
          </label>
        </div>
      </div>
      <span class="error-box" v-if="v$.category.$error">
        {{ v$.category.$errors[0].$message }}
      </span>
    </div>
    <div class="step__field">
      <label for="">Event Place</label>
      <GMapAutocomplete
        @place_changed="setPlace"
        v-model="createEventsStore.eventData.step_1.location"
        id="event-place"
        placeholder="New Adddress"
      >
      </GMapAutocomplete>
    </div>
    <div class="step__field">
      <label for="">Event Date</label>
      <Datepicker
        v-model="createEventsStore.eventData.step_1.date"
        :enable-time-picker="true"
      ></Datepicker>
      <span class="error-box" v-if="v$.date.$error">
        {{ v$.date.$errors[0].$message }}
      </span>
    </div>
    <button @click="validateStep" class="validation__btn-0"></button>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useCreateEventStore } from "../../store/create_event";
import { useEventsStore } from "../../store/events";
import { onMounted, computed } from "vue";

import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  components: {},
  setup() {
    const editor = ClassicEditor;
    const eventsStore = useEventsStore();
    const createEventsStore = useCreateEventStore();
    const rules = computed(() => {
      return {
        name: { required },
        description: { required },
        category: { required },
        date: { required },
      };
    });

    const editorConfig = {
      toolbar: {
        items: [
          "heading",
          "|",
          "bold",
          "italic",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          "insertTable",
          "|",
          "undo",
          "redo",
        ],
      },
    };

    function validateStep() {
      this.v$.$validate();

      if (this.v$.$error) {
        createEventsStore.validationErrors = true;
        return;
      }
      createEventsStore.validationErrors = false;
    }

    function setPlace(place) {
      createEventsStore.eventData.step_1.location = place;
    }
    onMounted(() => {
      eventsStore.getEventCategories();
    });
    const v$ = useValidate(rules, createEventsStore.eventData.step_1);

    return {
      editor,
      editorConfig,
      eventsStore,
      createEventsStore,
      validateStep,
      setPlace,
      v$,
    };
  },
};
</script>

<style lang="scss" >
.step {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__title {
    font-size: 24px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    padding-right: 24px;
  }

  input[type="text"],
  .pac-target-input {
    @include profile-input;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &--radios {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    &--radio {
      width: fit-content;

      input {
        display: none;

        &:checked + label {
          @include button-base($primary-blue, white);
        }
      }

      label {
        @include button-base(white, $primary-blue);
        display: grid;
        place-content: center;
        min-width: 200px;
        width: fit-content;
      }
    }
  }

  .ck-editor__main {
    min-height: 200px;

    .ck-content {
      min-height: 200px;
    }
  }
}
</style>