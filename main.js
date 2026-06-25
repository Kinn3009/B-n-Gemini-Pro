// ===== GEMINI PRO LANDING PAGE - MAIN JS =====

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initParticles();
  initScrollReveal();
  initCounters();
  initCodeAnimation();
  initAudioWave();
  initSmoothScroll();
});

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // Mobile menu
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  let menuOpen = false;

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      navLinks.classList.toggle('mobile-open', menuOpen);
      menuBtn.textContent = menuOpen ? '✕' : '☰';
      menuBtn.setAttribute('aria-expanded', menuOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        navLinks.classList.remove('mobile-open');
        menuBtn.textContent = '☰';
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// ===== FLOATING PARTICLES =====
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = [
    'rgba(66, 133, 244, 0.6)',
    'rgba(0, 212, 255, 0.5)',
    'rgba(168, 85, 247, 0.5)',
    'rgba(236, 72, 153, 0.4)',
    'rgba(34, 197, 94, 0.4)',
  ];

  const isMobile = window.innerWidth <= 768;
  const particleCount = isMobile ? 20 : 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = particle.style.height = (Math.random() * 3 + 1) + 'px';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
    particle.style.animationDelay = (Math.random() * 20) + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    container.appendChild(particle);
  }
}

// ===== SCROLL REVEAL ANIMATION =====
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
}

function animateCounter(element) {
  const target = parseFloat(element.dataset.target);
  const suffix = element.dataset.suffix || '';
  const isDecimal = element.dataset.decimal === 'true';
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutExpo(progress);

    let current;
    if (target >= 1000000) {
      current = Math.floor(eased * (target / 1000000));
      element.textContent = current + 'M' + suffix;
    } else if (target >= 1000) {
      current = Math.floor(eased * (target / 1000));
      element.textContent = current + 'K' + suffix;
    } else if (isDecimal) {
      current = (eased * target).toFixed(1);
      element.textContent = current + suffix;
    } else {
      current = Math.floor(eased * target);
      element.textContent = current + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      // Final value
      if (target >= 1000000) {
        element.textContent = (target / 1000000) + 'M' + suffix;
      } else if (target >= 1000) {
        element.textContent = (target / 1000) + 'K' + suffix;
      } else if (isDecimal) {
        element.textContent = target.toFixed(1) + suffix;
      } else {
        element.textContent = target + suffix;
      }
    }
  }

  requestAnimationFrame(update);
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

// ===== CODE TYPING ANIMATION =====
function initCodeAnimation() {
  const codeContainer = document.getElementById('code-lines');
  if (!codeContainer) return;

  const codeLines = [
    { indent: 0, content: '<span class="comment"># 🚀 Gemini Pro - AI Full-Stack App</span>' },
    { indent: 0, content: '<span class="keyword">import</span> <span class="function">gemini_pro</span> <span class="keyword">as</span> <span class="function">gp</span>' },
    { indent: 0, content: '' },
    { indent: 0, content: '<span class="comment"># Khởi tạo Gemini Pro</span>' },
    { indent: 0, content: '<span class="function">ai</span> <span class="operator">=</span> <span class="function">gp</span>.<span class="function">init</span>(<span class="string">"pro-2.5"</span>)' },
    { indent: 0, content: '' },
    { indent: 0, content: '<span class="comment"># Deep Research</span>' },
    { indent: 0, content: '<span class="function">report</span> <span class="operator">=</span> <span class="function">ai</span>.<span class="function">deep_research</span>(' },
    { indent: 1, content: '<span class="string">"Phân tích thị trường AI 2026"</span>,' },
    { indent: 1, content: '<span class="function">sources</span><span class="operator">=</span><span class="number">200</span>,' },
    { indent: 1, content: '<span class="function">depth</span><span class="operator">=</span><span class="string">"comprehensive"</span>' },
    { indent: 0, content: ')' },
    { indent: 0, content: '' },
    { indent: 0, content: '<span class="comment"># Tạo Video 4K</span>' },
    { indent: 0, content: '<span class="function">video</span> <span class="operator">=</span> <span class="function">ai</span>.<span class="function">generate_video</span>(' },
    { indent: 1, content: '<span class="string">"Cinematic drone shot"</span>,' },
    { indent: 1, content: '<span class="function">resolution</span><span class="operator">=</span><span class="string">"4K"</span>,' },
    { indent: 1, content: '<span class="function">style</span><span class="operator">=</span><span class="string">"cinematic"</span>' },
    { indent: 0, content: ')' },
    { indent: 0, content: '' },
    { indent: 0, content: '<span class="keyword">print</span>(<span class="string">"✅ Done!"</span>) <span class="comment"># Xong!</span>' },
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeCode(codeContainer, codeLines);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(codeContainer);
}

function typeCode(container, lines) {
  container.innerHTML = '';
  lines.forEach((line, i) => {
    const div = document.createElement('div');
    div.className = 'code-line';
    div.style.animationDelay = (i * 0.12) + 's';
    const indent = '  '.repeat(line.indent);
    const lineNum = String(i + 1).padStart(2, ' ');
    div.innerHTML = `<span style="color:var(--text-muted);margin-right:16px;user-select:none;">${lineNum}</span>${indent}${line.content}`;
    container.appendChild(div);
  });
}

// ===== AUDIO WAVE ANIMATION =====
function initAudioWave() {
  const waveContainer = document.getElementById('audio-wave');
  if (!waveContainer) return;

  const barCount = 40;
  for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('div');
    bar.className = 'audio-bar';
    bar.style.animationDelay = (i * 0.05) + 's';
    bar.style.animationDuration = (0.8 + Math.random() * 0.8) + 's';
    waveContainer.appendChild(bar);
  }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===== PROGRESS BAR ANIMATION =====
const style = document.createElement('style');
style.textContent = `
  @keyframes progress-fill {
    0% { width: 0; }
    100% { width: 92%; }
  }
  .research-line {
    opacity: 0;
    transform: translateY(10px);
    animation: research-appear 0.5s ease forwards;
  }
  @keyframes research-appear {
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ===== INTERSECTION OBSERVER FOR RESEARCH LINES =====
const researchDemo = document.getElementById('research-demo');
if (researchDemo) {
  const researchObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lines = entry.target.querySelectorAll('.research-line');
        lines.forEach((line, i) => {
          line.style.animationDelay = (i * 0.5) + 's';
        });
      }
    });
  }, { threshold: 0.3 });
  researchObserver.observe(researchDemo);
}

// ===== MOUSE PARALLAX ON HERO =====
const hero = document.getElementById('hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const orbs = hero.querySelectorAll('.hero-orb');
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 15;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
}

// ===== BUTTON CLICK EFFECTS =====
document.querySelectorAll('.btn-primary, .btn-pricing.primary').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Ripple effect
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      pointer-events: none;
      animation: ripple-out 0.6s ease-out forwards;
    `;
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple-out {
    from { transform: scale(0); opacity: 1; }
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

// ===== TYPING CURSOR BLINK =====
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
  .typing-cursor {
    display: inline-block;
    width: 2px;
    height: 1em;
    background: var(--gemini-cyan);
    margin-left: 2px;
    animation: cursor-blink 1s step-end infinite;
    vertical-align: text-bottom;
  }
  @keyframes cursor-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;
document.head.appendChild(cursorStyle);

// ===== COUNTDOWN TIMER =====
function initCountdownTimer() {
  // Set timer to end of today (midnight)
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 0);

  function updateTimer() {
    const current = new Date();
    let diff = Math.max(0, Math.floor((endOfDay - current) / 1000));

    const hours = Math.floor(diff / 3600);
    diff %= 3600;
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;

    const hEl = document.getElementById('timer-hours');
    const mEl = document.getElementById('timer-minutes');
    const sEl = document.getElementById('timer-seconds');

    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// Init countdown on load
initCountdownTimer();

// ===== PURCHASE MODAL =====
let currentPlan = '';

const planData = {
  free: {
    name: 'Miễn Phí',
    desc: 'Khám phá sức mạnh AI cơ bản',
    label: 'Miễn Phí — vĩnh viễn',
    originalPrice: null,
    discount: null,
    total: '0đ',
    amount: '0đ'
  },
  pro: {
    name: 'Gemini Pro',
    desc: 'Bắt đầu hành trình AI không giới hạn',
    label: 'Gemini Pro — 1 tháng',
    originalPrice: '599.000đ',
    discount: '-300.000đ',
    total: '299.000đ',
    amount: '299.000đ'
  },
  enterprise: {
    name: 'Doanh Nghiệp',
    desc: 'Giải pháp AI tùy chỉnh cho tổ chức',
    label: 'Enterprise — Tùy chỉnh',
    originalPrice: null,
    discount: null,
    total: 'Liên hệ báo giá',
    amount: 'Liên hệ'
  }
};

function openPurchaseModal(plan) {
  currentPlan = plan;
  const modal = document.getElementById('purchase-modal');
  const data = planData[plan];

  // Update modal content
  document.getElementById('modal-plan-name').textContent = data.name;
  document.getElementById('modal-plan-desc').textContent = data.desc;
  document.getElementById('modal-plan-label').textContent = data.label;

  // Handle price rows
  const originalRow = document.getElementById('modal-original-row');
  const discountRow = document.getElementById('modal-discount-row');

  if (data.originalPrice) {
    originalRow.style.display = 'flex';
    discountRow.style.display = 'flex';
    document.getElementById('modal-original-price').textContent = data.originalPrice;
    document.getElementById('modal-discount').textContent = data.discount;
  } else {
    originalRow.style.display = 'none';
    discountRow.style.display = 'none';
  }

  document.getElementById('modal-total-price').innerHTML = '<strong>' + data.total + '</strong>';

  // Reset to step 1
  goToStep(1);

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePurchaseModal(event) {
  const modal = document.getElementById('purchase-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function goToStep(step) {
  document.querySelectorAll('.modal-step').forEach(s => s.classList.add('hidden'));
  const target = document.getElementById('modal-step-' + step);
  if (target) target.classList.remove('hidden');
}

function handlePurchaseSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('customer-name').value;
  const email = document.getElementById('customer-email').value;
  const phone = document.getElementById('customer-phone').value;

  if (currentPlan === 'free') {
    // Free plan: skip payment, go to success
    document.getElementById('success-email').textContent = email;
    goToStep(3);
    return;
  }

  // Generate reference code
  const ref = phone.replace(/\s/g, '').slice(-4) + Date.now().toString().slice(-4);
  document.getElementById('payment-ref').textContent = ref;

  // Set payment amount
  const data = planData[currentPlan];
  document.getElementById('payment-amount').textContent = data.amount;
  document.getElementById('success-email').textContent = email;

  // Set real bank info
  document.getElementById('payment-bank').textContent = 'BIDV (Ngân hàng TMCP Đầu tư & Phát triển Việt Nam)';
  document.getElementById('payment-account').textContent = '5611364805';
  document.getElementById('payment-holder').textContent = 'LUONG THE THIEN';

  goToStep(2);
}

function confirmPayment() {
  goToStep(3);
}

function copyToClipboard(element) {
  const text = element.textContent.replace(' 📋', '').trim();
  navigator.clipboard.writeText(text).then(() => {
    const original = element.textContent;
    element.textContent = '✅ Đã sao chép!';
    setTimeout(() => {
      element.textContent = original;
    }, 1500);
  }).catch(() => {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    element.textContent = '✅ Đã sao chép!';
    setTimeout(() => {
      element.textContent = text + ' 📋';
    }, 1500);
  });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePurchaseModal();
  }
});

// ===== FAQ ACCORDION =====
function toggleFaq(button) {
  const item = button.closest('.faq-item');
  const isActive = item.classList.contains('active');

  // Close all other FAQ items
  document.querySelectorAll('.faq-item.active').forEach(el => {
    el.classList.remove('active');
  });

  // Toggle current item
  if (!isActive) {
    item.classList.add('active');
  }
}

// ===== LIVE SOCIAL PROOF NOTIFICATIONS =====
const notificationData = [
  { name: 'Nguyễn Trí', initials: 'NT', plan: 'Gemini Pro', time: '2 phút trước', location: 'Hà Nội' },
  { name: 'Hoàng Long', initials: 'HL', plan: 'Gemini Pro', time: '5 phút trước', location: 'TP.HCM' },
  { name: 'Thu Hằng', initials: 'TH', plan: 'Doanh Nghiệp', time: '8 phút trước', location: 'Đà Nẵng' },
  { name: 'Minh Đức', initials: 'MĐ', plan: 'Gemini Pro', time: '12 phút trước', location: 'Cần Thơ' },
  { name: 'Phương Anh', initials: 'PA', plan: 'Gemini Pro', time: '15 phút trước', location: 'Hải Phòng' },
  { name: 'Văn Hùng', initials: 'VH', plan: 'Gemini Pro', time: '18 phút trước', location: 'Nha Trang' },
  { name: 'Thanh Tâm', initials: 'TT', plan: 'Gemini Pro', time: '22 phút trước', location: 'Huế' },
  { name: 'Bảo Ngọc', initials: 'BN', plan: 'Doanh Nghiệp', time: '25 phút trước', location: 'Bình Dương' },
  { name: 'Quốc Anh', initials: 'QA', plan: 'Gemini Pro', time: '30 phút trước', location: 'TP.HCM' },
  { name: 'Khánh Linh', initials: 'KL', plan: 'Gemini Pro', time: '35 phút trước', location: 'Hà Nội' },
];

let notifIndex = 0;
let notifTimeout = null;
let notifDismissed = false;

function showLiveNotification() {
  if (notifDismissed) return;

  const notification = document.getElementById('live-notification');
  const data = notificationData[notifIndex % notificationData.length];

  document.getElementById('notif-avatar').textContent = data.initials;
  document.getElementById('notif-text').innerHTML = `${data.name} vừa đăng ký <strong>${data.plan}</strong>`;
  document.getElementById('notif-time').textContent = `${data.time} • ${data.location}`;

  // Cycle through different avatar gradient colors
  const gradients = [
    'linear-gradient(135deg, #4285f4, #00d4ff)',
    'linear-gradient(135deg, #a855f7, #ec4899)',
    'linear-gradient(135deg, #22c55e, #4285f4)',
    'linear-gradient(135deg, #f97316, #ec4899)',
    'linear-gradient(135deg, #00d4ff, #a855f7)',
  ];
  document.getElementById('notif-avatar').style.background = gradients[notifIndex % gradients.length];

  notification.classList.add('show');

  // Hide after 5 seconds
  notifTimeout = setTimeout(() => {
    notification.classList.remove('show');
    notifIndex++;

    // Show next notification after a random interval (15-30s)
    const nextDelay = 15000 + Math.random() * 15000;
    setTimeout(showLiveNotification, nextDelay);
  }, 5000);
}

function closeNotification() {
  const notification = document.getElementById('live-notification');
  notification.classList.remove('show');
  notifDismissed = true;
  if (notifTimeout) clearTimeout(notifTimeout);
}

// Start showing notifications after 8 seconds
setTimeout(showLiveNotification, 8000);

// ===== STICKY MOBILE CTA =====
function initStickyCTA() {
  const stickyCTA = document.getElementById('sticky-cta');
  const hero = document.getElementById('hero');
  const pricing = document.getElementById('pricing');

  if (!stickyCTA || !hero) return;

  window.addEventListener('scroll', () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    const pricingRect = pricing ? pricing.getBoundingClientRect() : null;
    const isPricingVisible = pricingRect && pricingRect.top < window.innerHeight && pricingRect.bottom > 0;

    // Show sticky CTA when hero is scrolled past, hide when pricing is visible
    if (heroBottom < 0 && !isPricingVisible) {
      stickyCTA.classList.add('visible');
    } else {
      stickyCTA.classList.remove('visible');
    }
  });
}

initStickyCTA();

// ===== BACK TO TOP BUTTON =====
(function initBackToTop() {
  // Create back to top button dynamically
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.id = 'back-to-top';
  btn.setAttribute('aria-label', 'Về đầu trang');
  btn.innerHTML = '↑';
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 800) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
})();

// ===== URGENCY SLOT COUNTDOWN =====
(function initSlotCountdown() {
  const slotsEl = document.getElementById('urgency-slots');
  if (!slotsEl) return;

  let slots = 23;

  // Randomly decrease slots every 30-90 seconds
  function decreaseSlot() {
    if (slots <= 3) return;
    slots -= 1;
    slotsEl.textContent = slots;

    // Add brief highlight animation
    slotsEl.style.transform = 'scale(1.3)';
    setTimeout(() => {
      slotsEl.style.transform = 'scale(1)';
    }, 300);

    const nextDelay = 30000 + Math.random() * 60000;
    setTimeout(decreaseSlot, nextDelay);
  }

  setTimeout(decreaseSlot, 20000 + Math.random() * 40000);
})();

// ===== PLAY 4K DEMO VIDEO =====
function playDemoVideo() {
  const video = document.getElementById('demo-video');
  const overlay = document.getElementById('video-preview-overlay');
  if (video && overlay) {
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    overlay.style.pointerEvents = 'none';
    video.style.display = 'block';
    video.play();
    
    // Add event listeners to show overlay again when paused or ended
    video.addEventListener('pause', () => {
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
      overlay.style.pointerEvents = 'all';
    });
    
    video.addEventListener('ended', () => {
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
      overlay.style.pointerEvents = 'all';
      video.style.display = 'none';
    });
  }
}
