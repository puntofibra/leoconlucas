/* =====================================================================
   LEO CON LUCAS · Motor de lectura
   - calcula el nivel de cada palabra/frase según sus letras
   - genera misiones variadas sin repetir (memoria por niño)
   ===================================================================== */
'use strict';

const ENG = (() => {
  const SIN_TILDE = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u' };
  const quitaTildes = s => s.replace(/[áéíóú]/g, c => SIN_TILDE[c]);
  const VOC = 'aeiouáéíóúü';
  const esVoc = c => !!c && VOC.includes(c);
  const SIMPLE = { m: 1, p: 2, l: 3, s: 4, t: 5, n: 6, d: 7, f: 8, r: 9, b: 11, v: 12, j: 14, 'ñ': 15, z: 18, h: 20, x: 23, k: 23, w: 23 };

  /* Nivel (planeta) mínimo necesario para leer una palabra */
  function nivelPalabra(pal) {
    const w = pal.toLowerCase().replace(/[^a-záéíóúüñ]/g, '');
    if (!w) return 0;
    if (w === 'y') return 0;
    let max = 0;
    for (let i = 0; i < w.length; i++) {
      const c = w[i], n1 = w[i + 1], n2 = w[i + 2];
      let lv = 0;
      if (esVoc(c)) lv = 0;
      else if (c === 'c' && n1 === 'h') { lv = 16; i++; }
      else if (c === 'l' && n1 === 'l') { lv = 17; i++; }
      else if (c === 'r' && n1 === 'r') { lv = 9; i++; }
      else if (c === 'q' && n1 === 'u') { lv = 19; i++; }
      else if (c === 'g' && n1 === 'ü') { lv = 21; i++; }
      else if (c === 'g' && n1 === 'u' && 'eéií'.includes(n2 || '-')) { lv = 21; i++; }
      else if (c === 'g') lv = 'eéií'.includes(n1 || '-') ? 14 : 13;
      else if (c === 'c') lv = 'eéií'.includes(n1 || '-') ? 18 : 10;
      else if (c === 'y') lv = 17;
      else lv = SIMPLE[c] || 0;
      /* sílabas trabadas: pl, pr, bl, br, cl, cr, dr, fl, fr, gl, gr, tr */
      if ('pbcfgtd'.includes(c) && (n1 === 'l' || n1 === 'r') && n2 !== n1 && esVoc(n2) && !(c === 'd' && n1 === 'l') && !(c === 't' && n1 === 'l')) {
        if (!(n1 === 'l' && w[i + 2] === 'l')) lv = Math.max(lv, 22);
      }
      if (lv > max) max = lv;
    }
    return max;
  }
  const nivelTexto = t => t.split(/\s+/).reduce((m, p) => Math.max(m, nivelPalabra(p)), 0);

  /* ---- palabras ---- */
  const vistos = new Set();
  const PAL = [];
  PALABRAS_RAW.trim().split('\n').forEach(l => {
    const [s, e, g] = l.split('|');
    const w = s.replace(/-/g, '');
    if (vistos.has(w)) return; vistos.add(w);
    PAL.push({ w, s: s.split('-'), e: e || '', g: g || 'm', lv: nivelPalabra(w), id: 'p:' + w });
  });
  PALABRAS_LECTURA.forEach(s => {
    const w = s.replace(/-/g, '');
    if (vistos.has(w.toLowerCase())) return; vistos.add(w.toLowerCase());
    PAL.push({ w, s: s.split('-'), e: '', g: 'm', lv: nivelPalabra(w), id: 'p:' + w });
  });
  const CON_DIBUJO = PAL.filter(p => p.e && !/^[A-Z]/.test(p.w));
  const FR = FRASES.map(t => ({ t, lv: nivelTexto(t), id: 'f:' + t }));
  const VF = VERDAD.map(o => ({ t: o.t, v: o.v, lv: nivelTexto(o.t), id: 'v:' + o.t }));
  const CU = CUENTOS.map(c => ({ ...c, lv: nivelTexto(c.x), id: 'c:' + c.t }));
  const PLT = PLANTILLAS.map(t => ({ t, lv: nivelTexto(t.replace(/\{[^}]+\}/g, '')) }));

  /* ---- azar ---- */
  const rnd = n => Math.floor(Math.random() * n);
  const pick = a => a[rnd(a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* ---- memoria anti-repetición ----
     mem.seen[id] = marca de tiempo de la última vez visto
     mem.fail[id] = fallos acumulados (se repiten más las palabras difíciles) */
  let MEM = { seen: {}, fail: {} };
  const usadosSesion = new Set();
  function setMem(m) { MEM = m; MEM.seen = MEM.seen || {}; MEM.fail = MEM.fail || {}; }
  function peso(it) {
    const t = MEM.seen[it.id];
    let w;
    if (!t) w = 10;                                  // nunca visto: prioridad máxima
    else { const dias = (Date.now() - t) / 864e5; w = Math.min(8, 0.2 + dias * 1.6); }
    if (MEM.fail[it.id]) w += Math.min(6, MEM.fail[it.id] * 2);
    if (usadosSesion.has(it.id)) w *= 0.02;
    return w;
  }
  function elige(lista, n = 1, filtro) {
    let pool = filtro ? lista.filter(filtro) : lista.slice();
    const out = [];
    while (out.length < n && pool.length) {
      const pesos = pool.map(peso), tot = pesos.reduce((a, b) => a + b, 0);
      let r = Math.random() * tot, i = 0;
      while (r > pesos[i] && i < pool.length - 1) r -= pesos[i++];
      out.push(pool[i]); usadosSesion.add(pool[i].id); pool.splice(i, 1);
    }
    return n === 1 ? out[0] : out;
  }
  function marca(id, ok) {
    MEM.seen[id] = Date.now();
    if (!ok) MEM.fail[id] = (MEM.fail[id] || 0) + 1;
    else if (MEM.fail[id]) { MEM.fail[id]--; if (!MEM.fail[id]) delete MEM.fail[id]; }
    const ks = Object.keys(MEM.seen);
    if (ks.length > 1400) ks.sort((a, b) => MEM.seen[a] - MEM.seen[b]).slice(0, 300).forEach(k => delete MEM.seen[k]);
  }
  function nuevaSesion() { usadosSesion.clear(); }

  /* ---- utilidades de palabras ---- */
  const art = (p, tipo) => tipo === 'el' ? (p.g === 'f' ? 'la' : 'el') : tipo === 'un' ? (p.g === 'f' ? 'una' : 'un') : '';
  function frasePlantilla(t, p) {
    return t.replace('{el}', art(p, 'el')).replace('{un}', art(p, 'un')).replace('{n}', p.w);
  }
  /* palabras disponibles para un nivel; foco = las que usan la letra nueva */
  function palabras(lv, conDibujo) {
    const base = (conDibujo ? CON_DIBUJO : PAL).filter(p => p.lv <= lv);
    return base;
  }
  function eligePalabra(lv, conDibujo, excluir = []) {
    const base = palabras(lv, conDibujo).filter(p => !excluir.includes(p.w) && !excluir.includes(p.e));
    if (!base.length) return null;
    const foco = base.filter(p => p.lv === lv);
    const usarFoco = foco.length >= 2 && Math.random() < 0.6;
    return elige(usarFoco ? foco : base);
  }
  /* distractores con dibujo distinto, preferentemente parecidos */
  function distractores(obj, lv, n, conDibujo = true) {
    let base = palabras(Math.max(lv, 3), conDibujo).filter(p => p.w !== obj.w && (!conDibujo || p.e !== obj.e));
    if (base.length < n) base = (conDibujo ? CON_DIBUJO : PAL).filter(p => p.w !== obj.w && p.e !== obj.e);
    const parecidas = base.filter(p => p.s.length === obj.s.length && (p.w[0] === obj.w[0] || p.s.some(x => obj.s.includes(x))));
    const out = shuffle(parecidas).slice(0, Math.ceil(n / 2));
    shuffle(base).forEach(p => { if (out.length < n && !out.includes(p) && !out.some(o => o.e && o.e === p.e)) out.push(p); });
    return out.slice(0, n);
  }
  function silabasNivel(lv) {
    const s = [];
    for (let i = 0; i <= lv && i < PLANETAS.length; i++) s.push(...PLANETAS[i].silabas);
    return s;
  }

  /* ---- GENERADORES DE EJERCICIOS ---- */
  const G = {};
  /* letra o sílaba que se escucha */
  G.escucha = (lv, op) => {
    const propias = PLANETAS[Math.min(lv, 23)].silabas;
    const todas = silabasNivel(lv);
    const x = Math.random() < 0.7 ? pick(propias) : pick(todas);
    const opts = shuffle([x, ...shuffle(todas.filter(s => s !== x && s.length === x.length)).slice(0, op - 1)]);
    if (opts.length < 2) return null;
    return { tipo: 'escucha', x, opts, id: 's:' + x };
  };
  G.globos = (lv) => {
    const propias = PLANETAS[Math.min(lv, 23)].silabas;
    const x = pick(propias);
    const otras = silabasNivel(lv).filter(s => s !== x);
    if (otras.length < 3) return null;
    return { tipo: 'globos', x, otras, id: 's:' + x };
  };
  G.palimg = (lv, op) => {
    const p = eligePalabra(lv, true); if (!p) return null;
    const d = distractores(p, lv, op - 1);
    return { tipo: 'palimg', p, opts: shuffle([p, ...d]), id: p.id };
  };
  G.imgpal = (lv, op) => {
    const p = eligePalabra(lv, true); if (!p) return null;
    const d = distractores(p, lv, op - 1, false).filter(x => x.lv <= Math.max(lv, 3));
    if (d.length < op - 1) d.push(...distractores(p, lv, op - 1 - d.length, false));
    return { tipo: 'imgpal', p, opts: shuffle([p, ...d.slice(0, op - 1)]), id: p.id };
  };
  G.forma = (lv) => {
    const p = elige(palabras(lv, true).filter(x => x.s.length >= 2 && x.s.length <= 4)); if (!p) return null;
    const extra = pick(silabasNivel(lv).filter(s => !p.s.includes(s)));
    return { tipo: 'forma', p, piezas: shuffle([...p.s, extra].filter(Boolean)), id: p.id };
  };
  G.falta = (lv, op) => {
    const p = elige(palabras(lv, true).filter(x => x.s.length >= 2)); if (!p) return null;
    const i = rnd(p.s.length);
    const x = p.s[i];
    const otras = shuffle(silabasNivel(lv).filter(s => s !== x && !p.s.includes(s))).slice(0, op - 1);
    return { tipo: 'falta', p, i, opts: shuffle([x, ...otras]), id: p.id };
  };
  G.inicial = (lv, op) => {
    const p = elige(palabras(lv, true).filter(x => esVoc(quitaTildes(x.w[0])) || lv > 0)); if (!p) return null;
    const x = quitaTildes(p.w[0]);
    const letras = [...new Set(silabasNivel(lv).map(s => s[0]))].filter(l => l !== x);
    const opts = shuffle([x, ...shuffle(letras).slice(0, op - 1)]);
    return { tipo: 'inicial', p, x, opts, id: p.id };
  };
  G.frase = (lv, op) => {
    const plts = PLT.filter(t => t.lv <= lv); if (!plts.length) return null;
    const p = eligePalabra(lv, true); if (!p) return null;
    const t = pick(plts).t;
    const texto = frasePlantilla(t, p);
    if (nivelTexto(texto) > lv) return null;
    return { tipo: 'frase', texto, p, opts: shuffle([p, ...distractores(p, lv, op - 1)]), id: 'fp:' + texto };
  };
  G.verdad = (lv) => {
    const f = elige(VF, 1, x => x.lv <= lv); if (!f) return null;
    return { tipo: 'verdad', f, id: f.id };
  };
  G.ordena = (lv, op, edad) => {
    const max = edad <= 5 ? 4 : edad === 6 ? 5 : 7;
    let f = elige(FR, 1, x => x.lv <= lv && x.t.split(' ').length >= 3 && x.t.split(' ').length <= max);
    if (!f) {
      const plts = PLT.filter(t => t.lv <= lv && t.t.split(' ').length >= 3); const p = eligePalabra(lv, true);
      if (!plts.length || !p) return null;
      const t = frasePlantilla(pick(plts).t, p); f = { t, id: 'fo:' + t };
    }
    const pals = f.t.split(' ');
    let mez = shuffle(pals); let k = 0; while (mez.join(' ') === f.t && k++ < 5) mez = shuffle(pals);
    return { tipo: 'ordena', f, pals, mez, id: f.id };
  };
  G.cuento = (lv) => {
    const c = elige(CU, 1, x => x.lv <= lv); if (!c) return null;
    return { tipo: 'cuento', c, id: c.id };
  };
  G.une = (lv) => {
    const ps = []; for (let i = 0; i < 3; i++) { const p = eligePalabra(lv, true, ps.flatMap(x => [x.w, x.e])); if (p) ps.push(p); }
    if (ps.length < 3) return null;
    return { tipo: 'une', ps, der: shuffle(ps), id: 'u:' + ps.map(p => p.w).join() };
  };
  G.traza = (lv) => {
    const L = PLANETAS[Math.min(lv, 23)];
    const letras = L.id === 0 ? ['a', 'e', 'i', 'o', 'u'] : L.letra.split(' ').map(s => s.length > 2 ? s[0] : s).filter(s => s.length <= 2);
    const x = pick(letras);
    return { tipo: 'traza', x, id: 't:' + x };
  };
  G.voz = (lv) => {
    const p = eligePalabra(lv, false); if (!p) return null;
    return { tipo: 'voz', p, id: p.id };
  };
  G.silabas = (lv) => {
    const p = elige(palabras(lv, true).filter(x => x.s.length <= 5)); if (!p) return null;
    return { tipo: 'silabas', p, id: p.id };
  };

  /* qué ejercicios encajan en cada nivel (peso) */
  function tipos(lv, edad, voz) {
    if (lv === 0) return { escucha: 4, globos: 3, traza: 3, inicial: 3, silabas: 1 };
    const t = { escucha: lv < 6 ? 3 : 1, globos: lv < 10 ? 2 : 1, palimg: 4, imgpal: 4, forma: 3, falta: 3,
      une: 2, inicial: lv < 4 ? 2 : 0.5, silabas: 1, traza: lv < 18 ? 1.5 : 0 };
    if (lv >= 1) t.frase = lv < 3 ? 1 : 3;
    if (lv >= 3) t.ordena = 2;
    if (lv >= 5) t.verdad = 2.5;
    if (lv >= 1) t.cuento = lv >= 24 ? 6 : lv >= 6 ? 1.2 : 0.6;
    if (voz && lv >= 2) t.voz = 1;
    if (edad >= 7) { t.escucha *= 0.5; t.globos *= 0.6; if (t.verdad) t.verdad += 1; if (t.cuento) t.cuento += 0.8; }
    if (lv >= 24) { t.ordena = 3; t.verdad = 3; t.frase = 2; t.traza = 0; t.escucha = 0; t.globos = 0.5; }
    return t;
  }
  function eligeTipo(t, evitar) {
    const ks = Object.keys(t).filter(k => t[k] > 0 && k !== evitar);
    const tot = ks.reduce((a, k) => a + t[k], 0);
    let r = Math.random() * tot;
    for (const k of ks) { r -= t[k]; if (r <= 0) return k; }
    return ks[0];
  }
  /* Genera una misión. lv = planeta; repaso = mezcla de todos los niveles desbloqueados */
  function mision({ lv, edad = 6, n = 8, repaso = false, voz = false, maxLv }) {
    nuevaSesion();
    const op = edad <= 5 ? 3 : edad >= 7 ? 4 : 3 + (lv >= 6 ? 1 : 0);
    const out = []; let prev = null, tries = 0, cuentos = 0;
    while (out.length < n && tries++ < 200) {
      const L = repaso ? Math.max(0, (maxLv || lv) - rnd(4)) : lv;
      const tp = eligeTipo(tipos(L, edad, voz), prev);
      if (tp === 'cuento' && cuentos >= 1) continue;
      const ej = G[tp](L, op, edad);
      if (!ej) continue;
      ej.lv = L; out.push(ej); prev = tp; if (tp === 'cuento') cuentos++;
    }
    return out;
  }

  return { nivelPalabra, nivelTexto, PAL, CON_DIBUJO, FR, VF, CU, mision, marca, setMem, getMem: () => MEM, shuffle, pick, rnd, quitaTildes, G };
})();
if (typeof module !== 'undefined') module.exports = ENG;
