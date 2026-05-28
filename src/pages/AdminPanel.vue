<template>
  <div>
    <Navbar />

    <!-- Tab bar -->
    <div style="background:white;border-bottom:1px solid var(--slate-200);padding:0 32px;display:flex;gap:0;">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        :style="`padding:14px 20px;border:none;background:transparent;font-size:14px;font-weight:600;cursor:pointer;
        border-bottom:2px solid ${activeTab===tab.id?'var(--primary)':'transparent'};
        color:${activeTab===tab.id?'var(--primary)':'var(--slate-500)'};
        margin-bottom:-1px;transition:all 0.15s;display:flex;align-items:center;gap:6px;`">
        {{ tab.icon }} {{ tab.label }}
      </button>
    </div>

    <!-- ══════════════════════════════════════════════════════
         TAB 1 — OVERVIEW
    ══════════════════════════════════════════════════════ -->
    <div v-if="activeTab === 'overview'">
      <div class="page-header">
        <h1 class="page-title">Admin Analytics Panel</h1>
        <p class="page-sub">Platform overview, cohort statistics, and management tools</p>
      </div>
      <div class="page-body">
        <div class="grid-4" style="margin-bottom:32px;">
          <div class="card" style="padding:22px;" v-for="s in adminStats" :key="s.label">
            <div style="font-size:24px;margin-bottom:6px;">{{ s.icon }}</div>
            <div style="font-size:28px;font-weight:900;color:var(--slate-900);">{{ s.value }}</div>
            <div style="font-size:12px;color:var(--slate-500);font-weight:500;margin-top:2px;">{{ s.label }}</div>
            <div v-if="s.change" :style="`font-size:12px;font-weight:600;margin-top:6px;color:${s.change>0?'var(--green)':'var(--red)'}`">{{ s.change>0?'↑':'↓' }} {{ Math.abs(s.change) }}% this week</div>
          </div>
        </div>
        <div class="grid-2" style="margin-bottom:32px;">
          <div class="card" style="padding:24px;">
            <h3 style="font-size:16px;margin-bottom:20px;">📊 Student Progress Distribution</h3>
            <div v-for="bucket in progressBuckets" :key="bucket.label" style="margin-bottom:14px;">
              <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                <span style="font-weight:500;color:var(--slate-700);">{{ bucket.label }}</span>
                <span style="font-weight:600;color:var(--slate-900);">{{ bucket.count }} students</span>
              </div>
              <div style="height:8px;background:var(--slate-100);border-radius:999px;">
                <div style="height:100%;border-radius:999px;" :style="`width:${(bucket.count/store.students.length)*100}%;background:${bucket.color}`"></div>
              </div>
            </div>
          </div>
          <div class="card" style="padding:24px;">
            <h3 style="font-size:16px;margin-bottom:20px;">🏆 Top Performers</h3>
            <div v-for="(s, i) in topStudents" :key="s.id" style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
              <div style="font-size:18px;width:28px;text-align:center;">{{ ['🥇','🥈','🥉','4️⃣','5️⃣'][i] }}</div>
              <div style="width:34px;height:34px;border-radius:50%;background:var(--primary-light);color:var(--primary-dark);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">{{ s.avatar }}</div>
              <div style="flex:1;">
                <div style="font-weight:600;font-size:14px;">{{ s.name }}</div>
                <div style="height:4px;background:var(--slate-100);border-radius:999px;margin-top:4px;"><div style="height:100%;border-radius:999px;background:var(--primary);" :style="`width:${s.score}%`"></div></div>
              </div>
              <div style="font-weight:700;font-size:14px;color:var(--primary-dark);">{{ s.score }}%</div>
            </div>
          </div>
        </div>
        <h2 style="font-size:18px;font-weight:700;margin-bottom:16px;">Cohort Management</h2>
        <div class="card" style="overflow:hidden;">
          <table class="data-table">
            <thead><tr><th>Student</th><th>Progress</th><th>Quiz Avg</th><th>Submissions</th><th>Status</th></tr></thead>
            <tbody>
              <tr v-for="s in store.students" :key="s.id">
                <td>
                  <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:34px;height:34px;border-radius:50%;background:var(--primary-light);color:var(--primary-dark);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;">{{ s.avatar }}</div>
                    <div><div style="font-weight:600;font-size:14px;">{{ s.name }}</div><div style="font-size:12px;color:var(--slate-400);">{{ s.email }}</div></div>
                  </div>
                </td>
                <td>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <div style="width:80px;height:6px;background:var(--slate-100);border-radius:999px;"><div style="height:100%;border-radius:999px;background:var(--primary);" :style="`width:${s.progress}%`"></div></div>
                    <span style="font-size:13px;font-weight:600;color:var(--slate-700);">{{ s.progress }}%</span>
                  </div>
                </td>
                <td><span style="font-weight:700;" :style="`color:${s.score>=90?'var(--green)':s.score>=70?'var(--primary-dark)':'var(--red)'}`">{{ s.score }}%</span></td>
                <td style="font-size:14px;">{{ s.submissions }}/14</td>
                <td><span :class="['badge', s.status==='completed'?'badge-green':'badge-blue']" style="font-size:12px;">{{ s.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════
         TAB 2 — CURRICULUM EDITOR
    ══════════════════════════════════════════════════════ -->
    <div v-if="activeTab === 'curriculum'" style="display:flex;height:calc(100vh - 109px);overflow:hidden;">

      <!-- Left: Day list sidebar -->
      <div style="width:220px;flex-shrink:0;border-right:1px solid var(--slate-200);background:white;overflow-y:auto;padding:12px 8px;">
        <div style="padding:8px 12px;font-size:11px;font-weight:700;color:var(--slate-400);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:4px;">All 14 Days</div>
        <button v-for="lesson in store.lessons" :key="lesson.day"
          @click="selectDay(lesson.day)"
          :style="`width:100%;text-align:left;padding:9px 12px;border-radius:9px;border:none;cursor:pointer;margin-bottom:2px;font-size:13px;font-weight:500;
          background:${editingDay===lesson.day?'var(--primary-light)':'transparent'};
          color:${editingDay===lesson.day?'var(--primary-dark)':'var(--slate-600)'};
          display:flex;align-items:center;gap:8px;`">
          <span style="font-size:11px;font-weight:700;opacity:0.6;">D{{ lesson.day }}</span>
          <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">{{ lesson.title }}</span>
          <span style="font-size:9px;" :style="`color:${lesson.status==='done'?'var(--green)':lesson.status==='active'?'var(--primary)':'var(--slate-300)'}`">●</span>
        </button>
      </div>

      <!-- Right: Editor -->
      <div style="flex:1;overflow-y:auto;padding:28px 36px;" v-if="draft">

        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px;">
          <div>
            <span class="badge badge-blue" style="margin-bottom:8px;">Day {{ draft.day }}</span>
            <h2 style="font-size:20px;font-weight:800;">Edit Class Content</h2>
          </div>
          <div style="display:flex;gap:8px;">
            <button @click="discardChanges" class="btn btn-ghost btn-sm">↩ Discard</button>
            <button @click="saveChanges" class="btn btn-primary btn-sm">
              {{ saved ? '✓ Saved!' : '💾 Save Changes' }}
            </button>
          </div>
        </div>

        <!-- ── SECTION 1: Basic Info ── -->
        <div class="card" style="padding:24px;margin-bottom:20px;">
          <h3 style="font-size:14px;font-weight:700;color:var(--slate-500);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:20px;">📋 Basic Information</h3>
          <div class="form-group">
            <label>Class Title</label>
            <input v-model="draft.title" type="text" placeholder="e.g. Introduction to Electronics & Safety" />
          </div>
          <div class="form-group">
            <label>Short Summary <span style="font-weight:400;color:var(--slate-400);">(shown in dashboard & landing page)</span></label>
            <textarea v-model="draft.summary" rows="2" placeholder="Brief one-line description of this day's class..."></textarea>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="form-group">
              <label>Duration</label>
              <input v-model="draft.duration" type="text" placeholder="e.g. 35 min" />
            </div>
            <div class="form-group">
              <label>Status</label>
              <select v-model="draft.status">
                <option value="locked">🔒 Locked</option>
                <option value="active">📖 Active (Current)</option>
                <option value="done">✓ Completed</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Tags <span style="font-weight:400;color:var(--slate-400);">(comma-separated)</span></label>
            <input v-model="draftTagsStr" type="text" placeholder="e.g. Arduino, Sensors, PWM" />
          </div>
        </div>

        <!-- ── SECTION 2: Video ── -->
        <div class="card" style="padding:24px;margin-bottom:20px;">
          <h3 style="font-size:14px;font-weight:700;color:var(--slate-500);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:20px;">🎬 Video Content</h3>
          <div class="form-group">
            <label>YouTube / Video URL</label>
            <input v-model="draft.videoUrl" type="url" placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..." />
          </div>
          <div class="form-group">
            <label>Embed Code <span style="font-weight:400;color:var(--slate-400);">(optional — paste iframe embed from YouTube)</span></label>
            <textarea v-model="draft.videoEmbed" rows="3" placeholder='<iframe width="560" height="315" src="https://www.youtube.com/embed/..." ...></iframe>'></textarea>
          </div>
          <!-- Preview -->
          <div v-if="draft.videoEmbed" style="margin-top:12px;">
            <div style="font-size:12px;font-weight:600;color:var(--slate-500);margin-bottom:8px;">Preview:</div>
            <div style="border-radius:12px;overflow:hidden;aspect-ratio:16/9;background:var(--slate-900);" v-html="draft.videoEmbed"></div>
          </div>
          <div v-else-if="draft.videoUrl" style="margin-top:12px;padding:12px 16px;background:var(--primary-light);border-radius:10px;font-size:13px;color:#0369a1;">
            ✓ Video URL saved — embed code will be shown to students.
          </div>
        </div>

        <!-- ── SECTION 3: Lesson Details ── -->
        <div class="card" style="padding:24px;margin-bottom:20px;">
          <h3 style="font-size:14px;font-weight:700;color:var(--slate-500);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:20px;">📝 Lesson Details</h3>
          <div class="form-group">
            <label>Learning Objectives</label>
            <textarea v-model="draft.objectives" rows="3" placeholder="By the end of this day, students will be able to..."></textarea>
          </div>
          <div class="form-group">
            <label>Required Components / Materials</label>
            <textarea v-model="draft.components" rows="2" placeholder="e.g. Arduino Uno, Breadboard, 220Ω Resistors (×5), LEDs (×5)..."></textarea>
          </div>
          <div class="form-group">
            <label>Instructor Notes & Tips <span style="font-weight:400;color:var(--slate-400);">(shown to students as a highlighted tip)</span></label>
            <textarea v-model="draft.notes" rows="3" placeholder="Key concepts, common mistakes, safety reminders..."></textarea>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="form-group">
              <label>GitHub / Code URL</label>
              <input v-model="draft.codeUrl" type="url" placeholder="https://github.com/.../day{{ draft.day }}" />
            </div>
            <div class="form-group">
              <label>Schematic / Diagram URL</label>
              <input v-model="draft.schematicUrl" type="url" placeholder="https://drive.google.com/... or image link" />
            </div>
          </div>
        </div>

        <!-- ── SECTION 4: Quiz Questions ── -->
        <div class="card" style="padding:24px;margin-bottom:20px;" v-if="draft">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
            <h3 style="font-size:14px;font-weight:700;color:var(--slate-500);text-transform:uppercase;letter-spacing:0.06em;">❓ Quiz Questions</h3>
            <button @click="addQuestion" class="btn btn-ghost btn-sm">+ Add Question</button>
          </div>

          <div v-if="!draft.quizQuestions || draft.quizQuestions.length === 0" style="text-align:center;padding:32px;color:var(--slate-400);">
            No quiz questions yet. Click "+ Add Question" to add the first one.
          </div>

          <div v-for="(q, qi) in (draft.quizQuestions || [])" :key="qi"
            style="border:1.5px solid var(--slate-200);border-radius:12px;padding:20px;margin-bottom:16px;background:var(--slate-50);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
              <span style="font-size:12px;font-weight:700;color:var(--slate-500);text-transform:uppercase;">Question {{ qi + 1 }}</span>
              <button @click="removeQuestion(qi)" style="border:none;background:var(--red);color:white;border-radius:6px;padding:3px 10px;font-size:12px;cursor:pointer;font-weight:600;">✕ Remove</button>
            </div>
            <div class="form-group">
              <label>Question Text</label>
              <input v-model="q.q" type="text" placeholder="Enter your quiz question..." />
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
              <div v-for="(opt, oi) in q.options" :key="oi" class="form-group" style="margin-bottom:0;">
                <label style="display:flex;align-items:center;gap:6px;">
                  <span>Option {{ ['A','B','C','D'][oi] }}</span>
                  <span v-if="q.answer === oi" style="font-size:10px;background:var(--green);color:white;padding:1px 6px;border-radius:999px;font-weight:700;">✓ Correct</span>
                </label>
                <input v-model="q.options[oi]" type="text" :placeholder="`Option ${['A','B','C','D'][oi]}...`" />
              </div>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label>Correct Answer</label>
              <select v-model="q.answer">
                <option v-for="(opt, oi) in q.options" :key="oi" :value="oi">
                  {{ ['A','B','C','D'][oi] }}: {{ opt || '(empty)' }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Save button bottom -->
        <div style="display:flex;gap:8px;padding-bottom:40px;">
          <button @click="saveChanges" class="btn btn-primary">
            {{ saved ? '✓ Saved!' : '💾 Save All Changes' }}
          </button>
          <button @click="discardChanges" class="btn btn-ghost">↩ Discard</button>
        </div>
      </div>

      <div v-else style="flex:1;display:flex;align-items:center;justify-content:center;color:var(--slate-400);">
        <div style="text-align:center;">
          <div style="font-size:48px;margin-bottom:16px;">👈</div>
          <div style="font-size:16px;font-weight:600;">Select a day to edit</div>
          <div style="font-size:14px;margin-top:6px;">Choose from the 14 lessons on the left</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCircuitronStore } from '../stores/circuitron'
import Navbar from '../components/Navbar.vue'

const store = useCircuitronStore()

const tabs = [
  { id: 'overview', icon: '📊', label: 'Overview' },
  { id: 'curriculum', icon: '📚', label: 'Curriculum Editor' },
]
const activeTab = ref('overview')

// ── Overview computed ─────────────────────────────────────────────────────────
const adminStats = computed(() => [
  { icon: '👥', value: store.students.length, label: 'Total Students', change: 12 },
  { icon: '✅', value: store.students.filter(s => s.status === 'completed').length, label: 'Completed', change: 0 },
  { icon: '📈', value: Math.round(store.students.reduce((a, b) => a + b.progress, 0) / store.students.length) + '%', label: 'Avg Progress', change: 8 },
  { icon: '⭐', value: Math.round(store.students.reduce((a, b) => a + b.score, 0) / store.students.length) + '%', label: 'Avg Quiz Score', change: 3 },
])
const topStudents = computed(() => [...store.students].sort((a, b) => b.score - a.score).slice(0, 5))
const progressBuckets = [
  { label: '0–25% — Just Starting', count: 1, color: '#94a3b8' },
  { label: '26–50% — Early Progress', count: 2, color: '#38bdf8' },
  { label: '51–75% — Midway Through', count: 2, color: '#0ea5e9' },
  { label: '76–100% — Almost Done', count: 1, color: '#10b981' },
]

// ── Curriculum Editor ─────────────────────────────────────────────────────────
const editingDay = ref(null)
const draft = ref(null)
const draftTagsStr = ref('')
const saved = ref(false)

function selectDay(day) {
  editingDay.value = day
  saved.value = false
  const lesson = store.lessons.find(l => l.day === day)
  // Deep clone so edits don't reflect until saved
  draft.value = JSON.parse(JSON.stringify(lesson))
  draftTagsStr.value = draft.value.tags.join(', ')
}

// Sync tags string back to array on change
watch(draftTagsStr, (val) => {
  if (draft.value) {
    draft.value.tags = val.split(',').map(t => t.trim()).filter(Boolean)
  }
})

function saveChanges() {
  if (!draft.value) return
  draft.value.tags = draftTagsStr.value.split(',').map(t => t.trim()).filter(Boolean)
  store.updateLesson(draft.value.day, { ...draft.value })
  saved.value = true
  setTimeout(() => saved.value = false, 2500)
}

function discardChanges() {
  selectDay(editingDay.value)
}

function addQuestion() {
  draft.value.quizQuestions.push({
    q: '',
    options: ['', '', '', ''],
    answer: 0,
  })
}

function removeQuestion(idx) {
  draft.value.quizQuestions.splice(idx, 1)
}
</script>
