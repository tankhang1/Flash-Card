const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/PageIndex", component: () => import("pages/IndexPage.vue") },
      {
        path: "",
        component: () => import("src/pages/HomePage.vue"),
        name: "HomePage",
      },
      {
        path: "/CardPage:id",
        component: () => import("src/pages/CardPage.vue"),
        name: "CardPage",
        props: true,
      },
      {
        path: "/NewCard",
        component: () => import("src/pages/NewCard.vue"),
        name: "NewCard",
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
