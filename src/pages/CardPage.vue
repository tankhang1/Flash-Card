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
    <!-- Dialog How do you want to learn 7 options -->
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
          <q-btn flat no-caps style="font-size: 16px" to="/LearningPage"
            >All cards</q-btn
          >
          <q-separator />
          <q-btn flat no-caps style="font-size: 16px">Not learnt cards</q-btn>
          <q-separator />
          <q-btn flat no-caps style="font-size: 16px">Favorite cards</q-btn>
          <q-separator />
          <q-btn flat no-caps style="font-size: 16px">Random 5 cards</q-btn>
          <q-separator />
          <q-btn flat no-caps style="font-size: 16px">Random 10 cards</q-btn>
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
    <!-- Dialog How do you want to learn 4 options -->
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
          <q-btn
            flat
            no-caps
            style="font-size: 16px"
            @click="openLearning_7 = !openLearning_7"
            >Front to Back</q-btn
          >
          <q-separator />
          <q-btn
            flat
            no-caps
            style="font-size: 16px"
            @click="openLearning_7 = !openLearning_7"
            >Back to Front</q-btn
          >
          <q-separator />
          <q-btn
            flat
            no-caps
            style="font-size: 16px"
            @click="openLearning_7 = !openLearning_7"
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
            v-model="text"
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
            flat
            label="Cancel"
            no-caps
            style="color: #eb3223; font-size: 16px; width: 48.5%"
          />
          <q-separator vertical color="indigo-11" />
          <q-btn
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
          />
          <q-separator vertical color="indigo-11" />
          <q-btn
            flat
            label="OK"
            no-caps
            style="color: #09a506; font-size: 16px; width: 48.5%"
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
          <q-btn flat no-caps style="font-size: 16px">Delete</q-btn>
          <q-btn flat no-caps style="font-size: 16px" to="/EditCard"
            >Edit</q-btn
          >
          <q-btn flat no-caps style="font-size: 16px" to="/Preview"
            >Preview</q-btn
          >
          <q-btn flat no-caps style="font-size: 16px; color: red">Cancel</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Body -->
    <div class="row card-container">
      <q-intersection
        v-for="(item, index) in CARD"
        :key="index"
        class="card-style"
        clickable
        @click="onClick"
      >
        <q-card
          bordered
          class="q-mx-xs q-my-md shadow-4 card-border"
          @click="cardClick(item, index)"
          href="/Edit"
        >
          <q-card-section>
            <div class="text-subtitle2" style="text-align: center">
              {{ item.cardName }}
            </div>
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
  <q-page-container>
    <router-view />
  </q-page-container>
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
      openLearning_7: false,
      openLearning_4: false,
      openOption: false,
      checkDelete: false,
      eachCardOption: false,
      txtCard: "English",
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
      this.checkDelete = !this.checkDelete;
    },
    onClick() {
      console.log("onClick");
    },
    onStartLearning() {
      this.openLearning_4 = !this.openLearning_4;
    },
    onOption() {
      this.openOption = !this.openOption;
    },
    cardClick(item, index) {
      console.log(item, index);
      this.eachCardOption = !this.eachCardOption;
    },
  },
});
</script>
