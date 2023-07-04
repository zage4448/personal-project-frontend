<template lang="">
    <nav> 
      <v-app-bar color=#f5f5f5 flat height="100" app>
        <v-app-bar-nav-icon @click="navigation_drawer = !navigation_drawer" />
          <v-toolbar-title style="white-space: nowrap; overflow: visible; line-height: 1; flex: 30;">
            <span class="jb-default-2" >
                <b>Traveler's Guide<br/></b> 
            </span>
            <span class="jb-default-1">
                A Perfect Guide For<br>
                A Perfect Trip
            </span>
          </v-toolbar-title>
        <v-btn elevation="0" class="nav-button">
          <span>Home</span>
        </v-btn>
        <v-btn elevation="0" class="nav-button">
          <span>Flights</span>
        </v-btn>
        <v-btn elevation="0" class="nav-button">
          <span>Accomodation</span>
        </v-btn>
        <v-btn elevation="0" style="margin-right:8rem; text-transform:none;">
          <span>Guide</span>
        </v-btn>
        <v-btn v-if="!userToken" elevation="0" class="account-button">
            <v-icon>mdi-account</v-icon>
          <span>Login</span>
        </v-btn>
        <v-btn v-if="userToken" elevation="0" class="account-button">
            <v-icon>mdi-account</v-icon>
          <span>Logout</span>
        </v-btn>
        
      </v-app-bar>
  
      <v-navigation-drawer app v-model="navigation_drawer">
      </v-navigation-drawer>
    </nav>
  </template>
  
<script>
export default {
  data() {
    return {
    navigation_drawer: false,
    userToken: localStorage.getItem("userToken")
    };
  },

};
</script>

<style>
  .jb-default-1 { 
    font-size: 16px; 
    text-align: left;
  }
  .jb-default-2 { 
    font-size: 32px; 
  }
  .account-button span {
    text-transform: none;
  }
  .nav-button {
    margin-right: 5rem;
    text-transform: none;
  }


</style>
  