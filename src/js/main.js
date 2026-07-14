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
const SLIDES = [
  { src: 'assets/images/Featured%20Work/1.png',  label: 'Course Design'    },
  { src: 'assets/images/Featured%20Work/2.png',  label: 'Worksheet Design' },
  { src: 'assets/images/Featured%20Work/3.png',  label: 'Fillable Forms'   },
];
let slideIndex = 0;

function changeSlide(dir) {
  const cards    = document.querySelectorAll('.work-card');
  const outClass = dir > 0 ? 'slide-out-left'  : 'slide-out-right';
  const inClass  = dir > 0 ? 'slide-in-right'  : 'slide-in-left';

  const arrowId = dir > 0 ? 'nextArrow' : 'prevArrow';
  const arrow   = document.getElementById(arrowId);
  if (arrow) {
    arrow.classList.add('clicked');
    setTimeout(function () { arrow.classList.remove('clicked'); }, 250);
  }

  cards.forEach(function (card) {
    card.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
    card.classList.add(outClass);
  });

  setTimeout(function () {
    slideIndex = (slideIndex + dir + SLIDES.length) % SLIDES.length;
    cards.forEach(function (card, i) {
      const s = SLIDES[(slideIndex + i) % SLIDES.length];
      card.querySelector('.card-img').src            = s.src;
      card.querySelector('.card-label').textContent  = s.label;
      card.classList.remove(outClass);
      card.classList.add(inClass);
    });
    setTimeout(function () {
      cards.forEach(function (card) { card.classList.remove(inClass); });
    }, 380);
  }, 280);
}

/* ═══════════════════════════════════════════
   CONTACT FORM WITH SUPABASE
═══════════════════════════════════════════ */
const SUPABASE_URL = 'https://opwbpmqpgudwzssvkotk.supabase.co';
const SUPABASE_PUBLISHABLE_KEY =
  'sb_publishable_f_X2-BPGvGmlzPaB2suquw_JaJYlBrf';

async function sendMessage(btn) {
  const form = btn.closest('.contact-form');

  const nameInput = form.querySelector('#contact-name');
  const emailInput = form.querySelector('#contact-email');
  const messageInput = form.querySelector('#contact-message');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  if (!emailInput.checkValidity()) {
    alert('Please enter a valid email address.');
    emailInput.focus();
    return;
  }

  const label = btn.querySelector('.contact-send-label') || btn;

  btn.disabled = true;
  label.textContent = 'Sending...';

  try {
    const response = await fetch(
      SUPABASE_URL + '/rest/v1/leads',
      {
        method: 'POST',
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      }
    );

    if (!response.ok) {
      throw new Error(
        'Lead submission failed with status ' + response.status
      );
    }

    label.textContent = 'Message Sent! ✓';
    btn.classList.add('is-sent');
    btn.style.background = '#fff';

    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';

    setTimeout(function () {
      label.textContent = 'Start Your Project';
      btn.classList.remove('is-sent');
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  } catch (error) {
    console.error('Error sending message:', error);

    label.textContent = 'Error! Try again.';
    btn.disabled = false;

    setTimeout(function () {
      label.textContent = 'Start Your Project';
    }, 2000);
  }
}

/* ═══════════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
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

  toggle.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) { menu.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
    else       { menu.style.display = '';     document.body.style.overflow = ''; }
  });

  // Close menu when a link is clicked
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.style.display = '';
      document.body.style.overflow = '';
    });
  });

  // Reset on resize to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
      menu.classList.remove('open');
      menu.style.display = '';
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ═══════════════════════════════════════════
   TESTIMONIALS — duplicate cards for a seamless marquee loop
═══════════════════════════════════════════ */
function initTestimonials() {
  var track = document.querySelector('#testimonials .tm-track');
  if (!track || track.dataset.looped) return;
  track.innerHTML += track.innerHTML;  /* the CSS translateX(-50%) loop needs two copies */
  track.dataset.looped = '1';
}

/* ═══════════════════════════════════════════
   BOOT
═══════════════════════════════════════════ */
function initAll() {
  initSmoothScroll();
  initActiveNav();
  initSkillsAnimations();
  initTestimonials();
  initProcessSection();
  initWhySection();
  initMobileNav();
  /* expose globals needed by inline onclick attrs in components */
  window.changeSlide  = changeSlide;
  window.sendMessage  = sendMessage;
}

document.addEventListener('DOMContentLoaded', loadComponents);
