<template>
  <div>
    <Navbar />

    <div class="container" style="min-height: calc(100vh - 120px); display: flex; align-items: center; justify-content: center; padding: 40px 24px;">
      <div class="card" style="width: 100%; max-width: 440px; padding: 40px 32px; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg);">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="font-size: 36px; margin-bottom: 8px;">⚡</div>
          <h2 style="font-size: 24px; font-weight: 800; color: var(--slate-900); margin-bottom: 6px;">Sign In to Circuitron</h2>
          <p style="font-size: 13px; color: var(--slate-500);">Enter your credentials to access your portal</p>
        </div>

        <!-- Error Alert -->
        <div v-if="error" style="background: rgba(239, 68, 68, 0.08); border: 1.5px solid #fca5a5; padding: 12px 16px; border-radius: var(--radius); color: #b91c1c; font-size: 13px; font-weight: 600; margin-bottom: 24px; display: flex; align-items: center; gap: 8px;">
          <span>⚠️</span>
          <span>{{ error }}</span>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" style="display: flex; flex-direction: column; gap: 18px;">
          <div>
            <label for="login-email" style="display: block; font-size: 12px; font-weight: 700; color: var(--slate-600); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Email Address</label>
            <input 
              id="login-email" 
              type="email" 
              v-model="email" 
              required
              autocomplete="email"
              placeholder="name@example.com"
              style="width: 100%; padding: 12px 16px; border-radius: var(--radius); border: 1.5px solid var(--slate-200); background: var(--slate-50); color: var(--slate-900); font-size: 14px; font-family: inherit; font-weight: 500; transition: border-color 0.15s; outline: none;"
              onfocus="this.style.borderColor='var(--slate-400)'"
              onblur="this.style.borderColor='var(--slate-200)'"
            />
          </div>

          <div>
            <label for="login-password" style="display: block; font-size: 12px; font-weight: 700; color: var(--slate-600); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Password</label>
            <input 
              id="login-password" 
              type="password" 
              v-model="password" 
              required
              autocomplete="current-password"
              placeholder="••••••••"
              style="width: 100%; padding: 12px 16px; border-radius: var(--radius); border: 1.5px solid var(--slate-200); background: var(--slate-50); color: var(--slate-900); font-size: 14px; font-family: inherit; font-weight: 500; transition: border-color 0.15s; outline: none;"
              onfocus="this.style.borderColor='var(--slate-400)'"
              onblur="this.style.borderColor='var(--slate-200)'"
            />
          </div>

          <button type="submit" :disabled="loading" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 12px; font-size: 14px; margin-top: 8px;">
            <span v-if="loading">Signing in…</span>
            <span v-else>Sign In ↗</span>
          </button>
        </form>

        <!-- Sign Up Link -->
        <div style="margin-top: 24px; text-align: center; font-size: 14px; color: var(--slate-600);">
          Don't have an account? 
          <router-link to="/register" style="color: var(--slate-900); font-weight: 700; text-decoration: none; border-bottom: 1px solid var(--slate-300);">Sign Up</router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCircuitronStore } from '@/stores/circuitron'
import Navbar from '@/components/Navbar.vue'

const store = useCircuitronStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

function handleLogin() {
  error.value = ''
  loading.value = true

  setTimeout(() => {
    const result = store.login(email.value.trim(), password.value)
    loading.value = false
    if (result.success) {
      if (result.role === 'admin') router.push('/admin')
      else if (result.role === 'mentor') router.push('/mentor')
      else router.push('/dashboard')
    } else {
      error.value = result.message || 'Invalid email or password.'
    }
  }, 300)
}
</script>
