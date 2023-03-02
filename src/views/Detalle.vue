<!--
    Vista para mostrar los detalles de la familia
-->
<template>
  <v-app>
      <Menu/><!--componente que muestra el menu-->
      <v-main class="pt-0">
          <v-container>
              <ProductDetail/><!--componente que muestra las caracteristicas de la familia-->
          </v-container>
      </v-main>
  </v-app>
</template>

<script>
import ProductDetail from "../components/Product-Detail.vue";
import Menu from "../components/Menu.vue";
export default {
    components: { ProductDetail, Menu },
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