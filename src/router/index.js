import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { useAuthStore } from "../store/auth";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      auth: false,
    },
  },
  {
    path: "/about",
    name: "About",
    component: function () {
      return import("../views/About.vue");
    },
    meta: {
      auth: false,
    },
  },
  {
    path: "/event",
    children: [
      {
        path: ":event",
        name: "Event",
        props: true,
        component: function () {
          return import("../views/Event.vue");
        },
      },
    ],
  },
  {
    path: "/event/:event/purchase",
    name: "Purchase",
    props: true,
    component: function () {
      return import("../views/Purchase.vue");
    },
  },
  {
    path: "/events",
    name: "Events",
    component: function () {
      return import("../views/Events.vue");
    },
    meta: {
      auth: false,
    },
    children: [
      {
        path: "map",
        name: "EventsMap",
        component: function () {
          return import("../components/Events/EventsMap.vue");
        },
      },
      {
        path: "list",
        name: "EventsList",
        component: function () {
          return import("../components/Events/EventsList.vue");
        },
      },
    ],
  },
  {
    path: "/account",
    name: "Account",
    component: function () {
      return import("../views/Account.vue");
    },
    children: [
      {
        path: "DangerZone",
        name: "DangerZone",
        component: function () {
          return import("../components/Account/DangerZone.vue");
        },
      },
      {
        path: "MyTickets",
        name: "AccountEvents",
        component: function () {
          return import("../components/Account/Events.vue");
        },
      },
      {
        path: "MyTickets",
        name: "MyTickets",
        component: function () {
          return import("../components/Account/MyTickets.vue");
        },
      },
      {
        path: "Help",
        name: "Help",
        component: function () {
          return import("../components/Account/Help.vue");
        },
      },
      {
        path: "Profile",
        name: "Profile",
        component: function () {
          return import("../components/Account/Profile.vue");
        },
      },
      {
        path: "Settings",
        name: "Settings",
        component: function () {
          return import("../components/Account/Settings.vue");
        },
      },
      {
        path: "Statistics",
        name: "Statistics",
        component: function () {
          return import("../components/Account/Statistics.vue");
        },
      },
    ],
    meta: {
      auth: true,
    },
  },
  {
    path: "/faq",
    name: "Faq",
    component: function () {
      return import("../views/Faq.vue");
    },
    meta: {
      auth: false,
    },
  },
  {
    path: "/login-register",
    name: "LoginRegister",
    component: function () {
      return import("../views/LoginRegister.vue");
    },
    meta: {
      auth: false,
    },
    children: [
      {
        path: "login",
        name: "Login",
        component: function () {
          return import("../components/LoginRegister/Login.vue");
        },
      },
      {
        path: "register",
        name: "Register",
        component: function () {
          return import("../components/LoginRegister/Register.vue");
        },
      },
    ],
  },
  {
    path: "/create-event",
    name: "CreateEvent",
    component: function () {
      return import("../views/CreateEvent.vue");
    },
    meta: {
      auth: true,
    },
  },
  {
    path: "/refund-ticket",
    name: "RefundTicket",
    component: function () {
      return import("../views/RefundTicket.vue");
    },
    meta: {
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  useAuthStore().refreshUserData();
  if (to.name === "LoginRegister") next({ name: "Login" });
  if (to.name === "Account") next({ name: "Profile" });
  if (!to.meta.auth && to.name !== "Login" && to.name !== "Register") next();
  if ((to.name === "Login" || to.name === "Register") && useAuthStore().user)
    next({ name: "Account" });
  if (to.meta.auth && !useAuthStore().user) next({ name: "Login" });
  else next();
});

export default router;
