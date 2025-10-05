import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Aplicacion from '@/Aplicacion.vue';
import Inicio from '@/vistas/Inicio.vue';
import Postales from '@/vistas/Postales.vue';
import Enviado from '@/vistas/Enviado.vue';

const routes = [
  { path: '/', component: Inicio, name: 'inicio' },
  { path: '/postales', component: Postales, name: 'postales' },
  { path: '/enviado', component: Enviado, name: 'enviado' },
];

const router = createRouter({ history: createWebHistory(), routes });

createApp(Aplicacion).use(router).mount('#aplicacion');
