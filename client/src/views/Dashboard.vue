<template>
   <v-app style="-webkit-app-region: drag">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
     color="blue"
     dark
      app
    >
    <v-list-item class="px-2 pt-1">
        <v-list-item-avatar>
            <!-- <v-img src="../assets/user.png" alt="admin" class="mx-auto" /> -->
            <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="black"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-img src="" alt="admin" class="mx-auto" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label=" name*"
                  v-model="userName"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  v-model="userEmail"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
            <!-- modified to update user profile -->
        </v-list-item-avatar>
        <v-list-item-title class="ml-4 text-capitalize">{{ user.name }}</v-list-item-title>
    </v-list-item>
      <v-list shaped  class="clickable">
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item['icon-ctr']"
            :append-icon="item.model ? item.icon : item['icon-alt']"
            active-class="orange--text"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title >
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              route :to="child.route"
                active-class="orange--text"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
                active-class="orange--text"
             route :to="item.route"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>  
    
      </v-list>

    </v-navigation-drawer>
    <v-app-bar

      app
      color="blue"
      dark
    >
      <v-app-bar-nav-icon @click.stop="mini = !mini"  class="clickable"/>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">TrackApp</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon v-on:click.prevent="logUserOut"  class="clickable">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container
       class="scroll-y"
       fluid
      >
       <v-row align="center" justify="center">
           <router-view></router-view>
       </v-row>
      
       
      </v-container>
    </v-content>
    <v-btn
    v-scroll="onScroll"
    bottom
    color="pink"
    dark
    fab
    fixed
    right
    @click="toTop"
    class="clickable"
    >
<v-icon>mdi-chevron-up</v-icon>
    </v-btn>
     <Layout/> 
  </v-app>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode"
import Layout from './Layout.vue'

export default {
    name: 'Dashboard',
    components:{
      Layout
    },
    props:{
    source: String
  },

  data: () => ({
    drawer: null,
    mini: false,
    fab: false,
    user:{},
    dialog: false,
    userName: "",
    userEmail: "",
    items:[
      {icon: 'mdi-home', text:'Dashboard', route:'/dashboard'},
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        'icon-ctr': 'mdi-cart-arrow-right',
        text: 'Transaction',
        model: false,
        children: [
           {icon: '', text: 'Retrait', route:'/retrait'},
          {icon: '', text: 'Depot', route:'/depot'}
        ]
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        'icon-ctr': 'mdi-google-maps',
        text: 'Trackin',
        model: false,
        children:[
          //{icon: 'mdi-tooltip-account', text: 'Locate', route:'/locate'},
          {icon: 'mdi-printer', text: 'Notification', route: '/notification'}
        ]
      },
      // {icon: 'mdi-finance', text:'Revenue', route: '/locate'},
      {icon: 'mdi-chart-pie', text: 'Statistique', route:'/statistique'},
      //{icon: 'mdi-magnify', text: 'Search', route: '/Recherche'}
    ]
  }),



   methods: {

     //update user information
     async updateUser(){
      try {
        const res = await fetch('http://localhost:5000/api/transaction/',{
          headers: { 'Content-type': 'application/json', 'authorization': `Bearer ${localStorage.getItem("user")}` },
          method: 'POST',
          body: JSON.stringify({
            name: this.userName,
            // lastName: this.amount,
            email: this.userEmail
          })
                    
        })
       const data = await res.json()
       console.log("the return data from nodejs backend"  + data)
      } catch (error) {
        
      }
     },
       //for scroll effect
      onScroll (e) {
        if (typeof window === 'undefined') return
        const top = window.pageYOffset || e.target.scrollTop || 0
        this.fab = top > 20
      },
      toTop () {
        this.$vuetify.goTo(0)
      },
      //get the user information
       async getCurrentUser(){
         let currentUser = localStorage.getItem('user') 
         try{
           //decode token here and attach to user object
           let decoded = VueJwtDecode.decode(currentUser)
           this.user = decoded
         }catch(error){
           console.log(error, "error from decoding token")
         }
         
       },
        logUserOut() {
      localStorage.removeItem("user");
      this.$router.push("/");
      }
    },
    created(){
     // window.addEventListener("load", this.getCurrentUser)
      this.getCurrentUser()
    }
 }
</script>

<style>
.clickable{
    -webkit-app-region: no-drag
}

::-webkit-scrollbar{
    width: 12px;
}

::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border: 10px
}

::-webkit-scrollbar-thumb{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}


</style>