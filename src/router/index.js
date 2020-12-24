import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/swap",
    name: "swap",
    component: () => import("../views/Swap.vue"),
  },
  {
    path: "/pool",
    name: "pool",
    component: () => import("../views/Pool.vue"),
    children: [
      {
        path: "",
        name: "pooldefault",
        component: () => import("../views/pool/defaultPanel.vue"),
      },
      {
        path: "add",
        name: "poolAdd",
        component: () => import("../views/pool/add.vue"),
      },
      {
        path: "remove/:addrA/:addrB",
        name: "poolRemove",
        component: () => import("../views/pool/remove.vue"),
      },
    ],
  },
  {
    path: "/history",
    name: "history",
    component: () => import("../views/history/History.vue"),
    children: [
      {
        path: "lamb/:ethAddress/:lambAddress",
        name: "historyLambda",
        component: () => import("../views/history/Lamb.vue"),
      },
      {
        path: "eth/:lambAddress/:ethAddress",
        name: "historyEth",
        component: () => import("../views/history/Eth.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
