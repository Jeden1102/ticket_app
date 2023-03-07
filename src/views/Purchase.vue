<template>
  <div class="purchase container">
    Purchase {{ event }} EVENT DATA : {{ eventData }} Pool
    {{ eventsStore.eventTicketPool }}
  </div>
</template>

<script>
import { useEventsStore } from "../store/events";
import { onMounted, ref } from "vue";
import axios from "axios";

export default {
  props: {
    event: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    onMounted(() => {
      getEvent();
    });
    const eventsStore = useEventsStore();

    const eventData = ref(null);
    const eventID = ref(null);
    function getEvent() {
      axios
        .get(
          `${process.env.VUE_APP_API_URL}events?[filters][Title][$containsi]=${props.event}&populate=*`
        )
        .then((res) => {
          eventData.value = res.data.data[0].attributes;
          eventID.value = res.data.data[0].id;
          console.log(eventData.value);
          getEventTicketPools();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function getEventTicketPools() {
      eventsStore.getEventTicketPool(eventID.value);
    }
    return {
      eventsStore,
      getEvent,
      eventData,
      eventID,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>