<template>
    <div class="container">
      <div>
        <header>
          <router-link to="dashboard" class="routerLink">
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
          mdi-arrow-left
        </v-icon>Back
      </v-btn>
      </div>
   </div>
   </router-link>
            <div class="total-income">${{ total }}</div>
        </header>
      </div>
      <form @submit= "addVal" v-if="total > 0">
            <input type="text" placeholder="Description..." v-model="text" required =" true" >
            <input type="number" placeholder="Value..." v-model="amount" max="-1" >
            <input type="date" placeholder="Date..." v-model="createdAt">
            <input type="submit"  value="SUBMIT" :disabled="total < Math.abs(amount)" >
        </form>
        <div class="income-list" >
             <div class="income-item" v-for="income in sortedIcome " :key="income.id" >
                <div class="removeItem"></div>
                <div class="dsc">{{ income.text }}</div>
                <div class="price">{{ income.amount }}</div>
                <div class="date">{{ formatedDate(income.createdAt) }}</div>
             </div>
        </div>
        <div class="condition" v-if="total == 0.00">
            <h1>  Allez effectuer votre  <strong>transaction</strong>  </h1>
            <!--  -->
            <div class="btn">
                <router-link to="transaction" class="routerLink" style="margin-top=-20px">
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
                        mdi-arrow-right
                        </v-icon>ici
                    </v-btn>
                    </div>
                </div>
                </router-link>
            </div>
            <!--  -->
        </div>
    </div>
</template>

<script>

    export default {
        name: "Retrait",
        data(){
            return{
                text: "",
                amount: null,
                createdAt: null,
                incomes: [],
                total: null,
                isDesable: true,
            }
        },
        //voire toutes les transactions deja effectue
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
              this.total = positiveNumber.reduce((acc, item) => (acc += item), 0).toFixed(2)
              console.log(this.total)
                    
                } catch (error) {
                    console.log(error)
                }
        },
        //permet 
        computed:{
            sortedIcome(){
                let temp = []

                temp = this.incomes.sort((a, b) =>{
                    return b.createdAt - a.createdAt
                })
                return temp
            },
            isDisabled(){
                if(this.total < this.amount){
                    return this.isDesable = true
                }else{
                    return  this.isDesable = false
                }
            }
        },

        // check if the value is empty \\ok
        // push those information inside an array
        // loop all the amount of those objects in my array
        methods:{
            
            formatedDate (x){
                let date = new Date(x)
                let day = date.getDate()
                let month = date.getMonth()
                let year = date.getFullYear()
                return day + "/" + month + "/" + year
            },

            //communication avec la BD
            async addVal(){
                try {
                    const res = await fetch('http://localhost:5000/api/transaction/',{
                      headers: { 'Content-type': 'application/json', 'authorization': `Bearer ${localStorage.getItem("user")}` },
                      method: 'POST',
                      body: JSON.stringify({
                      text: this.text,
                      amount: this.amount,
                      createdAt: this.createdAt
                   })
                    
              })
                const data = await res.json()
                console.log(data.data.amount)
                if(this.text == "" && amount == null ){
                    console.log('les donnees ne sont pas suffissant')
                }else if(this.amount <= 0){
                    console.log("somme negative interdite")
                }else{
                    this.incomes = [...this.incomes, data.data]
                    this.text = ""
                    this.amount = null
                    this.createdAt = null
                    const positiveNumber = this.incomes.map(item => item.amount)
                    const garde = positiveNumber.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2)
                    const retrait = (positiveNumber.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)
                    this.total = (garde - retrait).toFixed(2)
                }
                    } catch (error) {
                        if(garde - retrait < 0){
                            console.log("transaction non effectue")
                            return this.total
                        }
                        console.log(error.message)
                    }
            },
            


        }
    }
</script>

<style scoped>
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 30px;
        background-color: #313131;
        border-bottom: 5px solid #ffce00;
    }

    header h1{
        color: #eee;
        font-size: 28px;
    }

    header .total-income{
        font-family: sans-serif;
        background-color: #ffce00;
        color: #fff;
        font-size: 20px;
        font-weight: 900;
        padding: 5px 10px;
        min-width: 100px;
        text-align: center;
        border-radius: 8px;
        box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.25);
        text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25);
    }
    /* form style */
    form{
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

form input{
    color: #888;
    border: none;
    outline: none;
    font-size: 20px;
}

form input::placeholder{
    color: #aaa;
}

form input:not([type="submit"]){
    display: block;
    background: #fff;
    border: none;
    outline: none;
    padding: 5px 15px;
}

form input[type="submit"]{
    display: block;
    background: none;
    border: none;
    outline: none;

    color: #fff;
    font-weight: 500;
    text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
    padding: 5px 15px;
    background-color: #ffce00;
    cursor: pointer;
}

form input:first-of-type{
    border-radius: 8px 0px 0px 8px;
}

from input:last-of-type{
    border-radius: 0px 8px 8px 0px;
}
.income-list{
        margin-top: 30px;
        padding: 15px;
        background-color: #fff;
    }
    .income-item{
    position: relative;
    display: flex;
    padding: 15px 15px 15px 0px;
    background-color: rgba(246, 248, 244, 0.932);
    border-radius: 8px;
    max-width: 600px;
    margin: 0 auto 30px;
}
.removeItem{
    color: #ef2d2d;
    font-weight: 600;
    font-size: 20px;
    line-height: 1;
    text-align: center;
    margin: 0 15px
}
.dsc{
    color: #656;
    flex: 1 1 100%;
    font-size: 20px;
}
.price{
    color: #656;
    min-width: 100px;
    font-size: 20px;
}
.date{
    color: #656;
    text-align: right;
    font-size: 20px;
}

.routerLink{
    text-decoration: none
}
.condition{
    display: flex;
    justify-content: space-between
}


</style>