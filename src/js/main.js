/* ═══════════════════════════════════════════
   COMPONENT LOADER
   Fetches each HTML component and injects it
   into the corresponding placeholder div.
═══════════════════════════════════════════ */
const components = [
  { id: 'navbar-root',   file: 'src/components/Navbar.html'   },
  { id: 'hero-root',     file: 'src/components/Hero.html'     },
  { id: 'tools-root',    file: 'src/components/Tools.html'    },
  { id: 'about-root',    file: 'src/components/About.html'    },
  { id: 'work-root',     file: 'src/components/Work.html'     },
  { id: 'skills-root',   file: 'src/components/Skills.html'   },
  { id: 'process-root',  file: 'src/components/Process.html'  },
  { id: 'why-root',      file: 'src/components/WhyMe.html'    },
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
  { src: 'assets/images/work-1.png', label: 'Course Design'          },
  { src: 'assets/images/work-2.png', label: 'Course Design (Dark)'   },
  { src: 'assets/images/work-3.png', label: 'Book a Call'            },
  { src: 'assets/images/work-4.png', label: 'Book a Call (Dark)'     },
  { src: 'assets/images/work-5.png', label: 'Client Reviews'         },
  { src: 'assets/images/work-6.png', label: 'Client Reviews (Dark)'  },
  { src: 'assets/images/work-7.png', label: 'Portfolio Work'         },
  { src: 'assets/images/work-8.png', label: 'Portfolio Work (Dark)'  },
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
   CONTACT FORM
═══════════════════════════════════════════ */
function sendMessage(btn) {
  const form  = btn.closest('.contact-form');
  const name  = form.querySelector('input[type=text]').value.trim();
  const email = form.querySelector('input[type=email]').value.trim();
  const msg   = form.querySelector('textarea').value.trim();
  if (!name || !email || !msg) { alert('Please fill in all fields.'); return; }
  btn.textContent = 'Message Sent! ✓';
  btn.style.background = '#fff';
  btn.style.color = '#1e1e1e';
  setTimeout(function () {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    btn.style.color = '';
    form.querySelector('input[type=text]').value  = '';
    form.querySelector('input[type=email]').value = '';
    form.querySelector('textarea').value          = '';
  }, 3000);
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
   BOOT
═══════════════════════════════════════════ */
function initAll() {
  initSmoothScroll();
  initActiveNav();
  /* expose globals needed by inline onclick attrs in components */
  window.changeSlide  = changeSlide;
  window.sendMessage  = sendMessage;
}

document.addEventListener('DOMContentLoaded', loadComponents);
