<script>
export default {
  props: ['partidosss'],
  emits: ['incrementar-goles-local', 'incrementar-goles-visitante', 'resetear-goles', 'eliminar-partido', 'editar-partido'],
  // data() {
  //   return {
  //     golesLocal: 0,
  //     golesVisitante: 0
  //   }
  // },

  methods: {
    incrementarGolesLocal() {
      // console.log("Incrementando goles local: ", this.golesLocal)
      // this.golesLocal++
      console.log("Evento desde componente hijo: ", this.partidosss._links.self.href)
      this.$emit('incrementar-goles-local', this.partidosss._links.self.href)
    },

    incrementarGolesVisitante() {
      // this.golesVisitante++
      this.$emit('incrementar-goles-visitante', this.partidosss._links.self.href)
    },

    resetearGoles() {
      this.$emit('resetear-goles', this.partidosss._links.self.href)
    },

    editarPartido() {
      this.$emit('editar-partido', this.partidosss)
    }
  }
}

</script>

<template>
  <div class="card text-center">
    <div class="card-header">
      Champions League
    </div>
    <div class="card-body">

      <div class="container text-center">
        <div class="row justify-content-end">
          <div class="col-4">
            <h3>{{ partidosss.idLocal }} VS {{ partidosss.idVisitante }}</h3>
          </div>
          <div class="col-4">





            <font-awesome-icon :icon="['fas', 'trash']" class="icono-fontawesome me-3" size="xl"
            @click="$emit('eliminar-partido', partidosss._links.self.href)"/>
            <font-awesome-icon 
            :icon="['fas', 'pen-to-square']" 
            class="icono-fontawesome me-3" 
            size="xl"
            @click="editarPartido" />
         
         
        
          </div>
        </div>
      </div>
      <!-- DEJAR COMENTADO CUANDO VAYA A TRABAJAR CON LOS DATOS DE LA API, PORQUE NO EXISTE LA PROPIEDAD FECHA-HORA -->
      <!-- <p>Fecha del partido: {{ new Date(partido.timestamp).toLocaleDateString() }}</p> -->
      <span @click="incrementarGolesLocal">
        <font-awesome-icon :icon="['fas', 'futbol']" class="icono-fontawesome me-3" size="xl" />
      </span>

      <span @click="incrementarGolesVisitante">
        <font-awesome-icon :icon="['fas', 'futbol']" class="icono-fontawesome me-3" size="xl" style="color: #ed333b;" />
      </span>
      <h1>{{ partidosss.golesLocal }} | {{ partidosss.golesVisitante }}</h1>

      <span @click="resetearGoles">
        <font-awesome-icon :icon="['fas', 'arrows-spin']" class="icono-fontawesome me-3" size="xl" />
      </span>


    </div>
    <div class="card-footer text-body-secondary">
      2 days ago
    </div>
  </div>
</template>

<style scoped>
.icono-fontawesome {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.icono-fontawesome:hover {
  transform: scale(1.5);
}
</style>