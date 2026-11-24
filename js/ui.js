/* =========================================================================
   UI CONTROLS & PAIT CASE-STUDY MODAL (60fps, Zero Layout Thrashing)
   ========================================================================= */

function filterProjects(category) {
  const cards = document.querySelectorAll('.project-card');
  const buttons = document.querySelectorAll('[data-filter-btn]');

  buttons.forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-filter-btn') === category);
  });

  cards.forEach((card) => {
    const cardCat = card.getAttribute('data-category');
    card.style.display = category === 'all' || cardCat === category ? '' : 'none';
  });
}

function openProjectModal(id) {
  const data = window.projectsData && window.projectsData[id];
  if (!data) return;

  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const setText = (elId, text) => {
    const el = document.getElementById(elId);
    if (el) el.textContent = text || '';
  };

  setText('modal-title', data.title);
  setText('modal-domain-badge', data.subtitle || data.type);
  setText('modal-team', data.team);
  setText('modal-type', data.type);
  setText('modal-problem', data.pait?.problem);
  setText('modal-approach', data.pait?.approach);
  setText('modal-impact', data.pait?.impact);

  const tradeoffsEl = document.getElementById('modal-tradeoffs');
  if (tradeoffsEl) {
    tradeoffsEl.innerHTML = '';
    (data.pait?.tradeoffs || []).forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      tradeoffsEl.appendChild(li);
    });
  }

  const repoEl = document.getElementById('modal-repo-link');
  if (repoEl) repoEl.href = data.githubUrl || 'https://github.com/Hoangnt1209';

  const liveEl = document.getElementById('modal-live-link');
  if (liveEl) {
    if (data.liveUrl) {
      liveEl.href = data.liveUrl;
      liveEl.style.display = 'inline-flex';
    } else {
      liveEl.style.display = 'none';
    }
  }

  const imgEl = document.getElementById('modal-visual-img');
  if (imgEl && data.image) {
    imgEl.src = data.image;
    imgEl.alt = data.title;
    imgEl.onclick = (e) => {
      e.stopPropagation();
      window.open(imgEl.src, '_blank', 'noopener,noreferrer');
    };
  }

  const galleryEl = document.getElementById('modal-gallery-container');
  if (galleryEl) {
    galleryEl.innerHTML = '';
    if (data.gallery && data.gallery.length > 0) {
      galleryEl.classList.remove('hidden');
      data.gallery.forEach((item, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `modal-gallery-thumb px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer ${
          idx === 0 ? 'active' : ''
        }`;
        btn.textContent = item.label;
        btn.onclick = (e) => {
          e.stopPropagation();
          if (imgEl) imgEl.src = item.src;
          galleryEl
            .querySelectorAll('.modal-gallery-thumb')
            .forEach((el) => el.classList.remove('active'));
          btn.classList.add('active');
        };
        galleryEl.appendChild(btn);
      });
    } else {
      galleryEl.classList.add('hidden');
    }
  }

  const stackEl = document.getElementById('modal-stack-pills');
  if (stackEl) {
    stackEl.innerHTML = '';
    (data.stack || []).forEach((tech) => {
      const pill = document.createElement('span');
      pill.className =
        'px-2.5 py-1 rounded-full text-xs font-medium bg-[#f4ece1] text-[#29221e] border border-[#e5dbcd]';
      pill.textContent = tech;
      stackEl.appendChild(pill);
    });
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('hidden');
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className =
    'px-4 py-3 rounded-xl bg-[#29221e] text-white text-xs font-medium shadow-lg pointer-events-auto';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 200ms ease';
    setTimeout(() => toast.remove(), 220);
  }, 3000);
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = (document.getElementById('contact-name')?.value || '').trim();
  const email = (document.getElementById('contact-email')?.value || '').trim();
  const msg = (document.getElementById('contact-message')?.value || '').trim();
  if (!name || !email || !msg) return;

  const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
  const body = encodeURIComponent(`From: ${name} (${email})\n\n${msg}`);
  window.location.href = `mailto:nth120923@gmail.com?subject=${subject}&body=${body}`;
  showToast('Opening your email client to send message to nth120923@gmail.com');
  e.target.reset();
}

window.addEventListener(
  'scroll',
  () => {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    btn.classList.toggle('opacity-0', window.scrollY <= 420);
    btn.classList.toggle('pointer-events-none', window.scrollY <= 420);
  },
  { passive: true }
);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});

window.filterProjects = filterProjects;
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.toggleMobileMenu = toggleMobileMenu;
window.handleContactSubmit = handleContactSubmit;
window.showToast = showToast;
