import { createApp } from 'vue'
import App from '@/App.vue'
import Home from '@/components/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'

// Import our custom CSS
import '@/scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faFutbol, faArrowsSpin, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(faUser, faInstagram, faXTwitter, faFutbol, faArrowsSpin, faTrash, faPenToSquare)

const pinia = createPinia()

const NotFound = () => import('@/components/NotFound.vue')
const Entradas = () => import('@/components/Entradas.vue')
const Equipos = () => import('@/components/Equipos.vue')
const ListaEventos = () => import('@/components/ListaEventos.vue')
const ListaEventosAPI = () => import('@/components/ListaEventosAPI.vue')

const routes = [
    { path: '/', redirect: '/home'},
    { path: '/home', component: Home, name: 'home' },
    { path: '/entradas', component: Entradas, name: 'entradas' },
    { path: '/equipos', component: Equipos, name: 'equipos' },
    { path: '/listaeventos', component: ListaEventos, name: 'listaeventos' },
    { path: '/listaeventosAPI', component: ListaEventosAPI, name: 'listaeventosAPI' },
    { path: '/:pathMatch(.*)', component: NotFound, name: 'notfound'}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

import { useAuthStore } from '@/stores/auth'
router.beforeEach(async (to, from) => {  
  const auth = useAuthStore()
  if (!auth.esAdmin && (to.name === 'listaeventos' || to.name === 'listaeventosAPI' || to.name === 'entradas')) {
    return { name: 'home' }
  }
})

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(pinia)

app.mount('#app')


// createApp(App).mount('#app')
