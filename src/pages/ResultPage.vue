<template>
  <q-layout view="hHh lpR fFf">
    <div style="display: flex; justify-content: center; margin-top: 40px">
      <h style="color: #7286d3; font-size: 36px; font-weight: bold">RESULT</h>
    </div>
    <div style="width: 100%; display: flex; justify-content: center">
      <h style="color: #7286d3; font-size: 20px; text-align: center"
        >Congratulations! You have done your cards.</h
      >
    </div>
    <div style="display: flex; justify-content: center; margin-top: 25px">
      <q-knob
        :min="0"
        :max="100"
        v-model="result"
        show-value
        size="200px"
        :thickness="0.1"
        color="indigo-6"
        track-color="grey-3"
        class="q-ma-md"
        readonly
      >
        <div style="color: #7286d3">
          {{ result }}%
          <p style="font-size: 16px; text-align: center; color: #09a506">
            64/80
          </p>
        </div>
      </q-knob>
    </div>

    <q-btn
      label="Restart Undone Cards"
      style="
        background-color: #7286d3;
        color: white;
        width: 80%;
        margin-top: 20px;
        margin-left: auto;
        height: 50px;
        margin-right: auto;
        display: flex;
      "
      no-caps
    />
    <q-btn
      label="Restart All Cards"
      style="
        background-color: #7286d3;
        color: white;
        width: 80%;
        margin-top: 20px;
        margin-left: auto;
        height: 50px;
        margin-right: auto;
        display: flex;
      "
      no-caps
    />
    <q-btn
      label="Return to Deck"
      style="
        background-color: #7286d3;
        color: #7286d3;
        width: 80%;
        margin-top: 20px;
        height: 50px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
      "
      to="/"
      outline
      no-caps
    />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ResultPage",
  data() {
    return {
      result: 58,
    };
  },
});
</script>
