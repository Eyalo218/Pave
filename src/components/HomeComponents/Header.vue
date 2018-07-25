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
        <h1>explore and share walks around the world</h1>
        <input />
    </section>
</template>

<script>
export default {
  name: "HomeHeader",
  components: {}
};
</script>

<style scoped lang="scss">
@import "../../../public/css/helpers.css";
  .header{
    margin: 0;
    background-image: url("../../../public/img/home/homeImg.jpeg");
    background-size: cover;
    background-position: center;
    height: 100vh;
    margin-bottom: 4rem;
  }
.home-nav-bar{
  padding: 2rem;
  .logo{
    font-family: 'chalk-duster';
    font-size: 2rem;
  }
}
.links-container{
  font-size: 1.2rem;
  width: 300px;
    font-family: 'roboto-bold';
  a {
    color: white;
  }
}

</style>
