<template>
    <section>
        <div class="flex">
            <div class="map">
                <trip-map></trip-map>
            </div>
            <div class="photos">
                <photo-display></photo-display>
            </div>
        </div>
        <div>
            <router-link :to="'/createMark'" style="position:absolute;right:1%;top:50%;">  
                <button>
                    <img src="../../public/img/details/camera.png" alt="">
                </button>
            </router-link>
        </div>
    </section>
</template>

<script>
import tripMap from '@/components/DetailsComponents/Map.vue'
import photoDisplay from '@/components/DetailsComponents/PhotoDisplay.vue'

export default {

created(){
    console.log('trip details created');
},
components:{
   tripMap,
   photoDisplay
}
}
</script>

<style lang="scss" scoped>
.map, .photos{
    width:50%
}
button{
    width:5%;
    img{
        width:80%;
    }
}

</style>
