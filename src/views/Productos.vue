<!--
    Product family view
-->
<template>
  <v-app>
    <Menu />
    <!--component that displays the menu-->
    <v-main class="pt-0">
      <v-container>
        <Products /><!--component that shows the detail of product families-->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Products from "../components/Products.vue";
import Menu from "../components/Menu.vue";

export default {
  components: { Products, Menu },
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