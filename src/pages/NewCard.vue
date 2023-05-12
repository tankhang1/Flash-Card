<template>
  <q-page class="q-pa-sm">
    <q-header class="bg-primary header">
      <q-toolbar>
        <q-btn dense flat round icon="arrow_back" @click="$router.go(-1)" />
        <q-toolbar-title class="title-header">Home</q-toolbar-title>
        <q-btn flat round dense icon="done" @click="addNewCard" />
      </q-toolbar>
    </q-header>

    <q-tabs v-model="activePage" align="left" class="text-primary">
      <q-tab name="front" label="Front" />
      <q-tab name="back" label="Back" />
    </q-tabs>
    <q-page-container style="padding-top: 0">
      <q-page class="q-pa-sm">
        <div v-if="activePage === 'front'">
          <div class="text-subtitle1 mt-sm">Front Name</div>
          <q-input
            v-model="frontName"
            outlined
            dense
            placeholder="Enter front name"
            class="q-mt-md"
          />
          <div class="text-subtitle1 mt-sm">Front Description</div>
          <q-input
            v-model="frontDescription"
            outlined
            dense
            placeholder="Enter front description"
            class="q-mt-md"
          />
          <div v-show="!takeFront">
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
              <video
                class="full-width"
                autoplay
                ref="video_front"
                v-show="!imageCaptured_Front"
              ></video>
              <canvas
                ref="canvas_front"
                class="full-width"
                height="240px"
                width="100%"
                v-show="imageCaptured_Front"
              ></canvas>
              <q-img
                :src="imageData()"
                class="full-width"
                height="240px"
                width="100%"
                fit="contain"
              />
            </div>

            <div
              class="text-center"
              style="margin-top: 40px; margin-bottom: 10px"
            >
              <q-btn
                :label="!imageCaptured_Front ? 'Take a picture' : 'Open Camera'"
                no-caps
                icon="camera"
                color="primary"
                @click="captureImage_Front"
              />
            </div>
          </div>
        </div>
        <div v-else>
          <div class="text-subtitle1 mt-sm">Back Name</div>
          <q-input
            v-model="backName"
            outlined
            dense
            placeholder="Enter back name"
            class="q-mt-md"
          />
          <div class="text-subtitle1 mt-sm">Back Description</div>
          <q-input
            v-model="backDescription"
            outlined
            dense
            placeholder="Enter back description"
            class="q-mt-md"
          />

          <div v-show="!takeBack">
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
              <video
                class="full-width"
                autoplay
                ref="video_back"
                v-show="!imageCaptured_Back"
              ></video>
              <canvas
                ref="canvas_back"
                class="full-width"
                height="240px"
                width="100%"
                v-show="imageCaptured_Back"
              ></canvas>
              <q-img
                :src="imageData()"
                class="full-width"
                height="240px"
                width="100%"
                fit="contain"
              />
            </div>

            <div
              class="text-center"
              style="margin-top: 40px; margin-bottom: 10px"
            >
              <q-btn
                :label="!imageCaptured_Back ? 'Take a picture' : 'Open Camera'"
                no-caps
                icon="camera"
                color="primary"
                @click="captureImage_Back"
              />
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-page>
  <div class="row justify-center fixed-bottom q-pa-md">
    <q-btn
      flat
      icon="camera_alt"
      color="primary"
      round
      @click="showDialog = true"
    />
  </div>

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
          v-model="imageUpload_Front"
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

import { useRoute, useRouter } from "vue-router";
export default {
  name: "NewCard",
  props: {
    id: Object,
  },
  data() {
    return {
      imageCaptured_Back: false,
      imageCaptured_Front: false,
      imageUrl_Front: "",
      imageUrl_Back: "",
      imageUpload_Front: [],
      imageUpload_Back: [],
      activePage: "front",
      frontName: "",
      route: useRoute(),
      router: useRouter(),
      frontDescription: "",
      backName: "",
      backDescription: "",
      showDialog: false,
      takeFront: true,
      takeBack: true,
    };
  },
  mounted() {
    LocalStorage.set("Image_Front", "");
    LocalStorage.set("Image_Back", "");
    this.takeBack = true;
    this.takeFront = true;
  },
  updated() {
    //console.log("front", this.imageUpload_Front);
  },
  methods: {
    imageData() {
      if (this.activePage === "front") {
        return LocalStorage.getItem("Image_Front");
      } else {
        return LocalStorage.getItem("Image_Back");
      }
    },
    checkOpenCamera() {
      if (this.activePage === "front" && this.takeFront === true) return false;

      if (this.activePage === "back" && this.takeBack === true) return false;
      return true;
    },
    addNewCard() {
      const data = [...LocalStorage.getItem("DECK")];
      const index = data.findIndex(
        (value) => String(value.id) === this.route.params.id
      );
      console.log(data, this.route.params);
      const card = {
        id: Math.floor(Math.random() * Math.pow(10, 10)),
        cardName: this.frontName,
        isStar: false,
        isChecked: false,
        font: {
          name: this.frontName,
          description: this.frontDescription,
          image: LocalStorage.getItem("Image_Front"),
        },
        back: {
          name: this.backName,
          description: this.backDescription,
          image: LocalStorage.getItem("Image_Back"),
        },
      };
      if (data[index].cards) {
        data[index].cards = [...data[index].cards, card];
      } else {
        data[index].cards = [card];
      }
      // console.log(data[index]);
      LocalStorage.set("DECK", data);
      this.router.go(-1);
    },

    initCamera() {
      if (this.activePage === "front") {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
          })
          .then((stream) => {
            this.$refs.video_front.srcObject = stream;
          });
      } else {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
          })
          .then((stream) => {
            this.$refs.video_back.srcObject = stream;
          });
      }
    },
    openCamera() {
      if (this.activePage === "front") {
        this.takeFront = false;
      } else {
        this.takeBack = false;
      }
      this.initCamera();
    },
    captureImage_Front() {
      if (this.imageCaptured_Front === false) {
        let video = this.$refs.video_front;
        let canvas = this.$refs.canvas_front;
        canvas.width = video.getBoundingClientRect().width;
        canvas.height = video.getBoundingClientRect().height;

        let context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        this.imageCaptured_Front = true;
        LocalStorage.set("Image_Front", canvas.toDataURL());

        this.imageUrl_Front = this.dataURItoBlob(canvas.toDataURL());
        this.imageCaptured_Front = true;
        this.disableCamera();
      } else {
        this.imageCaptured_Front = false;
        this.initCamera();
      }
      // this.disableCamera();
    },
    captureImage_Back() {
      if (this.imageCaptured_Back === false) {
        let video = this.$refs.video_back;
        let canvas = this.$refs.canvas_back;
        canvas.width = video.getBoundingClientRect().width;
        canvas.height = video.getBoundingClientRect().height;

        let context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        this.imageCaptured_Back = true;
        LocalStorage.set("Image_Back", canvas.toDataURL());
        this.imageCaptured_Back = true;
        this.imageUrl_Back = this.dataURItoBlob(canvas.toDataURL());

        this.disableCamera();
      } else {
        this.imageCaptured_Back = false;
        this.initCamera();
      }
    },
    uploadClick() {
      if (this.activePage === "front") {
        this.takeFront = false;
      } else {
        this.takeBack = false;
      }
      this.initCamera();
    },
    captureImageFallBack(file) {
      console.log("file", file.target.files[0]);
      if (this.activePage === "front") {
        this.imageUrl_Front = file;
        let canvas = this.$refs.canvas_front;
        let context = canvas.getContext("2d");

        var reader = new FileReader();
        reader.onload = (event) => {
          LocalStorage.set("Image_Front", reader.result);

          var img = new Image();
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            this.imageCaptured_Front = true;
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file.target.files[0]);
      } else {
        this.imageUrl_Back = file;
        let canvas = this.$refs.canvas_back;
        let context = canvas.getContext("2d");

        var reader = new FileReader();
        reader.onload = (event) => {
          LocalStorage.set("Image_Back", reader.result);
          var img = new Image();
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            this.imageCaptured_Back = true;
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file.target.files[0]);
      }
      this.disableCamera();
    },
    disableCamera() {
      if (this.activePage === "front") {
        this.$refs.video_front.srcObject.getVideoTracks().forEach((track) => {
          track.stop();
        });
      } else {
        this.$refs.video_back.srcObject.getVideoTracks().forEach((track) => {
          track.stop();
        });
      }
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
