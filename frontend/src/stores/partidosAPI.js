import { defineStore } from "pinia"
import { getPartidos, postPartidos, deleteEntidad, putEntidad } from "@/stores/api-service.js"

export const usePartidosAPIStore = defineStore("partidosAPI", {
  state: () => ({
    partidos: [],
    partidosCargados: false,
    // partidos: partidosData._embedded.partidos.map((partido) => ({
    //   ...partido,
    //   golesLocal: 0,
    //   golesVisitante: 0,
    // })),
  }),

  getters: {},

  actions: {
    async cargarPartidos() {
      this.partidosCargados = false
      await getPartidos().then((response) => {
        if (response.data._embedded) {
          const partidos = response.data._embedded.partidos
          this.partidos = partidos
        }
        this.partidosCargados = true
        console.log("En el store: ", this.partidos)
      })
    },

    async anadirPartido(nuevoPartido) {
      console.log("En el store, lo que recibe: ", nuevoPartido)
      try {
        const responsePartidos = await postPartidos(nuevoPartido)
        console.log("La respuesta de la API es: ", responsePartidos)
        if (responsePartidos.status === 200) {
          const partidoAgregado = { ...nuevoPartido, _links: responsePartidos.data._links }
          this.partidos.unshift(partidoAgregado)
        }
      } catch (error) {
        console.error("Error: ", error)
      }
    },

    async eliminarPartido(partidoId) {

    },

    async eliminarPartido(partidoId) {
      console.log("En el store, lo que recibe: ", partidoId)
      try {
        const response = await deleteEntidad(partidoId)
        if (response.status === 200) {
          const index = this.partidos.findIndex(p => p._links.self.href === partidoId)
          if (index !== -1) {
            this.partidos.splice(index, 1)
          }
        }
      } catch (error) {
        console.error("Error: ", error)
      }
    },

    async actualizarGoles(partidoId, golesLocal, golesVisitante) {
      console.log("En el store, actualizando goles: ", partidoId, golesLocal, golesVisitante)
      const partidoIndex = this.partidos.findIndex(p => p._links.self.href === partidoId)
      if (partidoIndex !== -1) {
        try {
          const datosActualizados = {
            idLocal: this.partidos[partidoIndex].idLocal,
            idVisitante: this.partidos[partidoIndex].idVisitante,
            golesLocal: this.partidos[partidoIndex].golesLocal + golesLocal,
            golesVisitante: this.partidos[partidoIndex].golesVisitante + golesVisitante,
          }

          const response = await putEntidad(this.partidos[partidoIndex]._links.self.href, datosActualizados)

          if (response.status === 200) {
            this.partidos[partidoIndex].golesLocal = datosActualizados.golesLocal
            this.partidos[partidoIndex].golesVisitante = datosActualizados.golesVisitante
            console.log("Goles actualizados en API y en el store", partidoId)
          } else {
            console.error("la petición PUT no fue exitosa")
          }
        } catch (error) {
          console.error("Error: ", error)
        }
      }
    },

    async reiniciarGoles(partidoId) {

    },
  },
})
