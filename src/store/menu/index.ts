import { defineStore } from 'pinia'
import routes from '~pages'
import {examplesHandler} from "@/utils/examplesHandler.ts";
export const useMenuStore = defineStore('menu', {
    state: () => ({
        menuTree: {} as Route,
    }),
    getters: {

    },
    actions: {
        buildMenuTree() {
            this.menuTree = examplesHandler(routes);
        }
    },
})