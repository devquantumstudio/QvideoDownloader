  // ======= CONFIG (Edit these values) =======
  const RELEASE = {
    files: {
      windows: { url: 'downloads/QvideoDownloader.zip' },
      android: { url: 'downloads/QvideoDownloader.apk' }
    }
  };

  // ======= Helpers =======
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function detectOS() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(ua)) return 'android';
    if (/windows/i.test(ua)) return 'windows';
    if (/mac os x|macintosh|darwin/i.test(ua)) return 'macos';
    if (/linux|x11/i.test(ua)) return 'linux';
    return null;
  }

  function hydrate() {
    // Buttons
    const map = { windows: '#btn-windows', macos: '#btn-macos', linux: '#btn-linux', android: '#btn-android' };

    for (const os in map) {
      const btn = $(map[os]);
      const file = RELEASE.files[os];
      if (btn && file && file.url) {
        btn.href = file.url; btn.setAttribute('download', ''); btn.removeAttribute('aria-disabled');
      } else if (btn) {
        btn.href = '#'; btn.setAttribute('aria-disabled', 'true'); btn.title = 'Not available yet';
      }
    }

    // Recommend button based on OS
    const os = detectOS();
    if (os) {
      $$('.btn.recommended').forEach(b => b.classList.remove('recommended'));
      const target = $(map[os]);
      if (target) target.classList.add('recommended');
    }

    // Year
    const year = $('#year'); if (year) year.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', hydrate);

  // Smooth scroll for internal anchors (with scroll-margin in CSS)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState({}, '', id);
    }
  });

// Mobile nav toggle
const btn = document.getElementById('menuBtn');
btn?.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  btn.setAttribute('aria-expanded', String(open));
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.body.classList.remove('nav-open');
    btn?.setAttribute('aria-expanded', 'false');
  }
});