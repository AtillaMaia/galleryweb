<template>
  <div v-if="loading" class="spinner-border" role="status">
  </div>
  <div v-else class="posts">
    <NavBar></NavBar>
    <div class="col-md-8">
      <input class='file' type="file" @change="onFileChanged" />
      <button @click="onUpload">Upload</button>
    </div>

    <div class="album py-4 bg-light">
      <div class="container">

          <div v-if="posts_data.length">
            <div class="row">
              <div
                v-for="posts in posts_data"
                v-bind:key="posts.id"
                class="col-md-8"
              >
                <div class="card mb-4 box-shadow">
                  <img
                    class="card-img-top"
                    :src="posts.photo"
                    alt=""
                    width="150"
                    height="250"
                  />
                  <div class="card-body">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div
                        v-if="!posts.approved && !posts.isStaff"
                        class="btn-group"
                      >
                        <button
                          class="btn btn-sm btn-outline-primary"
                          @click.prevent="onApprove(posts.id)"
                        >
                          Approve
                        </button>
                      </div>

                      <div v-else class="d-flex justify-content-between align-items-center">
                        <div>
                          <span>{{ posts.likes.length }}</span>
                          <span class="span" role="button" v-if="posts.liked" @click="likePost(posts.id)"><font-awesome-icon icon="thumbs-up"/></span>
                          <span class="span" role="button" v-else @click="likePost(posts.id)"><font-awesome-icon :icon="['far', 'thumbs-up']"/></span>
                        </div>
                        <div>
                          <span class="span">{{ posts.comments.length }}</span>
                          <span class="span"><font-awesome-icon :icon="['far', 'comment']"/></span>
                        </div>
                      </div>
                      <small class="text-muted">@{{ posts.owner }}</small>
                    </div>


                    <div class="comments-outside">
                      <Comments
                        :comments_wrapper_classes="[
                          'custom-scrollbar',
                          'comments-wrapper',
                        ]"
                        :comments="posts.comments"
                        :current_user="posts.owner"
                        :current_post="posts.id"
                        @submit-comment="commentPost"
                      ></Comments>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>There are currently no photos</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/Navbar";
import Comments from "../components/Comments.vue";
import { getAPI } from "../axios-api";
import Swal from "sweetalert2";

export default {
  name: "Posts",
  components: {
    NavBar,
    Comments,
  },
  onIdle() {
    this.$store.dispatch("userLogout").then(() => {
      this.$router.push({ name: "login" });
    });
  },

  data() {
    return { 
      posts_data: [], 
      selectedFile: null,
      loading: false 
      };
  },

  async created() {
    this.loading = true
    await getAPI
      .get("/home/", {
        headers: { Authorization: `Bearer ${this.$store.state.accessToken}` },
      })
      .then((response) => {
        this.posts_data = response.data;
        this.loading = false
      })
      .catch((err) => {
        console.log(err);
        this.loading = false
      });
  },

  methods: {
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
    },
    
    async onUpload() {
      const formData = new FormData();
      formData.append("photo", this.selectedFile);

      await getAPI.post("/home/upload-image/", formData, {
        headers: { Authorization: `Bearer ${this.$store.state.accessToken}` },
        ContentType: "multipart/form-data",
      })
      .then((response) => {
        if (response.data == ''){
                  Swal.fire({
            title: "Succefully uploaded!",
            text: "Wait for the host approval!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        } else {
            this.posts_data.splice(0, 0, response.data)
            Swal.fire({
            title: "Succefully uploaded!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
        this.selectedFile = null
      })
      .catch((err) => {
          Swal.fire({
            title: "Error to Upload File!",
            icon: "error",
            confirmButtonText: "Ok",
          });
        console.log(err);
      });
    },

    async onApprove(id) {
      await getAPI
        .get(`/home/approve/${id}/`, {
          headers: { Authorization: `Bearer ${this.$store.state.accessToken}` },
        })
        .then((response) => {
          let index = this.posts_data.indexOf(
            this.posts_data.find((el) => el.id == id)
          );
          this.$set(this.posts_data, index, response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async likePost(id) {
      await getAPI
        .get(`/home/like/${id}/`, {
          headers: { Authorization: `Bearer ${this.$store.state.accessToken}` },
        })
        .then((response) => {
          let index = this.posts_data.indexOf(
            this.posts_data.find((el) => el.id == id)
          );
          this.$set(this.posts_data, index, response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    commentPost: async function(reply, postId) {
      const comment_data = {
        post: postId,
        message: reply,
      };
      await getAPI
        .post("/home/comment/", comment_data, {
          headers: { Authorization: `Bearer ${this.$store.state.accessToken}` },
        })
        .then((response) => {
          let index = this.posts_data.indexOf(
            this.posts_data.find((el) => el.id == postId)
          );
          this.$set(this.posts_data, index, response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>

.file {
  margin: 20px 0px 10px 0px;
}

.span {
  margin: auto 2px;
}
.comments-outside {
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  max-width: 100%;
}

</style>
