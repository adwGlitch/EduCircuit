import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// ── localStorage helpers ──────────────────────────────────────────────────────
const LS = {
  get: (key, fallback) => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : fallback
    } catch { return fallback }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  },
  remove: (key) => { try { localStorage.removeItem(key) } catch {} }
}

// ── Seed default users (only written once) ────────────────────────────────────
const DEFAULT_USERS = [
  { email: 'admin@circuitron.io', password: 'admin123', name: 'Admin User', role: 'admin', avatar: 'AU', joined: 'Jan 2026' },
  { email: 'mentor@circuitron.io', password: 'mentor123', name: 'Dr. Sarah Kim', role: 'mentor', avatar: 'SK', joined: 'Jan 2026' },
  { email: 'alex@example.com', password: 'alex123', name: 'Alex Mercer', role: 'student', avatar: 'AM', joined: 'May 2026', progress: 30, score: 87, submissions: 3 },
  { email: 'sam@example.com', password: 'sam123', name: 'Samantha Chen', role: 'student', avatar: 'SC', joined: 'May 2026', progress: 60, score: 91, submissions: 6 },
  { email: 'marcus@example.com', password: 'marcus123', name: 'Marcus Johnson', role: 'student', avatar: 'MJ', joined: 'Jan 2026', progress: 100, score: 94, submissions: 14 },
  { email: 'priya@example.com', password: 'priya123', name: 'Priya Patel', role: 'student', avatar: 'PP', joined: 'Feb 2026', progress: 45, score: 78, submissions: 4 },
  { email: 'james@example.com', password: 'james123', name: 'James Lee', role: 'student', avatar: 'JL', joined: 'Apr 2026', progress: 15, score: 80, submissions: 1 },
  { email: 'fatima@example.com', password: 'fatima123', name: 'Fatima Al-Rashid', role: 'student', avatar: 'FA', joined: 'Mar 2026', progress: 80, score: 96, submissions: 10 },
]

function seedUsersDb() {
  if (!localStorage.getItem('circuitron_users_seeded')) {
    LS.set('circuitron_users', DEFAULT_USERS)
    localStorage.setItem('circuitron_users_seeded', '1')
  }
}

// ── Default curriculum lessons ────────────────────────────────────────────────
const DEFAULT_LESSONS = [
  {
    day: 1,
    title: 'Introduction to Electronics & Safety',
    summary: 'Breadboard anatomy, Ohm\'s law, resistor color codes, safe workspace setup and first LED blink circuit.',
    tags: ['Arduino', 'Basics'],
    status: 'active',
    quizScore: null,
    videoUrl: '', videoEmbed: '',
    duration: '25 min',
    objectives: 'Understand basic electronic components, build your first LED circuit, and learn lab safety rules.',
    components: 'Web Browser & Online Simulator (Wokwi or Tinkercad)',
    notes: 'Always check resistor values before connecting to a circuit. LEDs have polarity — the longer leg is the anode (+).',
    codeUrl: '', schematicUrl: '',
    quizQuestions: [
      { q: 'What is Ohm\'s Law?', options: ['V = IR', 'P = IV', 'I = VP', 'R = VI²'], answer: 0 },
      { q: 'What does a pull-up resistor do?', options: ['Pulls signal to GND', 'Pulls signal to VCC', 'Limits current to motor', 'Filters noise'], answer: 1 },
      { q: 'Which color band on a resistor represents tolerance?', options: ['First band', 'Second band', 'Third band', 'Last band'], answer: 3 },
    ],
  },
  {
    day: 2,
    title: 'Digital I/O and Button Inputs',
    summary: 'Pull-up/pull-down resistors, debouncing, multiple LEDs, traffic light state machine.',
    tags: ['Arduino', 'Digital'],
    status: 'locked',
    quizScore: null,
    videoUrl: '', videoEmbed: '',
    duration: '30 min',
    objectives: 'Read digital inputs from push buttons, implement software debouncing, and build a multi-LED state machine.',
    components: 'Web Browser & Online Simulator (Wokwi or Tinkercad)',
    notes: 'Mechanical buttons produce electrical noise when pressed. Use millis()-based debouncing for reliable reads.',
    codeUrl: '', schematicUrl: '',
    quizQuestions: [
      { q: 'What is signal debouncing?', options: ['Filtering noise from a button press', 'Increasing PWM frequency', 'Filtering I2C clock', 'Modulating motor speed'], answer: 0 },
      { q: 'A pull-down resistor connects between signal and?', options: ['VCC', 'GND', 'PWM pin', 'SDA pin'], answer: 1 },
    ],
  },
  {
    day: 3,
    title: 'Analog Signals & Sensors',
    summary: 'ADC fundamentals, LDR light sensor, potentiometer dimmer, serial plotter visualization.',
    tags: ['Arduino', 'Sensors'],
    status: 'locked',
    quizScore: null,
    videoUrl: '', videoEmbed: '',
    duration: '28 min',
    objectives: 'Use the Arduino ADC to read analog sensors, map values to output ranges, and visualize data over serial.',
    components: 'Web Browser & Online Simulator (Wokwi or Tinkercad)',
    notes: 'The Arduino Uno has a 10-bit ADC (0–1023). Use the map() function to scale sensor readings to desired ranges.',
    codeUrl: '', schematicUrl: '',
    quizQuestions: [
      { q: 'ADC stands for?', options: ['Analog-to-Digital Converter', 'Async Data Communication', 'Automatic Device Controller', 'Amplitude Divider Circuit'], answer: 0 },
      { q: "Arduino Uno's ADC resolution is?", options: ['8-bit', '10-bit', '12-bit', '16-bit'], answer: 1 },
    ],
  },
  {
    day: 4,
    title: 'PWM & Motor Control',
    summary: 'PWM duty cycles, DC motor speed control with L298N H-bridge driver, fan automation.',
    tags: ['Arduino', 'PWM'],
    status: 'locked',
    quizScore: null,
    videoUrl: '', videoEmbed: '',
    duration: '35 min',
    objectives: 'Understand PWM signals, control motor speed and direction using L298N driver, build a temperature-triggered fan.',
    components: 'Web Browser & Online Simulator (Wokwi or Tinkercad)',
    notes: 'Never connect a motor directly to Arduino pins — always use a driver IC. Motors can draw 200–600mA which exceeds Arduino pin limits.',
    codeUrl: '', schematicUrl: '',
    quizQuestions: [
      { q: 'PWM stands for?', options: ['Pulse Width Modulation', 'Power Wave Multiplexing', 'Parallel Wire Method', 'Phase Width Management'], answer: 0 },
      { q: 'What is 50% PWM duty cycle on a 5V system?', options: ['0V average', '2.5V average', '5V average', '1.25V average'], answer: 1 },
    ],
  },
  {
    day: 5,
    title: 'System Integration & AI Workflow',
    summary: 'Combining sensors and outputs, debugging basics, AI-assisted coding workflow.',
    tags: ['Arduino', 'AI', 'Integration'],
    status: 'locked',
    quizScore: null,
    videoUrl: '', videoEmbed: '',
    duration: '32 min',
    objectives: 'Learn the I2C protocol, wire a 128x64 OLED display, and show live sensor data with custom graphics.',
    components: 'Web Browser & Online Simulator (Wokwi or Tinkercad)',
    notes: 'I2C requires pull-up resistors on SDA and SCL lines. Default OLED I2C address is 0x3C — use I2C scanner sketch to confirm.',
    codeUrl: '', schematicUrl: '',
    quizQuestions: [
      { q: 'How many wires does I2C use for data?', options: ['1', '2', '4', '8'], answer: 1 },
      { q: 'What is the default I2C address of most SSD1306 OLEDs?', options: ['0x27', '0x3C', '0x48', '0x76'], answer: 1 },
    ],
  },
  {
    day: 6,
    title: 'Arduino Mini Project',
    summary: 'Arduino mini project implementation using Week 1 concepts.',
    tags: ['Arduino', 'Project'],
    status: 'locked',
    quizScore: null,
    videoUrl: '', videoEmbed: '',
    duration: '30 min',
    objectives: 'Set up the ESP32 in Arduino IDE, connect to WiFi, perform HTTP GET requests, and parse JSON responses.',
    components: 'Web Browser & Online Simulator (Wokwi)',
    notes: 'ESP32 operates at 3.3V logic — do not connect 5V signals directly.',
    codeUrl: '', schematicUrl: '',
    quizQuestions: [
      { q: 'ESP32 operates at which voltage level?', options: ['5V', '3.3V', '1.8V', '12V'], answer: 1 },
      { q: 'Which library is used for WiFi on ESP32?', options: ['Ethernet.h', 'WiFi.h', 'Network.h', 'ESP8266WiFi.h'], answer: 1 },
    ],
  },
  {
    day: 7,
    title: 'Project Submission & Documentation',
    summary: 'Project completion, debugging, documentation, and final submission.',
    tags: ['Arduino', 'Submission'],
    status: 'locked',
    quizScore: null,
    videoUrl: '', videoEmbed: '',
    duration: '40 min',
    objectives: 'Host a full HTML/CSS web page on ESP32, create REST endpoints, and toggle a relay from a browser UI.',
    components: 'Web Browser & Online Simulator (Wokwi)',
    notes: 'Use ESPAsyncWebServer library for non-blocking HTTP handling.',
    codeUrl: '', schematicUrl: '',
    quizQuestions: [
      { q: 'Which library provides async HTTP on ESP32?', options: ['WebServer.h', 'ESPAsyncWebServer', 'HTTPClient.h', 'AsyncTCP.h'], answer: 1 },
    ],
  },
  {
    day: 8,
    title: 'ESP32 Architecture & GPIO',
    summary: 'Introduction to ESP32, architecture, GPIO, WiFi and Bluetooth basics, Wokwi setup.',
    tags: ['ESP32', 'WiFi', 'IoT'],
    status: 'locked',
    quizScore: null,
    videoUrl: '', videoEmbed: '',
    duration: '38 min',
    objectives: 'Understand the MQTT publish-subscribe model, connect to Adafruit IO broker, and stream sensor data to a live dashboard.',
    components: 'Web Browser & Online Simulator (Wokwi)',
    notes: 'Create a free Adafruit IO account before this lesson. MQTT uses port 1883 (unencrypted) or 8883 (TLS).',
    codeUrl: '', schematicUrl: '',
    quizQuestions: [
      { q: 'MQTT uses which communication model?', options: ['Request-Response', 'Publish-Subscribe', 'Peer-to-Peer', 'Polling'], answer: 1 },
      { q: 'Default unencrypted MQTT port is?', options: ['80', '443', '1883', '8080'], answer: 2 },
    ],
  },
  {
    day: 9,
    title: 'IoT & Cloud Connectivity',
    summary: 'IoT fundamentals, smart communication systems, cloud connectivity, Blynk introduction.',
    tags: ['ESP32', 'IoT', 'Blynk'],
    status: 'locked',
    quizScore: null,
    videoUrl: '', videoEmbed: '',
    duration: '60 min',
    objectives: 'Integrate all ESP32 skills into a single deployable smart home sensor node with cloud reporting.',
    components: 'Web Browser & Online Simulator (Wokwi)',
    notes: 'This is your first graded capstone project. Focus on code clarity and stable WiFi reconnection logic.',
    codeUrl: '', schematicUrl: '',
    quizQuestions: [
      { q: 'Which sensor measures both temperature and humidity?', options: ['LDR', 'DHT22', 'HC-SR04', 'MPU6050'], answer: 1 },
    ],
  },
  {
    day: 10,
    title: 'ESP32 Smart Sensors',
    summary: 'ESP32 sensor integration, real-time monitoring, smart sensor systems.',
    tags: ['ESP32', 'Sensors', 'IoT'],
    status: 'locked',
    quizScore: null,
    videoUrl: '', videoEmbed: '',
    duration: '45 min',
    objectives: 'Navigate the KiCad EDA suite, draw a complete schematic, assign PCB footprints, and generate a netlist.',
    components: 'Web Browser & Online Simulator (Wokwi)',
    notes: 'Real-time sensor monitoring requires efficient loop timing. Use non-blocking millis() patterns.',
    codeUrl: '', schematicUrl: '',
    quizQuestions: [
      { q: 'KiCad is used for?', options: ['Writing firmware', 'PCB schematic and layout design', '3D printing', 'Network configuration'], answer: 1 },
    ],
  },
  {
    day: 11,
    title: 'Blynk Dashboard & Mobile Control',
    summary: 'Blynk dashboard setup, mobile app control, remote automation systems.',
    tags: ['ESP32', 'Blynk', 'Mobile'],
    status: 'locked',
    quizScore: null,
    videoUrl: '', videoEmbed: '',
    duration: '50 min',
    objectives: 'Define board outline, place components optimally, route traces manually and with auto-router, and run DRC.',
    components: 'Web Browser & Online Simulator (Wokwi)',
    notes: 'Use at least 0.3mm trace width for signal lines and 0.8mm for power lines.',
    codeUrl: '', schematicUrl: '',
    quizQuestions: [
      { q: 'DRC in PCB design stands for?', options: ['Dynamic Routing Check', 'Design Rule Check', 'Digital Reference Chart', 'Differential Route Config'], answer: 1 },
    ],
  },
  {
    day: 12,
    title: 'Advanced IoT & Smart Home',
    summary: 'Advanced IoT workflows, multi-device automation, smart home simulation.',
    tags: ['ESP32', 'IoT', 'Automation'],
    status: 'locked',
    quizScore: null,
    videoUrl: '', videoEmbed: '',
    duration: '45 min',
    objectives: 'Apply professional IoT techniques: multi-device control, automation triggers, and dashboards.',
    components: 'Web Browser & Online Simulator (Wokwi)',
    notes: 'Place decoupling capacitors near every IC power pin. Ground planes dramatically reduce EMI.',
    codeUrl: '', schematicUrl: '',
    quizQuestions: [
      { q: 'What is the purpose of a ground plane on a PCB?', options: ['Reduce EMI and provide stable reference', 'Increase board cost', 'Add more routing layers', 'None of the above'], answer: 0 },
    ],
  },
  {
    day: 13,
    title: 'Final IoT Capstone Project',
    summary: 'Final IoT-based mini project implementation using ESP32 and Blynk.',
    tags: ['ESP32', 'Blynk', 'Capstone'],
    status: 'locked',
    quizScore: null,
    videoUrl: '', videoEmbed: '',
    duration: '35 min',
    objectives: 'Export complete Gerber files from KiCad, review them in GerbView, perform DFM checks, and get a fab quote.',
    components: 'Web Browser & Online Simulator (Wokwi)',
    notes: 'Always review your project deliverables before submission. Check all automations are working correctly.',
    codeUrl: '', schematicUrl: '',
    quizQuestions: [
      { q: 'Gerber files are used for?', options: ['Programming microcontrollers', 'PCB manufacturing', '3D modeling', 'Simulation'], answer: 1 },
    ],
  },
  {
    day: 14,
    title: 'Final Submission & Certificate',
    summary: 'Final project completion, testing, debugging, optimization, and submission.',
    tags: ['Capstone', 'Certificate'],
    status: 'locked',
    quizScore: null,
    videoUrl: '', videoEmbed: '',
    duration: '90 min',
    objectives: 'Deliver a complete IoT system integrating all 14 days of learning, reviewed and approved by a mentor.',
    components: 'Wokwi Simulation + Blynk Dashboard',
    notes: 'Your final submission must include: working firmware, Blynk dashboard screenshot, simulation video, and documentation.',
    codeUrl: '', schematicUrl: '',
    quizQuestions: [
      { q: 'Which protocol is used for IoT telemetry in this course?', options: ['HTTP', 'MQTT', 'FTP', 'SSH'], answer: 1 },
    ],
  },
]

// ── The Store ─────────────────────────────────────────────────────────────────
export const useCircuitronStore = defineStore('circuitron', () => {

  // Seed default users if first time
  seedUsersDb()

  // ── Auth state (persisted in localStorage) ──────────────────────────────────
  const isLoggedIn = ref(!!LS.get('circuitron_session', null))
  const loggedUser = ref(LS.get('circuitron_session', null))
  const currentRole = ref(loggedUser.value?.role || null)

  const _activeRole = ref(currentRole.value || 'student')
  const activeRole = computed({
    get: () => currentRole.value || _activeRole.value,
    set: (val) => { _activeRole.value = val; currentRole.value = val }
  })

  const currentUser = computed(() => isLoggedIn.value ? loggedUser.value : null)

  // ── Users database (persisted) ──────────────────────────────────────────────
  const usersDb = ref(LS.get('circuitron_users', DEFAULT_USERS))
  watch(usersDb, (val) => LS.set('circuitron_users', val), { deep: true })

  // ── Per-user lesson progress (stored by email key) ──────────────────────────
  function getLessonStorageKey(email) {
    return `circuitron_lessons_${email.toLowerCase()}`
  }

  function loadLessonsForUser(email) {
    const saved = LS.get(getLessonStorageKey(email), null)
    if (saved && saved.length === DEFAULT_LESSONS.length) {
      return saved
    }
    // First time: return default lessons with only Day 1 active
    return DEFAULT_LESSONS.map((l, i) => ({
      ...l,
      status: i === 0 ? 'active' : 'locked',
      quizScore: null
    }))
  }

  function saveLessonsForUser(email) {
    LS.set(getLessonStorageKey(email), lessons.value)
  }

  // ── Lessons (loaded per user on login) ──────────────────────────────────────
  const lessons = ref(
    loggedUser.value?.email
      ? loadLessonsForUser(loggedUser.value.email)
      : DEFAULT_LESSONS.map((l, i) => ({ ...l, status: i === 0 ? 'active' : 'locked', quizScore: null }))
  )

  // Auto-save lessons to localStorage whenever they change
  watch(lessons, () => {
    if (loggedUser.value?.email) {
      saveLessonsForUser(loggedUser.value.email)
    }
  }, { deep: true })

  const completedDays = computed(() => lessons.value.filter(l => l.status === 'done').length)
  const progressPercent = computed(() => Math.round((completedDays.value / lessons.value.length) * 100))
  const avgScore = computed(() => {
    const scored = lessons.value.filter(l => l.quizScore !== null)
    return scored.length ? Math.round(scored.reduce((a, b) => a + b.quizScore, 0) / scored.length) : 0
  })

  // ── Admin: update a lesson ──────────────────────────────────────────────────
  function updateLesson(day, fields) {
    const lesson = lessons.value.find(l => l.day === day)
    if (lesson) Object.assign(lesson, fields)
  }

  // ── Students list (derived from usersDb for admin/mentor view) ──────────────
  const students = computed(() =>
    usersDb.value
      .filter(u => u.role === 'student')
      .map(u => ({
        id: u.email,
        name: u.name,
        email: u.email,
        avatar: u.avatar || u.name.charAt(0).toUpperCase(),
        progress: u.progress || 0,
        score: u.score || 0,
        submissions: u.submissions || 0,
        status: u.status || 'active',
      }))
  )

  // ── Submissions (persisted) ─────────────────────────────────────────────────
  const submissions = ref(LS.get('circuitron_submissions', [
    { id: 1, student: 'Alex Mercer', avatar: 'AM', day: 4, title: 'PWM Motor Speed Controller', type: 'Code + Video', submitted: '2h ago', status: 'pending', feedback: '', codeUrl: 'https://github.com/alexmercer/day4-pwm', demoUrl: '' },
    { id: 2, student: 'Samantha Chen', avatar: 'SC', day: 5, title: 'Smart Sensor Dashboard', type: 'Code + Photo', submitted: '5h ago', status: 'pending', feedback: '', codeUrl: 'https://github.com/samchen/day5-oled', demoUrl: '' },
    { id: 3, student: 'Priya Patel', avatar: 'PP', day: 3, title: 'LDR Auto-Dimmer Circuit', type: 'Photo + Schematic', submitted: '1d ago', status: 'approved', feedback: 'Great work! Clean schematic, excellent wiring.', codeUrl: '', demoUrl: '' },
  ]))
  watch(submissions, (val) => LS.set('circuitron_submissions', val), { deep: true })

  function approveSubmission(id, feedback) {
    const s = submissions.value.find(s => s.id === id)
    if (s) { s.status = 'approved'; s.feedback = feedback }
  }
  function requestRevision(id, feedback) {
    const s = submissions.value.find(s => s.id === id)
    if (s) { s.status = 'revision'; s.feedback = feedback }
  }

  function getQuizForDay(day) {
    const lesson = lessons.value.find(l => l.day === day)
    return lesson?.quizQuestions?.length
      ? lesson.quizQuestions
      : [{ q: `Sample question for Day ${day}`, options: ['Option A', 'Option B', 'Option C', 'Option D'], answer: 0 }]
  }

  // ── Quiz submission: unlock next day ─────────────────────────────────────────
  function submitQuiz(day, score) {
    const lesson = lessons.value.find(l => l.day === day)
    if (lesson) {
      lesson.quizScore = score
      lesson.status = 'done'
    }
    // Unlock next lesson
    const next = lessons.value.find(l => l.day === day + 1)
    if (next && next.status === 'locked') {
      next.status = 'active'
    }
    // Update student progress in usersDb
    if (loggedUser.value?.email) {
      const user = usersDb.value.find(u => u.email.toLowerCase() === loggedUser.value.email.toLowerCase())
      if (user) {
        user.progress = progressPercent.value
        const allScores = lessons.value.filter(l => l.quizScore !== null).map(l => l.quizScore)
        user.score = allScores.length ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0
      }
    }
  }

  // ── Authentication ──────────────────────────────────────────────────────────
  function login(email, password) {
    const user = usersDb.value.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (user) {
      isLoggedIn.value = true
      loggedUser.value = user
      currentRole.value = user.role

      // Save session to localStorage
      LS.set('circuitron_session', user)

      // Load this user's saved lesson progress
      if (user.role === 'student') {
        lessons.value = loadLessonsForUser(user.email)
      }

      return { success: true, role: user.role }
    }
    return { success: false, message: 'Invalid email or password' }
  }

  function logout() {
    isLoggedIn.value = false
    loggedUser.value = null
    currentRole.value = null
    LS.remove('circuitron_session')
  }

  function register(email, name, password) {
    if (!email || !name || !password) {
      return { success: false, message: 'All fields are required.' }
    }
    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' }
    }
    if (usersDb.value.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'An account with this email already exists.' }
    }
    const initials = name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    const newUser = {
      email: email.trim().toLowerCase(),
      password,
      name: name.trim(),
      role: 'student',
      avatar: initials,
      joined: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
      progress: 0,
      score: 0,
      submissions: 0,
      status: 'active'
    }
    usersDb.value.push(newUser)
    return { success: true }
  }

  return {
    activeRole, currentUser, isLoggedIn, currentRole, usersDb,
    lessons, completedDays, progressPercent, avgScore,
    updateLesson, submitQuiz,
    students, submissions,
    approveSubmission, requestRevision, getQuizForDay,
    login, logout, register,
  }
})
