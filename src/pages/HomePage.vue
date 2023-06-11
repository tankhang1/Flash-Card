<template>
  <q-page class="q-pa-md">
    <!-- <q-scroll-area class="absolute full-width full-height" visible="false"> -->
    <!-- Header -->
    <q-header class="bg-primary header">
      <q-toolbar>
        <q-btn flat round dense icon="none" class="q-mr-sm" />
        <q-toolbar-title class="title-header">Home</q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="settings"
          class="q-mr-sm"
          @click="onSetting"
        />
      </q-toolbar>
    </q-header>
    <!-- Body -->
    <q-list separator>
      <q-item
        clickable
        class="item-style shadow-4 q-pa-md q-my-md"
        v-for="(item, index) in DECK"
        :key="index"
        :to="{
          name: 'CardPage',
          params: {
            id: item.id,
          },
        }"
      >
        <q-item-section>
          <q-item-label class="text-weight-bold text-subtitle1">{{
            item.name
          }}</q-item-label>
          <q-item-label class="row justify-end q-mr-sm">
            {{ item.complete }}/{{ item.cards.length }}</q-item-label
          >
          <q-linear-progress
            :value="item.complete === 0 ? 0 : item.complete / item.cards.length"
            color="indigo-3 progress-bar"
            class="q-mt-sm"
            size="lg"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <!-- Button -->
    <q-btn
      color="#fff"
      label="New Deck"
      class="btn-add item-style q-pa-md text-subtitle1 text-weight-bold"
      text-color="primary"
      style="margin-top: 20px"
      no-caps
      icon="add_circle_outline"
      unelevated
      @click="card = true"
    />
    <!-- </q-scroll-area> -->
  </q-page>
  <!-- Modal -->
  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-card-section>
        <div class="col text-h6 ellipsis text-modal">New Deck</div>
        <div class="text-subtitle1 text-modal">Please name your new deck</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="txt_modal"
          :dense="dense"
          class="textinput-style"
        />
      </q-card-section>

      <q-separator spaced="0px" color="primary" />

      <q-card-actions class="q-pa-none btn-container">
        <q-btn
          flat
          color="red"
          label="Cancel"
          class="btn-modal-left"
          no-caps
          @click="onCancel"
          v-close-popup
        />
        <q-btn
          v-close-popup
          flat
          color="green"
          label="OK"
          class="btn-modal-right"
          @click="onAddDeck"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- SETTING -->
  <!-- FRONT -->
  <q-dialog v-model="openFront" transition-show="rotate" transition-hide="fade">
    <q-card class="my-card">
      <q-card-section>
        <div
          class="text-h6"
          style="
            color: #7286d3;
            font-size: 16px;
            font-weight: 600;
            text-align: center;
          "
        >
          SETTING FOR ALL DECKS<br />
          Which of the following do you want to show on the front of cards in
          all decks ?
        </div>
      </q-card-section>
      <q-card-actions vertical>
        <div
          v-for="(_, key) in DefaultFront"
          :key="key"
          style="margin-left: 10px"
        >
          <q-checkbox
            v-model="DefaultFront[key]"
            :label="key"
            style="font-size: 16px"
          />
        </div>
      </q-card-actions>
      <q-card-actions
        horizontal
        style="
          width: 100%;
          display: flex;
          justify-content: space-around;
          flex-direction: row;
          align-items: center;
        "
      >
        <q-btn
          flat
          label="Cancel"
          no-caps
          style="color: #eb3223; font-size: 16px; width: 48.5%"
          @click="onSetting"
        />
        <q-btn
          flat
          label="OK"
          no-caps
          style="color: #09a506; font-size: 16px; width: 48.5%"
          @click="onOKFront"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- BACK -->
  <q-dialog
    v-model="openBack"
    transition-show="slide-left"
    transition-hide="fade"
  >
    <q-card class="my-card">
      <q-card-section>
        <div
          class="text-h6"
          style="
            color: #7286d3;
            font-size: 16px;
            font-weight: 600;
            text-align: center;
          "
        >
          SETTING FOR ALL DECKS<br />
          Which of the following do you want to show on the back of cards in all
          decks ?
        </div>
      </q-card-section>
      <q-card-actions vertical>
        <div
          v-for="(_, key) in DefaultBack"
          :key="key"
          style="margin-left: 10px"
        >
          <q-checkbox
            v-model="DefaultBack[key]"
            :label="key"
            style="font-size: 16px"
          />
        </div>
      </q-card-actions>
      <q-card-actions
        horizontal
        style="
          width: 100%;
          display: flex;
          justify-content: space-around;
          flex-direction: row;
          align-items: center;
        "
      >
        <q-btn
          flat
          label="Cancel"
          no-caps
          style="color: #eb3223; font-size: 16px; width: 48.5%"
          @click="openBack = false"
        />
        <q-btn
          flat
          label="OK"
          no-caps
          style="color: #09a506; font-size: 16px; width: 48.5%"
          @click="onOKBack"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { LocalStorage, SessionStorage, useQuasar } from "quasar";
export default defineComponent({
  name: "HomePage",
  setup() {
    const $q = useQuasar();
    return {
      card: ref(false),
      //txt_modal: ref(""),
    };
  },
  data() {
    return {
      txt_modal: "",
      DECK: [],
      DefaultFront: {
        Vocabulary: ref(false),
        Pronunciation: ref(false),
        Audio: ref(false),
        Image: ref(false),
        Meaning: ref(false),
        Example: ref(false),
      },
      DefaultBack: {
        Vocabulary: ref(false),
        Pronunciation: ref(false),
        Audio: ref(false),
        Image: ref(false),
        Meaning: ref(false),
        Example: ref(false),
      },
      openFront: false,
      openBack: false,
    };
  },
  mounted() {
    let listDeck = LocalStorage.getAll();
    //console.log(listDeck);
    if (listDeck.DECK?.length !== 0) this.DECK = listDeck.DECK;
    let tmpFront = LocalStorage.getItem("DefaultFront");
    let tmpBack = LocalStorage.getItem("DefaultBack");
    if (tmpFront) this.DefaultFront = { ...tmpFront };
    if (tmpBack) this.DefaultBack = { ...tmpBack };
  },
  updated() {
    let listDeck = LocalStorage.getAll();
    if (listDeck.DECK?.length !== 0) this.DECK = listDeck.DECK;
  },
  methods: {
    onSetting() {
      //console.log("setting");
      this.openFront = !this.openFront;
    },
    onOKFront() {
      this.openFront = false;
      this.openBack = true;
      LocalStorage.set("DefaultFront", this.DefaultFront);
    },
    onOKBack() {
      this.openBack = false;
      LocalStorage.set("DefaultBack", this.DefaultBack);
    },
    onCancel() {
      this.txt_modal = "";
      this.card = !this.card;
    },
    onAddDeck() {
      if (this.txt_modal !== "") {
        const newCard = {
          id: Math.floor(Math.random() * 100000000),
          name: this.txt_modal,
          complete: 0,
          cards: [],
        };
        let preDeck = LocalStorage.has("DECK");

        if (preDeck === false) {
          LocalStorage.set("DECK", [newCard]);
        } else {
          let data = LocalStorage.getItem("DECK");
          console.log(data);
          LocalStorage.set("DECK", [...data, newCard]);
        }
        //this.DECK.push(newCard);
        this.txt_modal = "";
      }
    },
  },
});
</script>
