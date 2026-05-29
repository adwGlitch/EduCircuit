<template>
  <div>
    <Navbar />
    <div class="page-header">
      <h1 class="page-title">Mentor Review Board</h1>
      <p class="page-sub">Review student submissions and provide feedback</p>
    </div>
    <div class="page-body">
      <!-- Stats -->
      <div class="grid-4" style="margin-bottom:32px;">
        <div class="card" style="padding:20px;" v-for="s in mentorStats" :key="s.label">
          <div style="font-size:22px;margin-bottom:4px;">{{ s.icon }}</div>
          <div style="font-size:24px;font-weight:800;color:var(--slate-900);">{{ s.value }}</div>
          <div style="font-size:12px;color:var(--slate-500);font-weight:500;">{{ s.label }}</div>
        </div>
      </div>

      <!-- Filter tabs -->
      <div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
        <button v-for="f in ['All','pending','approved','revision']" :key="f"
          @click="filter = f"
          :class="['btn','btn-sm', filter===f ? 'btn-dark' : 'btn-ghost']">
          {{ f.charAt(0).toUpperCase() + f.slice(1) }}
          <span v-if="f !== 'All'" style="opacity:0.6;font-size:11px;">({{ store.submissions.filter(s=>s.status===f).length }})</span>
        </button>
      </div>

      <!-- Submissions -->
      <div>
        <div v-for="sub in filteredSubmissions" :key="sub.id" class="card" style="padding:24px;margin-bottom:12px;">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
            <div style="display:flex;align-items:center;gap:14px;">
              <div :style="`width:44px;height:44px;border-radius:50%;background:var(--primary-light);color:var(--primary-dark);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;`">{{ sub.avatar }}</div>
              <div>
                <div style="font-weight:700;font-size:15px;">{{ sub.student }}</div>
                <div style="font-size:13px;color:var(--slate-500);">Day {{ sub.day }} — {{ sub.title }}</div>
                <div style="font-size:12px;color:var(--slate-400);margin-top:2px;">{{ sub.type }} · {{ sub.submitted }}</div>
              </div>
            </div>
            <span :class="['badge', sub.status === 'approved' ? 'badge-green' : sub.status === 'revision' ? 'badge-yellow' : 'badge-blue']">
              {{ sub.status === 'pending' ? '⏳ Pending Review' : sub.status === 'approved' ? '✓ Approved' : '🔄 Revision Requested' }}
            </span>
          </div>

          <!-- Student Project Links -->
          <div v-if="sub.codeUrl || sub.demoUrl" style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;">
            <a v-if="sub.codeUrl" :href="sub.codeUrl" target="_blank" class="btn btn-ghost btn-sm" style="font-size:11px;padding:4px 10px;">
              💻 View Code →
            </a>
            <a v-if="sub.demoUrl" :href="sub.demoUrl" target="_blank" class="btn btn-ghost btn-sm" style="font-size:11px;padding:4px 10px;">
              🎥 View Demo →
            </a>
          </div>

          <!-- Existing feedback -->
          <div v-if="sub.feedback" style="margin-top:16px;padding:12px 16px;background:var(--slate-50);border-radius:10px;border-left:3px solid var(--slate-300);">
            <div style="font-size:12px;font-weight:600;color:var(--slate-500);margin-bottom:4px;">Your Feedback:</div>
            <div style="font-size:14px;color:var(--slate-700);">{{ sub.feedback }}</div>
          </div>

          <!-- Action area for pending -->
          <div v-if="sub.status === 'pending'" style="margin-top:16px;">
            <div v-if="activeFeedback === sub.id">
              <textarea v-model="feedbackText" rows="3" placeholder="Write your feedback for the student..." style="margin-bottom:12px;"></textarea>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button @click="approve(sub.id)" class="btn btn-sm btn-primary">✓ Approve</button>
                <button @click="requestRevision(sub.id)" class="btn btn-sm btn-ghost">🔄 Request Revision</button>
                <button @click="activeFeedback=null;feedbackText=''" class="btn btn-ghost btn-sm">Cancel</button>
              </div>
            </div>
            <button v-else @click="activeFeedback=sub.id" class="btn btn-ghost btn-sm">Write Feedback →</button>
          </div>
        </div>
      </div>

      <!-- Student list -->
      <h2 style="font-size:18px;font-weight:700;margin:36px 0 16px;">All Students</h2>
      <div class="card" style="overflow:hidden;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Progress</th>
              <th>Avg Score</th>
              <th>Submissions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in store.students" :key="s.id">
              <td>
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:34px;height:34px;border-radius:50%;background:var(--primary-light);color:var(--primary-dark);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;">{{ s.avatar }}</div>
                  <div>
                    <div style="font-weight:600;font-size:14px;">{{ s.name }}</div>
                    <div style="font-size:12px;color:var(--slate-400);">{{ s.email }}</div>
                  </div>
                </div>
              </td>
              <td>
                <div style="display:flex;align-items:center;gap:8px;">
                  <div style="width:80px;height:6px;background:var(--slate-100);border-radius:999px;">
                    <div style="height:100%;border-radius:999px;background:var(--primary);" :style="`width:${s.progress}%`"></div>
                  </div>
                  <span style="font-size:13px;font-weight:600;">{{ s.progress }}%</span>
                </div>
              </td>
              <td style="font-weight:600;font-size:14px;">{{ s.score }}%</td>
              <td style="font-size:14px;">{{ s.submissions }}/14</td>
              <td><span :class="['badge', s.status === 'completed' ? 'badge-green' : 'badge-blue']">{{ s.status }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCircuitronStore } from '../stores/circuitron'
import Navbar from '../components/Navbar.vue'

const store = useCircuitronStore()
const filter = ref('All')
const activeFeedback = ref(null)
const feedbackText = ref('')

const filteredSubmissions = computed(() =>
  filter.value === 'All' ? store.submissions : store.submissions.filter(s => s.status === filter.value)
)

const mentorStats = computed(() => [
  { icon: '⏳', value: store.submissions.filter(s => s.status === 'pending').length, label: 'Pending Reviews' },
  { icon: '✅', value: store.submissions.filter(s => s.status === 'approved').length, label: 'Approved' },
  { icon: '🔄', value: store.submissions.filter(s => s.status === 'revision').length, label: 'Revision Requested' },
  { icon: '👥', value: store.students.length, label: 'Total Students' },
])

function approve(id) {
  store.approveSubmission(id, feedbackText.value || 'Great work! Well done.')
  activeFeedback.value = null
  feedbackText.value = ''
}
function requestRevision(id) {
  store.requestRevision(id, feedbackText.value || 'Please review and resubmit.')
  activeFeedback.value = null
  feedbackText.value = ''
}
</script>
