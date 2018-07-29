<template>
    <section>
        <div v-if="userToDisplay" class="personalInfo">
            <div class="column">
                <div class="user-name">{{userToDisplay.name}}</div>
                <div class="edit-profile">
                    <router-link :to="`/editProfile/${userToDisplay._id}`">
                        <button>Edit</button>
                    </router-link>
                </div>
            </div>
            <div class="profile-img"></div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'PersonalInfo',
    data(){
        return {
        }
    },
    created(){},
    methods: {},
    computed: {
        userToDisplay() {
            return this.$store.getters.userToDisplay
        }
    }
}
</script>

<style>

</style>
