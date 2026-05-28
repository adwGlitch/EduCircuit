<template>
  <nav class="navbar">
    <div class="navbar-inner container">
      <!-- Brand -->
      <router-link to="/" class="brand">
        <div class="brand-icon">⚡</div>
        Circuitron
      </router-link>

      <!-- Role Switcher -->
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:12px;font-weight:600;color:var(--slate-400);text-transform:uppercase;letter-spacing:0.06em;">Demo Role:</span>
        <div class="role-switcher">
          <button v-for="role in ['student','mentor','admin']" :key="role"
            class="role-btn" :class="{ active: store.activeRole === role }"
            @click="switchRole(role)">
            {{ role.charAt(0).toUpperCase() + role.slice(1) }}
          </button>
        </div>
      </div>

      <!-- Nav links -->
      <div class="nav-links">
        <router-link to="/dashboard" class="btn btn-ghost btn-sm">Dashboard</router-link>
        <div style="display:flex;align-items:center;gap:8px;background:var(--slate-100);padding:5px 12px;border-radius:999px;">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:700;">
            {{ store.currentUser.avatar }}
          </div>
          <span style="font-size:13px;font-weight:600;color:var(--slate-700);">{{ store.currentUser.name.split(' ')[0] }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useCircuitronStore } from '../stores/circuitron'
import { useRouter } from 'vue-router'

const store = useCircuitronStore()
const router = useRouter()

function switchRole(role) {
  store.activeRole = role
  if (role === 'mentor') router.push('/mentor')
  else if (role === 'admin') router.push('/admin')
  else router.push('/dashboard')
}
</script>
