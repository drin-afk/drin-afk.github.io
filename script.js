/* ============================================
   PORTFOLIO — script.js
   Alex Reyes · Web Developer
   ============================================ */

// ── SIDEBAR NAV: Active state on click ──
const navLinks = document.querySelectorAll('.sidebar-nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ── SIDEBAR NAV: Active state on scroll ──
const sections = ['home', 'projects', 'services', 'about', 'blog', 'contact'];
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.offsetTop <= scrollY && el.offsetTop + el.offsetHeight > scrollY) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
      });
    }
  });
}, { passive: true });

// ── COUNTER ANIMATION ──
function animateCounter(el, target, suffix = '') {
  const duration = 1400;
  const start = performance.now();
  const run = now => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    el.textContent = Math.round(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}

// Trigger counters after short delay on page load
setTimeout(() => {
  animateCounter(document.getElementById('c1'), 3);
  animateCounter(document.getElementById('c2'), 28);
  animateCounter(document.getElementById('c3'), 12);
}, 600);

// ── TESTIMONIAL SLIDER ──
let tIdx = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const tCountEl = document.getElementById('tCount');

function showSlide(n) {
  slides.forEach((s, i) => s.classList.toggle('active', i === n));
  tCountEl.textContent = `${n + 1} / ${slides.length}`;
}

document.getElementById('tPrev').addEventListener('click', () => {
  tIdx = (tIdx - 1 + slides.length) % slides.length;
  showSlide(tIdx);
});

document.getElementById('tNext').addEventListener('click', () => {
  tIdx = (tIdx + 1) % slides.length;
  showSlide(tIdx);
});

// Auto-advance every 5 seconds
setInterval(() => {
  tIdx = (tIdx + 1) % slides.length;
  showSlide(tIdx);
}, 5000);

// ── CONTACT FORM: Submit feedback ──
document.getElementById('sendBtn').addEventListener('click', function () {
  this.textContent = 'Message Sent ✓';
  this.style.background = '#2d7a4f';
  setTimeout(() => {
    this.textContent = 'Send Message →';
    this.style.background = '';
  }, 3000);
});

// ── SCROLL REVEAL (Intersection Observer) ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'none';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
