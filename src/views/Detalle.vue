<!--
    View to show family details
-->
<template>
  <v-app>
    <Menu /><!--component that displays the menu-->
    <v-main class="pt-0">
      <v-container>
        <ProductDetail /><!--component that shows the characteristics of the family-->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ProductDetail from "../components/Product-Detail.vue";
import Menu from "../components/Menu.vue";
export default {
  components: { ProductDetail, Menu },
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