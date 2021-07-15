<template>
  <div class="nav-bar">
    <nav class="navbar navbar-expand-lg fixed-top navbar-light justify-content-between" style="background-color: #e3f2fd;">
      <div class="container mw-0 px-3">

        <span class="navbar-brand mb-0 h1">Wedding Gallery</span>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" v-if="accessToken!=null"><router-link :to = "{ name:'logout' }">Logout</router-link></li>
          </ul>
        </div>

      </div>
    </nav>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Navbar',
    computed: mapState(['accessToken'])
  }
</script>

<style scoped>
    a {
      color:#000;
  }
</style>