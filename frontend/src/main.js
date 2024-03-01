import { createApp } from 'vue'
import App from '@/App.vue'
import Home from '@/components/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

// Import our custom CSS
import '@/scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(faUser, faInstagram, faXTwitter)

const NotFound = () => import('@/components/NotFound.vue')
const Entradas = () => import('@/components/Entradas.vue')
const Equipos = () => import('@/components/Equipos.vue')
const Eventos = () => import('@/components/Eventos.vue')

const routes = [
    { path: '/', redirect: '/home'},
    { path: '/home', component: Home, name: 'home' },
    { path: '/entradas', component: Entradas, name: 'entradas' },
    { path: '/equipos', component: Equipos, name: 'equipos' },
    { path: '/eventos', component: Eventos, name: 'eventos' },
    { path: '/:pathMatch(.*)', component: NotFound, name: 'notfound'}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)


app.mount('#app')


// createApp(App).mount('#app')
