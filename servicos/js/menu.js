/* BlackBird Mídia — menu lateral (hambúrguer)
   Uso: <script src="menu.js" defer></script> no fim do <body> de cada página.
   Substitui o toggle do menu que existe no index.html e no interno.js. */
(() => {
  const btn  = document.getElementById('menuBtn');
  const list = document.getElementById('menuList');
  const nav  = document.getElementById('nav');
  if (!btn || !list) return;

  const root = document.documentElement;
  const mobile = window.matchMedia('(max-width: 760px)');

  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  const isOpen = () => list.classList.contains('open');

  function setOpen(open) {
    list.classList.toggle('open', open);
    overlay.classList.toggle('show', open);
    root.classList.toggle('menu-open', open);
    if (nav) {
      nav.classList.toggle('menu-open', open);
      if (open) nav.classList.remove('nav-hidden');
    }
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    if (open) {
      const first = list.querySelector('a');
      if (first) first.focus({ preventScroll: true });
    }
  }

  btn.setAttribute('aria-label', 'Abrir menu');

  // Fase de captura: impede que o toggle antigo (index.html / interno.js) abra e feche de seguida
  document.addEventListener('click', (e) => {
    if (e.target.closest('#menuBtn')) {
      e.stopImmediatePropagation();
      setOpen(!isOpen());
    }
  }, true);

  overlay.addEventListener('click', () => setOpen(false));

  // Fecha ao escolher uma ligação (importante nas âncoras da mesma página)
  list.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') {
      setOpen(false);
      btn.focus();
      return;
    }
    if (e.key === 'Tab') {                       // mantém o foco dentro do menu
      const items = [btn, ...list.querySelectorAll('a')];
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Ao passar para desktop, fecha e limpa o estado
  mobile.addEventListener('change', (e) => { if (!e.matches) setOpen(false); });
})();