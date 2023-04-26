<template>
  <q-page>
    <div
      class="q-pa-md"
      style="
        border: 2px solid black;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 20px;
        margin-bottom: 20px;
        border-radius: 15px;
      "
    >
      <video
        class="full-width"
        autoplay
        ref="video"
        v-show="!imageCaptured"
      ></video>
      <canvas
        ref="canvas"
        class="full-width"
        height="240px"
        width="100%"
        v-show="imageCaptured"
      ></canvas>
    </div>

    <q-file
      outlined
      v-model="imageUpload"
      label="Choose an image"
      class="full-width"
      accept="image/*"
      @input="captureImageFallBack"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
  </q-page>
</template>
<script>
import { ref, withCtx } from "vue";
export default {
  name: "CameraPage",
  data() {
    return {
      imageCaptured: false,
      imageUrl: "",
      imageUpload: [],
    };
  },
  methods: {
    initCamera() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        });
    },
    captureImage() {
      if (this.imageCaptured === false) {
        let video = this.$refs.video;
        let canvas = this.$refs.canvas;
        canvas.width = video.getBoundingClientRect().width;
        canvas.height = video.getBoundingClientRect().height;

        let context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        this.imageCaptured = true;
        this.imageUrl = this.dataURItoBlob(canvas.toDataURL());
        this.imageCaptured = true;
        this.disableCamera();
      } else {
        this.imageCaptured = false;
        this.initCamera();
      }

      // this.disableCamera();
    },
    captureImageFallBack(file) {
      console.log("file", file.target.file);
      this.imageUrl = file;
      let canvas = this.$refs.canvas;
      let context = canvas.getContext("2d");

      var reader = new FileReader();
      reader.onload = (event) => {
        var img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          this.imageCaptured = true;
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file.target.files[0]);
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
  mounted() {
    this.initCamera();
  },
};
</script>
