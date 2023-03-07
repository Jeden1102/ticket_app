<template>
  <div class="event container" v-if="eventData">
    <h1 class="event__title">
      {{ eventData.Title }}
    </h1>
    <div class="event__badge">
      {{ eventData.event_category.data.attributes.Name }}
    </div>
    <div class="event__main">
      <div class="event__content">
        <div class="images">
          <Carousel :breakpoints="breakpoints" :items-to-show="1" :gap="20">
            <Slide v-for="image in eventData.Images.data" :key="image.id">
              <img :src="getImageURL(image)" alt="" />
            </Slide>
            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div>
        <div class="content" v-html="eventData.Description"></div>
      </div>
      <div class="event__side">
        <div class="sticky">
          <div class="sticky__items">
            <div class="sticky__item">
              <h3>{{ eventData.Title }}</h3>
            </div>
            <div class="sticky__item">
              <p>{{ formatDate(eventData.Date) }}</p>
              <font-awesome-icon icon="fa-solid fa-calendar-days" />
            </div>
            <div class="sticky__item">
              <p>{{ eventData.attendants }}</p>
              <font-awesome-icon icon="fa-solid fa-user" />
            </div>
            <div class="sticky__item">
              <p>{{ eventData.Location }}</p>
              <font-awesome-icon icon="fa-solid fa-location-dot" />
            </div>
          </div>

          <div class="sticky__item">
            <button>
              <a
                :href="'https://www.google.com/maps/dir//' + eventData.Location"
                target="_blank"
                >Show route</a
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useEventsStore } from "../store/events";
import axios from "axios";
import { onMounted, ref } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  props: {
    event: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const eventsStore = useEventsStore();
    const breakpoints = {
      0: {
        itemsToShow: 1,
        snapAlign: "center",
      },
    };
    onMounted(() => {
      getEvent();
    });
    const eventData = ref(null);
    const eventID = ref(null);
    function getImageURL(image) {
      if (!image) {
        return "";
      }
      return `${process.env.VUE_APP_IMAGES_API}${image.attributes.url}`;
    }
    function formatDate(date) {
      const newDate = new Date(date);
      const month = newDate.toLocaleString("default", { month: "short" });
      const day = newDate.getDay();
      return `${day} ${month}`;
    }
    function getEvent() {
      axios
        .get(
          `${process.env.VUE_APP_API_URL}events?[filters][Title][$containsi]=${props.event}&populate=*`
        )
        .then((res) => {
          eventData.value = res.data.data[0].attributes;
          eventID.value = res.data.data[0].id;
          console.log(eventData.value);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return {
      eventsStore,
      getEvent,
      eventData,
      eventID,
      getImageURL,
      formatDate,
      breakpoints,
    };
  },
};
</script>

<style lang="scss" scoped>
.event {
  position: relative;
  &__badge {
    @include badge-base($secondary-blue, white);
    width: fit-content;
    margin-bottom: 16px;
  }
  .carousel__slide {
    margin: 0 4px;
  }
  &__side {
    position: fixed;
    left: 0;
    bottom: 120px;
    width: 100%;
    height: 100px;
    background: white;
    position: static;
    .sticky {
      position: fixed;
      bottom: 100px;
      width: 100%;
      left: 0;
      @include glass-card;
      &__items {
        display: flex;
        justify-content: space-around;
      }
      &__item {
        &:first-child {
          display: none;
        }
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        gap: 16px;
        align-items: center;
        font-size: 1.1rem;
        font-weight: 600;
        button {
          @include button-primary;
          a {
            color: white;
          }
        }
      }
    }
    @media (min-width: 768px) {
      position: static;
      .sticky {
        top: 200px;
        width: 23%;
        left: unset;
        transform: translateX(20px);
        &__items {
          display: block;
        }
        &__item {
          &:first-child {
            display: block;
          }
        }
      }
    }
  }
  &__main {
    @media (min-width: 768px) {
      display: flex;
    }
  }
  &__content {
    img {
      max-width: 100%;
      object-fit: contain;
      max-height: 500px;
      border-radius: 10px;
    }
    @media (min-width: 768px) {
      width: 70%;
    }
  }
}
</style>