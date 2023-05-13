<template>
  <q-layout view="hHh lpR fFf">
    <q-header unelevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn icon="west" flat @click="goBackBtn" />
        <q-toolbar-title style="font-size: 20px; text-align: center"
          >Preview Card</q-toolbar-title
        >
        <div>
          <q-btn icon="delete" flat @click="deleteOptions = true" />
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
              "{{ this.card?.vocabulary }}" card will be deleted?
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
      <!-- CARD -->
      <q-card
        bordered
        style="
          width: 80%;
          min-height: 450px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 25px;
        "
      >
        <q-card-section horizontal style="display: flex; align-items: center">
          <q-btn
            flat
            round
            icon="volume_up"
            color="primary"
            size="15px"
            @click="audioClick"
          />
          <div
            style="color: #7286d3; margin-left: auto; margin-right: auto"
            class="text-h6"
          >
            {{ this.card?.vocabulary }}
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
        <div style="text-align: center; margin-top: -5px">
          {{ this.card?.pronunciation }}
        </div>
        <q-card-section style="font-size: 16px">
          <q-img
            v-if="this.card?.image !== ''"
            :src="this.card?.image"
            width="100%"
            height="200px"
            fit="contain"
          />
          <div style="width: 100%; word-wrap: break-word; margin-top: 20px">
            <p>{{ this.card?.meaning }}</p>
          </div>
          <div style="width: 100%; word-wrap: break-word">
            <p>Ex: {{ this.card?.example }}</p>
          </div>
        </q-card-section>
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
      deleteOptions: false,
      route: useRoute(),
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
  },
  methods: {
    audioClick() {
      console.log(this.eachCardOption);
      console.log("Click Audio");
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
      //this.eachCardOption = !this.eachCardOption;
      let data = LocalStorage.getItem("DECK");
      data[this.route.params.id].cards.splice(this.route.params.index, 1);
      LocalStorage.set("DECK", data);
      //this.CARD = data[this.route.params.id].cards;
      this.router.go(-1);
    },
  },
};
</script>
