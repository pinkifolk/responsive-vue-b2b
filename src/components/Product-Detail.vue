<template>
  <v-container>
    <v-btn small @click="atras">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-layout wrap class="mt-5" justify-center>
      <v-flex xs12 mt-9>
        <v-card v-for="item in getHeader" :key="item.id">
          <v-img align="center">
            <img :src="item.urlImagen" :alt="item.title" width="200" />
          </v-img>
          <v-card-title class="justify-center">{{ item.title }}</v-card-title>
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
                  <th>Código</th>
                  <th>Medida</th>
                  <th>Stock</th>
                  <th>
                    <!-- Change when there is a discount-->
                    Precio
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="info in getProduct" :key="info.id">
                  <td class="red--text">{{ info.cod_unificado }}</td>
                  <!-- code -->
                  <td>{{ info.medida }}"</td>
                  <!-- extent  -->
                  <td>{{ info.provaltec + info.consignacion }}</td>
                  <!-- Stock -->
                  <td>{{ formatoMoneda(info.precio) }}</td>
                  <!-- price calculated in the function formatMoneda -->
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <p class="red--text justify-center ml-3 mt-5">{{ item.setup }}</p>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    getHeader: [], // array show image and pdf file
    getCharac: [], // array show characteristics of the family
    getProduct: [], // array show products
  }),
  created() {
    // We execute the function when loading the page
    this.getHead();
    this.getBody();
    this.getFooter();
  },
  methods: {
    /*
      ----------------------------------------------------------------	
          Function: atras
          Description: This function serves as history to return to the route
          former
      ----------------------------------------------------------------
      */
    atras() {
      this.$router.go(-1);
    },
    /*
      ----------------------------------------------------------------	
          Function: formatoMoneda
          Description: The CurrencyFormat function does a calculation for
          change the price of the product according to the user discount
          that is registered.
      ----------------------------------------------------------------
      */
    formatoMoneda(value) {
      const getId = localStorage.getItem("id");
      const porcentaje = getId;
      const descuento = (porcentaje * value) / 100;
      const total = value - descuento;
      return total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
    /*
      ----------------------------------------------------------------	
          Function: getHead
          Description: The getHead function connects to the API and gets
          the multimedia data such as the image and the pdf of the file
      ----------------------------------------------------------------
      */
    async getHead() {
      const id = this.$route.params.id;
      await axios
        .get("/api/products/multimedia/" + id)
        .then((response) => {
          this.getHeader = response.data.results;
        })
        .catch((error) => console.log(error));
    },
    /*
      ----------------------------------------------------------------	
          Function: getBody
          Description: The getBody function connects to the API and gets
          the characteristics of the family
      ----------------------------------------------------------------
      */
    async getBody() {
      const id = this.$route.params.id;
      await axios
        .get("/api/products/variable/" + id)
        .then((response) => {
          this.getCharac = response.data.results;
        })
        .catch((error) => console.log(error));
    },
    /*
      ----------------------------------------------------------------	
          Function: getFooter
          Description: The getFooter function connects to the API and gets
          the products associated with the family, shows the code,
          the measure, the stock and the price.
      ----------------------------------------------------------------
      */
    async getFooter() {
      const id = this.$route.params.id;
      await axios
        .get("api/products/products/" + id)
        .then((response) => {
          this.getProduct = response.data.results;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>