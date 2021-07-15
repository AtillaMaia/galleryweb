<template>
  <div id="app">
    <!-- <PhotoGallery/> -->
    <router-view/>
  </div>
</template>

<script>
// import PhotoGallery from './components/PhotoGallery.vue'


export default {
  name: 'App',
  // components: {
  //   PhotoGallery,
    
  // },

  data() {
    return {
      likes: 15,
      creator: {
        avatar: 'http://via.placeholder.com/100x100/a74848',
        user: 'exampleCreator'
      },
      current_user: {
        avatar: 'http://via.placeholder.com/100x100/a74848',
        user: 'exampler'
      },
      comments: [
        {
          id: 1,
          user: 'example',
          avatar: 'http://via.placeholder.com/100x100/a74848',
          text: 'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor ',
        },
        {
          id: 2,                            
          user: 'example1',
          avatar: 'http://via.placeholder.com/100x100/2d58a7',
          text: 'lorem ipsum dolor',
        },
        {
          id: 3,                            
          user: 'example2',
          avatar: 'http://via.placeholder.com/100x100/36846e',
          text: 'lorem ipsum dolor again',
        },
      ]
    }
  },
  methods: {
    submitComment: function(reply) {
      this.comments.push({
        id: this.comments.length + 1,
        user: this.current_user.user,
        avatar: this.current_user.avatar,
        text: reply
      });
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>