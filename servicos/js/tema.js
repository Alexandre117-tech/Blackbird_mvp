/* =====================================================================
   BLACKBIRD MÍDIA — MODO ESCURO / MODO CLARO (fundo branco)
   Um único ficheiro para TODAS as páginas.

   COMO USAR
   1. Guarde este ficheiro como:  servicos/js/tema.js
   2. Em CADA página (index, sobre, servicos, processo, projetos,
      contacto), cole esta linha dentro do <head>, de preferência
      logo a seguir a <meta charset>:

        <script src="servicos/js/tema.js"></script>

      (sem "defer" e sem "async", para o tema ser aplicado antes de a
       página aparecer e não "piscar").

   O QUE FAZ
   - O modo claro SÓ muda as cores dentro de <main>.
   - Cabeçalho, body, neve e botão lua/sol ficam sempre iguais.
   - Dentro do <main>, o hero e o footer também ficam sempre escuros
     (o footer do index está dentro do <main>).
   - Guarda a escolha no browser (localStorage) e sincroniza entre
     separadores e páginas.
   - O padrão continua a ser o modo escuro (o design original).
   ===================================================================== */
(function () {
  'use strict';

  var KEY = 'bb-theme';
  var root = document.documentElement;

  /* prefixo de todas as regras do modo claro: só dentro do <main> */
  var M = 'html[data-theme="light"] main';

  /* variáveis do tema escuro original (usadas para repor hero e footer) */
  var DARK =
    'color-scheme:dark;' +
    '--bg:#0b0b0c;--bg-2:#111113;--bg-3:#161618;--panel:#121214;--line:#2a2a2d;' +
    '--ash:#9a9a9e;--silver:#cfcfd2;--text:#dcdcdf;--white:#ffffff;' +
    '--muted:rgba(255,255,255,.68);--danger:#e3a6a6;';

  /* ---------------------------------------------------------------
     1) CSS DO MODO CLARO
     --------------------------------------------------------------- */
  var CSS = [
    /* ===== Variáveis: só dentro do <main> ===== */
    M + '{',
    '  color-scheme:light;',
    '  --bg:#ffffff;',
    '  --bg-2:#f5f5f7;',
    '  --bg-3:#f1f1f3;',
    '  --muted:rgba(0,0,0,.66);',
    '  --danger:#b04545;',
    '  --panel:#f3f3f5;',
    '  --line:#dedee2;',
    '  --ash:#6a6a70;',
    '  --silver:#1d1d20;',   /* títulos, destaques, botões principais */
    '  --text:#38383c;',
    '  --white:#000000;',    /* hover e palavras "acesas" */
    '  background:var(--bg);color:var(--text)}',

    /* ===== HERO e FOOTER: ficam sempre escuros ===== */
    M + ' .hero,',
    M + ' .services-hero,',
    M + ' .process-hero,',
    M + ' .portfolio-hero,',
    M + ' footer{',
    '  ' + DARK,
    '  color:var(--text)}',
    M + ' footer{background:#0b0b0c}',

    /* ===== Chips (hero e footer mantêm o chip escuro) ===== */
    M + ' .chip{background:#ececef;color:#3a3a3e}',
    M + ' .hero .chip,',
    M + ' .services-hero .chip,',
    M + ' .process-hero .chip,',
    M + ' .portfolio-hero .chip,',
    M + ' footer .chip{background:#262629;color:#cfcfd2}',

    /* ===== Texto que acende palavra a palavra ===== */
    M + ' .reveal-title .word,',
    M + ' .reveal .word{color:rgba(0,0,0,.16)}',
    M + ' .reveal-title .word.is-lit,',
    M + ' .reveal .word.is-lit{color:var(--white)}',

    /* ===== Botões ===== */
    M + ' .btn-solid,',
    M + ' .btn-pill{background:#111113;color:#fff}',
    M + ' .btn-solid:hover,',
    M + ' .btn-pill:hover{background:#000;color:#fff}',
    M + ' .btn-line:hover{background:rgba(0,0,0,.06)}',

    /* botões dentro do hero: iguais ao original */
    M + ' .hero .btn-solid,',
    M + ' .services-hero .btn-solid,',
    M + ' .process-hero .btn-solid,',
    M + ' .portfolio-hero .btn-solid{background:#cfcfd2;color:#0b0b0c}',
    M + ' .hero .btn-solid:hover,',
    M + ' .services-hero .btn-solid:hover,',
    M + ' .process-hero .btn-solid:hover,',
    M + ' .portfolio-hero .btn-solid:hover{background:#fff;color:#0b0b0c}',
    M + ' .hero .btn-line:hover,',
    M + ' .services-hero .btn-line:hover,',
    M + ' .process-hero .btn-line:hover,',
    M + ' .portfolio-hero .btn-line:hover{background:rgba(255,255,255,.08)}',

    /* ===== INDEX: cartões com imagem (sobreposição escura -> texto claro) ===== */
    M + ' .service-card{background:#e7e7ea;box-shadow:0 10px 30px rgba(0,0,0,.12)}',
    M + ' .service-overlay,',
    M + ' .service-overlay h3,',
    M + ' .service-overlay p,',
    M + ' .service-number{color:#f2f2f3}',

    /* ===== INDEX: princípios ===== */
    M + ' .philosophy-section{background:#f1f1f3 !important}',
    M + ' .phil-watermark{color:rgba(0,0,0,.05)}',
    M + ' .phil-item{border-bottom-color:rgba(0,0,0,.1)}',
    M + ' .phil-item:first-child{border-top-color:rgba(0,0,0,.1)}',

    /* ===== INDEX: cartões, projetos, CTA ===== */
    M + ' .card{background:rgba(0,0,0,.02)}',
    M + ' .card:hover{background:rgba(0,0,0,.05)}',
    M + ' .work a{background:linear-gradient(160deg,#ffffff,#ececef) center/cover}',
    M + ' .cta-banner{background:linear-gradient(135deg,rgba(0,0,0,.03),rgba(0,0,0,.01));box-shadow:0 20px 50px rgba(0,0,0,.08)}',

    /* ===== PROCESSO ===== */
    M + ' .section-heading p,',
    M + ' .faq-heading > p{color:rgba(0,0,0,.62)}',
    M + ' .process-step:hover{background:rgba(0,0,0,.035)}',
    M + ' .step-description{color:rgba(0,0,0,.5)}',
    M + ' .stage-intro{color:rgba(0,0,0,.66)}',
    M + ' .stage-information{background:rgba(0,0,0,.025)}',
    M + ' .stage-information .ticks li{color:rgba(0,0,0,.65)}',
    M + ' .stage-result p{color:rgba(0,0,0,.85)}',
    M + ' .commitment-card{background:rgba(0,0,0,.02)}',
    M + ' .commitment-card p{color:rgba(0,0,0,.6)}',
    M + ' .process-faq .faq details p{color:rgba(0,0,0,.62)}',
    M + ' .process-cta::before{background:radial-gradient(circle,rgba(0,0,0,.06),transparent 68%)}',
    M + ' .process-cta p{color:rgba(0,0,0,.65)}',

    /* ===== PROJETOS ===== */
    M + ' .portfolio-filters .filter{border-color:rgba(0,0,0,.16)}',
    M + ' .portfolio-filters .filter:hover,',
    M + ' .portfolio-filters .filter.active{background:#111113;color:#fff;border-color:#111113}',
    M + ' .portfolio-category{border-top-color:rgba(0,0,0,.12)}',
    M + ' .portfolio-cta{background:#f3f3f5}',
    M + ' .portfolio-cta::before{background:radial-gradient(ellipse at 80% 50%,rgba(0,0,0,.06),transparent 55%)}',

    /* ===== SERVIÇOS ===== */
    M + ' .service-detail.alt{background:#f5f5f7}',
    M + ' .services-method{background:#f1f1f3}',
    M + ' .services-cta-inner{background:radial-gradient(ellipse at 90% 10%,rgba(0,0,0,.06),transparent 50%),#f3f3f5}',
    M + ' .overview-card p{color:#55555a}',
    M + ' .service-content .service-lead{color:#3a3a3e}',

    /* ===== interno.css ===== */
    M + ' .phead::before{background:radial-gradient(ellipse 60% 90% at 85% 0%,rgba(0,0,0,.05),transparent 70%)}',
    M + ' .anchors{background:rgba(255,255,255,.9)}',
    M + ' .anchors a:hover,',
    M + ' .anchors a.on{background:rgba(0,0,0,.05)}',
    M + ' .tl .n{color:rgba(0,0,0,.12)}',
    M + ' .vm > div{background:rgba(0,0,0,.02)}',
    M + ' .btn.ghost:hover{background:rgba(0,0,0,.06)}',
    M + ' .form select option,',
    M + ' .form select optgroup{background:#fff;color:var(--text)}',

    /* ===== Botão de alternar tema (fica igual nos dois modos) ===== */
    '.bb-theme-toggle{',
    '  position:fixed;right:max(16px,env(safe-area-inset-right,0px));',
    '  bottom:max(16px,env(safe-area-inset-bottom,0px));z-index:9999;',
    '  width:46px;height:46px;display:grid;place-items:center;padding:0;',
    '  border-radius:50%;border:1px solid var(--line,#262628);',
    '  background:var(--panel,#121214);color:var(--silver,#c9c9cc);',
    '  cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.25);',
    '  transition:transform .25s,border-color .25s}',
    '.bb-theme-toggle:hover{transform:translateY(-2px);border-color:var(--silver,#c9c9cc)}',
    '.bb-theme-toggle:focus-visible{outline:2px solid var(--silver,#c9c9cc);outline-offset:3px}',
    '.bb-theme-toggle svg{width:20px;height:20px}',
    '.bb-theme-toggle .bb-sun{display:none}',
    'html[data-theme="light"] .bb-theme-toggle .bb-sun{display:block}',
    'html[data-theme="light"] .bb-theme-toggle .bb-moon{display:none}'
  ].join('\n');

  var style = document.createElement('style');
  style.id = 'bb-theme-css';
  style.textContent = CSS;
  (document.head || root).appendChild(style);

  /* volta a pôr o <style> no fim do <head>, para ficar por último na cascata */
  document.addEventListener('DOMContentLoaded', function () {
    if (document.head) document.head.appendChild(style);
  });

  /* ---------------------------------------------------------------
     2) APLICAR / GUARDAR O TEMA
     --------------------------------------------------------------- */
  function read() {
    try { return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark'; }
    catch (e) { return 'dark'; }
  }

  function apply(theme) {
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    /* theme-color e color-scheme do <head> não são alterados:
       só o conteúdo do <main> muda. */
    var btn = document.getElementById('bbThemeToggle');
    if (btn) {
      var label = theme === 'light' ? 'Mudar para modo escuro' : 'Mudar para modo claro';
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    }
  }

  function save(theme) {
    try { localStorage.setItem(KEY, theme); } catch (e) {}
  }

  /* aplica já (antes de a página ser desenhada) */
  apply(read());

  /* ---------------------------------------------------------------
     3) BOTÃO
     --------------------------------------------------------------- */
  function addButton() {
    if (document.getElementById('bbThemeToggle')) return;

    var btn = document.createElement('button');
    btn.id = 'bbThemeToggle';
    btn.type = 'button';
    btn.className = 'bb-theme-toggle';
    btn.innerHTML =
      '<svg class="bb-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
      '<svg class="bb-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      apply(next);
      save(next);
    });

    document.body.appendChild(btn);
    apply(read()); /* atualiza rótulo */
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButton);
  } else {
    addButton();
  }

  /* sincroniza com outros separadores */
  window.addEventListener('storage', function (e) {
    if (e.key === KEY) apply(read());
  });
})();