<template>
    <section>
        <div class="about-section flex row-reverse space-between about">
            <div class="info">
                <h1>Plan faster, easily</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas doloremque pariatur et aliquam</p>
            </div>
            <div class="img img1"></div>
        </div>
        <div class="about-section flex space-between about about1">
            <div class="info">
                <h1>Travel Orginaized</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas doloremque pariatur et aliquam</p>
            </div>
            <div class="img img2"></div>
        </div>
        <div class="about-section flex row-reverse space-between about">
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
@import '../../../public/css/main.css';

section{
    width:95%;
    margin: 2rem auto;
}

.about-section {
    margin-bottom: 1.5rem;
}

.img{
    width: 50%;
    height: 200px;
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
    font-family: 'roboto-medium';
    font-size: 1.70rem;
}

p{
    font-size: 1.25rem;
}

.temp{
    margin-bottom:3.5rem;
}
@media screen and (max-width:415px){
    .about{
        flex-direction: column;
        align-items:column;

        .info{
            display: flex;
            flex-direction: column;
            align-content: center;
            align-items: center;
            width:100%;
        } 
        .img{
            width:100%;
            height:175px;
            margin-bottom:1.5rem;
        }
        p{
            text-align:center;
            margin-bottom:1.1rem;
        }
        .img3{
            margin-bottom:2.3rem;
        }
    }
}
</style>
