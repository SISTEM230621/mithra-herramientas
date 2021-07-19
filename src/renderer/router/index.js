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
    name: "Neodatac",
    component: () => import("@/renderer/views/Neodatac.vue"),
    meta: {
      title: "Catalogo Neodata",
    },
  },
];

const router = new VueRouter({
  mode:  process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
