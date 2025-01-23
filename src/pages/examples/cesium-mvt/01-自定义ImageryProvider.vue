<template>
  <div id="cesiumContainer"></div>
</template>
<!--
自定义Cesium.ImageryProvider，将canvas贴到球上

待解决：
requestImage获取的xyz是0,0,0

-->
<script setup>
import * as Cesium from 'cesium';
import { onMounted } from 'vue';
onMounted(() => {
  class VectorProvider{
    constructor(options) {
      this.tilingScheme = new Cesium.WebMercatorTilingScheme();
      this.rectangle = this.tilingScheme.rectangle;
      this.tileSize = 256;
    }
    createTile() {
      let canv = document.createElement("canvas");
      canv.width = this.tileSize;
      canv.height = this.tileSize;
      canv.style.imageRendering = "pixelated";
      let ctx = canv.getContext("2d");
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, canv.width, canv.height);
      canv.getContext("2d").globalCompositeOperation = "copy";
      return canv;
    }

    requestImage(
        x,
        y,
        zoom,
        releaseTile = true
    ) {
      console.log(x,y,zoom)
      return new Promise((resolve, reject) => {
        resolve(this.createTile());
      })
    }

    pickFeatures(x, y, zoom, longitude, latitude) {
      return null;
    }
  }

  const viewer = new Cesium.Viewer('cesiumContainer');
  const vectorProvider = new VectorProvider();
  viewer.imageryLayers.addImageryProvider(vectorProvider)
});
</script>

<style>
html,body,#cesiumContainer{
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>