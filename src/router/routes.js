const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/Preview",
        component: () => import("src/pages/PreviewCard.vue"),
        name: "PreviewCard",
      },
      {
        path: "/EditCard",
        component: () => import("src/pages/EditCard.vue"),
        name: "EditCard",
      },
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
      {
        path: "/LearningPage",
        component: () => import("src/pages/StarLearningPage.vue"),
        name: "LearningPage",
      },
      {
        path: "/ResultPage",
        component: () => import("src/pages/ResultPage.vue"),
        name: "ResultPage",
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
