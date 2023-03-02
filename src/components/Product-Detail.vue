<template>
  <v-container>
      <v-btn small @click="atras">        
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    <v-layout wrap class="mt-5" justify-center>
      <v-flex xs12 mt-9>
        <v-card v-for="item in getHeader" :key="item.id">
          <v-img align="center">
            <img :src="item.urlImagen" :alt="item.title" width="200">
          </v-img>
          <v-card-title class="justify-center" >{{ item.title }}</v-card-title>
          <v-card-text>
            <v-btn outlined :href="item.pdf" block target="_blank">
              Ficha tecnica
              <v-icon large right>mdi-file-pdf-box</v-icon>
            </v-btn>           
          </v-card-text>
          <v-container class="grey lighten-5">
            <v-row no-gutters v-for="tag in getCharac[0]" :key="tag.title">
              <v-col>
                {{ tag.title }}
              </v-col>
              <v-col>
                 {{ tag.value }}
              </v-col>
            </v-row>
          </v-container>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>
                    Código
                  </th>
                  <th>
                    Medida
                  </th>
                  <th>
                    Stock
                  </th>                  
                  <th> <!-- Cambiar cuando exista descuento -->
                    Precio 
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="info in  getProduct"
                  :key="info.id"
                >
                  <td class="red--text">{{ info.cod_unificado }}</td> <!-- codigo unificado -->
                  <td>{{ info.medida }}"</td> <!-- Medida ansi  -->
                  <td>{{ info.provaltec + info.consignacion}}</td> <!-- Stock provaltec + consignacion -->
                  <td>{{ formatoMoneda(info.precio) }}</td> <!-- precio calculado en la funcion formatoMoneda -->
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <p class="red--text justify-center ml-3 mt-5">{{ item.setup}}</p>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import axios from 'axios'
export default {
 data: () =>({
   getHeader:[], // arreglo que muestra la imagen y el pdf
   getCharac:[], // arreglo que muestra las caracteristicas de la familia
   getProduct:[], // arreglo que muestra los productos
 }),
  created(){
    // ejecutamos la funcion al cargar la pagina
    this.getHead()   
    this.getBody()
    this.getFooter()
  },
  methods:{
       /*
      ----------------------------------------------------------------	
          Funcion: atras
          Descripcion: Esta funcion sirve de history pa volver a la ruta
          anterior
      ----------------------------------------------------------------
      */
      atras(){
        this.$router.go(-1)
      },
      /*
      ----------------------------------------------------------------	
          Funcion: formatoMoneda
          Descripcion: La funcion formatoMoneda hace un calculo para
          cambiar el precio del producto segun el descuento del usuario
          que este registrado.
      ----------------------------------------------------------------
      */  
      formatoMoneda(value){
        const getId = localStorage.getItem('id')
        const porcentaje = getId 
        const descuento = ((porcentaje*value)/100)
        const total = value-descuento
        return total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      },
      /*
      ----------------------------------------------------------------	
          Funcion: getHead
          Descripcion: La funcion getHead se conecta a la API y obtiene
          los datos multimedias como la imagen y el pdf de la ficha
      ----------------------------------------------------------------
      */  
      async getHead(){
        const id = this.$route.params.id
        await axios.get('/api/products/multimedia/'+ id)
        .then(response =>{
          this.getHeader = response.data.results          
        })
        .catch(error => console.log(error))
      },
      /*
      ----------------------------------------------------------------	
          Funcion: getBody
          Descripcion: La funcion getBody se conecta a la API y obtiene
          las caracteristicas de la familia
      ----------------------------------------------------------------
      */  
      async getBody(){
        const id = this.$route.params.id
        await axios.get('/api/products/variable/'+ id)
        .then(response =>{
          this.getCharac = response.data.results
        })
        .catch(error => console.log(error))
      },
      /*
      ----------------------------------------------------------------	
          Funcion: getFooter
          Descripcion: La funcion getFooter se conecta a la API y obtiene
          los productos asociados a la familia, muestra el codigo,
          la medida, el stock y el precio.
      ----------------------------------------------------------------
      */  
      async getFooter(){
        const id = this.$route.params.id
        await axios.get('api/products/products/'+ id)
        .then(response =>{
          this.getProduct = response.data.results
        })
        .catch(error => console.log(error))
      },  
  }
}
</script>

<style>

</style>