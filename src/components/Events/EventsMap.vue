<template>
  <div class="events__map" style="height:600px;">
    <l-map ref="map" minZoom="2" maxZoom="16" :center="[47.41322, -1.219482]">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
        name="OpenStreetMap"></l-tile-layer>
      <marker-cluster :options="{ showCoverageOnHover: false, chunkedLoading: true }">
        <l-marker v-for="event in eventsStore.events" :key="event.id"
          :lat-lng="[event.attributes.geolocation[0].lat, event.attributes.geolocation[0].lon]">
          <l-popup>
            <div class="popup">
              <span class="popup__title">{{ event.attributes.Title }} </span>
              <span class="popup__location">{{ event.attributes.geolocation[0].display_name }} </span>
              <span class="popup__location">{{ formatDate(event.attributes.Date) }} </span>
            </div>
          </l-popup>
          <l-icon :icon-url="setIconImg(event.attributes.event_category.data.attributes.Name)" :icon-size="[30, 30]" />
        </l-marker>
      </marker-cluster>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon, LPopup } from "@vue-leaflet/vue-leaflet";
import { useEventsStore } from '../../store/events';
import { onMounted } from "vue";
import MarkerCluster from "./MarkerCluster.vue";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    MarkerCluster,
    LPopup,
  },

  setup() {
    const eventsStore = useEventsStore()
    function formatDate(date) {
      const newDate = new Date(date);
      const month = newDate.toLocaleString('default', { month: 'short' });
      const day = newDate.getDay();
      return `${day} ${month}`
    }
    function setIconImg(category) {
      const mapCategory = { 'Art': 'art.png', 'Dance': 'dance.png', 'Music': 'music.png', 'Other': 'other.png', 'Sport': 'sport.png' }
      return require(`../../assets/events/${mapCategory[category]}`);
    }
    onMounted(() => {
      eventsStore.getEvents({ filters: eventsStore.filters })
    })
    return {
      eventsStore,
      setIconImg,
      formatDate
    }
  }
};
</script>

<style lang="scss">
.events__map {
  @include glass-card;

  .popup {
    display: flex;
    flex-direction: column;

    &__title {
      font-size: 1rem;
      font-weight: 600;
    }
  }
}
</style>