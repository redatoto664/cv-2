// ============================================
//   TOTO REDA — CV Premium
//   app.js
// ============================================

// ── SCROLL PROGRESS BAR ──
const progressBar = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
});

// ── NAVBAR SCROLL EFFECT ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── ACTIVE NAV LINK ON SCROLL ──
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('[id]').forEach(s => sectionObserver.observe(s));

// ── TYPING EFFECT ──
const titles = [
  'Webmaster E-commerce',
  'Rédacteur Fiches Produits',
  'Spécialiste SEO',
  'Gestionnaire de Contenu'
];
let titleIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const el = document.getElementById('typed-text');
  const word = titles[titleIndex];

  if (!isDeleting) {
    el.textContent = word.slice(0, ++charIndex);
    if (charIndex === word.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    el.textContent = word.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 35 : 75);
}
typeEffect();

// ── ANIMATED COUNTERS ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const increment = target / 65;
  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = Math.floor(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, 18);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('vis'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.tl-item, .skill-group, .edu-card, .lang-card, .int-pill').forEach(el => {
  revealObserver.observe(el);
});

// ── SKILL BARS ANIMATION ──
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-group').forEach(g => skillObserver.observe(g));

// ── PRINT / PDF — ensure all elements visible ──
window.addEventListener('beforeprint', () => {
  document.querySelectorAll('.skill-fill').forEach(b => b.style.width = b.dataset.width + '%');
  document.querySelectorAll('.tl-item, .skill-group, .edu-card, .lang-card, .int-pill').forEach(el => el.classList.add('vis'));
});
