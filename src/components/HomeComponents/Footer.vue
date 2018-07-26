<template>
    <section class="flex">
      <ul class="flex space-between">
        <li><a href="#">About</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Log In</a></li>
      </ul>
    </section>
</template>

<script>

export default {
  name: 'FooterHome',
  components: {}
}
</script>
<style lang="scss" scoped>
section{
  height: 175px;
  background-color: #383633;
  color:#44809e;
  align-items: center;
  
}

ul{
  width: 25%;
  margin-left:3rem;
  a{
    color:#44809e;
  }
}
</style>
