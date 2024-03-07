import { defineStore } from "pinia"
import partidosData from '@/assets/partidos.json'

export const usePartidosStore = defineStore('partidos', {
  state: () => ({
    partidos: partidosData._embedded.partidos.map((partido) => ({
      ...partido,
      golesLocal: 0,
      golesVisitante: 0
    }))
  }),

  getters: {

  },

  actions: {
    anadirPartido(partido) {

    },

    eliminarPartido(partidoId) {
      console.log("Estouy en el store: ", partidoId)
      const partidoIndex = this.partidos.findIndex(p => p._links.self.href === partidoId)
      if(partidoIndex !== -1) {
        this.partidos.splice(partidoIndex,1)
      }

    },

    actualizarPartido(partidoId, nuevoPartido) {

    },

    actualizarGoles(partidoId, golesLocal, golesVisitante) {
      const partidoIndex = this.partidos.findIndex(p => p._links.self.href === partidoId)
      if (partidoIndex !== -1) {
        this.partidos[partidoIndex].golesLocal += golesLocal
        this.partidos[partidoIndex].golesVisitante += golesVisitante
      }
    },

    reiniciarGoles(partidoId){
      const partidoIndex = this.partidos.findIndex(p => p._links.self.href === partidoId)
      if (partidoIndex !== -1){
        this.partidos[partidoIndex].golesLocal = 0
        this.partidos[partidoIndex].golesVisitante = 0
      }
    }

  }
})