<template>
  <v-app>
    <NavigationMenuPage />
    <v-main class="background">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavigationMenuPage from "./views/layout/navigation/NavigationMenuPage.vue";

export default {
  components: {
    NavigationMenuPage,
  },

  data: () => ({}),
};
</script>

<style>
.v-application {
font-family: 'Caudex-Regular';
}
@font-face {
font-family:'Caudex-Regular';
src: url('@/assets/fonts/Caudex-Regular.ttf') format('truetype');
font-weight: 400;
}
.background{
  background-color: #f5f5f5;
  overflow: auto;
}
</style>
