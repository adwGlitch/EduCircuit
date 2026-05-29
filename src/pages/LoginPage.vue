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
        <div v-if="error" style="background: rgba(163, 163, 163, 0.1); border: 1.5px solid var(--slate-300); padding: 12px 16px; border-radius: var(--radius); color: var(--slate-800); font-size: 13px; font-weight: 600; margin-bottom: 24px; display: flex; align-items: center; gap: 8px;">
          <span>⚠️</span>
          <span>{{ error }}</span>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" style="display: flex; flex-direction: column; gap: 18px;">
          <div>
            <label for="email" style="display: block; font-size: 12px; font-weight: 700; color: var(--slate-600); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Email Address</label>
            <input 
              id="email" 
              type="email" 
              v-model="email" 
              required
              placeholder="name@example.com"
              style="width: 100%; padding: 12px 16px; border-radius: var(--radius); border: 1.5px solid var(--slate-200); background: var(--slate-50); color: var(--slate-900); font-size: 14px; font-family: inherit; font-weight: 500; transition: border-color 0.15s; outline: none;"
              onfocus="this.style.borderColor='var(--slate-400)'"
              onblur="this.style.borderColor='var(--slate-200)'"
            />
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label for="password" style="display: block; font-size: 12px; font-weight: 700; color: var(--slate-600); text-transform: uppercase; letter-spacing: 0.05em;">Password</label>
            </div>
            <input 
              id="password" 
              type="password" 
              v-model="password" 
              required
              placeholder="••••••••"
              style="width: 100%; padding: 12px 16px; border-radius: var(--radius); border: 1.5px solid var(--slate-200); background: var(--slate-50); color: var(--slate-900); font-size: 14px; font-family: inherit; font-weight: 500; transition: border-color 0.15s; outline: none;"
              onfocus="this.style.borderColor='var(--slate-400)'"
              onblur="this.style.borderColor='var(--slate-200)'"
            />
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 12px; font-size: 14px; margin-top: 8px;">
            Sign In ↗
          </button>
        </form>

        <!-- Quick Demo Accounts -->
        <div style="margin-top: 36px; padding-top: 24px; border-top: 1px solid var(--slate-200);">
          <div style="font-size: 11px; font-weight: 700; color: var(--slate-400); text-transform: uppercase; letter-spacing: 0.08em; text-align: center; margin-bottom: 16px;">
            Quick Demo Auto-Fill
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button 
              @click="autofill('alex@example.com', 'alex123')"
              class="btn btn-ghost btn-sm" 
              style="width: 100%; justify-content: space-between; font-size: 12px; font-weight: 600;"
            >
              <span>🎓 Student (Alex Mercer - 30%)</span>
              <span style="color: var(--slate-400);">Auto-fill</span>
            </button>
            
            <button 
              @click="autofill('sam@example.com', 'sam123')"
              class="btn btn-ghost btn-sm" 
              style="width: 100%; justify-content: space-between; font-size: 12px; font-weight: 600;"
            >
              <span>🎓 Student (Samantha Chen - 60%)</span>
              <span style="color: var(--slate-400);">Auto-fill</span>
            </button>

            <button 
              @click="autofill('mentor@circuitron.io', 'mentor123')"
              class="btn btn-ghost btn-sm" 
              style="width: 100%; justify-content: space-between; font-size: 12px; font-weight: 600;"
            >
              <span>👩‍🏫 Mentor (Dr. Sarah Kim)</span>
              <span style="color: var(--slate-400);">Auto-fill</span>
            </button>

            <button 
              @click="autofill('admin@circuitron.io', 'admin123')"
              class="btn btn-ghost btn-sm" 
              style="width: 100%; justify-content: space-between; font-size: 12px; font-weight: 600;"
            >
              <span>🛠️ Platform Admin</span>
              <span style="color: var(--slate-400);">Auto-fill</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCircuitronStore } from '../stores/circuitron'
import Navbar from '../components/Navbar.vue'

const store = useCircuitronStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const error = ref('')

onMounted(() => {
  // If role parameter is in query, autofill that specific role for demo ease
  const roleQuery = route.query.role
  if (roleQuery === 'student') {
    autofill('alex@example.com', 'alex123')
  } else if (roleQuery === 'mentor') {
    autofill('mentor@circuitron.io', 'mentor123')
  } else if (roleQuery === 'admin') {
    autofill('admin@circuitron.io', 'admin123')
  }
})

function autofill(demoEmail, demoPassword) {
  email.value = demoEmail
  password.value = demoPassword
  error.value = ''
}

function handleLogin() {
  error.value = ''
  const result = store.login(email.value, password.value)
  if (result.success) {
    if (result.role === 'admin') {
      router.push('/admin')
    } else if (result.role === 'mentor') {
      router.push('/mentor')
    } else {
      router.push('/dashboard')
    }
  } else {
    error.value = result.message || 'Invalid email or password.'
  }
}
</script>
