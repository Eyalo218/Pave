<template>
    <div id="Camera">
        <div>
          <video ref="video" id="video" width="640" height="480" autoplay>
          </video>
        </div>
        <div class="flex center">
          <button id="takePhoto" v-on:click="capturePhoto()">Take Photo</button>
          <button id="next" v-on:click="nextToDesc">Next</button>
        </div>
        <router-link :to="'/'">  
          <button>
            <!-- need to return to trips/currentTripId -->
            X
          </button>
        </router-link>

        <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
        <ul>
            <li v-for="photo in photos">
                <img v-bind:src="photo" height="100" />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "Camera",
  data() {
    return {
      video: {},
      canvas: {},
      photos: []
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
        var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
        this.photos.push(canvas.toDataURL("image/png"));
    },
    nextToDesc(){ //need to change that name badly
      // to put the photos into the store
      // to change the IsPhotoTaken inside the createMark to true
    },
    deleteLastPhoto(){
      
    }
  }
};
</script>

<style>
body {
  background-color: #f0f0f0;
}
#Camera {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#video {
  background-color: #000000;
}
#canvas {
  display: none;
}
li {
  display: inline;
  padding: 5px;
}
</style>