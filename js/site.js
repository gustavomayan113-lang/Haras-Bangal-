/* ===== EDITE AQUI: dados do site ===== */
const NUMERO = "5574999999999";        // país + DDD + número, só dígitos
const NUMERO_BONITO = "(74) 99999-9999";
const INSTAGRAM = "https://instagram.com/SEU_PERFIL";   // TROCAR
const INSTAGRAM_PERFIL = "@harasbangalo";               // TROCAR

/* status: "disponivel" | "reservado" | "vendido" (vendido vai para "Já passaram pelo Bangalô")
   destaque: true coloca o selo "Destaque do Haras" no card
   fotos: ["img/cavalo-castanho.jpg", ...] a primeira é a capa
   video: "video/trovao.mp4" (toca no site) ou link do YouTube/Instagram (abre em outra aba)
   Campo vazio ("") não aparece na ficha. */
const CAVALOS = [
  { nome:"Trovão do Bangalô", status:"disponivel", destaque:true, sexo:"Garanhão", idade:"5 anos", pelagem:"Castanho", marcha:"Picada", altura:"1,52 m", registro:"ABCCMM 0000001", pai:"Exemplo do Bangalô", mae:"Castanha do Bangalô", temperamento:"Manso", uso:"Trilha e cavalgada", preco:"R$ 00.000", fotos:["img/cavalo-castanho.jpg"], video:"" },
  { nome:"Estrela do Bangalô", status:"disponivel", destaque:false, sexo:"Égua", idade:"4 anos", pelagem:"Tordilha", marcha:"Batida", altura:"1,48 m", registro:"ABCCMM 0000002", pai:"Exemplo do Haras", mae:"Tordilha do Bangalô", temperamento:"Dócil", uso:"Lazer e passeio", preco:"R$ 00.000", fotos:["img/cavalo-1.jpg"], video:"" },
  { nome:"Saracura do Bangalô", status:"reservado", destaque:false, sexo:"Égua", idade:"3 anos", pelagem:"Baia", marcha:"Picada", altura:"1,46 m", registro:"ABCCMM 0000000", pai:"Exemplo do Bangalô", mae:"Exemplo do Haras", temperamento:"Dócil", uso:"Cavalgada e lazer", preco:"Consulte", fotos:["img/cavalo-baia.jpg"], video:"" },
  { nome:"Valente do Bangalô", status:"disponivel", destaque:false, sexo:"Castrado", idade:"6 anos", pelagem:"Alazão", marcha:"Batida", altura:"1,55 m", registro:"ABCCMM 0000003", pai:"Exemplo do Bangalô", mae:"Alazã do Haras", temperamento:"Calmo", uso:"Lida com gado", preco:"R$ 00.000", fotos:["img/cavalo-alazao.jpg"], video:"" },
  { nome:"Relâmpago do Bangalô", status:"vendido", destaque:false, sexo:"Garanhão", idade:"7 anos", pelagem:"Preto", marcha:"Picada", fotos:["img/image.jpg"], video:"" }
];
const DEPOIMENTOS = [
  { texto:"Comprei o Trovão para nossas cavalgadas e não troco por nada: a marcha é tão macia que meu pai, que não montava há anos, voltou a cavalagar.", autor:"Carlos M., Vitória da Conquista-BA" },
  { texto:"Vim de longe buscar o Valente e valeu cada quilômetro. O atendimento pelo zap foi rápido e o cavalo chegou bem demais.", autor:"Ana P., Guanambi-BA" },
  { texto:"Dá pra ver a marcha do cavalo no vídeo antes de comprar. Isso passa confiança, diferente de comprar no escuro.", autor:"José R., Caculé-BA" }
];
const ASSUNTOS = [ "Quero marcar uma visita", "Quero ver mais fotos e vídeos", "Quero saber os preços", "Quero ajuda com o transporte" ];
const INSTA_POSTS = ["img/cavalo-insta2.jpg","img/cavalo-insta.jpg","img/cavalo-insta3.jpg"];
/* ======================= */

const $ = (id) => document.getElementById(id);
const link = (msg) => `https://wa.me/${NUMERO}?text=${encodeURIComponent(msg)}`;
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ROTULO = { disponivel:'Disponível', reservado:'Reservado', vendido:'Vendido' };
const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
const VAZIO = '<span class="vazio"><svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"><path d="M45 118 L100 52 L155 118"/><path d="M72 118 L100 86 L128 118"/><path d="M62 118 V150 M138 118 V150"/></svg>Foto em breve</span>';

/* ---------- vitrine ---------- */
function card(c, i) {
  const vendido = c.status === 'vendido';
  const capa = c.fotos && c.fotos[0];
  const ficha = [['Registro',c.registro],['Pai',c.pai],['Mãe',c.mae],['Altura',c.altura],['Temperamento',c.temperamento],['Indicado para',c.uso]].filter(f => f[1]);
  const msg = `Olá! Vi o ${c.nome} no site do Haras Bangalô e tenho interesse. Ainda está disponível?`;
  return `<article class="card">
    <button class="foto" data-abrir="${i}" aria-label="Ver fotos e vídeo de ${esc(c.nome)}">
      ${capa ? `<img src="${esc(capa)}" alt="${esc(c.nome)}" loading="lazy">` : VAZIO}
      <span class="selo ${c.status}">${ROTULO[c.status] || ''}</span>
      ${c.video ? '<span class="play" aria-hidden="true">▶</span>' : ''}
      <strong class="nome">${esc(c.nome)}</strong>
    </button>
    <div class="info">
      <p class="det">${esc(c.sexo)} · ${esc(c.idade)} · ${esc(c.pelagem)}</p>
      <p class="tag-marcha">Marcha ${esc(c.marcha).toLowerCase()}</p>
      ${!vendido && c.destaque ? '<p class="destaque-tag">★ Destaque do Haras</p>' : ''}
      ${vendido ? '' : `<p class="preco">${esc(c.preco)}</p>`}
      ${!vendido && ficha.length ? `<details class="ficha"><summary>Ver ficha completa</summary><dl>${ficha.map(f => `<dt>${f[0]}</dt><dd>${esc(f[1])}</dd>`).join('')}</dl></details>` : ''}
      ${vendido ? '' : `<div class="acoes">
        <button class="btn fotos" data-abrir="${i}">Ver fotos</button>
        <a class="btn interesse" href="${link(msg)}" target="_blank" rel="noopener">Tenho interesse</a>
      </div>`}
      ${!vendido && c.video ? `<button class="btn video" data-video="${i}">▶ Ver vídeo da marcha</button>` : ''}
    </div>
  </article>`;
}
let filtro = 'Todos';
function desenhar() {
  const todos = CAVALOS.map((c, i) => [c, i]);
  const venda = todos.filter(([c]) => c.status !== 'vendido');
  const vendidos = todos.filter(([c]) => c.status === 'vendido');
  const sexos = [...new Set(venda.map(([c]) => c.sexo))];
  $('filtros').hidden = venda.length <= 6;
  $('filtros').innerHTML = ['Todos', ...sexos].map(x => `<button class="chip${x === filtro ? ' on' : ''}" data-f="${esc(x)}">${esc(x)}</button>`).join('');
  $('grade').innerHTML = venda.filter(([c]) => filtro === 'Todos' || c.sexo === filtro).map(([c, i]) => card(c, i)).join('');
  $('gradeVendidos').innerHTML = vendidos.map(([c, i]) => card(c, i)).join('');
  $('depo').innerHTML = DEPOIMENTOS.map(d => `<blockquote><p>${esc(d.texto)}</p><cite>${esc(d.autor)}</cite></blockquote>`).join('');
  $('vendidos').hidden = !vendidos.length && !DEPOIMENTOS.length;
  $('gradeInsta').innerHTML = INSTA_POSTS.map(src => `
    <a class="post" href="${esc(INSTAGRAM)}" target="_blank" rel="noopener" aria-label="Post do Instagram do Haras Bangalô">
      <img src="${esc(src)}" alt="" loading="lazy" onerror="this.remove()">
      <span class="fallback"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>${esc(INSTAGRAM_PERFIL)}</span>
    </a>`).join('');
}
$('ant').onclick = () => $('grade').scrollBy({ left: -330, behavior: 'smooth' });
$('prox').onclick = () => $('grade').scrollBy({ left: 330, behavior: 'smooth' });

/* ---------- galeria ---------- */
const dlg = $('galeria');
function itensDe(c) {
  const itens = (c.fotos || []).map(src => ({ type:'foto', src }));
  if (c.video) itens.push({ type: /\.(mp4|webm)$/i.test(c.video) ? 'video' : 'link', src: c.video });
  return itens;
}
function mostrar(m, botoes, k) {
  $('palco').innerHTML = m.type === 'video' ? `<video src="${esc(m.src)}" controls autoplay playsinline></video>`
    : m.type === 'link' ? `<a class="btn cheio" href="${esc(m.src)}" target="_blank" rel="noopener">Assistir ao vídeo</a>`
    : `<img src="${esc(m.src)}" alt="">`;
  botoes.forEach((b, n) => b.classList.toggle('on', n === k));
}
function abrir(i, irVideo = false) {
  const c = CAVALOS[i];
  const itens = itensDe(c);
  if (!itens.length) return;
  if (irVideo) {
    const externo = itens.find(m => m.type === 'link');
    if (externo) { window.open(externo.src, '_blank', 'noopener'); return; }
  }
  const k = irVideo ? Math.max(0, itens.findIndex(m => m.type === 'video')) : 0;
  $('mini').innerHTML = itens.map((m, n) => `<button aria-label="Mídia ${n + 1}">${m.type === 'foto' ? `<img src="${esc(m.src)}" alt="">` : '▶'}</button>`).join('');
  const botoes = [...$('mini').children];
  botoes.forEach((b, n) => b.onclick = () => mostrar(itens[n], botoes, n));
  mostrar(itens[k], botoes, k);
  dlg.showModal();
}
$('fechar').onclick = () => dlg.close();
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener('close', () => { $('palco').innerHTML = ''; });
document.addEventListener('click', e => {
  const f = e.target.closest('[data-f]');
  if (f) { filtro = f.dataset.f; desenhar(); return; }
  const v = e.target.closest('[data-video]');
  if (v) { abrir(+v.dataset.video, true); return; }
  const a = e.target.closest('[data-abrir]');
  if (a) abrir(+a.dataset.abrir);
});

/* ---------- marcha interativa ---------- */
const MARCHAS = {
  picada: { seq:[['TE'],['DE'],['TD'],['DD']],
    titulo:'Marcha picada',
    txt:'Quatro batidas, uma pata de cada vez, sempre pelo mesmo lado: traseira esquerda, dianteira esquerda, traseira direita, dianteira direita. Os apoios laterais dominam — daí o nome "picada". As passadas são curtas e rápidas, e o corpo quase não sobe nem desce.',
    som:'Como soa: tu-ca · tu-ca · tu-ca — quatro tempos bem separados.',
    res:'Na prática: é a marcha mais macia. Ideal para cavalgadas longas e para quem está começando.' },
  batida: { seq:[['TE'],['DD'],['TD'],['DE']],
    titulo:'Marcha batida',
    txt:'Também são quatro batidas, uma pata por vez, só que em diagonal: traseira esquerda, dianteira direita, traseira direita, dianteira esquerda. Os apoios diagonais duram mais, o ritmo é cadenciado e as passadas são maiores.',
    som:'Como soa: pá-pá · pá-pá — os cascos em diagonal soam quase juntos.',
    res:'Na prática: andar firme, veloz e confortável. Ótima para trilhas, lida com gado e equitação.' },
  trote: { seq:[['TE','DD'],['TD','DE']],
    titulo:'Trote (para comparar)',
    txt:'É o andar de quase todo cavalo: duas patas em diagonal tocam juntas, depois as outras duas. São só duas batidas por passada — e entre uma e outra o corpo fica um instante no ar. É esse "pulinho" que sacode quem monta.',
    som:'Como soa: pá-pá... pá-pá... — só dois tempos.',
    res:'Na prática: o solavanco que cansa. O Mangalarga Marchador não troteja: ele marcha.' }
};
const PATAS = ['TE','DE','TD','DD'];
let marcha = 'picada', passo = 0, rodando = !reduz, timer = null, som = false, ac = null;
function tum(forte) {
  if (!ac) return;
  const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime;
  o.type = 'sine'; o.frequency.setValueAtTime(forte ? 150 : 115, t); o.frequency.exponentialRampToValueAtTime(55, t + .14);
  g.gain.setValueAtTime(forte ? .9 : .6, t); g.gain.exponentialRampToValueAtTime(.001, t + .18);
  o.connect(g).connect(ac.destination); o.start(t); o.stop(t + .2);
}
function montar() {
  const m = MARCHAS[marcha], seq = m.seq;
  PATAS.forEach(p => { const n = seq.findIndex(g => g.includes(p)); $('n-' + p).textContent = n + 1; });
  $('tempos').innerHTML = seq.map(() => '<i></i>').join('');
  $('titulo').textContent = m.titulo;
  $('explica').textContent = m.txt;
  $('comoSom').textContent = m.som;
  $('resumo').textContent = m.res;
}
function tocar() {
  const seq = MARCHAS[marcha].seq, grupo = seq[passo];
  PATAS.forEach(p => { const on = grupo.includes(p); $('p-' + p).classList.toggle('on', on); $('n-' + p).classList.toggle('on', on); });
  [...$('tempos').children].forEach((d, n) => d.classList.toggle('on', n === passo));
  if (som) tum(passo === 0);
  passo = (passo + 1) % seq.length;
}
function ritmo() { clearInterval(timer); if (rodando) timer = setInterval(tocar, marcha === 'trote' ? 640 : marcha === 'batida' ? 580 : 520); $('pausa').textContent = rodando ? 'Pausar' : 'Tocar'; }
document.querySelectorAll('.troca button').forEach(b => b.onclick = () => {
  marcha = b.dataset.m; passo = 0;
  document.querySelectorAll('.troca button').forEach(x => x.classList.toggle('on', x === b));
  montar(); tocar(); ritmo();
});
$('pausa').onclick = () => { rodando = !rodando; if (!rodando) clearInterval(timer); else tocar(); ritmo(); };
$('som').onclick = () => {
  som = !som;
  if (som && !ac) ac = new (window.AudioContext || window.webkitAudioContext)();
  $('som').textContent = som ? 'Desligar o som' : 'Ouvir o ritmo';
};
montar(); tocar(); ritmo();

/* ---------- contato ---------- */
$('rapidas').innerHTML = ASSUNTOS.map(a => `<a href="${link('Olá! ' + a + '. Vim pelo site do Haras Bangalô.')}" target="_blank" rel="noopener">${esc(a)}</a>`).join('');
const geral = link("Olá! Vim pelo site do Haras Bangalô e gostaria de mais informações.");
["zapHero","zapContato","zapFlutuante"].forEach(id => { const el = $(id); el.href = geral; el.target = "_blank"; el.rel = "noopener"; });
$('insta').href = INSTAGRAM; $('insta').target = "_blank"; $('insta').rel = "noopener";
$('instaBtn').href = INSTAGRAM; $('instaBtn').target = "_blank"; $('instaBtn').rel = "noopener";
$('numTexto').textContent = NUMERO_BONITO;
$('ano').textContent = new Date().getFullYear();

/* ---------- topo e aparecer ao rolar ---------- */
const topo = $('topo');
function aoRolar() { topo.classList.toggle('solido', scrollY > 50); }
addEventListener('scroll', aoRolar, { passive: true }); aoRolar();
if ('IntersectionObserver' in window && !reduz) {
  const obs = new IntersectionObserver(it => it.forEach(i => { if (i.isIntersecting) { i.target.classList.add('vis'); obs.unobserve(i.target); } }), { threshold: .15 });
  document.querySelectorAll('.rev').forEach(el => obs.observe(el));
} else document.querySelectorAll('.rev').forEach(el => el.classList.add('vis'));

desenhar();
