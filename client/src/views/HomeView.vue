<template>
  <v-app id="inspire">
    <div class="container">
      <div class="content">
        <main>
          <h1>Bienvenue sur <strong>TrackApp</strong>. Le moyen digital <br> tres simple de garde de l'argent</h1>
          <div class="btn">
          <router-link to="loginRegister" class="routerLink">
          <v-btn
            color="blue"
            elevation="2"
            dark
            x-large
          >Register/Login</v-btn> 
          </router-link>           
          </div>
        </main>
      </div>
    </div>
  </v-app>
</template>

<script>
  export default {
 
  }
</script>
<style scoped>

  .container{
    background:  url("../assets/home.jpg");
    background-size: cover;
    width: 100%;
    height: 100%;
  }
  .content{
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.386);
    width: 100%;
    height: 100%;
  }
  .content h1{
    color: #fff;
    font-weight: bold;
    flex-wrap: wrap;
    font-size: 45px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    margin-top: 55px;
  }
  .btn{
    text-align: center;
    margin-top: 20px;
  }

  strong{
    color: rgb(59, 168, 219);
  }

  .routerLink{
    text-decoration: none;
  }
  
</style>
