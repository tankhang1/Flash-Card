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
        :max="50"
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
          {{ Math.floor((this.currentCard / this.numberCard) * 100) }}%
          <p style="font-size: 16px; text-align: center; color: #09a506">
            {{ this.currentCard }}/{{ this.numberCard }}
          </p>
        </div>
      </q-knob>
    </div>

    <q-btn
      @click="reStartNeedPractice"
      label="Restart cards that need practice"
      :disable="practiceDisabled()"
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
      label="Restart Not Done Cards"
      :disable="disableUnDone()"
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
      @click="reStartUndoneCard"
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
import { LocalStorage } from "quasar";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ResultPage",
  data() {
    return {
      result: 58,
      currentCard: 0,
      numberCard: 1,
      indexDeck: 0,
      route: useRoute(),
      router: useRouter(),
    };
  },
  mounted() {
    this.indexDeck = this.route.params.indexDeck;
    let data = LocalStorage.getItem("DECK");
    this.currentCard = data[this.indexDeck].complete;
    this.numberCard = data[this.indexDeck].cards.length;
  },
  methods: {
    reStartAllCard() {
      this.router.push({
        name: "LearningPage",
        params: {
          index: this.indexDeck,
          type: "All",
          numberOption: 0,
          DataFront: this.route.params.DataFront,
          DataBack: this.route.params.DataBack,
        },
      });
    },
    reStartNeedPractice() {
      //console.log(JSON.parse(this.route.params.needPractice).length);
      if (JSON.parse(this.route.params.needPractice).length !== 0) {
        this.router.push({
          name: "LearningPage",
          params: {
            index: this.indexDeck,
            type: "Need Practice",
            numberOption: 0,
            DataFront: this.route.params.DataFront,
            DataBack: this.route.params.DataBack,
            needPractice: this.route.params.needPractice,
          },
        });
      }
    },
    disableUnDone() {
      return this.currentCard === this.numberCard;
    },
    practiceDisabled() {
      return this.route.params.needPractice === "[]";
    },
    reStartUndoneCard() {
      if (this.currentCard !== this.numberCard) {
        this.router.push({
          name: "LearningPage",
          params: {
            index: this.indexDeck,
            type: "Not Learnt",
            numberOption: 0,
            DataFront: this.route.params.DataFront,
            DataBack: this.route.params.DataBack,
            needPractice: this.route.params.needPractice,
          },
        });
      }
    },
  },
});
</script>
