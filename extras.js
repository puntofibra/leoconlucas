/* =====================================================================
   LEO CON LUCAS · Extras: Taller de Lucas, Recreo (minijuegos) y Diplomas
   ===================================================================== */
'use strict';

/* ---------------- CATÁLOGO DEL TALLER ---------------- */
const TALLER = {
  mas: { t: 'Mascotas', i: '🐾', items: [
    { id: 'estrella', e: '⭐', n: 'Estrellita', p: 50 }, { id: 'perro', e: '🐶', n: 'Perrito', p: 60 }, { id: 'gato', e: '🐱', n: 'Gatito', p: 60 },
    { id: 'pollito', e: '🐥', n: 'Pollito', p: 70 }, { id: 'mariposa', e: '🦋', n: 'Mariposa', p: 90 }, { id: 'buho', e: '🦉', n: 'Búho', p: 100 },
    { id: 'pinguino', e: '🐧', n: 'Pingüino', p: 100 }, { id: 'panda', e: '🐼', n: 'Panda', p: 120 }, { id: 'zorro', e: '🦊', n: 'Zorrito', p: 120 },
    { id: 'pulpo', e: '🐙', n: 'Pulpo', p: 150 }, { id: 'alien', e: '👽', n: 'Marcianito', p: 150 }, { id: 'ovni', e: '🛸', n: 'Ovni', p: 180 },
    { id: 'unicornio', e: '🦄', n: 'Unicornio', p: 200 }, { id: 'dino', e: '🦖', n: 'Dinosaurio', p: 220 }, { id: 'dragon', e: '🐉', n: 'Dragón', p: 250 }] },
  aura: { t: 'Auras', i: '✨', items: [
    { id: 'azul', c: '#18e0ff', n: 'Azul eléctrico', p: 50 }, { id: 'rosa', c: '#ff4fd8', n: 'Rosa neón', p: 50 }, { id: 'oro', c: '#ffd23f', n: 'Oro', p: 90 },
    { id: 'fuego', c: '#ff6a00', n: 'Fuego', p: 90 }, { id: 'morado', c: '#a66bff', n: 'Morado cósmico', p: 90 }, { id: 'blanco', c: '#ffffff', n: 'Luz de estrella', p: 120 },
    { id: 'galaxia', c: '#6a5cff', n: 'Galaxia', p: 160, anim: 1 }, { id: 'arcoiris', c: '#ff4d5e', n: 'Arcoíris', p: 220, anim: 1 }] },
  est: { t: 'Estelas', i: '☄️', items: [
    { id: 'hielo', c: ['#ffffff', '#bdf3ff', '#18e0ff'], n: 'Hielo', p: 60 }, { id: 'fuego', c: ['#ff4d00', '#ffb000', '#ffd23f'], n: 'Fuego', p: 60 },
    { id: 'arcoiris', c: ['#ff4d5e', '#ff8a3d', '#ffd23f', '#17ff5f', '#18e0ff', '#8b5cff'], n: 'Arcoíris', p: 90 },
    { id: 'estrellas', e: ['⭐', '✨', '🌟'], n: 'Estrellas', p: 140 }, { id: 'corazones', e: ['💖', '💜', '💚'], n: 'Corazones', p: 140 },
    { id: 'burbujas', e: ['🫧'], n: 'Burbujas', p: 120 }, { id: 'notas', e: ['🎵', '🎶'], n: 'Música', p: 120 }, { id: 'letras', e: ['A', 'B', 'C', 'M', 'P', 'S'], n: 'Letras', p: 160, letras: 1 }] },
  fondo: { t: 'Fondos', i: '🌌', items: [
    { id: 'nebulosa', n: 'Nebulosa rosa', p: 100, bg: 'radial-gradient(ellipse at 30% 30%, rgba(255,79,216,.28), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(139,92,255,.3), transparent 55%)' },
    { id: 'azul', n: 'Galaxia azul', p: 100, bg: 'radial-gradient(ellipse at 70% 20%, rgba(24,224,255,.25), transparent 55%), radial-gradient(ellipse at 20% 90%, rgba(23,60,255,.3), transparent 60%)' },
    { id: 'aurora', n: 'Aurora', p: 150, bg: 'linear-gradient(170deg, rgba(23,255,95,.18), transparent 40%, rgba(24,224,255,.16) 70%, transparent), radial-gradient(ellipse at 50% 0%, rgba(139,92,255,.3), transparent 60%)' },
    { id: 'marte', n: 'Atardecer marciano', p: 150, bg: 'radial-gradient(ellipse at 50% 110%, rgba(255,106,0,.38), transparent 60%), radial-gradient(ellipse at 10% 10%, rgba(255,77,94,.22), transparent 50%)' },
    { id: 'oro', n: 'Polvo de oro', p: 180, bg: 'radial-gradient(ellipse at 50% 40%, rgba(255,210,63,.22), transparent 60%), radial-gradient(ellipse at 90% 90%, rgba(255,138,61,.2), transparent 50%)' },
    { id: 'agujero', n: 'Agujero negro', p: 220, bg: 'radial-gradient(circle at 50% 45%, #000 0 12%, rgba(255,138,61,.45) 14%, rgba(139,92,255,.25) 24%, transparent 45%)' }] }
};
function talDatos() { const d = datos(); if (!d.tal) d.tal = { own: [], mas: '', aura: '', est: '', fondo: '' }; return d.tal; }
function talItem(cat, id) { return id ? TALLER[cat].items.find(x => x.id === id) : null; }

/* Pone mascota y aura a cualquier robot (.robot) */
function decora(r) {
  if (!r || !NINO) return;
  const t = talDatos();
  r.querySelectorAll('.mascota').forEach(x => x.remove());
  const au = talItem('aura', t.aura);
  if (au) { r.dataset.aura = au.id; r.style.setProperty('--aura', au.c); } else { delete r.dataset.aura; r.style.removeProperty('--aura'); }
  const m = talItem('mas', t.mas);
  if (m) {
    const w = r.getBoundingClientRect().width || 110;
    const s = el('span', 'mascota', `<i>${m.e}</i>`);
    s.style.setProperty('--r', Math.round(w * .62) + 'px'); s.style.fontSize = Math.max(18, Math.round(w * .26)) + 'px';
    r.appendChild(s);
  }
}
function decoraTodo() { ['.nave-mapa > .robot', '#lucasNarra', '#resLucas', '#tallerRobot > .robot'].forEach(s => { const r = $(s); if (r) decora(r); }); }
function aplicaFondo() {
  const pm = $('#pMapa'); if (!pm || !NINO) return;
  const f = talItem('fondo', talDatos().fondo);
  pm.style.backgroundImage = f ? f.bg : '';   // toda la pantalla, sin cortes
  pm.style.backgroundAttachment = 'fixed'; pm.style.backgroundSize = 'cover';
}
/* estela del vuelo entre planetas (lo usa ESTELA en app.js) */
window.estelaCfg = () => { if (!NINO) return null; const e = talItem('est', talDatos().est); return e || null; };

/* ---------------- PANTALLA TALLER ---------------- */
let talCat = 'mas';
ON_PANTALLA.pTaller = () => {
  if (!NINO) { ir('perfiles'); return; }
  const R = $('#tallerRobot'); R.innerHTML = robotHTML(NINO.color, 'vuela'); R.firstChild.dataset.fuerza = '1.6';
  pintaTaller();
  requestAnimationFrame(() => decora(R.firstChild));
  VOZ.decir('¡Bienvenido a mi taller! Con tus chispas puedes comprarme mascotas, auras, estelas y fondos para el mapa.');
};
function pintaTaller() {
  const d = datos(), t = talDatos();
  $('#talChispas').textContent = d.chispas;
  $('#talTabs').innerHTML = Object.keys(TALLER).map(k => `<button class="tal-tab${k === talCat ? ' sel' : ''}" data-k="${k}">${TALLER[k].i} ${TALLER[k].t}</button>`).join('');
  $$('#talTabs .tal-tab').forEach(b => b.onclick = () => { SFX.clic(); talCat = b.dataset.k; pintaTaller(); });
  const G = $('#talItems'); G.innerHTML = '';
  TALLER[talCat].items.forEach(it => {
    const tiene = t.own.includes(talCat + ':' + it.id), puesto = t[talCat] === it.id;
    let ico;
    if (talCat === 'mas') ico = `<span class="ti-e">${it.e}</span>`;
    else if (talCat === 'aura') ico = `<span class="ti-aura${it.anim ? ' anim-' + it.id : ''}" style="--c:${it.c}"></span>`;
    else if (talCat === 'est') ico = it.e ? `<span class="ti-e peq">${it.e.slice(0, 3).join('')}</span>` : `<span class="ti-estela">${it.c.map(c => `<i style="background:${c}"></i>`).join('')}</span>`;
    else ico = `<span class="ti-fondo" style="background-image:${it.bg}"></span>`;
    const b = el('button', 'tal-item' + (tiene ? ' tiene' : '') + (puesto ? ' puesto' : '') + (!tiene && d.chispas < it.p ? ' caro' : ''),
      `${ico}<b>${it.n}</b><small>${puesto ? '✅ Puesto' : tiene ? 'Ponérmelo' : '⚡ ' + it.p}</small>`);
    b.onclick = () => tocaItem(it, b);
    G.appendChild(b);
  });
}
async function tocaItem(it, b) {
  const d = datos(), t = talDatos(), k = talCat + ':' + it.id;
  if (t.own.includes(k)) {
    SFX.pop(); t[talCat] = t[talCat] === it.id ? '' : it.id;
    VOZ.decir(t[talCat] ? '¡Me encanta! ' + it.n + '.' : 'Vale, me lo quito.');
  } else if (d.chispas < it.p) {
    SFX.mal(); b.animate([{ transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'none' }], 280);
    VOZ.decir(`Te faltan ${it.p - d.chispas} chispas. ¡Sigue leyendo misiones para conseguirlas!`); return;
  } else {
    SFX.clic();
    if (!await pregunta({ icono: talCat === 'mas' ? it.e : '🛠️', titulo: '¿Comprar ' + it.n + '?', texto: `Cuesta ⚡ ${it.p} chispas. Tienes ${d.chispas}.`, si: 'Comprar', no: 'Ahora no' })) return;
    d.chispas -= it.p; t.own.push(k); t[talCat] = it.id;
    SFX.fanfarria(); FX.chispas(b, 40, '#ffd23f'); FX.confeti(60);
    VOZ.decir(pick(['¡Toma ya! ', '¡Qué pasada! ', '¡Genial! ']) + it.n + ' es tuyo para siempre.');
  }
  d._t = Date.now(); guardarNino();
  pintaTaller(); decora($('#tallerRobot > .robot'));
  if (talCat === 'est' && t.est) demoEstela();
}
function demoEstela() {
  const R = $('#tallerRobot'); const r = R.querySelector('.robot'); if (!r) return;
  ESTELA.start(r, R); r.animate([{ transform: 'translateX(-30px)' }, { transform: 'translateX(30px)' }, { transform: 'none' }], { duration: 1400, easing: 'ease-in-out' });
  setTimeout(() => ESTELA.stop(), 1400);
}

/* ---------------- RECREO (minijuegos) ---------------- */
const TK_MAX = 5;
function tickets() { const d = datos(); if (d.tk == null) d.tk = 2; return d.tk; }
const gratisAdmin = () => typeof ADMIN !== 'undefined' && ADMIN.todo();
const JUEGOS = [
  { id: 'lluvia', n: 'Lluvia de sílabas', e: '☔', d: 'Atrapa la sílaba que dice Lucas antes de que caiga.' },
  { id: 'memory', n: 'Parejas espaciales', e: '🃏', d: 'Une cada palabra con su dibujo.' },
  { id: 'carrera', n: 'Carrera de cohetes', e: '🏁', d: 'Lee rápido y gana la carrera al robot rival.' }];
ON_PANTALLA.pRecreo = () => {
  if (!NINO) { ir('perfiles'); return; }
  pintaRecreo();
  VOZ.decir(tickets() ? '¡Hora del recreo! Elige un juego.' : 'No te quedan fichas. Completa una misión y ganarás una ficha para jugar.');
};
function pintaRecreo() {
  const d = datos(), tk = tickets(); d.rec = d.rec || {};
  $('#recFichas').innerHTML = Array.from({ length: TK_MAX }, (_, i) => `<span class="ficha${i < tk ? ' on' : ''}">🎟️</span>`).join('');
  $('#recZona').innerHTML = `<p class="rec-ayuda">${gratisAdmin() ? 'Modo admin: juegos gratis' : 'Cada juego gasta 1 ficha. Ganas 1 ficha por cada misión completada.'}</p>` +
    JUEGOS.map(j => `<button class="rec-juego" data-j="${j.id}"><span class="rj-e">${j.e}</span><span class="rj-t"><b>${j.n}</b><small>${j.d}</small>${d.rec[j.id] ? `<em>Récord: ${d.rec[j.id]}</em>` : ''}</span><span class="rj-go">▶</span></button>`).join('');
  $$('#recZona .rec-juego').forEach(b => b.onclick = () => jugar(b.dataset.j));
  $('#recVolver').onclick = () => { SFX.clic(); if (REC.fin) REC.fin(true); ir('mapa'); };
}
const REC = { fin: null };
function jugar(id) {
  const d = datos();
  if (!gratisAdmin()) {
    if (!tickets()) { SFX.mal(); VOZ.decir('No te quedan fichas. ¡Completa una misión para ganar otra!'); return; }
    d.tk--; d._t = Date.now(); guardarNino();
  }
  SFX.woosh(); pintaRecreoFichas();
  ({ lluvia: juegoLluvia, memory: juegoMemory, carrera: juegoCarrera })[id]();
}
/* TRUCO OCULTO: 5 toques rápidos en las fichas del recreo = +1 ficha (hasta el máximo de 5) */
(function () {
  const z = document.getElementById('recFichas'); if (!z) return;
  z.style.touchAction = 'manipulation'; z.style.userSelect = 'none'; z.style.webkitUserSelect = 'none';
  let n = 0, ult = 0;
  z.addEventListener('pointerdown', () => {
    if (!NINO) return;
    const ahora = Date.now();
    n = (ahora - ult < 450) ? n + 1 : 1; ult = ahora;
    if (n < 5) return;
    n = 0;
    if (tickets() >= TK_MAX) return;
    const d = datos(); d.tk = Math.min(TK_MAX, tickets() + 1); guardarNino();
    pintaRecreoFichas();
    const b = $('#bRecreoSub'); if (b) b.textContent = tickets() + ' 🎟️';
    SFX.moneda();
    const f = z.querySelectorAll('.ficha.on'); const nueva = f[f.length - 1];
    if (nueva) { try { FX.chispas(nueva, 16); } catch (e) {} if (nueva.animate) nueva.animate([{ transform: 'scale(.3) rotate(-30deg)', opacity: 0 }, { transform: 'scale(1.5) rotate(10deg)', opacity: 1, offset: .6 }, { transform: 'scale(1) rotate(0)' }], { duration: 450, easing: 'cubic-bezier(.2,.9,.3,1)' }); }
  });
})();
function pintaRecreoFichas() { const tk = tickets(); $('#recFichas').innerHTML = Array.from({ length: TK_MAX }, (_, i) => `<span class="ficha${i < tk ? ' on' : ''}">🎟️</span>`).join(''); }
function finJuego(id, puntos, txt, chispas) {
  const d = datos(); d.rec = d.rec || {};
  const record = puntos > (d.rec[id] || 0); if (record) d.rec[id] = puntos;
  d.chispas += chispas; d._t = Date.now(); guardarNino();
  SFX.fanfarria(); FX.confeti(record ? 120 : 60);
  $('#recZona').innerHTML = `<div class="rec-fin">${robotHTML(NINO.color, 'vuela', 'rec-lucas')}<h2>${txt}</h2>
    <p class="rec-pts">${puntos} puntos${record ? ' · <b>¡NUEVO RÉCORD!</b>' : ''}</p><p class="rec-ch">+${chispas} ⚡ chispas</p>
    <div class="rec-bts"><button class="btn btn-verde" id="recOtra">🎟️ Jugar otra vez</button><button class="btn btn-azul" id="recMenu">Elegir juego</button></div></div>`;
  requestAnimationFrame(() => decora($('#recZona .robot')));
  VOZ.decir(txt + ' Has conseguido ' + puntos + ' puntos' + (record ? '. ¡Es tu nuevo récord!' : '.') + ' Te llevas ' + chispas + ' chispas.');
  $('#recOtra').onclick = () => jugar(id);
  $('#recMenu').onclick = () => { SFX.clic(); pintaRecreo(); };
}
function silabasHasta(lv) { const s = []; for (let i = 0; i <= lv && i < PLANETAS.length; i++) s.push(...PLANETAS[i].silabas); return [...new Set(s)]; }
function palabrasDibujo(lv) {
  const vistos = new Set();
  return ENG.shuffle(ENG.CON_DIBUJO.filter(p => p.lv <= Math.max(lv, 1) && (!p.tr || lv >= 22))).filter(p => !vistos.has(p.e) && vistos.add(p.e));
}

/* 1 · Lluvia de sílabas */
function juegoLluvia() {
  const lv = nivelActual(), sil = silabasHasta(lv), propias = PLANETAS[Math.min(lv, 23)].silabas;
  const Z = $('#recZona'); Z.innerHTML = `<div class="ll-cab"><span>🎯 <b id="llObj">-</b></span><button class="btn-ico" id="llOir">🔊</button><span>⏱️ <b id="llT">60</b></span><span>⭐ <b id="llP">0</b></span></div><div class="ll-cielo" id="llCielo"></div>`;
  const C = $('#llCielo'); let obj = '', pts = 0, t = 60, vivo = true, vel = .6 + (NINO.edad >= 7 ? .25 : 0), raf, gen;
  const nuevoObj = () => { obj = Math.random() < .6 ? pick(propias) : pick(sil); $('#llObj').textContent = obj; VOZ.decir(sv(obj), { rate: .8 }); };
  $('#llOir').onclick = () => VOZ.decir(sv(obj), { rate: .8 });
  const BURB = ['verde', 'azul', 'rosa', 'morado', 'naranja', 'amarillo'];
  const lanza = (forzar) => {
    if (!vivo) return;
    const s = forzar || (Math.random() < .35 ? obj : pick(sil));
    const b = el('button', 'll-burbuja', `<span>${s}</span>`); b.style.backgroundImage = `url(img/burbujas/${pick(BURB)}.png)`;
    b.style.left = (6 + Math.random() * 74) + '%'; b._y = -80; b._v = vel * (0.8 + Math.random() * .5); b._s = s;
    b.onclick = () => {
      if (!vivo || b._ok) return;
      if (b._s === obj) { b._ok = 1; pts++; $('#llP').textContent = pts; SFX.ok(); FX.chispas(b, 18); b.classList.add('pop'); setTimeout(() => b.remove(), 300); vel += .04; nuevoObj(); }
      else { SFX.mal(); b.classList.add('mal'); setTimeout(() => b.classList.remove('mal'), 300); VOZ.decir('Esa es ' + sv(b._s) + '. Busca ' + sv(obj), { rate: .85 }); }
    };
    C.appendChild(b);
  };
  const loop = () => {
    if (!vivo) return;
    const H = C.clientHeight;
    C.querySelectorAll('.ll-burbuja').forEach(b => { if (b._ok) return; b._y += b._v * 1.6; b.style.transform = `translateY(${b._y}px)`; if (b._y > H) b.remove(); });
    if (![...C.querySelectorAll('.ll-burbuja')].some(b => b._s === obj && !b._ok && b._y < H * .6)) lanza(obj);
    raf = requestAnimationFrame(loop);
  };
  const reloj = setInterval(() => { t--; $('#llT').textContent = t; if (t <= 0) acabar(); }, 1000);
  gen = setInterval(() => lanza(), 900);
  function acabar(salir) {
    if (!vivo) return; vivo = false; clearInterval(reloj); clearInterval(gen); cancelAnimationFrame(raf); REC.fin = null;
    if (!salir) finJuego('lluvia', pts, pts >= 15 ? '¡Eres un rayo atrapando sílabas!' : pts >= 8 ? '¡Muy bien atrapado!' : '¡Buen intento!', Math.min(25, 5 + pts));
  }
  REC.fin = acabar;
  nuevoObj(); lanza(obj); raf = requestAnimationFrame(loop);
}

/* 2 · Parejas: palabra ↔ dibujo (con pocas palabras: mayúscula ↔ minúscula) */
function juegoMemory() {
  const lv = nivelActual(), np = NINO.edad <= 5 ? 4 : 6;
  let pares;
  const pal = palabrasDibujo(lv);
  if (pal.length >= np + 2) pares = pal.slice(0, np).map(p => ({ k: p.w, a: `<span class="mm-e">${p.e}</span>`, b: `<span class="mm-w">${p.w}</span>`, voz: p.w }));
  else pares = ENG.shuffle(silabasHasta(lv)).slice(0, np).map(s => ({ k: s, a: `<span class="mm-w">${s.toUpperCase()}</span>`, b: `<span class="mm-w">${s}</span>`, voz: sv(s) }));
  const cartas = ENG.shuffle(pares.flatMap(p => [{ ...p, h: p.a }, { ...p, h: p.b }]));
  const Z = $('#recZona'); Z.innerHTML = `<div class="ll-cab"><span>🃏 Parejas: <b id="mmP">0</b>/${pares.length}</span><span>👆 <b id="mmM">0</b></span></div><div class="mm-tablero n${cartas.length}" id="mmT"></div>`;
  let abiertas = [], hechas = 0, mov = 0, bloq = false, vivo = true;
  const T = $('#mmT');
  cartas.forEach(c => {
    const b = el('button', 'mm-carta', `<span class="mm-dorso">🚀</span><span class="mm-cara">${c.h}</span>`);
    b.onclick = () => {
      if (bloq || b.classList.contains('vuelta') || !vivo) return;
      SFX.pop(); b.classList.add('vuelta'); abiertas.push([b, c]);
      if (abiertas.length < 2) return;
      mov++; $('#mmM').textContent = mov;
      const [[b1, c1], [b2, c2]] = abiertas; abiertas = [];
      if (c1.k === c2.k) {
        hechas++; $('#mmP').textContent = hechas; setTimeout(() => { b1.classList.add('ok'); b2.classList.add('ok'); SFX.ok(); FX.chispas(b2, 16); VOZ.decir(c1.voz); }, 250);
        if (hechas === pares.length) { vivo = false; REC.fin = null; const pts = Math.max(10, 100 - (mov - pares.length) * 8); setTimeout(() => finJuego('memory', pts, mov <= pares.length + 3 ? '¡Memoria de robot!' : '¡Todas las parejas!', Math.min(25, Math.round(pts / 4))), 1300); }
      } else { bloq = true; setTimeout(() => { b1.classList.remove('vuelta'); b2.classList.remove('vuelta'); bloq = false; }, 950); }
    };
    T.appendChild(b);
  });
  REC.fin = () => { vivo = false; REC.fin = null; };
  VOZ.decir(pal.length >= np + 2 ? 'Busca cada palabra y su dibujo. ¡Léelas bien!' : 'Une cada letra mayúscula con su minúscula.');
}

/* 3 · Carrera de cohetes contra el robot rival */
function juegoCarrera() {
  const lv = nivelActual(), META = 8, pal = palabrasDibujo(lv), conPal = pal.length >= 8, sil = silabasHasta(lv);
  const Z = $('#recZona');
  Z.innerHTML = `<div class="cr-pista"><div class="cr-carril"><span class="cr-yo" id="crYo">${robotHTML(NINO.color, 'vuela')}</span><span class="cr-meta">🏁</span></div>
    <div class="cr-carril rival"><span class="cr-rival" id="crRiv">🤖</span><span class="cr-meta">🏁</span></div></div>
    <div class="cr-preg" id="crPreg"></div><div class="cr-ops" id="crOps"></div>`;
  let yo = 0, riv = 0, vivo = true, aciertos = 0, ultima = null;
  requestAnimationFrame(() => decora($('#crYo .robot')));
  const mueve = () => { $('#crYo').style.left = `calc(${yo / META * 84}% )`; $('#crRiv').style.left = `calc(${riv / META * 84}% )`; };
  const ritmo = (NINO.edad <= 5 ? 5200 : NINO.edad === 6 ? 4300 : 3500) + (conPal ? 0 : 600);
  const tR = setInterval(() => { if (!vivo) return; riv++; mueve(); SFX.pop(); if (riv >= META) acabar(false); }, ritmo);
  function preg() {
    if (!vivo) return;
    const P = $('#crPreg'), O = $('#crOps'); O.innerHTML = '';
    let ok, opts, cont;
    if (conPal) {
      do { ok = pick(pal); } while (ok === ultima); ultima = ok;
      opts = ENG.shuffle([ok, ...ENG.shuffle(pal.filter(p => p !== ok)).slice(0, 2)]);
      P.innerHTML = `<span class="cr-w">${ok.w}</span>`; cont = p => `<span class="mm-e">${p.e}</span>`;
    } else {
      do { ok = pick(sil); } while (ok === ultima); ultima = ok;
      opts = ENG.shuffle([ok, ...ENG.shuffle(sil.filter(s => s !== ok)).slice(0, 2)]);
      P.innerHTML = `<button class="btn btn-azul" id="crOir">🔊 Escuchar</button>`; $('#crOir').onclick = () => VOZ.decir(sv(ok), { rate: .8 }); VOZ.decir(sv(ok), { rate: .8 });
      cont = s => `<span class="mm-w">${s}</span>`;
    }
    opts.forEach(o => {
      const b = el('button', 'cr-op', cont(o));
      b.onclick = () => {
        if (!vivo) return;
        if (o === ok) { SFX.ok(); FX.chispas(b, 14); yo++; aciertos++; mueve(); if (yo >= META) acabar(true); else preg(); }
        else { SFX.mal(); b.classList.add('mal'); b.disabled = true; }
      };
      O.appendChild(b);
    });
  }
  function acabar(gano, salir) {
    if (!vivo) return; vivo = false; clearInterval(tR); REC.fin = null;
    if (salir) return;
    setTimeout(() => finJuego('carrera', aciertos * 10 + (gano ? 50 : 0), gano ? '¡Has ganado la carrera!' : '¡Uy, el rival llegó primero! La próxima es tuya.', gano ? 20 : 8), 600);
  }
  REC.fin = (salir) => acabar(false, salir);
  mueve(); VOZ.decir(conPal ? '¡Preparados, listos, ya! Lee la palabra y toca su dibujo.' : '¡Preparados, listos, ya! Escucha y toca la sílaba.'); setTimeout(preg, 300);
}

/* ---------------- DIPLOMAS ---------------- */
const DIPLOMAS = [
  { r: 'Cadete Espacial', ic: '🥉', c: '#cd7f32' }, { r: 'Piloto Estelar', ic: '🥈', c: '#c9d6e3' }, { r: 'Capitán Galáctico', ic: '🥇', c: '#ffd23f' },
  { r: 'Comandante Cósmico', ic: '🏅', c: '#18e0ff' }, { r: 'Gran Maestro Lector', ic: '🏆', c: '#17ff5f' }];
function dipLetras(g) { return PLANETAS.slice(g * 5, g * 5 + 5).map(p => p.letra.replace('📖', 'lectura')).join(' · '); }
function dipGanado(g) { if (gratisAdmin()) return true; const d = datos(); for (let i = g * 5; i < g * 5 + 5; i++) if (!(d.plan[i] && d.plan[i].e > 0)) return false; return true; }
function dipProgreso(g) { const d = datos(); let n = 0; for (let i = g * 5; i < g * 5 + 5; i++) if (d.plan[i] && d.plan[i].e > 0) n++; return n; }
ON_PANTALLA.pDiplomas = () => {
  if (!NINO) { ir('perfiles'); return; }
  const D = $('#dipLista'); D.innerHTML = '';
  let n = 0;
  DIPLOMAS.forEach((dp, g) => {
    const ok = dipGanado(g); if (ok) n++;
    const b = el('button', 'dip-item' + (ok ? '' : ' no'), `<span class="dip-ic" style="--c:${dp.c}">${ok ? dp.ic : '🔒'}</span><span class="dip-t"><b>${dp.r}</b><small>Planetas ${g * 5 + 1} al ${g * 5 + 5}: ${dipLetras(g)}</small>
      ${ok ? '<em>¡Conseguido! Toca para verlo</em>' : `<span class="dip-barra"><i style="width:${dipProgreso(g) * 20}%"></i></span>`}</span>`);
    b.onclick = () => { SFX.clic(); if (ok) verDiploma(g); else VOZ.decir(`Para conseguir el diploma de ${dp.r}, completa los planetas del ${g * 5 + 1} al ${g * 5 + 5}. Llevas ${dipProgreso(g)}.`); };
    D.appendChild(b);
  });
  VOZ.decir(n ? `Tienes ${n} diploma${n > 1 ? 's' : ''}. ¡Enhorabuena!` : 'Aquí guardarás tus diplomas. Completa cinco planetas para conseguir el primero.');
};
function cargaImg(src) { return new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = src; }); }
async function dibujaDiploma(g) {
  const dp = DIPLOMAS[g], W = 1600, H = 1130, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const x = cv.getContext('2d');
  try { await Promise.all(['700 60px Andika', '400 60px "Lilita One"'].map(f => document.fonts.load(f))); } catch (e) {}
  const bg = x.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#0b1633'); bg.addColorStop(1, '#1a0b3d'); x.fillStyle = bg; x.fillRect(0, 0, W, H);
  let sd = g * 97 + 13; const rnd = () => (sd = (sd * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 260; i++) { x.globalAlpha = .3 + rnd() * .7; x.fillStyle = '#fff'; x.beginPath(); x.arc(rnd() * W, rnd() * H, rnd() * 2.2, 0, 7); x.fill(); }
  x.globalAlpha = 1;
  const neb = x.createRadialGradient(W * .8, H * .2, 0, W * .8, H * .2, 520); neb.addColorStop(0, 'rgba(139,92,255,.35)'); neb.addColorStop(1, 'transparent'); x.fillStyle = neb; x.fillRect(0, 0, W, H);
  x.shadowColor = '#17ff5f'; x.shadowBlur = 30; x.strokeStyle = '#17ff5f'; x.lineWidth = 10; x.strokeRect(40, 40, W - 80, H - 80);
  x.shadowBlur = 0; x.strokeStyle = dp.c; x.lineWidth = 3; x.strokeRect(66, 66, W - 132, H - 132);
  x.textAlign = 'center'; x.fillStyle = '#fff';
  x.font = '400 64px "Lilita One", sans-serif'; x.fillText('LEO', W / 2 - 150, 175); x.fillStyle = '#17ff5f'; x.shadowColor = '#17ff5f'; x.shadowBlur = 20; x.fillText('LUCAS', W / 2 + 125, 175); x.shadowBlur = 0;
  x.fillStyle = '#a9c3d9'; x.font = '700 30px Andika, sans-serif'; x.fillText('con', W / 2 - 30, 168);
  x.fillStyle = dp.c; x.font = '400 120px "Lilita One", sans-serif'; x.shadowColor = dp.c; x.shadowBlur = 25; x.fillText('DIPLOMA', W / 2, 320); x.shadowBlur = 0;
  x.fillStyle = '#fff'; x.font = '700 64px Andika, sans-serif'; x.fillText(dp.r, W / 2, 410);
  x.fillStyle = '#a9c3d9'; x.font = '700 34px Andika, sans-serif'; x.fillText('otorgado a', W / 2, 490);
  const nom = NINO.nombre; let fs = 120; x.font = `400 ${fs}px "Lilita One", sans-serif`; while (x.measureText(nom).width > 900 && fs > 60) { fs -= 6; x.font = `400 ${fs}px "Lilita One", sans-serif`; }
  x.fillStyle = '#ffd23f'; x.shadowColor = '#ffb000'; x.shadowBlur = 24; x.fillText(nom, W / 2, 610); x.shadowBlur = 0;
  x.strokeStyle = 'rgba(255,255,255,.35)'; x.lineWidth = 2; x.beginPath(); x.moveTo(W / 2 - 420, 640); x.lineTo(W / 2 + 420, 640); x.stroke();
  x.fillStyle = '#f2fbff'; x.font = '700 36px Andika, sans-serif';
  x.fillText('por aprender a leer en los planetas ' + (g * 5 + 1) + ' al ' + (g * 5 + 5), W / 2, 712);
  x.fillStyle = '#17ff5f'; x.font = '700 40px Andika, sans-serif'; x.fillText(dipLetras(g), W / 2, 772);
  const f = new Date(); x.fillStyle = '#a9c3d9'; x.font = '700 28px Andika, sans-serif';
  x.fillText(f.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }), W / 2, 850);
  /* medalla */
  const mx = 255, my = 860; x.fillStyle = '#ff4d5e'; x.beginPath(); x.moveTo(mx - 50, my - 170); x.lineTo(mx - 10, my - 60); x.lineTo(mx - 85, my - 60); x.fill(); x.fillStyle = '#18b4ff'; x.beginPath(); x.moveTo(mx + 50, my - 170); x.lineTo(mx + 85, my - 60); x.lineTo(mx + 10, my - 60); x.fill();
  const mg = x.createRadialGradient(mx - 20, my - 20, 10, mx, my, 95); mg.addColorStop(0, '#fff'); mg.addColorStop(.3, dp.c); mg.addColorStop(1, '#5a3c00'); x.fillStyle = mg; x.shadowColor = dp.c; x.shadowBlur = 30; x.beginPath(); x.arc(mx, my, 90, 0, 7); x.fill(); x.shadowBlur = 0;
  x.fillStyle = 'rgba(255,255,255,.95)'; x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 26 : 60; x.lineTo(mx + Math.cos(a) * r, my + Math.sin(a) * r); } x.fill();
  x.fillStyle = '#3a2500'; x.font = '400 34px "Lilita One", sans-serif'; x.fillText(String(g + 1), mx, my + 12);
  /* robot */
  const im = imgPj(NINO.color, 'vuela'), ri = await cargaImg(im.src);
  if (ri) { let h = 250, w = ri.width / ri.height * h; if (w > 380) { w = 380; h = w * ri.height / ri.width; } try { x.filter = im.filter || 'none'; } catch (e) {} x.drawImage(ri, W - 95 - w, 95, w, h); x.filter = 'none'; }
  const lg = await cargaImg('img/logo-futurmovil.png');
  if (lg) { const w = 300, h = w * 200 / 1024; x.drawImage(lg, W / 2 - w / 2, H - 135, w, h); }
  return cv.toDataURL('image/png');
}
async function verDiploma(g, nuevo) {
  const dp = DIPLOMAS[g];
  modal(`<div class="dip-modal"><h2>${nuevo ? '¡Diploma nuevo!' : dp.r}</h2><div class="dip-img"><span class="cargando">Preparando diploma…</span></div>
    <div class="dip-bts"><button class="btn btn-verde" id="dipBaja" disabled>⬇️ Descargar</button><button class="btn btn-azul" id="dipComp">📤 Compartir</button></div>
    <button class="btn btn-mini" id="dipCerrar">Cerrar</button></div>`);
  $('#dipCerrar').onclick = () => { SFX.clic(); cerrarModal(); };
  const url = await dibujaDiploma(g);
  const box = $('.dip-img'); if (!box) return;
  box.innerHTML = `<img src="${url}" alt="Diploma">`;
  const nom = `diploma-${NINO.nombre.toLowerCase().replace(/[^a-z0-9ñáéíóú]+/g, '-')}-${g + 1}.png`;
  $('#dipBaja').disabled = false;
  $('#dipBaja').onclick = () => { SFX.clic(); const a = document.createElement('a'); a.href = url; a.download = nom; document.body.appendChild(a); a.click(); a.remove(); toast('Diploma descargado 📄'); };
  $('#dipComp').onclick = async () => {
    SFX.clic();
    const txt = `🏅 ¡${NINO.nombre} ha conseguido el diploma de ${dp.r} en LEO CON LUCAS! 🚀📖\nAprende a leer viajando por el espacio:`;
    const link = 'https://puntofibra.github.io/leoconlucas/';
    if (navigator.share) { try { await navigator.share({ title: 'LEO CON LUCAS', text: txt, url: link }); } catch (e) {} }
    else window.open('https://wa.me/?text=' + encodeURIComponent(txt + ' ' + link), '_blank');
  };
  VOZ.decir(nuevo ? `¡Enhorabuena, ${NINO.nombre}! Has conseguido el diploma de ${dp.r}. Puedes descargarlo para imprimirlo.` : `Diploma de ${dp.r}.`);
}
function compruebaDiplomaNuevo() {
  if (!NINO || gratisAdmin()) return;
  const d = datos(); d.dip = d.dip || [];
  for (let g = 0; g < DIPLOMAS.length; g++) if (dipGanado(g) && !d.dip.includes(g)) {
    d.dip.push(g); d._t = Date.now(); guardarNino();
    setTimeout(() => { if (pantallaActual === 'pMapa') { SFX.fanfarria(); FX.confeti(150); verDiploma(g, true); } else d.dip = d.dip.filter(x => x !== g); }, 4200);
    return;
  }
}

/* ---------------- ENGANCHES con app.js ---------------- */
{
  const pm = ON_PANTALLA.pMapa;
  ON_PANTALLA.pMapa = () => {
    pm();
    if (!NINO) return;
    aplicaFondo(); requestAnimationFrame(decoraTodo);
    $('#bRecreoSub').textContent = tickets() + ' 🎟️';
    compruebaDiplomaNuevo();
  };
  const fm = finMision;
  finMision = async function () {
    const valida = MIS && !MIS.prueba;
    if (valida) { const d = datos(); d.tk = Math.min(TK_MAX, tickets() + 1); }
    const r = await fm.apply(this, arguments);
    if (valida) requestAnimationFrame(() => decora($('#resLucas')));
    return r;
  };
  const se = siguienteEjercicio;
  siguienteEjercicio = function () { const r = se.apply(this, arguments); requestAnimationFrame(() => decora($('#lucasNarra'))); return r; };
  $('#bTaller').onclick = () => { SFX.clic(); ir('taller'); };
  $('#bRecreo').onclick = () => { SFX.clic(); ir('recreo'); };
  $('#bDiplomas').onclick = () => { SFX.clic(); ir('diplomas'); };
}

/* ---------------- ORIENTACIÓN: móvil en vertical · tablet/TV/PC en horizontal ---------------- */
(() => {
  const tactil = matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
  const tipo = () => {
    const corto = Math.min(screen.width, screen.height);
    if (!tactil) return 'pc';                 // PC / TV: libre
    return corto < 600 ? 'movil' : 'tablet';
  };
  const quiere = () => tipo() === 'movil' ? 'portrait' : tipo() === 'tablet' ? 'landscape' : null;
  function bloquea() { const q = quiere(); if (q && screen.orientation && screen.orientation.lock) screen.orientation.lock(q).catch(() => {}); }
  function revisa() {
    const q = quiere(), apaisado = innerWidth > innerHeight;
    const mal = (q === 'portrait' && apaisado) || (q === 'landscape' && !apaisado);
    const g = $('#giraPantalla'); if (!g) return;
    $('#giraTxt').textContent = q === 'portrait' ? 'Pon el móvil en vertical' : 'Pon la tablet en horizontal';
    g.classList.toggle('ver', mal); g.classList.toggle('a-horiz', q === 'landscape');
    if (mal) { try { VOZ.callar(); } catch (e) {} }
  }
  bloquea(); revisa();
  addEventListener('resize', revisa);
  if (screen.orientation) screen.orientation.addEventListener('change', revisa);
  document.addEventListener('click', bloquea, { once: true });   // algunos navegadores solo bloquean tras tocar
})();
