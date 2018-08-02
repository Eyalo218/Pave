<template>
    <section class="personal-info-container">
        <div v-if="userToDisplay" class="personalInfo">
            <div class="column">
                <div class="user-name">{{userToDisplay.name}}</div>
                <div class="edit-profile">
                    <router-link :to="`/editProfile/${userToDisplay._id}`">
                        <p>Edit</p>
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

<style lang="scss" scoped>
    .personal-info-container {
        margin-top: 3rem;
    }
    .personalInfo {
        width: 65%;
        margin: 0 auto;
        margin-bottom: 2rem;

        .user-name {
            color: #383633;
            font-family: 'roboto-bold';
            font-size: 2.5rem;
        }
        .edit-profile{
            font-family: 'roboto-bold';
            font-size: 0.9rem;
        }
        .edit-profile:hover {
            text-decoration: underline
        }
    }
</style>
