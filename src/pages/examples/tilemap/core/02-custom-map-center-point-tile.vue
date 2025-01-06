<script setup lang="ts">
import DrawImageOnCanvas from "./01-draw-image-on-canvas.vue"
import {getTileRowAndCol} from "src/utils/tiles";
import {onMounted, ref, watch,} from "vue";

const mapCenterLon = ref(111) // 地图中心点经度
const mapCenterLat = ref(40)  // 地图中心点纬度
const zoom = ref(3) // 缩放层级

const drawImageOnCanvasRef = ref<InstanceType<typeof DrawImageOnCanvas> | null>(null);

const exec = () => {
  if (drawImageOnCanvasRef.value) {
    drawImageOnCanvasRef.value.draw({
      imageX:0,
      imageY:0,
      tileX:getTileRowAndCol(mapCenterLon.value, mapCenterLat.value, zoom.value)[0],
      tileY:getTileRowAndCol(mapCenterLon.value, mapCenterLat.value, zoom.value)[1],
      zoom:zoom.value
    });
  }
};

const setDefault = () => {
  mapCenterLon.value = 111;
  mapCenterLat.value = 40;
  zoom.value = 3;
}

watch([mapCenterLon, mapCenterLat, zoom], () => {
  exec();
});

onMounted(() => {
  exec();
})
</script>

<template>
  <el-input v-model="mapCenterLon" style="width: 240px" placeholder="地图中心点经度" />
  <el-input v-model="mapCenterLat" style="width: 240px" placeholder="地图中心点纬度" />
  <el-input v-model="zoom" style="width: 240px" placeholder="缩放层级" />
  <el-button @click="setDefault">恢复默认</el-button>
    <DrawImageOnCanvas ref="drawImageOnCanvasRef"></DrawImageOnCanvas>
</template>

<style scoped>

</style>