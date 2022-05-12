<template>
    <div class="container">
      <div class="content">
       <v-card class="amount" color="rgb(13, 155, 238)" dark>
         <h1>Montant du compte</h1>
         <span>{{ total}}Frs</span>
       </v-card>
       <v-card class="statistique" color="blue" dark>
         <h1>Historiques transaction</h1>
            <router-link to="historique" class="routerLink">
      <div class="text-center">
      <div>
        <v-btn
        class="ma-2"
        color="blue"
        dark
      >
        <v-icon
          dark
          left
        >
          mdi-arrow-up
        </v-icon>ouvrir
      </v-btn>
      </div>
   </div>
   </router-link>
       </v-card>               
      </div>
    </div>
</template>

<script>
// import Carousel from '../components/Carousel.vue'

  export default {
      name: 'layout',
    components: {
      // Carousel
    },
    data(){
      return{
        total: null,
        incomes: [],
      }
    },

    async created(){
            
                try {
                 const res = await fetch('http://localhost:5000/api/transaction/',{
                 headers: { 'Content-type': 'application/json', 'Accept' : 'application/json', 'authorization': `Bearer ${localStorage.getItem("user")}` },
                method: 'GET',  
              })
              const data = await res.json()

              const positiveNumber = data.data.map(item => item.amount)
              //somme epagne
              const garde = positiveNumber.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2)
               //somme ayant ete retire
               const retrait = (positiveNumber.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)
              //affichage de la transaction
              this.incomes = data.data
              this.total = positiveNumber.reduce((acc, item) => (acc += item), 0).toFixed(2)
              console.log(this.total)
                    
                } catch (error) {
                    console.log(error)
                }
        },
  }
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.content{
  position: absolute;
  margin-top: -450px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-left: 5px;
  width: 100%;

}
.content h1{
  font-size: 20px;
  margin-top: 50px;
  font-weight: bold;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

}

.amount, .statistique{
  color: white;
  width: 40%;
  height: 150px;
  text-align: center;
  cursor: pointer;
  background: rgb(13, 155, 238);
}

.routerLink{
  text-decoration: none;
}

</style>