import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
/*
  Rutas URL del sistema 
*/
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  },
  {
    path: '/productos/:id',
    name: 'productos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Productos.vue')
  },
  {
    path: '/productosinicio/:id',
    name: 'productosinicio',
    component: () => import(/* webpackChunkName: "about" */ '../views/Productosinicio.vue')
  },
  {
    path: '/detalle/:id',
    name: 'detalle',
    component: () => import(/* webpackChunkName: "about" */ '../views/Detalle.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
