<template>
  <q-page class="q-pa-md">
    <!-- <q-scroll-area class="absolute full-width full-height" visible="false"> -->
    <!-- Header -->
    <q-header class="bg-indigo-5 header">
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
        :to="{ name: 'CardPage', params: { id: item.name } }"
      >
        <q-item-section>
          <q-item-label class="text-weight-bold text-subtitle1">{{
            item.name
          }}</q-item-label>
          <q-item-label class="row justify-end q-mr-sm">
            {{ item.complete }}/{{ item.target }}</q-item-label
          >
          <q-linear-progress
            :value="item.target === 0 ? 0 : item.complete / item.target"
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
      text-color="indigo-5"
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
export default defineComponent({
  name: "HomePage",
  setup() {
    return {
      card: ref(false),
      //txt_modal: ref(""),
    };
  },
  data() {
    return {
      txt_modal: "",
      DECK: [
        {
          id: 1,
          name: "Welcome to family!",
          target: 80,
          complete: 80,
          cardCollection: [
            {
              cardName: "Father",
              isStar: false,
              isChecked: true,
            },
          ],
        },
        {
          id: 2,
          name: "Physics",
          target: 50,
          complete: 20,
        },
        {
          id: 3,
          name: "English",
          target: 102,
          complete: 0,
        },
      ],
    };
  },
  methods: {
    navigateToCard(item, index) {
      console.log(index);
    },
    onCancel() {
      this.txt_modal = "";
      //this.card = false;
    },
    onAddDeck() {
      if (this.txt_modal !== "") {
        const newCard = {
          id: 1,
          name: this.txt_modal,
          target: 0,
          complete: 0,
        };
        this.DECK.push(newCard);
        this.txt_modal = "";
      }
    },
  },
});
</script>
