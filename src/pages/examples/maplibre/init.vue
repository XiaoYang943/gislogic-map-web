<script setup lang="ts">
  import {onMounted} from "vue";
  import maplibregl from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  onMounted(() => {
    var map = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0,0],
      zoom: 0
    });
  })
</script>

<template>
  <div id='map' style='width: 100%; height: 100%;'></div>
</template>

<style scoped>

</style>