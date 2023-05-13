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
        <q-toolbar-title class="title-header">{{ txtCard }}</q-toolbar-title>
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
                @click="checkDelete = true"
              >
                <q-item-section class="text-subtitle1" style="color: #eb3223"
                  >Delete Deck</q-item-section
                >
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <!-- FLOATING BUTTON -->
    <q-page-sticky position="bottom-right" :offset="[18, 50]">
      <q-btn fab icon="add" color="primary" @click="newCard" />
    </q-page-sticky>
    <!-- START LEARNING BUTTON -->
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <q-btn
        hide-icon
        color="primary"
        @click="onStartLearning"
        style="
          padding: 10px 30px 10px 30px;
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.8px;
          border-radius: 10px;
        "
        no-caps
        unelevated
        >Start Learning</q-btn
      >
    </q-page-sticky>
    <!-- DIALOG 7 OPTIONS -->
    <q-dialog
      v-model="openLearning_7"
      transition-show="rotate"
      transition-hide="rotate"
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
            How do you want to learn?
          </div>
        </q-card-section>

        <q-card-actions vertical>
          <q-btn flat no-caps style="font-size: 16px" @click="allCard"
            >All cards</q-btn
          >
          <q-separator />
          <q-btn flat no-caps style="font-size: 16px" @click="onNotLearn"
            >Not learnt cards</q-btn
          >
          <q-separator />
          <q-btn flat no-caps style="font-size: 16px" @click="onFavorite"
            >Favorite cards</q-btn
          >
          <q-separator />
          <q-btn flat no-caps style="font-size: 16px" @click="onRandom_5"
            >Random 5 cards</q-btn
          >
          <q-separator />
          <q-btn flat no-caps style="font-size: 16px" @click="onRandom_10"
            >Random 10 cards</q-btn
          >
          <q-separator />
          <q-btn flat no-caps style="font-size: 16px" @click="onOption"
            >Option</q-btn
          >
          <q-separator />
          <q-btn
            flat
            style="color: #eb3223; font-size: 16px"
            no-caps
            @click="openLearning_7 = !openLearning_7"
            >Cancel</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- DIALOG 4 OPTIONS -->
    <q-dialog
      v-model="openLearning_4"
      transition-show="rotate"
      transition-hide="rotate"
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
            How do you want to learn?
          </div>
        </q-card-section>

        <q-card-actions vertical>
          <q-btn flat no-caps style="font-size: 16px" @click="frontToBack"
            >Front to Back</q-btn
          >
          <q-separator />
          <q-btn flat no-caps style="font-size: 16px" @click="backToFront"
            >Back to Front</q-btn
          >
          <q-separator />
          <q-btn flat no-caps style="font-size: 16px" @click="onRandom"
            >Random</q-btn
          >
          <q-separator />
          <q-btn
            flat
            style="color: #eb3223; font-size: 16px"
            no-caps
            @click="openLearning_4 = !openLearning_4"
            >Cancel</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Dialog options -->
    <q-dialog
      v-model="openOption"
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
            Option
          </div>
          <p style="color: #7286d3; font-size: 16px; text-align: center">
            Please enter number of cards you want to learn
          </p>
        </q-card-section>

        <q-card-actions
          style="display: flex; justify-content: center; align-items: center"
        >
          <q-input
            outlined
            v-model="numberOption"
            :dense="dense"
            autofocus
            style="text-align: center; font-size: 16px"
            type="number"
          />
        </q-card-actions>
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
            @click="openOption = !openOption"
            flat
            label="Cancel"
            no-caps
            style="color: #eb3223; font-size: 16px; width: 48.5%"
          />
          <q-separator vertical color="indigo-11" />
          <q-btn
            @click="onMoveOption"
            flat
            label="OK"
            no-caps
            style="color: #09a506; font-size: 16px; width: 48.5%"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Dialog CheckDelete -->
    <q-dialog
      v-model="checkDelete"
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
            "{{ txtCard }}" deck will be deleted?
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
            @click="deleteCancle"
          />
          <q-separator vertical color="indigo-11" />
          <q-btn
            flat
            label="OK"
            no-caps
            style="color: #09a506; font-size: 16px; width: 48.5%"
            @click="deleteOK"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Dialog EachCardOption -->
    <q-dialog
      v-model="eachCardOption"
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
            Options
          </div>
        </q-card-section>
        <q-card-actions vertical>
          <q-btn
            flat
            no-caps
            style="font-size: 16px"
            @click="alertDelete = true"
            >Delete</q-btn
          >
          <q-btn
            flat
            no-caps
            style="font-size: 16px"
            :to="{
              name: 'EditCard',
              params: { id: indexDeck, index: indexClick },
              props,
            }"
            >Edit</q-btn
          >
          <q-btn
            flat
            no-caps
            style="font-size: 16px"
            :to="{
              name: 'PreviewCard',
              params: { id: indexDeck, index: indexClick },
              props,
            }"
            >Preview</q-btn
          >
          <q-btn
            flat
            no-caps
            style="font-size: 16px; color: red"
            @click="eachCardOption = !eachCardOption"
            >Cancel</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- ALERT DELETE -->
    <q-dialog v-model="alertDelete">
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
            "{{ this.CARD[this.indexClick].vocabulary }}" card will be deleted?
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
            @click="alertDelete = false"
          />
          <q-separator vertical color="indigo-11" />
          <q-btn
            flat
            label="OK"
            no-caps
            style="color: #09a506; font-size: 16px; width: 48.5%"
            @click="deleteCard"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- CARD -->
    <div class="column" style="padding: 10px; width: 100%">
      <q-intersection
        v-for="(item, index) in CARD"
        :key="index"
        style="width: 100%"
      >
        <q-card
          bordered
          class="q-mx-xs q-my-md shadow-4"
          style="border-radius: 10px; margin-top: 8px; margin-bottom: 8px"
          @click="cardClick(item, index)"
          href="/Edit"
        >
          <q-card-section style="padding-top: 3px; padding-bottom: 3px">
            <div
              style="flex-direction: row; display: flex; align-items: center"
            >
              <q-icon
                :name="item.isStar ? 'star' : none"
                color="yellow"
                size="30px"
              />
              <div
                class="text-subtitle2"
                style="align-items: flex-start; width: 80%; margin-left: 10px"
              >
                {{ item.vocabulary }}
              </div>
              <q-icon
                :name="item.isChecked ? 'fa-solid fa-circle-check' : none"
                color="green"
                size="25px"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>
  </q-page>
  <!-- MODAL RENAME DECK -->
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
          @click="onRenameDeck"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-page-container>
    <router-view />
  </q-page-container>
</template>

<script>
import { LocalStorage } from "quasar";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

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
      openLearning_7: false,
      openLearning_4: false,
      openOption: false,
      txtCard: "",
      newDeckName: "",
      dataDeck: [],
      isFront: 0,
      numberCards: 0,
      numberOption: 0,
      //
      router: useRouter(),
      showNameDialog: false,
      alertDelete: false,
      checkDelete: false,
      CARD: [],
      indexDeck: 0,
      indexClick: 0,
      eachCardOption: false,
    };
  },
  mounted() {
    let data = LocalStorage.getItem("DECK");
    let index = [...LocalStorage.getItem("DECK")].findIndex(
      (value) => String(value.id) === this.$route.params.id
    );
    this.indexDeck = index;
    this.dataDeck = data[index];
    this.txtCard = this.dataDeck.name;
    //this.CARD = data[index].cards ?? [];
    this.CARD = data[index].cards;
  },

  methods: {
    deleteCard() {
      this.eachCardOption = !this.eachCardOption;
      this.alertDelete = false;
      let data = LocalStorage.getItem("DECK");
      data[this.indexDeck].cards.splice(this.indexClick, 1);
      LocalStorage.set("DECK", data);
      this.CARD = data[this.indexDeck].cards;
    },
    cardClick(item, index) {
      this.indexClick = index;
      this.eachCardOption = !this.eachCardOption;
    },
    onRenameDeck() {
      let data = LocalStorage.getItem("DECK");
      data[this.indexDeck].name = this.newDeckName;
      this.txtCard = this.newDeckName;
      LocalStorage.set("DECK", data);
      this.showNameDialog = false;
    },
    onResetDeck() {
      let data = LocalStorage.getItem("DECK");
      data[this.indexDeck].cards.forEach((element) => {
        element.isChecked = false;
      });
      this.CARD.forEach((element) => {
        element.isChecked = false;
      });
      LocalStorage.set("DECK", data);
    },
    onStartLearning() {
      //this.openLearning_4 = !this.openLearning_4;
      console.log("start learning");
    },
    onOption() {
      this.openOption = !this.openOption;
    },

    deleteCancle() {
      this.checkDelete = false;
    },
    deleteOK() {
      let data = [...LocalStorage.getItem("DECK")];
      data.splice(this.indexDeck, 1);
      LocalStorage.set("DECK", data);
      this.router.go(-1);
      this.checkDelete = false;
    },
    newCard() {
      this.router.push({
        name: "NewCard",
        params: { id: this.$route.params.id },
      });
    },
    frontToBack() {
      this.openLearning_7 = !this.openLearning_7;
      this.isFront = 0;
    },
    backToFront() {
      this.openLearning_7 = !this.openLearning_7;
      this.isFront = 1;
    },
    onRandom() {
      this.openLearning_7 = !this.openLearning_7;
      this.isFront = Math.floor(Math.random() * 1);
    },
    allCard() {
      this.openLearning_7 = !this.openLearning_7;
      this.openLearning_4 = !this.openLearning_7;
      // this.indexDeck = this.route.params.index;
      // this.numberCards = data[this.indexDeck].cards.length;
      // this.isFront = this.route.params.front;

      // this.CARD = [...data[this.indexDeck].cards];
      this.router.push({
        name: "LearningPage",
        params: {
          index: this.indexDeck,
          front: this.isFront,

          type: "All",
          numberOption: this.numberOption,
        },
      });
    },
    onNotLearn() {
      this.openLearning_7 = !this.openLearning_7;
      this.openLearning_4 = !this.openLearning_7;

      this.router.push({
        name: "LearningPage",
        params: {
          index: this.indexDeck,
          front: this.isFront,
          type: "Not Learnt",
          numberOption: this.numberOption,
        },
      });
    },
    onFavorite() {
      this.openLearning_7 = !this.openLearning_7;
      this.openLearning_4 = !this.openLearning_7;
      this.router.push({
        name: "LearningPage",
        params: {
          index: this.indexDeck,
          front: this.isFront,
          type: "Favorite",
          numberOption: this.numberOption,
        },
      });
    },
    onRandom_5() {
      this.openLearning_7 = !this.openLearning_7;
      this.openLearning_4 = !this.openLearning_7;
      this.router.push({
        name: "LearningPage",
        params: {
          index: this.indexDeck,
          front: this.isFront,
          type: "Random_5",
          numberOption: this.numberOption,
        },
      });
    },
    onRandom_10() {
      this.openLearning_7 = !this.openLearning_7;
      this.openLearning_4 = !this.openLearning_7;
      this.router.push({
        name: "LearningPage",
        params: {
          index: this.indexDeck,
          front: this.isFront,
          type: "Random_10",
          numberOption: this.numberOption,
        },
      });
    },
    onMoveOption() {
      this.openLearning_7 = !this.openLearning_7;
      this.openLearning_4 = !this.openLearning_7;
      this.router.push({
        name: "LearningPage",
        params: {
          index: this.indexDeck,
          front: this.isFront,
          type: "Option",
          numberOption: this.numberOption,
        },
      });
    },
  },
});
</script>
