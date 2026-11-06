/* =====================================================================
   LEO CON LUCAS · Backend (Apps Script + Google Sheet)
   Frontend: https://puntofibra.github.io/leoconlucas/
   1) Ejecuta preparar() una vez (crea la hoja y pide permisos)
   2) Implementar → Aplicación web → Ejecutar como: yo · Acceso: cualquier usuario
   ===================================================================== */
const GOOGLE_CLIENT_ID = '454055120059-nuhaop4r62urc3u036cc3grpqo71ulg7.apps.googleusercontent.com';
const NOMBRE_HOJA = 'leo con lucas';
const ADMIN = 'futurmovil.com@gmail.com';

function doGet(e) {
  return responder_({ ok: true, app: 'Leo con Lucas', hora: new Date() }, e && e.parameter && e.parameter.callback);
}
function doPost(e) {
  let d = {};
  try { d = JSON.parse(e.postData.contents || '{}'); } catch (err) { return responder_({ ok: false, error: 'Petición no válida' }); }
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    return responder_(accion_(d));
  } catch (err) {
    return responder_({ ok: false, error: String(err && err.message || err) });
  } finally { try { lock.releaseLock(); } catch (e2) {} }
}
function accion_(d) {
  switch (d.accion) {
    case 'registro': return registro_(d);
    case 'login': return login_(d);
    case 'google': return google_(d);
    case 'estado': return estado_(d);
    case 'recuperar': return recuperar_(d);
    case 'nuevaClave': return nuevaClave_(d);
    case 'guardarNino': return guardarNino_(d);
    case 'borrarNino': return borrarNino_(d);
    default: return { ok: false, error: 'Acción desconocida' };
  }
}
function responder_(out, cb) {
  const json = JSON.stringify(out);
  if (cb && /^[\w$.]+$/.test(cb)) return ContentService.createTextOutput(cb + '(' + json + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

/* ---------------- preparar ---------------- */
function preparar() {
  ss_(); hUsuarios_(); hNinos_(); hActividad_();
  MailApp.getRemainingDailyQuota();
  UrlFetchApp.fetch('https://oauth2.googleapis.com/tokeninfo?id_token=x', { muteHttpExceptions: true });
  return 'Listo: ' + ss_().getUrl();
}

/* ---------------- hojas ---------------- */
function ss_() {
  const P = PropertiesService.getScriptProperties();
  let id = P.getProperty('SHEET_ID');
  if (id) { try { return SpreadsheetApp.openById(id); } catch (e) {} }
  const files = DriveApp.getFilesByName(NOMBRE_HOJA);
  while (files.hasNext()) { const f = files.next(); if (f.getMimeType() === MimeType.GOOGLE_SHEETS) { P.setProperty('SHEET_ID', f.getId()); return SpreadsheetApp.openById(f.getId()); } }
  const s = SpreadsheetApp.create(NOMBRE_HOJA);
  P.setProperty('SHEET_ID', s.getId());
  return s;
}
function hoja_(nombre, cab) {
  const s = ss_(); let h = s.getSheetByName(nombre);
  if (!h) {
    h = s.insertSheet(nombre); h.appendRow(cab); h.setFrozenRows(1);
    h.getRange(1, 1, 1, cab.length).setFontWeight('bold').setBackground('#0b1633').setFontColor('#17ff5f');
    const def = s.getSheetByName('Hoja 1') || s.getSheetByName('Sheet1');
    if (def && s.getSheets().length > 1 && def.getLastRow() === 0) s.deleteSheet(def);
  }
  return h;
}
const hUsuarios_ = () => hoja_('Usuarios', ['email', 'nombre', 'hash', 'sal', 'google', 'alta', 'ultimo', 'tokens', 'codigo', 'codigoCad']);
const hNinos_ = () => hoja_('Ninos', ['id', 'email', 'nombre', 'edad', 'color', 'nivel', 'estrellas', 'chispas', 'racha', 'minutos', 'ejercicios', 'aciertos%', 'actualizado', 'datos']);
const hActividad_ = () => hoja_('Actividad', ['fecha', 'email', 'nino', 'nivel', 'estrellas', 'ejercicios']);
const U = { email: 0, nombre: 1, hash: 2, sal: 3, google: 4, alta: 5, ultimo: 6, tokens: 7, codigo: 8, codigoCad: 9 };

function buscaUsuario_(email) {
  const h = hUsuarios_(), v = h.getDataRange().getValues();
  for (let i = 1; i < v.length; i++) if (String(v[i][0]).toLowerCase() === email) return { fila: i + 1, v: v[i], h };
  return null;
}
function porToken_(token) {
  if (!token) return null;
  const c = CacheService.getScriptCache().get('t_' + token);
  if (c) { const u = buscaUsuario_(c); if (u) return u; }
  const h = hUsuarios_(), v = h.getDataRange().getValues();
  for (let i = 1; i < v.length; i++) {
    if (String(v[i][U.tokens]).split(',').indexOf(token) >= 0) { CacheService.getScriptCache().put('t_' + token, String(v[i][0]).toLowerCase(), 21600); return { fila: i + 1, v: v[i], h }; }
  }
  return null;
}
function hash_(pass, sal) {
  const b = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, sal + '|' + pass, Utilities.Charset.UTF_8);
  return b.map(x => ('0' + (x & 255).toString(16)).slice(-2)).join('');
}
function nuevoToken_(u) {
  const t = Utilities.getUuid();
  const lista = String(u.v[U.tokens] || '').split(',').filter(String);
  lista.push(t);
  u.h.getRange(u.fila, U.tokens + 1).setValue(lista.slice(-6).join(','));
  u.h.getRange(u.fila, U.ultimo + 1).setValue(new Date());
  return t;
}
function sesion_(u, token) {
  const email = String(u.v[0]).toLowerCase();
  return { ok: true, token, email, nombre: u.v[U.nombre], ninos: ninosDe_(email), admin: email === ADMIN };
}
const emailOk_ = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e || '');

/* ---------------- cuentas ---------------- */
function registro_(d) {
  const email = String(d.email || '').trim().toLowerCase();
  if (!emailOk_(email)) return { ok: false, error: 'El correo no es válido' };
  if (!d.pass || String(d.pass).length < 6) return { ok: false, error: 'La contraseña necesita al menos 6 caracteres' };
  if (buscaUsuario_(email)) return { ok: false, error: 'Ese correo ya tiene cuenta. Pulsa «Entrar».' };
  const sal = Utilities.getUuid();
  hUsuarios_().appendRow([email, String(d.nombre || '').slice(0, 40), hash_(d.pass, sal), sal, '', new Date(), new Date(), '', '', '']);
  const u = buscaUsuario_(email);
  return sesion_(u, nuevoToken_(u));
}
function login_(d) {
  const email = String(d.email || '').trim().toLowerCase();
  const u = buscaUsuario_(email);
  if (!u) return { ok: false, error: 'No hay ninguna cuenta con ese correo' };
  if (!u.v[U.hash]) return { ok: false, error: 'Esta cuenta se creó con Google. Pulsa «Continuar con Google» o recupera la contraseña.' };
  if (hash_(d.pass, u.v[U.sal]) !== u.v[U.hash]) return { ok: false, error: 'Contraseña incorrecta' };
  return sesion_(u, nuevoToken_(u));
}
function google_(d) {
  const r = UrlFetchApp.fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(d.credential || ''), { muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) return { ok: false, error: 'No se pudo verificar la cuenta de Google' };
  const info = JSON.parse(r.getContentText());
  if (info.aud !== GOOGLE_CLIENT_ID) return { ok: false, error: 'Cliente de Google no válido' };
  if (String(info.email_verified) !== 'true') return { ok: false, error: 'Correo de Google sin verificar' };
  const email = String(info.email).toLowerCase();
  let u = buscaUsuario_(email);
  if (!u) {
    hUsuarios_().appendRow([email, info.name || info.given_name || '', '', '', info.sub, new Date(), new Date(), '', '', '']);
    u = buscaUsuario_(email);
  } else if (!u.v[U.google]) u.h.getRange(u.fila, U.google + 1).setValue(info.sub);
  return sesion_(u, nuevoToken_(u));
}
function estado_(d) {
  const u = porToken_(d.token);
  if (!u) return { ok: false, error: 'Sesión caducada. Vuelve a entrar.' };
  return sesion_(u, d.token);
}
function recuperar_(d) {
  const email = String(d.email || '').trim().toLowerCase();
  const u = buscaUsuario_(email);
  if (!u) return { ok: false, error: 'No hay ninguna cuenta con ese correo' };
  const codigo = String(Math.floor(100000 + Math.random() * 900000));
  u.h.getRange(u.fila, U.codigo + 1, 1, 2).setValues([[codigo, new Date(Date.now() + 30 * 60000)]]);
  MailApp.sendEmail({
    to: email, name: 'Leo con Lucas', subject: 'Tu código para Leo con Lucas: ' + codigo,
    htmlBody: '<div style="font-family:Arial;background:#050a1a;color:#fff;padding:24px;border-radius:16px">' +
      '<h2 style="color:#17ff5f">🚀 Leo con Lucas</h2><p>Tu código para crear una contraseña nueva es:</p>' +
      '<p style="font-size:34px;font-weight:bold;letter-spacing:6px;color:#17ff5f">' + codigo + '</p>' +
      '<p>Caduca en 30 minutos. Si no lo has pedido tú, ignora este correo.</p><p style="color:#9ab">FuturMovil</p></div>'
  });
  return { ok: true };
}
function nuevaClave_(d) {
  const email = String(d.email || '').trim().toLowerCase();
  const u = buscaUsuario_(email);
  if (!u) return { ok: false, error: 'No hay ninguna cuenta con ese correo' };
  if (!u.v[U.codigo] || String(u.v[U.codigo]) !== String(d.codigo).trim()) return { ok: false, error: 'El código no es correcto' };
  if (new Date(u.v[U.codigoCad]) < new Date()) return { ok: false, error: 'El código ha caducado. Pide otro.' };
  if (!d.pass || String(d.pass).length < 6) return { ok: false, error: 'La contraseña necesita al menos 6 caracteres' };
  const sal = Utilities.getUuid();
  u.h.getRange(u.fila, U.hash + 1, 1, 2).setValues([[hash_(d.pass, sal), sal]]);
  u.h.getRange(u.fila, U.codigo + 1, 1, 2).setValues([['', '']]);
  const u2 = buscaUsuario_(email);
  return sesion_(u2, nuevoToken_(u2));
}

/* ---------------- niños ---------------- */
function ninosDe_(email) {
  const v = hNinos_().getDataRange().getValues(), out = [];
  for (let i = 1; i < v.length; i++) {
    if (String(v[i][1]).toLowerCase() !== email) continue;
    let datos = null; try { datos = JSON.parse(v[i][13] || 'null'); } catch (e) {}
    out.push({ id: v[i][0], nombre: v[i][2], edad: Number(v[i][3]) || 6, color: Number(v[i][4]) || 0, datos });
  }
  return out;
}
function guardarNino_(d) {
  const u = porToken_(d.token);
  if (!u) return { ok: false, error: 'Sesión caducada. Vuelve a entrar.' };
  const email = String(u.v[0]).toLowerCase();
  const n = d.nino || {};
  if (!n.nombre) return { ok: false, error: 'Falta el nombre' };
  const h = hNinos_(), v = h.getDataRange().getValues();
  let fila = -1;
  if (n.id) for (let i = 1; i < v.length; i++) if (v[i][0] === n.id) { if (String(v[i][1]).toLowerCase() !== email) return { ok: false, error: 'No permitido' }; fila = i + 1; break; }
  if (!n.id) n.id = 'n' + Utilities.getUuid().slice(0, 8);
  const D = n.datos || {};
  let json = JSON.stringify(D);
  if (json.length > 48000 && D.mem && D.mem.seen) {   // límite de celda: recorta memoria antigua
    const ks = Object.keys(D.mem.seen).sort((a, b) => D.mem.seen[a] - D.mem.seen[b]);
    ks.slice(0, Math.ceil(ks.length / 2)).forEach(k => delete D.mem.seen[k]);
    json = JSON.stringify(D);
  }
  const st = D.st || {};
  let nivel = 0; const plan = D.plan || {};
  Object.keys(plan).forEach(k => { if (plan[k].m >= 2) nivel = Math.max(nivel, Number(k) + 1); });
  const fila_ = [n.id, email, String(n.nombre).slice(0, 20), Number(n.edad) || 6, Number(n.color) || 0, nivel, D.est || 0, D.chispas || 0,
    (D.racha && D.racha.n) || 0, Math.round((st.seg || 0) / 60), st.ej || 0, st.ej ? Math.round(st.ok / st.ej * 100) : 0, new Date(), json];
  if (fila > 0) {
    const prevEj = Number(v[fila - 1][10]) || 0;
    h.getRange(fila, 1, 1, fila_.length).setValues([fila_]);
    if ((st.ej || 0) > prevEj) hActividad_().appendRow([new Date(), email, n.nombre, nivel, D.est || 0, (st.ej || 0) - prevEj]);
  } else h.appendRow(fila_);
  return { ok: true, nino: { id: n.id } };
}
function borrarNino_(d) {
  const u = porToken_(d.token);
  if (!u) return { ok: false, error: 'Sesión caducada' };
  const email = String(u.v[0]).toLowerCase();
  const h = hNinos_(), v = h.getDataRange().getValues();
  for (let i = v.length - 1; i >= 1; i--) if (v[i][0] === d.id && String(v[i][1]).toLowerCase() === email) h.deleteRow(i + 1);
  return { ok: true };
}
