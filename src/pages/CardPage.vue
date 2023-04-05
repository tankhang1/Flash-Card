<template>
  <q-page class="q-pa-sm">
    <q-header class="bg-indigo-5 header">
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
                @click="onRenameDeck"
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
        text-color="indigo-5"
        no-caps
        icon="add_circle_outline"
        @click="openModal = !openModal"
      />
      <q-btn
        color="indigo-5"
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
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardPage",
  props: {
    id: Object,
  },
  computed: {
    card() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      openModal: false,
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
