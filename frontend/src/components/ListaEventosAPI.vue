<script>
// import partidos from '@/assets/partidos.json'
import Evento from '@/components/Evento.vue'
import Formulario from '@/components/Formulario.vue'
import { mapState, mapActions } from 'pinia'
import { usePartidosAPIStore } from '@/stores/partidosAPI'
import { Modal } from 'bootstrap'

export default {
  components: { Evento, Formulario },
  // data() {
  //   return {
  //     eventos: partidos._embedded.partidos,
  //   }
  // },
  data() {
    return {
      partidoAEditar: null,
      editando: false,
    }
  },

  computed: {
    ...mapState(usePartidosAPIStore, ['partidos'])
  },

  methods: {
    ...mapActions(usePartidosAPIStore, ['actualizarGoles', 'reiniciarGoles', 'eliminarPartido', 'actualizarPartido', 'anadirPartido']),

    incrementarGolesLocal(partidoHref) {
      this.actualizarGoles(partidoHref, 1, 0)
    },

    incrementarGolesVisitante(partidoHref) {
      this.actualizarGoles(partidoHref, 0, 1)
    },

    resetearGoles(partidoHref) {
      this.reiniciarGoles(partidoHref)
    },

    borrarPartido(partidoHref) {
      console.log("partido a eliminar: ", partidoHref)
      this.eliminarPartido(partidoHref)
    },

    editarPartido(partido) {
      console.log("El partido para editar desde ListaEventos.vue es: ", partido)
      this.partidoAEditar = partido
      console.log("El partidoAEditar desde ListaEventos.vue es: ", this.partidoAEditar)
      this.editando = true
      let modalElement = this.$refs.formularioModal
      let bsModal = new Modal(modalElement)
      bsModal.show()
    },

    abrirModalNuevoPartido() {
      // this.partidoAEditar = { idLocal: '', idVisitante: '', golesLocal: 0, golesVisitante: 0, timestamp: '' }
      this.partidoAEditar = { idLocal: '', idVisitante: '', golesLocal: 0, golesVisitante: 0 }
      this.editando = false
      let modalElement = this.$refs.formularioModal
      let bsModal = new Modal(modalElement)
      bsModal.show()
    },

    enviarFormulario(partido) {
      console.log("Datos recibidos del formulario: ", partido)
      this.anadirPartido(partido)
      this.editando = false
      this.partidoAEditar = null
    },

    actualizarFormulario(partidoActualizado) {
      console.log("Actualizando partido: ", partidoActualizado)
      this.actualizarPartido(partidoActualizado)
      this.editando = false
      this.partidoAEditar = null
    },

    resetearPartidoyEditando() {
      this.editando = false
      this.partidoAEditar = null
    }
  }
}
</script>

<template>
  <div class="container">
          <h1 class="titulo p-4">EVENTOS</h1>
          <!-- <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Añadir</button> -->
          <button type="button" class="btn btn-success" @click="abrirModalNuevoPartido">Añadir</button>
    <!-- <ul>
      <li v-for="partido in eventos" :key="partido._links.self.href">
        <Evento :partido="partido"></Evento>
      </li>
    </ul> -->
    <ul>
      <li v-for="partido in partidos" :key="partido._links.self.href">
        <Evento :partidosss="partido" 
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
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetearPartidoyEditando"></button>
      </div>
      <div class="modal-body">
        <Formulario
        :partido="partidoAEditar" 
        :editando="editando"
        @formulario-relleno="enviarFormulario"
        @formulario-actualizado="actualizarFormulario"
        ></Formulario>
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