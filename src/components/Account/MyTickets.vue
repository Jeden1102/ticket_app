<template>
  <div class="my-tickets">
    <div class="ticket" v-for="ticket in tickets" :key="ticket.id">
      <div
        class="ticket__event-data"
        v-if="ticket.attributes.ticket_pool.data.attributes.event.data"
      >
        <p class="title">
          {{
            ticket.attributes.ticket_pool.data.attributes.event.data.attributes
              .Title
          }}
        </p>
        <p>
          {{
            formatDate(
              ticket.attributes.ticket_pool.data.attributes.event.data
                .attributes.Date
            )
          }}
        </p>
        <p class="location">
          {{
            ticket.attributes.ticket_pool.data.attributes.event.data.attributes
              .Location
          }}
        </p>

        <a
          class="show-route"
          target="_blank"
          title="Click to see the route"
          :href="
            'https://www.google.com/maps/dir//' +
            ticket.attributes.ticket_pool.data.attributes.event.data.attributes
              .Location
          "
          ><span> Show route </span></a
        >
        <router-link
          v-if="
            ticket.attributes.ticket_pool.data.attributes.event.data.attributes
              .ticket_refundable
          "
          :to="{
            name: 'RefundTicket',
            query: { code: ticket.attributes.code },
          }"
          class="refund-ticket"
        >
          <span>Refund ticket</span>
        </router-link>
        <div class="status-badge" :class="{ used: ticket.attributes.used }">
          {{ ticket.attributes.used ? "Used" : "Active" }}
        </div>
      </div>
      <div class="ticket__ticket-data">
        <div class="base">
          <span class="badge">{{
            ticket.attributes.ticket_pool.data.attributes.type
          }}</span>
          /
          <span class="price"
            >${{ ticket.attributes.ticket_pool.data.attributes.price }}</span
          >
        </div>
        <p class="type">
          {{ ticket.attributes.ticket_pool.data.attributes.variant }}
        </p>
        <p>{{ ticket.attributes.email }}</p>
        <p>{{ ticket.attributes.code }}</p>
        <QRCodeVue3
          :width="150"
          :height="150"
          :value="currentUrl"
          :qrOptions="{
            typeNumber: 0,
            mode: 'Byte',
            errorCorrectionLevel: 'H',
          }"
          :imageOptions="{
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 0,
          }"
          :dotsOptions="{
            type: 'dots',
            color: '#26249a',
            gradient: {
              type: 'linear',
              rotation: 0,
              colorStops: [
                { offset: 0, color: '#424AFF' },
                { offset: 1, color: '#7996ED' },
              ],
            },
          }"
        />
        <button class="download-pdf">Get PDF</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useTicketsStore } from "../../store/tickets";
import { onMounted, computed } from "vue";
/* eslint-disable no-unused-vars */
import QRCodeVue3 from "qrcode-vue3";
export default {
  components: {
    QRCodeVue3,
  },
  setup() {
    const ticketsStore = useTicketsStore();
    onMounted(() => {
      ticketsStore.getUserTickets();
    });
    function formatDate(date) {
      const newDate = new Date(date);
      const month = newDate.toLocaleString("default", { month: "short" });
      const day = newDate.getDay();
      const year = newDate.getFullYear();
      return `${day} ${month} ${year}`;
    }
    const currentUrl = computed(() => {
      return window.location.href;
    });
    const tickets = computed(() => {
      if (ticketsStore.userTickets) {
        return ticketsStore.userTickets.data;
      }
      return null;
    });
    return { ticketsStore, tickets, formatDate, currentUrl };
  },
};
</script>

<style lang="scss" scoped>
.my-tickets {
  @include glass-card;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .ticket {
    border: 1px solid rgba(121, 150, 237, 0.5);
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0px 7px 23px -15px rgb(53, 53, 53);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    @media (min-width: 768px) {
      flex-direction: row;
    }
    .show-route {
      @include button-base($primary-blue, white);
      display: grid;
      place-content: center;
    }
    .refund-ticket {
      display: grid;
      place-content: center;
      margin-top: auto;
      @include button-base(rgb(155, 155, 155), white);
    }
    .status-badge {
      text-align: center;
      @include badge-base(rgba(38, 143, 38, 0.7), white);
      &.used {
        @include badge-base(rgba(255, 0, 0, 0.6), white);
      }
    }
    &__event-data {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .title {
        font-size: 1.4rem;
      }
      .location {
        font-size: 0.8rem;
      }
      * {
        margin: 0;
      }
    }
    &__ticket-data {
      * {
        margin: 8px 0;
      }
      .base {
        margin: 0;
        display: flex;
        gap: 6px;
        align-items: center;
        text-transform: uppercase;
        .badge {
          @include badge-base($secondary-blue, white);
        }
        .price {
          font-weight: 500;
          font-size: 1.1rem;
        }
      }
      .type {
        @include badge-base($light-blue, rgb(36, 36, 36));
        border: 1px solid rgba(121, 150, 237, 0.5);
        text-align: center;
      }
      .download-pdf {
        @include button-base(rgb(224, 224, 55), rgb(48, 48, 48));
      }
    }
  }
}
</style>