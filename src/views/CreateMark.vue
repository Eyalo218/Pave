<template>
<section>
    <Camera v-if="!isPhotoTaken"></Camera>
    <div v-else>
        <div>
            <h1>Category</h1>
            <!-- listbox -->
        </div>
        <div>
            <h1>Description</h1>
            <textarea name="" id="" cols="30" rows="5"></textarea>
        </div>
    </div>
</section>
</template>

<script>
import Camera from '../components/DetailsComponents/Camera.vue'


export default {
data(){
    return{
        isPhotoTaken:false,
        
    }
},
components:{
            Camera,
        }
}
</script>

<style>

</style>
