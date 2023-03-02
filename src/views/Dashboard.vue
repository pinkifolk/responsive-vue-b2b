<!--
    Vista del panel principal
-->
<template>
  <v-app>
      <Menu/> <!--componente que muestra el menu-->
    <v-main class="mt-0 pt-0">
      <HomeProducts/> <!--componente que muestra las pestañas verdes-->
    </v-main>
  </v-app>
</template>

<script>
import Menu from "../components/Menu.vue";
import HomeProducts from "../components/Home-products.vue";
export default {
    components: { Menu, HomeProducts },
    data() {
      return{
        events:['touchstart','mousemove'],
        warningTimer:null
      }
    },
    mounted(){
      // Validamos si tiene un token para acceder a esta vista 
      if(!localStorage.getItem('token')){
        this.$router.push('/')
      }
      // ejecutamos un contador de inactividad
      this.events.forEach( function (event){
        window.addEventListener(event, this.resetTimer)
      },this)
      this.setTimers()
    },
    methods:{
       /*
          ----------------------------------------------------------------	
              Funcion: setTimers
              Descripcion: Establece que a los 30 min de inactividad cierre
              la sesion del usuario 
          ----------------------------------------------------------------
        */
      setTimers: function(){
        this.warningTimer = setTimeout(this.logoutTimer, 30 * 60 * 1000)
      },
      /*
          ----------------------------------------------------------------	
              Funcion: logoutTimer
              Descripcion: Se ejcuta una vez que se cumpla la funcion
              setTimers. Lo que hace es eliminar el token del usuario y nos
              redirecciona al logIn
          ----------------------------------------------------------------
        */
      logoutTimer: function(){
        localStorage.clear()
        this.$router.push('/').catch(err => {})
      },
       /*
          ----------------------------------------------------------------	
              Funcion: resetTimer
              Descripcion: Se ejecuta cuando se rompe el ciclo de inactividad
          ----------------------------------------------------------------
        */
      resetTimer: function(){
        clearTimeout(this.warningTimer)
        this.setTimers()
      },
    },
}
</script>

<style>

</style>