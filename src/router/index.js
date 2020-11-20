import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/usuario/login.vue'
import Registro from '../views/usuario/registrarse.vue'
import Editaruser from '../views/usuario/editar.vue'
import Perfil from '../views/usuario/perfil.vue'
import Categorias from '../views/categorias/categoria.vue'
import Productos from '../views/productos/productos.vue'
import Crearproducto from '../views/productos/crear.vue'

const routes = [
  {
    path: '/editar-usuario',
    name: 'Editar usuario',
    component: Editaruser,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/crear-producto',
    name: 'Crear',
    component: Crearproducto,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/productos',
    name: 'Productos',
    component: Productos,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/categoria',
    name: 'Categoria',
    component: Categorias,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registrarse',
    name: 'Registrarse',
    component: Registro
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>{
  if(to.matched.some((record)=>record.meta.requireAuth)){
    const token = localStorage.getItem('token')
    if(!token)
    {
      next('/login')
    }
  }

  next()
})

export default router
