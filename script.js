/* ══════════════════════════════════════════════════════
   Khanh Ngo Portfolio · script.js
   ══════════════════════════════════════════════════════ */

// ── Navbar scroll effect ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile nav toggle ─────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Active nav link on scroll ─────────────────────────
const sections = document.querySelectorAll('section[id], div[id]');
const navLinkEls = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.classList.toggle(
          'active-nav',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

// ── Scroll-reveal animation ───────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('revealed'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

// Add data-reveal to all major cards with staggered delays
function addRevealToElements() {
  const cardSelectors = [
    '.pub-card',
    '.award-card',
    '.project-card',
    '.contact-card',
    '.section-header',
  ];
  cardSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.setAttribute('data-reveal', '');
      el.dataset.delay = i * 80;
      revealObserver.observe(el);
    });
  });

  // Hero elements
  ['.hero-avatar-wrap', '.hero-content'].forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (el) {
      el.setAttribute('data-reveal', '');
      el.dataset.delay = i * 150;
      revealObserver.observe(el);
    }
  });
}
addRevealToElements();

// ── Publication filter ────────────────────────────────
const filterBtns = document.querySelectorAll('.pub-filter');
const pubCards   = document.querySelectorAll('.pub-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide groups + cards
    pubCards.forEach(card => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;
      card.classList.toggle('hidden', !show);
    });

    // Hide empty groups
    document.querySelectorAll('.pub-group').forEach(group => {
      const visibleCards = group.querySelectorAll('.pub-card:not(.hidden)');
      group.style.display = visibleCards.length === 0 ? 'none' : '';
    });
  });
});

// ── Smooth active link highlight in nav ───────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Typing effect for hero title ──────────────────────
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const texts = [
    'AI Researcher · Computer Vision · Multimodal Learning',
    'Video Understanding · Human-Centered AI',
    'HCMUE · Final Year CS Student',
  ];
  let textIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function typeWriter() {
    const current = texts[textIdx];
    if (!deleting) {
      heroTitle.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeWriter, 2200);
        return;
      }
    } else {
      heroTitle.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        textIdx = (textIdx + 1) % texts.length;
      }
    }
    setTimeout(typeWriter, deleting ? 40 : 65);
  }
  // Small initial delay before starting
  setTimeout(typeWriter, 800);
}

// ── Year in footer ────────────────────────────────────
const footerText = document.querySelector('.footer-text');
if (footerText) {
  footerText.innerHTML = footerText.innerHTML.replace(
    '2025', new Date().getFullYear()
  );
}
