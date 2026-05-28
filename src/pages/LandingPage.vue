<template>
  <div>
    <Navbar />

    <!-- Hero -->
    <section style="background:white;padding:80px 0 60px;border-bottom:1px solid var(--slate-100);">
      <div class="container" style="text-align:center;">
        <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:999px;background:var(--primary-light);color:#0369a1;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:28px;border:1px solid #bae6fd;">
          <span class="dot-ping" style="width:8px;height:8px;border-radius:50%;background:var(--primary);display:inline-block;"></span>
          Next 14-Day Cohort — Enrolling Now
        </div>
        <h1 style="font-size:56px;font-weight:900;letter-spacing:-1.5px;line-height:1.1;margin-bottom:20px;" class="fade-up">
          Learn Electronics Through<br>
          <span style="color:var(--primary);">Real Projects</span>
        </h1>
        <p style="font-size:18px;color:var(--slate-500);max-width:580px;margin:0 auto 36px;line-height:1.7;">
          Hands-on workshops covering Arduino, ESP32, IoT, and PCB design. 
          Built for engineering students, hobbyists, and absolute beginners.
        </p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
          <router-link to="/dashboard" class="btn btn-primary btn-lg">
            Start Coding — Day 1 ↗
          </router-link>
          <a href="#curriculum" class="btn btn-ghost btn-lg">View 14-Day Syllabus</a>
        </div>

        <!-- Stats strip -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:32px;max-width:640px;margin:64px auto 0;padding-top:40px;border-top:1px solid var(--slate-100);">
          <div v-for="s in stats" :key="s.label">
            <div class="stat-number">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Tracks -->
    <section class="section" style="background:var(--slate-50);">
      <div class="container">
        <div style="text-align:center;margin-bottom:48px;">
          <h2 class="section-title">Three Engineering Tracks</h2>
          <p class="section-subtitle" style="margin:0 auto;">A logical progression from basic analog to wireless IoT and custom PCB hardware.</p>
        </div>
        <div class="grid-3">
          <div v-for="track in tracks" :key="track.title" class="card card-hover" style="padding:32px;">
            <div :style="`width:48px;height:48px;border-radius:12px;background:${track.bg};display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:20px;`">{{ track.icon }}</div>
            <h3 style="font-size:17px;margin-bottom:10px;">{{ track.title }}</h3>
            <p style="font-size:14px;color:var(--slate-500);line-height:1.7;margin-bottom:16px;">{{ track.desc }}</p>
            <span class="badge badge-gray">{{ track.days }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Curriculum Timeline -->
    <section id="curriculum" class="section" style="background:white;">
      <div class="container-sm">
        <div style="text-align:center;margin-bottom:48px;">
          <h2 class="section-title">The 14-Day Syllabus</h2>
          <p class="section-subtitle" style="margin:0 auto;">Project-focused lessons designed to build real skills, one day at a time.</p>
        </div>
        <div style="position:relative;padding-left:40px;border-left:2px solid var(--slate-200);">
          <div v-for="lesson in store.lessons" :key="lesson.day"
            style="margin-bottom:32px;position:relative;">
            <!-- dot -->
            <div style="position:absolute;left:-49px;top:4px;width:16px;height:16px;border-radius:50%;background:white;border:2px solid var(--primary);display:flex;align-items:center;justify-content:center;">
              <div style="width:6px;height:6px;border-radius:50%;background:var(--primary);"></div>
            </div>
            <!-- day label -->
            <span class="badge badge-blue" style="margin-bottom:8px;font-size:11px;">Day {{ lesson.day }}</span>
            <h3 style="font-size:16px;margin-bottom:6px;">{{ lesson.title }}</h3>
            <p style="font-size:14px;color:var(--slate-500);line-height:1.65;">{{ lesson.summary }}</p>
            <div class="tag-strip" style="margin-top:10px;">
              <span v-for="tag in lesson.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section" style="background:var(--slate-50);">
      <div class="container">
        <div style="text-align:center;margin-bottom:48px;">
          <h2 class="section-title">What Makers Say</h2>
        </div>
        <div class="grid-2">
          <div v-for="t in testimonials" :key="t.name" class="card" style="padding:32px;">
            <p style="font-size:15px;color:var(--slate-600);line-height:1.8;margin-bottom:24px;font-style:italic;">"{{ t.quote }}"</p>
            <div style="display:flex;align-items:center;gap:12px;">
              <div :style="`width:40px;height:40px;border-radius:50%;background:${t.bg};color:${t.color};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;`">{{ t.avatar }}</div>
              <div>
                <div style="font-weight:700;font-size:14px;">{{ t.name }}</div>
                <div style="font-size:12px;color:var(--slate-400);">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section" style="background:white;">
      <div class="container-sm">
        <div style="text-align:center;margin-bottom:48px;">
          <h2 class="section-title">Frequently Asked Questions</h2>
        </div>
        <div>
          <div v-for="(faq, i) in faqs" :key="i"
            style="border:1px solid var(--slate-200);border-radius:12px;margin-bottom:8px;overflow:hidden;">
            <button @click="active = active === i ? null : i"
              style="width:100%;display:flex;justify-content:space-between;align-items:center;padding:18px 22px;text-align:left;font-size:15px;font-weight:600;cursor:pointer;border:none;background:transparent;color:var(--slate-900);">
              {{ faq.q }}
              <span style="font-size:20px;color:var(--slate-400);transition:transform 0.2s;" :style="active===i?'transform:rotate(45deg)':''">+</span>
            </button>
            <div v-show="active === i" style="padding:0 22px 18px;font-size:14px;color:var(--slate-600);line-height:1.7;border-top:1px solid var(--slate-100);background:var(--slate-50);">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer style="background:var(--slate-900);color:var(--slate-400);padding:48px 0;">
      <div class="container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
        <div class="brand" style="color:white;">
          <div class="brand-icon">⚡</div>
          Circuitron
        </div>
        <span style="font-size:13px;">© 2026 Circuitron Inc. — 14-Day Electronics Workshop Platform</span>
        <router-link to="/dashboard" class="btn btn-primary btn-sm">Enter Platform →</router-link>
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

const stats = [
  { value: '14', label: 'Day Program' },
  { value: '8+', label: 'Lab Projects' },
  { value: '1-on-1', label: 'Mentor Feedback' },
  { value: '100%', label: 'Hands-on' },
]

const tracks = [
  { icon: '⚙️', title: 'Embedded Systems Foundations', desc: 'Master microcontrollers from scratch. Breadboarding, digital/analog I/O, PWM, sensors, and I2C displays using Arduino Uno.', days: 'Days 1–5', bg: '#e0f2fe' },
  { icon: '📡', title: 'Internet of Things & Telemetry', desc: 'Step up to ESP32. Configure async web servers, MQTT brokers, and stream live sensor data to Adafruit IO cloud.', days: 'Days 6–9', bg: '#dcfce7' },
  { icon: '🖥️', title: 'PCB Design & Fabrication', desc: 'Learn hardware creation with KiCad. Capture schematics, route PCB traces, generate Gerbers, and submit to fab.', days: 'Days 10–14', bg: '#ede9fe' },
]

const testimonials = [
  { name: 'Alex Mercer', role: 'EE Undergraduate, MIT', avatar: 'AM', bg: '#e0f2fe', color: '#0369a1', quote: 'Circuitron simplified ESP32 networking for me! By Day 14 I deployed a custom PCB smart plant waterer sending real-time logs to Adafruit IO. Absolutely incredible platform.' },
  { name: 'Samantha Chen', role: 'Embedded IoT Hobbyist', avatar: 'SC', bg: '#dcfce7', color: '#15803d', quote: 'The mentor review flow is gold. Getting precise feedback on my KiCad traces prevented ordering a short-circuited PCB. The certificate after passing all quizzes was a huge motivator!' },
]

const faqs = [
  { q: 'Do I need any programming experience?', a: 'No! The curriculum starts with breadboard physics on Day 1 and progresses slowly into C++ microcontroller code. Step-by-step schematics are pre-loaded for every lesson.' },
  { q: 'What hardware is required?', a: 'You need a starter kit: Arduino Uno, ESP32 Dev Board, breadboard, HC-SR04 ultrasonic sensor, LDR photoresistor, DC motor + L298N driver, I2C OLED display, plus LEDs, resistors, and jumper wires.' },
  { q: 'How does project submission work?', a: 'After each lesson, submit a GitHub link, demo video, or circuit photo. Mentors review your design, provide detailed comments, and approve or request adjustments before marking the day complete.' },
  { q: 'How do I earn my certificate?', a: 'Complete all 14 lessons, pass each daily quiz, and have your final IoT Capstone project approved by a Mentor. The system then unlocks a downloadable certificate with a unique verification code.' },
]
</script>
