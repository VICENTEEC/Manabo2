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
      console.log("en el store, lo que recibe: ", partido)
      const nuevoHref = `http://pruebaapi1-lonchezas.b4a.run/api/partidos/${this.partidos.length + 1}`
      const partidoConLinks = {
        ...partido,
        _links: { 
          self: {
            href: nuevoHref
          },
          partido: {
            href: nuevoHref
          },
          sucesos: {
            href: `${nuevoHref}/sucesos`
          }
        }
      }
      // this.partidos.push(partidoConLinks)
      this.partidos.unshift(partidoConLinks)
    },

    eliminarPartido(partidoId) {
      console.log("Estouy en el store: ", partidoId)
      const partidoIndex = this.partidos.findIndex(p => p._links.self.href === partidoId)
      if(partidoIndex !== -1) {
        this.partidos.splice(partidoIndex,1)
      }

    },

    actualizarPartido(partidoId) {
      console.log("Desde el store, partidoActualizado", partidoId)
      const index = this.partidos.findIndex(p => p._links.self.href === partidoId.url)
      console.log("Desde el store, indice de partidoActualizado", index)
      if (index !== -1) {
        this.partidos[index].idLocal = partidoId.idLocal
        this.partidos[index].idVisitante = partidoId.idVisitante
        this.partidos[index].golesLocal = partidoId.golesLocal
        this.partidos[index].golesVisitante = partidoId.golesVisitante
        this.partidos[index].timestamp = partidoId.timestamp
      }
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