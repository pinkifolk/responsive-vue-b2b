<template>
  <v-container fluid>
    <v-layout wrap justify-center>
      <v-flex xs12>
        <v-card
          v-for="items in itemProduct"
          :key="items.id"
          class="mt-2 mb-5"
          color="green"
          height="80"
        >
          <v-card-title class="white--text">
            <p class="body-2">{{ items.title }}</p>
            <v-spacer></v-spacer>
            <router-link
              :to="{ name: 'productosinicio', params: { id: items.id } }"
              style="text-decoration: none"
            >
              <v-btn icon fab color="white" @click="scrollTop">
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </router-link>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    itemProduct: [], // array showing green tabs
  }),
  mounted() /*
        ----------------------------------------------------------------	
            Function: mounted (VUE)
            Description: This function connects to the API to get
            the green tabs menu.
        ----------------------------------------------------------------
    */
  {
    axios
      .get("/api/menu/home")
      .then((response) => {
        this.itemProduct = response.data.results;
      })
      .catch((error) => console.log(error));
  },

  methods: {
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
};
</script>

<style>
</style>