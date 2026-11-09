/* =====================================================================
   LEO CON LUCAS · LUNA LECTORA — mundo aparte para leer frases en voz alta
   - Papá elige: sílabas de 2 letras (ma me mi…) o de 3 (tra tre tri…),
     la familia de sílabas y lo exigente que es la corrección
   - El niño pulsa el micro (se queda encendido), lee la frase y el juego
     pinta en verde las palabras que reconoce; si la lee entera se apaga solo
   - Al terminar: rojo lo que falta, valora si hay que repetir
   Usa: datos, guardarNino, VOZ, SFX, FX, ir, el, $, pick, ENG, NINO, LICENCIA
   ===================================================================== */
'use strict';

const LUNA_IMG = 'img/luna.png';                  // cuando esté la imagen de la luna, se usa sola
const LUNA_IMG_TEMP = 'img/planetas/planeta09.png'; // mientras tanto, un planeta de los que hay
const LUNA_RONDA = 5;                             // frases por ronda
const LUNA_EXIGE = {
  suave: { n: 'Suave', d: 'Vale con leer bien casi todas las palabras', min: .7, tol: 2, e: '🙂' },
  normal: { n: 'Normal', d: 'Tiene que leer bien la mayoría de palabras', min: .85, tol: 1, e: '💪' },
  exigente: { n: 'Exigente', d: 'Tiene que leer bien todas las palabras', min: 1, tol: 1, e: '🏆' }
};

/* ---------------- estilos ---------------- */
(function () {
  const s = document.createElement('style');
  s.textContent = `
#pLuna { overflow-y: auto; overflow-x: hidden; }
#pLuna .noche { position: fixed; inset: 0; background: radial-gradient(ellipse at 50% 0%, rgba(120,160,255,.35), transparent 60%), rgba(2,4,14,.35); pointer-events: none; z-index: -1; }
.lu-cuerpo { flex: 1; width: 100%; max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 6px 0 24px; }
.lu-luna { width: 120px; height: 120px; object-fit: contain; filter: drop-shadow(0 0 22px rgba(190,215,255,.7)); animation: luFlota 4s ease-in-out infinite; }
@keyframes luFlota { 50% { transform: translateY(-8px) rotate(4deg); } }
.lu-tit { font-family: var(--f-titulo); font-size: 24px; text-align: center; margin: 0; }
.lu-sub { text-align: center; opacity: .8; margin: -6px 0 2px; font-size: 15px; }
.lu-paso { font-size: 13px; font-weight: 700; letter-spacing: 1px; color: var(--verde); text-transform: uppercase; }
.lu-opc { width: 100%; display: grid; gap: 12px; }
.lu-opc.dos { grid-template-columns: 1fr 1fr; }
.lu-card { position: relative; border-radius: 22px; padding: 16px 14px; text-align: left; background: var(--cristal); border: 2px solid var(--borde); box-shadow: 0 8px 22px rgba(0,0,0,.35); display: flex; flex-direction: column; gap: 4px; color: #fff; }
.lu-card:active { transform: scale(.97); }
.lu-card b { font-family: var(--f-titulo); font-weight: 400; font-size: 20px; letter-spacing: .5px; }
.lu-card .ej { font-family: var(--f-lectura); font-size: 22px; font-weight: 700; color: var(--verde); text-shadow: var(--sombra-verde); }
.lu-card small { opacity: .75; font-size: 14px; }
.lu-card .ico { position: absolute; right: 14px; top: 12px; font-size: 30px; }
.lu-card.sel { border-color: var(--verde); box-shadow: 0 0 0 2px var(--verde), 0 0 26px rgba(23,255,95,.35); }
.lu-fams { width: 100%; display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 10px; }
.lu-fam { border-radius: 18px; padding: 12px 6px; background: var(--cristal); border: 2px solid var(--borde); display: flex; flex-direction: column; align-items: center; gap: 2px; color: #fff; min-height: 84px; justify-content: center; }
.lu-fam:active { transform: scale(.95); }
.lu-fam b { font-family: var(--f-lectura); font-size: 21px; line-height: 1.1; text-align: center; color: var(--verde); text-shadow: var(--sombra-verde); }
.lu-fam small { font-family: var(--f-lectura); font-size: 13px; opacity: .8; text-align: center; line-height: 1.2; }
.lu-fam.mezcla b { color: var(--amarillo); text-shadow: 0 0 10px rgba(255,210,63,.6); }
.lu-ultima { width: 100%; }
.lu-ronda { width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px; }
.lu-ronda i { width: 26px; height: 8px; border-radius: 6px; background: rgba(255,255,255,.15); }
.lu-ronda i.ok { background: var(--verde); box-shadow: var(--sombra-verde); }
.lu-ronda i.ya { background: #18e0ff; }
.lu-frase { width: 100%; border-radius: 26px; padding: 22px 18px; background: rgba(5,12,34,.72); border: 2px solid var(--borde); box-shadow: 0 10px 30px rgba(0,0,0,.45); font-family: var(--f-lectura); font-size: clamp(26px, 6.6vw, 40px); line-height: 1.55; text-align: center; font-weight: 700; }
.lu-w { display: inline-block; padding: 0 5px; margin: 2px 1px; border-radius: 12px; transition: color .25s, background .25s, transform .25s; color: #fff; }
.lu-w.ok { color: var(--verde); text-shadow: var(--sombra-verde); background: rgba(23,255,95,.1); animation: luPop .35s; }
.lu-w.mal { color: #ff5d6c; background: rgba(255,77,94,.14); text-decoration: underline wavy rgba(255,93,108,.7); text-underline-offset: 6px; cursor: pointer; }
.lu-w .sil { font-size: .62em; display: block; line-height: 1; color: #ffd23f; letter-spacing: 1px; margin-top: 2px; }
@keyframes luPop { 40% { transform: scale(1.18); } }
.lu-mic-zona { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.lu-mic { width: 128px; height: 128px; border-radius: 50%; font-size: 56px; color: #fff; background: radial-gradient(circle at 35% 30%, #ff8a9a, #e0283a); box-shadow: 0 8px 0 #8f1622, 0 0 30px rgba(255,77,94,.5); position: relative; transition: transform .15s; }
.lu-mic:active { transform: translateY(4px); }
.lu-mic.on { background: radial-gradient(circle at 35% 30%, #7dffa8, #10c94a); box-shadow: 0 4px 0 #087a2c, 0 0 50px rgba(23,255,95,.85); transform: translateY(4px); }
.lu-mic.on::before, .lu-mic.on::after { content: ''; position: absolute; inset: -10px; border-radius: 50%; border: 3px solid rgba(23,255,95,.6); animation: luOnda 1.6s ease-out infinite; }
.lu-mic.on::after { animation-delay: .8s; }
@keyframes luOnda { from { transform: scale(.9); opacity: 1; } to { transform: scale(1.5); opacity: 0; } }
.lu-mic-txt { font-weight: 700; font-size: 16px; min-height: 22px; text-align: center; }
.lu-acc { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
.lu-nota { width: 100%; text-align: center; font-size: 19px; font-weight: 700; min-height: 26px; }
.lu-estrellas { display: flex; gap: 6px; justify-content: center; }
.lu-estrellas img { width: 46px; height: 46px; }
.lu-estrellas img.on { animation: luPop .5s both; }
.lu-fin { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.lu-fin .grande { font-family: var(--f-titulo); font-size: 30px; }
.lu-aviso { border-radius: 18px; padding: 14px; background: rgba(255,77,94,.12); border: 1.5px solid rgba(255,77,94,.5); text-align: center; }
/* mundo en el mapa */
.planeta.luna-mundo { width: 118px; height: 118px; margin: -59px 0 0 -59px; }
.planeta.luna-mundo .pimg { filter: drop-shadow(0 0 22px rgba(190,215,255,.85)); animation: luFlota 4s ease-in-out infinite; }
.planeta.luna-mundo .letra { font-size: 30px; }
.planeta.luna-mundo .nombre { background: linear-gradient(90deg, rgba(24,224,255,.35), rgba(139,92,255,.35)); border: 1px solid rgba(190,215,255,.5); }
.planeta.luna-mundo .luna-tag { position: absolute; top: -16px; font-size: 12px; font-weight: 700; padding: 2px 9px; border-radius: 20px; background: var(--verde); color: #032b12; white-space: nowrap; box-shadow: var(--sombra-verde); }
`;
  document.head.appendChild(s);
})();

/* ---------------- utilidades de texto ---------------- */
const LU = {
  palabras: t => t.split(/\s+/).filter(Boolean),
  limpia: w => w.replace(/[^\p{L}\p{N}]/gu, ''),
  /* normaliza para comparar: minúsculas, sin tildes, sin signos */
  norm: w => ENG.quitaTildes(String(w).toLowerCase()).replace(/[^a-zñü0-9]/g, '').replace(/ü/g, 'u'),
  /* clave fonética: lo que suena igual cuenta igual (b/v, ll/y, c/z/s…) */
  fon(w) {
    return LU.norm(w).replace(/h/g, '').replace(/v/g, 'b').replace(/ll/g, 'y').replace(/qu/g, 'k').replace(/c([aou])/g, 'k$1').replace(/c$/g, 'k')
      .replace(/z/g, 's').replace(/c([ei])/g, 's$1').replace(/gu([ei])/g, 'g$1').replace(/g([ei])/g, 'j$1').replace(/rr/g, 'r').replace(/x/g, 'ks').replace(/w/g, 'gu');
  },
  NUM: { 0: 'cero', 1: 'uno', 2: 'dos', 3: 'tres', 4: 'cuatro', 5: 'cinco', 6: 'seis', 7: 'siete', 8: 'ocho', 9: 'nueve', 10: 'diez', 20: 'veinte', 30: 'treinta' },
  lev(a, b) {
    if (a === b) return 0; if (!a.length) return b.length; if (!b.length) return a.length;
    let p = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) { const c = [i]; for (let j = 1; j <= b.length; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; }
    return p[b.length];
  },
  /* separa en sílabas (para enseñar cómo se lee la palabra roja) */
  silabas(pal) {
    const w = pal.toLowerCase(), V = 'aeiouáéíóúü', fuerte = 'aeoáéóíú', insep = ['pl', 'pr', 'bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'tr', 'ch', 'll', 'rr'];
    const u = []; // unidades: {t, v}
    for (let i = 0; i < w.length; i++) {
      const c = w[i], d = w.slice(i, i + 2);
      if ((d === 'ch' || d === 'll' || d === 'rr')) { u.push({ t: pal.substr(i, 2), v: false }); i++; continue; }
      if ((c === 'q' || c === 'g') && w[i + 1] === 'u' && 'eéií'.includes(w[i + 2] || '-')) { u.push({ t: pal.substr(i, 2), v: false }); i++; continue; }
      const esV = V.includes(c) || (c === 'y' && !V.includes(w[i + 1] || '-') && i > 0);
      u.push({ t: pal[i], v: esV });
    }
    /* grupos de vocales → núcleos (separa hiatos) */
    const nuc = []; let k = 0;
    while (k < u.length) {
      if (!u[k].v) { k++; continue; }
      let j = k + 1;
      while (j < u.length && u[j].v) {
        const a = u[j - 1].t.toLowerCase(), b = u[j].t.toLowerCase();
        if (fuerte.includes(a) && fuerte.includes(b)) break;   // hiato
        j++;
      }
      nuc.push([k, j]); k = j;
    }
    if (nuc.length <= 1) return [pal];
    const cortes = [];
    for (let n = 0; n < nuc.length - 1; n++) {
      const ini = nuc[n][1], fin = nuc[n + 1][0], nc = fin - ini;
      let corte;
      if (nc === 0) corte = ini;
      else if (nc === 1) corte = ini;
      else if (nc === 2) corte = insep.includes((u[ini].t + u[ini + 1].t).toLowerCase()) ? ini : ini + 1;
      else if (nc === 3) corte = insep.includes((u[ini + 1].t + u[ini + 2].t).toLowerCase()) ? ini + 1 : ini + 2;
      else corte = ini + 2;
      cortes.push(corte);
    }
    const out = []; let a = 0;
    cortes.forEach(c => { out.push(u.slice(a, c).map(x => x.t).join('')); a = c; });
    out.push(u.slice(a).map(x => x.t).join(''));
    return out.filter(Boolean);
  }
};

/* ---------------- estado ---------------- */
function lunaDatos() {
  const d = datos();
  if (!d.luna) d.luna = { cfg: null, vistas: {}, frases: 0, est: 0 };
  if (!d.luna.vistas) d.luna.vistas = {};
  return d.luna;
}
const SRL = window.SpeechRecognition || window.webkitSpeechRecognition;
let LUNA = null;   // ronda en curso

function abreLuna() {
  if (typeof LICENCIA !== 'undefined' && LICENCIA.comprobar()) return;
  SFX.clic();
  ir('luna');
  lunaMenu();
}
ON_PANTALLA.pLuna = () => {};
$('#bLunaSalir').onclick = async () => {
  luParaMic();
  if (LUNA && LUNA.i > 0 && LUNA.i < LUNA.lista.length) {
    if (!await pregunta({ icono: '🌙', titulo: '¿Salir de la Luna?', texto: 'Si sales ahora, esta ronda de frases no se termina.', si: 'Salir', no: 'Seguir leyendo' })) return;
  }
  LUNA = null; ir('mapa');
};

/* ---------------- MENÚ (lo elige papá) ---------------- */
function lunaMenu() {
  luParaMic(); LUNA = null;
  const C = $('#luCuerpo'), L = lunaDatos(), cfg = L.cfg;
  $('#luTitulo').textContent = 'Luna Lectora';
  C.innerHTML = `
    <img class="lu-luna" src="${LUNA_IMG}" onerror="this.onerror=null;this.src='${LUNA_IMG_TEMP}'" alt="">
    <h3 class="lu-tit">¿Qué quieres practicar leyendo frases?</h3>
    <p class="lu-sub">Papá o mamá: elegid juntos el tipo de frases 👇</p>
    ${!SRL ? `<div class="lu-aviso">Este móvil no deja escuchar la voz. Abre la app con <b>Google Chrome</b> para usar la Luna Lectora.</div>` : ''}
    ${cfg ? `<button class="btn btn-verde btn-grande lu-ultima" id="luUltima">▶ SEGUIR CON ${luNombreCfg(cfg).toUpperCase()}</button>` : ''}
    <span class="lu-paso">Paso 1 de 3 · Tipo de sílabas</span>
    <div class="lu-opc">
      <button class="lu-card" data-t="directas"><span class="ico">✌️</span><b>Sílabas de 2 letras</b><span class="ej">ma me mi mo mu</span><small>Frases con sílabas directas: consonante + vocal</small></button>
      <button class="lu-card" data-t="trabadas"><span class="ico">🤟</span><b>Sílabas de 3 letras</b><span class="ej">tra tre tri tro tru</span><small>Frases con sílabas trabadas: bra, pla, cre, fri…</small></button>
    </div>`;
  if (cfg) $('#luUltima').onclick = () => { SFX.clic(); empiezaLuna(cfg); };
  C.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { SFX.clic(); lunaFamilias(b.dataset.t); });
  VOZ.decir(cfg ? '¡Bienvenido a la Luna Lectora! ¿Seguimos con las frases de la última vez, o quieres practicar otras?' : '¡Bienvenido a la Luna Lectora! Aquí vas a leer frases en voz alta. ¿Qué quieres practicar? ¿Sílabas de dos letras o de tres letras?');
}
function luFam(tipo, id) { return LUNA_FAMILIAS[tipo].find(f => f.id === id); }
function luNombreCfg(cfg) {
  if (cfg.fam === '*') return (cfg.tipo === 'directas' ? 'sílabas de 2 letras' : 'sílabas de 3 letras') + ' mezcladas';
  const f = luFam(cfg.tipo, cfg.fam); return f ? f.s.split(' · ')[0] : 'frases';
}
function lunaFamilias(tipo) {
  const C = $('#luCuerpo'), fams = LUNA_FAMILIAS[tipo];
  C.innerHTML = `
    <span class="lu-paso">Paso 2 de 3 · ¿Qué sílabas?</span>
    <h3 class="lu-tit">${tipo === 'directas' ? '¿Qué sílabas de 2 letras?' : '¿Qué sílabas trabadas?'}</h3>
    <div class="lu-fams">
      ${fams.map(f => `<button class="lu-fam" data-f="${f.id}"><b>${f.n}</b><small>${f.s}</small></button>`).join('')}
      <button class="lu-fam mezcla" data-f="*"><b>🎲</b><small>Todas mezcladas</small></button>
    </div>
    <button class="btn btn-mini" id="luAtras">← Atrás</button>`;
  C.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { SFX.clic(); lunaExigencia({ tipo, fam: b.dataset.f }); });
  $('#luAtras').onclick = () => { SFX.clic(); lunaMenu(); };
  VOZ.decir(tipo === 'directas' ? '¿Con qué sílabas quieres las frases?' : '¿Qué sílabas trabadas quieres practicar?');
  C.scrollTop = 0; $('#pLuna').scrollTop = 0;
}
function lunaExigencia(cfg) {
  const C = $('#luCuerpo');
  C.innerHTML = `
    <span class="lu-paso">Paso 3 de 3 · ¿Cuánto le exigimos?</span>
    <h3 class="lu-tit">${luNombreCfg(cfg)}</h3>
    <div class="lu-opc">
      ${Object.entries(LUNA_EXIGE).map(([k, e]) => `<button class="lu-card${k === 'normal' ? ' sel' : ''}" data-e="${k}"><span class="ico">${e.e}</span><b>${e.n}</b><small>${e.d}</small></button>`).join('')}
    </div>
    <button class="btn btn-mini" id="luAtras">← Atrás</button>`;
  C.querySelectorAll('[data-e]').forEach(b => b.onclick = () => { SFX.clic(); empiezaLuna(Object.assign({}, cfg, { exige: b.dataset.e })); });
  $('#luAtras').onclick = () => { SFX.clic(); lunaFamilias(cfg.tipo); };
  $('#pLuna').scrollTop = 0;
  VOZ.decir('¿Lo hacemos suave, normal o exigente?');
}

/* elige frases sin repetir las que ya ha leído (por familia) */
function luElige(cfg, n) {
  const L = lunaDatos(), fams = cfg.fam === '*' ? LUNA_FAMILIAS[cfg.tipo] : [luFam(cfg.tipo, cfg.fam)].filter(Boolean);
  const pool = [];
  fams.forEach(f => f.f.forEach((t, i) => pool.push({ t, key: f.id + ':' + i, fam: f.id })));
  let libres = pool.filter(p => !L.vistas[p.key]);
  if (libres.length < n) {
    /* ya las ha leído casi todas: se vuelve a empezar, pero sin las últimas que leyó */
    const ult = new Set((L.ultimas || []).slice(-n * 2));
    fams.forEach(f => f.f.forEach((t, i) => { delete L.vistas[f.id + ':' + i]; }));
    libres = pool.filter(p => !ult.has(p.key));
    if (libres.length < n) libres = pool;
  }
  /* mezclado: reparte entre familias */
  return ENG.shuffle(libres).slice(0, n);
}

/* ---------------- RONDA ---------------- */
function empiezaLuna(cfg) {
  const L = lunaDatos();
  cfg = { tipo: cfg.tipo, fam: cfg.fam, exige: cfg.exige || 'normal' };
  L.cfg = cfg; guardarNino();
  if (!SRL) { toast('Este móvil no deja escuchar la voz. Prueba con Google Chrome.'); return; }
  LUNA = { cfg, lista: luElige(cfg, LUNA_RONDA), i: 0, res: [], intentos: 0 };
  $('#luTitulo').textContent = luNombreCfg(cfg);
  SFX.woosh();
  luFrase();
}
function luFrase() {
  luParaMic();
  const R = LUNA, C = $('#luCuerpo');
  if (R.i >= R.lista.length) { luFinRonda(); return; }
  const fr = R.lista[R.i]; R.intentos = 0;
  const ws = LU.palabras(fr.t);
  C.innerHTML = `
    <div class="lu-ronda">${R.lista.map((_, k) => `<i class="${k < R.i ? (R.res[k] ? 'ok' : 'ya') : ''}"></i>`).join('')}</div>
    <div class="lu-frase" id="luFrase">${ws.map((w, k) => `<span class="lu-w" data-k="${k}">${w}</span>`).join(' ')}</div>
    <div class="lu-nota" id="luNota"></div>
    <div class="lu-mic-zona">
      <button class="lu-mic" id="luMic">🎤</button>
      <div class="lu-mic-txt" id="luMicTxt">Pulsa el micro y lee la frase</div>
    </div>
    <div class="lu-acc" id="luAcc"></div>`;
  R.ws = ws; R.obj = ws.map(w => ({ n: LU.norm(LU.limpia(w)), f: LU.fon(LU.limpia(w)), nombre: /^\p{Lu}/u.test(LU.limpia(w)) }));
  R.ok = new Array(ws.length).fill(false);
  $('#luMic').onclick = () => { if (R.escuchando) luTerminaLectura(true); else luEscucha(); };
  C.querySelectorAll('.lu-w').forEach(s => s.onclick = () => luDiPalabra(+s.dataset.k));
  $('#pLuna').scrollTop = 0;
  VOZ.decir(R.i === 0 ? 'Cuando estés listo, pulsa el micro rojo y lee la frase en voz alta. Cuando termines, si no se apaga solo, vuelve a pulsarlo.' : pick(['¡Vamos con otra frase!', '¡Otra frase! Tú puedes.', 'Ahora esta. Pulsa el micro cuando quieras.']));
}

/* toca una palabra roja → Lucas la lee despacio por sílabas */
function luDiPalabra(k) {
  const R = LUNA; if (!R || R.escuchando) return;
  const s = $('#luFrase').children[k]; if (!s || !s.classList.contains('mal')) return;
  const w = LU.limpia(R.ws[k]), sil = LU.silabas(w);
  SFX.clic();
  VOZ.decir(sil.length > 1 ? sil.map(sv).join(', ') + '. ' + w + '.' : w + '.', { rate: .75 });
}

/* ---------------- reconocimiento de voz ---------------- */
function luEscucha() {
  const R = LUNA; if (!R || R.escuchando) return;
  VOZ.callar();
  /* limpia el intento anterior */
  $('#luFrase').querySelectorAll('.lu-w').forEach(s => { s.classList.remove('ok', 'mal'); const q = s.querySelector('.sil'); if (q) q.remove(); });
  R.ok.fill(false); R.texto = ''; R.prev = ''; R.escuchando = true; R.terminando = false;
  $('#luNota').textContent = ''; $('#luAcc').innerHTML = '';
  const mic = $('#luMic'); mic.classList.add('on'); mic.textContent = '👂';
  $('#luMicTxt').textContent = 'Te escucho… lee la frase';
  SFX.pop && SFX.pop();
  R.tMax = setTimeout(() => luTerminaLectura(true), 60000);   // seguridad: 1 minuto
  luArrancaRec();
}
function luArrancaRec() {
  const R = LUNA; if (!R || !R.escuchando) return;
  let rec;
  try { rec = new SRL(); } catch (e) { luTerminaLectura(false); toast('No se puede usar el micro'); return; }
  rec.lang = 'es-ES'; rec.continuous = true; rec.interimResults = true; rec.maxAlternatives = 3;
  R.rec = rec;
  rec.onresult = e => {
    let txt = '';
    for (let i = 0; i < e.results.length; i++) {
      /* de las alternativas, usa la que más palabras de la frase acierta */
      const r = e.results[i]; let mejor = r[0].transcript, mp = -1;
      for (let a = 0; a < r.length; a++) { const p = luCuenta(r[a].transcript); if (p > mp) { mp = p; mejor = r[a].transcript; } }
      txt += ' ' + mejor;
    }
    R.texto = (R.prev + ' ' + txt).trim();
    luCompara(false);
  };
  rec.onerror = ev => {
    if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') { luTerminaLectura(false); luPideMicro(); }
  };
  rec.onend = () => {
    /* en Android se corta solo tras un silencio: si sigue encendido, se vuelve a encender sin perder lo leído */
    if (R.escuchando && R.rec === rec) { R.prev = R.texto; setTimeout(luArrancaRec, 120); }
  };
  try { rec.start(); } catch (e) { setTimeout(luArrancaRec, 300); }
}
function luPideMicro() {
  $('#luNota').innerHTML = '🎤 Hay que dar permiso al micrófono para que Lucas te escuche.';
  VOZ.decir('Para que te escuche, hay que dar permiso al micrófono.');
}
function luParaMic() {
  const R = LUNA; if (!R) return;
  R.escuchando = false; clearTimeout(R.tMax);
  if (R.rec) { const r = R.rec; R.rec = null; try { r.onend = null; r.abort(); } catch (e) {} }
}

/* ¿coinciden una palabra de la frase y una palabra oída? */
function luIgual(o, oida) {
  const tol = LUNA_EXIGE[LUNA.cfg.exige].tol;
  const n = LU.norm(oida); if (!n) return false;
  const nn = LU.NUM[n] || n;
  if (nn === o.n || (o.n === 'un' && nn === 'uno') || (o.n === 'una' && nn === 'uno')) return true;
  const f = LU.fon(nn);
  if (f === o.f) return true;
  /* nombres propios (Mimí, Fifí, Pupi…): el reconocedor los escribe raro, se perdona más */
  const t = o.nombre ? tol + 1 : tol;
  if (o.f.length >= 4 && LU.lev(f, o.f) <= Math.min(t, Math.floor(o.f.length / 3))) return true;
  return false;
}
/* alineación tipo LCS entre la frase y lo que se ha oído (en orden, tolera palabras de más) */
function luAlinea(oidas) {
  const O = LUNA.obj, n = O.length, m = oidas.length;
  const T = Array.from({ length: n + 1 }, () => new Int16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
    T[i][j] = luIgual(O[i], oidas[j]) ? T[i + 1][j + 1] + 1 : Math.max(T[i + 1][j], T[i][j + 1]);
  const ok = new Array(n).fill(false); let i = 0, j = 0;
  while (i < n && j < m) {
    if (luIgual(O[i], oidas[j]) && T[i][j] === T[i + 1][j + 1] + 1) { ok[i] = true; i++; j++; }
    else if (T[i + 1][j] >= T[i][j + 1]) i++; else j++;
  }
  /* palabras pegadas: el reconocedor a veces junta dos («ala» por «a la») */
  for (let k = 0; k < n - 1; k++) if (!ok[k] && !ok[k + 1]) {
    const junta = O[k].n + O[k + 1].n;
    if (oidas.some(w => LU.norm(w) === junta)) { ok[k] = ok[k + 1] = true; }
  }
  return ok;
}
function luOidas(txt) { return String(txt || '').split(/\s+/).map(w => w.replace(/[^\p{L}\p{N}]/gu, '')).filter(Boolean); }
function luCuenta(txt) { return luAlinea(luOidas(txt)).filter(Boolean).length; }
function luCompara(final) {
  const R = LUNA; if (!R) return;
  const ok = luAlinea(luOidas(R.texto));
  const sp = $('#luFrase').children;
  ok.forEach((v, k) => { if (v && !R.ok[k]) { R.ok[k] = true; sp[k].classList.add('ok'); } });
  /* toda la frase leída → el micro se apaga solo */
  if (!final && R.escuchando && R.ok.every(Boolean)) { R.terminando = true; setTimeout(() => luTerminaLectura(true), 700); }
}
function luTerminaLectura(evaluar) {
  const R = LUNA; if (!R || !R.escuchando) return;
  luParaMic();
  const mic = $('#luMic'); mic.classList.remove('on'); mic.textContent = '🎤';
  $('#luMicTxt').textContent = 'Pulsa el micro y lee la frase';
  if (!evaluar) return;
  luCompara(true);
  luValora();
}

/* ---------------- valoración ---------------- */
function luValora() {
  const R = LUNA, ex = LUNA_EXIGE[R.cfg.exige];
  const total = R.ok.length, bien = R.ok.filter(Boolean).length, ratio = bien / total;
  R.intentos++;
  const sp = $('#luFrase').children;
  R.ok.forEach((v, k) => { if (!v) { sp[k].classList.add('mal'); const sil = LU.silabas(LU.limpia(R.ws[k])); if (sil.length > 1) sp[k].insertAdjacentHTML('beforeend', `<span class="sil">${sil.join('-')}</span>`); } });
  const A = $('#luAcc'), N = $('#luNota');
  if (!R.texto) {
    N.textContent = '🤔 No te he oído. Acércate al móvil y lee en voz alta.';
    VOZ.decir('No te he oído bien. Acércate un poco al móvil y lee en voz alta.');
    R.intentos--; R.ok.forEach((v, k) => { sp[k].classList.remove('mal'); const q = sp[k].querySelector('.sil'); if (q) q.remove(); });
    return;
  }
  if (ratio >= ex.min) {
    const est = ratio === 1 ? 3 : ratio >= .85 ? 2 : 1;
    R.res[R.i] = est;
    const L = lunaDatos(), fr = R.lista[R.i];
    L.vistas[fr.key] = 1; L.ultimas = (L.ultimas || []).concat(fr.key).slice(-30); L.frases = (L.frases || 0) + 1; L.est = (L.est || 0) + est;
    const d = datos(); d.chispas += est * 2; d._t = Date.now(); guardarNino();
    SFX.ok(); if (est === 3) { FX.confeti(90); SFX.fanfarria && SFX.fanfarria(); }
    N.innerHTML = `<div class="lu-estrellas">${[0, 1, 2].map(k => `<img class="${k < est ? 'on' : ''}" style="animation-delay:${k * .15}s" src="img/estrella-${k < est ? 'on' : 'off'}.png" alt="">`).join('')}</div>`;
    const msg = est === 3 ? pick(['¡Perfecto! ¡Has leído toda la frase genial!', '¡Increíble! ¡Lees como un campeón!', '¡Toda la frase bien! ¡Eres un crack!'])
      : est === 2 ? '¡Muy bien! ' + (bien < total ? 'Solo se te ha escapado alguna palabra. Toca las rojas para oírlas.' : '')
      : '¡Bien! La has leído. Toca las palabras rojas para oír cómo se leen.';
    VOZ.decir(msg);
    A.innerHTML = `<button class="btn btn-verde" id="luSig">${R.i + 1 < R.lista.length ? 'Siguiente frase ▶' : 'Terminar ▶'}</button>${est < 3 ? '<button class="btn btn-azul" id="luOtra">🔁 Leerla otra vez</button>' : ''}`;
    $('#luSig').onclick = () => { SFX.clic(); R.i++; luFrase(); };
    if ($('#luOtra')) $('#luOtra').onclick = () => { SFX.clic(); luEscucha(); };
  } else {
    SFX.mal();
    N.textContent = bien ? `Has leído bien ${bien} de ${total} palabras. ¡Hay que repetirla!` : '¡Vamos a intentarlo otra vez!';
    VOZ.decir(R.intentos === 1 ? 'Casi. Las palabras en rojo hay que leerlas mejor. Tócalas para oírlas y vuelve a leer la frase.' : 'Ánimo. Escucha cómo se lee y luego inténtalo tú.');
    A.innerHTML = `<button class="btn btn-verde" id="luRep">🔁 Leerla otra vez</button><button class="btn btn-azul" id="luOir">🔊 Escuchar a Lucas</button>${R.intentos >= 2 ? '<button class="btn btn-mini" id="luPasa">Pasar a otra ⏭</button>' : ''}`;
    $('#luRep').onclick = () => { SFX.clic(); luEscucha(); };
    $('#luOir').onclick = () => { SFX.clic(); VOZ.decir(R.lista[R.i].t, { rate: .8 }); };
    if ($('#luPasa')) $('#luPasa').onclick = () => { SFX.clic(); R.res[R.i] = 0; R.i++; luFrase(); };
  }
}

function luFinRonda() {
  luParaMic();
  const R = LUNA, C = $('#luCuerpo');
  const est = R.res.reduce((a, b) => a + (b || 0), 0), max = R.lista.length * 3, bien = R.res.filter(Boolean).length;
  SFX.fanfarria && SFX.fanfarria(); FX.confeti(140);
  C.innerHTML = `
    <div class="lu-fin">
      <img class="lu-luna" src="${LUNA_IMG}" onerror="this.onerror=null;this.src='${LUNA_IMG_TEMP}'" alt="">
      <div class="grande">¡Ronda terminada!</div>
      <div>Has leído <b>${bien}</b> de <b>${R.lista.length}</b> frases</div>
      <div class="cont" style="font-size:22px">⭐ ${est} / ${max} · ⚡ +${est * 2}</div>
      <button class="btn btn-verde btn-grande" id="luOtraRonda">🌙 OTRA RONDA</button>
      <button class="btn btn-azul" id="luCambia">Cambiar las frases</button>
      <button class="btn btn-mini" id="luMapa">Volver al mapa</button>
    </div>`;
  VOZ.decir(est >= max * .8 ? '¡Qué bien lees! Has terminado la ronda de frases. ¿Hacemos otra?' : '¡Has terminado la ronda! Cuanto más practiques, mejor leerás. ¿Otra?');
  $('#luOtraRonda').onclick = () => empiezaLuna(R.cfg);
  $('#luCambia').onclick = () => { SFX.clic(); lunaMenu(); };
  $('#luMapa').onclick = () => { SFX.clic(); LUNA = null; ir('mapa'); };
  $('#pLuna').scrollTop = 0;
}

/* deja de escuchar si la app se va a segundo plano */
document.addEventListener('visibilitychange', () => { if (document.hidden && LUNA && LUNA.escuchando) luTerminaLectura(false); });
