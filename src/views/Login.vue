<template>
  <div>
    <div class="container text-dark">
      <div class="row justify-content-md-center">
        <div class="col-md-5 p-3 login justify-content-md-center">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Please sign in</h3>
            </div>
            <div class="panel-body">
              <form v-on:submit.prevent="login" class="card-body">
                <div class="form-group">
                  <input
                    type="text"
                    name="username"
                    id="user"
                    v-model="username"
                    class="form-control"
                    placeholder="Username"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    name="password"
                    id="pass"
                    v-model="password"
                    class="form-control"
                    placeholder="Password"
                  />
                </div>
                <p>
                  <small v-if="incorrectAuth" style="color:red">
                    *Incorrect username or password entered - please try again
                  </small>
                </p>
                <button type="submit" class="btn btn-lg btn-primary btn-block">
                  Login
                </button>
              </form>
            </div>

            <div class="panel-footer ">
              Don't have an account? <a href="/register"> Sign Up Here </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      incorrectAuth: false,
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("userLogin", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "posts" });
        })
        .catch((err) => {
          console.log(err);
          this.incorrectAuth = true;
        });
    },
  },
};
</script>

<style>
.form-group {
  margin: 10px auto;
}

.btn {
  margin: 10px auto;
}
</style>
