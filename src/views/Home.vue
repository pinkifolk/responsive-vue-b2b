<!--
    Vista del inicio de secion 
-->
<template>
  <v-container mt-10>
    <v-layout wrap justify-center>
      <v-flex xs12 class="ma-10">
        <v-img src="https://b2b.provaltec.cl/admin/images/logo.jpg" class="mb-7"></v-img>
        <v-form>
          <v-alert 
          v-if="error"
          type="error"
          dismissible
          @click="error=false"
          >
          Los datos ingresados no son correctos.
          </v-alert>
          <v-text-field required v-model="username.clave" type="text" name="username" placeholder="Usuario"></v-text-field>
          <v-text-field required v-model="username.password" type="password" name="password" placeholder="Clave"></v-text-field>
          <v-btn block @click.prevent="acceder" :loading="loading" type="submit">Acceder</v-btn>        
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';


  export default {
    data: () => ({ 
        loading: false, //icono de carga 
        error: false, // manejo de errores
        username:{
          clave:'',
          password:''
        },// datos ingresados por el usuario en los input
        
      }),
    methods:{
  /*
    ----------------------------------------------------------------	
      Funcion: Acceder
      Descripcion: Esta funcion consulta a la API si los datos
      ingresados por el usuario son correctos. Tambien tiene un icono
      de carga el cual se ejecuta al precionar el boton Acceder
    ----------------------------------------------------------------
  */
      async acceder(){
          this.loading = true // se muestr el icono
          // Headers para enviarle los datos a validar en formato JSON
          const config ={
            headers:{
              "Content-Type":"application/json"
            }
          }
          // Consulta a la API pasandole los parametros de username y config
            await axios.post('/api/user/login/',this.username,config)
            .then(response =>{
              if(!response.data.data){
                this.error = true // si falla se activa el mensaje
              }else{             
                localStorage.setItem('token', response.data.token) // Agregamos el token entregado por el backend al localStorage
                localStorage.setItem('user', response.data.id) // Agregamos el id del usuario al localStorage
                localStorage.setItem('descuento', response.data.descuento) // Agregamos descuento del usuario al localStorage
                axios.defaults.headers.common['token'] = response.data.token // Dejamos de manera default el token del usuario para que pueda obtener informacion en las demas paginas
                this.$router.push('/dashboard') // Redireccion al b2b mobile
              }                    
            })
          await new Promise(resolve => setTimeout(resolve,3000)) // Tiempo que se mostrara el icono de carga
          this.loading = false // se oculta el icono
      }
    },
  };
</script>
