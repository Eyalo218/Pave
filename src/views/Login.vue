<template>
    <section>
    <div class="background">
        <div class="home"><router-link :to="'/'"><span class="link-home">Pave</span></router-link></div>
        <div class="container flex column">
                <div class="logo">Pave</div>
                <div class="call-out"><h3>Explore and share <span class="walks">walks</span></h3><h3>around the world</h3></div>
                <form @submit.prevent="login" class="form flex column">
                    <input type="text" v-model="loginDetails.name" placeholder="Name">
                    <input type="password" v-model="loginDetails.password" placeholder="Password">
                    <button class="submit-btn">Continue</button>
                    <p class="terms">By continuing, you agree to Pave's <span class="bold">Terms of Service, Privacy Policy</span></p>
                </form>
                <div class="redirect"><p>Don't have an account? <router-link :to="'/signup'"><span class="hover">Sign-up</span></router-link></p></div>
        </div>
    </div>
    </section>
</template>

<script>
import { eventBus } from "../service/eventBus.js";
import userService from "../service/userService.js";

export default {
  data() {
    return {
      loginDetails: {
        name: "",
        password: ""
      }
    };
  },
  created() {},
  methods: {
    login() {
      userService.login(this.loginDetails).then(user => {
        console.log('entered');
        console.log(user);
        
        this.$store.dispatch({ type: "loggedIn", user });
        this.$store.dispatch({ type: "updateExplore", currStatus: false });
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$main-blue: #87bdd8;
.background {
  width: 100vw;
  height: 100vh;
  background-image: url("../../public/img/login-template.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto;
  .home {
    //   padding: 0.7rem 0 0 0.7rem;
    .link-home {
      padding-left: 1.3rem;
      font-family: "PoiretOne-Regular";
      font-size: 2.1rem;
      font-weight: bold;
      cursor: pointer;
      color: $main-blue;
      margin-right: 5rem;
      @media (max-width: 740px) {
        margin-right: 3rem;
        font-size: 1.6rem;
      }
      @media (max-width: 650px) {
        margin-right: 2rem;
      }
    }
  }
}
.container {
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25%;
  border-radius: 5px;

  @media (max-width: 1200px) {
    width: 30%;
  }
  @media (max-width: 1200px) {
    width: 35%;
  }
  @media (max-width: 820px) {
    width: 40%;
  }
  @media (max-width: 680px) {
    width: 95%;
  }
  .logo {
    text-align: center;
    font-size: 3rem;
    margin: 1rem 0;
    font-family: "PoiretOne-Regular";
    font-size: 2.6rem;
    font-weight: bold;
    cursor: pointer;
    color: #44809e;
    text-align: center;
    font-size: 3rem;
    @media (max-width: 680px) {
      margin-top: 4.5rem;
    }
  }
  h3 {
    font-size: 1.5rem;
    font-family: "roboto-bold";
    text-align: center;
    margin: 0;
    padding: 0;
  }
  .call-out {
    margin-bottom: 1.5rem;
  }
  .walks {
    color: #44809e;
  }
  .form {
    margin: 0 auto;
    width: 55%;
    @media (max-width: 680px) {
      width: 75%;
    }
    input {
      border: 1px solid #ededed;
      margin-bottom: 10px;
      border-radius: 5px;
    }
    input {
      padding: 0.5rem 1rem;
    }
    .submit-btn {
      border: none;
      color: #44809e;
      font-family: "roboto-bold";
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
      background-color: #383633;
      border-radius: 5px;
      margin-bottom: 0.5rem;
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        color: white;
        transform: scale(1.03);
      }
    }
    .terms {
      font-size: 0.6rem;
      margin-bottom: 5rem;
      .bold {
        font-family: "roboto-bold";
        cursor: pointer;
      }
    }
  }
  .redirect {
    font-family: "roboto-medium";
    font-size: 0.9rem;
    color: #383633;
    background-color: #44809e;
    padding: 1rem 0;
    text-align: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    .hover {
      color: white;
      transition: all 0.3s;
    }
    .hover:hover {
      color: #383633;
    }
  }
}
</style>
