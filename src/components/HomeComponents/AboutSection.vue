<template>
    <section>
        <div class="flex row-reverse space-between about">
            <div class="info">
                <h1>Plan faster, easily</h1>
                <p>Find exciting new locations and adventures for your next travel, using other people trips and reviews.</p>
            </div>
            <div class="img img1"></div>
        </div>
        <div class="flex space-between about about1">
            <div class="info">
                <h1>Travel Organized</h1>
                <p>Optimize your trip routes by choosing the best order to visit each attraction.</p>
            </div>
            <div class="img img2"></div>
        </div>
        <div class="flex row-reverse space-between about">
            <div class="info">
                <h1>Follow and Lead</h1>
                <p>Share your own traveling experiences and help other enjoy at your trip locations or visit cool places other people enjoyed before. </p>
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
    margin: 1.5rem auto;
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
    margin-bottom:10rem;
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
