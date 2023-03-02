<template>
  <v-container>
    <v-btn small @click="atras" class="mb-5">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-layout> </v-layout>
    <v-layout row wrap class="mt-5" justify-center align-center>
      <v-flex xs12>
        <v-card
          v-for="item in productHome"
          :key="item.id"
          class="ml-5 mr-5 mb-10"
          elevation="5"
        >
          <v-img align="center">
            <img :src="item.urlImagen" :alt="item.title" width="200" />
          </v-img>
          <v-card-title class="pl-5 pr-5">
            {{ item.title }}
          </v-card-title>
          <v-card-text>
            {{ item.des_columna1 }} / {{ item.des_columna2 }} /
            {{ item.des_columna3 }}
          </v-card-text>
          <v-card-actions class="justify-center">
            <router-link
              :to="{ name: 'detalle', params: { id: item.id } }"
              style="text-decoration: none"
            >
              <v-btn color="success" rounded class="mb-5" @click="scrollTop"
                >Ficha Producto</v-btn
              >
            </router-link>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    productHome: [], //array show family
  }),
  created() {
    this.getProductsHome(); // We execute the function when loading the page
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
          Function: getProductsHome
          Description: The getProductsHome function connects to the API
          and get the data by the ID
      ----------------------------------------------------------------
      */
    async getProductsHome() {
      await axios
        .get("/api/products/productoshome/" + this.id)
        .then((response) => {
          this.productHome = response.data.results;
        })
        .catch((error) => console.log(error));
    },
    /*
      ----------------------------------------------------------------	
          Function: scrollTop
          Description: The scrollTop function allows us to keep the
          scroll always at 0 when loading a page.
          Fixes: It was created to fix a problem with scrolling,
          when browsing the site, the scroll stayed
          pasted in the previously visited position.
      ----------------------------------------------------------------
      */
    scrollTop() {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
        });
      });
    },
  },
  computed: {
    /*
      ----------------------------------------------------------------	
          Function: id
          Description: Get the Id from the URL to be used later
            in the function getProductsHome
      ----------------------------------------------------------------
      */
    id() {
      return this.$route.params.id;
    },
  },
  /*
      ----------------------------------------------------------------	
          Function: watch (Vue)
          Description: This function allows you to keep the DOM updated.
          to the change of id in the URL
          Corrects: It was created to correct an update problem
          of the information, when selecting a menu and changing to another no
          The products were updated, with this function we are looking at
          that when changing the ID in the url, the function will be executed
          getProductsHome and return the correct data to the changed id.
      ----------------------------------------------------------------
      */
  watch: {
    "$route.params.id": function () {
      this.getProductsHome();
    },
  },
};
</script>
