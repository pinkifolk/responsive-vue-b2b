<template>
  <v-footer dark padless class="mt-16">
    <v-card class="flex" flat tile>
      <v-card-title class="dark justify-center">
        <v-btn
          v-for="(item, index) of rrss"
          :key="index"
          class="mx-4"
          dark
          icon
          :href="item.Url"
          target="_blank"
        >
          <v-icon size="24px">
            {{ item.icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Provaltec SpA.</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      rrss: null,
    };
  },
  mounted() /*
    ----------------------------------------------------------------	
        Function: mounted (propia de VUE)
        Description: This function connects to the API to get
        the social networks of the company. This data is hard at
        the api
    ----------------------------------------------------------------
   */
  {
    axios
      .get("/api/menu/rrss")
      .then((response) => {
        this.rrss = response.data.results;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style>
</style>