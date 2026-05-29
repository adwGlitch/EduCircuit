<template>
  <nav class="navbar" style="border-bottom: 1px solid rgba(255,255,255,0.05); background: #000000; position: sticky; top: 0; z-index: 100;">
    <div class="navbar-inner container" style="display: flex; justify-content: space-between; align-items: center; height: 64px;">
      <!-- Brand -->
      <router-link to="/" class="brand" style="display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 18px; color: #ffffff;">
        <div class="brand-icon" style="font-size: 20px;">⚡</div>
        Circuitron
      </router-link>

      <!-- Nav links and Auth Actions -->
      <div class="nav-links" style="display: flex; align-items: center; gap: 16px;">
        <template v-if="store.isLoggedIn">
          <!-- Role Specific Navigation Links -->
          <router-link v-if="store.currentRole === 'student'" to="/dashboard" class="btn btn-ghost btn-sm" style="color:white; border-color:rgba(255,255,255,0.2);">Student Dashboard</router-link>
          <router-link v-if="store.currentRole === 'mentor'" to="/mentor" class="btn btn-ghost btn-sm" style="color:white; border-color:rgba(255,255,255,0.2);">Mentor Board</router-link>
          <router-link v-if="store.currentRole === 'admin'" to="/admin" class="btn btn-ghost btn-sm" style="color:white; border-color:rgba(255,255,255,0.2);">Admin Board</router-link>

          <!-- User Card -->
          <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); padding: 5px 12px; border-radius: 999px;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; color: #000000; font-size: 10px; font-weight: 700;">
              {{ store.currentUser?.avatar || 'U' }}
            </div>
            <span style="font-size: 12px; font-weight: 600; color: #ffffff;">
              {{ store.currentUser?.name?.split(' ')[0] || 'User' }}
            </span>
            <span style="font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; background: rgba(0,0,0,0.5); padding: 2px 6px; border-radius: 4px; margin-left: 4px; border:1px solid rgba(255,255,255,0.1);">
              {{ store.currentRole }}
            </span>
          </div>

          <!-- Sign Out -->
          <button @click="handleSignOut" class="btn btn-dark btn-sm" style="background:#ffffff; color:#000000;">Sign Out</button>
        </template>

        <template v-else>
          <router-link to="/login" class="btn btn-primary btn-sm" style="background:#ffffff; color:#000000; border:none; font-weight:800;">Sign In / Sign Up</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useCircuitronStore } from '../stores/circuitron'
import { useRouter } from 'vue-router'

const store = useCircuitronStore()
const router = useRouter()

function handleSignOut() {
  store.logout()
  router.push('/')
}
</script>
