<template>
  <q-layout view="hHh lpR fFf" style="background-color: #7286d3">
    <div style="padding-top: 20px">
      <q-btn
        flat
        color="white"
        icon="west"
        style="position: absolute"
        @click="showExit = !showExit"
      />
      <h
        style="
          font-size: 20px;
          color: white;
          font-weight: bold;
          display: flex;
          justify-content: center;
        "
        >15/80</h
      >
    </div>
    <q-dialog
      v-model="showExit"
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
          <p style="color: #7286d3; text-align: center; font-size: 16px">
            Are you sure to exit learning card? Your progress won’t be saved!
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
    <q-card
      bordered
      style="
        width: 80%;
        min-height: 500px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 25px;
      "
    >
      <q-card-section horizontal style="display: flexbox; align-items: center">
        <div
          style="
            color: #7286d3;
            margin-left: auto;
            margin-right: auto;
            margin-top: 10px;
          "
          class="text-h6"
        >
          My Cat
        </div>
        <q-btn
          flat
          round
          style="
            color: #fdda0d;
            position: absolute;
            right: 10px;
            margin-top: 10px;
          "
          icon="star"
          size="large"
        />
      </q-card-section>
      <q-separator
        dark
        style="
          margin-bottom: 10px;
          margin-top: 10px;
          background-color: hsl(0, 0%, 90%);
        "
      />
      <div @click="showCard = !showCard">
        <q-card-section style="font-size: 16px" v-if="!showCard">
          <q-img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
            width="100%"
            height="50%"
          />
          <p style="margin-top: 10px">This is my cat. In my house</p>
        </q-card-section>
        <q-card-section style="font-size: 16px" v-else>
          <q-img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
            width="100%"
            height="50%"
          />
          This is my cat. In my house back
        </q-card-section>
        <div
          style="
            position: absolute;
            bottom: 10px;
            justify-content: center;
            display: flex;
            width: 100%;
            color: #a3a3a3;
          "
        >
          Tap to flip it
        </div>
      </div>
    </q-card>
    <div
      style="
        justify-content: center;
        display: flex;
        margin-top: 20px;
        width: 80%;
        flex-direction: row;
        justify-content: space-between;
        margin-left: auto;
        margin-right: auto;
      "
    >
      <q-btn
        label="Save"
        no-caps
        style="
          background-color: #f78c4f;
          color: white;
          width: 45%;
          font-size: 16px;
        "
      />
      <q-btn
        to="/ResultPage"
        label="Finish"
        no-caps
        style="
          background-color: #0ebb0b;
          color: white;
          width: 45%;
          font-size: 16px;
        "
      />
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LearningPage",
  data() {
    return {
      showCard: false,
      showExit: false,
    };
  },
});
</script>
