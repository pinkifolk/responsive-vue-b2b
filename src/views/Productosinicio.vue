<!--
    Vista de los productos 
-->
<template>
    <v-app>
        <Menu/><!--componente que muestra el menu-->
        <v-main class="pt-0">
            <v-container>
                <Productsinicio/> <!--componente que muestra las familias de las pestañas verdes-->
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Menu from '../components/Menu.vue'
import Productsinicio from '../components/Productsinicio.vue'

export default {
  components: { Menu, Productsinicio },
  mounted(){
      // Validamos si tiene un token para acceder a esta vista 
      if(!localStorage.getItem('token')){
        this.$router.push('/')
      }
    },

}
</script>

<style>

</style>