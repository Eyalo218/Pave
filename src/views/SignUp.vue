<template>
    <section>
        <div class="container flex column">
            <div class="logo">Pave</div>
            <div><h3>Explore and share <span class="walks">walks</span></h3><h3>around the world</h3></div>
            <form class="form flex column">
                <input type="text" placeholder="Email">
                <input type="text" placeholder="Password">
                <button class="submit-btn">Continue</button>
                <p class="terms">By continuing, you agree to Pave's <span class="bold">Terms of Service, Privacy Policy</span></p>
            </form>
            <div class="redirect"><p>Already have an account? <router-link :to="'/login'"><span class="hover">Log-in</span></router-link></p></div>
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

    .container {
      position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 25%;
        border-radius: 5px;
      
      .logo {
          text-align: center;
          font-size: 2rem;
      }
      h3 {
        font-size: 1.5rem;
        text-align: center;
        margin: 0;
        padding: 0;
      }
      .walks{
        color: #44809e;
      }
      .form {
        margin: 0 auto;
        width: 50%;
        input {
          border: 1px solid #EDEDED;
          margin-bottom: 10px;
        }
        .submit-btn {
          color: #44809e;
          border-raius: 5px;
          background-color: #383633;
        }
        .terms {
          font-size: 7px;
          .bold{
            font-family: 'roboto-bold'
          }
        }
    }
      .redirect {
        text-align: center;
        .hover:hover{
          color: #44809e;
        }
      }
  }

</style>
