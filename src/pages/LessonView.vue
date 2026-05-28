<template>
  <div>
    <Navbar />
    <div v-if="lesson" style="max-width:860px;margin:0 auto;padding:32px 24px 64px;">

      <!-- Breadcrumb -->
      <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--slate-400);margin-bottom:24px;">
        <router-link to="/dashboard" style="color:var(--slate-400);">Dashboard</router-link>
        <span>›</span>
        <span style="color:var(--slate-700);font-weight:500;">Day {{ lesson.day }}: {{ lesson.title }}</span>
      </div>

      <!-- Header -->
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:28px;">
        <div>
          <span class="badge badge-blue" style="margin-bottom:10px;">Day {{ lesson.day }} · {{ lesson.duration }}</span>
          <h1 style="font-size:28px;font-weight:800;margin-bottom:8px;">{{ lesson.title }}</h1>
          <p style="color:var(--slate-500);font-size:15px;line-height:1.6;">{{ lesson.summary }}</p>
          <div class="tag-strip" style="margin-top:12px;">
            <span v-for="tag in lesson.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <span :class="['badge', lesson.status==='done'?'badge-green':'badge-blue']" style="font-size:13px;padding:6px 14px;flex-shrink:0;">
          {{ lesson.status === 'done' ? '✓ Completed' : '📖 In Progress' }}
        </span>
      </div>

      <!-- Video section -->
      <div style="margin-bottom:32px;">
        <!-- Embedded iframe if admin set it -->
        <div v-if="lesson.videoEmbed" style="border-radius:16px;overflow:hidden;aspect-ratio:16/9;" v-html="lesson.videoEmbed"></div>
        <!-- YouTube URL auto-embed -->
        <div v-else-if="youtubeId" style="border-radius:16px;overflow:hidden;aspect-ratio:16/9;">
          <iframe :src="`https://www.youtube.com/embed/${youtubeId}`" width="100%" height="100%" frameborder="0" allowfullscreen style="display:block;"></iframe>
        </div>
        <!-- Placeholder -->
        <div v-else style="background:var(--slate-900);border-radius:16px;aspect-ratio:16/9;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;gap:12px;">
          <div style="width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:28px;border:2px solid rgba(255,255,255,0.2);">▶</div>
          <div style="font-size:16px;font-weight:600;">Day {{ day }} — {{ lesson.title }}</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.4);">Video will be added by your instructor · {{ lesson.duration }}</div>
        </div>

        <!-- Video URL link fallback -->
        <div v-if="lesson.videoUrl && !lesson.videoEmbed && !youtubeId" style="margin-top:10px;">
          <a :href="lesson.videoUrl" target="_blank" class="btn btn-ghost btn-sm">▶ Watch Video →</a>
        </div>
      </div>

      <!-- Tabs -->
      <div style="display:flex;gap:0;border-bottom:2px solid var(--slate-200);margin-bottom:28px;">
        <button v-for="tab in ['Notes','Quiz','Submit Project']" :key="tab"
          @click="activeTab = tab"
          :style="`padding:10px 20px;border:none;background:transparent;font-size:14px;font-weight:600;cursor:pointer;
          border-bottom:2px solid ${activeTab===tab?'var(--primary)':'transparent'};
          color:${activeTab===tab?'var(--primary)':'var(--slate-500)'};margin-bottom:-2px;transition:all 0.15s;`">
          {{ tab }}
        </button>
      </div>

      <!-- ── NOTES TAB ────────────────────────────────── -->
      <div v-if="activeTab === 'Notes'">
        <!-- Objectives -->
        <div class="card" style="padding:24px;margin-bottom:16px;" v-if="lesson.objectives">
          <h3 style="font-size:15px;font-weight:700;margin-bottom:12px;">🎯 Learning Objectives</h3>
          <p style="font-size:14px;color:var(--slate-600);line-height:1.75;">{{ lesson.objectives }}</p>
        </div>

        <!-- Components -->
        <div class="card" style="padding:24px;margin-bottom:16px;" v-if="lesson.components">
          <h3 style="font-size:15px;font-weight:700;margin-bottom:12px;">🔧 Required Components</h3>
          <p style="font-size:14px;color:var(--slate-600);line-height:1.75;">{{ lesson.components }}</p>
        </div>

        <!-- Notes / Tip -->
        <div v-if="lesson.notes" style="padding:18px 20px;background:var(--primary-light);border-radius:12px;border-left:4px solid var(--primary);margin-bottom:16px;">
          <div style="font-size:12px;font-weight:700;color:#0369a1;margin-bottom:6px;">💡 Instructor Tip</div>
          <div style="font-size:14px;color:#075985;line-height:1.7;">{{ lesson.notes }}</div>
        </div>

        <!-- Code + Schematic links -->
        <div v-if="lesson.codeUrl || lesson.schematicUrl" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px;">
          <a v-if="lesson.codeUrl" :href="lesson.codeUrl" target="_blank" class="btn btn-ghost btn-sm">💻 View Reference Code →</a>
          <a v-if="lesson.schematicUrl" :href="lesson.schematicUrl" target="_blank" class="btn btn-ghost btn-sm">🔌 View Schematic →</a>
        </div>

        <!-- Fallback if admin hasn't filled content yet -->
        <div v-if="!lesson.objectives && !lesson.components && !lesson.notes" class="card" style="padding:28px;">
          <h3 style="margin-bottom:16px;">📝 Lesson Notes</h3>
          <p style="font-size:14px;color:var(--slate-500);line-height:1.75;">Your instructor has not yet uploaded the notes for this lesson. Check back later or watch the video above to get started.</p>
        </div>
      </div>

      <!-- ── QUIZ TAB ────────────────────────────────── -->
      <div v-if="activeTab === 'Quiz'">
        <div v-if="quiz.length === 0" class="card" style="padding:32px;text-align:center;">
          <div style="font-size:36px;margin-bottom:12px;">📋</div>
          <h3>Quiz not yet available</h3>
          <p style="color:var(--slate-500);margin-top:8px;">Your instructor hasn't added quiz questions for this lesson yet.</p>
        </div>
        <div v-else-if="!quizSubmitted">
          <div class="card" style="padding:28px;margin-bottom:16px;" v-for="(q, qi) in quiz" :key="qi">
            <p style="font-weight:600;font-size:15px;margin-bottom:16px;">Q{{ qi + 1 }}. {{ q.q }}</p>
            <div v-for="(opt, oi) in q.options" :key="oi"
              class="quiz-option" :class="{selected: answers[qi] === oi}"
              @click="answers[qi] = oi">
              <span style="font-weight:600;margin-right:8px;">{{ ['A','B','C','D'][oi] }}.</span> {{ opt }}
            </div>
          </div>
          <button @click="submitQuiz" class="btn btn-primary"
            :disabled="Object.keys(answers).length < quiz.length"
            :style="Object.keys(answers).length < quiz.length ? 'opacity:0.5;cursor:not-allowed;' : ''">
            Submit Quiz →
          </button>
        </div>
        <div v-else class="card" style="padding:32px;text-align:center;">
          <div style="font-size:48px;margin-bottom:16px;">{{ quizScore >= 70 ? '🎉' : '📚' }}</div>
          <h3 style="font-size:24px;margin-bottom:8px;">{{ quizScore >= 70 ? 'Great work!' : 'Keep studying!' }}</h3>
          <div style="font-size:48px;font-weight:900;color:var(--primary);margin:16px 0;">{{ quizScore }}%</div>
          <p style="color:var(--slate-500);margin-bottom:24px;">{{ correctCount }}/{{ quiz.length }} correct answers</p>
          <div v-for="(q, qi) in quiz" :key="qi" style="text-align:left;margin-bottom:10px;padding:14px;border-radius:10px;"
            :style="answers[qi]===q.answer?'background:#dcfce7':'background:#fee2e2'">
            <div style="font-size:13px;font-weight:600;margin-bottom:4px;">{{ q.q }}</div>
            <div style="font-size:13px;">Your answer: <strong>{{ q.options[answers[qi]] }}</strong></div>
            <div v-if="answers[qi] !== q.answer" style="font-size:13px;color:#15803d;">Correct: <strong>{{ q.options[q.answer] }}</strong></div>
          </div>
          <button @click="resetQuiz" class="btn btn-ghost" style="margin-top:16px;">Retake Quiz</button>
        </div>
      </div>

      <!-- ── SUBMIT PROJECT TAB ──────────────────────── -->
      <div v-if="activeTab === 'Submit Project'">
        <div class="card" style="padding:28px;" v-if="!projectSubmitted">
          <h3 style="margin-bottom:6px;">📤 Submit Your Project</h3>
          <p style="font-size:14px;color:var(--slate-500);margin-bottom:24px;">Share your work for mentor review — include code, photos, or a demo video.</p>
          <div class="form-group">
            <label>GitHub Repository or Code Link</label>
            <input v-model="submission.code" type="url" :placeholder="`https://github.com/yourname/day${day}-project`" />
          </div>
          <div class="form-group">
            <label>Demo Video or Photo Link</label>
            <input v-model="submission.demo" type="url" placeholder="https://youtube.com/... or Google Drive link" />
          </div>
          <div class="form-group">
            <label>Notes for Mentor</label>
            <textarea v-model="submission.notes" rows="4" placeholder="Describe what you built, challenges faced, and questions for your mentor..."></textarea>
          </div>
          <button @click="submitProject" class="btn btn-primary"
            :disabled="!submission.code && !submission.demo"
            :style="!submission.code && !submission.demo ? 'opacity:0.5;cursor:not-allowed;' : ''">
            Submit for Review →
          </button>
        </div>
        <div v-else class="card" style="padding:32px;text-align:center;">
          <div style="font-size:48px;margin-bottom:16px;">✅</div>
          <h3 style="font-size:20px;margin-bottom:8px;">Project Submitted!</h3>
          <p style="color:var(--slate-500);">Your mentor will review and provide feedback within 24 hours.</p>
        </div>
      </div>

      <!-- Nav -->
      <div style="display:flex;justify-content:space-between;margin-top:40px;padding-top:24px;border-top:1px solid var(--slate-200);">
        <router-link v-if="day > 1" :to="`/lesson/${Number(day)-1}`" class="btn btn-ghost">← Day {{ Number(day)-1 }}</router-link>
        <div v-else></div>
        <router-link v-if="day < 14" :to="`/lesson/${Number(day)+1}`" class="btn btn-primary">Day {{ Number(day)+1 }} →</router-link>
        <router-link v-else to="/certificate" class="btn btn-primary">🏆 Get Certificate →</router-link>
      </div>
    </div>

    <div v-else class="page-body" style="text-align:center;padding:80px;">
      <div style="font-size:48px;margin-bottom:16px;">🔒</div>
      <h2>Day {{ day }} is Locked</h2>
      <p style="color:var(--slate-500);margin:12px 0 24px;">Complete previous lessons to unlock this day.</p>
      <router-link to="/dashboard" class="btn btn-primary">Back to Dashboard</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCircuitronStore } from '../stores/circuitron'
import Navbar from '../components/Navbar.vue'

const props = defineProps({ day: { type: [String, Number], required: true } })
const store = useCircuitronStore()

const lesson = computed(() => store.lessons.find(l => l.day === Number(props.day) && l.status !== 'locked'))
const quiz = computed(() => store.getQuizForDay(Number(props.day)))

// Auto-extract YouTube ID from URL
const youtubeId = computed(() => {
  const url = lesson.value?.videoUrl || ''
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
})

const activeTab = ref('Notes')
const answers = ref({})
const quizSubmitted = ref(false)
const quizScore = ref(0)
const correctCount = ref(0)
const projectSubmitted = ref(false)
const submission = ref({ code: '', demo: '', notes: '' })

watch(() => props.day, () => {
  activeTab.value = 'Notes'
  answers.value = {}
  quizSubmitted.value = false
  projectSubmitted.value = false
  submission.value = { code: '', demo: '', notes: '' }
})

function submitQuiz() {
  let correct = 0
  quiz.value.forEach((q, i) => { if (answers.value[i] === q.answer) correct++ })
  correctCount.value = correct
  quizScore.value = Math.round((correct / quiz.value.length) * 100)
  quizSubmitted.value = true
}
function resetQuiz() { answers.value = {}; quizSubmitted.value = false }
function submitProject() { projectSubmitted.value = true }
</script>
