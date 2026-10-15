// FTR Future Rise Enterprise — extra animation
// Works together with css/animations.css. Delete both lines in index.html to switch off.
// Does nothing for visitors who have "reduce motion" turned on.

(function () {
  if (!window.matchMedia || !matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // --- Helpers -------------------------------------------------------------
  function onVisible(el, cb, threshold) {
    if (!('IntersectionObserver' in window)) { cb(el); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { cb(e.target); io.unobserve(e.target); } });
    }, { threshold: threshold || 0.15 });
    io.observe(el);
  }

  // --- 1. Groups that arrive one item at a time ---------------------------
  const groups = '.who-grid, .cards, .tag-row, .stops-3, .fitlist, .video-grid, .pyramid, .compare-split, .culture-duo, .journey-strip';
  document.querySelectorAll(groups).forEach(g => {
    const kids = [...g.children];
    kids.forEach((k, i) => k.style.setProperty('--i', i));
    if (!g.classList.contains('reveal')) return;
    g.classList.add('stagger');
    onVisible(g, () => setTimeout(() => g.classList.add('settled'), kids.length * 85 + 900));
  });
  document.querySelectorAll('#path .stop').forEach((s, i) => s.style.setProperty('--i', i));

  // --- 2. Headings: words rise into place ---------------------------------
  document.querySelectorAll('.section-head h2, .cta h2').forEach(h => {
    if (!h.closest('.reveal') || h.children.length) return;
    const words = h.textContent.trim().split(/\s+/);
    h.setAttribute('aria-label', h.textContent.trim());
    h.innerHTML = words.map((w, i) =>
      '<span class="w" aria-hidden="true"><span style="--w:' + i + '">' + w.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span></span>'
    ).join(' ');
    h.classList.add('split');
  });

  // --- 3. Arrows in text links nudge on hover (buttons lift instead) ----------------------------------
  document.querySelectorAll('a:not(.btn)').forEach(a => {
    const last = a.lastChild;
    if (!last || last.nodeType !== 3) return;
    const m = last.textContent.match(/^(.*?)\s*([→↗])\s*$/s);
    if (!m) return;
    last.textContent = m[1] + ' ';
    const s = document.createElement('span');
    s.className = 'arrow' + (m[2] === '↗' ? ' up' : '');
    s.setAttribute('aria-hidden', 'true');
    s.textContent = m[2];
    a.appendChild(s);
  });

  // --- 4. Dotted path draws itself ----------------------------------------
  // (watch the stops below it: the line itself starts fully clipped, so it never counts as "visible")
  const path = document.querySelector('.path-svg');
  const stops = path && path.nextElementSibling;
  if (stops) onVisible(stops, () => path.classList.add('is-visible'), 0.1);

  // --- 5. Scroll progress bar, nav shadow, banner parallax ----------------
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  const nav = document.querySelector('nav');
  const banner = document.querySelector('.hero-banner');
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);
    if (nav) nav.classList.toggle('is-scrolled', y > 10);
    if (banner && y < innerHeight * 1.2) banner.style.setProperty('--parallax', (y * 0.25).toFixed(1) + 'px');
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // --- 6. Gold spotlight follows the mouse + card tilt (computers only) ---
  if (finePointer) {
    document.querySelectorAll('.guide').forEach(sec => {
      sec.addEventListener('pointermove', e => {
        const r = sec.getBoundingClientRect();
        sec.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        sec.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
    const card = document.querySelector('.assess-card');
    if (card) {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', (x * 5).toFixed(2) + 'deg');
        card.style.setProperty('--rx', (-y * 5).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    }
  }

  // --- 8. Hero: "Discover / Develop / Build" underlined in turn -----------
  const lead = document.querySelector('.hero-cta .lead');
  if (lead && !lead.children.length) {
    let n = 0;
    lead.innerHTML = lead.textContent.replace(/\b(Discover|Develop|Build)\b/g, w => '<span class="hl" style="--h:' + (n++) + '">' + w + '</span>');
  }

  // --- 9. Gold shimmer on the last two words of headings in dark sections --
  document.querySelectorAll('.on-dark h2.split, .cta h2.split').forEach(h => {
    [...h.querySelectorAll('.w > span')].slice(-2).forEach(s => s.classList.add('gold'));
  });

  // --- 10. A spark travels along each journey line ------------------------
  document.querySelectorAll('.journey-strip').forEach(strip => {
    const r = document.createElement('span');
    r.className = 'runner';
    r.setAttribute('aria-hidden', 'true');
    strip.prepend(r);
  });

  // --- 11. Cards tilt, buttons lean toward the mouse (computers only) -----
  if (finePointer) {
    document.querySelectorAll('.card, .who-card').forEach(c => {
      c.addEventListener('pointermove', e => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty('--ry', ((x - 0.5) * 8).toFixed(2) + 'deg');
        c.style.setProperty('--rx', ((0.5 - y) * 8).toFixed(2) + 'deg');
        c.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
        c.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
      });
    });
    document.querySelectorAll('.btn-primary, .btn-whatsapp, .wa-float').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        b.style.setProperty('--bx', ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + 'px');
        b.style.setProperty('--by', ((e.clientY - r.top - r.height / 2) * 0.25).toFixed(1) + 'px');
      });
      b.addEventListener('pointerleave', () => { b.style.setProperty('--bx', '0px'); b.style.setProperty('--by', '0px'); });
    });
  }

  // --- 12. Gold star burst when the access code is copied -----------------
  const copyBtn = document.getElementById('copy-code-btn');
  if (copyBtn) copyBtn.addEventListener('click', () => {
    const r = copyBtn.getBoundingClientRect();
    for (let i = 0; i < 14; i++) {
      const s = document.createElement('span');
      const a = (Math.PI * 2 * i) / 14 + Math.random() * 0.4;
      const d = 40 + Math.random() * 50;
      s.className = 'burst';
      s.setAttribute('aria-hidden', 'true');
      s.style.cssText = 'left:' + (r.left + r.width / 2) + 'px;top:' + (r.top + r.height / 2) + 'px;--tx:' + (Math.cos(a) * d).toFixed(0) + 'px;--ty:' + (Math.sin(a) * d).toFixed(0) + 'px;';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1000);
    }
  });

  // --- 13. Floating WhatsApp button: appears after the banner, hides at the end
  const fab = document.querySelector('.wa-float');
  if (fab && 'IntersectionObserver' in window) {
    const watch = [document.querySelector('.hero'), document.querySelector('.cta'), document.querySelector('footer')].filter(Boolean);
    const showing = new Set();
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting ? showing.add(e.target) : showing.delete(e.target));
      fab.classList.toggle('js-show', showing.size === 0);
    }, { threshold: 0.05 });
    watch.forEach(el => io.observe(el));
  }

  // --- 7. Floating gold stars in the closing section ----------------------
  document.querySelectorAll('.cta').forEach(sec => {
    const count = innerWidth < 600 ? 10 : 18;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'spark';
      s.setAttribute('aria-hidden', 'true');
      const size = 4 + Math.random() * 9;
      s.style.cssText =
        'left:' + (Math.random() * 100).toFixed(1) + '%;' +
        '--s:' + size.toFixed(1) + 'px;' +
        '--d:' + (9 + Math.random() * 10).toFixed(1) + 's;' +
        '--delay:' + (-Math.random() * 18).toFixed(1) + 's;' +
        '--o:' + (0.35 + Math.random() * 0.55).toFixed(2) + ';' +
        '--h:' + (sec.offsetHeight + 40) + 'px;';
      sec.prepend(s);
    }
  });
})();
