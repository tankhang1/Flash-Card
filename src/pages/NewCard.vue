<template>
  <q-page class="q-pa-sm">
    <q-header class="bg-primary header">
      <q-toolbar>
        <q-btn dense flat round icon="arrow_back" @click="$router.go(-1)" />
        <q-toolbar-title class="title-header">Home</q-toolbar-title>
        <q-btn flat round dense icon="done" @click="addNewCard" />
      </q-toolbar>
    </q-header>
    <q-tabs v-model="activePage" align="left" class="text-primary">
      <q-tab name="front" label="Front" />
      <q-tab name="back" label="Back" />
    </q-tabs>
    <q-page-container style="padding-top: 0">
      <q-page class="q-pa-sm">
        <div v-if="activePage === 'front'">
          <div class="text-subtitle1 mt-sm">Front Name</div>
          <q-input
            v-model="frontName"
            outlined
            dense
            placeholder="Enter front name"
            class="q-mt-md"
          />
          <div class="text-subtitle1 mt-sm">Front Description</div>
          <q-input
            v-model="frontDescription"
            outlined
            dense
            placeholder="Enter front description"
            class="q-mt-md"
          />
        </div>
        <div v-else>
          <div class="text-subtitle1 mt-sm">Back Name</div>
          <q-input
            v-model="backName"
            outlined
            dense
            placeholder="Enter back name"
            class="q-mt-md"
          />
          <div class="text-subtitle1 mt-sm">Back Description</div>
          <q-input
            v-model="backDescription"
            outlined
            dense
            placeholder="Enter back description"
            class="q-mt-md"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-page>
  <div class="row justify-center fixed-bottom q-pa-md">
    <q-btn
      flat
      icon="camera_alt"
      color="primary"
      round
      @click="showDialog = true"
    />
  </div>
  <q-dialog v-model="showDialog" position="bottom">
    <q-card>
      <q-item v-close-popup clickable class="justify-center">
        <div class="text-subtitle3">Use existing photo from your device</div>
      </q-item>
      <q-separator />
      <q-item
        v-close-popup
        clickable
        class="justify-center"
        inset-seperator
        @click="takePhoto"
      >
        <div class="text-subtitle3">Take New Photo</div>
      </q-item>
      <q-separator />
      <q-item v-close-popup clickable class="justify-center">
        <div style="color: red" class="text-subtitle3">Cancel</div>
      </q-item>
    </q-card>
  </q-dialog>
  <q-page-container>
    <router-view />
  </q-page-container>
</template>
<script>
import { LocalStorage } from "quasar";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "NewCard",
  props: {
    id: Object,
  },
  data() {
    return {
      activePage: "front",
      frontName: "",
      route: useRoute(),
      router: useRouter(),
      frontDescription: "",
      backName: "",
      backDescription: "",
      showDialog: false,
    };
  },
  mounted() {
    console.log(this.route.params.id);
  },
  methods: {
    addNewCard() {
      console.log(this.route);
      const data = [...LocalStorage.getItem("DECK")];
      const index = data.findIndex(
        (value) => value.id === this.route.params.id
      );
      console.log(data, this.route.params);
      const card = {
        cardName: data.name,
        isStar: false,
        isChecked: false,
        font: {
          name: "Tan Khang",
          description: "BB",
        },
      };
    },
    takePhoto() {
      this.router.push("/CameraPage");
    },
  },
};
</script>
<style>
.text-subtitle1 {
  margin-top: 10px;
}
.text-subtitle3 {
  margin-top: auto;
  margin-bottom: auto;
}
.q-mt-md {
  margin-top: 5px;
}
.separator {
  margin: 5;
  height: 0px;
}
</style>
