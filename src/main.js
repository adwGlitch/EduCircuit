import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// ── Routes ───────────────────────────────────────────────────────────────────
import LandingPage from './pages/LandingPage.vue'
import Dashboard from './pages/Dashboard.vue'
import LessonView from './pages/LessonView.vue'
import MentorPanel from './pages/MentorPanel.vue'
import AdminPanel from './pages/AdminPanel.vue'
import CertificateView from './pages/CertificateView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LandingPage },
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
app.mount('#app')
