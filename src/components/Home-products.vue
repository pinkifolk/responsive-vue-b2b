<template>
  <v-container fluid>
      <v-layout wrap justify-center>
          <v-flex xs12>
              <v-card v-for="items in itemProduct" :key="items.id" class="mt-2 mb-5" color="green" height="80">
                  <v-card-title class="white--text">
                      <p class="body-2">{{items.title}}</p>
                      <v-spacer></v-spacer>
                      <router-link :to="{name:'productosinicio', params:{id:items.id}}" style="text-decoration:none">
                        <v-btn icon fab color="white" @click="scrollTop">
                            <v-icon>mdi-arrow-right</v-icon>
                        </v-btn>                      
                      </router-link>
                  </v-card-title>
              </v-card>
          </v-flex>      
      </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
    data: () =>({
        itemProduct:[] // arreglo que muestra las pestañas verdes
    }),
    mounted ()
    /*
        ----------------------------------------------------------------	
            Funcion: mounted (propia de VUE)
            Descripcion: Esta funcion se conecta a la API para obtener 
            los el menu de pestañas verdes.
        ----------------------------------------------------------------
    */
    {
        axios.get('/api/menu/home')
        .then(response =>{
            this.itemProduct = response.data.results
        })
        .catch(error => console.log(error))
    },
    
    methods:{
        /*
      ----------------------------------------------------------------	
          Funcion: scrollTop
          Descripcion: La funcion scrollTop nos permite mantener el
          scroll siempre en 0 al cargar una pagina.
          Corrige: Fue creado para corregir un problema con el scroll,
          al momento de navegar en el sitio, el scroll se quedaba 
          pegado en la posicion antes visitada.
      ----------------------------------------------------------------
      */
        scrollTop () {
            setTimeout(() => {
              window.scrollTo({
                  top: 0
              })  
            })
        }
    }    
}
</script>

<style>

</style>