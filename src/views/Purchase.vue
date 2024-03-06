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
        <div
          class="event__content__ticket"
          v-for="(ticket, idx) in eventsStore.eventTicketPool"
          :key="ticket.id"
        >
          <div>
            <h5>
              {{ ticket.attributes.type }} - {{ ticket.attributes.price }}$
            </h5>
            <span>{{ ticket.attributes.variant }}</span>
          </div>

          <div class="ticket__actions">
            <button
              :disabled="!selectedTickets[ticket.id]"
              @click="changeAmount(0, idx, ticket.id)"
            >
              -
            </button>
            <p>
              {{ selectedTickets[ticket.id] ? selectedTickets[ticket.id] : 0 }}
            </p>
            <button @click="changeAmount(1, idx, ticket.id)">+</button>
          </div>
        </div>
        <div class="event__content__purchase">
          <button @click="purchase">Purchase</button>
        </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useEventsStore } from "../store/events";
import { useTicketsStore } from "../store/tickets";
import axios from "axios";
import { onMounted, ref } from "vue";
export default {
  props: {
    event: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const eventsStore = useEventsStore();
    const ticketsStore = useTicketsStore();

    onMounted(() => {
      getEvent();
    });
    const selectedTickets = ref({
      // {ticket_pool:x,event_id:x,amount:x},
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
          getEventTicketPools();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function getEventTicketPools() {
      eventsStore.getEventTicketPool(eventID.value);
    }
    function changeAmount(dir, idx, pool) {
      let oldValue = selectedTickets.value[pool]
        ? selectedTickets.value[pool]
        : 0;
      selectedTickets.value[pool] = dir ? ++oldValue : --oldValue;
    }
    function purchase() {
      ticketsStore.createTickets(selectedTickets);
    }
    return {
      eventsStore,
      getEvent,
      eventData,
      eventID,
      getImageURL,
      formatDate,
      selectedTickets,
      changeAmount,
      ticketsStore,
      purchase,
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
      width: 92%;
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
        &--last {
          display: flex;
          flex-direction: column;
          gap: 6px;
          span {
            b {
              font-size: 1.4rem;
            }
          }
          button {
            margin-top: 7px;
            @include button-base(rgb(224, 224, 55), rgb(0, 0, 0));
          }
        }
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
        height: fit-content;
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
    display: flex;
    flex-direction: column;
    gap: 8px;
    &__ticket {
      border: 1px solid rgb(224, 224, 224);
      padding: 15px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      button {
        @include button-primary;
      }
      .ticket__actions {
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          font-size: 1.2rem;
          font-weight: 700;
        }
      }
      h5 {
        text-transform: uppercase;
        font-size: 1.2rem;
      }
      span {
        @include badge-base($secondary-blue, white);
      }
    }
    &__purchase {
      button {
        @include button-base($primary-blue, white);
      }
    }
    @media (min-width: 768px) {
      min-width: 70%;
      width: 70%;
    }
  }
}
</style>