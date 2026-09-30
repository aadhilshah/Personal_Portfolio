/**
 * Contact Page Logic with Netlify Forms Integration & Instant Chat
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initWhatsAppDirect();
});

function initContactForm() {
  const form = document.getElementById('netlify-contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    // If not on Netlify (e.g. running on file:// or local dev server without Netlify CLI),
    // provide an immediate friendly notification while still allowing testing.
    const isLocal = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' || 
                    window.location.protocol === 'file:';

    if (isLocal) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const name = formData.get('name') || 'Guest';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Simulating Netlify submission...
        `;
      }

      setTimeout(() => {
        if (typeof showToast === 'function') {
          showToast(`Thank you ${name}! Form verified. When deployed to Netlify, this sends directly to your Netlify dashboard!`, true);
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Send Message</span> <i data-lucide="send" class="w-4 h-4 ml-2 inline-block"></i>`;
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }
        form.reset();
      }, 1000);
      return;
    }

    // On Production Netlify:
    // Standard HTML POST will redirect to success.html smoothly.
    // Or Netlify handles form-name="contact" automatically!
  });
}

// Generates custom WhatsApp message from inputs
function initWhatsAppDirect() {
  const waBtn = document.getElementById('whatsapp-quick-send');
  if (!waBtn) return;

  waBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('name');
    const msgInput = document.getElementById('message');
    const roleInput = document.getElementById('role-type');

    const name = nameInput ? nameInput.value.trim() : '';
    const role = roleInput ? roleInput.value : 'an opportunity';
    const msg = msgInput ? msgInput.value.trim() : '';

    let text = `Hi Aadhilshah! `;
    if (name) text += `My name is ${name}. `;
    text += `I saw your portfolio and would like to discuss ${role}. `;
    if (msg) text += `Details: "${msg}"`;

    openWhatsApp(text);
  });
}
