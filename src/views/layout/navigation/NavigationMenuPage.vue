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
        <v-btn elevation="0" class="nav-button" @click="toHome">
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
        <v-btn v-if="!userToken" elevation="0" class="account-button" @click="toLoginPage">
            <v-icon>mdi-account</v-icon>
          <span>Login</span>
        </v-btn>
        <v-btn v-if="userToken" elevation="0" class="account-button" @click="logout">
            <v-icon>mdi-account</v-icon>
          <span>Logout</span>
        </v-btn>
        
      </v-app-bar>
  
      <v-navigation-drawer app v-model="navigation_drawer" class="navigation-drawer">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">Traveler's Guide</v-list-item-title>
            <v-list-item-subtitle>Easy Ways for Things You Need</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <!-- router :to="link.route" -->
        <v-list nav dense>
          <v-list-item v-for="(link, index) in links" :key="link.index" @click="handleClick(index)" class="nav-drawer-items">
            <v-list-item-action>
              <v-icon>
                {{ link.icon }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="nav-drawer-item-title">
                {{ link.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </nav>
  </template>
  
<script>
import { mapActions } from 'vuex';

const accountModule = 'accountModule'


export default {
  data() {
    return {
    navigation_drawer: false,
    userToken: localStorage.getItem('userToken'),
    links: [
      { icon: "mdi-account-arrow-left", text: "My Page", method: "toMyPage"},
      { icon: "mdi-account-box-multiple-outline", text: "My Posts", method: "toMyPosts"},
      { icon: "mdi-account-star-outline", text: "Liked Posts", method: "toLikedPosts"}
    ]
    };
  },
  methods: {
    ...mapActions(accountModule, ['requestLogoutToSpring']),
    toLoginPage() {
      this.$router.push({name: 'LoginPage'})
    },
    toHome() {
      this.$router.push({name:'home'})
      .catch(
        location.reload()
      )
    },
    async logout () {
      await this.requestLogoutToSpring(this.userToken)
      localStorage.removeItem('userToken')
      localStorage.removeItem('nickname')
      await this.$router.push({name: 'home'})
        .catch( 
          location.reload()
        )
    },
    handleClick(index) {
      const method = this.links[index].method;
      this[method]();
    },
    toMyPage() {
      if (this.userToken !== null) {
        this.$router.push({name: 'MyPage'})
      }
      else alert("로그인 해야 이용 할 수 있습니다")
    },
    toMyPosts() {
      if (this.userToken !== null) {
        this.$router.push({name: 'MyPostsPage'})
      }
      else alert("로그인 해야 이용 할 수 있습니다")
    },
    toLikedPosts() {
      if (this.userToken !== null) {
        this.$router.push({name: 'MyLikedPostsPage'})
      }
      else alert("로그인 해야 이용 할 수 있습니다")
    }
  }

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

  .navigation-drawer{
    background-color: #c5c5c5;
  }
  .nav-drawer-items{
    margin-top: 9px;
  }
  .nav-drawer-item-title{
    text-align: center;
  }


</style>
  