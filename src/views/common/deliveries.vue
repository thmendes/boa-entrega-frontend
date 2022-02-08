<template>
  <l-map
    ref="map"
    :zoom="zoom"
    :center="[
      position.lat || userLocation.lat || defaultLocation.lat,
      position.lng || userLocation.lng || defaultLocation.lng
    ]"
  >
    <l-tile-layer
      :url="tileProvider.url"
      :attribution="tileProvider.attribution"
    />
    <l-marker
      v-for="delivery in deliveries" :key="delivery.id"
      visible
      :icon="icon"
      :lat-lng.sync="delivery.position"
    >
      <l-tooltip :content="buildTooltipContent(delivery)" :options="{ permanent: false }" />
    </l-marker>
  </l-map>
</template>
<script>
import { LMap, LMarker, LTileLayer, LTooltip } from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { icon } from "leaflet";
import axios from "axios"
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
  props: {
    defaultLocation: {
      type: Object,
      default: () => ({
        lat: -15.7801,
        lng: -47.9292
      })
    }
  },
  data() {
    return {
      loading: false,
      geoSearchOptions: {
        provider: new OpenStreetMapProvider(),
        showMarker: false,
        autoClose: true
      },
      userLocation: {},
      icon: icon({
        iconRetinaUrl: require("../../assets/box-truck-2x.png"),
        iconUrl: require("../../assets/box-truck.png")
        
      }),
      position: {},
      address: "",
      tileProvider: {
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      },
      zoom: 5,
      dragging: false,
      deliveries: [
        {
          id: '1',
          position: {
            lat: -26.99855345915041,
            lng: -52.70487070083619
          },
          provider: 'Transportes São Luis',
          destination: 'Campinas - SP',
          origin: 'Chapecó - SC',
          currentAddress: ''
        },
        {
          id: '2',
          position: {
            lat: -26.985073635332522,
            lng: -52.64757871627808   
          },
          provider: 'Transportes São Luis',
          destination: 'Douradina - PR',
          origin: 'Chapecó - SC',
          currentAddress: ''
        }
      ]
    };
  },
  mounted() {
    this.getUserPosition();
    this.getCurrentAdresses();
  },
  methods: {
    buildTooltipContent(delivery){
      return `
      <strong>${delivery.provider}</strong>
      <hr/>
      <br/>
      <strong>De: ${delivery.origin}</strong>
      <br/>
      <strong>Para: ${delivery.destination}</strong>
      <br/>
      Atualmente em: ${delivery.currentAddress}
      `
    },
    getCurrentAdresses() {
      this.deliveries.forEach((delivery, index) => {
        this.loading = true;
        axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${delivery.position.lat}&lon=${delivery.position.lng}`)
        .then((res) => {
          const body = res.data;
          this.deliveries[index].currentAddress = body.display_name.replace(",","<br/>");
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        })
      });
    },
    async getUserPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          this.userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
        });
      }
    }
  }
};
</script>