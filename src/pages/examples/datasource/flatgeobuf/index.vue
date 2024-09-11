<script lang="ts" setup>
import {onMounted, ref} from "vue";
import VectorSource from "ol/source/Vector";
import Map from "ol/Map";
import View from "ol/View";
import {GeoJSON} from "ol/format";
import {geojson} from "flatgeobuf";
import {VectorImage} from "ol/layer";

const mapRef = ref<HTMLElement>();
onMounted(async () => {
  if (mapRef.value) {

    const source = new VectorSource({
      format: new GeoJSON(),
      loader: async function () {
        // const response = await fetch('https://flatgeobuf.org/test/data/UScounties.fgb')
        const response = await fetch('/public/test/data/UScounties.fgb')
        if (response.body) {
          const start = new Date().getTime()
          for await (let json of geojson.deserialize(response.body)) {
            const feature = new GeoJSON().readFeature(json);
            if (feature) {
              const geometry = feature.getGeometry();
              if (geometry) {
                geometry.transform('EPSG:4326', 'EPSG:3857');
                source.addFeature(feature);
              } else {
                console.error('Feature has no geometry:', feature);
              }
            } else {
              console.error('Failed to create feature from GeoJSON:', json);
            }
          }
          // call your function
          const end = new Date().getTime()
          console.log('cost is', `${end - start}ms`)
        } else {
          console.error('No response body received');
        }
      }
    })

    new Map({
      target: mapRef.value,
      layers: [
        new VectorImage({
          source: source,
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