(function(){
var nav=document.getElementById('nav'),list=document.getElementById('menuList'),btn=document.getElementById('menuBtn');
document.getElementById('yr').textContent=new Date().getFullYear();

function sc(){nav.classList.toggle('solid',window.scrollY>40)}window.addEventListener('scroll',sc,{passive:true});sc();

btn.addEventListener('click',function(){var o=list.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
var f=document.getElementById('form');
if(f)f.addEventListener('submit',function(e){e.preventDefault();var n=document.getElementById('note');
 if(!f.checkValidity()){n.textContent='Preencha o nome, um e-mail válido e a mensagem.';return}
 var d=new FormData(f),s=encodeURIComponent('Pedido de proposta: '+d.get('servico')),
 b=encodeURIComponent('Nome: '+d.get('nome')+'\nE-mail: '+d.get('email')+'\n\n'+d.get('msg'));
 n.textContent='A abrir o seu programa de e-mail…';location.href='mailto:executive@blackbird.com?subject='+s+'&body='+b});
var eg=document.getElementById('eagle');
if(eg&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&matchMedia('(pointer:fine)').matches){
 var tx=0,ty=0,cx=0,cy=0,run=false;
 addEventListener('mousemove',function(e){tx=(e.clientX/innerWidth-.5)*-22;ty=(e.clientY/innerHeight-.5)*-14;if(!run){run=true;requestAnimationFrame(tick)}});
 function tick(){cx+=(tx-cx)*.06;cy+=(ty-cy)*.06;eg.style.translate=cx.toFixed(2)+'px '+cy.toFixed(2)+'px';
  if(Math.abs(tx-cx)>.05||Math.abs(ty-cy)>.05)requestAnimationFrame(tick);else run=false}}
})();
