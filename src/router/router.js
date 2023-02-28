import { createRouter, createWebHistory } from "vue-router";
import UserTablePage from "../pages/UserTablePage.vue";

const routes = [
  {
    path: "/",
    name: "UserTablePage",
    component: UserTablePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
