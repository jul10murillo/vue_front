<template>
  <div id="app">
    <div class="container">
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="input-group-2" label="Nombre del apartamento:" label-for="input-2">
          <b-form-input id="input-2" v-model="form.name" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Dirección:" label-for="input-3">
          <b-form-input id="input-3" v-model="form.address" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Descripción:" label-for="input-4">
          <b-form-textarea id="input-4" v-model="form.description" required></b-form-textarea>
        </b-form-group>

        <b-form-group id="input-group-4" label="Precio:" label-for="input-4">
          <b-form-input id="input-4" v-model="form.price" required></b-form-input>
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
      form: {
        price: "",
        name: "",
        description: "",
        address: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit: function () {
      const token = localStorage.getItem("token");
      axios
        .post("http://127.0.0.1:8000/api/apartments", this.form, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          alert("Guardado con éxito");
        });
      // this.onReset();
    },
    onReset: function () {
      // Reset our form values
      this.form.price = "";
      this.form.name = "";
      this.form.description = "";
      this.form.address = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>