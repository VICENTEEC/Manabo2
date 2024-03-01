<script>
import participantes from '@/assets/participantes.json'

export default {
  data() {
    return {
      equipos: participantes._embedded.participantes,
      mostrarTotalEquipos: false,
      enfrentamiento: ''
    }
  },
  methods: {
    calcularEnfrentamiento() {
      if (this.equipos.length >= 2) {
        const indice1 = Math.floor(Math.random() * this.equipos.length)
        let indice2 = Math.floor(Math.random() * this.equipos.length)

        while (indice1 === indice2) {
          indice2 = Math.floor(Math.random() * this.equipos.length)
        }
        const equipo1 = this.equipos[indice1].nombre
        const equipo2 = this.equipos[indice2].nombre
        this.enfrentamiento = `${equipo1} VS ${equipo2}`
        this.numPartidos++
      } else {
        this.enfrentamiento = 'No hay suficientes equipos para calcular un enfrentamiento.'
      }
    }
  }
}

</script>

<template>
  <div class="container">
    <h1 class="titulo mt-4">EQUIPOS</h1>
    <ul>
      <li v-for="equipo in equipos" :key="equipo.id">
        {{ equipo.nombre }}
      </li>
      <div>
        <button type="button" class="btn btn-info me-3 mb-3" @click="mostrarTotalEquipos = !mostrarTotalEquipos">Numero de
          equipos</button>
        <span v-if="mostrarTotalEquipos">{{ equipos.length }}</span>
      </div>
      <div>
        <button type="button" class="btn btn-success me-3" @click="calcularEnfrentamiento()">Calcular Enfrentamiento</button>
        <span v-if="enfrentamiento">{{ enfrentamiento }}</span>
      </div>

      <div v-if="equipos.length >= 5">
        <h2>Más de 5 equipos</h2>
      </div>
      <div v-else-if="equipos.length < 5">
        <h2>Menos de 5 equipos</h2>
      </div>
      <div v-else>
          <h2>No hay equipos</h2>
      </div>

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
