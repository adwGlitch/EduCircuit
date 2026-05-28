<template>
  <div style="min-height:100vh;background:var(--slate-50);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;">
    <Navbar />
    <div style="max-width:720px;width:100%;text-align:center;padding:60px 0 0;">
      <div style="font-size:48px;margin-bottom:24px;">🏆</div>
      <h1 style="font-size:36px;font-weight:900;margin-bottom:12px;">Certificate of Completion</h1>
      <p style="color:var(--slate-500);font-size:16px;margin-bottom:48px;">This certifies that the following individual has successfully completed the Circuitron 14-Day Electronics Workshop.</p>

      <!-- Certificate card -->
      <div class="card" style="padding:56px 48px;border:2px solid var(--slate-200);position:relative;overflow:hidden;margin-bottom:32px;" id="certificate">
        <!-- Decorative corner -->
        <div style="position:absolute;top:-40px;right:-40px;width:120px;height:120px;background:var(--primary-light);border-radius:50%;opacity:0.5;"></div>
        <div style="position:absolute;bottom:-30px;left:-30px;width:80px;height:80px;background:var(--primary-light);border-radius:50%;opacity:0.3;"></div>

        <div style="position:relative;">
          <!-- Header -->
          <div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:32px;">
            <div class="brand-icon" style="width:48px;height:48px;font-size:24px;border-radius:14px;">⚡</div>
            <span style="font-size:24px;font-weight:900;color:var(--slate-900);">Circuitron</span>
          </div>

          <div style="font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--slate-400);margin-bottom:16px;">Certificate of Completion</div>

          <div style="font-size:14px;color:var(--slate-500);margin-bottom:12px;">This certifies that</div>
          <div style="font-size:40px;font-weight:900;color:var(--slate-900);margin-bottom:12px;font-style:italic;">{{ store.currentUser.name }}</div>
          <div style="width:200px;height:2px;background:var(--primary);margin:0 auto 20px;"></div>

          <div style="font-size:15px;color:var(--slate-600);line-height:1.7;max-width:480px;margin:0 auto 28px;">
            has successfully completed all <strong>14 days</strong> of the Circuitron Electronics Workshop, 
            including all quizzes, lab submissions, and the final IoT capstone project.
          </div>

          <!-- Completion topics -->
          <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:32px;">
            <span v-for="t in topics" :key="t" class="badge badge-blue" style="font-size:12px;">{{ t }}</span>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:flex-end;padding-top:24px;border-top:1px solid var(--slate-100);">
            <div style="text-align:left;">
              <div style="font-size:12px;color:var(--slate-400);">Issue Date</div>
              <div style="font-size:14px;font-weight:700;">{{ issueDate }}</div>
            </div>
            <div style="text-align:center;">
              <div style="width:120px;height:2px;background:var(--slate-300);margin-bottom:6px;"></div>
              <div style="font-size:12px;color:var(--slate-400);">Program Director</div>
              <div style="font-size:13px;font-weight:600;">Dr. Sarah Kim</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:12px;color:var(--slate-400);">Certificate ID</div>
              <div style="font-size:13px;font-weight:700;color:var(--primary-dark);">CRN-{{ certId }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button class="btn btn-primary btn-lg" @click="downloadCert">⬇️ Download Certificate</button>
        <button class="btn btn-ghost btn-lg" @click="shareCert">🔗 Share Certificate</button>
        <router-link to="/dashboard" class="btn btn-ghost btn-lg">← Back to Dashboard</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCircuitronStore } from '../stores/circuitron'
import Navbar from '../components/Navbar.vue'

const store = useCircuitronStore()
const certId = ref(Math.random().toString(36).substring(2, 10).toUpperCase())
const issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const topics = ['Arduino Embedded Systems', 'ESP32 & WiFi', 'MQTT & IoT Cloud', 'PCB Design with KiCad', 'Gerber File Export', 'Hardware Prototyping']

function downloadCert() { alert('In production, this would generate and download a PDF certificate.') }
function shareCert() { 
  if (navigator.clipboard) {
    navigator.clipboard.writeText(`https://circuitron.io/verify/${certId.value}`)
    alert('Certificate verification link copied to clipboard!')
  }
}
</script>
