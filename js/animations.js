// FTR Future Rise Enterprise — animation
// Works together with css/animations.css. Delete both lines in index.html to switch off.
// Does nothing for visitors who have "reduce motion" turned on.

(function () {
  if (!window.matchMedia || !matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  function onVisible(el, cb, threshold) {
    if (!('IntersectionObserver' in window)) { cb(el); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { cb(e.target); io.unobserve(e.target); } });
    }, { threshold: threshold || 0.1 });
    io.observe(el);
  }

  // 1. Groups arrive one item at a time
  document.querySelectorAll('.grid, .chips, .stages, .fitlist, .ways, .video-grid, .pyramid, .compare, .journey, .timeline').forEach(g => {
    const kids = [...g.children];
    kids.forEach((k, i) => k.style.setProperty('--i', i));
    if (!g.classList.contains('reveal')) return;
    g.classList.add('stagger');
    onVisible(g, () => setTimeout(() => g.classList.add('settled'), kids.length * 80 + 1000));
  });
  document.querySelectorAll('#path .stop').forEach((s, i) => s.style.setProperty('--i', i));

  // 2. Headings: words rise into place (dark-section headings end in shimmering gold)
  document.querySelectorAll('.section-head h2, .about h2, .cta h2').forEach(h => {
    if (!h.closest('.reveal') || h.children.length) return;
    const text = h.textContent.trim();
    const words = text.split(/\s+/);
    h.setAttribute('aria-label', text);
    h.innerHTML = words.map((w, i) =>
      '<span class="w" aria-hidden="true"><span style="--w:' + i + '">' + w.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span></span>'
    ).join(' ');
    h.classList.add('split');
    if (h.closest('.dark')) [...h.querySelectorAll('.w > span')].slice(-2).forEach(s => s.classList.add('gold'));
  });

  // 3. Arrows in text links nudge on hover
  document.querySelectorAll('a:not(.btn), .way-link').forEach(a => {
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

  // 4. Dotted path draws itself (watch the stops below it)
  const path = document.querySelector('.path-svg');
  const stops = path && path.nextElementSibling;
  if (stops) onVisible(stops, () => path.classList.add('is-visible'), 0.1);

  // 5. A spark travels along each journey line
  document.querySelectorAll('.journey').forEach(strip => {
    const r = document.createElement('span');
    r.className = 'runner';
    r.setAttribute('aria-hidden', 'true');
    strip.prepend(r);
  });

  // 6. Scroll progress bar + top bar shrinks after scrolling
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  const top = document.querySelector('.topbar');
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);
    if (top) top.classList.toggle('is-scrolled', y > 40);
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // 7. Mouse effects (computers only): spotlight, card tilt + glare, magnetic buttons
  if (finePointer) {
    document.querySelectorAll('.guide').forEach(sec => {
      sec.addEventListener('pointermove', e => {
        const r = sec.getBoundingClientRect();
        sec.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        sec.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
    const tilt = (el, strength) => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--ry', ((x - 0.5) * strength).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((0.5 - y) * strength).toFixed(2) + 'deg');
        el.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
      });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
    };
    document.querySelectorAll('.card, .way').forEach(c => tilt(c, 8));
    document.querySelectorAll('.assess-card').forEach(c => tilt(c, 4));
    document.querySelectorAll('.btn-gold, .btn-white, .wa-float').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        b.style.setProperty('--bx', ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + 'px');
        b.style.setProperty('--by', ((e.clientY - r.top - r.height / 2) * 0.25).toFixed(1) + 'px');
      });
      b.addEventListener('pointerleave', () => { b.style.setProperty('--bx', '0px'); b.style.setProperty('--by', '0px'); });
    });
  }

  // 8. Gold star burst when the access code is copied
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

  // 9. Floating WhatsApp button: appears after the hero, hides at the end of the page
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

  // 10. Floating gold stars in the hero and the closing section
  document.querySelectorAll('.hero, .cta').forEach(sec => {
    const count = innerWidth < 600 ? 8 : 16;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'spark';
      s.setAttribute('aria-hidden', 'true');
      s.style.cssText =
        'left:' + (Math.random() * 100).toFixed(1) + '%;' +
        '--s:' + (4 + Math.random() * 9).toFixed(1) + 'px;' +
        '--d:' + (10 + Math.random() * 10).toFixed(1) + 's;' +
        '--delay:' + (-Math.random() * 18).toFixed(1) + 's;' +
        '--o:' + (0.3 + Math.random() * 0.5).toFixed(2) + ';' +
        '--h:' + (sec.offsetHeight + 40) + 'px;';
      sec.prepend(s);
    }
  });
})();
