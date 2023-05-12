<template>
  <q-layout view="hHh lpR fFf" style="background-color: #7286d3">
    <div style="padding-top: 20px">
      <q-btn
        flat
        color="white"
        icon="west"
        style="position: absolute"
        @click="showExit = !showExit"
      />
      <h
        style="
          font-size: 20px;
          color: white;
          font-weight: bold;
          display: flex;
          justify-content: center;
        "
        >{{ this.indexCard }}/{{ this.numberCards }}</h
      >
    </div>
    <q-dialog
      v-model="showExit"
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
            Are you sure to exit learning card? Your progress won’t be saved!
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
            @click="cancelClick()"
            style="color: #eb3223; font-size: 16px; width: 48.5%"
          />
          <q-separator vertical color="indigo-11" />
          <q-btn
            flat
            label="OK"
            @click="router.go(-1)"
            no-caps
            style="color: #09a506; font-size: 16px; width: 48.5%"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div v-touch-swipe.mouse="handleSwipe" v-if="this.CARD.length !== 0">
      <q-card
        bordered
        style="
          width: 80%;
          min-height: 500px;
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
            style="
              color: #7286d3;
              margin-left: auto;
              margin-right: auto;
              margin-top: 10px;
            "
            class="text-h6"
          >
            {{
              !showCard
                ? CARD[indexCard - 1].font.name
                : CARD[indexCard - 1].back.name
            }}
          </div>
          <q-btn
            flat
            round
            style="
              color: #fdda0d;
              position: absolute;
              right: 10px;
              margin-top: 10px;
            "
            :color="CARD[indexCard - 1].isStar ? 'yellow' : 'grey'"
            icon="star"
            size="large"
            @click="checkStar()"
          />
        </q-card-section>
        <q-separator
          dark
          style="
            margin-bottom: 10px;
            margin-top: 10px;
            background-color: hsl(0, 0%, 90%);
          "
        />
        <div @click="showCard = !showCard">
          <q-card-section style="font-size: 16px" v-if="!showCard">
            <q-img
              v-if="CARD[indexCard - 1].font.image !== ''"
              :src="CARD[indexCard - 1].font.image"
              width="100%"
              height="50%"
            />
            <p style="margin-top: 10px">
              {{ CARD[indexCard - 1].font.description }}
            </p>
          </q-card-section>
          <q-card-section style="font-size: 16px" v-else>
            <q-img
              v-if="CARD[indexCard - 1].back.image !== ''"
              :src="CARD[indexCard - 1].back.image"
              width="100%"
              height="50%"
            />
            {{ CARD[indexCard - 1].back.description }}
          </q-card-section>
          <div
            style="
              position: absolute;
              bottom: 10px;
              justify-content: center;
              display: flex;
              width: 100%;
              color: #a3a3a3;
            "
          >
            Tap to flip it
          </div>
        </div>
      </q-card>
    </div>
    <div
      style="
        justify-content: center;
        display: flex;
        margin-top: 20px;
        width: 80%;
        flex-direction: row;
        justify-content: space-between;
        margin-left: auto;
        margin-right: auto;
      "
    >
      <q-btn
        label="Save"
        no-caps
        @click="onSave"
        style="
          background-color: #f78c4f;
          color: white;
          width: 45%;
          font-size: 16px;
        "
      />
      <q-btn
        @click="onFinish"
        label="Finish"
        no-caps
        style="
          background-color: #0ebb0b;
          color: white;
          width: 45%;
          font-size: 16px;
        "
      />
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage } from "quasar";
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "LearningPage",
  setup() {
    const info = ref(null);
    return {
      info,
    };
  },
  data() {
    return {
      showCard: false,
      showExit: false,
      route: useRoute(),
      router: useRouter(),
      numberCards: 0,

      indexDeck: 0,
      CARD: [
        {
          id: "",
          back: {
            name: "",
            description: "",
            image: "",
          },
          cardName: "",
          font: {
            name: "",
            description: "",
            image: "",
          },
          isChecked: false,
          isStar: false,
        },
      ],
      DATA_CARD: [
        {
          id: "",
          back: {
            name: "",
            description: "",
            image: "",
          },
          cardName: "",
          font: {
            name: "",
            description: "",
            image: "",
          },
          isChecked: false,
          isStar: false,
        },
      ],
      indexCard: 1,
    };
  },
  mounted() {
    console.log(this.route.params.front);
    let data = LocalStorage.getItem("DECK");
    if (this.route.params.type === "All") {
      this.indexDeck = this.route.params.index;
      this.numberCards = data[this.indexDeck].cards.length;
      this.CARD = [...data[this.indexDeck].cards];

      console.log("all", this.CARD);
    } else if (this.route.params.type === "Not Learnt") {
      this.indexDeck = this.route.params.index;
      this.numberCards = data[this.indexDeck].cards.filter(
        (item) => item.isChecked !== true
      ).length;

      this.CARD = [...data[this.indexDeck].cards].filter(
        (item) => item.isChecked !== true
      );

      if (this.CARD.length === 0) {
        //   this.router.go(-1);
      }
    } else if (this.route.params.type === "Favorite") {
      this.indexDeck = this.route.params.index;
      this.numberCards = data[this.indexDeck].cards.filter(
        (item) => item.isStar === true
      ).length;
      if (this.route.params.front === 1) {
        this.showCard = false;
      } else {
        this.showCard = true;
      }

      this.CARD = [...data[this.indexDeck].cards].filter(
        (item) => item.isStar === true
      );
    } else if (this.route.params.type === "Random_5") {
      this.indexDeck = this.route.params.index;
      if (data[this.indexDeck].cards.length > 5) {
        this.numberCards = 5;
        let tmp = [];
        let indexw = Math.floor(
          Math.random() * data[this.indexDeck].cards.length
        );
        while (tmp.length < 5) {
          if (!tmp.includes(data[this.indexDeck].cards[indexw])) {
            tmp.push(data[this.indexDeck].cards[indexw]);
          } else {
            indexw = Math.floor(
              Math.random() * data[this.indexDeck].cards.length
            );
          }
        }
        this.CARD = tmp;
      } else {
        this.numberCards = data[this.indexDeck].cards.length;
        this.CARD = [...data[this.indexDeck].cards];
      }
    } else if (this.route.params.type === "Random_10") {
      this.indexDeck = this.route.params.index;
      if (data[this.indexDeck].cards.length > 10) {
        this.numberCards = 10;
        let tmp = [];
        let indexw = Math.floor(
          Math.random() * data[this.indexDeck].cards.length
        );
        while (tmp.length < 10) {
          if (!tmp.includes(data[this.indexDeck].cards[indexw])) {
            tmp.push(data[this.indexDeck].cards[indexw]);
          } else {
            indexw = Math.floor(
              Math.random() * data[this.indexDeck].cards.length
            );
          }
        }
        this.CARD = tmp;
      } else {
        this.numberCards = data[this.indexDeck].cards.length;
        this.CARD = [...data[this.indexDeck].cards];
      }
    } else if (this.route.params.type === "Option") {
      this.indexDeck = this.route.params.index;
      let numberOption = this.route.params.numberOption;
      if (data[this.indexDeck].cards.length > numberOption) {
        this.numberCards = numberOption;
        let tmp = [];
        let indexw = Math.floor(
          Math.random() * data[this.indexDeck].cards.length
        );
        while (tmp.length < numberOption) {
          if (!tmp.includes(data[this.indexDeck].cards[indexw])) {
            tmp.push(data[this.indexDeck].cards[indexw]);
          } else {
            indexw = Math.floor(
              Math.random() * data[this.indexDeck].cards.length
            );
          }
        }
        this.CARD = tmp;
      } else {
        this.numberCards = data[this.indexDeck].cards.length;
        this.CARD = [...data[this.indexDeck].cards];
      }
    }
    if (this.route.params.front === "0") {
      this.showCard = false;
    } else {
      this.showCard = true;
    }
    this.DATA_CARD = [...data[this.indexDeck].cards];
    if (this.CARD.length >= 1) {
      this.CARD[0].isChecked = true;
      let index = this.DATA_CARD.findIndex(
        (item) => item.id === this.CARD[0].id
      );
      this.DATA_CARD[index].isChecked = true;
    }
  },
  methods: {
    checkStar() {
      this.CARD[this.indexCard - 1].isStar =
        !this.CARD[this.indexCard - 1].isStar;
      let index = this.DATA_CARD.findIndex(
        (item) => item.id === this.CARD[this.indexCard - 1].id
      );
      this.DATA_CARD[index].isStar = !this.DATA_CARD[index].isStar;
    },
    cancelClick() {
      this.showExit = !this.showExit;
    },
    handleSwipe({ evt, ...newInfo }) {
      if (newInfo.direction === "left") {
        if (this.indexCard < this.CARD.length) {
          this.indexCard++;
          this.CARD[this.indexCard - 1].isChecked = true;
          let index = this.DATA_CARD.findIndex(
            (item) => item.id === this.CARD[this.indexCard - 1].id
          );
          this.DATA_CARD[index].isChecked = true;
        }
      }
      if (newInfo.direction === "right") {
        if (this.indexCard > 1) {
          this.indexCard--;
          this.CARD[this.indexCard - 1].isChecked = true;
          let index = this.DATA_CARD.findIndex(
            (item) => item.id === this.CARD[this.indexCard - 1].id
          );
          this.DATA_CARD[index].isChecked = true;
        }
      }
    },
    onSave() {
      let data = LocalStorage.getItem("DECK");
      data[this.indexDeck].cards = [...this.DATA_CARD];
      let number = this.DATA_CARD.filter(
        (item) => item.isChecked === true
      ).length;
      data[this.indexDeck].complete = number;
      LocalStorage.set("DECK", data);
    },
    onFinish() {
      this.onSave();
      this.router.push({
        name: "ResultPage",
        params: {
          indexDeck: this.indexDeck,
        },
      });
    },
  },
});
</script>
