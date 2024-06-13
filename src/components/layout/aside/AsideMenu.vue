<template>
  <template v-for="menuItem in props.menuList">
    <component
        :is="menuItem.children ? 'el-sub-menu' : 'el-menu-item'"
        :index="menuItem.path"
        @click="open(menuItem)"
    >
      <template #title>
        <span>{{menuItem.name}}</span>
      </template>
      <AsideMenu :menuList="menuItem.children"></AsideMenu>
    </component>
  </template>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router"
const router = useRouter();
const props = defineProps({
  menuList: Array<Route>
})

const open = (menuItem: Route) => {
  if(!menuItem.children) {
    router.push({
      path:menuItem.path
    })
  }
}
</script>

<style scoped>
::v-deep(.el-sub-menu__title) {
  height: 30px;
}

::v-deep(.el-menu .el-menu-item) {
  height: 30px;
}
</style>
