<template>
    <div class="events__map" style="height:600px;">
      <l-map ref="map" minZoom="2" maxZoom="16" :center="[47.41322, -1.219482]">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker :lat-lng="[47.41322, -1.219482]">
        <l-icon :icon-url="require('../../assets/events/party.png')" :icon-size="[30,30]"/>
      </l-marker>
      </l-map>
    </div>
  </template>
  
  <script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
  
  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LIcon
    },
    data() {
      return {
        zoom: 2,
      };
    },
  };
  </script>
  
  <style lang="scss">
.events__map{
    @include glass-card;
}
</style>