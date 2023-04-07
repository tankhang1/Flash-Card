<template>
  <q-page class="q-pa-sm">
    <q-header class="bg-primary header">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          class="q-mr-sm"
          :to="{ name: 'HomePage' }"
        />
        <q-toolbar-title class="title-header">English</q-toolbar-title>
        <!-- btn right -->
        <q-btn flat round dense icon="more_vert">
          <q-menu max-width="250px">
            <q-list dense style="min-width: 220px">
              <q-item
                clickable
                v-close-popup
                class="q-my-xs"
                @click="showNameDialog = true"
              >
                <q-item-section class="text-subtitle1"
                  >Rename Deck</q-item-section
                >
              </q-item>

              <q-separator color="grey-5" />
              <q-item
                clickable
                v-close-popup
                class="q-my-xs"
                @click="onResetDeck"
              >
                <q-item-section class="text-subtitle1"
                  >Reset Learning Process</q-item-section
                >
              </q-item>
              <q-separator color="grey-5" />
              <q-item
                clickable
                v-close-popup
                class="q-my-xs"
                @click="onDeleteDeck"
              >
                <q-item-section class="text-subtitle1 menu-text"
                  >Delete Deck</q-item-section
                >
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <!-- <q-btn flat round dense icon="more_vert" @click="onOpenModal" /> -->
      </q-toolbar>
    </q-header>

    <!-- Body -->
    <div class="row card-container">
      <q-intersection
        v-for="(item, index) in CARD"
        :key="index"
        class="card-style"
        clickable
        @click="onClick"
      >
        <q-card bordered class="q-mx-xs q-my-md shadow-4 card-border">
          <q-card-section>
            <div class="text-subtitle2">{{ item.cardName }}</div>
            <div class="icon-style">
              <q-icon
                :name="item.isChecked ? 'fa-solid fa-circle-check' : none"
                color="green"
                size="32px"
              />
            </div>
          </q-card-section>
          <div class="star-style">
            <q-icon
              :name="item.isStar ? 'star' : none"
              color="yellow"
              size="32px"
            />
          </div>
        </q-card>
      </q-intersection>
    </div>
    <!-- ButtonFooter -->
    <div class="btn-footer-container">
      <q-btn
        color="#fff"
        label="New Card"
        class="btn-new-card text-subtitle1"
        unelevated
        text-color="primary"
        no-caps
        icon="add_circle_outline"
        :to="{ name: 'NewCard' }"
        @click="openModal = !openModal"
      />
      <q-btn
        color="primary"
        text-color="white"
        label="Start Learning"
        class="btn-start-learning text-subtitle1"
        unelevated
        no-caps
        @click="onStartLearning"
      />
    </div>
    <!-- Draft -->
    <!-- <div class="text-body1">
      <p>
        {{ card }}
      </p>
      <q-btn color="primary" label="Primary" @click="onOpenModal" />
    </div> -->
  </q-page>
  <q-dialog v-model="showNameDialog">
    <q-card class="my-card">
      <q-card-section>
        <div class="col text-h6 ellipsis text-modal">Rename Deck</div>
        <div class="text-subtitle1 text-modal">
          Please enter your deck's name
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="newDeckName"
          :dense="dense"
          class="textinput-style"
        />
      </q-card-section>

      <q-separator spaced="0px" color="primary" />

      <q-card-actions class="q-pa-none btn-container">
        <q-btn
          flat
          color="negative"
          label="Cancel"
          class="btn-modal-left"
          no-caps
          @click="onCancel"
          v-close-popup
        />
        <q-btn
          v-close-popup
          flat
          color="positive"
          label="OK"
          class="btn-modal-right"
          :disable="saveDisabled"
          @click="onAddDeck"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardPage",
  props: {
    id: Object,
  },
  computed: {
    saveDisabled() {
      return !this.newDeckName;
    },
    card() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      openModal: false,
      showNameDialog: false,
      newDeckName: "",
      CARD: [
        {
          cardName: "Father",
          isStar: false,
          isChecked: true,
        },
        {
          cardName: "Father",
          isStar: false,
          isChecked: true,
        },
        {
          cardName: "Father",
          isStar: true,
          isChecked: true,
        },
        {
          cardName: "Father",
          isStar: false,
          isChecked: true,
        },
        {
          cardName: "Father",
          isStar: true,
          isChecked: true,
        },
        {
          cardName: "Father",
          isStar: false,
          isChecked: false,
        },
      ],
    };
  },
  methods: {
    onOpenModal() {
      console.log(this.$route.params.id);
    },
    onRenameDeck() {
      console.log("onRenameDeck");
      this.showNameDialog = false;
    },
    onResetDeck() {
      console.log("onResetDeck");
    },
    onDeleteDeck() {
      console.log("onDeleteDeck");
    },
    onClick() {
      console.log("onClick");
    },
    onStartLearning() {
      console.log("onStartLearning");
    },
  },
});
</script>
