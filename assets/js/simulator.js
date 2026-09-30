/**
 * BuildEasy Interactive Simulation Engine
 * Demonstrates AI Material Estimation, Real-time Supply Chain Dispatch, and Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  initEstimator();
  initDispatchSimulator();
  initArchitectureTabs();
});

// 1. AI Material Estimator
function initEstimator() {
  const areaInput = document.getElementById('calc-area');
  const areaSlider = document.getElementById('calc-area-slider');
  const typeSelect = document.getElementById('calc-type');
  const modelSelect = document.getElementById('calc-model');

  if (!areaInput || !areaSlider) return;

  function updateCalculations() {
    const area = parseFloat(areaInput.value) || 2000;
    const type = typeSelect ? typeSelect.value : 'residential';
    const model = modelSelect ? modelSelect.value : 'mobilenet';

    // Multipliers based on structural standards
    let cementFactor = 0.42; // bags per sq ft
    let steelFactor = 0.0038; // tons per sq ft
    let sandFactor = 1.65; // cu ft per sq ft
    let baseCostSqFt = 2100; // INR per sq ft

    if (type === 'commercial') {
      cementFactor = 0.48;
      steelFactor = 0.0048;
      sandFactor = 1.85;
      baseCostSqFt = 2650;
    } else if (type === 'industrial') {
      cementFactor = 0.52;
      steelFactor = 0.0055;
      sandFactor = 2.10;
      baseCostSqFt = 3100;
    }

    // Calculations
    const cementBags = Math.round(area * cementFactor);
    const steelTons = (area * steelFactor).toFixed(2);
    const sandCuFt = Math.round(area * sandFactor);
    const totalCostINR = Math.round(area * baseCostSqFt);
    const totalCostLakhs = (totalCostINR / 100000).toFixed(2);

    // AI model confidence & savings
    const confidence = model === 'mobilenet' ? '96.4%' : '98.8%';
    const latency = model === 'mobilenet' ? '34 ms (Edge Inference)' : '118 ms (Deep Feature)';
    const wasteReduction = (11.8 + (area % 5) * 0.4).toFixed(1);

    // Update DOM
    const elCement = document.getElementById('res-cement');
    const elSteel = document.getElementById('res-steel');
    const elSand = document.getElementById('res-sand');
    const elCost = document.getElementById('res-cost');
    const elConfidence = document.getElementById('res-confidence');
    const elLatency = document.getElementById('res-latency');
    const elSavings = document.getElementById('res-savings');

    if (elCement) elCement.textContent = cementBags.toLocaleString();
    if (elSteel) elSteel.textContent = steelTons;
    if (elSand) elSand.textContent = sandCuFt.toLocaleString();
    if (elCost) elCost.textContent = `₹${totalCostLakhs} Lakhs`;
    if (elConfidence) elConfidence.textContent = confidence;
    if (elLatency) elLatency.textContent = latency;
    if (elSavings) elSavings.textContent = `${wasteReduction}%`;
  }

  // Sync Slider and Number Input
  areaSlider.addEventListener('input', (e) => {
    areaInput.value = e.target.value;
    updateCalculations();
  });

  areaInput.addEventListener('input', (e) => {
    areaSlider.value = e.target.value;
    updateCalculations();
  });

  if (typeSelect) typeSelect.addEventListener('change', updateCalculations);
  if (modelSelect) modelSelect.addEventListener('change', updateCalculations);

  // Initial computation
  updateCalculations();
}

// 2. Real-time Supply Chain Dispatch Simulator
function initDispatchSimulator() {
  const dispatchBtn = document.getElementById('simulate-dispatch-btn');
  const statusLog = document.getElementById('dispatch-status-log');
  const progressBar = document.getElementById('dispatch-progress-bar');
  const stagePins = document.querySelectorAll('.dispatch-pin');

  if (!dispatchBtn || !statusLog) return;

  const simulationSteps = [
    { pct: 15, pin: 0, text: "📦 Order #BE-9842 verified via MongoDB & RESTful API Gateway." },
    { pct: 40, pin: 1, text: "🧠 TensorFlow MobileNetV2 pipeline parsed material requirements." },
    { pct: 70, pin: 2, text: "📍 Google Maps Matrix API matched nearest verified supplier (Trivandrum Hub, 4.2 km)." },
    { pct: 100, pin: 3, text: "🚚 Automated delivery route optimized; Driver assigned with live GPS telemetry." }
  ];

  let isRunning = false;

  dispatchBtn.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    dispatchBtn.disabled = true;
    dispatchBtn.classList.add('opacity-50', 'cursor-not-allowed');
    statusLog.innerHTML = '<div class="text-cyan-400 font-mono text-xs">🚀 Initializing AI supply chain automated dispatch...</div>';
    
    // Reset pins
    stagePins.forEach(pin => {
      pin.classList.remove('bg-emerald-500', 'text-slate-950', 'ring-4', 'ring-emerald-500/30');
      pin.classList.add('bg-slate-800', 'text-gray-400');
    });

    let currentStep = 0;

    function runNextStep() {
      if (currentStep < simulationSteps.length) {
        const step = simulationSteps[currentStep];
        
        // Update Progress Bar
        if (progressBar) progressBar.style.width = `${step.pct}%`;

        // Update Pin
        if (stagePins[step.pin]) {
          stagePins[step.pin].classList.remove('bg-slate-800', 'text-gray-400');
          stagePins[step.pin].classList.add('bg-emerald-500', 'text-slate-950', 'ring-4', 'ring-emerald-500/30');
        }

        // Append log
        const logItem = document.createElement('div');
        logItem.className = 'text-xs font-mono text-gray-300 mt-2 flex items-start gap-2 animate-fade-in';
        logItem.innerHTML = `<span class="text-emerald-400">✓</span> <span>${step.text}</span>`;
        statusLog.appendChild(logItem);
        statusLog.scrollTop = statusLog.scrollHeight;

        currentStep++;
        setTimeout(runNextStep, 900);
      } else {
        const successItem = document.createElement('div');
        successItem.className = 'text-xs font-mono text-emerald-400 font-bold mt-3 p-2 bg-emerald-950/40 border border-emerald-500/30 rounded';
        successItem.innerHTML = '🎉 Simulation completed! In a production deployment, SMS & Webhook alerts trigger simultaneously.';
        statusLog.appendChild(successItem);
        
        isRunning = false;
        dispatchBtn.disabled = false;
        dispatchBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        dispatchBtn.textContent = 'Re-run Dispatch Simulation';
      }
    }

    setTimeout(runNextStep, 400);
  });
}

// 3. Tab Navigation for Projects Deep Dive
function initArchitectureTabs() {
  const tabs = document.querySelectorAll('.project-tab');
  const panels = document.querySelectorAll('.project-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');

      // Update tabs styling
      tabs.forEach(t => t.classList.remove('active', 'border-cyan-400', 'text-cyan-400'));
      tab.classList.add('active', 'border-cyan-400', 'text-cyan-400');

      // Show targeted panel
      panels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });
}
