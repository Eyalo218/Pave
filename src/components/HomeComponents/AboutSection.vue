<template>
    <section>
        <div class="flex row-reverse space-between temp">
            <div class="info">
                <h1>Plan faster, easily</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas doloremque pariatur et aliquam</p>
            </div>
            <div class="img img1"></div>
        </div>
        <div class="flex space-between temp">
            <div class="info">
                <h1>Travel Orginaized</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas doloremque pariatur et aliquam</p>
            </div>
            <div class="img img2"></div>
        </div>
        <div class="flex row-reverse space-between temp">
            <div class="info">
                <h1>Follow and Lead</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas doloremque pariatur et aliquam</p>
            </div>
            <div class="img img3"></div>
        </div>
    </section>
</template>

<script>

export default {
  name: 'AboutSection',
  components: {}
}
</script>

<style lang="scss" scoped>
@import '../../../public/css/helpers.css';

section{
    width:95%;
    margin: 0 auto;
}

.img{
    width: 50%;
    height: 185px;
    background-position: center;
}

.img1{
    background-image: url('../../../public/img/tempImg1.jpeg');
}

.img2{
    background-position: left;
    background-image: url('../../../public/img/tempImg2.jpeg');
}

.img3{
    background-image: url('../../../public/img/tempImg3.jpeg');
}

.info{
    width: 40%;
}
h1{
    margin-bottom: 1.5rem;
}
.temp{
    margin-bottom:2rem;

}
</style>
