# LEO CON LUCAS · FuturMovil

App para aprender a leer (1º de Primaria, 5-8 años) con Lucas, el robot de FuturMovil.

- **Frontend:** GitHub Pages (`index.html`, `style.css`, `app.js`, `engine.js`, `data.js`, PWA con `manifest.json` y `sw.js`).
- **Backend:** Apps Script «leo con lucas» (`apps-script/Code.gs`) + Google Sheet «leo con lucas» (hojas Usuarios, Ninos, Actividad).
- **Login:** correo + contraseña (recuperable por correo) o Google.
- **Método:** silábico progresivo de España, 25 planetas (vocales → m p l s t n d f r c b v g j ñ ch ll/y z qu h gue/gui trabadas k/w/x → cuentos).
  El nivel de cada palabra se calcula por sus letras, así el niño nunca lee letras que no ha aprendido.
- **Ejercicios:** escucha y toca, burbujas, palabra→dibujo, dibujo→palabra, forma la palabra, sílaba que falta, letra inicial,
  frase→dibujo, verdad o mentira, ordena la frase, une, traza la letra, palmadas de sílabas, lee en voz alta (micro) y cuentos con preguntas.
- **Sin repeticiones:** memoria por niño (lo visto hace poco sale menos, las palabras falladas se repiten más).

## Imágenes propias
Sube `img/palabras/<palabra>.png` (sin tildes, ñ→n) y añade el nombre a `IMAGENES` en `data.js`.
