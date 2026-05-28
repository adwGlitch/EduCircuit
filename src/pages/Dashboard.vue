<template>
  <div>
    <Navbar />
    <div class="page-header">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
        <div>
          <h1 class="page-title">Welcome back, {{ store.currentUser.name.split(' ')[0] }} 👋</h1>
          <p class="page-sub">{{ today }} · {{ store.completedDays }}/14 days complete</p>
        </div>
        <router-link :to="nextLesson ? `/lesson/${nextLesson.day}` : '/lesson/5'" class="btn btn-primary">
          Continue Day {{ nextLesson?.day ?? 5 }} →
        </router-link>
      </div>

      <!-- Progress bar -->
      <div style="margin-top:20px;background:var(--slate-100);border-radius:999px;height:8px;">
        <div style="height:8px;border-radius:999px;background:var(--primary);transition:width 0.6s ease;" :style="`width:${store.progressPercent}%`"></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:12px;color:var(--slate-400);">
        <span>{{ store.progressPercent }}% complete</span>
        <span>{{ 14 - store.completedDays }} days remaining</span>
      </div>
    </div>

    <div class="page-body">
      <!-- Stat cards -->
      <div class="grid-4" style="margin-bottom:32px;">
        <div class="card" style="padding:20px;" v-for="s in statCards" :key="s.label">
          <div style="font-size:22px;margin-bottom:4px;">{{ s.icon }}</div>
          <div style="font-size:24px;font-weight:800;color:var(--slate-900);">{{ s.value }}</div>
          <div style="font-size:12px;color:var(--slate-500);font-weight:500;">{{ s.label }}</div>
        </div>
      </div>

      <!-- 14-Day Grid -->
      <h2 style="font-size:18px;font-weight:700;margin-bottom:16px;">Your 14-Day Journey</h2>
      <div>
        <div v-for="lesson in store.lessons" :key="lesson.day"
          class="day-card"
          :class="{ locked: lesson.status === 'locked' }"
          @click="lesson.status !== 'locked' && $router.push(`/lesson/${lesson.day}`)">
          <!-- Day circle -->
          <div class="day-circle" :class="lesson.status">
            <span v-if="lesson.status === 'done'">✓</span>
            <span v-else>{{ lesson.day }}</span>
          </div>
          <!-- Info -->
          <div>
            <div style="font-weight:600;font-size:14px;color:var(--slate-900);">Day {{ lesson.day }} — {{ lesson.title }}</div>
            <div style="font-size:13px;color:var(--slate-500);margin-top:2px;">{{ lesson.summary.slice(0, 80) }}…</div>
            <div class="tag-strip" style="margin-top:6px;">
              <span v-for="tag in lesson.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
          <!-- Right action -->
          <div style="text-align:right;flex-shrink:0;">
            <span v-if="lesson.status === 'done'" class="badge badge-green">✓ Done</span>
            <span v-else-if="lesson.status === 'active'" class="badge badge-blue">In Progress</span>
            <span v-else class="badge badge-gray">🔒 Locked</span>
            <div v-if="lesson.quizScore !== null" style="font-size:12px;color:var(--slate-400);margin-top:4px;">Quiz: {{ lesson.quizScore }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCircuitronStore } from '../stores/circuitron'
import Navbar from '../components/Navbar.vue'

const store = useCircuitronStore()

const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
const nextLesson = computed(() => store.lessons.find(l => l.status === 'active'))

const statCards = computed(() => [
  { icon: '📅', value: `${store.completedDays}/14`, label: 'Days Completed' },
  { icon: '🎯', value: `${store.progressPercent}%`, label: 'Overall Progress' },
  { icon: '📊', value: `${store.avgScore}%`, label: 'Quiz Average' },
  { icon: '🏆', value: store.completedDays >= 14 ? 'Earned!' : 'In Progress', label: 'Certificate' },
])
</script>
