<template>
<section>
  <div class="header flex center">
   <h1>About us lala </h1>
  </div>
  <div class="flex align-center column">
    <div class="portrait flex space-around row-reverse">
        <div class="info">
          <h1>Eyal Ohayon</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe repudiandae perferendis facilis voluptas nobis accusantium temporibus consequuntur accusamus dolore dignissimos! Eveniet, nesciunt facere. Eius, quis obcaecati iure quidem corporis nisi.</p>
        </div>
        <div class="img img1">
        </div>
    </div>
    <div class="portrait flex space-around row-reverse">
        <div class="info">
          <h1>Ofir Samuha</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe repudiandae perferendis facilis voluptas nobis accusantium temporibus consequuntur accusamus dolore dignissimos! Eveniet, nesciunt facere. Eius, quis obcaecati iure quidem corporis nisi.</p>
        </div>
        <div class="img img2">
        </div>
    </div>
    <div class="portrait flex space-around row-reverse">
        <div class="info">
          <h1>Gal Ja some thing =D</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe repudiandae perferendis facilis voluptas nobis accusantium temporibus consequuntur accusamus dolore dignissimos! Eveniet, nesciunt facere. Eius, quis obcaecati iure quidem corporis nisi.</p>
        </div>
        <div class="img img3">
        </div>
    </div>
  </div>
</section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../../public/css/helpers.css';
@import '../../public/css/main.css';

section{
  width: 95%;
  margin:0 auto;
}

h1{
margin-bottom:1.75rem;
padding-top: 1.5rem;
}

.header{
  height: 300px;
  background-color:#383633;
  color: #44809e;
  align-items: center;
  margin-bottom:4rem;
  h1{
    font-size:3rem;
    padding:0;
  }
}

.img{
  border-radius: 50%;
  width: 25%;
  height:250px;
  background-position: center;
  margin-right:2rem;
}

.img1{
  background-image: url('../../public/img/aboutUs/Eyal.jpeg');
}

.img2{
  background-image: url('../../public/img/aboutUs/Ofir.jpeg');
}

.img3{
  background-image: url('../../public/img/aboutUs/Gal.jpeg');
}

.info{
  width:60%;
}

.portrait{
  width:75%;
  margin-bottom: 3rem;
  height: 300px;
}

</style>

