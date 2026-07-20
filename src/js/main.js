/* ═══════════════════════════════════════════
   COMPONENT LOADER
   Fetches each HTML component and injects it
   into the corresponding placeholder div.
═══════════════════════════════════════════ */
const components = [
  { id: 'navbar-root',   file: 'src/components/Navbar.html'   },
  { id: 'hero-root',     file: 'src/components/Hero.html'     },
  { id: 'samples-root',  file: 'src/components/Work.html'  },
  { id: 'about-root',    file: 'src/components/About.html'    },
  { id: 'skills-root',   file: 'src/components/Skills.html'   },
  { id: 'process-root',  file: 'src/components/Process.html'  },
  { id: 'why-root',      file: 'src/components/WhyMe.html'    },
  { id: 'testimonials-root', file: 'src/components/Testimonials.html' },
  { id: 'contact-root',  file: 'src/components/Contact.html'  },
  { id: 'footer-root',   file: 'src/components/Footer.html'   },
];

async function loadComponents() {
  for (const c of components) {
    const el = document.getElementById(c.id);
    if (!el) continue;
    try {
      const res  = await fetch(c.file);
      if (!res.ok) throw new Error('Component request failed with status ' + res.status);
      const html = await res.text();
      el.innerHTML = html;
    } catch (err) {
      console.warn(`Could not load ${c.file}:`, err);
    }
  }
  initAll();
}

/* ═══════════════════════════════════════════
   WORK CAROUSEL
═══════════════════════════════════════════ */
function changeSlide(dir) {
  const carousel = document.getElementById('workCarousel');
  if (!carousel) return;

  const cards = carousel.querySelectorAll('.work-card');
  if (!cards.length) return;

  const arrowId = dir > 0 ? 'nextArrow' : 'prevArrow';
  const arrow   = document.getElementById(arrowId);
  if (arrow) {
    arrow.classList.add('clicked');
    setTimeout(function () { arrow.classList.remove('clicked'); }, 250);
  }

  const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;
  const step = cards[0].getBoundingClientRect().width + gap;
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;

  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = reduced ? 'auto' : 'smooth';

  if (dir > 0 && carousel.scrollLeft >= maxScroll - 4) {
    carousel.scrollTo({ left: 0, behavior: behavior });
  } else if (dir < 0 && carousel.scrollLeft <= 4) {
    carousel.scrollTo({ left: maxScroll, behavior: behavior });
  } else {
    carousel.scrollBy({ left: dir * step, behavior: behavior });
  }
}

function initWorkCarousel() {
  const carousel = document.getElementById('workCarousel');
  if (!carousel) return;
  carousel.addEventListener('keydown', function (event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    changeSlide(event.key === 'ArrowRight' ? 1 : -1);
  });
}

/* ═══════════════════════════════════════════
   CONTACT FORM — GOOGLE SHEETS + NOTION
═══════════════════════════════════════════ */

async function sendMessage(form) {
  const btn = form.querySelector('.contact-send');
  const status = form.querySelector('#contact-status');
  const nameInput = form.querySelector('#contact-name');
  const emailInput = form.querySelector('#contact-email');
  const messageInput = form.querySelector('#contact-message');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!form.checkValidity()) {
    status.textContent = 'Please complete the highlighted fields before sending.';
    form.reportValidity();
    const invalid = form.querySelector(':invalid');
    if (invalid) invalid.focus();
    return;
  }

  const label = btn.querySelector('.contact-send-label') || btn;

  btn.disabled = true;
  label.textContent = 'Sending...';
  status.textContent = 'Sending your message.';

  try {
    const response = await fetch('/api/forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'lead',
        data: {
          name,
          email,
          message,
          source: 'Hinova Design Website',
          website: form.querySelector('[name="website"]')?.value || ''
        }
      })
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(
        result.error || 'Lead submission failed with status ' + response.status
      );
    }

    label.textContent = 'Message Sent! ✓';
    btn.classList.add('is-sent');
    status.textContent = 'Your message was sent successfully. I will reply within 1–2 business days.';

    form.reset();

    setTimeout(function () {
      label.textContent = 'Start Your Project';
      btn.classList.remove('is-sent');
      btn.disabled = false;
    }, 3000);
  } catch (error) {
    console.error('Error sending message:', error);

    label.textContent = 'Error! Try again.';
    status.textContent = 'Your message could not be sent. Please try again or email hina@hinovadesign.com.';
    btn.disabled = false;

    setTimeout(function () {
      label.textContent = 'Start Your Project';
    }, 2000);
  }
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    sendMessage(form);
  });
}

/* ═══════════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════════ */
function initSmoothScroll() {
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); }
    });
  });
}

/* ═══════════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
═══════════════════════════════════════════ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.navbar-links a');
  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(function (l) {
      l.style.color = (l.getAttribute('href') === '#' + current) ? 'var(--secondary)' : '';
    });
  });
}

/* ═══════════════════════════════════════════
   SKILLS SCROLL ANIMATIONS
═══════════════════════════════════════════ */
function initSkillsAnimations() {
  if (!('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.svc-card').forEach(function (el) {
    el.classList.add('will-animate');
    observer.observe(el);
  });
}

/* ═══════════════════════════════════════════
   PROCESS — reveal on scroll + timeline progress
═══════════════════════════════════════════ */
function initProcessSection() {
  var section = document.getElementById('process');
  if (!section) return;
  var steps = section.querySelector('.process-steps');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    section.classList.add('in-view');
    if (steps) steps.style.setProperty('--progress', 1);
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        section.classList.add('in-view');
        obs.unobserve(section);
      }
    });
  }, { threshold: 0.18 });
  obs.observe(section);

  /* lime timeline fills as the steps column passes through the viewport */
  function updateProgress() {
    if (!steps) return;
    var r = steps.getBoundingClientRect();
    var ratio = (window.innerHeight * 0.55 - r.top) / r.height;
    steps.style.setProperty('--progress', Math.min(1, Math.max(0, ratio)).toFixed(3));
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* ═══════════════════════════════════════════
   WHY ME — staggered reveal on scroll
═══════════════════════════════════════════ */
function initWhySection() {
  var section = document.getElementById('why');
  if (!section) return;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) { section.classList.add('in-view'); return; }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { section.classList.add('in-view'); obs.unobserve(section); }
    });
  }, { threshold: 0.2 });
  obs.observe(section);
}

/* Mobile navigation: toggle collapsed menu on small viewports */
function initMobileNav() {
  const toggle = document.querySelector('.navbar-toggle');
  const menu   = document.querySelector('.navbar-links');
  if (!toggle || !menu) return;

  function closeMenu(returnFocus) {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    menu.style.display = '';
    document.body.style.overflow = '';
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    if (isOpen) {
      menu.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      const firstLink = menu.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      closeMenu(false);
    }
  });

  // Close menu when a link is clicked
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      closeMenu(false);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('open')) closeMenu(true);
  });

  // Reset on resize to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
      closeMenu(false);
    }
  });
}

/* ═══════════════════════════════════════════
   TESTIMONIALS — duplicate cards for a seamless marquee loop
═══════════════════════════════════════════ */
function initTestimonials() {
  var track = document.querySelector('#testimonials .tm-track');
  if (!track || track.dataset.looped) return;
  track.querySelectorAll('.tcard-stars').forEach(function (stars) {
    stars.setAttribute('aria-label', '5 out of 5 stars');
    stars.setAttribute('role', 'img');
  });
  Array.from(track.children).forEach(function (card) {
    var clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
  track.dataset.looped = '1';
}

/* ═══════════════════════════════════════════
   BOOT
═══════════════════════════════════════════ */
function initAll() {
  initSmoothScroll();
  initWorkCarousel();
  initActiveNav();
  initSkillsAnimations();
  initTestimonials();
  initProcessSection();
  initWhySection();
  initMobileNav();
  initContactForm();
  /* expose globals needed by inline onclick attrs in components */
  window.changeSlide  = changeSlide;
}

document.addEventListener('DOMContentLoaded', loadComponents);
