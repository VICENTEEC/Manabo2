<script>
import partidos from '@/assets/partidos.json'
import Evento from '@/components/Evento.vue'
import { mapState, mapActions } from 'pinia'
import { usePartidosStore } from '@/stores/partidos'

export default {
  components: { Evento },
  // data() {
  //   return {
  //     eventos: partidos._embedded.partidos
  //   }
  // }

  computed: {
    ...mapState(usePartidosStore, ['partidos'])
  },

  methods: {
    ...mapActions(usePartidosStore, ['actualizarGoles', 'reiniciarGoles', 'eliminarPartido']),

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
    }
  }

}

</script>

<template>
<div class="container">
  <h1 class="titulo p-4">EVENTOS</h1>
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
      ></Evento>
    </li>
  </ul>

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