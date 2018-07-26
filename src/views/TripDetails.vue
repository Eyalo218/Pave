<template>
    <trip-map></trip-map>
</template>

<script>
import tripMap from '@/components/DetailsComponents/Map.vue'

export default {

created(){
    console.log('trip details created');
},
components:{
   tripMap,
}
}
</script>

<style>
</style>
