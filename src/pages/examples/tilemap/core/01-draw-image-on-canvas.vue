<script setup lang="ts">
import {onMounted, ref} from "vue";
const canvas = ref<HTMLCanvasElement | null>(null);
interface Options {
    imageX:number; // image绘制到canvas上的坐标x
  imageY:number; // image绘制到canvas上的坐标y
  tileX:number;  // image瓦片源行号x
  tileY:number; // image瓦片源列号y
  zoom:number;   // image瓦片源缩放层级zoom
}
const draw = (options:Options) => {
  if (canvas.value) {
    const ctx = canvas.value.getContext('2d');
    if (ctx) {
      canvas.value.width = 1000;
      canvas.value.height = 500;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
      const image = new Image();
      image.src = `https://webrd01.is.autonavi.com/appmaptile?x=${options.tileX}&y=${options.tileY}&z=${options.zoom}&lang=zh_cn&size=1&scale=1&style=8`
      image.onload = (() => {
        ctx.drawImage(image,options.imageX,options.imageY)
      })
    }
  }
}
onMounted(() => {
  draw({
      imageX:0,
      imageY:0,
      tileX:26978,
      tileY:12415,
      zoom:15
    }
  );
});
defineExpose({
  draw
})
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style scoped>

</style>