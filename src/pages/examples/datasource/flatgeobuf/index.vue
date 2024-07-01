<script setup lang="ts">
import {onMounted, ref} from "vue";
import VectorSource from "ol/source/Vector";
import {geojson} from "flatgeobuf";
import VectorLayer from "ol/layer/Vector";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import {XYZ} from "ol/source";
import View from "ol/View";
import {GeoJSON} from "ol/format";

const mapRef = ref<HTMLElement>();
onMounted(async () => {
  if (mapRef.value) {
    const source = new VectorSource({
      format: new GeoJSON(),
      loader: async function () {
        // const response = await fetch('https://flatgeobuf.org/test/data/UScounties.fgb')
        const response = await fetch('/public/test/data/UScounties.fgb')
        for await (let json of geojson.deserialize(response.body)) {
          console.log("json", json)
          const feature = new GeoJSON().readFeatures(json);
          console.log("feature", feature)
          source.addFeatures(feature)
        }
      }
    })
    new Map({
      target: mapRef.value,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'http://t4.tianditu.com/DataServer?T=vec_w&tk=a9bbec302f2213e1fe33e9775187d021&x={x}&y={y}&l={z}',
          }),
          zIndex: 0,
        }),

        new TileLayer({
          source: new XYZ({
            url: 'http://t4.tianditu.com/DataServer?T=cva_w&tk=81b9a9cf3e4be1df181e7bf54c5949fc&x={x}&y={y}&l={z}',
          }),
          zIndex: 1,
        }),
        new VectorLayer({
          source: source,
          zIndex: 999
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    });


  }
})


</script>

<template>
  <div id="ol-map" ref="mapRef"></div>
</template>

<style scoped>
</style>