<template>
    <div class="camera flex center">
      <div class="card">
        <div>
          <video ref="video" class="video" width="500" height="375" autoplay>
          </video>
        </div>
          <div class="flex space-around buttons">
            <font-awesome-icon icon="times" size="2x" />
            <button class="takePhoto btn" @click="capturePhoto()">
                <font-awesome-icon  icon="camera" size="2x" />
            </button>
            <button class="next btn" @click="continueToMarkDesc()">
              <font-awesome-icon @click="continueToMarkDesc" icon="check" size="2x" />
            </button>
            <button class="delete btn" @click="deleteLastPhoto()">
                <font-awesome-icon @click="deleteLastPhoto" icon="trash-alt" size="2x" />
            </button>
        </div>
      </div>
        <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
        <ul class="takenPhotos flex column">
            <li v-for="(photo, index) in photos" :key="index">
                <img v-bind:src="photo" height="100" />
            </li>
        </ul>
    </div>
</template>

<script>
import cloudinary from "../../service/cloudinaryService.js";
import { eventBus, PHOTO_TAKEN } from "../../service/eventBus.js";

export default {
  name: "Camera",
  data() {
    return {
      video: {},
      canvas: {},
      photos: [],
      counter: 0,
      urls: []
    };
  },
  mounted() {
    this.video = this.$refs.video;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.src = window.URL.createObjectURL(stream);
        this.video.play();
      });
    }
  },
  methods: {
    capturePhoto() {
      this.canvas = this.$refs.canvas;
      var context = this.canvas
        .getContext("2d")
        .drawImage(this.video, 0, 0, 640, 480);
      this.photos.push(canvas.toDataURL("image/png"));
    },
    continueToMarkDesc() {
      //need to change that name badly
      Promise.all(
        this.photos.map(photo => {
          return this.uploadPhoto(photo);
        })
      ).then(result => {
        result.forEach(result => {
          this.urls.push(result.url);
        });
        console.log(this.urls);
        var marker = {
          photos: this.urls
        };
        eventBus.$emit(PHOTO_TAKEN, marker);
      });
    },
    deleteLastPhoto() {
      this.photos = this.photos.splice(0, this.photos.length - 1);
    },
    uploadPhoto(img) {
      return new Promise((resolve, reject) => {
        cloudinary.cloudinary.uploader.upload(img, function(result) {
          console.log(result);
          resolve(result);
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  background-color: #f0f0f0;
}
.camera {
  text-align: center;
  color: #2c3e50;
  margin-top: 5%;
}
.video {
  background-color: #000000;
}
#canvas {
  display: none;
}
li {
  display: inline;
  padding: 5px;
}
.buttons {
  margin: 1.2rem auto 0 auto;
  width:500px;
}
.btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.next {
  background-color: rgb(64, 250, 64);
}
.takePhoto {
  background-color: #44809e;
}
.delete {
  background-color: red;
}
.card{
  background:#ffffff;
  box-shadow: 0px 0px 20px -2px rgba(38,38,38,1);
  width:520px;
  padding:1rem 1rem;
}
.takenPhotos{
  margin-top:1.2rem;
}
</style>