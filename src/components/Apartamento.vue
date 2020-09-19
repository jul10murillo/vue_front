<template>
  <div id="app">
    <div>
      <div class="container">
        <div class="row">
          <!-- derecha -->
          <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted">Asignación de interesados</span>
            </h4>
            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0">Lista de personas</h6>
                  <b-form inline @submit.prevent="postInterested">
                  <b-select v-model="interested" :options="options"></b-select>
                    <b-button type="submit" variant="primary">Agregar</b-button>
                  </b-form>
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0">Personas interesadas</h6>
                  <li v-for="item in interestedData" v-bind="item">
                    {{ item }}
                  </li>
                </div>
              </li>
            </ul>

          </div>
          <!-- izquierda -->
          <div class="col-md-8 order-md-1">
            <h4 class="mb-3"> {{items.name}} </h4>
            <div class="row">
              <div class="col-md-4 mb-3">
                <img src="https://www.metrocuadrado.com/noticias/sites/default/files/styles/full_image/public/field/image/montereserva-apto.jpg" class="img-thumbnail" />
              </div>
              <div class="col-md-8 mb-3">
                <div class="row">
                  <p>Descripcion:  </p>
                  <p class="text-muted"> {{items.description}} </p>
                </div>
                <div class="row">
                  <p>Direccion:  </p>
                  <p class="text-muted"> {{items.address}} </p>
                </div>
                <div class="row">
                  <p>Precio:  </p>
                  <p class="text-muted"> {{items.price}} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      interested: "",
      options: [],
      interestedData:[],
    };
  },
  mounted: function () {
    this.getItems();
    this.getInterested();
    this.getApartementInterested();
  },
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  methods: {
    getItems: function () {
      const token = localStorage.getItem("token");
      axios
        .get("http://127.0.0.1:8000/api/apartments?id=" + this.$route.query.id, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          this.items = response.data[0];
        });
    },
    getInterested: function () {
      const token = localStorage.getItem("token");
      axios
        .get("http://127.0.0.1:8000/api/interested?apartment_id=" + this.$route.query.id, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          this.options = response.data;
        });
    },
    postInterested: function () {
      const token = localStorage.getItem("token");
      var params = {
        interested_id: this.interested,
        apartment_id: this.$route.query.id,
      };

      axios
        .post("http://127.0.0.1:8000/api/apartment_interested", params, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          this.rows = response.data;
        });
        this.getApartementInterested();
        this.getInterested();
    },
    getApartementInterested: function () {
      const token = localStorage.getItem("token");

      axios
        .get("http://127.0.0.1:8000/api/apartment_interested?id_apartment=" + this.$route.query.id, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          this.interestedData = response.data;
        });
    },
  },
};
</script>