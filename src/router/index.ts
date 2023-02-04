import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import localCache from "@/utils/cache";
import { tabPaneProps } from "element-plus";
import { firstMenu } from '@/utils/map_menus';

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name:'login',
    component: () =>import("@/views/login/login.vue"),
  },
  {
    path: "/main",
    name:'main',
    component: () =>import("@/views/main/main.vue"),
  },
  {
    path:'/:pathMatch(.*)*',
    name:'not_found',
    component:() =>import('@/views/not_found/not_found.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to)=>{
  if(to.path !== '/login'){
    const token = localCache.getCache('token');
    if(!token){
      return '/login';
    }
  }

  if(to.path === '/main'){
    return firstMenu.url
  }
})

export default router;
