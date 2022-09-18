const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/PageHome.vue"),
        name: "Home",
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/about",
        component: () => import("src/pages/PageAbout.vue"),
        name: "About",
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/login",
        component: () => import("src/pages/PageLogin.vue"),
        name: "Login",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
