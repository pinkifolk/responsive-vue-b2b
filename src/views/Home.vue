<!--
    View of the beginning of the section 
-->
<template>
  <v-container mt-10>
    <v-layout wrap justify-center>
      <v-flex xs12 class="ma-10">
        <v-img
          src="https://b2b.provaltec.cl/admin/images/logo.jpg"
          class="mb-7"
        ></v-img>
        <v-form>
          <v-alert v-if="error" type="error" dismissible @click="error = false">
            Los datos ingresados no son correctos.
          </v-alert>
          <v-text-field
            required
            v-model="username.clave"
            type="text"
            name="username"
            placeholder="Usuario"
          ></v-text-field>
          <v-text-field
            required
            v-model="username.password"
            type="password"
            name="password"
            placeholder="Clave"
          ></v-text-field>
          <v-btn block @click.prevent="acceder" :loading="loading" type="submit"
            >Acceder</v-btn
          >
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    loading: false, //loading icon
    error: false, // error handling
    username: {
      clave: "",
      password: "",
    }, // data entered by the user in the input
  }),
  methods: {
    /*
    ----------------------------------------------------------------	
      Function: Acceder
      Description: This function queries the API if the data
      entered by the user are correct. It also has an icon
      load which is executed by pressing the Access button
    ----------------------------------------------------------------
  */
    async acceder() {
      this.loading = true; // show landing icon
      // Headers to send the data to be validated in JSON format
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Query the API passing the username and config parameters
      await axios
        .post("/api/user/login/", this.username, config)
        .then((response) => {
          if (!response.data.data) {
            this.error = true; // if it fails the message is activated
          } else {
            localStorage.setItem("token", response.data.token); // We add the token delivered by the backend to the localStorage
            localStorage.setItem("user", response.data.id); // We add the user id to the localStorage
            localStorage.setItem("descuento", response.data.descuento); // Added user discount to localStorage
            axios.defaults.headers.common["token"] = response.data.token; // We leave the user token by default so that you can obtain information on the other pages
            this.$router.push("/dashboard"); // redirect to dashboard
          }
        });
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Time that the charging icon will be displayed
      this.loading = false; // hide landing icon
    },
  },
};
</script>
