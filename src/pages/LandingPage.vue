<template>
  <div>
    <Navbar />

    <!-- Hero -->
    <section style="background:#000000;padding:80px 0 60px;border-bottom:1px solid rgba(255,255,255,0.05);">
      <div class="container" style="text-align:center;">
        <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:999px;background:rgba(255,255,255,0.1);color:#ffffff;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:28px;border:1px solid rgba(255,255,255,0.2);">
          <span class="dot-ping" style="width:8px;height:8px;border-radius:50%;background:#ffffff;display:inline-block;"></span>
          Conducted by IEEE RAS & IAS — CEK
        </div>
        <h1 style="font-size:clamp(60px, 12vw, 120px); font-weight:900; letter-spacing:-0.05em; line-height:1; margin-bottom:8px; color:white; text-transform:uppercase; background: linear-gradient(180deg, #ffffff 0%, #a3a3a3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;" class="fade-up">
          CIRCUITRON
        </h1>
        <h2 style="font-size:32px;font-weight:700;letter-spacing:-1px;line-height:1.2;margin-bottom:24px;color:#d1d5db;" class="fade-up">
          Learn Electronics Through
          <span style="text-decoration: underline; text-underline-offset: 8px; text-decoration-thickness: 2px; color:white;">Real Projects</span>
        </h2>
        <p style="font-size:18px;color:#9ca3af;max-width:580px;margin:0 auto 16px;line-height:1.7;">
          Online interactive lessons covering Arduino, ESP32, IoT, and PCB design. 
          Built for engineering students, hobbyists, and absolute beginners.
        </p>
        <p style="font-size:14px;color:#d1d5db;max-width:580px;margin:0 auto 36px;line-height:1.5; font-weight:600; padding:12px; background:rgba(255,255,255,0.03); border-radius:8px; border:1px solid rgba(255,255,255,0.05);">
          Proudly conducted in collaboration with the Robotics and Automation Society (RAS) and Industry Applications Society (IAS) of the College of Engineering Kidangoor IEEE Student Branch.
        </p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
          <router-link to="/login" class="btn btn-primary btn-lg" style="background:#ffffff; color:#000000; border:none; font-weight:800;">
            Start Coding — Day 1 ↗
          </router-link>
          <a href="#curriculum" class="btn btn-ghost btn-lg" style="color:white; border-color:rgba(255,255,255,0.2);">View 14-Day Syllabus</a>
        </div>

        <!-- Stats strip -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:32px;max-width:640px;margin:64px auto 0;padding-top:40px;border-top:1px solid rgba(255,255,255,0.1);">
          <div v-for="s in stats" :key="s.label">
            <div class="stat-number" style="color:white;">{{ s.value }}</div>
            <div class="stat-label" style="color:#9ca3af;">{{ s.label }}</div>
          </div>
        </div>

        <!-- Role Portals Callout -->
        <div style="margin-top: 56px; padding-top: 48px; border-top: 1px solid rgba(255,255,255,0.1); text-align: left;">
          <h3 style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; text-align: center; margin-bottom: 24px;">Platform Entry Portals</h3>
          
          <div class="grid-3" style="margin-top: 16px;">
            <div class="card card-hover glass-card" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between; min-height: 200px; border-radius:16px;">
              <div>
                <div style="font-size: 20px; margin-bottom: 12px;">🎓</div>
                <h4 style="font-size: 15px; margin-bottom: 6px; font-weight: 700; color: white;">Student Workspace</h4>
                <p style="font-size: 13px; color: #9ca3af; line-height: 1.5; margin-bottom: 16px;">Access active lessons, track syllabus milestones, pass quizzes, and submit project links.</p>
              </div>
              <router-link to="/login?role=student" class="btn btn-primary btn-sm" style="width: 100%; justify-content: center; background:#ffffff; color:#000000; border:none; font-weight:800;">Student Portal ↗</router-link>
            </div>

            <div class="card card-hover glass-card" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between; min-height: 200px; border-radius:16px;">
              <div>
                <div style="font-size: 20px; margin-bottom: 12px;">👩‍🏫</div>
                <h4 style="font-size: 15px; margin-bottom: 6px; font-weight: 700; color: white;">Mentor Dashboard</h4>
                <p style="font-size: 13px; color: #9ca3af; line-height: 1.5; margin-bottom: 16px;">Access student submissions, provide structural review feedback, and approve course completion.</p>
              </div>
              <router-link to="/login?role=mentor" class="btn btn-ghost btn-sm" style="width: 100%; justify-content: center; color:white; border-color:rgba(255,255,255,0.2);">Mentor Portal ↗</router-link>
            </div>

            <div class="card card-hover glass-card" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between; min-height: 200px; border-radius:16px;">
              <div>
                <div style="font-size: 20px; margin-bottom: 12px;">🛠️</div>
                <h4 style="font-size: 15px; margin-bottom: 6px; font-weight: 700; color: white;">Admin Control Panel</h4>
                <p style="font-size: 13px; color: #9ca3af; line-height: 1.5; margin-bottom: 16px;">Manage curriculum materials, monitor cohort progress analytics, and update program parameters.</p>
              </div>
              <router-link to="/login?role=admin" class="btn btn-ghost btn-sm" style="width: 100%; justify-content: center; color:white; border-color:rgba(255,255,255,0.2);">Admin Portal ↗</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Tracks -->
    <section class="section" style="background:#000000;">
      <div class="container">
        <div style="text-align:center;margin-bottom:48px;">
          <h2 class="section-title" style="color:white;">Three Engineering Tracks</h2>
          <p class="section-subtitle" style="margin:0 auto; color:#9ca3af;">A logical progression from basic analog to wireless IoT and custom PCB hardware.</p>
        </div>
        <div class="grid-3">
          <div v-for="track in tracks" :key="track.title" class="card card-hover glass-card" style="padding:32px;">
            <div :style="`width:48px;height:48px;border-radius:12px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:20px; border:1px solid rgba(255,255,255,0.2); box-shadow: 0 0 15px rgba(255,255,255,0.1);`">{{ track.icon }}</div>
            <h3 style="font-size:17px;margin-bottom:10px; color:white;">{{ track.title }}</h3>
            <p style="font-size:14px;color:#9ca3af;line-height:1.7;margin-bottom:16px;">{{ track.desc }}</p>
            <span class="badge" style="background:rgba(255,255,255,0.1); color:#ffffff; border:1px solid rgba(255,255,255,0.2);">{{ track.days }}</span>
          </div>
        </div>
      </div>
    </section>

    
    <!-- 14-Day Learning Roadmap -->
    <section id="curriculum" class="section" style="background:#000000;">
      <div class="container-sm">
        <div style="text-align:center;margin-bottom:48px;">
          <h2 class="section-title" style="color:white; font-size:36px; font-weight:800;">14-Day Learning Roadmap</h2>
          <p class="section-subtitle" style="margin:0 auto; color:#9ca3af; font-size:16px;">From Arduino Fundamentals to ESP32 IoT Projects</p>
        </div>

        <!-- Badges -->
        <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:10px; margin-bottom:48px;">
          <span v-for="badge in curriculumBadges" :key="badge" class="badge" style="background:rgba(255,255,255,0.05); color:#ffffff; border:1px solid rgba(255,255,255,0.2); padding:6px 12px; font-size:13px; font-weight:600;">
            {{ badge }}
          </span>
        </div>

        <!-- Progress Path -->
        <div style="display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:8px; margin-bottom:48px; background:rgba(255,255,255,0.03); border-radius:12px; padding:16px; border:1px solid rgba(255,255,255,0.05);">
          <template v-for="(step, index) in progressPath" :key="step">
            <span style="color:#d1d5db; font-size:13px; font-weight:700;">{{ step }}</span>
            <span v-if="index < progressPath.length - 1" style="color:#4b5563; font-size:12px;">→</span>
          </template>
        </div>

        <!-- Timeline -->
        <div style="position:relative;padding-left:40px;border-left:2px solid #374151;">
          
          <template v-for="week in curriculumWeeks" :key="week.week">
            <!-- Week Header -->
            <div style="margin-bottom:32px; position:relative;">
              <div style="position:absolute;left:-48px;top:4px;width:14px;height:14px;border-radius:50%;background:#ffffff; box-shadow: 0 0 15px rgba(255,255,255,0.6);"></div>
              <h3 style="font-size:20px; font-weight:800; color:white; letter-spacing:-0.02em; margin-bottom:8px;">{{ week.week }}</h3>
              <p style="font-size:14px; color:#9ca3af; line-height:1.6; font-style:italic;">Goal: {{ week.goal }}</p>
            </div>

            <!-- Days -->
            <div v-for="day in week.days" :key="day.day" style="margin-bottom:24px; position:relative;">
              <!-- dot -->
              <div style="position:absolute;left:-45px;top:20px;width:8px;height:8px;border-radius:50%;background:#a3a3a3;border:2px solid #000000;"></div>
              
              <!-- Expandable Card -->
              <div class="faq-item glass-card" :class="{ 'active-faq': activeDay === day.day }" style="padding:0; overflow:hidden;">
                <button @click="activeDay = activeDay === day.day ? null : day.day" style="width:100%;display:flex;justify-content:space-between;align-items:center;padding:16px 20px;text-align:left;cursor:pointer;border:none;background:transparent; outline:none;">
                  <div style="display:flex; align-items:center; gap:12px;">
                    <span class="badge" style="background:rgba(255,255,255,0.1); color:#ffffff; border:1px solid rgba(255,255,255,0.2); font-size:11px;">Day {{ day.day }}</span>
                    <span style="font-size:15px; font-weight:600; color:white;">{{ day.title }}</span>
                  </div>
                  <span style="font-size:20px;color:#ffffff;transition:transform 0.3s;" :style="activeDay === day.day ? 'transform:rotate(45deg)' : ''">+</span>
                </button>
                <div v-show="activeDay === day.day" style="padding:0 20px 16px; font-size:14px; color:#9ca3af; line-height:1.7; border-top:1px solid rgba(255,255,255,0.05); background:rgba(0,0,0,0.2); margin-top:4px;">
                  {{ day.text }}
                </div>
              </div>
            </div>
          </template>

        </div>

        <!-- CTA -->
        <div style="text-align:center; margin-top:64px; padding:40px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:16px;">
          <h3 style="font-size:24px; font-weight:800; color:white; margin-bottom:12px;">Ready to Build Real Embedded Systems?</h3>
          <p style="font-size:15px; color:#9ca3af; margin-bottom:24px; max-width:400px; margin-left:auto; margin-right:auto;">Join Circuitron and learn through simulations, tasks, quizzes, and hands-on projects.</p>
          <router-link to="/login" class="btn btn-primary btn-lg" style="background:#ffffff; color:#000000; border:none; font-weight:800; font-size:14px; padding:12px 32px;">Start Learning Now ↗</router-link>
        </div>

      </div>
    </section>

    <!-- Testimonials -->
    <section class="section" style="background:#000000;">
      <div class="container">
        <div style="text-align:center;margin-bottom:48px;">
          <h2 class="section-title" style="color:white;">What Makers Say</h2>
        </div>
        <div class="grid-2">
          <div v-for="t in testimonials" :key="t.name" class="glass-card" style="padding:32px;">
            <p style="font-size:15px;color:#d1d5db;line-height:1.8;margin-bottom:24px;font-style:italic;">"{{ t.quote }}"</p>
            <div style="display:flex;align-items:center;gap:16px;">
              <div class="glowing-avatar" :style="`width:44px;height:44px;border-radius:50%;background:#ffffff;color:#000000;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;`">{{ t.avatar }}</div>
              <div>
                <div style="font-weight:700;font-size:15px;color:white;">{{ t.name }}</div>
                <div style="font-size:12px;color:#9ca3af;margin-top:2px;">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section" style="background:#000000;">
      <div class="container-sm">
        <div style="text-align:center;margin-bottom:48px;">
          <h2 class="section-title" style="color:white;">Frequently Asked Questions</h2>
        </div>
        <div>
          <div v-for="(faq, i) in faqs" :key="i"
            class="faq-item glass-card" :class="{ 'active-faq': active === i }"
            style="margin-bottom:12px;overflow:hidden;padding:0;">
            <button @click="active = active === i ? null : i"
              style="width:100%;display:flex;justify-content:space-between;align-items:center;padding:20px 24px;text-align:left;font-size:15px;font-weight:600;cursor:pointer;border:none;background:transparent;color:white; outline:none;">
              {{ faq.q }}
              <span style="font-size:22px;color:#ffffff;transition:transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);" :style="active===i?'transform:rotate(45deg)':''">+</span>
            </button>
            <div v-show="active === i" style="padding:0 24px 20px;font-size:14px;color:#9ca3af;line-height:1.7;border-top:1px solid rgba(255,255,255,0.05);background:rgba(0,0,0,0.15);margin-top:4px;">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer style="background:#000000;color:var(--slate-400);padding:48px 0;border-top:1px solid rgba(255,255,255,0.05);">
      <div class="container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
        <div class="brand" style="color:white;">
          <div class="brand-icon">⚡</div>
          Circuitron
        </div>
        <span style="font-size:13px;">© 2026 Circuitron Inc. — 14-Day Electronics Online Course Platform</span>
        <router-link to="/login" class="btn btn-primary btn-sm" style="background:#ffffff; color:#000000; border:none; font-weight:800;">Enter Platform →</router-link>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCircuitronStore } from '../stores/circuitron'
import Navbar from '../components/Navbar.vue'

const store = useCircuitronStore()
const active = ref(null)

const activeDay = ref(1)

const curriculumBadges = ['Arduino', 'ESP32', 'IoT', 'TinkerCAD', 'Wokwi', 'Blynk', 'AI Assisted Learning']

const progressPath = ['Foundation', 'Sensors', 'Automation', 'Arduino Project', 'ESP32', 'IoT', 'Smart Systems', 'Final Project']

const curriculumWeeks = [
  {
    week: 'WEEK 1 — Arduino & Embedded Systems',
    goal: 'Build strong foundations in Arduino programming, electronics, sensor interfacing, automation logic, and embedded systems workflows.',
    days: [
      { day: 1, title: 'Basics & Simulation', text: 'Introduction to Arduino, Arduino ecosystem, basic electronics, setup(), loop(), TinkerCAD simulation, LED blinking.' },
      { day: 2, title: 'Digital Logic', text: 'Digital input/output, push buttons, serial monitor, logic building, button-controlled systems.' },
      { day: 3, title: 'Sensors & Actuators', text: 'Sensors & actuators, ultrasonic sensor, LDR, IR sensor, buzzers, servo motors.' },
      { day: 4, title: 'Analog & Automation', text: 'PWM, analog signals, servo automation, motor concepts, automation workflows.' },
      { day: 5, title: 'System Integration', text: 'System integration, combining sensors and outputs, debugging basics, AI-assisted coding workflow.' },
      { day: 6, title: 'Mini Project', text: 'Arduino mini project implementation using Week 1 concepts.' },
      { day: 7, title: 'Submission', text: 'Project completion, debugging, documentation, and final submission.' }
    ]
  },
  {
    week: 'WEEK 2 — ESP32 & IoT Systems',
    goal: 'Introduce ESP32, cloud connectivity, IoT workflows, smart automation systems, and mobile-based control systems.',
    days: [
      { day: 8, title: 'ESP32 Architecture', text: 'Introduction to ESP32, architecture, GPIO, WiFi and Bluetooth basics, Wokwi setup.' },
      { day: 9, title: 'IoT & Cloud Connect', text: 'IoT fundamentals, smart communication systems, cloud connectivity, Blynk introduction.' },
      { day: 10, title: 'Smart Sensors', text: 'ESP32 sensor integration, real-time monitoring, smart sensor systems.' },
      { day: 11, title: 'Blynk Dashboards', text: 'Blynk dashboard setup, mobile app control, remote automation systems.' },
      { day: 12, title: 'Advanced IoT', text: 'Advanced IoT workflows, multi-device automation, smart home simulation.' },
      { day: 13, title: 'IoT Capstone', text: 'Final IoT-based mini project implementation using ESP32 and Blynk.' },
      { day: 14, title: 'Final Submission', text: 'Final project completion, testing, debugging, optimization, and submission.' }
    ]
  }
]


const stats = [
  { value: '14', label: 'Day Program' },
  { value: '8+', label: 'Lab Projects' },
  { value: '1-on-1', label: 'Mentor Feedback' },
  { value: '100%', label: 'Online' },
]

const tracks = [
  { icon: '⚙️', title: 'Embedded Systems Foundations', desc: 'Master microcontrollers from scratch. Breadboarding, digital/analog I/O, PWM, sensors, and I2C displays using Arduino Uno.', days: 'Days 1–5', bg: 'var(--slate-100)' },
  { icon: '📡', title: 'Internet of Things & Telemetry', desc: 'Step up to ESP32. Configure async web servers, MQTT brokers, and stream live sensor data to Adafruit IO cloud.', days: 'Days 6–9', bg: 'var(--slate-100)' },
  { icon: '🖥️', title: 'PCB Design & Fabrication', desc: 'Learn hardware creation with KiCad. Capture schematics, route PCB traces, generate Gerbers, and submit to fab.', days: 'Days 10–14', bg: 'var(--slate-100)' },
]

const testimonials = [
  { name: 'Alex Mercer', role: 'EE Undergraduate, MIT', avatar: 'AM', bg: 'var(--slate-900)', color: 'var(--slate-50)', quote: 'Circuitron simplified ESP32 networking for me! By Day 14 I deployed a custom PCB smart plant waterer sending real-time logs to Adafruit IO. Absolutely incredible platform.' },
  { name: 'Samantha Chen', role: 'Embedded IoT Hobbyist', avatar: 'SC', bg: 'var(--slate-200)', color: 'var(--slate-800)', quote: 'The mentor review flow is gold. Getting precise feedback on my KiCad traces prevented ordering a short-circuited PCB. The certificate after passing all quizzes was a huge motivator!' },
]

const faqs = [
  { q: 'Do I need any programming experience?', a: 'No! The curriculum starts with breadboard physics on Day 1 and progresses slowly into C++ microcontroller code. Step-by-step schematics are pre-loaded for every lesson.' },
  { q: 'What hardware is required?', a: 'None! The entire course is designed around online circuit simulators like Wokwi and Tinkercad. You can build, wire, and code all projects directly in your browser without purchasing any physical components.' },
  { q: 'How does project submission work?', a: 'After each lesson, submit a link to your online simulation workspace (e.g. Wokwi public link) or a screen recording. Mentors review your design, provide detailed comments, and approve or request adjustments before marking the day complete.' },
  { q: 'How do I earn my certificate?', a: 'Complete all 14 lessons, pass each daily quiz, and have your final IoT Capstone project approved by a Mentor. The system then unlocks a downloadable certificate with a unique verification code.' },
]
</script>

<style scoped>
.glass-card {
  background: rgba(17, 17, 17, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 12px 30px rgba(255, 255, 255, 0.12);
}

.glowing-avatar {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  border: 2px solid #000000;
}

.faq-item.active-faq {
  border-color: rgba(255, 255, 255, 0.4) !important;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.1);
  background: rgba(17, 17, 17, 0.9);
}

.glass-tag {
  background: rgba(255, 255, 255, 0.05) !important;
  color: #d1d5db !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  transition: all 0.2s;
}

.glass-tag:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
}
</style>
