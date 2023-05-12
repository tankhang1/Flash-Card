<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn icon="west" flat @click="goBackBtn" />
        <q-toolbar-title style="font-size: 20px; text-align: center"
          >Preview Card</q-toolbar-title
        >
        <div>
          <q-btn
            icon="delete"
            flat
            @click="deleteCard((item = 'My Cat'), (index = 2))"
          />
          <q-btn
            icon="edit"
            flat
            :to="{
              name: 'EditCard',
              params: {
                id: this.route.params.id,
                index: this.route.params.index,
              },
            }"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <q-dialog
        v-model="deleteOptions"
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
            <p style="color: #7286d3; font-size: 14px; text-align: center">
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
              @click="deleteOptions = false"
            />
            <q-separator vertical color="indigo-11" />
            <q-btn
              flat
              label="OK"
              no-caps
              style="color: #09a506; font-size: 16px; width: 48.5%"
              @click="confirmDelete"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-card
        bordered
        style="
          width: 80%;
          min-height: 400px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 25px;
        "
      >
        <q-card-section
          horizontal
          style="display: flexbox; align-items: center"
        >
          <div
            style="color: #7286d3; margin-left: auto; margin-right: auto"
            class="text-h6"
          >
            {{ this.card?.font?.name }}
          </div>
          <q-btn
            flat
            round
            icon="star"
            :color="checkCard ? 'yellow' : 'grey'"
            size="15px"
            @click="starClick"
          />
        </q-card-section>

        <q-separator dark inset />
        <div @click="showCard = !showCard">
          <q-card-section style="font-size: 16px" v-if="!showCard">
            <q-img
              v-if="this.card?.font?.image !== ''"
              :src="this.card?.font?.image"
              width="100%"
              height="200px"
              fit="cover"
            />
            <div style="width: 100%; word-wrap: break-word">
              <p>{{ this.card?.font?.description }}</p>
            </div>
          </q-card-section>
          <q-card-section style="font-size: 16px" v-else>
            <q-img
              v-if="this.card?.font?.image !== ''"
              :src="this.card?.back?.image"
              width="100%"
              height="200px"
              fit="cover"
            />
            <div style="width: 100%; word-wrap: break-word">
              <p>{{ this.card?.back?.description }}</p>
            </div>
          </q-card-section>
          <div
            style="
              position: absolute;
              bottom: 10px;
              justify-content: center;
              display: flex;
              width: 100%;
              color: #a3a3a3;
              margin-top: 20px;
            "
          >
            Tap to flip it!
          </div>
        </div>
      </q-card>
    </q-page-container>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style src="@quasar/quasar-ui-qflashcard/dist/index.css"></style>
<script>
import { LocalStorage } from "quasar";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "PreviewCard",

  data() {
    return {
      showCard: false,
      deleteOptions: false,
      txtCard: "",
      route: useRoute(),
      indexCard: null,
      indexDeck: null,
      card: {},
      checkCard: false,
      router: useRouter(),
    };
  },
  mounted() {
    let cardTMP = [...LocalStorage.getItem("DECK")];
    this.card = cardTMP[this.route.params.id].cards[this.route.params.index];
    this.checkCard =
      cardTMP[this.route.params.id].cards[this.route.params.index].isStar;
    console.log(this.card.font);
  },
  methods: {
    deleteCard(item, index) {
      this.deleteOptions = true;
      console.log(item, index);
      this.txtCard = item;
    },
    starClick() {
      this.checkCard = !this.checkCard;
      let cardTMP = [...LocalStorage.getItem("DECK")];
      cardTMP[this.route.params.id].cards[this.route.params.index].isStar =
        this.checkCard;
      LocalStorage.set("DECK", cardTMP);
    },
    goBackBtn() {
      this.router.go(-1);
    },
    confirmDelete() {
      this.eachCardOption = !this.eachCardOption;
      let data = LocalStorage.getItem("DECK");
      data[this.route.params.id].cards.splice(this.route.params.index, 1);
      LocalStorage.set("DECK", data);
      this.CARD = data[this.route.params.id].cards;
      this.router.go(-1);
    },
  },
};
</script>
