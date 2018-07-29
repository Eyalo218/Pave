<template>
    
</template>

<script>
export default {
    name: 'profilePage',
    date(){
        return {
        }
    },
    created(){
        this.loadProfileInfo()
    },
    methods: {
        loadProfileInfo(){
            console.log(this.$route.params.userId)  
        }
    }
}
</script>

<style>

</style>
