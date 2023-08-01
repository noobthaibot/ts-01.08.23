import { createRouter, createWebHashHistory } from 'vue-router'
import LoginForm from "@/components/LoginForm.vue";
import GameComponent from "@/components/GameComponent.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginForm
  },
  {
    path: '/game',
    name: 'game',
    component: GameComponent
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
