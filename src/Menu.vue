<template>
  <nav>
    <v-toolbar></v-toolbar>
    <router-view></router-view>
    <v-container class="fill-height">
      <v-row align="center" justify="center"></v-row>
    </v-container>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img
            src="https://wir.skyrock.net/wir/v1/profilcrop/?c=mog&w=301&h=301&im=%2Fbig.124165283.jpg"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{username}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link router :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar absolute fixed color="#fcb69f" dark src="https://picsum.photos/1920/1080?random">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>HyperSiteConsulting</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-spacer></v-spacer>
      <router-link to="/login">
        <v-btn color="#FF0000">
          <span>Sign in</span>
          <v-icon right color="#00000">mdi-login</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/register">
        <v-btn color="#FF0000">
          <span>Register</span>
          <v-icon right color="#00000">mdi-account-plus</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/about">
        <v-btn color="#FF0000" @click="logout">
          <span>Sign out</span>
          <v-icon right color="#00000">mdi-logout</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>
    <v-footer absolute>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>HyperSiteConsulting</strong>
      </v-col>
    </v-footer>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      activeBtn: 1,
      offsetTop: 0,
      username: this.$session.get('username'),
      out: true,
      visi: true,
      showNav: true,
      drawer: false,
      items: [
        { title: 'About', icon: 'mdi-help-box', route: '/about' },
        { title: 'Home', icon: 'mdi-home', route: '/home' },
        { title: 'Article', icon: 'mdi-book', route: '/article' }
      ]
    }
  },
  created () {
    this.fetchEventsList()
    this.timer = setInterval(this.fetchEventsList, 10)
  },
  methods: {
    async logout () {
      var msgStatus = this.$session.get('ID')
      console.log(msgStatus)
      this.$session.destroy()
      this.username = ''
    },
    async fetchEventsList () {
      this.username = this.$session.get('username')
    }
  }
}
</script>
