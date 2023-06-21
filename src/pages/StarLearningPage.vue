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
    <!-- AUDIO -->
    <audio ref="audioPlayer" :src="this.CARD[this.indexCard - 1].audio"></audio>
    <!-- DIALOG -->
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
    <div
      v-touch-swipe.mouse="handleSwipe"
      style="
        min-height: 500px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 25px;
        width: 80%;
      "
    >
      <transition-group
        mode="out-in"
        appear
        enter-active-class="animated flipOutX slow"
        leave-active-class="animated flipOutX slow"
      >
        <!-- FRONT -->
        <q-card
          bordered
          style="position: absolute; min-height: 500px; width: 80%"
          v-if="showFront"
        >
          <q-card-section
            horizontal
            style="
              display: flex;
              align-items: center;
              justify-content: flex-end;
              width: 100%;
            "
          >
            <q-btn
              flat
              round
              icon="volume_up"
              color="primary"
              size="15px"
              @click="playAudio"
              v-if="this.DATA_FRONT.Audio"
            />
            <q-btn
              flat
              round
              icon="star"
              :color="CARD[indexCard - 1].isStar ? 'yellow' : 'grey'"
              size="15px"
              @click="checkStar"
              style="margin-left: auto"
            />
          </q-card-section>

          <q-card-section
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              min-height: 450px;
            "
            clickable
            @click="changeShowFront"
          >
            <div style="margin-top: -100px; width: 100%">
              <div
                style="color: #7286d3; font-size: 25px; text-align: center"
                v-if="this.DATA_FRONT.Vocabulary"
              >
                {{ CARD[indexCard - 1].vocabulary }}
              </div>

              <div
                style="font-size: 18px; text-align: center"
                v-if="this.DATA_FRONT.Pronunciation"
              >
                {{ CARD[indexCard - 1].pronunciation }}
              </div>
              <q-img
                v-if="CARD[indexCard - 1].image !== '' && this.DATA_FRONT.Image"
                :src="CARD[indexCard - 1].image"
                width="100%"
                height="200px"
                fit="contain"
              />
              <div
                style="font-size: 15px; width: 90%"
                v-if="this.DATA_FRONT.Meaning"
              >
                <span style="font-weight: bold">Meaning:</span>
                {{ CARD[indexCard - 1].meaning }}
              </div>
              <div
                style="font-size: 15px; width: 90%; margin-top: 20px"
                v-if="this.DATA_FRONT.Example"
              >
                <span style="font-weight: bold">Example:</span>
                {{ CARD[indexCard - 1].example }}
              </div>
            </div>
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
          </q-card-section>
        </q-card>
        <!-- BACK -->
        <q-card
          bordered
          style="position: absolute; min-height: 500px; width: 80%"
          v-if="!showFront"
        >
          <q-card-section
            horizontal
            style="
              display: flex;
              align-items: center;
              justify-content: flex-end;
              width: 100%;
            "
          >
            <q-btn
              flat
              round
              icon="volume_up"
              color="primary"
              size="15px"
              @click="playAudio"
              v-if="this.DATA_BACK.Audio"
            />
            <q-btn
              flat
              round
              icon="star"
              :color="CARD[indexCard - 1].isStar ? 'yellow' : 'grey'"
              size="15px"
              @click="checkStar"
              style="margin-left: auto"
            />
          </q-card-section>
          <q-card-section
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              min-height: 450px;
            "
            clickable
            @click="changeShowFront"
          >
            <div style="margin-top: -100px; width: 95%">
              <div
                style="color: #7286d3; font-size: 25px"
                v-if="this.DATA_BACK.Vocabulary"
              >
                {{ CARD[indexCard - 1].vocabulary }}
              </div>
              <div style="font-size: 18px" v-if="this.DATA_BACK.Pronunciation">
                {{ CARD[indexCard - 1].pronunciation }}
              </div>
              <q-img
                v-if="CARD[indexCard - 1].image !== '' && this.DATA_BACK.Image"
                :src="CARD[indexCard - 1].image"
                width="100%"
                height="200px"
                fit="contain"
              />
              <div
                style="font-size: 15px; width: 90%"
                v-if="this.DATA_BACK.Meaning"
              >
                <span style="font-weight: bold">Meaning:</span>
                {{ CARD[indexCard - 1].meaning }}
              </div>
              <div
                style="font-size: 15px; width: 90%; margin-top: 20px"
                v-if="this.DATA_BACK.Example"
              >
                <span style="font-weight: bold">Example:</span>
                {{ CARD[indexCard - 1].example }}
              </div>
            </div>
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
          </q-card-section>
        </q-card>
      </transition-group>
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
        label="Need Practice"
        no-caps
        @click="onNeedPractice"
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
      showExit: false,
      showCard: false,
      route: useRoute(),
      router: useRouter(),
      numberCards: 0,
      indexDeck: 0,
      DATA_FRONT: [],
      DATA_BACK: [],
      needPractice: [],
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
      showFront: true,
    };
  },
  mounted() {
    let data = LocalStorage.getItem("DECK");
    if (this.route.params.type === "All") {
      this.indexDeck = this.route.params.index;
      this.numberCards = data[this.indexDeck].cards.length;
      this.CARD = [...data[this.indexDeck].cards];
      this.DATA_FRONT = JSON.parse(this.route.params.DataFront);
      this.DATA_BACK = JSON.parse(this.route.params.DataBack);
      this.needPractice = JSON.parse(this.route.params.needPractice);
    } else if (this.route.params.type === "Not Learnt") {
      this.indexDeck = this.route.params.index;
      this.numberCards = data[this.indexDeck].cards.filter(
        (item) => item.isChecked !== true
      ).length;
      this.CARD = [...data[this.indexDeck].cards].filter(
        (item) => item.isChecked !== true
      );
      this.DATA_FRONT = JSON.parse(this.route.params.DataFront);
      this.DATA_BACK = JSON.parse(this.route.params.DataBack);
      this.needPractice = JSON.parse(this.route.params.needPractice);
    } else if (this.route.params.type === "Favorite") {
      this.indexDeck = this.route.params.index;
      this.numberCards = data[this.indexDeck].cards.filter(
        (item) => item.isStar === true
      ).length;
      this.CARD = [...data[this.indexDeck].cards].filter(
        (item) => item.isStar === true
      );
      this.DATA_FRONT = JSON.parse(this.route.params.DataFront);
      this.DATA_BACK = JSON.parse(this.route.params.DataBack);
      this.needPractice = JSON.parse(this.route.params.needPractice);
    } else if (this.route.params.type === "Random_5") {
      this.indexDeck = this.route.params.index;
      this.DATA_FRONT = JSON.parse(this.route.params.DataFront);
      this.DATA_BACK = JSON.parse(this.route.params.DataBack);
      this.needPractice = JSON.parse(this.route.params.needPractice);

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
      this.DATA_FRONT = JSON.parse(this.route.params.DataFront);
      this.DATA_BACK = JSON.parse(this.route.params.DataBack);
      this.needPractice = JSON.parse(this.route.params.needPractice);

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
      this.DATA_FRONT = JSON.parse(this.route.params.DataFront);
      this.DATA_BACK = JSON.parse(this.route.params.DataBack);
      this.needPractice = JSON.parse(this.route.params.needPractice);

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
    } else if (this.route.params.type === "Need Practice") {
      this.indexDeck = this.route.params.index;
      this.numberCards = data[this.indexDeck].cards.filter((item) =>
        this.route.params.needPractice.includes(item.id)
      ).length;
      //console.log(this.route.params.needPractice);

      this.CARD = data[this.indexDeck].cards.filter((item) =>
        this.route.params.needPractice.includes(item.id)
      );
      this.DATA_FRONT = JSON.parse(this.route.params.DataFront);
      this.DATA_BACK = JSON.parse(this.route.params.DataBack);
      this.needPractice = [];
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
    changeShowFront() {
      this.showFront = !this.showFront;
    },
    playAudio() {
      if (this.CARD[this.indexCard - 1].audio !== "") {
        this.$refs.audioPlayer.play();
      }
    },
    checkStar() {
      this.CARD[this.indexCard - 1].isStar =
        !this.CARD[this.indexCard - 1].isStar;
      let index = this.DATA_CARD.findIndex(
        (item) => item.id === this.CARD[this.indexCard - 1].id
      );
      //this.DATA_CARD[index].isStar = this.CARD[this.indexCard - 1].isStar;
      this.DATA_CARD[index].isStar = this.DATA_CARD[index].isStar;
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
    onNeedPractice() {
      this.needPractice.push(this.CARD[this.indexCard - 1].id);
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
          needPractice: this.needPractice,
          indexDeck: this.indexDeck,
          DataFront: JSON.stringify(this.DATA_FRONT),
          DataBack: JSON.stringify(this.DATA_BACK),
          needPractice: JSON.stringify(this.needPractice),
        },
      });
    },
  },
});
</script>
