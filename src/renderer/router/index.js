import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/renderer/views/Home.vue"),
    meta: {
      title: "Herramientas",
    },
  },
  {
    path: "/conversor-neodata",
    name: "ConversorNeodata",
    component: () => import("@/renderer/views/ConversorNeodata.vue"),
    meta: {
      title: "Conversor",
    },
  },
];

const router = new VueRouter({
  mode:  process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
