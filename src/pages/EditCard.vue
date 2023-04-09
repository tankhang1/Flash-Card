<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn icon="west" flat to="/" />
        <q-toolbar-title style="font-size: 20px; text-align: center"
          >Edit</q-toolbar-title
        >
        <q-btn icon="check" flat to="/" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-tabs
        v-model="tab"
        class="text-teal"
        style="
          width: 80%;
          display: block;
          margin-left: auto;
          margin-right: auto;
        "
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
          <div style="font-size: 16px; color: black; font-weight: 700">
            Name
          </div>
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
        </q-tab-panel>

        <q-tab-panel name="Back" style="padding-bottom: 50px">
          <div style="font-size: 16px; color: black; font-weight: 700">
            Name
          </div>
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

          <!-- <div class="row justify-center fixed-bottom q-pa-md">
            <q-btn
              flat
              icon="camera_alt"
              color="primary"
              round
              @click="showDialogBack = true"
            />
          </div>
          <q-dialog v-model="showDialogBack" position="bottom">
            <q-card>
              <q-item v-close-popup clickable class="justify-center">
                <div class="text-subtitle3">
                  Use existing photo from your device
                </div>
              </q-item>
              <q-separator />
              <q-item
                v-close-popup
                clickable
                class="justify-center"
                inset-seperator
              >
                <div class="text-subtitle3">Take New Photo</div>
              </q-item>
              <q-separator />
              <q-item v-close-popup clickable class="justify-center">
                <div style="color: red" class="text-subtitle3">Cancel</div>
              </q-item>
            </q-card>
          </q-dialog> -->
        </q-tab-panel>
      </q-tab-panels>
      <div class="row justify-center fixed-bottom q-pa-md">
        <q-btn
          flat
          icon="camera_alt"
          color="primary"
          round
          @click="showDialogFont = true"
        />
      </div>
      <q-dialog v-model="showDialogFont" position="bottom">
        <q-card>
          <q-item v-close-popup clickable class="justify-center">
            <div class="text-subtitle3">
              Use existing photo from your device
            </div>
          </q-item>
          <q-separator />
          <q-item
            v-close-popup
            clickable
            class="justify-center"
            inset-seperator
          >
            <div class="text-subtitle3">Take New Photo</div>
          </q-item>
          <q-separator />
          <q-item v-close-popup clickable class="justify-center">
            <div style="color: red" class="text-subtitle3">Cancel</div>
          </q-item>
        </q-card>
      </q-dialog>
      <keep-alive> <router-view /> </keep-alive>
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref } from "vue";

export default {
  name: "EditCard",
  data() {
    return {
      showDialogFont: false,
      showDialogBack: false,
    };
  },
  setup() {
    return {
      tab: ref("Font"),
    };
  },
};
</script>
