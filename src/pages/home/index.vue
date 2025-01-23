<script lang="ts" setup>
import AsideMenu from "@/components/layout/aside/AsideMenu.vue";
import {useMenuStore} from "@/store/menu";

const menuStore = useMenuStore();
menuStore.buildMenuTree();
</script>

<template>
  <el-container style="height: 100%">
    <el-container>
      <el-aside width="200px" style="background-color: transparent">
        <el-scrollbar>
          <el-menu
              active-text-color="#2cc0da"
              class="sidebar_container"
              style="height: 100%"
              unique-opened
              router
          >
            <el-scrollbar max-height="800px">
              <aside-menu :menuList="menuStore.menuTree.children![0].children"></aside-menu>
            </el-scrollbar>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style scoped>
</style>
