const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/Modal",
        component: () => import("src/pages/ModalPage.vue"),
      },
      {
        path: "/Preview",
        component: () => import("src/pages/PreviewCard.vue"),
        name: "PreviewCard",
      },
      {
        path: "/Edit",
        component: () => import("src/pages/EditCard.vue"),
        name: "EditCard",
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
