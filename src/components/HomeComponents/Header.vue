<template>
    <section class="header">
      <div class="home-nav-bar flex space-between">
        <div class="logo">Pave</div>
        <div class="links-container flex space-between">
          <router-link to="">How it works</router-link>
          <router-link to="">Sign up</router-link>
          <router-link to="">Log in</router-link>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: "HomeHeader",
  components: {}
};
</script>

<style lang="scss">
@import "../../../public/css/helpers.css";
  .header{
    margin: 0;
    background-image: url("../../../public/img/home/homeImg.jpeg");
    background-size: cover;
    background-position: center;
    height: 100vh;
  }
.home-nav-bar{
  padding: 2rem;
}
.links-container{
width: 20%;
font-family: 'roboto-regular';
  a {
    color: white;
  }
}

</style>
