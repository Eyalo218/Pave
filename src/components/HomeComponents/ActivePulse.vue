<template>
<section>
   <div class="container">
  <div class="dot"></div>
  <div class="pulse"></div>
</div>
     <span>Live</span>
    </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  position: relative;
}
span {
  color: darkgreen;
  position: absolute;
  // left: 70%;
  padding-left: 0.8rem;
  z-index: 1;
  opacity: 0.6;
}
.container {
  z-index: 1;
  // display: flex;
  //   margin-top: 20px;
  //   margin-left: 30px;
  position: relative;
  //   background: green;
}
.pulse {
  width: 0px;
  height: 0px;
  border: 5px solid #014101;
  border-radius: 15px;
  background-color: darkgreen;
  z-index: 10;
  opacity: 0.5;
  position: absolute;
}

.dot {
  border: 6px solid green;
  background: transparent;
  border-radius: 60px;
  height: 30px;
  width: 30px;
  -webkit-animation: pulse 1.5s;
  animation: pulse 1.5s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  position: absolute;
  top: -16px;
  left: -15.9px;
  z-index: 1;
  opacity: 0;
}

@keyframes pulse {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0;
  }
  25% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0.1;
  }
  50% {
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
    opacity: 0.3;
  }
  75% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}
</style>
