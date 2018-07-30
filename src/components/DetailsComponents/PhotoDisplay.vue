<template>
<section>
    <div class="img" :style="{ 'background-image': `url(${currPhoto})` }">
        <div class="flex space-around buttons">
            <button class="btn btn1" @click="lastPhoto()"><img src="../../../public/img/details/back.png" alt=""/></button>
            <button class="btn btn2" @click="nextPhoto()"><img src="../../../public/img/details/next.png" alt=""/></button>
        </div>
    </div>

</section>
</template>

<script>
export default {
  name: "photoDisplay",

  data: () => {
    return {
      photosUrls: [],
      currPhoto: null,
    };
  },
  created(){

  },
  methods: {
    lastPhoto: () => {
      if (this.currPhotoId === 0) this.currPhotoId = this.photosUrls.length - 1;
      else currPhotoId--;
      changePhoto();
    },
    nextPhoto: () => {
      if (this.currPhotoId === this.photosUrls.length - 1) this.currPhotoId = 0;
      else currPhotoId--;
      changePhoto();
    },
    changePhoto: () => {
      var elImg = document.querySelector(".img");
      console.log(elImg);
      // elimg.background.set(this.photoUrls[currPhotoIdl])
    }
  }
};
</script>

<style lang="scss" scoped>
.img {
  height: 300px;
  background-position: center;
  background-image: url("../../../public/img/tempImg4.jpeg");
  position: relative;
  background-repeat: no-repeat;
}
.buttons {
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 50%;
  .btn {
    border: none;
    background: none;
    cursor: pointer;
  }
  .btn1 {
    margin-right: 10rem;
  }
  .btn2 {
    margin-left: 10rem;
  }
  img {
    height: 30px;
  }
}
</style>
