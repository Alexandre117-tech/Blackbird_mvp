/* BlackBird Mídia — comportamento das páginas internas */

/* >>> EDITE AQUI os dados reais de contacto <<< */
const CONTACTO = {
  email: 'contacto@blackbirdmidia.co.mz',   // substitua pelo email real
  whatsapp: '258840000000'                   // número com indicativo, sem + nem espaços
};

document.addEventListener('DOMContentLoaded', () => {
  /* Menu móvel */
  const menuBtn = document.getElementById('menuBtn');
  const menuList = document.getElementById('menuList');
  if (menuBtn && menuList) {
    menuBtn.addEventListener('click', () => {
      const open = menuList.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
  }

  /* Cabeçalho inteligente */
  const nav = document.getElementById('nav');
  let last = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('solid', y > 60);
    if (y > 180 && y > last) { nav.classList.add('nav-hidden'); menuList.classList.remove('open'); }
    else if (y < last) nav.classList.remove('nav-hidden');
    last = y;
  }, { passive: true });

  /* Revelação suave */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  /* Âncoras: destaca a secção visível */
  const links = [...document.querySelectorAll('.anchors a')];
  if (links.length) {
    const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('on'));
        const a = map.get(e.target.id);
        if (a) { a.classList.add('on'); a.scrollIntoView({ block: 'nearest', inline: 'center' }); }
      }
    }), { rootMargin: '-30% 0px -60% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* Formulário de contacto */
  const form = document.getElementById('contactForm');
  if (form) {
    const status = document.getElementById('formStatus');
    const rules = {
      nome: v => v.trim().length >= 2 || 'Indique o seu nome.',
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Indique um email válido.',
      servico: v => v !== '' || 'Escolha um serviço.',
      mensagem: v => v.trim().length >= 10 || 'Descreva o projeto em pelo menos 10 caracteres.'
    };
    const validate = () => {
      let ok = true;
      for (const [name, rule] of Object.entries(rules)) {
        const f = form.elements[name];
        const res = rule(f.value);
        const err = document.getElementById('err-' + name);
        f.setAttribute('aria-invalid', res !== true);
        err.textContent = res === true ? '' : res;
        if (res !== true) ok = false;
      }
      return ok;
    };
    const compose = () => {
      const d = Object.fromEntries(new FormData(form));
      return `Olá BlackBird Mídia,\n\n${d.mensagem}\n\n— ${d.nome}\nEmail: ${d.email}${d.telefone ? '\nTelefone: ' + d.telefone : ''}\nServiço: ${d.servico}${d.prazo ? '\nPrazo desejado: ' + d.prazo : ''}`;
    };
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validate()) { status.textContent = 'Corrija os campos assinalados.'; return; }
      const d = Object.fromEntries(new FormData(form));
      const subject = encodeURIComponent('Pedido de proposta — ' + d.servico);
      location.href = `mailto:${CONTACTO.email}?subject=${subject}&body=${encodeURIComponent(compose())}`;
      status.textContent = 'A abrir a sua aplicação de email com a mensagem pronta a enviar.';
    });
    document.getElementById('sendWhats').addEventListener('click', () => {
      if (!validate()) { status.textContent = 'Corrija os campos assinalados.'; return; }
      window.open(`https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(compose())}`, '_blank', 'noopener');
      status.textContent = 'A abrir o WhatsApp com a sua mensagem.';
    });
    form.addEventListener('input', e => {
      if (e.target.getAttribute('aria-invalid') === 'true') validate();
    });
  }

  /* Partículas de fundo (igual à página inicial) */
  const canvas = document.getElementById('snow');
  if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let w, h, flakes = [], raf;
  const rand = (a, b) => a + Math.random() * (b - a);
  const make = init => ({ x: rand(0, w), y: init ? rand(0, h) : rand(-20, -5), r: rand(.8, 2.6), v: rand(.3, 1.1) * .1, d: rand(-.25, .25), s: rand(.4, 1.4), p: rand(0, 6.28), a: rand(.25, .8) });
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    flakes = Array.from({ length: Math.min(10, Math.round(w * h * .00006)) }, () => make(true));
  };
  const tick = t => {
    ctx.clearRect(0, 0, w, h);
    for (const f of flakes) {
      f.y += f.v; f.x += f.d + Math.sin(t / 1000 + f.p) * .15 * f.s;
      if (f.y > h + 10 || f.x < -10 || f.x > w + 10) Object.assign(f, make(false));
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283);
      ctx.fillStyle = `rgba(255,255,255,${f.a})`; ctx.fill();
    }
    raf = requestAnimationFrame(tick);
  };
  document.addEventListener('visibilitychange', () => document.hidden ? cancelAnimationFrame(raf) : (raf = requestAnimationFrame(tick)));
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
  resize(); raf = requestAnimationFrame(tick);
});