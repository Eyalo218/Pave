<template>
    <section>
        <div class="trips-container">
            <div class="trips-display-ctr">
                <button>My trips</button>
                <button>Pins</button>
            </div>
            <div class="trip-display">
            <div class="my-trips">
                <ul class="trip-render-container flex flex-wrap align-center">
                    <li class="create-trip flex center align-center">
                        <div class="create-btn flex center align-center"@click="createTrip = true" >+</div>
                    </li>
                    <li v-for="trip in userTripsToDisplay" class="trip flex column">
                        <div class="active" v-if="trip.isActive = true"> Active</div>
                        <div class="complete" v-else>Complete</div>
                        <div @click="directToTrip(trip._id)" class="trip-title">{{trip.title}}</div>
                    </li>
                </ul>
            </div>
            <div class="my-pins"></div>
            </div>
        </div>
        <div class="modal-container">
            <div class="create-board-modal" v-if="createTrip">
                <button @click="createTrip = false">X</button>
                <form @submit.prev="submitTrip" class="flex column">
                    <input v-model="newTrip.title" type="text" placeholder="Title">
                    <textarea v-model="newTrip.desc" maxlength="300" placeholder="Description">
                    </textarea>
                    <button @click.prev="">Create</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>

import tripService from '../../service/tripService.js'

export default {
    name: 'Tripss',
    data(){
        return {
            newTrip: {
                title: '',
                desc: '',
                markers: [],
                traveledTime: Date.now,
                views: 0,
                userId: this.$route.params.userId,
                isComplete: false
            },
            createTrip: false,
        }
    },
    created(){
        this.loadUserTrips()
    },
    computed: {
        userToDisplay() {
            return this.$store.getters.userToDisplay
        },
        userTripsToDisplay() {
            return this.$store.getters.userTripsToDisplay
        }
    },
    methods: {
        submitTrip() {
            if(this.newTrip.title === '' || this.newTrip.desc === '') return
            tripService.addTrip(this.newTrip)
                .then(trip => {
                    this.loadUserTrips()
                    this.createTrip = false;
                })
        },
        loadUserTrips() {
            this.$store.dispatch({type: 'loadTripsByUserId', userId: this.$route.params.userId})
        },
        directToTrip(tripId) {
            this.$router.push(`/trips/${tripId}`)
        }
    }
}
</script>

<style lang="scss" scoped>
    .trips-display-ctr {
        margin: 0 auto;
        width: 65%;
        margin-bottom: 1.2rem;

        button {
            color: #c9c9c9;
            background-color: transparent;
            border: none;
            font-family: 'roboto-bold';
            font-size: 1.2rem;
            margin-right: 0.7rem;
            padding: 0.5rem 1rem;
        }

        button:hover {
            color: #383633;
            background-color: #EDEDED;
            border-radius: 2rem;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
        }
    }
    .trip-render-container {
        margin: 0 auto;
        padding: 0;
        width: 80%;

        .create-trip{
            height: 200px;
            width: 300px;
            background-color: #EDEDED;
            border-radius: 10px;
            margin: 0.7rem;
            
            .create-btn {
                height: 40px;
                width: 40px;
                border-radius: 50%;
                color: #EDEDED;
                background-color: #44809e;
                font-size: 2rem;
                cursor: pointer;
                transition: all 0.2s
            }

            .create-btn:hover {
                transform: scale(1.1);
            }
        }

        .trip {
            height: 200px;
            width: 300px;
            background-color: #383633;
            color: #44809e;
            border-radius: 10px;
            margin: 0.7rem;
            position: relative;

            .active{
                color: #4ec479;
                padding-top: 0.5rem;
                padding-left: 0.5rem;
            }

            .trip-title {
                font-family: 'roboto-bold';
                font-size: 3rem;
                letter-spacing: 0.2rem;
                position: absolute;
                top: 50%;
                left: 50%;
                transform:translate(-50%, -50%);
                cursor: pointer;
                transition: all 0.2s;
            }

            .trip-title:hover {
                color: #DEDEDE;
            }
        }
    }
    .modal-container{
        padding: 50px;
        background-color: blue;

        .create-board-modal {
            width: 40rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
    }
    }
</style>
