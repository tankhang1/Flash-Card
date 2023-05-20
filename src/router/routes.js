const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/Preview:id:index",
        component: () => import("src/pages/PreviewCard.vue"),
        name: "PreviewCard",
      },
      {
        path: "/EditCard:id:index",
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
        path: "/NewCard:id",
        component: () => import("src/pages/NewCard.vue"),
        name: "NewCard",
      },
      {
        path: "/LearningPage:index:type:numberOption:DataFront:DataBack:needPractice",
        component: () => import("src/pages/StarLearningPage.vue"),
        name: "LearningPage",
      },
      {
        path: "/ResultPage:indexDeck:DataFront:DataBack:needPractice",
        component: () => import("src/pages/ResultPage.vue"),
        name: "ResultPage",
      },
      {
        path: "/CameraPage",
        component: () => import("src/pages/CameraPage.vue"),
        name: "CameraPage",
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
