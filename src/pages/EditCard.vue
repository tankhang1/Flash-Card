<template>
  <q-page class="q-pa-sm">
    <q-header class="bg-primary header">
      <q-toolbar>
        <q-btn dense flat round icon="arrow_back" @click="$router.go(-1)" />
        <q-toolbar-title class="title-header">Edit</q-toolbar-title>
        <q-btn flat round dense icon="done" @click="updateCard" />
      </q-toolbar>
    </q-header>
    <!-- TEXT INPUT -->
    <q-page-container
      style="padding: 10px; margin-left: 20px; margin-right: 20px"
    >
      <div class="text-subtitle1 mt-sm">
        Vocabulary
        <span style="color: red; font-size: 17px">*</span>
      </div>
      <q-input v-model="vocabulary" outlined dense class="q-mt-md" />
      <div class="row items-center q-pt-sm" v-show="showAlert">
        <q-icon name="error" color="red" size="15px" />
        <div style="font-size: 14px; margin-left: 10px; color: red">
          Please fill in vocabulary field
        </div>
      </div>
      <div class="text-subtitle1 q-pt-md">Pronunciation</div>
      <q-input v-model="pronunciation" outlined dense class="q-mt-md" />
      <div class="text-subtitle1 q-pt-md">Meaning</div>
      <q-input v-model="meaning" outlined dense class="q-mt-md" autogrow />
      <div class="text-subtitle1 q-pt-md">Example</div>
      <q-input v-model="example" outlined dense class="q-mt-md" autogrow />
      <div class="row items-center q-pt-xl">
        <div style="font-size: 16px; margin-right: 10px">Audio</div>
        <q-btn
          flat
          icon="fa-solid fa-file-audio"
          color="primary"
          round
          @click="playAudio"
        />
        <!-- <q-icon name="fa-solid fa-file-audio" color="primary" size="25px" /> -->
        <div class="q-pa-md">
          <div>{{ fileName }}</div>
          <q-file
            v-model="files"
            label="Pick files audio"
            style="width: 150px"
            accept=".mp3"
            @input="onAudio"
          />
        </div>
      </div>
      <div class="row items-center q-pt-md">
        <div style="font-size: 16px; margin-right: 10px">Camera</div>
        <q-btn
          flat
          icon="camera_alt"
          color="primary"
          round
          @click="showDialog = true"
        />
      </div>
      <!-- CAMERA -->
      <div v-show="activeCamera || haveImage">
        <div
          class="q-pa-md"
          style="
            border: 2px solid black;
            width: 90%;
            margin-left: auto;
            margin-right: auto;
            position: relative;
            top: 20px;
            margin-bottom: 20px;
            border-radius: 15px;
          "
        >
          <div v-show="!haveImage">
            <video
              class="full-width"
              autoplay
              ref="video"
              v-show="imageCapture === false"
            ></video>

            <canvas
              ref="canvas"
              class="full-width"
              height="240px"
              width="100%"
              v-show="imageCapture === true"
            ></canvas>
          </div>
          <q-img
            :src="image"
            class="full-width"
            height="240px"
            width="100%"
            fit="contain"
            v-show="haveImage"
          />
          <div style="position: absolute; top: 10px; right: 10px">
            <q-btn flat icon="close" color="red" round @click="onRemoveImage" />
          </div>
        </div>
        <div class="text-center" style="margin-top: 40px; margin-bottom: 10px">
          <q-btn
            :label="imageCapture === false ? 'Take a picture' : 'Open Camera'"
            no-caps
            icon="camera"
            color="primary"
            @click="captureImage"
            v-show="activeCamera"
          />
        </div>
      </div>
    </q-page-container>
  </q-page>
  <!-- AUDIO -->
  <audio ref="audioPlayer" :src="audioFile"></audio>
  <!-- MODAL OPTION CAMERA -->
  <q-dialog v-model="showDialog" position="bottom">
    <q-card>
      <q-item
        v-close-popup
        clickable
        class="justify-center"
        @click="uploadClick"
      >
        <q-file
          outlined
          label="Choose an image"
          class="full-width"
          accept="image/*"
          @input="captureImageFallBack"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </q-item>
      <q-separator />
      <q-item
        v-close-popup
        clickable
        class="justify-center"
        inset-seperator
        @click="openCamera"
        :disable="checkOpenCamera()"
      >
        <div class="text-subtitle3">Take New Photo</div>
      </q-item>
      <q-separator />
      <q-item v-close-popup clickable class="justify-center">
        <div style="color: red" class="text-subtitle3">Cancel</div>
      </q-item>
    </q-card>
  </q-dialog>

  <q-page-container>
    <router-view />
  </q-page-container>
</template>
<script>
import { LocalStorage } from "quasar";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "EditCard",
  setup() {
    return {
      files: ref(null),
      fileName: ref("hate"),
    };
  },
  data() {
    return {
      route: useRoute(),
      router: useRouter(),
      showDialog: false,
      vocabulary: "",
      pronunciation: "",
      meaning: "",
      example: "",
      audio: "",
      showAlert: false,
      card: {},
      activeCamera: false,
      imageCapture: false,
      image: "",
      haveImage: false,
      audioFile: "",
    };
  },
  mounted() {
    LocalStorage.set("Image", "");
    LocalStorage.set("Audio", "");
    let cardTMP = [...LocalStorage.getItem("DECK")];
    this.card = cardTMP[this.route.params.id].cards[this.route.params.index];
    this.vocabulary = this.card.vocabulary;
    this.pronunciation = this.card.pronunciation;
    this.meaning = this.card.meaning;
    this.example = this.card.example;
    this.image = this.card.image;
    this.audioFile = this.card.audio;
    if (this.card.image !== "") {
      this.haveImage = true;
    } else this.haveImage = false;
    console.log(this.audioFile.name); // object
    LocalStorage.set("Image", this.card.image);
    LocalStorage.set("Audio", this.card.audio);
  },

  methods: {
    checkOpenCamera() {
      if (this.activeCamera) return true;
      return false;
    },
    onAudio(file) {
      var reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = reader.result;
        const fileName = file.target.files[0].name;
        LocalStorage.set("Audio", dataUrl);
        this.audioFile = dataUrl;
        this.fileName = fileName;
      };
      reader.readAsDataURL(file.target.files[0]);
    },
    playAudio() {
      if (this.audioFile !== "") {
        this.$refs.audioPlayer.play();
      }
    },
    onRemoveImage() {
      if (this.haveImage) {
        this.image = "";
        this.haveImage = false;
      } else {
        LocalStorage.set("Image", "");
        this.activeCamera = false;
      }
    },
    imageData() {
      return LocalStorage.getItem("Image");
    },
    updateCard() {
      if (this.vocabulary === "") {
        this.showAlert = true;
      } else {
        this.showAlert = false;
        let cardTMP = [...LocalStorage.getItem("DECK")];
        cardTMP[this.route.params.id].cards[
          this.route.params.index
        ].vocabulary = this.vocabulary;
        cardTMP[this.route.params.id].cards[
          this.route.params.index
        ].pronunciation = this.pronunciation;
        cardTMP[this.route.params.id].cards[this.route.params.index].meaning =
          this.meaning;
        cardTMP[this.route.params.id].cards[this.route.params.index].example =
          this.example;
        cardTMP[this.route.params.id].cards[this.route.params.index].image =
          LocalStorage.getItem("Image");
        cardTMP[this.route.params.id].cards[this.route.params.index].audio =
          LocalStorage.getItem("Audio");
        LocalStorage.set("DECK", cardTMP);
        this.router.go(-1);
      }
    },
    initCamera() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        });
    },
    openCamera() {
      this.activeCamera = true;
      this.initCamera();
      if (this.haveImage) {
        this.haveImage = false;
      }
    },
    uploadClick() {
      this.activeCamera = true;
      //this.initCamera();
      if (this.haveImage) {
        this.haveImage = false;
      }
    },
    captureImage() {
      if (this.imageCapture === false) {
        let video = this.$refs.video;
        let canvas = this.$refs.canvas;
        canvas.width = video.getBoundingClientRect().width;
        canvas.height = video.getBoundingClientRect().height;
        let context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        this.imageCapture = true;
        LocalStorage.set("Image", canvas.toDataURL());
        this.disableCamera();
      } else {
        this.imageCapture = false;
        this.initCamera();
      }
    },
    captureImageFallBack(file) {
      let canvas = this.$refs.canvas;
      let context = canvas.getContext("2d");
      var reader = new FileReader();
      reader.onload = (event) => {
        LocalStorage.set("Image", reader.result);
        var img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          this.imageCapture = true;
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file.target.files[0]);
      //this.disableCamera();
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach((track) => {
        track.stop();
      });
    },

    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(",")[1]);

      // separate out the mime component
      var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      var ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], { type: mimeString });
      return blob;
    },
  },
};
</script>
<style>
.text-subtitle1 {
  margin-top: 10px;
}
.text-subtitle3 {
  margin-top: auto;
  margin-bottom: auto;
}
.q-mt-md {
  margin-top: 5px;
}
.separator {
  margin: 5;
  height: 0px;
}
</style>
