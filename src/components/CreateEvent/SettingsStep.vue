<template>
  <div class="step step__general">
    {{ filesUrl }}
    <h3 class="step__title">
      {{ createEventsStore.eventData.step_2.Main_image }}
      Event settings <font-awesome-icon icon="fa-solid fa-gear" />
    </h3>
    <div class="step__field step__field--checkbox">
      <!-- <RestrictedContent group="basic" /> -->
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
    <div class="step__field step__field--images">
      <label for="">Images</label>
      <div class="images">
        <div v-for="i in imagesCount" :key="i" class="image__box">
          <!-- <RestrictedContent v-if="i > 1" group="basic" /> -->

          <font-awesome-icon
            v-if="!createEventsStore.filesUrl[i - 1]"
            icon="fa-solid fa-plus"
          />
          <font-awesome-icon
            @click="removeFile(i)"
            v-if="createEventsStore.filesUrl[i - 1]"
            icon="fa-solid fa-minus"
          />
          <font-awesome-icon
            @click="setMainImage(i)"
            v-if="createEventsStore.filesUrl[i - 1]"
            icon="fa-solid fa-star"
            :class="{
              active: i - 1 === createEventsStore.eventData.step_2.Main_image,
            }"
          />
          <label :for="'image-' + i">
            <img
              v-if="createEventsStore.filesUrl[i - 1]"
              :src="createEventsStore.filesUrl[i - 1]"
              alt=""
            />
          </label>
          <input
            @change="onFileChange($event, i)"
            :id="'image-' + i"
            type="file"
          />
        </div>
      </div>
    </div>
    <button @click="validateStep" class="validation__btn-0"></button>
  </div>
</template>

<script>
import { useCreateEventStore } from "../../store/create_event";
import { useEventsStore } from "../../store/events";
import { onMounted, computed } from "vue";
import { useToast } from "vue-toastification";
// import RestrictedContent from "@/components/RestrictedContent.vue";

import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  // components: { RestrictedContent },
  setup() {
    const eventsStore = useEventsStore();
    const createEventsStore = useCreateEventStore();
    const toast = useToast();

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
    function onFileChange(e, key) {
      toast.info("Image added succesfully!", {
        timeout: 5000,
      });
      const file = e.target.files[0];
      createEventsStore.filesUrl[key - 1] = URL.createObjectURL(file);
      createEventsStore.eventData.step_2.images.push({
        key: key,
        img: e.target.files[0],
      });
      console.log(createEventsStore.eventData.step_2.images);
    }
    function removeFile(idx) {
      toast.info("Image removed succesfuly!", {
        timeout: 5000,
      });
      createEventsStore.filesUrl[idx - 1] = null;
      createEventsStore.eventData.step_2.images =
        createEventsStore.eventData.step_2.images.filter((x) => x.key !== idx);
      console.log(createEventsStore.eventData.step_2.images);
    }
    function setMainImage(idx) {
      toast.info("Image set as main.", {
        timeout: 5000,
      });
      createEventsStore.eventData.step_2.Main_image = idx - 1;
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
      onFileChange,
      removeFile,
      setMainImage,
    };
  },
};
</script>

<style lang="scss" scoped>
.step {
  &__field {
    position: relative;
    padding: 4px;
    &--checkbox {
      display: flex;
      gap: 8px;

      .checkbox-wrapper-12 {
        @include checkbox();
      }
    }
    .images {
      display: flex;
      gap: 24px;
      flex-direction: row;
      flex-wrap: wrap;
      margin-top: 24px;
    }
    .image__box {
      position: relative;
      .fa-plus {
        transition: 0.2s;
        position: absolute;
        left: 50%;
        top: 50%;
        font-size: 1rem;
        transform: translate(-50%, -50%);
        border: 2px solid $secondary-blue;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        padding: 10px;
        color: $secondary-blue;
        z-index: 2;
        pointer-events: none;
      }
      .fa-minus,
      .fa-star {
        position: absolute;
        right: 10px;
        top: 10px;
        color: white;
        background: red;
        font-size: 1.2rem;
        padding: 5px;
        border-radius: 5px;
        z-index: 2;
        cursor: pointer;
      }
      .fa-star {
        left: 10px;
        background: $secondary-blue;
        &.active {
          color: yellow;
        }
      }
      input {
        display: none;
      }
      label {
        width: 250px;
        height: 150px;
        border: 2px dashed $secondary-blue;
        display: block;
        border-radius: 4px;
        position: relative;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        &:hover {
          .fa-plus {
            transform: translate(-50%, -50%) scale(1.1);
          }
          background: rgb(247, 247, 255);
        }
      }
    }
  }
}
</style>