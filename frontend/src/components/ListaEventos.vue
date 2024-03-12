<script>
// import partidos from '@/assets/partidos.json'
import Evento from '@/components/Evento.vue'
import Formulario from '@/components/Formulario.vue'
import { mapState, mapActions } from 'pinia'
import { usePartidosStore } from '@/stores/partidos'
import { Modal } from 'bootstrap'

export default {
  components: { Evento, Formulario },
  data() {
    return {
      partidoAEditar: '',
      editando: false
    }
  },

  // data() {
  //   return {
  //     eventos: partidos._embedded.partidos
  //   }
  // }

  computed: {
    ...mapState(usePartidosStore, ['partidos'])
  },

  methods: {
    ...mapActions(usePartidosStore, ['actualizarGoles', 'reiniciarGoles', 'eliminarPartido', 'anadirPartido', 'actualizarPartido']),

    incrementarGolesLocal(partidoHref) {
      console.log("Estamos en listaeventos.vue: ", partidoHref)
      this.actualizarGoles(partidoHref, 1, 0)
    },

    incrementarGolesVisitante(partidoHref) {
      this.actualizarGoles(partidoHref, 0, 1)
    },

    resetearGoles(partidoHref){
      this.reiniciarGoles(partidoHref)
    },

    borrarPartido(partidoHref){
      console.log("partido a eliminar: ", partidoHref)
      this.eliminarPartido(partidoHref)
    },

    enviarFormulario(partido){
      console.log("Datos recibidos del formulario: ", partido)
      this.anadirPartido(partido)
    },

    editarPartido(partido) {
      console.log("Partido para editar: ", partido)
      this.partidoAEditar = partido
      this.editando = true
      let modalElement = this.$refs.formularioModal
      let bsModal = new Modal(modalElement)
      bsModal.show()
    },

    actualizarFormulario(partidoActualizado) {
      console.log("Actualizando partido: ", partidoActualizado)
      this.actualizarPartido(partidoActualizado)

    }
  }

}

</script>

<template>
<div class="container">
  <h1 class="titulo p-4">EVENTOS</h1>
  <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Añadir</button>
  <!-- <ul>
    <li v-for="partido in eventos">
      {{ partido.idLocal }} VS {{ partido.idVisitante }}
    </li>
  </ul> -->

  <ul>
    <li v-for="partido in partidos" :key="partido._links.self.href">
      <Evento 
      :partidosss="partido"
      @incrementar-goles-local="incrementarGolesLocal"
      @incrementar-goles-visitante="incrementarGolesVisitante"
      @resetear-goles="resetearGoles"
      @eliminar-partido="borrarPartido"
      @editar-partido="editarPartido"
      ></Evento>
    </li>
  </ul>

</div>






<!-- Modal -->
<!-- <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"> -->
<div class="modal fade" id="staticBackdrop" ref="formularioModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <Formulario
          :partido="partidoAEditar"
          :editando="editando"
          @formulario-relleno="enviarFormulario"
          @formulario-actualizado="actualizarFormulario"
        ></Formulario>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>




</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.titulo {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
  text-align: left;
}

li {
  margin: 10px 0;
}
</style>