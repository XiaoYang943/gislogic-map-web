import { createWebHistory, createRouter } from 'vue-router'
import routes from '~pages'
import {examplesHandler} from "@/utils/examplesHandler.ts";
console.log('routes',routes);
console.log(JSON.stringify(examplesHandler(routes).children, null, 2));

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router