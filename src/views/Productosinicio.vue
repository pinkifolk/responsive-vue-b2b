<!--
    View of the products
-->
<template>
  <v-app>
    <Menu /><!--component that displays the menu-->
    <v-main class="pt-0">
      <v-container>
        <Productsinicio />
        <!--component that displays the families of the green tabs-->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Menu from "../components/Menu.vue";
import Productsinicio from "../components/Productsinicio.vue";

export default {
  components: { Menu, Productsinicio },
  mounted() {
    // We validate if you have a token to access this view
    if (!localStorage.getItem("token")) {
      this.$router.push("/");
    }
  },
};
</script>

<style>
</style>