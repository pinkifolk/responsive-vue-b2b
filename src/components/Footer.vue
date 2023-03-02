<template>
  <v-footer
    dark
    padless
    class="mt-16"
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="dark justify-center">
        <v-btn
          v-for="(item,index) of rrss"
          :key="index" 
          class="mx-4"
          dark
          icon
          :href="item.Url"
          target="_blank"          
        >
          <v-icon size="24px">
            {{ item.icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Provaltec SpA.</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      rrss: null
    }
  },
 mounted()
  /*
    ----------------------------------------------------------------	
        Funcion: mounted (propia de VUE)
        Descripcion: Esta funcion se conecta a la API para obtener 
        las Redes sociales de la empresa. Este dato esta en duro en
        la API
    ----------------------------------------------------------------
   */
 {
    axios.get('/api/menu/rrss')
    .then(response =>{
      this.rrss = response.data.results
    })
    .catch(error => console.log(error))
  }
}
</script>

<style>

</style>