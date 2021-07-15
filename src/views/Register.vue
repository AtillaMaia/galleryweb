<template>
  <div>
    <div class="container text-dark">
      <div class="row justify-content-md-center">
        <div class="col-md-5 p-3 register justify-content-md-center">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Sign up</h3>
            </div>
            <div class="panel-body">
              <form v-on:submit.prevent="register" class="card-body">
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
                    *Password must contain at least 8 characters (including a
                    special character) - please try again
                  </small>
                </p>
                <button type="submit" class="btn btn-lg btn-primary btn-block">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAPI } from "../axios-api";
import Swal from "sweetalert2";

export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      incorrectAuth: false,
    };
  },
  methods: {
    async register() {
      const register_data = {
        username: this.username,
        password: this.password,
      };
      await getAPI
        .post("/accounts/register/", register_data)
        .then(() => {
          Swal.fire({
            title: "Succefully registered!",
            icon: "success",
            confirmButtonText: "Ok",
          });
          this.$router.push({ name: "login" });
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
