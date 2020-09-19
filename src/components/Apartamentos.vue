<template>
  <div id="app">
    <div>
      <b-button v-bind:href="'apartamento/crear'" variant="primary">Nuevo Apartamento</b-button>
      <br>
      <br>
      <div class="d-flex justify-content-center">
        <ul>
          <ol v-for="item in items" v-bind="item">
            <b-card tag="article" style="max-width: 20rem;" class="mb-2" no-body>
              <img
                src="https://www.metrocuadrado.com/noticias/sites/default/files/styles/full_image/public/field/image/montereserva-apto.jpg"
              />
              <b-card-text>{{item.name}}</b-card-text>

              <b-button v-bind:href="'apartamento?id='+item.id" variant="primary">Ir al apartamento</b-button>
            </b-card>
          </ol>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: "",
    };
  },
  mounted: function () {
    this.getItems();
  },
  methods: {
    getItems: function () {
      const token = localStorage.getItem("token");
      axios
        .get("http://127.0.0.1:8000/api/apartments", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          this.items = response.data;
        });
    },
  },
};
</script>
