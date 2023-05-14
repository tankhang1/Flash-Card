<template>
  <q-page class="q-pa-md">
    <!-- <q-scroll-area class="absolute full-width full-height" visible="false"> -->
    <!-- Header -->
    <q-header class="bg-primary header">
      <q-toolbar>
        <q-toolbar-title class="title-header">Home</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <!-- Body -->
    <q-list separator>
      <q-item
        clickable
        class="item-style shadow-4 q-pa-md q-my-md"
        v-for="(item, index) in DECK"
        :key="index"
        :to="{ name: 'CardPage', params: { id: item.id } }"
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
    };
  },
  mounted() {
    let listDeck = LocalStorage.getAll();
    //console.log(listDeck);
    if (listDeck.DECK?.length !== 0) this.DECK = listDeck.DECK;
  },
  updated() {
    let listDeck = LocalStorage.getAll();
    if (listDeck.DECK?.length !== 0) this.DECK = listDeck.DECK;
  },
  methods: {
    navigateToCard(item, index) {
      console.log(index);
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
        console.log(LocalStorage.getAll());
      }
    },
  },
});
</script>
