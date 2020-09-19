<template>
  <div>
    <div class="col-md-4 offset-md-4">
      <li class="list-group-item" v-for="error in errors" :key="errors.indexOf(error)">
        <b-alert show variant="danger">{{ error }}</b-alert>
      </li>
      <h6 v-if="activity.activity">{{activity.activity.title}}</h6>
      <span v-show="fields.email && fields.email.valid">I'm valid</span>
      <b-form @submit.prevent="register" class="register">
        <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="name"
            v-validate="'required'"
            type="text"
            placeholder="Ingresar Nombre"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Email:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="email"
            type="email"
            v-validate="'required'"
            placeholder="Ingresar Email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Contraseña:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="password"
            v-validate="'required'"
            placeholder="Ingresar Contraseña"
            type="password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Registrar</b-button>

      </b-form>
    </div>
  </div>
</template>
<script>
let activity = {}
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      is_admin: null,
      errors:[],
      activity:{}
    };
  },
  methods: {
    register: function () {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin,
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch((err) => this.errors.push("Algo salió mal, actualice e intente nuevamente."));
    },
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700|Poppins:400,500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}

body {
  display: flex;
  justify-content: center;
  font-family: 'Kumbh Sans', sans-serif;
  background-image: url(https://images.unsplash.com/photo-1568035315233-41f17f324cb0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80);
  background-position: center;
  background-size: cover;
  height: 1200px;
}

.register {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0;
  width: 380px;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-family: 'Montserrat',sans-serif;
  box-shadow: -4px 4px 12px 1px rgba(0,0,0,0.4);
}

.register header {
  margin-bottom: 25px;
  font-weight: 600;
  font-size: 33px;
  font-weight: 600;
  margin: 0 0 35px 0;
}

.field {
  background-color: #fff;
  width: 100%;
  margin-bottom: 15px;
  display: flex;
}

.field span {
  color: #222;
  width: 40px;
  line-height: 45px;
  text-align: center;
}

.field input {
  width: 100%;
  height: 45px;
  font-size: 1.1rem;
  padding: 5px;
  color: #34495e;
  border: none;
}

.field input::placeholder {
  color: #95a5a6;
}

input:focus, input:active, input:hover {
  outline: none;
}

.forgot-password {
  width: 100%;
  margin-bottom: 15px;
}

.forgot-password a {
  color: #FFF;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

.submit {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45px;
  margin-bottom: 45px;
  font-family: 'Poppins',sans-serif;
  font-size: 1.2rem;
  color: #fff;
  background-color: #0074D9;
  border: none;
  transition: all 0.2s linear;
}

.submit:hover {
   cursor: pointer;
   background-color: #0070d1;
}

.login-form-copy {
  margin-bottom: 15px;
}

.login-form__sign-up {
  text-decoration: none;
  color: #3498db;
}

.login-form__sign-up:hover {
  text-decoration: underline;
}

</style>