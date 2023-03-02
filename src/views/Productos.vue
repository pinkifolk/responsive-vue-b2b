<!--
    Vista de de la familia de productos 
-->
<template>
    <v-app>
        <Menu/> <!--componente que muestra el menu-->
        <v-main class="pt-0">
            <v-container>
                <Products/><!--componente que muestra el detalle de las familias de productos-->
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Products from '../components/Products.vue'
import Menu from '../components/Menu.vue'

export default {
  components: { Products, Menu },
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