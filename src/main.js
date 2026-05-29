import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// ── Routes ───────────────────────────────────────────────────────────────────
import LandingPage from './pages/LandingPage.vue'
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import Dashboard from './pages/Dashboard.vue'
import LessonView from './pages/LessonView.vue'
import MentorPanel from './pages/MentorPanel.vue'
import AdminPanel from './pages/AdminPanel.vue'
import CertificateView from './pages/CertificateView.vue'
import { useCircuitronStore } from './stores/circuitron'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/dashboard', component: Dashboard },
    { path: '/lesson/:day', component: LessonView, props: true },
    { path: '/mentor', component: MentorPanel },
    { path: '/admin', component: AdminPanel },
    { path: '/certificate', component: CertificateView },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)

router.beforeEach((to, from, next) => {
  const store = useCircuitronStore()
  const publicPages = ['/', '/login', '/register']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !store.isLoggedIn) {
    return next('/login')
  }

  if (store.isLoggedIn) {
    if (to.path === '/login') {
      if (store.currentRole === 'admin') return next('/admin')
      if (store.currentRole === 'mentor') return next('/mentor')
      return next('/dashboard')
    }

    // Role specific pages protection
    if (to.path === '/admin' && store.currentRole !== 'admin') {
      return next('/dashboard')
    }
    if (to.path === '/mentor' && store.currentRole !== 'mentor') {
      return next('/dashboard')
    }
  }

  next()
})

app.mount('#app')
