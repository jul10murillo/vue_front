<template>
  <div id="app">
    <div class="container">
      <b-form @submit.prevent="onSubmit" @reset="onReset()">
        <b-form-group id="input-group-2" label="Nombre del interesado:" label-for="input-2">
          <b-form-input id="input-2" v-model="name" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Telefono:" label-for="input-3">
          <b-form-input id="input-3" v-model="phone" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="email:" label-for="input-4">
          <b-form-input id="input-4" v-model="email" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Guardar</b-button>
        <b-button type="reset" variant="danger">Borrar</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      phone: "",
    };
  },
  methods: {
    onSubmit: function () {
      const token = localStorage.getItem("token");
      console.log(this.form);
      const params = {
        name: this.name,
        email: this.email,
        phone: this.phone,
      };
      axios
        .post("http://127.0.0.1:8000/api/interested", params, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          alert("Guardado con éxito");
        });
      this.onReset();
    },
    onReset: function () {
      // Reset our form values

      this.name = "";
      this.email = "";
      this.phone = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>