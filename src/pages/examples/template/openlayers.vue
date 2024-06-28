<script setup lang="ts">
import {useMap} from "@/hooks/map/openlayers/useMap.ts";
import {onMounted, ref} from "vue";

const mapRef = ref<HTMLElement>();
onMounted(() => {
  if (mapRef.value) {
    useMap(mapRef.value);
  }
})
</script>

<template>
  <div id="ol-map" ref="mapRef"></div>
</template>

<style scoped>
</style>