<template>
    <div class="events__map" style="height:600px;">
      <l-map ref="map" minZoom="2" maxZoom="16" :center="[47.41322, -1.219482]">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <marker-cluster
        :options="{ showCoverageOnHover: false, chunkedLoading: true }"
      >
        <l-marker v-for="event in eventsStore.events" :key="event.id" :lat-lng="[event.attributes.geolocation.lat, event.attributes.geolocation.lon]">
        <l-icon :icon-url="setIconImg(event.attributes.event_category.data.attributes.Name)" :icon-size="[30,30]"/>
      </l-marker>
      </marker-cluster>
      </l-map>
    </div>
  </template>
  
  <script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
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
    },
    
    setup(){
      const eventsStore = useEventsStore()
      function setIconImg(category){
        const mapCategory = {'Art':'art.png','Dance':'dance.png','Music':'music.png','Other':'other.png','Sport':'sport.png'}
        return require(`../../assets/events/${mapCategory[category]}`);
      }
      onMounted(()=>{
        eventsStore.getEvents('all')
      })
      return {
        eventsStore,
        setIconImg
      }
    }
  };
  </script>
  
  <style lang="scss">
.events__map{
    @include glass-card;
}
</style>