<template>
    <div class="camera flex center">
      <div class="card">
        <div>
          <video ref="video" class="video" :width="cameraWidth" :height="cameraHeight" autoplay>
          </video>
        </div>
        <div class="flex space-around buttons">
            <button class="closeCamera btn" @click="closeCamera()">
              <font-awesome-icon icon="times" size="2x" />
            </button>
            <button class="takePhoto btn" @click="capturePhoto()">
                <font-awesome-icon  icon="camera" size="2x" />
            </button>
            <button class="next btn" @click="continueToMarkDesc()">
              <font-awesome-icon  icon="check" size="2x" />
            </button>
            <button class="delete btn" @click="deleteLastPhoto()">
                <font-awesome-icon icon="trash-alt" size="2x" />
            </button>
        </div>
      </div>
        <canvas ref="canvas" id="canvas" :width="640" :height="480"></canvas>
        <ul class="takenPhotos flex column">
            <li v-for="(photo, index) in photos" :key="index">
                <img v-bind:src="photo" height="100" />
            </li>
        </ul>
    </div>
</template>

<script>
import cloudinary from "../../service/cloudinaryService.js";
import { eventBus, PHOTO_TAKEN, CLOSE_CAMERA } from "../../service/eventBus.js";

export default {
  name: "Camera",
  data() {
    return {
      video: {},
      canvas: {},
      photos: [],
      counter: 0,
      urls: [],
      cameraWidth: 500,
      cameraHeight: 375
      // width:640,
      // height:480,
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
    closeCamera() {
      eventBus.$emit(CLOSE_CAMERA);
    },
    capturePhoto() {
      this.canvas = this.$refs.canvas;
      // if(window.innerWidth<500){
      //   this.width=300 ;
      //   this.height= 500;
      // }
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
    },
    SetCameraSize() {
      if (window.innerWidth < 415) {
        // ElVideo = document.querySelector('.video');
        // console.log(ElVideo)
        this.cameraWidth = 250;
      }
    }
  },
  created() {
    this.SetCameraSize();
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
  width: 500px;
}
.btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
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
.card {
  background: #ffffff;
  box-shadow: 0px 0px 20px -2px rgba(38, 38, 38, 1);
  width: 520px;
  padding: 1rem 1rem;
}
.takenPhotos {
  margin-top: 1.2rem;
}
@media screen and (max-width: 415px) {
  .video {
    width: 300px;
    height: 500px;
  }
  .card {
    width: 100vw;
    height: 100vh;
  }
  .buttons {
    width: 100vw;
  }
  .takenPhotos {
    flex-direction: row;
    z-index: 4;
    position: absolute;
    top: 75%;
  }
  .camera {
    flex-direction: column;
  }
}
</style>