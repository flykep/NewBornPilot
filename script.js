// js/main.js

// ─── PRELOADER ───────────────────────────────
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(() => pre.classList.add('hidden'), 800);
});

// ─── NAVBAR SCROLL ───────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('backToTop')
    .classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

// ─── HAMBURGER ───────────────────────────────
const toggle = document.getElementById('navToggle');
const menu   = document.getElementById('navMenu');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
});

// Close on link click (mobile)
menu.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('active');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Mobile dropdown toggle
document.querySelectorAll('.dropdown-toggle').forEach(btn => {
  btn.addEventListener('click', e => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      btn.closest('.nav-dropdown').classList.toggle('open');
    }
  });
});

// ─── PARTICLES ───────────────────────────────
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('span');
    p.classList.add('particle');
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      animation-duration:${Math.random()*10+8}s;
      animation-delay:${Math.random()*10}s;
      opacity:0;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ─── COUNT-UP ────────────────────────────────
function countUp(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const start = performance.now();
  const update = now => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(countUp);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) observer.observe(statsSection);

// ─── AOS (Animate on Scroll) ─────────────────
const aosObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('aos-animate');
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

// ─── BACK TO TOP ─────────────────────────────
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});