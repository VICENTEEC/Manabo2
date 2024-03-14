<script>
import { useAuthStore } from '@/stores/auth'
import { mapState, mapActions } from 'pinia'

export default {
  computed: {
    ...mapState(useAuthStore, ['tipoUsuario', 'esAdmin']),

    cambioUsuario: {
      get() {
        return this.esAdmin
      },
      set(value) {
        this.cambiarNivel()
      }
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['cambiarNivel'])
  }
}
</script>

<template>
<nav class="navbar navbar-expand-lg bg-amarillo">
  <div class="container-fluid">
    <router-link class="nav-link" to="/home">HOME</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/equipos">Equipos</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/listaeventos">Lista Eventos</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/entradas">Entradas</router-link>
        </li>
      </ul>
    </div>
    <div class="form-check form-switch form-check-reverse">
      <input class="form-check-input" type="checkbox" id="flexSwitchCheckReverse"  v-model="cambioUsuario">
      <label class="form-check-label" for="flexSwitchCheckReverse">{{ tipoUsuario }}</label>
    </div>
  </div>
</nav>
</template>

<style scoped>
.bg-amarillo{
  background-color: #ffc400;
}
</style>
