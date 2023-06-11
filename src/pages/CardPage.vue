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
        :disable="checkStarting()"
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
    <!-- OPTIONS SETTING -->
    <q-dialog
      v-model="openOptionSetting"
      transition-show="rotate"
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
            Setting content for Front & Back of the card
          </div>
        </q-card-section>

        <q-card-actions vertical>
          <q-btn flat no-caps style="font-size: 16px" @click="DefaultSetting"
            >Use default setting</q-btn
          >
          <q-separator />
          <q-btn flat no-caps style="font-size: 16px" @click="CustomizeSetting"
            >Use customize setting</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
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
    <!-- DIALOG 6 OPTIONS -->
    <!-- FRONT -->
    <q-dialog
      v-model="openLearning_6_Front"
      transition-show="rotate"
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
            Which of the following do you want to show on the front of the card?
          </div>
        </q-card-section>
        <q-card-actions vertical>
          <div
            v-for="(_, key) in DATA_FRONT"
            :key="key"
            style="margin-left: 10px"
          >
            <q-checkbox
              v-model="DATA_FRONT[key]"
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
            @click="onCancel"
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
      v-model="openLearning_6_Back"
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
            Which of the following do you want to show on the back of the card?
          </div>
        </q-card-section>
        <q-card-actions vertical v-show="typeFront === 0">
          <div
            v-for="(_, key) in DATA_BACK"
            :key="key"
            style="margin-left: 10px"
          >
            <q-checkbox
              v-model="DATA_BACK[key]"
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
            @click="onCancel"
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
    <!-- ALERT ERROR -->
    <q-dialog v-model="alertError">
      <q-card class="my-card">
        <q-card-section>
          <div style="color: #7286d3; font-size: 18px; text-align: center">
            There are no suitable cards
          </div>
        </q-card-section>
        <q-btn
          flat
          label="OK"
          no-caps
          style="color: #7286d3; font-size: 16px; width: 100%"
          @click="alertError = false"
        />
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
import { ref } from "vue";
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
      openOption: false,
      txtCard: "",
      newDeckName: "",
      dataDeck: [],
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
      openLearning_6_Front: false,
      openLearning_6_Back: false,
      typeFront: 0, // 0: front, 1: back
      DATA_FRONT: {
        Vocabulary: ref(false),
        Pronunciation: ref(false),
        Audio: ref(false),
        Image: ref(false),
        Meaning: ref(false),
        Example: ref(false),
      },
      DATA_BACK: {
        Vocabulary: ref(false),
        Pronunciation: ref(false),
        Audio: ref(false),
        Image: ref(false),
        Meaning: ref(false),
        Example: ref(false),
      },
      needPractice: [],
      alertError: false,
      DefaultFront: [],
      DefaultBack: [],
      openOptionSetting: false,
      isDefault: false,
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
    this.DefaultFront = LocalStorage.getItem("DefaultFront");
    this.DefaultBack = LocalStorage.getItem("DefaultBack");
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
      data[this.indexDeck].complete = 0;
      LocalStorage.set("DECK", data);
    },
    checkStarting() {
      if (this.CARD.length === 0) return true;
      return false;
    },
    onCancel() {
      this.openLearning_6_Front = false;
      this.openLearning_6_Back = false;
    },
    onStartLearning() {
      if (
        !Object.values(this.DefaultFront).includes(true) &&
        !Object.values(this.DefaultBack).includes(true)
      ) {
        this.openLearning_6_Front = !this.openLearning_6_Front;
      } else {
        this.openOptionSetting = !this.openOptionSetting;
      }
    },
    DefaultSetting() {
      this.openOptionSetting = false;
      this.openLearning_7 = true;
      this.isDefault = true;
    },
    CustomizeSetting() {
      this.openOptionSetting = false;
      this.openLearning_6_Front = !this.openLearning_6_Front;
    },
    onOKFront() {
      this.openLearning_6_Front = !this.openLearning_6_Front;
      this.openLearning_6_Back = !this.openLearning_6_Back;
    },
    onOKBack() {
      this.openLearning_6_Back = false;
      this.openLearning_7 = true;
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
    allCard() {
      this.openLearning_7 = !this.openLearning_7;
      this.router.push({
        name: "LearningPage",
        params: {
          index: this.indexDeck,
          type: "All",
          numberOption: this.numberOption,
          DataFront: this.isDefault
            ? JSON.stringify(this.DefaultFront)
            : JSON.stringify(this.DATA_FRONT),
          DataBack: this.isDefault
            ? JSON.stringify(this.DefaultBack)
            : JSON.stringify(this.DATA_BACK),
          needPractice: JSON.stringify([...this.needPractice]), // spread the array to create a new one
        },
      });
    },
    onNotLearn() {
      this.openLearning_7 = !this.openLearning_7;
      const TMP = this.CARD.filter((c) => c.isChecked === false);
      if (TMP.length === 0) {
        this.alertError = true;
        return;
      }
      this.router.push({
        name: "LearningPage",
        params: {
          index: this.indexDeck,
          type: "Not Learnt",
          numberOption: this.numberOption,
          DataFront: this.isDefault
            ? JSON.stringify(this.DefaultFront)
            : JSON.stringify(this.DATA_FRONT),
          DataBack: this.isDefault
            ? JSON.stringify(this.DefaultBack)
            : JSON.stringify(this.DATA_BACK),
          needPractice: JSON.stringify([...this.needPractice]), // spread the array to create a new one
        },
      });
    },
    onFavorite() {
      this.openLearning_7 = !this.openLearning_7;
      const TMP = this.CARD.filter((c) => c.isStar === true);
      if (TMP.length === 0) {
        this.alertError = true;
      } else {
        this.router.push({
          name: "LearningPage",
          params: {
            index: this.indexDeck,
            type: "Favorite",
            numberOption: this.numberOption,
            DataFront: this.isDefault
              ? JSON.stringify(this.DefaultFront)
              : JSON.stringify(this.DATA_FRONT),
            DataBack: this.isDefault
              ? JSON.stringify(this.DefaultBack)
              : JSON.stringify(this.DATA_BACK),
            needPractice: JSON.stringify([...this.needPractice]), // spread the array to create a new one
          },
        });
      }
    },
    onRandom_5() {
      this.openLearning_7 = !this.openLearning_7;
      this.router.push({
        name: "LearningPage",
        params: {
          index: this.indexDeck,
          type: "Random_5",
          numberOption: this.numberOption,
          DataFront: this.isDefault
            ? JSON.stringify(this.DefaultFront)
            : JSON.stringify(this.DATA_FRONT),
          DataBack: this.isDefault
            ? JSON.stringify(this.DefaultBack)
            : JSON.stringify(this.DATA_BACK),
          needPractice: JSON.stringify([...this.needPractice]), // spread the array to create a new one
        },
      });
    },
    onRandom_10() {
      this.openLearning_7 = !this.openLearning_7;
      this.router.push({
        name: "LearningPage",
        params: {
          index: this.indexDeck,
          type: "Random_10",
          numberOption: this.numberOption,
          DataFront: this.isDefault
            ? JSON.stringify(this.DefaultFront)
            : JSON.stringify(this.DATA_FRONT),
          DataBack: this.isDefault
            ? JSON.stringify(this.DefaultBack)
            : JSON.stringify(this.DATA_BACK),
          needPractice: JSON.stringify([...this.needPractice]), // spread the array to create a new one
        },
      });
    },
    onMoveOption() {
      this.openLearning_7 = !this.openLearning_7;
      this.router.push({
        name: "LearningPage",
        params: {
          index: this.indexDeck,
          type: "Option",
          numberOption: this.numberOption,
          DataFront: this.isDefault
            ? JSON.stringify(this.DefaultFront)
            : JSON.stringify(this.DATA_FRONT),
          DataBack: this.isDefault
            ? JSON.stringify(this.DefaultBack)
            : JSON.stringify(this.DATA_BACK),
          needPractice: JSON.stringify([...this.needPractice]), // spread the array to create a new one
        },
      });
    },
  },
});
</script>
