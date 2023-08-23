import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      layout: "default",
    },
    component: () => import("../views/bodyPage.vue"),
  },
  {
    path: "/yourExam",
    name: "yourExam",
    meta: {
      layout: "default",
    },
    component: () => import("../views/yourExam.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
