/* =====================================================================
   ESCENAS · motor de ilustraciones animadas para "Un cuento cada día"
   ---------------------------------------------------------------------
   Los dibujos NO se duplican: se cogen de COSMOLUCAS (mismo dominio,
   puntofibra.github.io/turbolucas/img/sd|hd/…). Los recursos nuevos de
   cuentos también se suben allí (prefijo cu-) para que el juego pueda
   usarlos. Si un recurso nuevo todavía no existe, se usa un sustituto
   del catálogo o, en último caso, un emoji con brillo.

   Escena (P.s en cada página del cuento):
     { b: 'hospital',                 fondo (ver FONDOS)
       l: 'noche',                    luz: dia | tarde | noche | amanecer | magia | lampara
       p: [['lucas', 25, 'h', 'celebrando'], ['doctora', 70, 'f<']],
                                      personajes: [id, x%, estados, pose]
                                      estados: h habla · f feliz · a acción · t triste · d duerme
                                      v vuela · s salta · e entra · < mira a la izquierda · g grande · m pequeño
       o: [['it-venda', 50, 40, 'brillo']],  objetos: [id, x%, y% (desde el suelo), efecto, tamaño]
                                      efectos: brillo | aparece | cae | gira | late | flota | vuela | fijo
       f: 'nieve estrellas',          partículas
       c: 'zoom' }                    cámara: zoom | tiembla | pan | foco
   ===================================================================== */
var ESC = (() => {
  const BASE = '/turbolucas/img/';
  const calidad = () => (Math.min(innerWidth, innerHeight) * Math.min(2, devicePixelRatio || 1) > 1000 ? 'hd/' : 'sd/');
  const src = id => id.startsWith('lcl:') ? 'img/' + id.slice(4) + '.png' : BASE + calidad() + id + '.webp';

  /* ---------------- personajes ---------------- */
  const LCL = n => ({ img: 'lcl:personajes/' + n + '-senala', vuelaImg: 'lcl:personajes/' + n + '-vuela', fuego: n, h: .9 });
  const PJ = {
    lucas: { lucas: true, h: .82, nom: 'Lucas' },
    blue: { img: 'pj-lucas2', h: .86, nom: 'Blue' },
    nova: Object.assign(LCL('nova'), { nom: 'Nova' }), luna: Object.assign(LCL('luna'), { nom: 'Luna' }), aqua: Object.assign(LCL('aqua'), { nom: 'Aqua' }),
    chispa: Object.assign(LCL('chispa'), { nom: 'Chispa' }), max: Object.assign(LCL('max'), { nom: 'Max' }), turbo: Object.assign(LCL('turbo'), { nom: 'Turbo' }),
    chispita: { img: 'anim-chispita', fr: 4, h: .5, nom: 'Chispita' },
    medusa: { img: 'anim-medusas', fr: 4, fijo: 1, h: .5, vuela: 1 },
    /* personajes nuevos de cuentos (se suben a COSMOLUCAS como cu-*.webp); mientras no estén, emoji grande con brillo */
    noel: { img: 'cu-papa-noel', fr: 4, h: 1.05, emo: '🎅', nom: 'Papá Noel' }, reno: { img: 'cu-reno', fr: 4, h: .95, emo: '🦌', nom: 'Reno' },
    melchor: { img: 'cu-rey-melchor', fr: 4, h: 1.05, emo: '🤴', nom: 'Melchor' }, gaspar: { img: 'cu-rey-gaspar', fr: 4, h: 1.05, emo: '🤴', nom: 'Gaspar' },
    baltasar: { img: 'cu-rey-baltasar', fr: 4, h: 1.05, emo: '🤴', nom: 'Baltasar' }
  };
  const ANIM = { doctora: 1, profe: 1, chef: 1, granjera: 1, bombera: 1, cartero: 1, mago: 1, buho: .8, sirenita: 1, venda: .95, concha: .62, bolita: .8,
    rayo: 1, byte: 1, chispas: .7, tuercas: 1, tambor: 1, pelusin: .78, helice: .6, muelle: .85, copito: .9, brisa: .95, escarcha: 1.15, brasa: .95, magma: 1.15,
    saltarin: .9, musgo: 1.1, hoja: 1, tictac: 1, campanita: .85, recicla: 1, plumita: .6, giro: 1, gato: .9, algodon: .7, pincho: 1, arenita: .7, almeja: .7,
    pinzas: .7, tinta: .8, globito: .62, medi: .8, dientes: .7, reina: 1, cascabel: 1, chispazo: 1,
    boti: .62, pulpito: .7, saltitos: .95 };
  const VUELAN = new Set(['buho', 'helice', 'plumita', 'algodon', 'globito', 'medi', 'dientes', 'tinta', 'campanita', 'brisa', 'medusa', 'reina', 'sirenita']);
  Object.keys(ANIM).forEach(k => { PJ[k] = { img: 'anim-' + k, fr: 4, h: ANIM[k], vuela: VUELAN.has(k) }; });
  PJ.bolita.triste = 'anim-bolita-triste';
  const LUCAS_TL = ['quieto', 'celebrando', 'avanzando', 'serio', 'golpeado', 'saltando', 'agachado', 'cayendo'];
  const LUCAS_LCL = { senala: 'lucas-senala', vuela: 'lucas-vuela', dormido: null, gamer: null, caido: 'lucas-caido', propulsor: 'lucas-propulsor', capa: 'lucas-senala-capa' };

  /* ---------------- recursos nuevos (aún por generar) ----------------
     id → [sustituto del catálogo o null, emoji de emergencia]          */
  const NUEVOS = {
    'cu-arbol-navidad': ['deco-hielo-3', '🎄'], 'cu-papa-noel': [null, '🎅'], 'cu-reno': [null, '🦌'], 'cu-trineo': [null, '🛷'],
    'cu-calcetin': [null, '🧦'], 'cu-bola-navidad': ['it-perla', '🔴'], 'cu-turron': ['it-galleta', '🍫'], 'cu-uvas': [null, '🍇'],
    'cu-roscon': ['it-tarta', '🥯'], 'cu-gorro-noel': [null, '🎅'], 'cu-baston-caramelo': ['it-caramelo', '🍭'], 'cu-carbon': [null, '⚫'],
    'cu-guirnalda': ['deco-fiesta-1', '🎊'], 'cu-acebo': ['it-hoja', '🌿'], 'cu-carta': ['it-invitacion', '✉️'], 'cu-chimenea': ['mq-horno-0', '🔥'],
    'cu-muneco-nieve': ['deco-hielo-1', '⛄'], 'cu-castanas': [null, '🌰'], 'cu-paraguas-abierto': ['it-paraguas', '☂️'], 'cu-calabaza': [null, '🎃'],
    'cu-bufanda': [null, '🧣'], 'cu-manta': [null, '🛏️'], 'cu-reloj-campanadas': ['deco-reloj-0', '🕛'], 'cu-bombo-loteria': [null, '🎱'],
    'cu-bola-loteria': ['it-perla', '🔵'], 'cu-belen-estrella': ['it-estrella', '⭐'], 'cu-farolillo': ['it-vela', '🏮'], 'cu-semilla-brote': ['it-semilla', '🌱'],
    'cu-hoja-otono': ['it-hoja', '🍁'], 'cu-seta-bosque': ['it-seta', '🍄'], 'cu-telescopio-grande': ['it-telescopio', '🔭'], 'cu-pastel-cumple': ['adv-tarta', '🎂'],
    'cu-rey-melchor': [null, '👑'], 'cu-rey-gaspar': [null, '👑'], 'cu-rey-baltasar': [null, '👑'], 'cu-camello': [null, '🐪']
  };
  const real = id => (id.startsWith('cu-') && FALTA.has(id) && NUEVOS[id] && NUEVOS[id][0]) ? NUEVOS[id][0] : id;

  /* ---------------- fondos ---------------- */
  const FONDOS = {};
  ['acuario', 'barco', 'biblioteca', 'caja', 'carpa', 'casaarbol', 'chatarra', 'cielo', 'cine', 'cocina', 'correos', 'cueva', 'desierto', 'dormitorio', 'escuela',
    'estacion', 'faro', 'fiesta', 'forja', 'fortaleza', 'granja', 'hielo', 'hospital', 'invernadero', 'jugueteria', 'laboratorio', 'maquinas', 'mazmorra', 'mercado',
    'mina', 'museo', 'observatorio', 'oceano', 'pasteleria', 'piramide', 'pociones', 'selva', 'sotano', 'taller', 'teatro', 'templo', 'tienda', 'trono', 'volcan']
    .forEach(n => { FONDOS[n] = { sala: 'sala-' + n, piso: 5 }; });
  FONDOS.oceano.agua = FONDOS.acuario.agua = 1;
  const EXT = (lejos, cerca, suelo, extra) => Object.assign({ ext: 1, lejos, cerca, suelo, piso: 12 }, extra || {});
  Object.assign(FONDOS, {
    ciudad: EXT('fondo-lejos', 'fondo-cerca', 'suelo'),
    calle: EXT('fondo-lejos', 'fondo-cerca-jugueteria', 'suelo'),
    nieve: EXT('fondo-lejos-hielo', 'fondo-cerca-hielo', 'suelo-hielo', { frio: 1 }),
    bosque: EXT('fondo-lejos-selva', 'fondo-cerca-selva', 'suelo-selva'),
    parque: EXT('fondo-lejos', 'fondo-cerca-selva', 'suelo-selva'),
    desierto_ext: EXT('fondo-lejos-desierto', 'fondo-cerca-desierto', 'suelo-desierto-arriba'),
    juguetes: EXT('fondo-lejos-jugueteria', 'fondo-cerca-jugueteria', 'suelo-jugueteria-arriba'),
    nubes: EXT('fondo-lejos-cielo', 'fondo-cerca-cielo', 'suelo-cielo-arriba'),
    fondomar: EXT('fondo-lejos-oceano', 'fondo-cerca-oceano', 'suelo-oceano-arriba', { agua: 1 }),
    chatarreria: EXT('fondo-lejos-chatarra', 'fondo-cerca-chatarra', 'suelo-chatarra-arriba'),
    lava: EXT('fondo-lejos-lava', 'fondo-cerca-lava', 'suelo-lava'),
    playa: { ext: 1, playa: 1, piso: 10 },
    espacio: { espacio: 1, piso: 30 },
    luna_sup: { espacio: 1, superficie: 1, piso: 14 }
  });

  /* ---------------- precarga ---------------- */
  const DIM = {}; const FALTA = new Set();
  function carga1(id) {
    const s = src(id); if (DIM[s] || FALTA.has(id)) return Promise.resolve();
    return new Promise(res => {
      const im = new Image(); let ok = false; const t = setTimeout(() => { if (!ok) { FALTA.add(id); res(); } }, 9000);
      im.onload = () => { ok = true; clearTimeout(t); DIM[s] = { w: im.naturalWidth, h: im.naturalHeight }; res(); };
      im.onerror = () => { clearTimeout(t); FALTA.add(id); res(); }; im.src = s;
    });
  }
  function idsDe(esc) {
    const out = new Set(); if (!esc) return out;
    const F = FONDOS[esc.b] || FONDOS.dormitorio;
    if (F.sala) out.add(F.sala); if (F.lejos) out.add(F.lejos); if (F.cerca) out.add(F.cerca); if (F.suelo) out.add(F.suelo);
    if (esc.a) out.add(esc.a);
    (esc.p || []).forEach(p => { const d = PJ[p[0]]; if (!d) return; imgsPj(d, p[2] || '', p[3]).forEach(i => out.add(i)); });
    (esc.o || []).forEach(o => out.add(o[0]));
    return out;
  }
  function imgsPj(d, st, pose) {
    if (d.lucas) { const ps = pose || (st.includes('d') ? 'dormido' : st.includes('v') ? 'vuela' : st.includes('f') ? 'celebrando' : 'quieto'); return [lucasImg(ps)]; }
    const r = [d.img]; if (d.triste && st.includes('t')) r.push(d.triste); if (d.vuelaImg && st.includes('v')) r.push(d.vuelaImg); return r;
  }
  const lucasImg = ps => LUCAS_TL.includes(ps) ? 'lucas-' + ps : 'lcl:lucas/' + (ps in LUCAS_LCL ? ps.replace('capa', 'senala-capa') : 'senala');
  async function precarga(cuento, onProg) {
    const ids = new Set(['lcl:luna']); (cuento.p || []).forEach(P => idsDe(P.s).forEach(i => ids.add(i)));
    (cuento.q || []).forEach(q => q.o.forEach(o => { const m = /^@(\S+)/.exec(o); if (m) ids.add(m[1].startsWith('pj:') ? null : m[1]); }));
    ids.delete(null);
    const L = [...ids]; let n = 0;
    await Promise.all(L.map(i => carga1(i).then(() => { n++; onProg && onProg(n / L.length); })));
    /* recursos nuevos que faltan: cargar su sustituto */
    const sust = L.filter(i => FALTA.has(i) && NUEVOS[i] && NUEVOS[i][0]).map(i => NUEVOS[i][0]);
    await Promise.all(sust.map(carga1));
  }

  /* ---------------- CSS (inyectado: todo el motor en un archivo) ---------------- */
  const CSS = `
.esc{position:relative;width:100%;aspect-ratio:16/10;max-height:56vh;border-radius:22px;overflow:hidden;background:#0a0f2c;
  box-shadow:0 0 0 2px rgba(123,108,255,.45),0 14px 40px rgba(0,0,0,.55),0 0 50px rgba(123,108,255,.18);isolation:isolate;contain:layout paint}
@media (orientation:landscape) and (min-width:900px){.esc{max-height:60vh}}
.esc *{box-sizing:border-box}
.esc-cam{position:absolute;inset:0;transform-origin:50% 60%;will-change:transform}
#pCuento .cuento-cuerpo{max-width:1400px}
#pCuento .cuento-cuerpo .cu-portada-esc{max-width:900px}
.esc-mundo{position:absolute;top:0;bottom:0;left:0;width:100%;will-change:transform}
.esc-mundo.mueve{transition:transform 1.8s cubic-bezier(.45,0,.25,1)}
@media (orientation:landscape) and (min-aspect-ratio:4/3){
  .cu-escena.esc-modo{display:grid;width:100%;max-width:1400px;margin:0 auto;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);grid-template-areas:"prog prog" "esc txt" "esc btn";gap:10px 14px;align-items:start}
  .cu-escena.esc-modo .cu-prog{grid-area:prog;justify-self:center}.cu-escena.esc-modo #cuEsc{grid-area:esc}
  .cu-escena.esc-modo .cu-texto{grid-area:txt;font-size:clamp(16px,2.2vw,26px);line-height:1.5;padding:12px 16px;max-height:66vh;overflow:auto;scroll-behavior:smooth}
  .cu-escena.esc-modo .fila-btns{grid-area:btn}.cu-escena.esc-modo .esc{max-height:78vh}}
.esc-cam.kb{animation:escKB 14s ease-out forwards}
.esc-cam.zoom{animation:escZoom 9s cubic-bezier(.2,.6,.3,1) forwards}
.esc-cam.pan{animation:escPan 12s ease-in-out infinite alternate}
.esc-cam.tiembla{animation:escTiembla .7s linear 2,escKB 14s ease-out forwards}
@keyframes escKB{from{transform:scale(1.01)}to{transform:scale(1.06)}}
@keyframes escZoom{from{transform:scale(1)}to{transform:scale(1.16)}}
@keyframes escPan{from{transform:scale(1.1) translateX(-3.5%)}to{transform:scale(1.1) translateX(3.5%)}}
@keyframes escTiembla{0%,100%{transform:translate(0,0)}20%{transform:translate(-1.2%,.6%)}40%{transform:translate(1.1%,-.8%)}60%{transform:translate(-.8%,.9%)}80%{transform:translate(.9%,-.4%)}}
.esc-fondo{position:absolute;inset:-2%;}
.esc-sala{position:absolute;inset:0;background-size:cover;background-position:50% 60%}
.esc-cielo{position:absolute;inset:0}
.esc-capa{position:absolute;left:-10%;width:120%;background-repeat:repeat-x;background-position:0 100%;background-size:auto 100%}
.esc-capa.lejos{bottom:18%;height:42%;opacity:.9;animation:escDeriva 90s linear infinite}
.esc-capa.cerca{bottom:12%;height:46%;animation:escDeriva 60s linear infinite}
.esc-capa.suelo{bottom:0;height:16%;left:0;width:100%;background-size:auto 100%;background-position:0 0}
@keyframes escDeriva{from{background-position-x:0}to{background-position-x:-1000px}}
.esc-astro{position:absolute;width:15%;right:9%;top:8%;filter:drop-shadow(0 0 22px rgba(255,240,200,.7));animation:escFlota 8s ease-in-out infinite}
.esc-astro.luna{filter:drop-shadow(0 0 18px #fff) drop-shadow(0 0 46px rgba(255,255,255,.75))}
.esc-sol{position:absolute;width:16%;aspect-ratio:1;right:10%;top:9%;border-radius:50%;background:radial-gradient(circle,#fffbe0 0 35%,#ffd75e 55%,rgba(255,190,60,0) 72%);
  box-shadow:0 0 60px 30px rgba(255,214,90,.45);animation:escLate 4s ease-in-out infinite}
.esc-estrellas i{position:absolute;width:3px;height:3px;border-radius:50%;background:#fff;box-shadow:0 0 6px #fff;animation:escTwinkle 2.4s ease-in-out infinite}
@keyframes escTwinkle{0%,100%{opacity:.25;transform:scale(.6)}50%{opacity:1;transform:scale(1.2)}}
.esc-mar{position:absolute;left:0;right:0;bottom:12%;height:30%;background:linear-gradient(#3fb8ff,#0d6fd1);overflow:hidden}
.esc-mar::before{content:"";position:absolute;inset:-20% -50% auto;height:40%;background:repeating-radial-gradient(ellipse at 50% 100%,rgba(255,255,255,.55) 0 3px,transparent 4px 26px);animation:escOla 6s linear infinite;opacity:.6}
@keyframes escOla{to{transform:translateX(26px)}}
.esc-arena{position:absolute;left:0;right:0;bottom:0;height:14%;background:linear-gradient(#ffe2a0,#f2c46b);box-shadow:0 -6px 18px rgba(255,230,160,.6)}
.esc-planeta{position:absolute;filter:drop-shadow(0 0 20px rgba(140,160,255,.5));animation:escFlota 10s ease-in-out infinite}
.esc-nebula{position:absolute;inset:0;background:radial-gradient(ellipse at 20% 30%,rgba(140,60,255,.35),transparent 55%),radial-gradient(ellipse at 80% 70%,rgba(0,190,255,.28),transparent 55%),radial-gradient(ellipse at 60% 20%,rgba(255,80,180,.18),transparent 50%)}
.esc-superficie{position:absolute;left:-5%;right:-5%;bottom:-6%;height:24%;border-radius:50% 50% 0 0/40% 40% 0 0;background:radial-gradient(circle at 30% 30%,#e9ecf7,#a9b0c8 70%);box-shadow:0 -10px 40px rgba(255,255,255,.35)}
.esc-capa-agua{position:absolute;inset:0;background:linear-gradient(rgba(40,150,255,.18),rgba(0,40,120,.35));mix-blend-mode:multiply;pointer-events:none}
.esc-rayos-agua{position:absolute;inset:0;background:repeating-linear-gradient(100deg,rgba(255,255,255,.0) 0 40px,rgba(190,240,255,.16) 50px 70px,rgba(255,255,255,0) 90px 140px);animation:escRayosAgua 9s ease-in-out infinite alternate;mix-blend-mode:screen}
@keyframes escRayosAgua{from{transform:translateX(-6%) skewX(-4deg)}to{transform:translateX(6%) skewX(4deg)}}
.esc-objs,.esc-pjs{position:absolute;inset:0}
.esc-obj{position:absolute;transform:translateX(-50%);transition:left 1.1s cubic-bezier(.4,0,.2,1),bottom 1.1s cubic-bezier(.4,0,.2,1),opacity .6s}
.esc-obj img,.esc-obj .esc-emo{display:block;height:100%;width:auto;filter:drop-shadow(0 6px 10px rgba(0,0,0,.45))}
.esc-obj .esc-emo{font-size:var(--fs);line-height:1;height:auto}
.esc-obj .esc-in{height:100%;display:flex;justify-content:center;align-items:flex-end;position:relative}
.esc-obj.fx-brillo .esc-in{animation:escFlota 2.6s ease-in-out infinite}
.esc-obj.fx-brillo img,.esc-obj.fx-brillo .esc-emo{animation:escBrillo 1.6s ease-in-out infinite}
.esc-obj.fx-brillo::before{content:"";position:absolute;left:50%;top:50%;width:260%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;
  background:conic-gradient(from 0deg,rgba(255,240,170,0) 0 8%,rgba(255,240,170,.8) 10%,rgba(255,240,170,0) 14% 33%,rgba(255,240,170,.5) 35%,rgba(255,240,170,0) 39% 58%,rgba(255,240,170,.55) 60%,rgba(255,240,170,0) 64% 83%,rgba(255,240,170,.5) 85%,rgba(255,240,170,0) 89%);
  -webkit-mask:radial-gradient(circle,#000 18%,transparent 66%);mask:radial-gradient(circle,#000 18%,transparent 66%);animation:escGira 7s linear infinite;z-index:-1;mix-blend-mode:screen}
.esc-obj.fx-brillo::after{content:"";position:absolute;left:50%;top:50%;width:150%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(255,250,210,.75),rgba(255,220,120,.25) 40%,transparent 70%);z-index:-1;animation:escLate 1.6s ease-in-out infinite}
@keyframes escBrillo{0%,100%{filter:drop-shadow(0 0 6px #fff6c4) drop-shadow(0 0 16px #ffd23f) brightness(1)}50%{filter:drop-shadow(0 0 12px #fff) drop-shadow(0 0 30px #ffd23f) brightness(1.18)}}
@keyframes escGira{to{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes escLate{0%,100%{transform:translate(-50%,-50%) scale(.92);opacity:.8}50%{transform:translate(-50%,-50%) scale(1.08);opacity:1}}
.esc-sol{transform:none}
.esc-obj.fx-aparece .esc-in{animation:escPop .9s cubic-bezier(.3,1.7,.5,1) backwards,escFlota 3s ease-in-out .9s infinite}
.esc-obj.fx-cae .esc-in{animation:escCae 1.1s cubic-bezier(.5,0,.6,1) backwards}
.esc-obj.fx-gira img,.esc-obj.fx-gira .esc-emo{animation:escGiraY 3s linear infinite}
.esc-obj.fx-late .esc-in{animation:escLatido 1.1s ease-in-out infinite}
.esc-obj.fx-flota .esc-in{animation:escFlota 3.2s ease-in-out infinite}
.esc-obj.fx-vuela{animation:escCruza 7s linear infinite}
@keyframes escPop{0%{transform:scale(0) rotate(-25deg);opacity:0}60%{opacity:1}100%{transform:scale(1) rotate(0)}}
@keyframes escCae{0%{transform:translateY(-260%)}70%{transform:translateY(0)}82%{transform:translateY(-14%)}100%{transform:translateY(0)}}
@keyframes escGiraY{to{transform:rotateY(360deg)}}
@keyframes escLatido{0%,100%{transform:scale(1)}15%{transform:scale(1.15)}30%{transform:scale(1)}45%{transform:scale(1.1)}}
@keyframes escFlota{0%,100%{transform:translateY(0)}50%{transform:translateY(-7%)}}
@keyframes escCruza{from{left:-15%}to{left:115%}}
.esc-flash{position:absolute;left:50%;top:50%;width:40%;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%) scale(0);border:3px solid #fff7c2;box-shadow:0 0 20px #ffd23f,inset 0 0 20px #ffd23f;animation:escAro .8s ease-out forwards;pointer-events:none}
@keyframes escAro{0%{transform:translate(-50%,-50%) scale(.2);opacity:1}100%{transform:translate(-50%,-50%) scale(3.4);opacity:0}}
.esc-pj{position:absolute;transform:translateX(-50%);transition:left 1.2s cubic-bezier(.45,0,.2,1),bottom 1s ease,height .8s ease,opacity .6s;z-index:2}
.esc-pj .esc-in{height:100%;position:relative;transform-origin:50% 100%}
.esc-pj .esc-flip{height:100%;transition:transform .5s}
.esc-pj.izq .esc-flip{transform:scaleX(-1)}
.esc-spr{height:100%;background-repeat:no-repeat;filter:drop-shadow(0 8px 10px rgba(0,0,0,.45))}
.esc-pj img.esc-img{height:100%;width:auto;display:block;filter:drop-shadow(0 8px 10px rgba(0,0,0,.45))}
.esc-pj .robot{height:100%;width:auto}
.esc-pj .robot>img{height:100%;width:auto}
.esc-sombra{position:absolute;left:50%;bottom:-3%;width:70%;height:9%;transform:translateX(-50%);border-radius:50%;background:radial-gradient(rgba(0,0,0,.55),transparent 70%);z-index:-1}
.esc-pj.st-v .esc-sombra,.esc-pj.vuela .esc-sombra{opacity:.35;transform:translateX(-50%) scale(.7)}
.esc-pj .esc-in{animation:escRespira 3.6s ease-in-out infinite}
.esc-pj.vuela .esc-in,.esc-pj.st-v .esc-in{animation:escVuela 3s ease-in-out infinite}
.esc-pj.st-h .esc-in{animation:escHabla .55s ease-in-out infinite}
.esc-pj.st-s .esc-in{animation:escSalta .9s cubic-bezier(.3,0,.4,1) infinite}
.esc-pj.st-f .esc-in{animation:escFeliz 1.2s ease-in-out infinite}
.esc-pj.st-t .esc-in{animation:escTriste 4s ease-in-out infinite;filter:saturate(.7) brightness(.9)}
.esc-pj.st-d .esc-in{animation:escDuerme 4.5s ease-in-out infinite}
.esc-pj.entra-izq{animation:escEntraIzq 1.1s cubic-bezier(.3,1.2,.5,1) backwards}
.esc-pj.entra-der{animation:escEntraDer 1.1s cubic-bezier(.3,1.2,.5,1) backwards}
.esc-pj.entra{animation:escEntraArr .8s cubic-bezier(.3,1.4,.5,1) backwards}
.esc-pj.sale{opacity:0;transition:opacity .5s}
@keyframes escRespira{0%,100%{transform:scale(1,1)}50%{transform:scale(1.015,1.025)}}
@keyframes escVuela{0%,100%{transform:translateY(0) rotate(-1.5deg)}50%{transform:translateY(-8%) rotate(1.5deg)}}
@keyframes escHabla{0%,100%{transform:translateY(0) scale(1,1)}50%{transform:translateY(-2.5%) scale(1.02,1.04)}}
@keyframes escSalta{0%,100%{transform:translateY(0) scale(1.05,.95)}15%{transform:translateY(0) scale(.95,1.06)}50%{transform:translateY(-22%) scale(1,1)}85%{transform:translateY(0) scale(1.06,.94)}}
@keyframes escFeliz{0%,100%{transform:translateY(0) rotate(0)}25%{transform:translateY(-6%) rotate(-3deg)}50%{transform:translateY(0) rotate(0)}75%{transform:translateY(-6%) rotate(3deg)}}
@keyframes escTriste{0%,100%{transform:rotate(-2deg) translateY(1%)}50%{transform:rotate(2deg) translateY(2%)}}
@keyframes escDuerme{0%,100%{transform:scale(1,1) rotate(-3deg)}50%{transform:scale(1.03,.97) rotate(-3deg)}}
@keyframes escEntraIzq{from{transform:translateX(-50%) translateX(-120vw)}to{transform:translateX(-50%)}}
@keyframes escEntraDer{from{transform:translateX(-50%) translateX(120vw)}to{transform:translateX(-50%)}}
@keyframes escEntraArr{from{transform:translateX(-50%) translateY(30%);opacity:0}to{transform:translateX(-50%);opacity:1}}
.esc-zzz{position:absolute;right:-6%;top:-4%;font:700 clamp(12px,2.6vw,22px) 'Fredoka',system-ui;color:#cfe6ff;text-shadow:0 0 8px #7fb4ff;pointer-events:none}
.esc-zzz b{position:absolute;opacity:0;animation:escZ 3s ease-in infinite}.esc-zzz b:nth-child(2){animation-delay:1s}.esc-zzz b:nth-child(3){animation-delay:2s}
@keyframes escZ{0%{transform:translate(0,0) scale(.6);opacity:0}20%{opacity:1}100%{transform:translate(30px,-50px) scale(1.4);opacity:0}}
.esc-habla-aro{position:absolute;left:50%;bottom:-2%;width:80%;height:10%;transform:translateX(-50%);border-radius:50%;background:radial-gradient(rgba(255,230,120,.55),transparent 70%);z-index:-1;animation:escLate2 .9s ease-in-out infinite}
@keyframes escLate2{0%,100%{opacity:.5}50%{opacity:1}}
.esc-fx{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:5}
.esc-tinte{position:absolute;inset:0;pointer-events:none;z-index:4;transition:background 1.2s}
.esc-vin{position:absolute;inset:0;pointer-events:none;z-index:6;background:radial-gradient(ellipse at 50% 45%,transparent 55%,rgba(5,6,25,.55) 100%)}
.esc-brillo{position:absolute;inset:0;pointer-events:none;z-index:6;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.10) 48%,rgba(255,255,255,.02) 52%,transparent 60%);background-size:250% 100%;animation:escSheen 9s ease-in-out infinite;mix-blend-mode:screen}
@keyframes escSheen{0%{background-position:120% 0}60%,100%{background-position:-60% 0}}
.esc-trans{position:absolute;inset:0;z-index:8;pointer-events:none;opacity:0;background:radial-gradient(circle at 50% 50%,#1b1450,#05061a 70%);transition:opacity .45s}
.esc-trans.on{opacity:1}
.esc-titulo{position:absolute;left:0;right:0;bottom:0;z-index:7;padding:28px 16px 14px;text-align:center;background:linear-gradient(transparent,rgba(5,6,26,.85));
  font:700 clamp(22px,5.4vw,34px)/1.15 'Andika','Fredoka',system-ui;color:#fff;text-shadow:0 0 14px rgba(123,108,255,.9),0 2px 0 #000}
.esc-titulo small{display:block;font-size:.5em;letter-spacing:2px;color:#ffd23f;text-transform:uppercase;margin-bottom:4px}
.esc-carga{position:absolute;inset:0;display:grid;place-items:center;z-index:9;background:#070a24;color:#cfd6ff;font:600 16px 'Fredoka',system-ui;transition:opacity .5s}
.esc-carga i{display:block;width:60%;height:6px;border-radius:4px;background:rgba(255,255,255,.12);margin-top:10px;overflow:hidden}
.esc-carga i b{display:block;height:100%;width:0;background:linear-gradient(90deg,#7b6cff,#ffd23f);transition:width .2s}
.esc-ico{display:inline-block;height:1.6em;width:auto;vertical-align:middle;margin-right:.35em;filter:drop-shadow(0 2px 4px rgba(0,0,0,.4))}
.esc-ico-spr{display:inline-block;height:1.7em;vertical-align:middle;margin-right:.35em;background-repeat:no-repeat}
/* ---- aviso de girar el móvil (los cuentos se ven siempre en horizontal) ---- */
.esc-gira{position:fixed;inset:0;z-index:5000;display:none;flex-direction:column;align-items:center;justify-content:center;gap:18px;text-align:center;padding:24px;
  background:radial-gradient(ellipse at 50% 35%,#2a1f7a,#0a0b2e 70%);color:#fff;font-family:'Fredoka',system-ui}
@media (orientation:portrait) and (pointer:coarse){#pCuento.activa .esc-gira{display:flex}}
.esc-gira .eg-movil{position:relative;width:96px;height:168px;border-radius:20px;border:5px solid #cfd6ff;box-shadow:0 0 30px rgba(123,108,255,.8),inset 0 0 20px rgba(123,108,255,.5);
  animation:egGira 2.6s cubic-bezier(.6,0,.3,1) infinite;background:linear-gradient(160deg,#3a2aa0,#120f40)}
.esc-gira .eg-movil::after{content:"";position:absolute;left:50%;bottom:8px;width:26px;height:4px;border-radius:3px;background:#cfd6ff;transform:translateX(-50%)}
.esc-gira .eg-movil img{position:absolute;inset:18% 12%;width:76%;height:64%;object-fit:contain;animation:egContra 2.6s cubic-bezier(.6,0,.3,1) infinite}
@keyframes egGira{0%,20%{transform:rotate(0)}55%,85%{transform:rotate(-90deg)}100%{transform:rotate(0)}}
@keyframes egContra{0%,20%{transform:rotate(0)}55%,85%{transform:rotate(90deg)}100%{transform:rotate(0)}}
.esc-gira .eg-flecha{font-size:44px;color:#ffd23f;text-shadow:0 0 14px #ffd23f;animation:egFlecha 2.6s ease-in-out infinite}
@keyframes egFlecha{0%,100%{opacity:.3;transform:rotate(0)}50%{opacity:1;transform:rotate(-30deg)}}
.esc-gira h2{margin:0;font-size:26px;font-weight:700;text-shadow:0 0 14px rgba(123,108,255,.9)}
.esc-gira p{margin:0;font-size:17px;line-height:1.45;color:#cfd6ff;max-width:320px}
.esc-gira p b{color:#ffd23f}
.esc-gira .eg-estrellas{position:absolute;inset:0;pointer-events:none}
/* ---- pantalla de preguntas ---- */
.cu-adm{background:rgba(255,210,63,.1);border:1.5px dashed rgba(255,210,63,.6);border-radius:16px;padding:12px;margin-bottom:12px;text-align:left}
.cq{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;max-width:980px}
.cq-esc{width:100%;position:relative}
.cq-esc .esc{aspect-ratio:16/7;max-height:34vh;height:auto}
.cq-der{display:flex;flex-direction:column;gap:10px;width:100%}
@media (orientation:landscape){
  .cq{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.25fr);gap:14px;align-items:stretch}
  .cq-esc .esc{aspect-ratio:auto;height:min(76vh,560px);max-height:none}
  .cq .cu-opts.opciones{grid-template-columns:1fr!important}
  .cq .opt{min-height:clamp(54px,15vh,92px)}}
.cq .cu-opts.opciones{max-width:none}
.cq-cielo{position:absolute;left:0;right:0;top:6px;z-index:20;display:flex;justify-content:center;gap:clamp(2px,1vw,8px);pointer-events:none}
.cq-cielo i{width:clamp(22px,6.4vw,40px);aspect-ratio:1;display:grid;place-items:center;transition:transform .4s}
.cq-cielo i img{width:100%;height:100%;object-fit:contain;opacity:.55;filter:drop-shadow(0 0 4px rgba(0,0,0,.6))}
.cq-cielo i.on{animation:cqEstrella .7s cubic-bezier(.3,1.8,.5,1)}
.cq-cielo i.on img{opacity:1;filter:drop-shadow(0 0 8px #ffd23f) drop-shadow(0 0 18px rgba(255,210,63,.7))}
@keyframes cqEstrella{0%{transform:scale(.3)}100%{transform:scale(1)}}
.cq-card{position:relative;width:100%;padding:14px 18px 16px;border-radius:22px;text-align:center;background:linear-gradient(160deg,rgba(40,30,110,.92),rgba(12,16,52,.95));
  border:2px solid rgba(140,120,255,.55);box-shadow:0 0 0 1px rgba(255,255,255,.05) inset,0 10px 30px rgba(0,0,0,.45),0 0 28px rgba(123,108,255,.35);overflow:hidden}
.cq-card::before{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.12) 48%,transparent 60%);background-size:250% 100%;animation:escSheen 6s ease-in-out infinite}
.cq-num{font:800 13px 'Fredoka',system-ui;letter-spacing:3px;color:#ffd23f;text-shadow:0 0 10px rgba(255,210,63,.7);margin-bottom:6px}
.cq-txt{font-family:var(--f-lectura,'Andika'),system-ui;font-weight:700;font-size:clamp(20px,3vw,28px);line-height:1.3;color:#fff}
.cq-zona{width:100%}
.cq .cu-opts{display:grid;grid-template-columns:1fr;gap:10px;width:100%}
.cq .opt{min-height:74px;border-radius:20px;background:linear-gradient(180deg,#2b3f80,#18245a);border:2px solid rgba(123,200,255,.35);
  box-shadow:0 5px 0 #0b1236,0 0 18px rgba(80,170,255,.18);display:flex;align-items:center;justify-content:center;animation:cqEntra .5s cubic-bezier(.3,1.4,.5,1) backwards}
.cq .opt:nth-child(2){animation-delay:.08s}.cq .opt:nth-child(3){animation-delay:.16s}
.cq .opt{justify-content:flex-start;padding:8px 16px;width:100%}
.cq .opt .opt-txt{font-size:clamp(19px,2.6vw,26px)!important;display:flex;align-items:center;gap:12px;text-align:left}
.cq .opt .esc-ico,.cq .opt .esc-ico-spr{height:clamp(40px,10vh,64px)!important;width:auto!important;max-width:none!important;margin:0;filter:drop-shadow(0 0 8px rgba(255,255,255,.35)) drop-shadow(0 3px 4px rgba(0,0,0,.5))}
.cq .opt.ok{background:linear-gradient(180deg,#4dff8a,#10c94a);border-color:#fff;color:#032b12;box-shadow:0 5px 0 #087a2c,0 0 34px rgba(23,255,95,.8)}
.cq .opt.ok .esc-ico,.cq .opt.ok .esc-ico-spr{animation:cqIco .6s cubic-bezier(.3,1.8,.5,1)}
@keyframes cqIco{0%{transform:scale(.6) rotate(-15deg)}100%{transform:scale(1) rotate(0)}}
@keyframes cqEntra{from{transform:translateY(20px) scale(.9);opacity:0}to{transform:none;opacity:1}}
.cq-vuela{position:fixed;width:60px;height:60px;z-index:9999;pointer-events:none;transition:transform .8s cubic-bezier(.5,0,.3,1);filter:drop-shadow(0 0 12px #ffd23f) drop-shadow(0 0 24px #ffb000)}
`;
  let cssPuesto = false;
  function ponCSS() { if (cssPuesto) return; cssPuesto = true; const s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s); }

  /* ---------------- utilidades ---------------- */
  const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const rnd = (a, b) => a + Math.random() * (b - a);
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- escenario ---------------- */
  function crear(cont) {
    ponCSS();
    const S = { el: h('div', 'esc'), fondoK: null, pjs: {}, objs: {}, parts: [], fx: '', tick: null, raf: 0, vivo: true, t0: performance.now() };
    S.el.innerHTML = `<div class="esc-cam kb"><div class="esc-mundo"><div class="esc-fondo"></div><div class="esc-objs"></div><div class="esc-pjs"></div></div></div>
      <div class="esc-tinte"></div><canvas class="esc-fx"></canvas><div class="esc-brillo"></div><div class="esc-vin"></div><div class="esc-trans"></div>`;
    cont.appendChild(S.el);
    S.cam = S.el.querySelector('.esc-cam'); S.mundo = S.el.querySelector('.esc-mundo'); S.focoX = 50;
    S.onRes = () => encuadra(S, S.focoX, true); addEventListener('resize', S.onRes); S.fondo = S.el.querySelector('.esc-fondo'); S.capObjs = S.el.querySelector('.esc-objs'); S.capPjs = S.el.querySelector('.esc-pjs');
    S.tinte = S.el.querySelector('.esc-tinte'); S.cv = S.el.querySelector('.esc-fx'); S.trans = S.el.querySelector('.esc-trans');
    S.ctx = S.cv.getContext('2d');
    S.frame = 0;
    S.tick = setInterval(() => { if (!document.hidden) animaSprites(S); }, 170);
    const loop = t => { if (!S.vivo) return; if (!document.hidden) particulas(S, t); S.raf = requestAnimationFrame(loop); };
    S.raf = requestAnimationFrame(loop);
    return S;
  }
  function destruir(S) { if (!S) return; S.vivo = false; removeEventListener('resize', S.onRes); clearInterval(S.tick); cancelAnimationFrame(S.raf); }

  /* ---------- cámara de viaje ----------
     El escenario es un mundo horizontal 16:10. En PC, tablet o móvil en horizontal
     se ve entero; en un móvil en vertical se ve solo un trozo y la cámara viaja por
     el escenario hacia quien habla o hacia el objeto importante. */
  function encuadra(S, x, ya) {
    const W = S.el.clientWidth, H = S.el.clientHeight; if (!W || !H) return;
    const MW = Math.max(W, H * 1.6); S.mundo.style.width = MW + 'px'; S.focoX = x;
    const tx = Math.max(0, Math.min(MW - W, x / 100 * MW - W / 2));
    S.mundo.classList.toggle('mueve', !ya); S.mundo.style.transform = `translateX(${-tx}px)`;
    S.panea = MW > W * 1.05;
  }
  /* en vertical, los personajes se juntan un poco hacia el centro para que quepan en el encuadre */
  const vertical = S => S.el.clientHeight > S.el.clientWidth * .9;
  const apretar = (S, x) => vertical(S) ? 50 + (x - 50) * .72 : x;
  function focoDe(esc, vis, S) {
    const ap = x => S ? apretar(S, x) : x;
    const o = (esc.o || []).find(o => ['brillo', 'aparece', 'cae'].includes(o[3]));
    const ps = (esc.p || []).map((p, i, L) => ({ x: p[1] == null ? (100 / (L.length + 1)) * (i + 1) : p[1], st: p[2] || '' }));
    const hab = ps.find(p => p.st.includes('h'));
    ps.forEach(p => { p.x = ap(p.x); }); const ox = o ? ap(o[1] == null ? 50 : o[1]) : 50;
    if (esc.c === 'foco' && o) return ox;
    if (ps.length > 1) { const xs = ps.map(p => p.x), a = Math.min(...xs), b = Math.max(...xs); if (b - a + 22 <= (vis || 100)) return (a + b) / 2; }
    if (hab && o) return (hab.x + ox) / 2;
    if (o) return ox;
    if (hab && ps.length > 1) { const xs = ps.map(p => p.x); return hab.x * .6 + (Math.min(...xs) + Math.max(...xs)) / 2 * .4; }
    if (hab) return hab.x;
    if (ps.length) return ps.reduce((a, p) => a + p.x, 0) / ps.length;
    return 50;
  }
  /* fondo */
  function ponFondo(S, k, luz, astro) {
    const F = FONDOS[k] || FONDOS.dormitorio; S.F = F; S.fondo.innerHTML = '';
    if (F.sala) { const d = h('div', 'esc-sala'); d.style.backgroundImage = `url("${src(F.sala)}")`; S.fondo.appendChild(d); }
    else if (F.espacio) {
      S.fondo.style.background = 'radial-gradient(ellipse at 50% 120%,#2a1a6e,#0b0a2e 55%,#03030f)';
      S.fondo.appendChild(h('div', 'esc-nebula')); S.fondo.appendChild(estrellas(70));
      const pl = ['planeta03', 'planeta07', 'planeta12', 'planeta18', 'planeta21'];
      const p1 = h('img', 'esc-planeta'); p1.src = 'img/planetas/' + pl[(k.length + (astro || '').length) % pl.length] + '.png'; Object.assign(p1.style, { width: '22%', left: '8%', top: '10%' }); S.fondo.appendChild(p1);
      const p2 = h('img', 'esc-planeta'); p2.src = 'img/planetas/planeta09.png'; Object.assign(p2.style, { width: '11%', right: '12%', top: '22%', animationDelay: '-4s' }); S.fondo.appendChild(p2);
      if (F.superficie) S.fondo.appendChild(h('div', 'esc-superficie'));
    } else {
      S.fondo.style.background = '';
      const cielo = h('div', 'esc-cielo'); cielo.style.background = F.agua ? (luz === 'noche' ? 'linear-gradient(#020a30,#0a2a6a)' : 'linear-gradient(#0a5fb8,#2fa8e8 70%,#7fd8ff)') : (CIELOS[luz] || CIELOS.dia); S.fondo.appendChild(cielo);
      if (F.agua) { if (F.lejos) { const c = h('div', 'esc-capa lejos'); c.style.backgroundImage = `url("${src(F.lejos)}")`; S.fondo.appendChild(c); } ['cerca', 'suelo'].forEach(k => { if (F[k] && !FALTA.has(F[k])) { const c = h('div', 'esc-capa ' + k); c.style.backgroundImage = `url("${src(F[k])}")`; S.fondo.appendChild(c); } }); }
      else {
      if (luz === 'noche' || luz === 'magia') { S.fondo.appendChild(estrellas(45)); const l = h('img', 'esc-astro luna'); l.src = 'img/luna.png'; S.fondo.appendChild(l); }
      else if (astro) { const a = h('img', 'esc-astro'); a.src = src(astro); S.fondo.appendChild(a); }
      else if (luz !== 'tarde') S.fondo.appendChild(h('div', 'esc-sol'));
      else { const so = h('div', 'esc-sol'); so.style.top = '38%'; so.style.right = '40%'; so.style.width = '22%'; S.fondo.appendChild(so); }
      if (F.playa) { S.fondo.appendChild(h('div', 'esc-mar')); S.fondo.appendChild(h('div', 'esc-arena')); }
      else {
        const capa = (img, cls) => { if (!img || FALTA.has(img)) return; const c = h('div', 'esc-capa ' + cls); c.style.backgroundImage = `url("${src(img)}")`; S.fondo.appendChild(c); };
        capa(F.lejos, 'lejos'); capa(F.cerca, 'cerca'); capa(F.suelo, 'suelo');
      }
      }
    }
    if (F.agua) { S.fondo.appendChild(h('div', 'esc-rayos-agua')); S.fondo.appendChild(h('div', 'esc-capa-agua')); }
  }
  const CIELOS = {
    dia: 'linear-gradient(#3aa0ff 0%,#7fd0ff 55%,#c9f0ff 100%)',
    tarde: 'linear-gradient(#3a2a8a 0%,#b0479a 35%,#ff8a5c 65%,#ffd08a 100%)',
    amanecer: 'linear-gradient(#5b7cff 0%,#ffa8c5 55%,#ffe2b0 100%)',
    noche: 'linear-gradient(#03041a 0%,#0e1250 55%,#2a2a80 100%)',
    magia: 'linear-gradient(#12063a 0%,#3a1490 50%,#8a3ad0 100%)',
    lampara: 'linear-gradient(#0e1250,#2a2a80)'
  };
  function estrellas(n) {
    const d = h('div', 'esc-estrellas'); d.style.cssText = 'position:absolute;inset:0';
    for (let i = 0; i < n; i++) { const s = h('i'); s.style.cssText = `left:${rnd(0, 100)}%;top:${rnd(0, 62)}%;animation-delay:${rnd(0, 3)}s;transform:scale(${rnd(.5, 1.3)})`; d.appendChild(s); }
    return d;
  }
  const TINTES = {
    dia: 'none',
    tarde: 'linear-gradient(rgba(255,120,60,.18),rgba(120,40,160,.22))',
    amanecer: 'linear-gradient(rgba(255,170,190,.14),rgba(255,220,150,.12))',
    noche: 'radial-gradient(ellipse at 50% 35%,rgba(30,40,120,.18),rgba(5,8,40,.42) 85%)',
    magia: 'radial-gradient(ellipse at 50% 40%,rgba(180,90,255,.15),rgba(40,10,90,.5) 85%)',
    lampara: 'radial-gradient(ellipse at 50% 30%,rgba(255,200,110,.22),rgba(30,15,50,.5) 80%)'
  };

  /* personajes */
  function nodoPj(S, id, st, pose) {
    const d = PJ[id]; if (!d) return null;
    if (d.emo && FALTA.has(d.img)) return null;   // personaje nuevo aún sin dibujo: no se pinta
    const e = h('div', 'esc-pj'); const inn = h('div', 'esc-in'); const flip = h('div', 'esc-flip'); inn.appendChild(flip); e.appendChild(inn);
    e._d = d; e._id = id;
    pintaPj(S, e, st, pose);
    inn.appendChild(h('div', 'esc-sombra'));
    return e;
  }
  function pintaPj(S, e, st, pose) {
    const d = e._d, flip = e.querySelector('.esc-flip'); flip.innerHTML = '';
    const imgs = imgsPj(d, st, pose); let im = imgs[imgs.length - 1];
    if (FALTA.has(im)) im = imgs[0];
    e._img = im; e._fr = (d.triste && im === d.triste) ? 4 : (d.vuelaImg && im === d.vuelaImg) ? 0 : (d.fr || 0);
    if (d.emo && FALTA.has(im)) {
      const s = h('span', 'esc-emo-pj', d.emo); s.style.cssText = 'display:block;line-height:1;filter:drop-shadow(0 0 10px rgba(255,255,255,.6)) drop-shadow(0 8px 10px rgba(0,0,0,.4))';
      flip.appendChild(s); e._fr = 0; requestAnimationFrame(() => { s.style.fontSize = (e.clientHeight * .85) + 'px'; }); return;
    }
    if (d.lucas && im.startsWith('lcl:lucas/') && !/dormido|gamer/.test(im)) {
      const key = 'lucas-' + im.split('/').pop().replace('lucas-', '');
      flip.innerHTML = `<span class="robot" data-pose="${key}" data-fuerza=".55"><canvas class="fuego"></canvas><img src="${src(im)}" alt=""></span>`;
    } else if (d.fuego) {
      const key = im.split('/').pop();
      flip.innerHTML = `<span class="robot" data-pose="${key}" data-fuerza=".5"><canvas class="fuego"></canvas><img src="${src(im)}" alt=""></span>`;
    } else if (e._fr) {
      const D = DIM[src(im)] || { w: 400 * e._fr, h: 400 };
      const s = h('div', 'esc-spr'); s.style.aspectRatio = (D.w / e._fr) + '/' + D.h;
      s.style.backgroundImage = `url("${src(im)}")`; s.style.backgroundSize = (e._fr * 100) + '% 100%';
      flip.appendChild(s); e._spr = s; marcoPj(e, 0);
    } else {
      const i = h('img', 'esc-img'); i.src = src(im); i.alt = ''; flip.appendChild(i);
    }
    if (!e._spr || !e._fr) e._spr = flip.querySelector('.esc-spr');
  }
  function marcoPj(e, f) {
    if (!e._spr || !e._fr) return; const d = e._d; if (d.fijo) f = e._fijo || 0;
    f = Math.max(0, Math.min(e._fr - 1, f)); if (e._f === f) return; e._f = f;
    e._spr.style.backgroundPosition = (e._fr > 1 ? (f / (e._fr - 1)) * 100 : 0) + '% 0';
  }
  function animaSprites(S) {
    S.frame++;
    Object.values(S.pjs).forEach(e => {
      if (!e._fr) return; const st = e._st || '', n = S.frame + (e._sem || 0);
      let f = 0;
      if (e._fr === 2) f = (st.includes('h') || e._d.mueve) ? (n % 4 < 2 ? 0 : 1) : (n % 16 === 0 ? 1 : 0);
      else if (st.includes('h')) f = [1, 0, 1, 2, 1, 0][n % 6];
      else if (st.includes('f')) f = 3;
      else if (st.includes('a')) f = 2;
      else if (st.includes('t') && e._img === e._d.triste) f = n % 10 < 7 ? 0 : 1;
      else if (e._d.vuela) f = [1, 2][Math.floor(n / 2) % 2];
      else f = (n % 23 === 0 || n % 23 === 1) ? 1 : 0;      // de vez en cuando hace un gesto
      marcoPj(e, f);
    });
  }
  function colocaPj(S, e, x, st) {
    const F = S.F || {}; const d = e._d; x = apretar(S, x);
    const grande = st.includes('g') ? 1.3 : st.includes('m') ? .7 : 1;
    const dormido = d.lucas && /dormido/.test(e._img || '') ? 1.35 : 1;
    const vert = S.el.clientHeight > S.el.clientWidth * .9 ? .78 : 1;
    const alto = 50 * vert * (d.h || 1) * grande * dormido * (F.espacio && !F.superficie ? .9 : 1);
    const vuela = st.includes('v') || d.vuela || F.agua || (F.espacio && !F.superficie);
    const base = (F.piso || 5) + (vuela ? 14 : 0) + (st.includes('d') && !d.lucas ? 0 : 0);
    e.style.left = x + '%'; e.style.bottom = base + '%'; e.style.height = alto + '%';
    e.style.zIndex = String(10 + Math.round(100 - base));
    e.className = 'esc-pj' + (vuela ? ' vuela' : '') + (st.includes('<') ? ' izq' : '') + [...'hfatdsv'].filter(c => st.includes(c)).map(c => ' st-' + c).join('');
    const zz = e.querySelector('.esc-zzz'); if (st.includes('d') && !zz) e.querySelector('.esc-in').appendChild(h('div', 'esc-zzz', '<b>Z</b><b>z</b><b>Z</b>')); else if (!st.includes('d') && zz) zz.remove();
    const aro = e.querySelector('.esc-habla-aro'); if (st.includes('h') && !aro) e.querySelector('.esc-in').appendChild(h('div', 'esc-habla-aro')); else if (!st.includes('h') && aro) aro.remove();
    e._st = st;
  }

  /* objetos */
  function nodoObj(S, o) {
    const [id0, x, y, fx, tam] = o; const id = real(id0);
    const e = h('div', 'esc-obj fx-' + (fx || 'fijo'));
    const inn = h('div', 'esc-in'); e.appendChild(inn);
    if (FALTA.has(id)) { const em = (NUEVOS[id0] || [null, '✨'])[1]; inn.innerHTML = `<span class="esc-emo">${em}</span>`; }
    else inn.innerHTML = `<img src="${src(id)}" alt="">`;
    const F = S.F || {}, alto = (tam || (id.startsWith('it-') || id.startsWith('cu-') ? 21 : 34)) * (S.el.clientHeight > S.el.clientWidth * .9 ? .8 : 1);
    e.style.left = apretar(S, x == null ? 50 : x) + '%'; e.style.bottom = ((F.piso || 5) + (y || 0)) + '%'; e.style.height = alto + '%';
    e.style.setProperty('--fs', 'calc(' + alto + 'cqh)');
    const em = inn.querySelector('.esc-emo'); if (em) em.style.fontSize = (S.el.clientHeight * alto / 100) + 'px';
    e.style.zIndex = fx && fx !== 'fijo' ? '60' : String(5 + Math.round(50 - (y || 0)));
    if (fx === 'brillo' || fx === 'aparece') {
      e.style.animationDelay = '.5s';
      setTimeout(() => { if (!S.vivo) return; e.appendChild(h('div', 'esc-flash')); chispas(S, e, 26); campanita(); }, 650);
      inn.style.animationDelay = '.5s';
    }
    if (fx === 'vuela') e.style.animationDuration = rnd(6, 9) + 's';
    return e;
  }

  /* ---------------- partículas (canvas) ---------------- */
  const TIPOS = {
    nieve: () => ({ x: rnd(0, 1), y: -.05, vx: rnd(-.02, .02), vy: rnd(.04, .09), r: rnd(1.5, 3.8), c: '#ffffff', osc: rnd(0, 6), vida: 30 }),
    lluvia: () => ({ x: rnd(0, 1.1), y: -.05, vx: -.12, vy: rnd(.9, 1.3), r: 1.2, c: 'rgba(190,220,255,.7)', linea: 1, vida: 3 }),
    estrellas: () => ({ x: rnd(0, 1), y: rnd(0, .7), vx: 0, vy: 0, r: rnd(1, 2.6), c: '#fff6c4', brilla: 1, vida: rnd(1.5, 3.5) }),
    burbujas: () => ({ x: rnd(0, 1), y: 1.05, vx: rnd(-.01, .01), vy: -rnd(.05, .12), r: rnd(2, 6), c: 'rgba(200,240,255,.8)', aro: 1, osc: rnd(0, 6), vida: 20 }),
    corazones: () => ({ x: rnd(.1, .9), y: 1.02, vx: rnd(-.02, .02), vy: -rnd(.06, .12), r: rnd(6, 11), c: ['#ff5c8a', '#ff9ec0', '#ff3d6e'][Math.floor(rnd(0, 3))], emo: '❤', osc: rnd(0, 6), vida: 12 }),
    confeti: () => ({ x: rnd(0, 1), y: -.05, vx: rnd(-.05, .05), vy: rnd(.12, .25), r: rnd(3, 6), c: ['#ffd23f', '#ff5c8a', '#4ad7ff', '#7bff8a', '#b47bff'][Math.floor(rnd(0, 5))], rect: 1, rot: rnd(0, 6), vida: 10 }),
    hojas: () => ({ x: rnd(0, 1.1), y: -.05, vx: -rnd(.02, .07), vy: rnd(.05, .1), r: rnd(7, 11), emo: ['🍂', '🍁'][Math.floor(rnd(0, 2))], osc: rnd(0, 6), rot: rnd(0, 6), vida: 20 }),
    petalos: () => ({ x: rnd(0, 1.1), y: -.05, vx: -rnd(.02, .06), vy: rnd(.04, .08), r: rnd(3, 5), c: '#ffc2dc', rect: 1, osc: rnd(0, 6), rot: rnd(0, 6), vida: 20 }),
    chispas: () => ({ x: rnd(.05, .95), y: rnd(.1, .9), vx: rnd(-.03, .03), vy: -rnd(.01, .05), r: rnd(1.5, 3), c: ['#ffd23f', '#fff', '#7fe9ff'][Math.floor(rnd(0, 3))], brilla: 1, vida: rnd(1, 2) }),
    luciernagas: () => ({ x: rnd(0, 1), y: rnd(.3, .9), vx: rnd(-.02, .02), vy: rnd(-.02, .02), r: rnd(2, 3.5), c: '#d9ff6a', brilla: 1, deriva: 1, vida: rnd(4, 8) }),
    notas: () => ({ x: rnd(.2, .8), y: .8, vx: rnd(-.04, .04), vy: -rnd(.06, .1), r: rnd(9, 13), emo: ['🎵', '🎶'][Math.floor(rnd(0, 2))], osc: rnd(0, 6), vida: 8 }),
    polvo: () => ({ x: rnd(0, 1), y: rnd(0, 1), vx: rnd(.005, .015), vy: rnd(-.005, .005), r: rnd(.8, 1.8), c: 'rgba(255,240,200,.5)', brilla: 1, vida: rnd(4, 8) }),
    fugaces: () => ({ x: rnd(.3, 1.1), y: rnd(-.05, .3), vx: -rnd(.5, .8), vy: rnd(.2, .35), r: 2, c: '#fff', fugaz: 1, vida: 1.6 })
  };
  const RATIO = { nieve: 40, lluvia: 90, estrellas: 6, burbujas: 7, corazones: 3, confeti: 30, hojas: 4, petalos: 5, chispas: 10, luciernagas: 3, notas: 2, polvo: 4, fugaces: .5, fuegos: 0 };
  function particulas(S, t) {
    const cv = S.cv, W = cv.clientWidth, H = cv.clientHeight; if (!W) return;
    const dpr = Math.min(2, devicePixelRatio || 1); if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
    const c = S.ctx; c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H);
    const dt = Math.min(.05, (t - (S.tl || t)) / 1000); S.tl = t;
    const lista = (S.fx || '').split(/\s+/).filter(Boolean);
    if (!reduce()) lista.forEach(k => {
      if (k === 'fuegos') { S._fw = (S._fw || 0) - dt; if (S._fw <= 0) { S._fw = rnd(.5, 1.1); fuego(S, rnd(.15, .85), rnd(.12, .4)); } return; }
      const g = TIPOS[k]; if (!g) return; S['_a' + k] = (S['_a' + k] || 0) + RATIO[k] * dt;
      while (S['_a' + k] >= 1) { S['_a' + k]--; if (S.parts.length < 400) S.parts.push(Object.assign(g(), { t: 0 })); }
    });
    c.globalCompositeOperation = 'source-over';
    for (let i = S.parts.length - 1; i >= 0; i--) {
      const p = S.parts[i]; p.t += dt;
      if (p.t > p.vida || p.y > 1.1 || p.y < -.2 || p.x < -.2 || p.x > 1.3) { S.parts.splice(i, 1); continue; }
      if (p.g) p.vy += p.g * dt;
      if (p.osc != null) p.x += Math.sin(t / 700 + p.osc) * .0006;
      if (p.deriva) { p.vx += rnd(-.03, .03) * dt; p.vy += rnd(-.03, .03) * dt; }
      p.x += p.vx * dt; p.y += p.vy * dt;
      const X = p.x * W, Y = p.y * H, k = Math.max(.6, W / 600);
      let a = 1; if (p.brilla) a = Math.sin(Math.PI * p.t / p.vida); else if (p.vida - p.t < .6) a = (p.vida - p.t) / .6;
      c.globalAlpha = Math.max(0, Math.min(1, a));
      if (p.emo) { c.save(); c.translate(X, Y); c.rotate((p.rot || 0) + Math.sin(t / 600 + (p.osc || 0)) * .4); c.font = (p.r * 2 * k) + 'px serif'; c.textAlign = 'center'; c.fillStyle = p.c || '#fff'; c.fillText(p.emo, 0, 0); c.restore(); }
      else if (p.linea) { c.strokeStyle = p.c; c.lineWidth = 1.2; c.beginPath(); c.moveTo(X, Y); c.lineTo(X + p.vx * 18, Y + p.vy * 18); c.stroke(); }
      else if (p.fugaz) { const gr = c.createLinearGradient(X, Y, X - p.vx * 160, Y - p.vy * 160); gr.addColorStop(0, '#fff'); gr.addColorStop(1, 'rgba(255,255,255,0)'); c.strokeStyle = gr; c.lineWidth = 2; c.beginPath(); c.moveTo(X, Y); c.lineTo(X - p.vx * 160, Y - p.vy * 160); c.stroke(); }
      else if (p.rect) { c.save(); c.translate(X, Y); c.rotate((p.rot || 0) + p.t * 4); c.fillStyle = p.c; c.fillRect(-p.r * k / 2, -p.r * k / 4, p.r * k, p.r * k / 2); c.restore(); }
      else if (p.aro) { c.strokeStyle = p.c; c.lineWidth = 1.2; c.beginPath(); c.arc(X, Y, p.r * k, 0, 7); c.stroke(); c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.arc(X - p.r * k * .35, Y - p.r * k * .35, p.r * k * .25, 0, 7); c.fill(); }
      else {
        if (p.brilla) { c.globalCompositeOperation = 'lighter'; const r = p.r * k * 3; const gr = c.createRadialGradient(X, Y, 0, X, Y, r); gr.addColorStop(0, p.c); gr.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = gr; c.beginPath(); c.arc(X, Y, r, 0, 7); c.fill(); c.globalCompositeOperation = 'source-over'; }
        c.fillStyle = p.c; c.beginPath(); c.arc(X, Y, p.r * k * (p.brilla ? .6 : 1), 0, 7); c.fill();
      }
    }
    c.globalAlpha = 1;
  }
  function fuego(S, x, y) {
    const col = ['#ffd23f', '#ff5c8a', '#4ad7ff', '#7bff8a', '#b47bff', '#ffffff'][Math.floor(rnd(0, 6))];
    for (let i = 0; i < 46; i++) { const a = rnd(0, Math.PI * 2), v = rnd(.12, .32); S.parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v * 1.4, g: .25, r: rnd(1.4, 2.6), c: col, brilla: 1, vida: rnd(.9, 1.5), t: 0 }); }
  }
  function chispas(S, el, n) {
    const r = el.getBoundingClientRect(), R = S.el.getBoundingClientRect(); if (!R.width) return;
    const cx = (r.left + r.width / 2 - R.left) / R.width, cy = (r.top + r.height / 2 - R.top) / R.height;
    for (let i = 0; i < n; i++) { const a = rnd(0, Math.PI * 2), v = rnd(.08, .28); S.parts.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: .12, r: rnd(1.4, 2.8), c: ['#fff6c4', '#ffd23f', '#ffffff', '#7fe9ff'][i % 4], brilla: 1, vida: rnd(.7, 1.3), t: 0 }); }
  }
  /* sonidito de magia muy suave (no tapa al narrador) */
  let actx = null;
  function campanita() {
    try {
      if (window.SFX && SFX.silencio && SFX.silencio()) return;
      actx = actx || new (window.AudioContext || window.webkitAudioContext)(); const t = actx.currentTime;
      [1318, 1760, 2093].forEach((f, i) => { const o = actx.createOscillator(), g = actx.createGain(); o.type = 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0, t + i * .07); g.gain.linearRampToValueAtTime(.035, t + i * .07 + .01); g.gain.exponentialRampToValueAtTime(.0001, t + i * .07 + .5); o.connect(g); g.connect(actx.destination); o.start(t + i * .07); o.stop(t + i * .07 + .55); });
    } catch (e) {}
  }

  /* ---------------- pintar una escena ---------------- */
  async function mostrar(S, esc, ops) {
    ops = ops || {}; esc = esc || { b: 'dormitorio', l: 'noche' };
    const F = FONDOS[esc.b] || FONDOS.dormitorio, luz = esc.l || (F.sala ? 'dia' : 'dia');
    const clave = esc.b + '|' + (F.sala ? '' : luz) + '|' + (esc.a || '');
    const cambia = clave !== S.fondoK;
    if (cambia && S.fondoK && !ops.sinTrans) { S.trans.classList.add('on'); await new Promise(r => setTimeout(r, 420)); Object.values(S.pjs).forEach(e => e.remove()); S.pjs = {}; Object.values(S.objs).forEach(e => e.remove()); S.objs = {}; S.parts = []; }
    if (cambia) { ponFondo(S, esc.b, luz, esc.a); S.fondoK = clave; }
    S.tinte.style.background = TINTES[luz] || 'none';
    /* cámara */
    S.cam.className = 'esc-cam'; void S.cam.offsetWidth;
    S.cam.classList.add(reduce() ? 'x' : (esc.c || 'kb'));
    if (esc.c === 'foco' && esc.o && esc.o[0]) { S.cam.style.transformOrigin = (esc.o[0][1] || 50) + '% ' + (100 - (F.piso || 5) - (esc.o[0][2] || 0) - 8) + '%'; S.cam.classList.add('zoom'); }
    else S.cam.style.transformOrigin = '50% 60%';
    /* personajes */
    const nuevos = {}; const lista = esc.p || [];
    lista.forEach((p, i) => {
      const [id, x0, st0, pose] = p; const st = st0 || ''; const x = x0 == null ? (100 / (lista.length + 1)) * (i + 1) : x0;
      const key = id + (lista.filter(q => q[0] === id).length > 1 ? '#' + i : '');
      let e = S.pjs[key];
      if (e) { const im = imgsPj(e._d, st, pose); if (im[im.length - 1] !== e._img) pintaPj(S, e, st, pose); }
      else {
        e = nodoPj(S, id, st, pose); if (!e) return; e._sem = Math.floor(rnd(0, 40));
        if (id === 'medusa') { e._fijo = ['lila', 'rosa', 'azul', 'verde'].indexOf(pose); if (e._fijo < 0) e._fijo = i % 4; marcoPj(e, 0); e._f = -1; marcoPj(e, 0); }
        S.capPjs.appendChild(e);
        colocaPj(S, e, x, st);
        const anim = st.includes('e') || (!cambia && S.fondoK) ? (x < 50 ? 'entra-izq' : 'entra-der') : 'entra';
        e.classList.add(anim); e.style.animationDelay = (i * .12) + 's';
        setTimeout(() => e.classList.remove(anim), 1400 + i * 120);
      }
      colocaPj(S, e, x, st); nuevos[key] = e;
    });
    Object.keys(S.pjs).forEach(k => { if (!nuevos[k]) { const e = S.pjs[k]; e.classList.add('sale'); setTimeout(() => e.remove(), 600); } });
    S.pjs = nuevos;
    /* objetos */
    const nObj = {};
    (esc.o || []).forEach((o, i) => {
      const key = o[0] + '#' + i; let e = S.objs[key];
      if (e && e._fx === (o[3] || 'fijo')) { e.style.left = apretar(S, o[1] == null ? 50 : o[1]) + '%'; e.style.bottom = ((F.piso || 5) + (o[2] || 0)) + '%'; }
      else { if (e) e.remove(); e = nodoObj(S, o); e._fx = o[3] || 'fijo'; S.capObjs.appendChild(e); }
      nObj[key] = e;
    });
    Object.keys(S.objs).forEach(k => { if (!nObj[k]) { const e = S.objs[k]; e.style.opacity = 0; setTimeout(() => e.remove(), 600); } });
    S.objs = nObj;
    /* partículas */
    if (S.fx !== (esc.f || '')) { S.fx = esc.f || ''; }
    { const W = S.el.clientWidth, H = S.el.clientHeight; encuadra(S, focoDe(esc, W && H ? 100 * W / Math.max(W, H * 1.6) : 100, S), cambia); }
    /* en vertical, si hay dos que conversan, la cámara pasea suavemente hacia el otro a mitad de la página */
    clearTimeout(S._paseo);
    const hab = (esc.p || []).find(p => (p[2] || '').includes('h')), otros = (esc.p || []).filter(p => p !== hab && p[1] != null);
    if (S.panea && hab && otros.length && !(esc.o || []).some(o => o[3] === 'brillo')) {
      const lejos = otros.reduce((a, p) => Math.abs(p[1] - hab[1]) > Math.abs(a[1] - hab[1]) ? p : a);
      S._paseo = setTimeout(() => { if (S.vivo) encuadra(S, apretar(S, (hab[1] + lejos[1]) / 2)); }, 3800);
    }
    if (cambia) setTimeout(() => S.trans.classList.remove('on'), 60);
  }

  /* icono para las respuestas de las preguntas: "@it-venda La venda" o "@pj:doctora Doctora Pila" */
  function icono(id) {
    if (id.startsWith('pj:')) {
      const d = PJ[id.slice(3)]; if (!d) return '';
      if (d.lucas) return `<img class="esc-ico" src="${src('lucas-quieto')}" alt="">`;
      if (d.fr) { const s = src(d.img), D = DIM[s] || { w: 4, h: 1.1 }; return `<span class="esc-ico-spr" style="aspect-ratio:${D.w / d.fr}/${D.h};background-image:url('${s}');background-size:${d.fr * 100}% 100%"></span>`; }
      return `<img class="esc-ico" src="${src(d.img)}" alt="">`;
    }
    const r = real(id);
    if (FALTA.has(r)) return `<span style="margin-right:.3em">${(NUEVOS[id] || [0, '✨'])[1]}</span>`;
    return `<img class="esc-ico" src="${src(r)}" alt="">`;
  }

  /* portada: la primera escena con el título encima */
  async function portada(cont, cuento, sub) {
    const S = crear(cont);
    const carga = h('div', 'esc-carga', '<div style="text-align:center">Preparando el cuento…<i><b></b></i></div>'); S.el.appendChild(carga);
    await precarga(cuento, p => { const b = carga.querySelector('b'); if (b) b.style.width = Math.round(p * 100) + '%'; });
    const P0 = (cuento.p || [])[0]; const e0 = Object.assign({}, (cuento.portada || (P0 && P0.s)) || {}); e0.p = (e0.p || []).map(p => [p[0], p[1], (p[2] || '').replace(/[hd]/g, '')+ 'f', p[3]]);
    await mostrar(S, e0, { sinTrans: true }); S.fx = (e0.f || '') + ' chispas';
    const t = h('div', 'esc-titulo', `<small>${sub || ''}</small>${cuento.t.replace(/</g, '&lt;')}`); S.el.appendChild(t);
    carga.style.opacity = 0; setTimeout(() => carga.remove(), 500);
    return S;
  }

  /* aviso de girar: se pone una vez dentro de la pantalla del cuento */
  const enVertical = () => matchMedia('(orientation: portrait) and (pointer: coarse)').matches;
  function ponAvisoGiro() {
    const p = document.getElementById('pCuento'); if (!p || p.querySelector('.esc-gira')) return; ponCSS();
    const d = h('div', 'esc-gira', `<div class="eg-flecha">↻</div><div class="eg-movil"><img src="img/lucas/senala.png" alt=""></div>
      <h2>¡Gira el móvil!</h2><p>Los cuentos se ven en <b>horizontal</b>, como en el cine. Pon el móvil de lado y la historia seguirá sola.</p>
      <p style="font-size:14px;opacity:.8">¿No gira? Quita el <b>bloqueo de rotación</b> desliza desde arriba y toca el candado 🔒.</p>`);
    d.appendChild(estrellas(30)); d.lastChild.className = 'esc-estrellas eg-estrellas'; p.appendChild(d);
  }
  /* espera a que el móvil esté en horizontal (el narrador no avanza mientras está en vertical) */
  function esperaHorizontal() {
    if (!enVertical()) return Promise.resolve();
    return new Promise(res => { const t = setInterval(() => { if (!enVertical()) { clearInterval(t); setTimeout(res, 600); } }, 300); });
  }
  if (typeof document === 'undefined') {} else if (document.readyState !== 'loading') ponAvisoGiro(); else document.addEventListener('DOMContentLoaded', ponAvisoGiro);

  return { crear, destruir, mostrar, precarga, portada, icono, esperaHorizontal, enVertical, PJ, FONDOS, NUEVOS, FALTA };
})();
