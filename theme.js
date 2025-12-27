(function () {
  const STORAGE_KEY = 'portfolio-theme';

  function applyTheme(mode) {
    const isLight = mode === 'light';
    document.body.classList.toggle('light-mode', isLight);
    document.documentElement.setAttribute('data-theme', mode);

    const input = document.querySelector('.theme-switch input');
    if (input) {
      input.checked = isLight;
    }

    const label = document.querySelector('.theme-toggle .toggle-label');
    if (label) {
      label.textContent = isLight ? 'Light' : 'Dark';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const initial = saved || (prefersLight ? 'light' : 'dark');
    applyTheme(initial);

    const input = document.querySelector('.theme-switch input');
    if (input) {
      input.addEventListener('change', () => {
        const mode = input.checked ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, mode);
        applyTheme(mode);
      });
    }

    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: light)');
      if (mq.addEventListener) {
        mq.addEventListener('change', (e) => {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (!stored) {
            applyTheme(e.matches ? 'light' : 'dark');
          }
        });
      }
    }
  });
})();
