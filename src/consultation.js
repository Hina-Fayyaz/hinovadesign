/* ═══════════════════════════════════════════════════════════
   HINOVA DESIGN — PROJECT CONSULTATION FLOW
   Config-driven multi-step wizard. No framework — vanilla JS,
   built to mirror the feel of Framer Motion transitions using
   CSS. Structured so `submitConsultation()` is the single spot
   to wire up a real backend/API later.
═══════════════════════════════════════════════════════════ */

/* ── 1. SERVICES ── shown as cards in Step 1 ── */
const SERVICES = [
  { id: 'workbook',      name: 'Workbook Design',   icon: 'fa-book-open',        desc: 'Structured, fillable PDFs for coaching or courses' },
  { id: 'worksheets',    name: 'Worksheets',        icon: 'fa-file-pen',         desc: 'Focused single-topic exercises and printables' },
  { id: 'journals',      name: 'Journals',          icon: 'fa-feather',          desc: 'Guided prompts and reflection pages' },
  { id: 'fillablePdf',   name: 'Fillable PDFs',     icon: 'fa-file-signature',   desc: 'Intake, feedback, and onboarding forms' },
  { id: 'interactivePdf',name: 'Interactive PDFs',  icon: 'fa-arrow-pointer',    desc: 'Clickable navigation, links, and embedded media' },
  { id: 'ebooks',        name: 'E-books',           icon: 'fa-book',             desc: 'Lead magnets and long-form guides' },
  { id: 'courseMaterials', name: 'Course Materials', icon: 'fa-graduation-cap',  desc: 'Slides, handouts, and lesson guides' },
  { id: 'brandDocuments',name: 'Brand Documents',   icon: 'fa-briefcase',        desc: 'Proposals, handbooks, and brand guides' },
];

/* ── 2. DYNAMIC QUESTION SETS ── one array per service, rendered in Step 3 ── */
const QUESTIONS = {
  workbook: [
    { id: 'workbookType',   label: 'Workbook type',        type: 'text',     required: true, placeholder: 'e.g. 6-week coaching workbook' },
    { id: 'pages',          label: 'Number of pages',      type: 'radio',    required: true, options: ['Under 15', '15–40', '40+', 'Not sure yet'] },
    { id: 'audience',       label: 'Audience',             type: 'textarea', placeholder: 'Who is this for?' },
    { id: 'existingContent',label: 'Do you have existing content?', type: 'radio', options: ['Yes, ready to share', 'Partially', 'No, starting fresh'] },
    { id: 'brandGuidelines',label: 'Brand guidelines available?',   type: 'radio', options: ['Yes', 'Partially', 'No'] },
    { id: 'printable',      label: 'Need a printable version?',     type: 'radio', options: ['Yes', 'No'] },
    { id: 'deliveryDate',   label: 'Ideal delivery date',  type: 'date' },
  ],
  worksheets: [
    { id: 'topic',          label: 'Worksheet topic',      type: 'text', required: true, placeholder: 'e.g. Goal-setting exercise' },
    { id: 'count',          label: 'Number of worksheets', type: 'radio', required: true, options: ['1–3', '4–10', '10+', 'Not sure yet'] },
    { id: 'audience',       label: 'Audience',             type: 'textarea', placeholder: 'Who is this for?' },
    { id: 'existingContent',label: 'Do you have existing content?', type: 'radio', options: ['Yes', 'Partially', 'No'] },
    { id: 'brandGuidelines',label: 'Brand guidelines available?',   type: 'radio', options: ['Yes', 'Partially', 'No'] },
    { id: 'printable',      label: 'Need a printable version?',     type: 'radio', options: ['Yes', 'No'] },
    { id: 'deliveryDate',   label: 'Ideal delivery date',  type: 'date' },
  ],
  journals: [
    { id: 'theme',      label: 'Journal theme or purpose', type: 'text', required: true, placeholder: 'e.g. Daily gratitude journal' },
    { id: 'pages',      label: 'Number of pages',          type: 'radio', required: true, options: ['Under 20', '20–60', '60+', 'Not sure yet'] },
    { id: 'promptStyle',label: 'Prompt style',             type: 'radio', options: ['Guided prompts', 'Open / blank pages', 'A mix of both'] },
    { id: 'audience',   label: 'Audience',                 type: 'textarea', placeholder: 'Who is this for?' },
    { id: 'brandGuidelines', label: 'Brand guidelines available?', type: 'radio', options: ['Yes', 'Partially', 'No'] },
    { id: 'deliveryDate', label: 'Ideal delivery date', type: 'date' },
  ],
  fillablePdf: [
    { id: 'purpose',        label: 'PDF purpose',            type: 'textarea', required: true, placeholder: 'e.g. New client intake form' },
    { id: 'interactiveFields', label: 'Interactive form fields needed?', type: 'radio', required: true, options: ['Yes', 'No', 'Not sure'] },
    { id: 'signatures',     label: 'Digital signatures needed?', type: 'radio', options: ['Yes', 'No'] },
    { id: 'deliveryDate',   label: 'Ideal delivery date', type: 'date' },
  ],
  interactivePdf: [
    { id: 'purpose',      label: 'What is this PDF for?',    type: 'textarea', required: true, placeholder: 'e.g. Interactive lookbook with clickable links' },
    { id: 'pages',        label: 'Approximate number of pages', type: 'radio', options: ['Under 15', '15–40', '40+'] },
    { id: 'fillableFields', label: 'Fillable fields also needed?', type: 'radio', options: ['Yes', 'No'] },
    { id: 'deliveryDate', label: 'Ideal delivery date', type: 'date' },
  ],
  ebooks: [
    { id: 'title',        label: 'Working title / topic', type: 'text', required: true },
    { id: 'pages',        label: 'Approximate length',     type: 'radio', required: true, options: ['Under 20 pages', '20–50 pages', '50+ pages', 'Not sure yet'] },
    { id: 'structure',     label: 'Is your chapter structure/outline ready?', type: 'radio', options: ['Yes, fully ready', 'Rough outline', 'Not yet'] },
    { id: 'cover',         label: 'Cover design needed?', type: 'radio', options: ['Yes', 'No'] },
    { id: 'illustrations', label: 'Illustrations or custom graphics needed?', type: 'radio', options: ['Yes', 'No', 'Not sure'] },
    { id: 'deliveryDate',  label: 'Ideal delivery date', type: 'date' },
  ],
  courseMaterials: [
    { id: 'platform',    label: 'Platform',              type: 'text', required: true, placeholder: 'e.g. Kajabi, Teachable, Thinkific...' },
    { id: 'lessons',     label: 'Number of lessons',      type: 'radio', required: true, options: ['Under 10', '10–25', '25+', 'Not sure yet'] },
    { id: 'workbook',    label: 'Workbook included?',     type: 'radio', options: ['Yes', 'No'] },
    { id: 'slides',      label: 'Slides required?',       type: 'radio', options: ['Yes', 'No'] },
    { id: 'certificates',label: 'Certificates of completion needed?', type: 'radio', options: ['Yes', 'No'] },
    { id: 'quizzes',     label: 'Quizzes needed?',        type: 'radio', options: ['Yes', 'No'] },
    { id: 'deliveryDate',label: 'Ideal delivery date', type: 'date' },
  ],
  brandDocuments: [
    { id: 'docType',    label: 'Document type', type: 'text', required: true, placeholder: 'e.g. Brand guidelines, proposal template, handbook' },
    { id: 'pages',      label: 'Approximate length', type: 'radio', options: ['Under 10 pages', '10–25 pages', '25+ pages', 'Not sure yet'] },
    { id: 'assets',     label: 'Existing brand assets available?', type: 'radio', options: ['Yes', 'Partially', 'No'] },
    { id: 'audience',   label: 'Who is this document for?', type: 'textarea' },
    { id: 'deliveryDate', label: 'Ideal delivery date', type: 'date' },
  ],
};

/* ── 3. STEP META ── labels + progress copy ── */
const STEP_META = [
  { label: 'Your project',   title: 'What do you need designed?' },
  { label: 'About you',      title: 'Nice to meet you' },
  { label: 'Project details',title: 'Tell me about your project' },
  { label: 'Design style',   title: 'Let\'s talk style' },
  { label: 'Timeline & budget', title: 'Timeline & budget' },
  { label: 'Review',         title: 'Review your request' },
];
const TOTAL_STEPS = STEP_META.length;

/* ── 4. STATE ──
   Kept in memory only (no localStorage/sessionStorage — this
   page is also embedded as a live-preview artifact, where
   browser storage APIs are unavailable). Answers persist as
   you move between steps in the same session. */
const state = {
  step: 1,
  service: null,
  about: {},
  project: {},
  style: {},
  logistics: {},
  files: { inspiration: [], branding: [], logo: [] },
};

/* ═══════════════════════════════════════════════════════════
   RENDER
═══════════════════════════════════════════════════════════ */
function renderProgress() {
  const pct = Math.round((state.step / TOTAL_STEPS) * 100);
  document.getElementById('progressStepLabel').textContent = `Step ${state.step} of ${TOTAL_STEPS} — ${STEP_META[state.step - 1].label}`;
  document.getElementById('progressPct').textContent = `${pct}%`;
  const track = document.getElementById('progressSegments');
  track.innerHTML = '';
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const seg = document.createElement('div');
    seg.className = 'progress-segment' + (i <= state.step ? ' is-filled' : '');
    track.appendChild(seg);
  }
}

function fieldWrapper(field, value, groupName) {
  const req = field.required ? '<span class="req-star">*</span>' : '';
  const helper = field.helper ? `<p class="field-helper">${field.helper}</p>` : '';
  let control = '';

  if (field.type === 'text' || field.type === 'date') {
    control = `<input class="wizard-input" type="${field.type}" id="${field.id}" placeholder="${field.placeholder || ''}" value="${value || ''}" />`;
  } else if (field.type === 'textarea') {
    control = `<textarea class="wizard-textarea" id="${field.id}" placeholder="${field.placeholder || ''}">${value || ''}</textarea>`;
  } else if (field.type === 'radio') {
    control = `<div class="option-stack">` + field.options.map((opt, i) => `
      <label class="option-row ${value === opt ? 'is-selected' : ''}">
        <input type="radio" name="${field.id}" value="${opt}" ${value === opt ? 'checked' : ''} />
        <span class="option-radio-dot"></span>
        <span>${opt}</span>
      </label>`).join('') + `</div>`;
  } else if (field.type === 'checkbox') {
    const arr = Array.isArray(value) ? value : [];
    control = `<div class="option-stack">` + field.options.map(opt => `
      <label class="option-row ${arr.includes(opt) ? 'is-selected' : ''}">
        <input type="checkbox" name="${field.id}" value="${opt}" ${arr.includes(opt) ? 'checked' : ''} />
        <span class="option-check-box"><i class="fas fa-check"></i></span>
        <span>${opt}</span>
      </label>`).join('') + `</div>`;
  }

  return `<div class="field-group" data-field="${field.id}">
    <label class="field-label">${field.label} ${req}</label>
    ${helper}
    ${control}
    <p class="field-error-msg">This field is required.</p>
  </div>`;
}

function renderStep() {
  const root = document.getElementById('stepContent');
  root.classList.remove('step-enter');
  void root.offsetWidth; /* restart animation */
  let html = '';

  if (state.step === 1) {
    html = `
      <span class="step-eyebrow">STEP 01 / ${TOTAL_STEPS}</span>
      <h2 class="step-title">What do you need designed?</h2>
      <p class="step-subtitle">Select everything that applies — I'll tailor the following questions to your exact scope.</p>
      <div class="service-grid">
        ${SERVICES.map(s => `
          <button type="button" class="service-card ${state.service === s.id ? 'is-selected' : ''}" data-service="${s.id}">
            <div class="service-card-icon"><i class="fas ${s.icon}"></i></div>
            <span class="service-card-name">${s.name}</span>
            <span class="service-card-desc">${s.desc}</span>
          </button>
        `).join('')}
      </div>`;
  }

  if (state.step === 2) {
    const a = state.about;
    html = `
      <span class="step-eyebrow">STEP 02 / ${TOTAL_STEPS}</span>
      <h2 class="step-title">Nice to meet you</h2>
      <p class="step-subtitle">Tell me a little about yourself so I can personalise my response.</p>
      <div class="field-row">
        ${fieldWrapper({ id: 'firstName', label: 'First name', type: 'text', required: true, placeholder: 'Sarah' }, a.firstName)}
        ${fieldWrapper({ id: 'lastName', label: 'Last name', type: 'text', placeholder: 'Johnson' }, a.lastName)}
      </div>
      ${fieldWrapper({ id: 'email', label: 'Email address', type: 'text', required: true, placeholder: 'sarah@yourbrand.com' }, a.email)}
      ${fieldWrapper({ id: 'business', label: 'Business or brand name', type: 'text', placeholder: 'The Empowered Coach' }, a.business)}
      ${fieldWrapper({ id: 'website', label: 'Website or social link', type: 'text', placeholder: 'https://yourwebsite.com', helper: 'So I can understand your current branding' }, a.website)}
      ${fieldWrapper({ id: 'brandStatus', label: 'Do you have existing brand guidelines?', type: 'radio', options: ['Yes — logo, colours & fonts ready to go', 'Partially — some elements, need help pulling it together', "No — I'll need direction on the visual style"] }, a.brandStatus)}
    `;
  }

  if (state.step === 3) {
    const fields = QUESTIONS[state.service] || [];
    const p = state.project;
    html = `
      <span class="step-eyebrow">STEP 03 / ${TOTAL_STEPS}</span>
      <h2 class="step-title">Tell me about your project</h2>
      <p class="step-subtitle">The more detail you share, the more accurately I can plan your project and timeline.</p>
      ${fields.map(f => fieldWrapper(f, p[f.id])).join('')}
    `;
  }

  if (state.step === 4) {
    const st = state.style;
    html = `
      <span class="step-eyebrow">STEP 04 / ${TOTAL_STEPS}</span>
      <h2 class="step-title">Let's talk style</h2>
      <p class="step-subtitle">Share anything that helps me understand the look and feel you're going for.</p>
      ${fileFieldWrapper('inspiration', 'Upload inspiration', 'Moodboards, screenshots, anything you love')}
      ${fieldWrapper({ id: 'colours', label: 'Preferred colours', type: 'text', placeholder: 'e.g. Warm neutrals with a pink accent' }, st.colours)}
      ${fieldWrapper({ id: 'referenceSites', label: 'Reference websites or brands', type: 'textarea', placeholder: 'Any websites or brands whose style you admire' }, st.referenceSites)}
      ${fileFieldWrapper('branding', 'Upload branding assets', 'Brand guide, fonts, colour palette')}
      ${fileFieldWrapper('logo', 'Upload logo', 'PNG or SVG preferred')}
      ${fieldWrapper({ id: 'notes', label: 'Additional notes', type: 'textarea', placeholder: 'Anything else I should know?' }, st.notes)}
    `;
  }

  if (state.step === 5) {
    const l = state.logistics;
    html = `
      <span class="step-eyebrow">STEP 05 / ${TOTAL_STEPS}</span>
      <h2 class="step-title">Timeline & budget</h2>
      <p class="step-subtitle">This helps me check availability and recommend the right scope for your budget.</p>
      ${fieldWrapper({ id: 'timeline', label: 'Delivery timeline', type: 'radio', required: true, options: ['ASAP (rush)', '2–4 weeks', '1–2 months', 'Flexible / not sure'] }, l.timeline)}
      ${fieldWrapper({ id: 'budget', label: 'Budget range', type: 'radio', required: true, options: ['Under $300', '$300 – $800', '$800 – $2,000', '$2,000+'] }, l.budget)}
      ${fieldWrapper({ id: 'priority', label: 'Priority level', type: 'radio', options: ['Standard', 'Rush (additional fee may apply)'] }, l.priority)}
      ${fieldWrapper({ id: 'communication', label: 'Preferred communication', type: 'radio', options: ['Email', 'WhatsApp', 'Scheduled call'] }, l.communication)}
    `;
  }

  if (state.step === 6) {
    html = renderReview();
  }

  root.innerHTML = html;
  root.classList.add('step-enter');
  attachStepListeners();
  updateNavButtons();
  renderProgress();
  window.scrollTo({ top: document.getElementById('wizardCard').offsetTop - 40, behavior: 'smooth' });
}

function fileFieldWrapper(key, label, helper) {
  const files = state.files[key] || [];
  return `<div class="field-group">
    <label class="field-label">${label}</label>
    <p class="field-helper">${helper}</p>
    <label class="file-drop" for="file-${key}">
      <i class="fas fa-cloud-arrow-up"></i>
      <span>Click to upload or drag files here</span>
      <input type="file" id="file-${key}" data-filekey="${key}" multiple style="display:none;" />
    </label>
    <div class="file-chip-row" id="chips-${key}">
      ${files.map((f, i) => `<span class="file-chip">${f}<button type="button" class="file-chip-remove" data-key="${key}" data-index="${i}">&times;</button></span>`).join('')}
    </div>
  </div>`;
}

function renderReview() {
  const s = SERVICES.find(x => x.id === state.service);
  const rows = (obj, fields) => Object.entries(obj).filter(([, v]) => v && v.length).map(([k, v]) => {
    const f = fields.find(x => x.id === k);
    const label = f ? f.label : k;
    return `<div class="review-row"><span class="review-key">${label}</span><span class="review-val">${Array.isArray(v) ? v.join(', ') : v}</span></div>`;
  }).join('') || '<p class="review-empty">No details provided.</p>';

  return `
    <span class="step-eyebrow">STEP 06 / ${TOTAL_STEPS}</span>
    <h2 class="step-title">Review your request</h2>
    <p class="step-subtitle">Take a look before you send it over — you can jump back and edit anything.</p>

    <div class="review-block">
      <div class="review-block-head"><span>Service</span><button type="button" class="review-edit" data-jump="1">Edit</button></div>
      <div class="review-row"><span class="review-key">Selected</span><span class="review-val">${s ? s.name : '—'}</span></div>
    </div>

    <div class="review-block">
      <div class="review-block-head"><span>About you</span><button type="button" class="review-edit" data-jump="2">Edit</button></div>
      <div class="review-row"><span class="review-key">Name</span><span class="review-val">${(state.about.firstName || '') + ' ' + (state.about.lastName || '')}</span></div>
      <div class="review-row"><span class="review-key">Email</span><span class="review-val">${state.about.email || '—'}</span></div>
      <div class="review-row"><span class="review-key">Business</span><span class="review-val">${state.about.business || '—'}</span></div>
      <div class="review-row"><span class="review-key">Website</span><span class="review-val">${state.about.website || '—'}</span></div>
      <div class="review-row"><span class="review-key">Brand guidelines</span><span class="review-val">${state.about.brandStatus || '—'}</span></div>
    </div>

    <div class="review-block">
      <div class="review-block-head"><span>Project details</span><button type="button" class="review-edit" data-jump="3">Edit</button></div>
      ${rows(state.project, QUESTIONS[state.service] || [])}
    </div>

    <div class="review-block">
      <div class="review-block-head"><span>Design style</span><button type="button" class="review-edit" data-jump="4">Edit</button></div>
      <div class="review-row"><span class="review-key">Inspiration files</span><span class="review-val">${state.files.inspiration.length ? state.files.inspiration.join(', ') : '—'}</span></div>
      <div class="review-row"><span class="review-key">Preferred colours</span><span class="review-val">${state.style.colours || '—'}</span></div>
      <div class="review-row"><span class="review-key">Reference sites</span><span class="review-val">${state.style.referenceSites || '—'}</span></div>
      <div class="review-row"><span class="review-key">Branding assets</span><span class="review-val">${state.files.branding.length ? state.files.branding.join(', ') : '—'}</span></div>
      <div class="review-row"><span class="review-key">Logo</span><span class="review-val">${state.files.logo.length ? state.files.logo.join(', ') : '—'}</span></div>
      <div class="review-row"><span class="review-key">Notes</span><span class="review-val">${state.style.notes || '—'}</span></div>
    </div>

    <div class="review-block">
      <div class="review-block-head"><span>Timeline & budget</span><button type="button" class="review-edit" data-jump="5">Edit</button></div>
      ${rows(state.logistics, [
        { id: 'timeline', label: 'Delivery timeline' }, { id: 'budget', label: 'Budget range' },
        { id: 'priority', label: 'Priority level' }, { id: 'communication', label: 'Preferred communication' },
      ])}
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════
   EVENTS
═══════════════════════════════════════════════════════════ */
function attachStepListeners() {
  /* Step 1 — service cards */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
      state.service = card.dataset.service;
      document.querySelectorAll('.service-card').forEach(c => c.classList.remove('is-selected'));
      card.classList.add('is-selected');
      clearFieldError(document.getElementById('stepContent'));
    });
  });

  /* radio / checkbox option rows */
  document.querySelectorAll('.option-row input').forEach(input => {
    input.addEventListener('change', () => {
      const row = input.closest('.option-row');
      const group = input.closest('.option-stack');
      if (input.type === 'radio') {
        group.querySelectorAll('.option-row').forEach(r => r.classList.remove('is-selected'));
        row.classList.add('is-selected');
      } else {
        row.classList.toggle('is-selected', input.checked);
      }
      saveCurrentStepValues();
      clearFieldError(row.closest('.field-group'));
    });
  });

  /* text / textarea / date live-save + clear error on input */
  document.querySelectorAll('.wizard-input, .wizard-textarea').forEach(input => {
    input.addEventListener('input', () => {
      saveCurrentStepValues();
      clearFieldError(input.closest('.field-group'));
    });
  });

  /* file inputs */
  document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', () => {
      const key = input.dataset.filekey;
      const names = Array.from(input.files).map(f => f.name);
      state.files[key] = state.files[key].concat(names);
      renderFileChips(key);
    });
  });

  /* review screen edit jumps */
  document.querySelectorAll('.review-edit').forEach(btn => {
    btn.addEventListener('click', () => { state.step = parseInt(btn.dataset.jump, 10); renderStep(); });
  });
}

function renderFileChips(key) {
  const wrap = document.getElementById(`chips-${key}`);
  if (!wrap) return;
  wrap.innerHTML = state.files[key].map((f, i) =>
    `<span class="file-chip">${f}<button type="button" class="file-chip-remove" data-key="${key}" data-index="${i}">&times;</button></span>`
  ).join('');
  wrap.querySelectorAll('.file-chip-remove').forEach(b => {
    b.addEventListener('click', () => {
      state.files[b.dataset.key].splice(parseInt(b.dataset.index, 10), 1);
      renderFileChips(b.dataset.key);
    });
  });
}

function saveCurrentStepValues() {
  const root = document.getElementById('stepContent');
  if (state.step === 2) {
    state.about.firstName  = val(root, 'firstName');
    state.about.lastName   = val(root, 'lastName');
    state.about.email      = val(root, 'email');
    state.about.business   = val(root, 'business');
    state.about.website    = val(root, 'website');
    state.about.brandStatus = radioVal(root, 'brandStatus');
  }
  if (state.step === 3) {
    (QUESTIONS[state.service] || []).forEach(f => {
      if (f.type === 'checkbox') state.project[f.id] = checkboxVals(root, f.id);
      else if (f.type === 'radio') state.project[f.id] = radioVal(root, f.id);
      else state.project[f.id] = val(root, f.id);
    });
  }
  if (state.step === 4) {
    state.style.colours = val(root, 'colours');
    state.style.referenceSites = val(root, 'referenceSites');
    state.style.notes = val(root, 'notes');
  }
  if (state.step === 5) {
    state.logistics.timeline = radioVal(root, 'timeline');
    state.logistics.budget = radioVal(root, 'budget');
    state.logistics.priority = radioVal(root, 'priority');
    state.logistics.communication = radioVal(root, 'communication');
  }
}
function val(root, id) { const el = root.querySelector(`#${id}`); return el ? el.value.trim() : ''; }
function radioVal(root, name) { const el = root.querySelector(`input[name="${name}"]:checked`); return el ? el.value : ''; }
function checkboxVals(root, name) { return Array.from(root.querySelectorAll(`input[name="${name}"]:checked`)).map(i => i.value); }

/* ═══════════════════════════════════════════════════════════
   VALIDATION
═══════════════════════════════════════════════════════════ */
function clearFieldError(scope) {
  if (!scope) return;
  scope.classList.remove('has-error');
  scope.querySelectorAll('.field-group.has-error').forEach(g => g.classList.remove('has-error'));
}

function validateStep() {
  saveCurrentStepValues();
  const root = document.getElementById('stepContent');
  let firstError = null;
  let ok = true;

  function flag(group) {
    ok = false;
    group.classList.add('has-error');
    group.classList.add('shake');
    setTimeout(() => group.classList.remove('shake'), 400);
    if (!firstError) firstError = group;
  }

  if (state.step === 1 && !state.service) {
    ok = false;
    document.querySelector('.service-grid').classList.add('shake');
    setTimeout(() => document.querySelector('.service-grid').classList.remove('shake'), 400);
  }

  if (state.step === 2) {
    if (!state.about.firstName) flag(root.querySelector('[data-field="firstName"]') || root);
    if (!state.about.email || !/^\S+@\S+\.\S+$/.test(state.about.email)) {
      const g = root.querySelector('#email')?.closest('.field-group');
      if (g) flag(g);
    }
  }

  if (state.step === 3) {
    (QUESTIONS[state.service] || []).forEach(f => {
      if (f.required && !state.project[f.id]) {
        const g = root.querySelector(`[data-field="${f.id}"]`);
        if (g) flag(g);
      }
    });
  }

  if (state.step === 5) {
    if (!state.logistics.timeline) flag(root.querySelector('[data-field="timeline"]'));
    if (!state.logistics.budget)   flag(root.querySelector('[data-field="budget"]'));
  }

  if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  return ok;
}

/* ═══════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════ */
function updateNavButtons() {
  document.getElementById('backBtn').style.visibility = state.step === 1 ? 'hidden' : 'visible';
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.textContent = state.step === TOTAL_STEPS ? 'Submit Request' : 'Continue';
}

function goNext() {
  if (!validateStep()) return;
  if (state.step === TOTAL_STEPS) { submitConsultation(); return; }
  state.step++;
  renderStep();
}
function goBack() {
  if (state.step === 1) return;
  state.step--;
  renderStep();
}

/* ═══════════════════════════════════════════════════════════
   SUBMIT — API-ready: swap the setTimeout for a real fetch()
   to your backend/CRM/email service. Payload is already
   structured and ready to send as JSON.
═══════════════════════════════════════════════════════════ */
function submitConsultation() {
  const payload = {
    service: state.service,
    about: state.about,
    project: state.project,
    style: state.style,
    files: state.files,
    logistics: state.logistics,
    submittedAt: new Date().toISOString(),
  };
  console.log('Consultation payload ready to send:', payload);

  const nextBtn = document.getElementById('nextBtn');
  nextBtn.disabled = true;
  nextBtn.textContent = 'Sending…';

  /* simulated network request — replace with a real fetch() call */
  setTimeout(() => {
    document.getElementById('wizardCard').style.display = 'none';
    document.getElementById('progressBar').style.display = 'none';
    const success = document.getElementById('successScreen');
    success.style.display = 'block';
    void success.offsetWidth;
    success.classList.add('step-enter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 900);
}

/* ═══════════════════════════════════════════════════════════
   INTRO — plays once on load: blank screen with just the
   headline, then fades out and auto-scrolls to the project
   menu (Step 1) so the visitor lands right where they act.
═══════════════════════════════════════════════════════════ */
function initIntro() {
  const intro = document.getElementById('consultIntro');
  if (!intro) return;
  setTimeout(() => {
    intro.classList.add('intro-done');
    setTimeout(() => {
      const target = document.getElementById('progressBar') || document.getElementById('wizardCard');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }, 2000);
}

/* ═══════════════════════════════════════════════════════════
   BOOT
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initIntro();
  renderStep();
  document.getElementById('nextBtn').addEventListener('click', goNext);
  document.getElementById('backBtn').addEventListener('click', goBack);
  /* keyboard: Enter submits the current step (unless focus is in a textarea) */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement.tagName !== 'TEXTAREA') {
      const active = document.activeElement;
      if (active && (active.type === 'text' || active.type === 'date' || active.type === 'radio' || active.type === 'checkbox')) {
        e.preventDefault();
        goNext();
      }
    }
  });
});
