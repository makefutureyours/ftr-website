// FTR Future Rise Enterprise — site behaviour
// 1) Fade sections in as you scroll  2) "Copy" button for the access code  3) YouTube cards

(function () {
  // 1. Scroll reveal
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add('is-visible'));
  }

  // 2. Copy access code
  const copyBtn = document.getElementById('copy-code-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = document.getElementById('access-code').textContent.trim();
      navigator.clipboard.writeText(code).then(() => {
        const original = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = original; }, 1500);
      }).catch(() => {});
    });
  }

  // 3. YouTube cards
  // In index.html, put a YouTube link in data-youtube="..." on a .video-card.
  // Until a real link is there, the card stays as a placeholder.
  function youtubeId(url) {
    const m = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  document.querySelectorAll('.video-card[data-youtube]').forEach(card => {
    const id = youtubeId(card.dataset.youtube);
    if (!id) return; // still a placeholder

    const title = card.querySelector('h3').textContent.trim();
    const thumb = card.querySelector('.video-thumb');
    const placeholder = card.querySelector('.vplaceholder');
    if (placeholder) placeholder.remove();

    // Show the video's thumbnail; only load YouTube itself when someone presses play
    const img = document.createElement('img');
    img.src = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
    img.alt = '';
    img.loading = 'lazy';
    img.width = 480;
    img.height = 360;

    const play = document.createElement('button');
    play.type = 'button';
    play.className = 'video-play';
    play.setAttribute('aria-label', 'Play video: ' + title);
    play.appendChild(thumb.querySelector('svg'));

    thumb.prepend(img);
    thumb.appendChild(play);

    play.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      thumb.replaceChildren(iframe);
      iframe.focus();
    });
  });
})();
