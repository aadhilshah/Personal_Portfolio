/**
 * Home Page Interactive Features: Typing Effect & Interactive Terminal
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initDevTerminal();
});

// 1. Dynamic Typing Effect for Hero Title
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    "Computer Science Engineer",
    "Full-Stack & ML Developer",
    "Project Lead @ BuildEasy",
    "CSE Placement Coordinator",
    "College Handball Captain"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const pauseEnd = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      currentSpeed = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      currentSpeed = 400;
    }

    setTimeout(type, currentSpeed);
  }

  type();
}

// 2. Interactive Terminal Engine
function initDevTerminal() {
  const termInput = document.getElementById('terminal-input');
  const termOutput = document.getElementById('terminal-output');
  if (!termInput || !termOutput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: `
<div class="text-cyan-400 font-semibold mb-1">Available Commands:</div>
<div class="grid grid-cols-2 sm:grid-cols-3 gap-y-1 gap-x-4 text-xs font-mono text-gray-300">
  <div><span class="text-emerald-400 font-bold">about</span> - Summary & background</div>
  <div><span class="text-emerald-400 font-bold">skills</span> - Core technical stack</div>
  <div><span class="text-emerald-400 font-bold">buildeasy</span> - Flagship AI project</div>
  <div><span class="text-emerald-400 font-bold">leadership</span> - Roles & achievements</div>
  <div><span class="text-emerald-400 font-bold">education</span> - Degree & college</div>
  <div><span class="text-emerald-400 font-bold">contact</span> - Phone, email & links</div>
  <div><span class="text-emerald-400 font-bold">hire</span> - 30-sec recruiter pitch</div>
  <div><span class="text-emerald-400 font-bold">assets</span> - Design & tool registry</div>
  <div><span class="text-emerald-400 font-bold">clear</span> - Clear terminal</div>
</div>`,

    assets: `
<div class="p-3 bg-slate-900/70 rounded border border-cyan-500/20 text-xs font-mono space-y-1.5 text-gray-300">
  <div class="text-cyan-400 font-bold">🎨 Portfolio Asset & Framework Registry:</div>
  <div>• <span class="text-emerald-400">Reactbits & ThreeUI:</span> Animated UI components & interactive canvas shaders</div>
  <div>• <span class="text-cyan-300">Framer & Motionsite:</span> Interactive micro-animations & layout architecture</div>
  <div>• <span class="text-purple-400">BEUI & Sceneai:</span> Generative scenes & modular UI component patterns</div>
  <div>• <span class="text-amber-400">Netlify & Netlify Forms:</span> Zero-backend form processing & continuous deployment</div>
</div>`,

    about: `
<p class="text-gray-300">
  <span class="text-cyan-400 font-bold">Aadhilshah S</span> | Final Year CS Student @ ACE College of Engineering, Trivandrum.
  <br>Focused on <span class="text-emerald-400 font-medium">Python, Machine Learning (TensorFlow, MobileNetV2)</span> and 
  <span class="text-emerald-400 font-medium">Full-Stack Development (Node.js, Express, MongoDB)</span>.
  <br>Combining technical development with active leadership as CSE Placement Coordinator & Handball Team Captain.
</p>`,

    skills: `
<div class="space-y-1 text-gray-300">
  <div><span class="text-cyan-400">Languages:</span> Python, Java (Basic), JavaScript, HTML5, CSS3</div>
  <div><span class="text-emerald-400">ML & Data:</span> TensorFlow, TensorFlow.js, MobileNetV2, NumPy, Pandas, Pillow</div>
  <div><span class="text-purple-400">Backend & Web:</span> Node.js, Express.js, MongoDB, RESTful APIs, Bootstrap</div>
  <div><span class="text-amber-400">Tools:</span> Git, GitHub, VS Code, Postman, MongoDB Compass, Jupyter Notebook</div>
</div>`,

    buildeasy: `
<div class="p-3 bg-slate-900/60 rounded border border-cyan-500/20 text-gray-300">
  <div class="text-cyan-400 font-bold text-sm">🏗️ BuildEasy – AI-Powered Construction Supply Chain Platform</div>
  <p class="text-xs text-gray-400 mt-1">Jan 2026 – Jun 2026 | Project Lead & Developer</p>
  <p class="text-xs mt-2">Automated material estimation, supplier allocation, order processing, and real-time delivery tracking using Node.js, MongoDB, TensorFlow, and Google Maps API.</p>
  <a href="projects.html" class="inline-block mt-2 text-xs text-emerald-400 hover:underline">Explore Interactive Simulator in Projects Page →</a>
</div>`,

    education: `
<div class="text-gray-300 space-y-1">
  <div><span class="text-cyan-400 font-bold">B.Tech in Computer Science and Engineering</span> (2023 – 2027)</div>
  <div class="text-gray-400">ACE College of Engineering Thiruvallam | CGPA: <span class="text-emerald-400 font-semibold">7.02</span></div>
  <div class="text-xs text-gray-400">Relevant Coursework: Machine Learning | Certification: Corizo ML Course</div>
</div>`,

    leadership: `
<ul class="list-disc list-inside text-gray-300 text-xs space-y-1">
  <li><span class="text-cyan-400 font-semibold">Placement Coordinator:</span> Dept of CSE (Coordinating student-recruiter drives)</li>
  <li><span class="text-emerald-400 font-semibold">Handball Team Captain:</span> ACE College Handball Team (Competitive resilience & strategy)</li>
  <li><span class="text-amber-400 font-semibold">Best Volunteer Award:</span> National Service Scheme (NSS)</li>
  <li><span class="text-purple-400 font-semibold">International Conference:</span> Led project team & presented research paper</li>
  <li><span class="text-blue-400 font-semibold">IEDC Member:</span> Innovation and Entrepreneurship Development Centre</li>
</ul>`,

    contact: `
<div class="text-xs space-y-1 text-gray-300">
  <div>📞 Phone: <a href="tel:9633843324" class="text-cyan-400 hover:underline">+91 9633843324</a></div>
  <div>✉️ Email: <a href="mailto:aadhilshah.s@gmail.com" class="text-emerald-400 hover:underline">aadhilshah.s@gmail.com</a></div>
  <div>📍 Location: Trivandrum, Kerala, India (Open to Relocation & Remote)</div>
  <div>💬 WhatsApp: <button onclick="openWhatsApp()" class="text-emerald-400 underline font-semibold">Click to Start WhatsApp Chat</button></div>
</div>`,

    hire: `
<div class="p-3 bg-gradient-to-r from-cyan-950/40 to-emerald-950/40 border border-emerald-500/30 rounded text-xs space-y-2 text-gray-200">
  <div class="font-bold text-emerald-400 text-sm">💡 Why Hire Aadhilshah?</div>
  <p>1. <span class="font-semibold text-white">Execution-Ready Skills:</span> Proven ability to build end-to-end applications integrating Machine Learning and scalable web backends (BuildEasy).</p>
  <p>2. <span class="font-semibold text-white">Demonstrated Leadership:</span> Department Placement Coordinator and Sports Captain who communicates clearly, handles high stakes, and rallies teams.</p>
  <p>3. <span class="font-semibold text-white">Rapid Learner:</span> Proactively mastered Python, TensorFlow, and full-stack frameworks, ready to deliver value from Day 1.</p>
  <div class="pt-1">
    <a href="contact.html" class="inline-block px-3 py-1 bg-emerald-500 text-slate-950 font-bold rounded hover:bg-emerald-400 transition">Schedule an Interview →</a>
  </div>
</div>`
  };

  // Process a command
  window.runTerminalCommand = function(cmd) {
    const rawCmd = cmd.trim();
    const normalized = rawCmd.toLowerCase();
    
    // Echo command
    const cmdEcho = document.createElement('div');
    cmdEcho.className = 'flex items-center gap-2 text-xs font-mono text-gray-400 mt-2';
    cmdEcho.innerHTML = `<span class="text-emerald-400 font-bold">aadhilshah@portfolio:~$</span> <span>${rawCmd}</span>`;
    termOutput.appendChild(cmdEcho);

    // Response
    const responseDiv = document.createElement('div');
    responseDiv.className = 'text-xs font-mono mt-1 text-gray-300';

    if (normalized === 'clear') {
      termOutput.innerHTML = '';
      return;
    } else if (commands[normalized]) {
      responseDiv.innerHTML = commands[normalized];
    } else if (normalized === '') {
      // Empty input
      return;
    } else {
      responseDiv.innerHTML = `<span class="text-rose-400">Command not found: "${rawCmd}".</span> Type <button onclick="runTerminalCommand('help')" class="text-cyan-400 underline font-semibold">help</button> for a list of commands.`;
    }

    termOutput.appendChild(responseDiv);
    termOutput.scrollTop = termOutput.scrollHeight;
  };

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = termInput.value;
      if (val.trim()) {
        commandHistory.push(val);
        historyIndex = commandHistory.length;
        runTerminalCommand(val);
        termInput.value = '';
      }
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        termInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        termInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        termInput.value = '';
      }
    }
  });

  // Focus input when clicking anywhere inside terminal body
  const termBody = document.getElementById('terminal-body');
  if (termBody) {
    termBody.addEventListener('click', () => {
      termInput.focus();
    });
  }
}
