<template>
    <section>
        <div>
            <trip-banner></trip-banner>
        </div>
        <div class="flex">
            <div class="map">
                <trip-map></trip-map>
            </div>
            <div class="components-container">
                <div v-if="photoMode" class="createMark">
                <create-mark></create-mark>
                </div>
                <div class="details">
                    <div class="photos">
                        <photo-display></photo-display>
                    </div>
                
                    <!-- gal's code enter here -->
                    <div class="reviews">
                        <Reviews></Reviews>
                    </div>
                </div>
            </div>
        </div>
        <div> 
            <button @click="togglePhotoMode()"><img src="../../public/img/details/camera.png" alt=""></button>
        </div>
    </section>
</template>

<script>
import tripMap from '@/components/DetailsComponents/Map.vue'
import photoDisplay from '@/components/DetailsComponents/PhotoDisplay.vue'
import Reviews from '@/components/DetailsComponents/Reviews.vue'
import createMark from '@/components/DetailsComponents/CreateMark.vue'
import tripBanner from '@/components/DetailsComponents/TripBanner.vue'

export default {

created(){
    console.log('trip details created');
},
components:{
   tripMap,
   photoDisplay,
   Reviews,
   createMark,
   tripBanner
},
data(){
    return{
        photoMode:false
    }
},
methods:{
    togglePhotoMode(){
        this.photoMode = !this.photoMode
    }
}
}
</script>

<style lang="scss" scoped>
.map{
    width:50%
}
button{
    width:25%;
    z-index: 2;
    img{
        width:80%;
    }
   
}
.createMark{
    position: absolute;
    width: 100%;
    z-index: 2;
    background: white;
    height:100vh;
}
.components-container{
    position: relative;
    width:50%
}

</style>
