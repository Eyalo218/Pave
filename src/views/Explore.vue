<template>
    <section>
        <controlPanel></controlPanel>
        <tripList></tripList>
    </section>
</template>

<script>

import tripList from '../components/ExploreComponents/List.vue'
import controlPanel from '../components/ExploreComponents/ControlPanel.vue'

export default {
    components:{
        tripList,
        controlPanel
    },
    data(){
        return {
          
        }
    },
    created() {},
    computed:{},
    methods:{}
}
</script>

<style>

</style>
