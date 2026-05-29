<template>
  <div>
    <Navbar />
    
    <!-- Outer Lesson Shell -->
    <div v-if="lesson" class="fade-up" style="max-width:1140px;margin:0 auto;padding:28px 24px 64px;">

      <!-- Breadcrumbs -->
      <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--slate-400);margin-bottom:24px;font-weight:600;">
        <router-link to="/dashboard" style="color:var(--slate-500);transition:color 0.15s;">Dashboard</router-link>
        <span style="font-size:10px;">›</span>
        <span style="color:var(--slate-800);">Day {{ lesson.day }}: {{ lesson.title }}</span>
      </div>

      <!-- Main Columns Grid Layout -->
      <div style="display:grid;grid-template-columns:1fr 340px;gap:32px;align-items:start;" class="lesson-layout-grid">
        
        <!-- Left Column: Video Courseware and Tabs content -->
        <div style="display:flex;flex-direction:column;gap:24px;">
          
          <!-- Header and Overview Description -->
          <div style="padding-bottom:8px;border-bottom:1px solid var(--slate-200);">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
              <span class="badge badge-green" style="padding:3px 10px;font-size:10px;">DAY {{ lesson.day }}</span>
              <span class="badge badge-blue" style="padding:3px 10px;font-size:10px;">⏱ {{ lesson.duration }}</span>
            </div>
            <h1 style="font-size:26px;font-weight:800;color:var(--slate-900);letter-spacing:-0.03em;margin-bottom:8px;line-height:1.2;">
              {{ lesson.title }}
            </h1>
            <p style="color:var(--slate-600);font-size:15px;line-height:1.65;font-weight:500;">
              {{ lesson.summary }}
            </p>
          </div>

          <!-- Video Section in elegant high-contrast solid black frame -->
          <div style="border: 2px solid var(--slate-900); border-radius: var(--radius-lg); overflow:hidden; background:#000000; box-shadow: var(--shadow);">
            <!-- Embedded iframe if admin set it -->
            <div v-if="lesson.videoEmbed" style="aspect-ratio:16/9; display:block;" v-html="lesson.videoEmbed"></div>
            <!-- YouTube URL auto-embed -->
            <div v-else-if="youtubeId" style="aspect-ratio:16/9; display:block;">
              <iframe :src="`https://www.youtube.com/embed/${youtubeId}`" width="100%" height="100%" frameborder="0" allowfullscreen style="display:block;"></iframe>
            </div>
            <!-- Placeholder -->
            <div v-else style="background:var(--slate-900);aspect-ratio:16/9;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;gap:12px;padding:24px;">
              <div style="width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:20px;border:2.5px solid rgba(255,255,255,0.25);cursor:pointer;transition:transform 0.2s;">▶</div>
              <div style="font-size:14px;font-weight:700;">Day {{ day }} — {{ lesson.title }}</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.4);">Video lesson will load here · {{ lesson.duration }}</div>
            </div>
          </div>

          <!-- Video URL Link Fallback -->
          <div v-if="lesson.videoUrl && !lesson.videoEmbed && !youtubeId">
            <a :href="lesson.videoUrl" target="_blank" class="btn btn-ghost btn-sm">▶ Watch Video Lesson →</a>
          </div>

          <!-- Monochromatic Selector Tabs -->
          <div>
            <div style="display:flex;gap:4px;border-bottom:1px solid var(--slate-200);margin-bottom:24px;background:var(--slate-100);padding:4px;border-radius:var(--radius-lg);">
              <button v-for="tab in ['Notes','Quiz','Submit Project']" :key="tab"
                @click="activeTab = tab"
                :style="`flex:1;text-align:center;padding:9px 12px;border:none;border-radius:calc(var(--radius-lg) - 2px);font-size:13px;font-weight:700;cursor:pointer;transition:all 0.18s;
                background:${activeTab===tab?'var(--slate-900)':'transparent'};
                color:${activeTab===tab?'var(--slate-50)':'var(--slate-500)'};`">
                {{ tab }}
              </button>
            </div>

            <!-- ── NOTES TAB ────────────────────────────────── -->
            <div v-if="activeTab === 'Notes'" class="fade-up" style="display:flex;flex-direction:column;gap:16px;">
              <!-- Objectives Card -->
              <div class="card" style="padding:20px;" v-if="lesson.objectives">
                <h3 style="font-size:14px;font-weight:800;color:var(--slate-900);margin-bottom:10px;display:flex;align-items:center;gap:6px;">🎯 Learning Objectives</h3>
                <p style="font-size:13px;color:var(--slate-700);line-height:1.65;">{{ lesson.objectives }}</p>
              </div>

              <!-- Code + Schematic Links in high-contrast blocks -->
              <div v-if="lesson.codeUrl || lesson.schematicUrl" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <a v-if="lesson.codeUrl" :href="lesson.codeUrl" target="_blank" class="btn btn-ghost btn-lg" style="justify-content:center;font-size:13px;font-weight:700;">💻 View Reference Code →</a>
                <a v-if="lesson.schematicUrl" :href="lesson.schematicUrl" target="_blank" class="btn btn-ghost btn-lg" style="justify-content:center;font-size:13px;font-weight:700;">🔌 View Schematic →</a>
              </div>

              <!-- Fallback if admin hasn't filled content yet -->
              <div v-if="!lesson.objectives && !lesson.notes" class="card" style="padding:28px;text-align:center;">
                <h3 style="margin-bottom:10px;font-size:16px;">📝 Lesson Notes</h3>
                <p style="font-size:13px;color:var(--slate-500);line-height:1.7;">Your instructor has not uploaded specific written study notes for this day yet. Please reference the core topics and instructions listed in your active sidebar.</p>
              </div>
            </div>

            <!-- ── QUIZ TAB ────────────────────────────────── -->
            <div v-if="activeTab === 'Quiz'" class="fade-up">
              <div v-if="quiz.length === 0" class="card" style="padding:32px;text-align:center;">
                <div style="font-size:36px;margin-bottom:12px;">📋</div>
                <h3 style="font-size:16px;">Quiz not yet available</h3>
                <p style="color:var(--slate-500);margin-top:6px;font-size:13px;">Your instructor hasn't added quiz questions for this lesson yet.</p>
              </div>
              <div v-else-if="!quizSubmitted">
                <div class="card" style="padding:24px;margin-bottom:16px;" v-for="(q, qi) in quiz" :key="qi">
                  <p style="font-weight:700;font-size:14px;margin-bottom:16px;color:var(--slate-900);">Q{{ qi + 1 }}. {{ q.q }}</p>
                  <div v-for="(opt, oi) in q.options" :key="oi"
                    class="quiz-option" :class="{selected: answers[qi] === oi}"
                    @click="answers[qi] = oi">
                    <span style="font-weight:700;margin-right:8px;">{{ ['A','B','C','D'][oi] }}.</span> {{ opt }}
                  </div>
                </div>
                <button @click="submitQuiz" class="btn btn-primary"
                  :disabled="Object.keys(answers).length < quiz.length"
                  :style="Object.keys(answers).length < quiz.length ? 'opacity:0.5;cursor:not-allowed;' : ''">
                  Submit Quiz →
                </button>
              </div>
              <div v-else class="card" style="padding:32px;text-align:center;">
                <div style="font-size:44px;margin-bottom:12px;">{{ quizScore >= 70 ? '🎉' : '📚' }}</div>
                <h3 style="font-size:20px;margin-bottom:6px;font-weight:800;">{{ quizScore >= 70 ? 'Great work!' : 'Keep studying!' }}</h3>
                <div style="font-size:44px;font-weight:900;color:var(--primary);margin:12px 0;">{{ quizScore }}%</div>
                <p style="color:var(--slate-500);margin-bottom:24px;font-size:13px;">{{ correctCount }}/{{ quiz.length }} correct answers</p>
                <div v-for="(q, qi) in quiz" :key="qi" style="text-align:left;margin-bottom:12px;padding:16px;border-radius:var(--radius);border:1px solid var(--slate-200);transition:all 0.15s;"
                  :style="answers[qi]===q.answer?'background:var(--slate-900);color:var(--slate-50);border-color:var(--slate-900);':'background:var(--slate-50);color:var(--slate-700);'">
                  <div style="font-size:13px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;justify-content:space-between;">
                    <span>{{ q.q }}</span>
                    <span style="font-size:10px;text-transform:uppercase;font-weight:800;letter-spacing:0.05em;" :style="answers[qi]===q.answer?'color:var(--slate-400);':'color:var(--slate-500);'">
                      {{ answers[qi]===q.answer?'✓ Correct':'✗ Incorrect' }}
                    </span>
                  </div>
                  <div style="font-size:12px;opacity:0.95;">Your answer: <strong>{{ q.options[answers[qi]] }}</strong></div>
                  <div v-if="answers[qi] !== q.answer" style="font-size:12px;margin-top:4px;font-weight:600;" :style="answers[qi]===q.answer?'color:var(--slate-300);':'color:var(--slate-900);'">
                    Correct: <strong>{{ q.options[q.answer] }}</strong>
                  </div>
                </div>
                <button @click="resetQuiz" class="btn btn-ghost" style="margin-top:16px;">Retake Quiz</button>
              </div>
            </div>

            <!-- ── SUBMIT PROJECT TAB ──────────────────────── -->
            <div v-else-if="activeTab === 'Submit Project'" class="fade-up">
              <div class="card" style="padding:28px;" v-if="!projectSubmitted">
                <h3 style="margin-bottom:6px;font-size:16px;">📤 Submit Your Project</h3>
                <p style="font-size:13px;color:var(--slate-500);margin-bottom:24px;">Share your work for mentor review — include code, photos, or a demo video.</p>
                <div class="form-group">
                  <label>Project Code Link</label>
                  <input v-model="submission.code" type="url" :placeholder="`https://github.com/yourname/day${day}-project`" />
                </div>
                <div class="form-group">
                  <label>Circuit Image Upload or Drive Link</label>
                  <input v-model="submission.demo" type="url" placeholder="https://drive.google.com/... or paste image URL" style="margin-bottom: 8px;" />
                  <div @click="$refs.fileInput.click()" style="border: 1px dashed var(--slate-300); border-radius: var(--radius); padding: 16px; text-align: center; cursor: pointer; background: var(--slate-50); transition: all 0.15s; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;">
                    <span style="font-size: 18px;">📸</span>
                    <span style="font-size: 12px; font-weight: 600; color: var(--slate-600);">
                      {{ uploadedImage ? 'Replace uploaded image' : 'Choose local circuit photo to upload' }}
                    </span>
                    <span style="font-size: 10px; color: var(--slate-400);">PNG, JPG up to 5MB</span>
                    <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" style="display: none;" />
                  </div>
                  <div v-if="uploadedImage" style="margin-top:12px; border: 1px solid var(--slate-200); border-radius: var(--radius); overflow: hidden; position: relative; aspect-ratio: 16/9; background: var(--slate-100);">
                    <img :src="uploadedImage" style="width: 100%; height: 100%; object-fit: cover;" />
                    <button @click.stop="uploadedImage = null" style="position: absolute; top: 8px; right: 8px; border: none; background: rgba(0,0,0,0.6); color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 10px; font-weight: 700;">✕</button>
                  </div>
                </div>
                <div class="form-group">
                  <label>Your Feedback / Notes for Mentor</label>
                  <textarea v-model="submission.notes" rows="4" placeholder="Describe what you built, challenges faced, and questions for your mentor..."></textarea>
                </div>
                <button @click="submitProject" class="btn btn-primary"
                  :disabled="!submission.code && !submission.demo && !uploadedImage"
                  :style="!submission.code && !submission.demo && !uploadedImage ? 'opacity:0.5;cursor:not-allowed;' : ''">
                  Submit for Review →
                </button>
              </div>
              <div v-else class="card" style="padding:32px;text-align:center;">
                <div style="font-size:44px;margin-bottom:12px;">✅</div>
                <h3 style="font-size:18px;font-weight:800;margin-bottom:6px;">Project Submitted!</h3>
                <p style="color:var(--slate-500);font-size:13px;">Your mentor will review and provide feedback within 24 hours.</p>
              </div>
            </div>
          </div>

          <!-- Bottom Navigation footer -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:24px;padding-top:24px;border-top:1.5px solid var(--slate-200);">
            <router-link v-if="day > 1" :to="`/lesson/${Number(day)-1}`" class="btn btn-ghost">← Day {{ Number(day)-1 }}</router-link>
            <div v-else></div>
            <router-link v-if="store.progressPercent >= 75" to="/certificate" class="btn btn-primary">🏆 Get Certificate →</router-link>
            <router-link v-else-if="day < 14" :to="`/lesson/${Number(day)+1}`" class="btn btn-primary">Day {{ Number(day)+1 }} →</router-link>
            <span v-else class="badge badge-gray">🔒 Capstone Pending</span>
          </div>

        </div>

        <!-- Right Column: Premium Monochromatic Sidebar context sidebar -->
        <div style="display:flex;flex-direction:column;gap:20px;position:sticky;top:80px;" class="lesson-sidebar">
          
          <!-- Class Status Card -->
          <div class="card" style="padding:20px;background:var(--slate-900);color:var(--slate-50);border-color:var(--slate-900);">
            <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:var(--slate-400);margin-bottom:8px;">Lesson Status</div>
            <div style="font-size:18px;font-weight:800;color:var(--slate-50);display:flex;align-items:center;gap:8px;">
              <span>{{ lesson.status === 'done' ? '✓ Completed' : '📖 In Progress' }}</span>
            </div>
            
            <!-- High-Contrast Dynamic Tags (Monochromatic) -->
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:12px;border-top:1px solid var(--slate-800);padding-top:12px;">
              <span v-for="tag in lesson.tags" :key="tag" 
                style="padding:3px 8px;border-radius:4px;font-size:10px;font-weight:700;background:var(--slate-800);color:var(--slate-300);text-transform:uppercase;letter-spacing:0.05em;border:1px solid var(--slate-700);">
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Required Components Card (Bulleted checkable items list!) -->
          <div class="card" style="padding:20px;border-color:var(--slate-300);" v-if="lesson.components">
            <h3 style="font-size:11px;font-weight:800;color:var(--slate-900);margin-bottom:14px;display:flex;align-items:center;gap:6px;text-transform:uppercase;letter-spacing:0.08em;">
              🔧 Required Components
            </h3>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;padding:0;margin:0;">
              <li v-for="comp in lesson.components.split(',')" :key="comp" 
                style="font-size:13px;color:var(--slate-700);display:flex;align-items:flex-start;gap:6px;line-height:1.45;">
                <span style="font-weight:800;color:var(--slate-900);flex-shrink:0;">✔</span>
                <span>{{ comp.trim() }}</span>
              </li>
            </ul>
          </div>

          <!-- Instructor Tip box (High-Contrast Monochrome Highlight) -->
          <div v-if="lesson.notes" style="padding:18px;background:var(--slate-100);border-radius:var(--radius-lg);border:1.5px solid var(--slate-300);box-shadow:var(--shadow-sm);">
            <div style="font-size:11px;font-weight:800;color:var(--slate-900);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;display:flex;align-items:center;gap:4px;">
              💡 Instructor Tip
            </div>
            <div style="font-size:12px;color:var(--slate-700);line-height:1.55;font-weight:500;">
              {{ lesson.notes }}
            </div>
          </div>

        </div>

      </div>

    </div>

    <!-- Locked State fallback -->
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
const uploadedImage = ref(null)
const fileInput = ref(null)

function handleFileUpload(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      uploadedImage.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

watch(() => props.day, () => {
  activeTab.value = 'Notes'
  answers.value = {}
  quizSubmitted.value = false
  projectSubmitted.value = false
  submission.value = { code: '', demo: '', notes: '' }
  uploadedImage.value = null
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

<style scoped>
@media (max-width: 900px) {
  .lesson-layout-grid {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
  }
  .lesson-sidebar {
    position: static !important;
  }
}
</style>
