<template>
  <div class="my-tickets">
    My tickets
    <div class="ticket" v-for="ticket in tickets" :key="ticket.id">
      <div class="ticket__event-data">
        <h3>
          {{
            ticket.attributes.ticket_pool.data.attributes.event.data.attributes
              .Title
          }}
        </h3>
        <h5>
          {{
            ticket.attributes.ticket_pool.data.attributes.event.data.attributes
              .Date
          }}
        </h5>
        <h6>
          {{
            ticket.attributes.ticket_pool.data.attributes.event.data.attributes
              .Location
          }}
        </h6>
        <button>POKAŻ TRASĘ</button>
      </div>
      <div class="ticket__ticket-data">
        <div class="base">
          <span>VIP</span>
          <span>19.99</span>
        </div>
        <p>bum123@o2.pl</p>
        <p>qr-xe-2e2e</p>
        <p>QR_CODE</p>
        <button>POBIERZ PDF</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useTicketsStore } from "../../store/tickets";
import { onMounted, computed } from "vue";
export default {
  setup() {
    const ticketsStore = useTicketsStore();
    onMounted(() => {
      ticketsStore.getUserTickets();
    });
    const tickets = computed(() => {
      return ticketsStore.userTickets.data;
    });
    return { ticketsStore, tickets };
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
    border: 1px solid $secondary-blue;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0px 7px 23px -15px rgb(53, 53, 53);
    display: flex;
    justify-content: space-between;
    &__event-data {
      display: flex;
      flex-direction: column;
      gap: 10px;
      * {
        margin: 0;
      }
    }
  }
}
</style>