/* =====================================================================
   LEO CON LUCAS · Base de datos de lectura (1º de Primaria · España)
   Método silábico progresivo: vocales → m p l s t n d f r c b v g j ñ
   ch ll/y z/ce-ci qu h gue-gui trabadas → lectura de cuentos.
   El nivel de cada palabra y frase se calcula SOLO a partir de sus letras,
   así un niño nunca ve una palabra con letras que aún no ha aprendido.
   ===================================================================== */
'use strict';

/* ---------- PLANETAS (niveles) ---------- */
const PLANETAS = [
  { id: 0,  letra: 'a e i o u', nombre: 'Planeta Vocalia',   color: '#17ff5f', silabas: ['a','e','i','o','u'] },
  { id: 1,  letra: 'm',  nombre: 'Planeta Mimo',      color: '#b388ff', silabas: ['ma','me','mi','mo','mu'] },
  { id: 2,  letra: 'p',  nombre: 'Planeta Pupi',      color: '#ff8a3d', silabas: ['pa','pe','pi','po','pu'] },
  { id: 3,  letra: 'l',  nombre: 'Planeta Lunalú',    color: '#18e0ff', silabas: ['la','le','li','lo','lu','al','el','ol'] },
  { id: 4,  letra: 's',  nombre: 'Planeta Solsí',     color: '#ff4d5e', silabas: ['sa','se','si','so','su','as','es','os'] },
  { id: 5,  letra: 't',  nombre: 'Planeta Tictac',    color: '#17ff5f', silabas: ['ta','te','ti','to','tu'] },
  { id: 6,  letra: 'n',  nombre: 'Planeta Nubená',    color: '#b388ff', silabas: ['na','ne','ni','no','nu','an','en','un'] },
  { id: 7,  letra: 'd',  nombre: 'Planeta Dodó',      color: '#ff8a3d', silabas: ['da','de','di','do','du'] },
  { id: 8,  letra: 'f',  nombre: 'Planeta Fofi',      color: '#18e0ff', silabas: ['fa','fe','fi','fo','fu'] },
  { id: 9,  letra: 'r rr', nombre: 'Planeta Rorro',   color: '#ff4d5e', silabas: ['ra','re','ri','ro','ru','rra','rre','rri','rro','ar','or'] },
  { id: 10, letra: 'ca co cu', nombre: 'Planeta Cocú', color: '#17ff5f', silabas: ['ca','co','cu'] },
  { id: 11, letra: 'b',  nombre: 'Planeta Burbu',     color: '#b388ff', silabas: ['ba','be','bi','bo','bu'] },
  { id: 12, letra: 'v',  nombre: 'Planeta Volví',     color: '#ff8a3d', silabas: ['va','ve','vi','vo','vu'] },
  { id: 13, letra: 'ga go gu', nombre: 'Planeta Gogú', color: '#4fc3ff', silabas: ['ga','go','gu'] },
  { id: 14, letra: 'j ge gi', nombre: 'Planeta Jijí', color: '#ff4d5e', silabas: ['ja','je','ji','jo','ju','ge','gi'] },
  { id: 15, letra: 'ñ',  nombre: 'Planeta Ñoño',      color: '#17ff5f', silabas: ['ña','ñe','ñi','ño','ñu'] },
  { id: 16, letra: 'ch', nombre: 'Planeta Chachi',    color: '#b388ff', silabas: ['cha','che','chi','cho','chu'] },
  { id: 17, letra: 'll y', nombre: 'Planeta Llalla',  color: '#ff4fa3', silabas: ['lla','lle','lli','llo','llu','ya','ye','yo','yu'] },
  { id: 18, letra: 'z ce ci', nombre: 'Planeta Zuzú', color: '#18e0ff', silabas: ['za','zo','zu','ce','ci'] },
  { id: 19, letra: 'que qui', nombre: 'Planeta Quiqui', color: '#ff4d5e', silabas: ['que','qui'] },
  { id: 20, letra: 'h',  nombre: 'Planeta Hoho',      color: '#17ff5f', silabas: ['ha','he','hi','ho','hu'] },
  { id: 21, letra: 'gue gui', nombre: 'Planeta Guiguí', color: '#b388ff', silabas: ['gue','gui','güe','güi'] },
  { id: 22, letra: 'pl br tr…', nombre: 'Planeta Trabalandia', color: '#ff8a3d', silabas: ['pla','ple','bra','bro','tra','tre','cla','cro','fla','fre','gla','gra','dra','pri','bla'] },
  { id: 23, letra: 'k w x', nombre: 'Planeta Kiwix',  color: '#18e0ff', silabas: ['ka','ki','ko','wi','xi'] },
  { id: 24, letra: '📖',  nombre: 'Galaxia Cuentos',  color: '#ff4d5e', silabas: [] }
];

/* ---------- PALABRAS: 'sí-la-bas|emoji|género(m/f)' ---------- */
const PALABRAS_RAW = `
ma-má|👩|f
pa-pá|👨|m
ma-pa|🗺️|m
pu-ma|🐆|m
lu-pa|🔍|f
pe-lo|💇|m
o-la|🌊|f
mu-la||f
pi-la|🔋|f
pa-lo|🪵|m
pa-la|🪏|f
li-ma|🍋‍🟩|f
mo-no|🐒|m
sa-po|🐸|m
o-so|🐻|m
so-pa|🍲|f
sol|☀️|m
sal|🧂|f
me-sa||f
pi-so|🏢|m
pe-so|⚖️|m
sie-te|7️⃣|m
se-ta|🍄|f
mo-to|🏍️|f
pa-to|🦆|m
to-ma-te|🍅|m
pe-lo-ta|⚽|f
pa-ta-ta|🥔|f
ma-le-ta|🧳|f
pi-ña|🍍|f
nu-be|☁️|f
lu-na|🌙|f
ma-no|✋|f
ni-ño|🧒|m
ni-ña|👧|f
mo-ne-da|🪙|f
ni-do|🪺|m
de-do|☝️|m
da-do|🎲|m
dos|2️⃣|m
dien-te|🦷|m
pan|🍞|m
pie|🦶|m
pi-no|🌲|m
pa-lo-ma|🕊️|f
me-lón|🍈|m
li-món|🍋|m
la-ta|🥫|f
le-ón|🦁|m
ma-ní|🥜|m
lo-ro|🦜|m
ra-tón|🐭|m
ra-na||f
ro-sa|🌹|f
ri-sa|😂|f
ro-pa|👕|f
ra-mo|💐|m
pe-rro|🐕|m
to-rre|🗼|f
ma-ri-po-sa|🦋|f
to-ro|🐂|m
pe-ra|🍐|f
mu-ro|🧱|m
fa-rol|🏮|m
fo-ca|🦭|f
fue-go|🔥|m
fo-to|📷|f
so-fá|🛋️|m
ca-sa|🏠|f
ca-ma|🛏️|f
co-co|🥥|m
ca-pa|🦸|f
va-ca|🐄|f
bo-ca|👄|f
ca-ra|🙂|f
co-me-ta|🪁|f
pa-ra-guas|☂️|m
ca-ra-col|🐌|m
ca-mi-sa|👔|f
ca-mión|🚚|m
cu-cha-ra|🥄|f
co-ne-jo|🐇|m
ba-lón|🏀|m
bo-ta|👢|f
bu-rro|🫏|m
be-bé|👶|m
bú-ho|🦉|m
bo-tón|🔘|m
bi-ci|🚲|f
bom-be-ro|🧑‍🚒|m
bar-co|⛵|m
bo-la|🎱|f
lo-bo|🐺|m
bú-fa-lo|🦬|m
ba-lle-na|🐋|f
ár-bol|🌳|m
ve-la|🕯️|f
va-so|🥤|m
u-va|🍇|f
na-ve|🛸|f
lla-ve|🔑|f
nue-ve|9️⃣|m
vol-cán|🌋|m
ven-ta-na|🪟|f
ga-to|🐱|m
go-ma||f
ga-llo|🐓|m
ga-fas|👓|f
go-rro|🧢|m
gu-sa-no|🪱|m
a-gua|🚰|f
ga-lle-ta|🍪|f
go-ta|💧|f
tor-tu-ga|🐢|f
hor-mi-ga|🐜|f
ju-go|🧃|m
ja-món|🍖|m
ja-bón|🧼|m
ji-ra-fa|🦒|f
jo-ya|💍|f
o-jo|👁️|m
o-re-ja|👂|f
ca-ja|📦|f
a-be-ja|🐝|f
ge-ma|💎|f
gi-ra-sol|🌻|m
pin-güi-no|🐧|m
mu-ñe-ca|🪆|f
ba-ño|🛁|m
u-ña|💅|f
ca-ba-ña|🛖|f
a-ra-ña|🕷️|f
mon-ta-ña|⛰️|f
cho-co-la-te|🍫|m
co-che|🚗|m
le-che|🥛|f
no-che|🌃|f
o-cho|8️⃣|m
du-cha|🚿|f
ha-cha|🪓|f
llu-via|🌧️|f
po-llo|🐥|m
si-lla|🪑|f
ca-ba-llo|🐎|m
bo-te-lla|🍾|f
es-tre-lla|⭐|f
ar-di-lla|🐿️|f
pla-ya|🏖️|f
yo-yó|🪀|m
ya-te|🛥️|m
rey|🤴|m
zo-rro|🦊|m
za-pa-to|👞|m
ta-za|☕|f
la-zo|🎀|m
ce-bo-lla|🧅|f
ce-re-za|🍒|f
ci-ne|🎬|m
cer-do|🐖|m
cin-co|5️⃣|m
ce-ro|0️⃣|m
lá-piz|✏️|m
pez|🐟|m
na-riz|👃|f
diez|🔟|m
ar-co-í-ris|🌈|m
que-so|🧀|m
mos-qui-to|🦟|m
ra-que-ta|🏸|f
co-he-te|🚀|m
he-la-do|🍦|m
hue-vo|🥚|m
ho-ja|🍃|f
ha-da|🧚|f
hi-po-pó-ta-mo|🦛|m
hie-lo|🧊|m
gui-ta-rra|🎸|f
ju-gue-te|🧸|m
gui-san-te|🫛|m
dra-gón|🐉|m
tren|🚂|m
fre-sa|🍓|f
flor|🌸|f
plá-ta-no|🍌|m
pla-to|🍽️|m
glo-bo|🎈|m
bra-zo|💪|m
bru-ja|🧙‍♀️|f
li-bro|📚|m
co-co-dri-lo|🐊|m
gri-llo|🦗|m
tri-go|🌾|m
pla-ne-ta|🪐|m
pul-po|🐙|m
ti-gre|🐅|m
ca-bra|🐐|f
fla-men-co|🦩|m
tres|3️⃣|m
cua-tro|4️⃣|m
re-ga-lo|🎁|m
ki-wi|🥝|m
ko-a-la|🐨|m
ta-xi|🚕|m
ro-bot|🤖|m
as-tro-nau-ta|🧑‍🚀|m
te-les-co-pio|🔭|m
pa-ya-so|🤡|m
ca-ra-me-lo|🍬|m
tar-ta|🎂|f
sal-chi-cha|🌭|f
za-na-ho-ria|🥕|f
pi-mien-to|🫑|m
ma-íz|🌽|m
pe-pi-no|🥒|m
pa-lo-mi-tas|🍿|f
ham-bur-gue-sa|🍔|f
man-za-na|🍎|f
na-ran-ja|🍊|f
san-dí-a|🍉|f
me-lo-co-tón|🍑|m
pá-ja-ro|🐦|m
pa-vo|🦃|m
ca-ma-le-ón|🦎|m
ser-pien-te|🐍|f
di-no-sau-rio|🦕|m
ti-bu-rón|🦈|m
del-fín|🐬|m
can-gre-jo|🦀|m
me-du-sa|🪼|f
ca-ra-co-la|🐚|f
ce-bra|🦓|f
e-le-fan-te|🐘|m
ca-me-llo|🐫|m
pan-da|🐼|m
mur-cié-la-go|🦇|m
ma-ri-qui-ta|🐞|f
mos-ca|🪰|f
puer-ta|🚪|f
re-loj|⏰|m
es-pe-jo|🪞|m
ti-je-ras|✂️|f
pei-ne|🪮|m
ce-pi-llo|🪥|m
bu-fan-da|🧣|f
guan-te|🧤|m
cal-ce-tín|🧦|m
za-pa-ti-lla|👟|f
ves-ti-do|👗|m
co-ro-na|👑|f
mo-chi-la|🎒|f
cua-der-no|📓|m
re-gla|📏|f
pin-tu-ra|🎨|f
pa-ti-ne-te|🛴|m
au-to-bús|🚌|m
a-vión|✈️|m
he-li-cóp-te-ro|🚁|m
cam-pa-na|🔔|f
tam-bor|🥁|m
pia-no|🎹|m
trom-pe-ta|🎺|f
vio-lín|🎻|m
mú-si-ca|🎵|f
ra-yo|⚡|m
cac-tus|🌵|m
tu-li-pán|🌷|m
pal-me-ra|🌴|f
pie-dra|🪨|f
pier-na|🦵|f
co-ra-zón|❤️|m
a-bue-lo|👴|m
a-bue-la|👵|f
po-li-cí-a|👮|m
co-ci-ne-ro|🧑‍🍳|m
pi-ra-ta|🏴‍☠️|m
rei-na|👸|f
fan-tas-ma|👻|m
mar-cia-no|👽|m
me-da-lla|🏅|f
co-pa|🏆|f
a-rroz|🍚|m
miel|🍯|f
cas-ti-llo|🏰|m
lla-ma|🦙|f
pa-ta|🐾|f
pe-lu-che|🧸|m
pi-pa||f
lu-nes||m
na-ta||f
ma-sa||f
ra-ma||f
ra-ta||f
ma-mut|🦣|m
o-ve-ja|🐑|f
ca-ba-lle-ro||m
sie-rra|🪚|f
ca-ñón||m
ya-te|🛥️|m
llu-via|🌧️|f
`;

/* Palabras sin dibujo, muy útiles para practicar lectura y sílabas */
const PALABRAS_LECTURA = `a-ma a-mo mí-o mí-a mi-ma mi-mo E-ma e-me Pe-pe Pi-po pu-pa po-mo pi-pa pa-pi
li-la Lo-la La-lo a-la ma-lo mo-le Pi-li Pa-co Lu-pe pa-sa pe-sa me-sa pi-sa sa-la Su-si e-so e-sa so-lo sa-le sa-la-do
te-la ta-pa Ti-to tí-o tí-a to-ma pa-sa-mos tos ma-ta to-pe ta-co
na-na Na-ti Ni-na A-na u-no u-na no-ta ti-na nu-ca mo-ño lu-nes Ne-lo
Da-ni da-ma du-da Do-ra de-sa-yu-no di-ne-ro da-me na-da to-do mo-da
fi-la Fe-de Fi-to fe-o fu-ma fi-no fa-ma
ra-ma ro-ja Ri-ta ra-to Ra-úl ro-to ru-do ma-ri-ne-ro
co-sa co-mo ca-si cu-na Ca-ro bo-ni-to ba-ta be-so bo-te vi-da voy va-mos ve-o
ga-na lle-ga lla-ma ya so-ñar ce-na ci-ta que-da qui-ta hay hu-ma-no ho-la hoy hi-lo`.split(/\s+/).filter(Boolean);

/* ---------- FRASES PARA LEER Y ORDENAR ---------- */
const FRASES = `Mi mamá me mima.
Ema ama a mamá.
Amo a mi mamá.
Mimo a mi mamá.
Mi papá me ama.
Papá mima a Pepe.
Pepe ama a Pipo.
Mi mamá y mi papá.
Lola me ama.
La pala de Lalo.
Lalo pela la lima.
Papá y Lola pasean.
El pelo de mamá.
Mi mula se llama Lila.
El oso se asoma.
Susi pasa la sal.
La sopa de mamá.
Sale el sol.
El sapo pasea solo.
Pepe usa la lupa.
Mi oso es suave.
Tito toma tomate.
El pato pisa la tela.
Mi moto es lila.
Toma la pelota, Tito.
La maleta de papá.
La patata es de Tomás.
La luna sale.
Nina tiene un mono.
El nene toma la sopa.
Ana pinta la mano.
El mono salta en el pino.
Lola tiene un pato.
El dedo de Dani.
Dani pinta un dado.
El nido está en el pino.
Dame la pelota.
Mi tío tiene dos patos.
Daniel salta y salta.
Fede toma una foto.
Mi sofá es de color lila.
Fina come fideos.
La foca nada feliz.
El loro de Rita es rojo.
Ramón toma una rosa.
El perro corre mucho.
La rana salta en el río.
Mi ropa está en el armario.
Carlos come coco.
La vaca come pasto.
Mi casa es pequeña.
El caracol va despacio.
La cama de Coco.
Beto bebe agua.
El bebé come papilla.
Mi balón es bonito.
El lobo sube a la loma.
La bota de Berta.
Veo una vela.
La uva es dulce.
Mi vaso tiene leche.
El volcán echa fuego.
La nave vuela alto.
El gato toma leche.
Gonzalo tiene un gorro.
La goma es de Gabi.
El gusano sale de la manzana.
El conejo come zanahorias.
Mi oreja es pequeña.
La jirafa es muy alta.
José juega con Julia.
La gema brilla mucho.
El niño se baña.
La araña teje su tela.
La piña es una fruta.
La muñeca de Toña.
El coche de papá es rojo.
La leche está muy rica.
Me ducho por la noche.
Como chocolate con churros.
La llave abre la puerta.
La lluvia moja la calle.
El caballo corre rápido.
Yo tengo un yoyó.
El pollo come maíz.
El zorro vive en el bosque.
Mis zapatos son azules.
La taza tiene cacao.
Cecilia come cerezas.
El cine es divertido.
Me gusta el queso.
El mosquito pica mucho.
Quique quiere una raqueta.
El hada tiene alas.
Hoy hace mucho calor.
El helado es de fresa.
La hormiga lleva una hoja.
Miguel toca la guitarra.
El pingüino nada en el agua.
Guillermo tiene un juguete nuevo.
El tren llega a la estación.
La fresa es roja y dulce.
Pablo planta una flor.
El dragón vuela sobre el castillo.
Mi libro tiene muchos dibujos.
El cocodrilo tiene dientes grandes.
Lucas es un robot muy listo.
Lucas vuela por el espacio.
Lucas tiene una capa roja.
Los ojos de Lucas son verdes.
Lucas lee un cuento cada día.
El cohete sube hasta la luna.
Las estrellas brillan de noche.
El astronauta saluda desde la nave.
Mi abuela me lee un cuento.
Mi abuelo cuida el jardín.
El koala duerme en el árbol.
El taxi es amarillo.
Me gusta comer kiwi.`.split('\n').map(s => s.trim()).filter(Boolean);

/* ---------- VERDADERO / FALSO ---------- */
const VERDAD = `Mamá me mima.|v
Un pato nada.|v
Mi mano tiene dedos.|v
El tomate es lila.|f
Un sapo salta.|v
Un mono tiene alas.|f
El sol sale de día.|v
La luna sale de noche.|v
El oso es un pez.|f
Los peces viven en el agua.|v
El elefante es pequeño.|f
Los gatos dicen guau.|f
El dado tiene seis lados.|v
La nieve es caliente.|f
El fuego quema.|v
Los peces vuelan.|f
Las vacas dan leche.|v
Las ruedas son cuadradas.|f
El hielo está frío.|v
Lucas es un robot.|v
Lucas es un gato.|f
La fresa es roja.|v
El limón es dulce.|f
Los pájaros tienen plumas.|v
Las serpientes tienen patas.|f
Dormimos en la cama.|v
Comemos con los pies.|f
La semana tiene siete días.|v
Un perro tiene cuatro patas.|v
La jirafa tiene el cuello corto.|f
El tomate es azul.|f
El cielo es azul.|v
En la playa hay arena.|v
Los peces viven en los árboles.|f
El sol sale de noche.|f
Una mano tiene cinco dedos.|v
Las abejas hacen miel.|v
Los coches vuelan.|f
Lavo mis manos con jabón.|v
La pelota es redonda.|v
El mono come plátanos.|v
El pato dice miau.|f
Uno más uno son dos.|v
Una moto tiene diez ruedas.|f
El tren va por la vía.|v
El hada tiene alas.|v
La tortuga es muy rápida.|f
El conejo come zanahorias.|v
El pingüino vive en el desierto.|f
El helado está caliente.|f
Las plantas necesitan agua.|v
La noche es oscura.|v
En invierno hace calor.|f
La luna es de queso.|f
Lucas vuela por el espacio.|v
Lucas tiene los ojos verdes.|v
Lucas tiene una capa azul.|f
El melón es una fruta.|v
La sopa se toma con tenedor.|f
El pez tiene patas.|f
La vaca dice mu.|v
El perro dice pío.|f
El león es el rey de la selva.|v
Las nubes están en el suelo.|f
Los bomberos apagan el fuego.|v
El caracol es muy rápido.|f
Los niños van al colegio.|v
El agua del mar es dulce.|f
Las ballenas viven en el mar.|v
El reloj nos dice la hora.|v
Un gato tiene ocho patas.|f
Las arañas tienen ocho patas.|v
La sal es dulce.|f
El dinosaurio es un juguete de verdad.|f
Un cohete puede ir al espacio.|v
Los búhos duermen de día.|v
La leche es negra.|f
Una semana tiene diez días.|f
Las gallinas ponen huevos.|v
Los árboles tienen hojas.|v
Un coche tiene cuatro ruedas.|v
Dos más dos son cinco.|f
La pera es una fruta.|v
Los patos tienen plumas.|v
El cocodrilo tiene alas.|f`.split('\n').map(l => { const [t, r] = l.split('|'); return { t: t.trim(), v: r.trim() === 'v' }; });

/* ---------- PLANTILLAS frase + dibujo (se combinan con las palabras) ---------- */
const PLANTILLAS = [
  'Mi {n}.', 'Es {un} {n}.', 'Veo {un} {n}.', 'Toma {el} {n}.', 'Mira {el} {n}.',
  'Lola tiene {un} {n}.', 'Lucas tiene {un} {n}.', 'Pepe pinta {un} {n}.', 'Me gusta {el} {n}.',
  'Dani dibuja {un} {n}.', 'Ana ve {un} {n}.', 'Aquí hay {un} {n}.', 'El robot lleva {un} {n}.',
  'Lucas vuela con {un} {n}.', '¿Dónde está {el} {n}?', 'Papá mira {el} {n}.', 'La niña tiene {un} {n}.',
  'Susi pinta {un} {n}.', 'Tito ama {el} {n}.', 'Sale {un} {n}.', 'Ese es mi {n}.', 'Nina toca {el} {n}.',
  'Mamá tiene {un} {n}.', 'En la mesa hay {un} {n}.', 'Lucas busca {el} {n}.', 'Me encanta {el} {n}.'
];

/* ---------- CUENTOS con preguntas ---------- */
const CUENTOS = [
  { t: 'Mi mamá', e: '👩', x: 'Mi mamá. Mi mamá me mima. Amo a mi mamá.',
    q: [{ p: '¿Quién me mima?', o: ['👩 mamá', '🐻 oso', '🐸 sapo'], k: 0 }] },
  { t: 'Pepe y papá', e: '👨', x: 'Pepe ama a papá. Papá mima a Pepe. Papá y Pepe.',
    q: [{ p: '¿A quién ama Pepe?', o: ['👨 papá', '🐒 mono', '🌊 ola'], k: 0 }] },
  { t: 'La pala', e: '🪏', x: 'Lalo tiene una pala. La pala es lila. Lalo juega con su pala en la arena.',
    q: [{ p: '¿De qué color es la pala?', o: ['🟣 lila', '🔴 roja', '🟢 verde'], k: 0 }] },
  { t: 'El oso Sol', e: '🐻', x: 'El oso se llama Sol. Sol pasea solo. Sol se asoma y ve un sapo. ¡Hola, sapo!',
    q: [{ p: '¿Cómo se llama el oso?', o: ['☀️ Sol', '🌙 Luna', '⭐ Estrella'], k: 0 },
        { p: '¿Qué ve el oso?', o: ['🐸 un sapo', '🐕 un perro', '🐱 un gato'], k: 0 }] },
  { t: 'El pato Tito', e: '🦆', x: 'Tito es un pato. Tito toma tomate. Tito pisa la tela de mamá pata. ¡Ay, Tito!',
    q: [{ p: '¿Qué es Tito?', o: ['🦆 un pato', '🐒 un mono', '🐻 un oso'], k: 0 },
        { p: '¿Qué toma Tito?', o: ['🍅 tomate', '🍌 plátano', '🍕 pizza'], k: 0 }] },
  { t: 'Nina y el mono', e: '🐒', x: 'Nina tiene un mono. El mono se llama Nino. Nino salta en el pino. Nina se ríe mucho.',
    q: [{ p: '¿Dónde salta el mono?', o: ['🌲 en el pino', '🛏️ en la cama', '🚗 en el coche'], k: 0 },
        { p: '¿Cómo se llama el mono?', o: ['Nino', 'Lucas', 'Pepe'], k: 0 }] },
  { t: 'El dado de Dani', e: '🎲', x: 'Dani tiene un dado. El dado tiene seis lados. Dani tira el dado y sale un dos. ¡Dos pasos!',
    q: [{ p: '¿Qué número sale?', o: ['2️⃣ dos', '5️⃣ cinco', '🔟 diez'], k: 0 },
        { p: '¿Cuántos lados tiene el dado?', o: ['6️⃣ seis', '3️⃣ tres', '1️⃣ uno'], k: 0 }] },
  { t: 'La foca Fifí', e: '🦭', x: 'Fifí es una foca. Fifí nada en el mar. Fifí toma una foto de un pez. ¡Qué foto tan bonita!',
    q: [{ p: '¿Dónde nada Fifí?', o: ['🌊 en el mar', '🏠 en la casa', '🌳 en el árbol'], k: 0 },
        { p: '¿De qué toma una foto?', o: ['🐟 de un pez', '🚀 de un cohete', '🍎 de una manzana'], k: 0 }] },
  { t: 'El ratón Ramón', e: '🐭', x: 'Ramón es un ratón. Ramón corre por la torre. Ramón ve una rosa roja. Ramón se la da a su mamá.',
    q: [{ p: '¿Por dónde corre Ramón?', o: ['🗼 por la torre', '🌊 por el mar', '☁️ por las nubes'], k: 0 },
        { p: '¿A quién le da la rosa?', o: ['👩 a su mamá', '🐱 al gato', '🤖 a Lucas'], k: 0 }] },
  { t: 'La casa de Coco', e: '🏠', x: 'Coco es un caracol. Coco lleva su casa a cuestas. Coco come una hoja. Coco va despacio, muy despacio.',
    q: [{ p: '¿Qué es Coco?', o: ['🐌 un caracol', '🐇 un conejo', '🦁 un león'], k: 0 },
        { p: '¿Cómo va Coco?', o: ['🐢 despacio', '🚀 muy rápido', '✈️ volando'], k: 0 }] },
  { t: 'El balón de Beto', e: '🏀', x: 'Beto tiene un balón. El balón bota y bota. El balón sube al árbol. Un búho baja el balón.',
    q: [{ p: '¿Dónde sube el balón?', o: ['🌳 al árbol', '🏠 a la casa', '🌙 a la luna'], k: 0 },
        { p: '¿Quién baja el balón?', o: ['🦉 un búho', '🐕 un perro', '👨 papá'], k: 0 }] },
  { t: 'La nave de Lucas', e: '🛸', x: 'Lucas tiene una nave. La nave vuela muy alto. Lucas ve la luna y las estrellas. ¡Qué bonito es el espacio!',
    q: [{ p: '¿Qué tiene Lucas?', o: ['🛸 una nave', '🚲 una bici', '⛵ un barco'], k: 0 },
        { p: '¿Qué ve Lucas?', o: ['🌙 la luna', '🐄 una vaca', '🍕 una pizza'], k: 0 }] },
  { t: 'El gato goloso', e: '🐱', x: 'Gus es un gato goloso. A Gus le gusta la leche. Gus ve una galleta en la mesa. ¡Gus se la come!',
    q: [{ p: '¿Qué le gusta a Gus?', o: ['🥛 la leche', '🥕 la zanahoria', '🥦 el brócoli'], k: 0 },
        { p: '¿Qué ve Gus en la mesa?', o: ['🍪 una galleta', '⚽ una pelota', '📚 un libro'], k: 0 }] },
  { t: 'La jirafa Juana', e: '🦒', x: 'Juana es una jirafa. Juana tiene el cuello muy largo. Juana come hojas de los árboles altos. Juana juega con su amigo el conejo.',
    q: [{ p: '¿Cómo es el cuello de Juana?', o: ['📏 muy largo', '🤏 muy corto', '🔴 rojo'], k: 0 },
        { p: '¿Con quién juega Juana?', o: ['🐇 con el conejo', '🦈 con el tiburón', '🐙 con el pulpo'], k: 0 }] },
  { t: 'La araña Toña', e: '🕷️', x: 'Toña es una araña. Toña teje su tela por la mañana. En la tela brilla el rocío. Toña se baña con el sol.',
    q: [{ p: '¿Cuándo teje Toña?', o: ['🌅 por la mañana', '🌃 por la noche', '🍽️ en la comida'], k: 0 }] },
  { t: 'El coche de Chema', e: '🚗', x: 'Chema tiene un coche rojo. El coche hace chuf, chuf. Chema lleva a su hija al colegio. Por la noche, el coche duerme en el garaje.',
    q: [{ p: '¿De qué color es el coche?', o: ['🔴 rojo', '🔵 azul', '🟡 amarillo'], k: 0 },
        { p: '¿Dónde duerme el coche?', o: ['🏠 en el garaje', '🌊 en el mar', '🌳 en el árbol'], k: 0 }] },
  { t: 'La lluvia', e: '🌧️', x: 'Hoy llueve mucho. Las calles están mojadas. Yolanda lleva su paraguas y sus botas. ¡Plas, plas! Yolanda salta en los charcos.',
    q: [{ p: '¿Qué lleva Yolanda?', o: ['☂️ un paraguas', '🕶️ unas gafas de sol', '🏖️ una toalla'], k: 0 },
        { p: '¿Dónde salta Yolanda?', o: ['💧 en los charcos', '🛏️ en la cama', '🌙 en la luna'], k: 0 }] },
  { t: 'El zorro y la taza', e: '🦊', x: 'Un zorro tenía mucha sed. Encontró una taza con agua. El zorro bebió despacio. Después se fue a dormir bajo un árbol.',
    q: [{ p: '¿Qué encontró el zorro?', o: ['☕ una taza', '👞 un zapato', '🎈 un globo'], k: 0 },
        { p: '¿Dónde se fue a dormir?', o: ['🌳 bajo un árbol', '🚗 en un coche', '🏰 en un castillo'], k: 0 }] },
  { t: 'El queso de Quique', e: '🧀', x: 'Quique es un ratoncito. Quique quiere queso. Busca en la cocina y encuentra un trozo enorme. ¡Qué rico está el queso!',
    q: [{ p: '¿Qué quiere Quique?', o: ['🧀 queso', '🍦 helado', '🥕 zanahoria'], k: 0 },
        { p: '¿Dónde busca?', o: ['🍳 en la cocina', '🛁 en el baño', '🌳 en el parque'], k: 0 }] },
  { t: 'El helado de Hugo', e: '🍦', x: 'Hoy hace calor. Hugo quiere un helado. Su abuela le compra uno de fresa. Hugo dice: ¡gracias, abuela!',
    q: [{ p: '¿De qué es el helado?', o: ['🍓 de fresa', '🍫 de chocolate', '🍋 de limón'], k: 0 },
        { p: '¿Quién le compra el helado?', o: ['👵 la abuela', '🤖 Lucas', '🐶 el perro'], k: 0 }] },
  { t: 'El pingüino Guille', e: '🐧', x: 'Guille es un pingüino. Vive en el hielo, donde hace mucho frío. Guille nada muy rápido y pesca peces. Guille toca la guitarra para sus amigos.',
    q: [{ p: '¿Dónde vive Guille?', o: ['🧊 en el hielo', '🏜️ en el desierto', '🌴 en la playa'], k: 0 },
        { p: '¿Qué toca Guille?', o: ['🎸 la guitarra', '🥁 el tambor', '🎹 el piano'], k: 0 }] },
  { t: 'El dragón y la flor', e: '🐉', x: 'Había una vez un dragón muy grande. El dragón tenía miedo de las flores. Un día, una niña le regaló una flor. El dragón sonrió y ya no tuvo miedo.',
    q: [{ p: '¿De qué tenía miedo el dragón?', o: ['🌸 de las flores', '🐭 de los ratones', '🌑 de la noche'], k: 0 },
        { p: '¿Qué le regaló la niña?', o: ['🌸 una flor', '🎂 una tarta', '🧸 un peluche'], k: 0 }] },
  { t: 'Lucas y el planeta perdido', e: '🪐', x: 'Lucas viaja en su cohete por el espacio. De pronto ve un planeta pequeño y triste. Nadie lee libros allí. Lucas les regala cuentos y el planeta se llena de luz y alegría.',
    q: [{ p: '¿En qué viaja Lucas?', o: ['🚀 en un cohete', '🚲 en una bici', '🚂 en un tren'], k: 0 },
        { p: '¿Qué regala Lucas?', o: ['📚 cuentos', '🍬 caramelos', '⚽ pelotas'], k: 0 },
        { p: '¿Cómo queda el planeta al final?', o: ['😀 alegre', '😢 triste', '😠 enfadado'], k: 0 }] },
  { t: 'La tortuga y la liebre', e: '🐢', x: 'La liebre corría muy rápido y se reía de la tortuga. Hicieron una carrera. La liebre se durmió bajo un árbol. La tortuga, paso a paso, llegó primero a la meta.',
    q: [{ p: '¿Quién se durmió?', o: ['🐇 la liebre', '🐢 la tortuga', '🦉 el búho'], k: 0 },
        { p: '¿Quién ganó la carrera?', o: ['🐢 la tortuga', '🐇 la liebre', '🐕 el perro'], k: 0 }] },
  { t: 'El robot que no sabía leer', e: '🤖', x: 'Había un robot que no sabía leer. Cada día, Lucas le enseñaba una letra. Primero la a, luego la m y luego la p. Al final, el robot leyó su primer libro. ¡Bravo!',
    q: [{ p: '¿Quién enseñaba al robot?', o: ['🤖 Lucas', '👩 mamá', '🐱 el gato'], k: 0 },
        { p: '¿Qué letra aprendió primero?', o: ['a', 'm', 'z'], k: 0 }] },
  { t: 'El cumpleaños de Clara', e: '🎂', x: 'Hoy es el cumpleaños de Clara. Hay una tarta con seis velas. Sus amigos le traen regalos. Clara sopla las velas y pide un deseo.',
    q: [{ p: '¿Cuántas velas tiene la tarta?', o: ['6️⃣ seis', '2️⃣ dos', '🔟 diez'], k: 0 },
        { p: '¿Qué hace Clara con las velas?', o: ['💨 las sopla', '🍴 se las come', '🎨 las pinta'], k: 0 }] },
  { t: 'El astronauta Bruno', e: '🧑‍🚀', x: 'Bruno es astronauta. Se pone su traje y sube al cohete. Tres, dos, uno… ¡despegue! Desde arriba, la Tierra parece una pelota azul.',
    q: [{ p: '¿Qué es Bruno?', o: ['🧑‍🚀 astronauta', '🧑‍🍳 cocinero', '🧑‍🚒 bombero'], k: 0 },
        { p: '¿A qué se parece la Tierra?', o: ['🔵 a una pelota azul', '🍌 a un plátano', '🧀 a un queso'], k: 0 }] },
  { t: 'La granja de Pablo', e: '🐄', x: 'Pablo vive en una granja. Tiene una vaca, dos cerdos y tres gallinas. Por la mañana, Pablo da de comer a los animales. La vaca le da leche y las gallinas, huevos.',
    q: [{ p: '¿Cuántas gallinas tiene Pablo?', o: ['3️⃣ tres', '1️⃣ una', '5️⃣ cinco'], k: 0 },
        { p: '¿Qué dan las gallinas?', o: ['🥚 huevos', '🥛 leche', '🍯 miel'], k: 0 }] },
  { t: 'El globo rojo', e: '🎈', x: 'Elena tenía un globo rojo. Hacía mucho viento y el globo se escapó. El globo subió y subió hasta las nubes. Un pájaro lo vio pasar y dijo: ¡hola, globo!',
    q: [{ p: '¿De qué color era el globo?', o: ['🔴 rojo', '🟢 verde', '🔵 azul'], k: 0 },
        { p: '¿Por qué se escapó?', o: ['💨 por el viento', '🌧️ por la lluvia', '🐱 por el gato'], k: 0 }] }
];

/* ---------- FRASES DEL NARRADOR (Lucas) ---------- */
const NARRADOR = {
  saludo: [
    '¡Hola, {n}! Soy Lucas. ¿Vamos a leer juntos?',
    '¡{n}, qué alegría verte! Mis circuitos están listos para leer.',
    '¡Bienvenido otra vez, {n}! Hoy vamos a viajar por el espacio de las letras.',
    '¡Hola, {n}! He cargado mis baterías para leer contigo.',
    '¡Bip bip! Detecto a un gran lector. ¡Hola, {n}!',
    '¡{n}! Te estaba esperando en mi nave. ¡Despegamos!',
    '¡Buenas, {n}! ¿Preparado para una misión de lectura?',
    '¡Hola, campeón de las letras! ¿Jugamos, {n}?',
    '¡Qué bien que hayas venido, {n}! Las letras te echaban de menos.',
    '¡Sistemas activados! Hola, {n}. ¡A leer se ha dicho!'
  ],
  bien: [
    '¡Muy bien!', '¡Genial!', '¡Fantástico!', '¡Eso es!', '¡Perfecto!', '¡Bravo!', '¡Increíble!',
    '¡Lo has clavado!', '¡Eres un crack!', '¡Superbién!', '¡Correcto!', '¡Qué bien lees!',
    '¡Mis circuitos echan chispas de alegría!', '¡Bip bip, respuesta correcta!', '¡Así se hace!',
    '¡Eres un lector espacial!', '¡Toma ya!', '¡Me encanta cómo lees!', '¡Lo has conseguido!',
    '¡Estupendo!', '¡Maravilloso!', '¡Eres una estrella!', '¡Qué listo eres!', '¡Brillante!',
    '¡Sigue así!', '¡Fenomenal!', '¡Turbo lectura activada!', '¡Lo haces genial!', '¡Chachi!',
    '¡Has acertado!', '¡Qué máquina!', '¡Diez de diez!', '¡Alucinante!', '¡Ni un robot lo haría mejor!'
  ],
  mal: [
    'Casi, casi. ¡Prueba otra vez!', '¡Uy! Inténtalo de nuevo.', 'No pasa nada, vuelve a probar.',
    'Mmm, esa no es. ¡Tú puedes!', 'Fíjate bien y prueba otra vez.', '¡Ups! Mis sensores dicen que no. ¡Otra vez!',
    'Equivocarse es aprender. ¡Venga!', 'Lee despacito y vuelve a intentarlo.', '¡Casi lo tienes!',
    'Respira, mira las letras y prueba.', 'Esa no, pero vas muy bien.', 'Prueba con otra, campeón.',
    '¡Ánimo! A la siguiente va la vencida.', 'Mira con atención cada sílaba.', 'Uy, se me ha cruzado un cable. ¡Otra vez!'
  ],
  pista: [
    'Te ayudo. Escucha:', 'Una pista de robot:', 'Escucha con atención:', 'Pista secreta:', 'Te lo leo despacito:'
  ],
  fin3: ['¡Misión perfecta! ¡Tres estrellas!', '¡Eres un lector de otra galaxia! ¡Tres estrellas!', '¡Increíble! ¡Lo has hecho todo genial!'],
  fin2: ['¡Muy buena misión! ¡Dos estrellas!', '¡Lo has hecho muy bien! Sigue practicando.', '¡Genial! Cada día lees mejor.'],
  fin1: ['¡Misión completada! Practicando serás un crack.', '¡Bien hecho! La próxima vez, más estrellas.', '¡Lo has terminado! Eso es lo importante.'],
  planeta: ['¡Has desbloqueado un planeta nuevo!', '¡Nuevo planeta a la vista! ¡Vamos a explorarlo!', '¡Bip bip! Coordenadas del nuevo planeta recibidas.'],
  pegatina: ['¡Has ganado una pegatina nueva!', '¡Mira qué pegatina! Ya está en tu álbum.', '¡Pegatina conseguida! ¡Colecciónalas todas!'],
  /* instrucciones por tipo de ejercicio */
  ins: {
    escucha:  ['Escucha y toca: {x}', 'Busca: {x}', '¿Dónde pone {x}?', 'Toca la que suena así: {x}', 'Encuentra: {x}'],
    globos:   ['¡Explota las burbujas que tengan {x}!', 'Atrapa todas las burbujas con {x}', '¡Rápido! Toca las burbujas con {x}'],
    palimg:   ['Lee la palabra y toca su dibujo.', 'Lee bien. ¿Qué dibujo es?', '¿Qué dice aquí? Toca el dibujo.', 'Lee y busca el dibujo correcto.'],
    imgpal:   ['¿Cómo se llama este dibujo? Lee y elige.', 'Mira el dibujo y busca su palabra.', '¿Qué palabra es la buena?', 'Lee las palabras y elige la del dibujo.'],
    forma:    ['Forma la palabra con las sílabas.', 'Ordena las sílabas para escribir la palabra.', 'Construye la palabra del dibujo.', '¡Monta la palabra pieza a pieza!'],
    falta:    ['¿Qué sílaba falta?', 'Falta una pieza. ¿Cuál es?', 'Completa la palabra.', 'Busca la sílaba que falta.'],
    inicial:  ['¿Por qué letra empieza?', '¿Con qué letra empieza este dibujo?', 'Escucha el principio. ¿Qué letra es?'],
    frase:    ['Lee la frase y toca el dibujo.', 'Lee con calma. ¿Qué dibujo es?', 'Lee la frase. ¿Cuál es su dibujo?'],
    verdad:   ['Lee la frase. ¿Es verdad o es mentira?', '¿Verdadero o falso? Lee bien.', 'Lee y piensa: ¿es verdad?'],
    ordena:   ['Ordena las palabras para formar la frase.', 'Pon las palabras en orden.', '¡Las palabras se han mezclado! Ordénalas.'],
    cuento:   ['Lee el cuento. Luego te haré preguntas.', '¡Hora del cuento! Léelo con atención.', 'Vamos a leer un cuento.'],
    une:      ['Une cada palabra con su dibujo.', 'Toca una palabra y después su dibujo.', 'Empareja palabras y dibujos.'],
    traza:    ['Repasa la letra {x} con el dedo.', 'Dibuja la letra {x} siguiendo la guía.', '¡A escribir! Repasa la {x}.'],
    voz:      ['Lee en voz alta la palabra.', 'Toca el micrófono y lee la palabra.', '¡Léemela en voz alta!'],
    silabas:  ['¿Cuántas sílabas tiene? Da una palmada por cada una.', 'Cuenta las sílabas. ¿Cuántas hay?', '¡Palmadas! ¿Cuántas sílabas tiene?']
  }
};

/* ---------- PEGATINAS (álbum) ---------- */
const PEGATINAS = [
  { e: '🚀', n: 'Cohete' }, { e: '🪐', n: 'Saturno' }, { e: '🌙', n: 'Luna' }, { e: '⭐', n: 'Estrella' },
  { e: '☄️', n: 'Cometa' }, { e: '🛸', n: 'Ovni' }, { e: '👽', n: 'Marcianito' }, { e: '👾', n: 'Monstruo pixel' },
  { e: '🌍', n: 'Tierra' }, { e: '☀️', n: 'Sol' }, { e: '🌈', n: 'Arcoíris' }, { e: '🔭', n: 'Telescopio' },
  { e: '🧑‍🚀', n: 'Astronauta' }, { e: '🛰️', n: 'Satélite' }, { e: '🌌', n: 'Galaxia' }, { e: '💫', n: 'Chispa' },
  { e: '🦖', n: 'Rex' }, { e: '🐉', n: 'Dragón' }, { e: '🦄', n: 'Unicornio' }, { e: '🐙', n: 'Pulpo' },
  { e: '🦊', n: 'Zorro' }, { e: '🐼', n: 'Panda' }, { e: '🦁', n: 'León' }, { e: '🐬', n: 'Delfín' },
  { e: '🏆', n: 'Copa' }, { e: '🎖️', n: 'Medalla' }, { e: '👑', n: 'Corona' }, { e: '💎', n: 'Diamante' },
  { e: '🎸', n: 'Guitarra' }, { e: '🎮', n: 'Mando' }, { e: '⚽', n: 'Balón' }, { e: '🎨', n: 'Pinturas' },
  { e: '📚', n: 'Libros' }, { e: '🧸', n: 'Osito' }, { e: '🍦', n: 'Helado' }, { e: '🍩', n: 'Dónut' },
  { e: '🌋', n: 'Volcán' }, { e: '🏰', n: 'Castillo' }, { e: '🎡', n: 'Noria' }, { e: '🤖', n: 'Lucas' }
];

/* ---------- IMÁGENES PROPIAS (cuando Manu las genere con Gemini) ----------
   Pon aquí el nombre de la palabra (sin tildes) cuando subas img/palabras/<nombre>.png
   Ejemplo: const IMAGENES = ['sol','luna','gato'];                              */
const IMAGENES = [];
