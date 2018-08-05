<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="scss">
.VueCarousel-wrapper {
  height: 300px !important;
}

@media (max-width: 800px) {
  .VueCarousel-wrapper {
    height: 100% !important;
  }
  section.photos {
  display: flex;
  align-items: center;
}
.VueCarousel-inner {
  align-items: center;
}
}
</style>
