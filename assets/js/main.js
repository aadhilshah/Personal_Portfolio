/**
 * Main Global JavaScript for Aadhilshah's Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Highlight Current Active Page in Navigation
  highlightCurrentNav();

  // Dynamic Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Highlight active navigation link
function highlightCurrentNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-cyan-400', 'font-semibold');
      link.classList.remove('text-gray-400');
      // Add active dot indicator if present
      const dot = link.querySelector('.nav-dot');
      if (dot) dot.classList.remove('opacity-0');
    } else {
      link.classList.remove('text-cyan-400', 'font-semibold');
      link.classList.add('text-gray-400');
      const dot = link.querySelector('.nav-dot');
      if (dot) dot.classList.add('opacity-0');
    }
  });
}

// Global Toast Notification Helper
function showToast(message, isSuccess = true) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'fixed bottom-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border border-cyan-500/30 bg-slate-900/90 text-white shadow-2xl backdrop-blur-md transition-all duration-300';
    document.body.appendChild(toast);
  }

  const iconName = isSuccess ? 'check-circle' : 'alert-circle';
  const iconColor = isSuccess ? 'text-emerald-400' : 'text-amber-400';

  toast.innerHTML = `
    <span class="${iconColor}">
      <i data-lucide="${iconName}" class="w-5 h-5"></i>
    </span>
    <span class="text-sm font-medium tracking-wide">${message}</span>
  `;

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// 1-Click Copy Helper
function copyToClipboard(text, label = 'Copied to clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(label, true);
    }).catch(() => {
      fallbackCopyText(text, label);
    });
  } else {
    fallbackCopyText(text, label);
  }
}

function fallbackCopyText(text, label) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(label, true);
  } catch (err) {
    showToast('Failed to copy', false);
  }
  document.body.removeChild(textArea);
}

// Quick WhatsApp Launcher
function openWhatsApp(customText = '') {
  const phone = '919633843324';
  const defaultText = customText || 'Hi Aadhilshah, I came across your portfolio and would like to discuss an opportunity!';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(defaultText)}`;
  window.open(url, '_blank');
}
