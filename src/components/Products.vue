<template>
  <v-container>
    <v-btn small @click="atras" class="mb-5">        
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>  
  <v-layout row wrap class="mt-5" justify-center align-center>
    <v-flex xs12>
      <v-card v-for="item in product" :key="item.id" class="ml-5 mr-5 mb-10" elevation="5">
        <v-img align="center">
          <img :src="item.urlImagen" :alt="item.title" width="200">
        </v-img>
        <v-card-title class="pl-5 pr-5">
          {{ item.title }}
        </v-card-title>
        <v-card-text>
          {{ item.des_columna1 }} /
          {{ item.des_columna2 }} /
          {{ item.des_columna3 }}
        </v-card-text>
        <v-card-actions class="justify-center">
          <router-link :to="{name:'detalle', params:{id:item.id}}" style="text-decoration:none">
            <v-btn color="success" rounded class="mb-5" @click="scrollTop">Ficha Producto</v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
    </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        product: [], // arreglo que muestra las familias
    }),
    created(){
      this.getProducts(); // ejecutamos la funcion al cargar la pagina        
      },
    methods:{
      /*
      ----------------------------------------------------------------	
          Funcion: atras
          Descripcion: Esta funcion sirve de history pa volver a la ruta
          anterior
      ----------------------------------------------------------------
      */
      atras () {
        this.$router.go(-1)
      },
      /*
      ----------------------------------------------------------------	
          Funcion: getProductsHome
          Descripcion: La funcion getProductsHome se conecta a la API
          y obtiene los datos por el ID 
      ----------------------------------------------------------------
      */      
      async getProducts(){
          await axios.get('/api/products/'+ this.id)
          .then(response =>{
              this.product = response.data.results
              if(this.product.length === 0){
                  axios.get('/api/products/special/'+ this.id)
                  .then(response =>{
                    this.product = response.data.results
                  })
              }
            })
          .catch(error => console.log(error))
      },
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
        setTimeout(() =>{
          window.scrollTo({
            top: 0
          })
        })
      },       
    },
    computed:{
        /*
        ----------------------------------------------------------------	
            Funcion: id
            Descripcion: Obtiene el Id desde la URL para luego ser usado 
            en la funcion getProductsHome
        ----------------------------------------------------------------
        */
        id(){
          return this.$route.params.id
        }
      }, 
    /*
      ----------------------------------------------------------------	
          Funcion: watch (Propia de Vue)
          Descripcion: Esta funcion permite mantener actualizado el DOM
          al cambio de id en la URL
          Corrige: Fue creado para corregir un problema de actualizacion
          de la informacion, al seleccionar un menu y cambiar a otro no
          se actualizaban los productos, con esta funcion estamos mirando
          que al cambiar el ID en la url, se ejecutara la funcion 
          getProductsHome y muestra los datos correctos al id cambiado.
      ----------------------------------------------------------------
      */  
    watch:{
      '$route.params.id': function(){
        this.getProducts()
      }
    },
    
}
</script>
