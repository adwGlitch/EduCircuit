import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCircuitronStore = defineStore('circuitron', () => {
  // ── State ──────────────────────────────────────────────────────────────────
  const activeRole = ref('student') // 'student' | 'mentor' | 'admin'

  const currentUser = computed(() => ({
    student: { name: 'Alex Mercer', email: 'alex@circuitron.io', avatar: 'AM', joined: 'May 2026' },
    mentor: { name: 'Dr. Sarah Kim', email: 'sarah@circuitron.io', avatar: 'SK', joined: 'Jan 2026' },
    admin: { name: 'Admin User', email: 'admin@circuitron.io', avatar: 'AU', joined: 'Jan 2026' },
  }[activeRole.value]))

  // ── Curriculum ─────────────────────────────────────────────────────────────
  const lessons = ref([
    {
      day: 1,
      title: 'Introduction to Electronics & Safety',
      summary: 'Breadboard anatomy, Ohm\'s law, resistor color codes, safe workspace setup and first LED blink circuit.',
      tags: ['Arduino', 'Basics'],
      status: 'done',
      quizScore: 90,
      videoUrl: '',
      videoEmbed: '',
      duration: '25 min',
      objectives: 'Understand basic electronic components, build your first LED circuit, and learn lab safety rules.',
      components: 'Arduino Uno, Breadboard, 220Ω Resistors (×5), LEDs (×5), USB Cable, Jumper Wires',
      notes: 'Always check resistor values before connecting to a circuit. LEDs have polarity — the longer leg is the anode (+).',
      codeUrl: '',
      schematicUrl: '',
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
      status: 'done',
      quizScore: 85,
      videoUrl: '',
      videoEmbed: '',
      duration: '30 min',
      objectives: 'Read digital inputs from push buttons, implement software debouncing, and build a multi-LED state machine.',
      components: 'Arduino Uno, Breadboard, Push Buttons (×3), LEDs (×3), 10kΩ Resistors, 220Ω Resistors, Jumper Wires',
      notes: 'Mechanical buttons produce electrical noise when pressed. Use millis()-based debouncing for reliable reads.',
      codeUrl: '',
      schematicUrl: '',
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
      status: 'done',
      quizScore: 95,
      videoUrl: '',
      videoEmbed: '',
      duration: '28 min',
      objectives: 'Use the Arduino ADC to read analog sensors, map values to output ranges, and visualize data over serial.',
      components: 'Arduino Uno, LDR (Photoresistor), 10kΩ Resistor, Potentiometer, LED, Breadboard, Jumper Wires',
      notes: 'The Arduino Uno has a 10-bit ADC (0–1023). Use the map() function to scale sensor readings to desired ranges.',
      codeUrl: '',
      schematicUrl: '',
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
      status: 'done',
      quizScore: 80,
      videoUrl: '',
      videoEmbed: '',
      duration: '35 min',
      objectives: 'Understand PWM signals, control motor speed and direction using L298N driver, build a temperature-triggered fan.',
      components: 'Arduino Uno, L298N H-Bridge Module, DC Motor, 9V Battery + Connector, Breadboard, Jumper Wires',
      notes: 'Never connect a motor directly to Arduino pins — always use a driver IC. Motors can draw 200–600mA which exceeds Arduino pin limits.',
      codeUrl: '',
      schematicUrl: '',
      quizQuestions: [
        { q: 'PWM stands for?', options: ['Pulse Width Modulation', 'Power Wave Multiplexing', 'Parallel Wire Method', 'Phase Width Management'], answer: 0 },
        { q: 'What is 50% PWM duty cycle on a 5V system?', options: ['0V average', '2.5V average', '5V average', '1.25V average'], answer: 1 },
      ],
    },
    {
      day: 5,
      title: 'I2C & OLED Display',
      summary: 'I2C bus protocol, connecting 128x64 OLED, displaying sensor data in real time.',
      tags: ['Arduino', 'I2C', 'OLED'],
      status: 'active',
      quizScore: null,
      videoUrl: '',
      videoEmbed: '',
      duration: '32 min',
      objectives: 'Learn the I2C protocol, wire a 128x64 OLED display, and show live sensor data with custom graphics.',
      components: 'Arduino Uno, SSD1306 OLED (128x64, I2C), DHT11 Sensor, 4.7kΩ Resistors (×2), Breadboard, Jumper Wires',
      notes: 'I2C requires pull-up resistors on SDA and SCL lines. Default OLED I2C address is 0x3C — use I2C scanner sketch to confirm.',
      codeUrl: '',
      schematicUrl: '',
      quizQuestions: [
        { q: 'How many wires does I2C use for data?', options: ['1', '2', '4', '8'], answer: 1 },
        { q: 'What is the default I2C address of most SSD1306 OLEDs?', options: ['0x27', '0x3C', '0x48', '0x76'], answer: 1 },
      ],
    },
    {
      day: 6,
      title: 'ESP32 Setup & WiFi',
      summary: 'ESP32 dual-core architecture, WiFi provisioning, connecting to local network, HTTP GET requests.',
      tags: ['ESP32', 'WiFi'],
      status: 'locked',
      quizScore: null,
      videoUrl: '',
      videoEmbed: '',
      duration: '30 min',
      objectives: 'Set up the ESP32 in Arduino IDE, connect to WiFi, perform HTTP GET requests, and parse JSON responses.',
      components: 'ESP32 Dev Board, USB-C Cable, Breadboard, Jumper Wires',
      notes: 'ESP32 operates at 3.3V logic — do not connect 5V signals directly. Use the Arduino ESP32 core package v2.x for best compatibility.',
      codeUrl: '',
      schematicUrl: '',
      quizQuestions: [
        { q: 'ESP32 operates at which voltage level?', options: ['5V', '3.3V', '1.8V', '12V'], answer: 1 },
        { q: 'Which library is used for WiFi on ESP32?', options: ['Ethernet.h', 'WiFi.h', 'Network.h', 'ESP8266WiFi.h'], answer: 1 },
      ],
    },
    {
      day: 7,
      title: 'Building a Web Server on ESP32',
      summary: 'Async web server library, HTML UI served from flash memory, real-time relay toggle from browser.',
      tags: ['ESP32', 'HTTP'],
      status: 'locked',
      quizScore: null,
      videoUrl: '',
      videoEmbed: '',
      duration: '40 min',
      objectives: 'Host a full HTML/CSS web page on ESP32, create REST endpoints, and toggle a relay from a browser UI.',
      components: 'ESP32 Dev Board, 5V Relay Module, LED, 220Ω Resistor, Breadboard, Jumper Wires',
      notes: 'Use ESPAsyncWebServer library for non-blocking HTTP handling. Store HTML in PROGMEM or SPIFFS for large pages.',
      codeUrl: '',
      schematicUrl: '',
      quizQuestions: [
        { q: 'Which library provides async HTTP on ESP32?', options: ['WebServer.h', 'ESPAsyncWebServer', 'HTTPClient.h', 'AsyncTCP.h'], answer: 1 },
      ],
    },
    {
      day: 8,
      title: 'MQTT & Cloud Telemetry',
      summary: 'MQTT protocol concepts, PubSub library, streaming temperature & humidity to Adafruit IO dashboard.',
      tags: ['ESP32', 'MQTT', 'IoT'],
      status: 'locked',
      quizScore: null,
      videoUrl: '',
      videoEmbed: '',
      duration: '38 min',
      objectives: 'Understand the MQTT publish-subscribe model, connect to Adafruit IO broker, and stream sensor data to a live dashboard.',
      components: 'ESP32 Dev Board, DHT22 Temperature+Humidity Sensor, Breadboard, Jumper Wires',
      notes: 'Create a free Adafruit IO account before this lesson. MQTT uses port 1883 (unencrypted) or 8883 (TLS). Keep your API key secret.',
      codeUrl: '',
      schematicUrl: '',
      quizQuestions: [
        { q: 'MQTT uses which communication model?', options: ['Request-Response', 'Publish-Subscribe', 'Peer-to-Peer', 'Polling'], answer: 1 },
        { q: 'Default unencrypted MQTT port is?', options: ['80', '443', '1883', '8080'], answer: 2 },
      ],
    },
    {
      day: 9,
      title: 'Capstone IoT Project',
      summary: 'End-to-end smart home sensor: ESP32 + DHT22 + relay + MQTT + cloud dashboard + mobile alert.',
      tags: ['ESP32', 'Project'],
      status: 'locked',
      quizScore: null,
      videoUrl: '',
      videoEmbed: '',
      duration: '60 min',
      objectives: 'Integrate all ESP32 skills into a single deployable smart home sensor node with cloud reporting and automation triggers.',
      components: 'ESP32 Dev Board, DHT22 Sensor, 5V Relay Module, Status LED, Breadboard, Jumper Wires, Power Supply',
      notes: 'This is your first graded capstone project. Focus on code clarity and stable WiFi reconnection logic. Document your circuit well.',
      codeUrl: '',
      schematicUrl: '',
      quizQuestions: [
        { q: 'Which sensor measures both temperature and humidity?', options: ['LDR', 'DHT22', 'HC-SR04', 'MPU6050'], answer: 1 },
      ],
    },
    {
      day: 10,
      title: 'Introduction to PCB Design (KiCad)',
      summary: 'KiCad interface, schematic capture, component footprint selection, netlist generation.',
      tags: ['PCB', 'KiCad'],
      status: 'locked',
      quizScore: null,
      videoUrl: '',
      videoEmbed: '',
      duration: '45 min',
      objectives: 'Navigate the KiCad EDA suite, draw a complete schematic, assign PCB footprints, and generate a netlist.',
      components: 'Computer with KiCad 7.x installed (free download from kicad.org)',
      notes: 'Download and install KiCad 7.0+ before this session. The schematic will be a simple Arduino shield with 3 sensor connectors.',
      codeUrl: '',
      schematicUrl: '',
      quizQuestions: [
        { q: 'KiCad is used for?', options: ['Writing firmware', 'PCB schematic and layout design', '3D printing', 'Network configuration'], answer: 1 },
      ],
    },
    {
      day: 11,
      title: 'PCB Layout & Routing',
      summary: 'Board outline, trace width calculations, component placement strategies, design rule checks.',
      tags: ['PCB', 'Layout'],
      status: 'locked',
      quizScore: null,
      videoUrl: '',
      videoEmbed: '',
      duration: '50 min',
      objectives: 'Define board outline, place components optimally, route traces manually and with auto-router, and run DRC.',
      components: 'Computer with KiCad 7.x installed',
      notes: 'Use at least 0.3mm trace width for signal lines and 0.8mm for power lines. Keep analog and digital ground planes separate.',
      codeUrl: '',
      schematicUrl: '',
      quizQuestions: [
        { q: 'DRC in PCB design stands for?', options: ['Dynamic Routing Check', 'Design Rule Check', 'Digital Reference Chart', 'Differential Route Config'], answer: 1 },
      ],
    },
    {
      day: 12,
      title: 'Advanced PCB Techniques',
      summary: 'Ground planes, power layers, differential pairs, EMI reduction, bypass capacitor placement.',
      tags: ['PCB', 'Advanced'],
      status: 'locked',
      quizScore: null,
      videoUrl: '',
      videoEmbed: '',
      duration: '45 min',
      objectives: 'Apply professional PCB techniques: copper pours, bypass caps, EMI shielding, and multi-layer board concepts.',
      components: 'Computer with KiCad 7.x installed',
      notes: 'Place 100nF decoupling capacitors as close as possible to every IC power pin. Ground planes dramatically reduce EMI.',
      codeUrl: '',
      schematicUrl: '',
      quizQuestions: [
        { q: 'What is the purpose of a ground plane on a PCB?', options: ['Reduce EMI and provide stable reference', 'Increase board cost', 'Add more routing layers', 'None of the above'], answer: 0 },
      ],
    },
    {
      day: 13,
      title: 'Gerber File Generation & Review',
      summary: 'Exporting production-ready Gerbers, stackup definition, DFM checklist, quoting from JLCPCB.',
      tags: ['PCB', 'Gerber'],
      status: 'locked',
      quizScore: null,
      videoUrl: '',
      videoEmbed: '',
      duration: '35 min',
      objectives: 'Export complete Gerber files from KiCad, review them in GerbView, perform DFM checks, and get a fab quote.',
      components: 'Computer with KiCad 7.x installed, JLCPCB account (free)',
      notes: 'Always review your Gerbers in a separate viewer before submitting. Check layer count, board dimensions, and drill file.',
      codeUrl: '',
      schematicUrl: '',
      quizQuestions: [
        { q: 'Gerber files are used for?', options: ['Programming microcontrollers', 'PCB manufacturing', '3D modeling', 'Simulation'], answer: 1 },
      ],
    },
    {
      day: 14,
      title: 'Final Capstone & Certificate',
      summary: 'Complete full-stack project: Arduino sensor → ESP32 telemetry → MQTT cloud → custom PCB design.',
      tags: ['Capstone', 'Certificate'],
      status: 'locked',
      quizScore: null,
      videoUrl: '',
      videoEmbed: '',
      duration: '90 min',
      objectives: 'Deliver a complete hardware+software system integrating all 14 days of learning, reviewed and approved by a mentor.',
      components: 'All components from previous days',
      notes: 'Your final submission must include: working firmware, MQTT dashboard screenshot, PCB layout file, and a 2-minute demo video.',
      codeUrl: '',
      schematicUrl: '',
      quizQuestions: [
        { q: 'Which protocol is used for IoT telemetry in this course?', options: ['HTTP', 'MQTT', 'FTP', 'SSH'], answer: 1 },
      ],
    },
  ])

  const completedDays = computed(() => lessons.value.filter(l => l.status === 'done').length)
  const progressPercent = computed(() => Math.round((completedDays.value / lessons.value.length) * 100))
  const avgScore = computed(() => {
    const scored = lessons.value.filter(l => l.quizScore !== null)
    return scored.length ? Math.round(scored.reduce((a, b) => a + b.quizScore, 0) / scored.length) : 0
  })

  // ── Admin: update a lesson ────────────────────────────────────────────────
  function updateLesson(day, fields) {
    const lesson = lessons.value.find(l => l.day === day)
    if (lesson) Object.assign(lesson, fields)
  }

  // ── Students ───────────────────────────────────────────────────────────────
  const students = ref([
    { id: 1, name: 'Alex Mercer', email: 'alex@example.com', avatar: 'AM', progress: 30, score: 87, submissions: 3, status: 'active' },
    { id: 2, name: 'Samantha Chen', email: 'sam@example.com', avatar: 'SC', progress: 60, score: 91, submissions: 6, status: 'active' },
    { id: 3, name: 'Marcus Johnson', email: 'marcus@example.com', avatar: 'MJ', progress: 100, score: 94, submissions: 14, status: 'completed' },
    { id: 4, name: 'Priya Patel', email: 'priya@example.com', avatar: 'PP', progress: 45, score: 78, submissions: 4, status: 'active' },
    { id: 5, name: 'James Lee', email: 'james@example.com', avatar: 'JL', progress: 15, score: 80, submissions: 1, status: 'active' },
    { id: 6, name: 'Fatima Al-Rashid', email: 'fatima@example.com', avatar: 'FA', progress: 80, score: 96, submissions: 10, status: 'active' },
  ])

  // ── Submissions ────────────────────────────────────────────────────────────
  const submissions = ref([
    { id: 1, student: 'Alex Mercer', avatar: 'AM', day: 4, title: 'PWM Motor Speed Controller', type: 'Code + Video', submitted: '2h ago', status: 'pending', feedback: '' },
    { id: 2, student: 'Samantha Chen', avatar: 'SC', day: 5, title: 'OLED Sensor Dashboard', type: 'Code + Photo', submitted: '5h ago', status: 'pending', feedback: '' },
    { id: 3, student: 'Priya Patel', avatar: 'PP', day: 3, title: 'LDR Auto-Dimmer Circuit', type: 'Photo + Schematic', submitted: '1d ago', status: 'approved', feedback: 'Great work! Clean schematic, excellent wiring.' },
    { id: 4, student: 'James Lee', avatar: 'JL', day: 1, title: 'First LED Blink', type: 'Video', submitted: '2d ago', status: 'revision', feedback: 'Good start! Please add a 220Ω resistor to protect the LED.' },
    { id: 5, student: 'Fatima Al-Rashid', avatar: 'FA', day: 6, title: 'ESP32 WiFi Connection Demo', type: 'Code + Serial Monitor', submitted: '3h ago', status: 'pending', feedback: '' },
  ])

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

  return {
    activeRole, currentUser,
    lessons, completedDays, progressPercent, avgScore,
    updateLesson,
    students, submissions,
    approveSubmission, requestRevision, getQuizForDay,
  }
})
