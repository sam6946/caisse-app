<template>
  <div class="container">
    <div class="content" v-for="income in incomes" :key="income.id">
     <v-card
  
    class="mx-auto"
    max-width="344"
   >
    <v-img
      src="../assets/home.jpg"
      height="200px"
    ></v-img>

    <v-card-title >
      <h3 :class="income.amount < 0? 'red' : 'green'" >Amount: {{ income.amount }} Frs</h3>
    </v-card-title>

    <v-card-subtitle class="date">
      {{ formatedDate(income.createdAt) }}
    </v-card-subtitle>
    <v-card-text>
          <strong>Description: </strong> {{ income.text }}
        </v-card-text>

    <v-card-actions>
      <!-- <v-btn
        color="orange lighten-2"
        text
      >
        Explore
      </v-btn> -->

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <!-- <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon> -->
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

      </div>
    </v-expand-transition>
  </v-card>
      </div>
  </div>
</template>

<script>
  export default {
    name: "Historique",  
    data: () => ({
      show: false,
      incomes: [],
      text: "",
      amount: null,
      createdAt: null,
      total: null,
    }),
    async created(){
            
         try {
            const res = await fetch('http://localhost:5000/api/transaction/',{
            headers: { 'Content-type': 'application/json', 'authorization': `Bearer ${localStorage.getItem("user")}` },
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
        //  this.total = positiveNumber.reduce((acc, item) => (acc += item), 0).toFixed(2)
        //  console.log(this.total)
                    
      } catch (error) {
             console.log(error)
            }
    },
    methods:{
        formatedDate (x){
            let date = new Date(x)
            let day = date.getDate()
            let month = date.getMonth()
            let year = date.getFullYear()
            //return day + "/" + month + "/" + year
            if(day <= 9){
                return "0" + day + "/" +  month + "/" + year
            }else if(month <= 9){
                return  day + "/" + "0" + month + "/" +  year
            }
            else{
                return day + "/" + month + "/" + year
            }
        },
    }
  }
</script>

<style  scoped>
.container{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.content{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;
}
.green{
    color: black;
    background-color: green;
}
.red{
    color: black;
    background-color: red;
}
.date{
    font-weight: 700;
    margin-top: 15px;
}
</style>