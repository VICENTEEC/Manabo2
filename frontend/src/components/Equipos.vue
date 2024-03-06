<script>
import participantes from '@/assets/participantes.json'

export default {
  data() {
    return {
      equipos: participantes._embedded.participantes,
      mostrarTotalEquipos: false,
      enfrentamiento: '',
      numPartidos: 0
    }
  },

  computed: {
    estadoEnfrentamiento() {
      return this.enfrentamiento.includes('Real Madrid') ? 'Partido Real Madrid' : '....'
    },
    avisoPartidos() {
      return this.numPartidos > 5? `Has generado ${this.numPartidos}` : 'Aún no has generado más de 5 partidos aleatorios'
    }
  },

  watch: {
    numPartidos(nuevoValor, antiguoValor) {
      if (nuevoValor === 15) {
        this.$router.push({ name: 'home' })
      }
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
    <h1 :class=" {'titulo-rojo': equipos.length > 19, 'titulo-azul':equipos.length <= 19, 'mt-3': true }">EQUIPOS</h1>
    <ul :style="{ fontSize: equipos.length > 10 ? '14px' : '18px'}">
      <li v-for="equipo in equipos" :key="equipo.id">
        <a :href="equipo._links.self.href">{{ equipo.nombre }}</a>
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
    <h2>{{ estadoEnfrentamiento }}</h2>
    <h2>{{ avisoPartidos }}</h2>
    <h2>{{ numPartidos }}</h2>
  </div>
</template>

<style scoped>
.titulo-rojo {
  color:red;
}

.titulo-azul {
  color: blue;
}

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
