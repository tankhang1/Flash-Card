<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
      <q-btn
        label="Deck_StartLearning_1"
        color="primary"
        @click="carousel = true"
      />
      <q-btn
        label="Deck_StartLearning_2"
        color="primary"
        @click="startLearning_2 = true"
      />
      <q-btn label="Option" color="primary" @click="openOption = true" />
      <q-btn label="Are you sure" color="primary" @click="areSure = true" />

      <!-- dialog 4 button how do you want to learn -->
      <q-dialog
        v-model="carousel"
        transition-show="rotate"
        transition-hide="rotate"
      >
        <q-card class="my-card">
          <q-card-section>
            <div
              class="text-h6"
              style="color: #7286d3; font-size: 16px; font-weight: 600"
            >
              How do you want to learn?
            </div>
          </q-card-section>

          <q-card-actions vertical>
            <q-btn flat no-caps style="font-size: 16px">Front to Back</q-btn>
            <q-separator />
            <q-btn flat no-caps style="font-size: 16px">Back to Front</q-btn>
            <q-separator />
            <q-btn flat no-caps style="font-size: 16px">Random</q-btn>
            <q-separator />
            <q-btn flat style="color: #eb3223; font-size: 16px" no-caps
              >Cancel</q-btn
            >
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- dialog 7 button how do you want to learn -->

      <q-dialog
        v-model="startLearning_2"
        transition-show="rotate"
        transition-hide="rotate"
      >
        <q-card class="my-card">
          <q-card-section>
            <div
              class="text-h6"
              style="color: #7286d3; font-size: 16px; font-weight: 600"
            >
              How do you want to learn?
            </div>
          </q-card-section>

          <q-card-actions vertical>
            <q-btn flat no-caps style="font-size: 16px">All cards</q-btn>
            <q-separator />
            <q-btn flat no-caps style="font-size: 16px">Not learnt cards</q-btn>
            <q-separator />
            <q-btn flat no-caps style="font-size: 16px">Favorite cards</q-btn>
            <q-separator />
            <q-btn flat no-caps style="font-size: 16px">Random 5 cards</q-btn>
            <q-separator />
            <q-btn flat no-caps style="font-size: 16px">Random 10 cards</q-btn>
            <q-separator />
            <q-btn flat no-caps style="font-size: 16px">Option</q-btn>
            <q-separator />
            <q-btn flat style="color: #eb3223; font-size: 16px" no-caps
              >Cancel</q-btn
            >
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- dialog option -->
      <q-dialog
        v-model="openOption"
        transition-show="rotate"
        transition-hide="rotate"
      >
        <q-card class="my-card">
          <q-card-section>
            <div
              class="text-h6"
              style="
                color: #7286d3;
                font-size: 20px;
                font-weight: 600;
                text-align: center;
              "
            >
              Option
            </div>
            <p style="color: #7286d3; font-size: 14px">
              Please enter number of cards you want to learn
            </p>
          </q-card-section>

          <q-card-actions
            style="display: flex; justify-content: center; align-items: center"
          >
            <q-input
              outlined
              v-model="text"
              :dense="dense"
              autofocus
              style="text-align: center; font-size: 16px"
              type="number"
            />
          </q-card-actions>
          <q-card-actions
            horizontal
            style="
              width: 100%;
              display: flex;
              justify-content: space-around;
              flex-direction: row;
              align-items: center;
              margin-left: auto;
              margin-right: auto;
              border-top: 1px solid #7286d3;
            "
          >
            <q-btn
              flat
              label="Cancel"
              no-caps
              style="color: #eb3223; font-size: 16px; width: 48.5%"
            />
            <q-separator vertical color="indigo-11" />
            <q-btn
              flat
              label="OK"
              no-caps
              style="color: #09a506; font-size: 16px; width: 48.5%"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- diaglog are you sure -->
      <q-dialog
        v-model="areSure"
        transition-show="rotate"
        transition-hide="rotate"
      >
        <q-card class="my-card">
          <q-card-section>
            <div
              class="text-h6"
              style="
                color: #7286d3;
                font-size: 20px;
                font-weight: 600;
                text-align: center;
              "
            >
              Are you sure?
            </div>
            <p style="color: #7286d3; font-size: 14px">
              {{ txtCard }} card will be deleted?
            </p>
          </q-card-section>
          <q-card-actions
            horizontal
            style="
              width: 100%;
              display: flex;
              justify-content: space-around;
              flex-direction: row;
              align-items: center;
              margin-left: auto;
              margin-right: auto;
              border-top: 1px solid #7286d3;
            "
          >
            <q-btn
              flat
              label="Cancel"
              no-caps
              style="color: #eb3223; font-size: 16px; width: 48.5%"
            />
            <q-separator vertical color="indigo-11" />
            <q-btn
              flat
              label="OK"
              no-caps
              style="color: #09a506; font-size: 16px; width: 48.5%"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ModalPage",

  setup() {
    const leftDrawerOpen = ref(false);
    const txtCard = "My Card";
    return {
      carousel: ref(false),
      startLearning_2: ref(false),
      openOption: ref(false),
      txtCard,
      card: ref(false),
      sliders: ref(false),
      areSure: ref(false),
      slide: ref(1),
      lorem:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!",

      stars: ref(3),

      slideVol: ref(39),
      slideAlarm: ref(56),
      slideVibration: ref(63),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
