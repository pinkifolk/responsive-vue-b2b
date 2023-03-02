<!--
    Main Dashboard View
-->
<template>
  <v-app>
    <Menu />
    <!--component that displays the menu-->
    <v-main class="mt-0 pt-0">
      <HomeProducts />
      <!--component showing green tabs-->
    </v-main>
  </v-app>
</template>

<script>
import Menu from "../components/Menu.vue";
import HomeProducts from "../components/Home-products.vue";
export default {
  components: { Menu, HomeProducts },
  data() {
    return {
      events: ["touchstart", "mousemove"],
      warningTimer: null,
    };
  },
  mounted() {
    // We validate if you have a token to access this view
    if (!localStorage.getItem("token")) {
      this.$router.push("/");
    }
    // we run an inactivity counter
    this.events.forEach(function (event) {
      window.addEventListener(event, this.resetTimer);
    }, this);
    this.setTimers();
  },
  methods: {
    /*
          ----------------------------------------------------------------	
              Function: setTimers
              Description: Establishes that after 30 min of inactivity the user session closes 
          ----------------------------------------------------------------
        */
    setTimers: function () {
      this.warningTimer = setTimeout(this.logoutTimer, 30 * 60 * 1000);
    },
    /*
          ----------------------------------------------------------------	
              Function: logoutTimer
              Description: It is executed once the function is fulfilled
              setTimers. What it does is remove the token from the user and we
              redirects to logIn
          ----------------------------------------------------------------
        */
    logoutTimer: function () {
      localStorage.clear();
      this.$router.push("/").catch((err) => {});
    },
    /*
          ----------------------------------------------------------------	
              Function: resetTimer
              Description: Runs when the idle cycle is broken
          ----------------------------------------------------------------
        */
    resetTimer: function () {
      clearTimeout(this.warningTimer);
      this.setTimers();
    },
  },
};
</script>

<style>
</style>