<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn icon="west" flat to="/" />
        <q-toolbar-title style="font-size: 20px">Edit</q-toolbar-title>
        <q-btn icon="check" flat to="/" />
      </q-toolbar>
    </q-header>
    <q-tabs
      v-model="tab"
      class="text-teal"
      style="width: 80%; display: block; margin-left: auto; margin-right: auto"
    >
      <q-tab
        name="Font"
        label="Font"
        style="color: #7286d3; font-size: 20px"
        no-caps
      />
      <q-tab
        name="Back"
        label="Back"
        style="color: #7286d3; font-size: 20px"
        no-caps
      />
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      swipeable
      vertical
      transition-prev="slide-left"
      transition-next="slide-right"
    >
      <q-tab-panel name="Font" style="padding-bottom: 50px">
        <div style="font-size: 16px; color: black; font-weight: 700">Name</div>
        <q-input
          placeholder="Input name"
          borderless
          style="font-size: 16px; color: black"
        />
        <div style="font-size: 16px; color: black; font-weight: 700">
          Description
        </div>
        <q-input
          placeholder="Input description"
          borderless
          type="textarea"
          style="font-size: 16px; color: black"
        />
        <!-- <q-uploader
          style="max-width: 300px"
          url="http://localhost:4444/upload"
          label="Restricted to images"
          multiple
          accept=".jpg, image/*"
          @rejected="onRejected"
        /> -->
        <div style="width: 100%; display: flex; justify-content: center">
          <q-btn flat round color="primary" icon="photo_camera" size="large" />
        </div>
      </q-tab-panel>

      <q-tab-panel name="Back" style="padding-bottom: 50px">
        <div style="font-size: 16px; color: black; font-weight: 700">Name</div>
        <q-input
          placeholder="Input name"
          borderless
          style="font-size: 16px; color: black"
        />
        <div style="font-size: 16px; color: black; font-weight: 700">
          Description
        </div>
        <q-input
          placeholder="Input description"
          borderless
          type="textarea"
          style="font-size: 16px; color: black"
        />
        <!-- <q-uploader
          style="max-width: 300px"
          url="http://localhost:4444/upload"
          label="Restricted to images"
          multiple
          accept=".jpg, image/*"
          @rejected="onRejected"
        /> -->
        <div style="width: 100%; display: flex; justify-content: center">
          <q-btn flat round color="primary" icon="photo_camera" size="large" />
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref } from "vue";

export default {
  name: "EditCard",
  setup() {
    return {
      tab: ref("mails"),
    };
  },
};
</script>
