<template>
  <div>
    <Navbar />

    <div class="container" style="min-height: calc(100vh - 120px); display: flex; align-items: center; justify-content: center; padding: 40px 24px;">
      <div class="card" style="width: 100%; max-width: 440px; padding: 40px 32px; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg);">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="font-size: 36px; margin-bottom: 8px;">🚀</div>
          <h2 style="font-size: 24px; font-weight: 800; color: var(--slate-900); margin-bottom: 6px;">Join Circuitron</h2>
          <p style="font-size: 13px; color: var(--slate-500);">Create your account to start learning</p>
        </div>

        <!-- Alert -->
        <div v-if="message" :style="{
          background: isError ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)',
          border: `1.5px solid ${isError ? '#fca5a5' : '#86efac'}`,
          padding: '12px 16px',
          borderRadius: 'var(--radius)',
          color: isError ? '#b91c1c' : '#166534',
          fontSize: '13px',
          fontWeight: '600',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }">
          <span>{{ isError ? '⚠️' : '✅' }}</span>
          <span>{{ message }}</span>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister" style="display: flex; flex-direction: column; gap: 18px;">
          <div>
            <label for="reg-name" style="display: block; font-size: 12px; font-weight: 700; color: var(--slate-600); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Full Name</label>
            <input 
              id="reg-name" 
              type="text" 
              v-model="fullName" 
              required
              autocomplete="name"
              placeholder="Your full name"
              style="width: 100%; padding: 12px 16px; border-radius: var(--radius); border: 1.5px solid var(--slate-200); background: var(--slate-50); color: var(--slate-900); font-size: 14px; font-family: inherit; font-weight: 500; transition: border-color 0.15s; outline: none;"
              onfocus="this.style.borderColor='var(--slate-400)'"
              onblur="this.style.borderColor='var(--slate-200)'"
            />
          </div>

          <div>
            <label for="reg-email" style="display: block; font-size: 12px; font-weight: 700; color: var(--slate-600); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Email Address</label>
            <input 
              id="reg-email" 
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
            <label for="reg-password" style="display: block; font-size: 12px; font-weight: 700; color: var(--slate-600); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Password <span style="font-weight:400; text-transform:none; letter-spacing:0;">(min 6 characters)</span></label>
            <input 
              id="reg-password" 
              type="password" 
              v-model="password" 
              required
              autocomplete="new-password"
              placeholder="••••••••"
              style="width: 100%; padding: 12px 16px; border-radius: var(--radius); border: 1.5px solid var(--slate-200); background: var(--slate-50); color: var(--slate-900); font-size: 14px; font-family: inherit; font-weight: 500; transition: border-color 0.15s; outline: none;"
              onfocus="this.style.borderColor='var(--slate-400)'"
              onblur="this.style.borderColor='var(--slate-200)'"
            />
          </div>

          <button type="submit" :disabled="loading" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 12px; font-size: 14px; margin-top: 8px;">
            <span v-if="loading">Creating account…</span>
            <span v-else>Create Account ↗</span>
          </button>
        </form>

        <!-- Login Link -->
        <div style="margin-top: 24px; text-align: center; font-size: 14px; color: var(--slate-600);">
          Already have an account? 
          <router-link to="/login" style="color: var(--slate-900); font-weight: 700; text-decoration: none; border-bottom: 1px solid var(--slate-300);">Sign In</router-link>
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

const fullName = ref('')
const email = ref('')
const password = ref('')
const message = ref('')
const isError = ref(false)
const loading = ref(false)

function handleRegister() {
  message.value = ''
  isError.value = false
  loading.value = true

  setTimeout(() => {
    const result = store.register(email.value.trim(), fullName.value.trim(), password.value)
    loading.value = false

    if (!result.success) {
      isError.value = true
      message.value = result.message
    } else {
      isError.value = false
      message.value = 'Account created! Redirecting to login…'
      setTimeout(() => router.push('/login'), 1200)
    }
  }, 300)
}
</script>
