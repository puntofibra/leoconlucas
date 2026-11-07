/* =====================================================================
   LEO CON LUCAS · Ampliación 3: más variedad en cada planeta
   (sobre todo en los primeros, que son los que más se repiten)
   Formato palabras: 'sí-la-bas|emoji|género'. Duplicados se ignoran.
   ===================================================================== */
const PALABRAS_RAW_3 = `
mo-mia|🧟|f
ma-má|👩|f
pa-pá|👨|m
pie|🦶|m
pu-ma|🐆|m
pu-pa|🤕|f
a-pio|🥬|m
lu-pa|🔍|f
pi-la|🔋|f
o-la|🌊|f
miel|🍯|f
pa-pel|📄|m
pa-lo-ma|🕊️|f
pa-lo|🪵|m
pe-lo|💇|m
pul-po|🐙|m
li-la|🟣|m
po-lo|🍦|m
so-pa|🍲|f
sol|☀️|m
sal|🧂|f
sa-po|🐸|m
o-so|🐻|m
o-sa|🐻|f
pe-so|⚖️|m
pa-so|👣|m
pe-sas|🏋️|f
is-la|🏝️|f
me-sa|🍽️|f
pa-sas|🍇|f
pa-to|🦆|m
pa-ti-to|🐥|m
to-ma-te|🍅|m
pe-lo-ta|⚽|f
ma-le-ta|🧳|f
mo-to|🏍️|f
pa-ta-ta|🥔|f
se-ta|🍄|f
te-la|🧵|f
té|🍵|m
tos|🤧|f
me-ta|🏁|f
pé-ta-lo|🌸|m
pas-tel|🎂|m
es-ta-tua|🗽|f
pa-ta|🦵|f
pa-lo-mi-ta|🍿|f
ma-mut|🦣|m
ma-tas|🌳|f
lu-na|🌙|f
ma-no|✋|f
pi-no|🌲|m
pe-pi-no|🥒|m
li-món|🍋|m
pan|🍞|m
pi-mien-to|🫑|m
a-na-nás|🍍|m
pi-a-no|🎹|m
mo-no|🐒|m
po-ni|🐴|m
a-tún|🐟|m
sal-món|🍣|m
an-te-na|📡|f
me-lón|🍈|m
pa-tín|⛸️|m
pa-ti-ne-te|🛴|m
pe-a-tón|🚶|m
pul-món|🫁|m
ma-ní|🥜|m
mi-nu-to|⏱️|m
man-ta|🛌|f
ti-món|☸️|m
nu-ez|🌰|f
in-sec-to|🐞|m
da-do|🎲|m
de-do|☝️|m
dien-te|🦷|m
dia-man-te|💎|m
me-dias|🧦|f
sol-da-do|💂|m
dos|2️⃣|m
es-pa-da|🗡️|f
pan-da|🐼|m
mo-ne-da|🪙|f
tien-da|🏪|f
me-lo-dí-a|🎶|f
sán-da-lia|🩴|f
dia-de-ma|👑|f
on-da|🌊|f
de-sa-yu-no|🥞|m
nu-do|🪢|m
sa-lu-do|👋|m
dí-a|🌞|m
dul-ce|🍬|m
fan-tas-ma|👻|m
fi-de-os|🍜|m
fo-to|📷|f
so-fá|🛋️|m
e-le-fan-te|🐘|m
del-fín|🐬|m
fies-ta|🎉|f
fal-da|👗|f
fin|🔚|m
fo-sa|🕳️|f
fla-men-co|💃|m
fan-ta-sí-a|🦄|f
ni-ño|🧒|m
ni-ña|👧|f
pi-ña|🍍|f
mo-ño|🎀|m
ba-ño|🛁|m
ca-ba-ña|🛖|f
a-ra-ña|🕷️|f
mon-ta-ña|⛰️|f
u-ñas|💅|f
le-ña|🪵|f
sue-ño|😴|m
pa-ñal|🧷|m
se-ño-ra|👩|f
al-ba-ñil|👷|m
o-to-ño|🍂|m
mu-ñe-ca|🪆|f
ca-ñón|💥|m
cham-pi-ñón|🍄|m
pes-ta-ña|👁️|f
pa-ñue-lo|🤧|m
pi-ño-nes|🌰|m
que-so|🧀|m
ra-que-ta|🎾|f
pa-que-te|📦|m
mos-qui-to|🦟|m
e-ti-que-ta|🏷️|f
qui-mo-no|👘|m
es-quí|⛷️|m
ar-que-ro|🏹|m
má-qui-na|⚙️|f
par-que|🛝|m
bos-que|🌲|m
bu-que|🚢|m
man-te-qui-lla|🧈|f
ma-qui-lla-je|💄|m
co-he-te|🚀|m
gui-ta-rra|🎸|f
gui-san-te|🫛|m
ju-gue-te|🧸|m
ham-bur-gue-sa|🍔|f
pin-güi-no|🐧|m
ci-güe-ña|🐦|f
á-gui-la|🦅|f
gui-ño|😉|m
ho-gue-ra|🔥|f
gue-par-do|🐆|m
hor-mi-gue-ro|🐜|m
ki-wi|🥝|m
ká-ra-te|🥋|m
ko-a-la|🐨|m
ta-xi|🚕|m
sa-xo-fón|🎷|m
ka-yak|🛶|m
wá-ter|🚽|m
bo-xe-o|🥊|m
e-xa-men|📝|m
ka-ra-o-ke|🎤|m
ki-lo|⚖️|m
ho-ja|🍃|f
hie-lo|🧊|m
hue-vo|🥚|m
hor-mi-ga|🐜|f
he-la-do|🍦|m
ha-da|🧚|f
ha-cha|🪓|f
hu-mo|💨|m
hue-so|🦴|m
hi-po-pó-ta-mo|🦛|m
hos-pi-tal|🏥|m
hon-go|🍄|m
hu-ra-cán|🌀|m
he-li-cóp-te-ro|🚁|m
ha-ri-na|🌾|f
huer-to|🥕|m
hé-ro-e|🦸|m
tren|🚆|m
pla-ne-ta|🪐|m
pla-to|🍽️|m
plá-ta-no|🍌|m
bra-zo|💪|m
fre-sa|🍓|f
flor|🌸|f
glo-bo|🎈|m
tri-go|🌾|m
dra-gón|🐉|m
cla-vo|🔨|m
blu-sa|👚|f
pra-do|🌿|m
fru-ta|🍎|f
gri-fo|🚰|m
li-bro|📖|m
ti-gre|🐯|m
co-bra|🐍|f
ca-bra|🐐|f
la-dri-llo|🧱|m
cro-co-di-lo|🐊|m
plu-ma|🪶|f
tro-fe-o|🏆|m
bru-ja|🧙|f
cru-ce-ro|🛳️|m
plan-ta|🪴|f
pul-se-ra|📿|f
es-tre-lla|⭐|f
pre-mio|🏅|m
gra-ni-zo|🌨️|m
tri-ci-clo|🚲|m
tam-bor|🥁|m
le-gum-bre|🫘|f
som-bre-ro|👒|m
cu-bo|🪣|m
bo-ca|👄|f
bú-ho|🦉|m
ba-lle-na|🐋|f
ve-la|🕯️|f
vol-cán|🌋|m
va-ca|🐄|f
ve-ra-no|🏖️|m
vio-lín|🎻|m
ga-to|🐱|m
go-rro|🧢|m
ga-lle-ta|🍪|f
go-ma|🧽|f
ga-lli-na|🐔|f
gu-sa-no|🐛|m
ji-ra-fa|🦒|f
ja-bón|🧼|m
ge-me-los|👯|m
gi-ra-sol|🌻|m
jar-dín|🏡|m
ju-dí-as|🫘|f
chu-pe-te|🍭|m
cho-co-la-te|🍫|m
co-che|🚗|m
le-che|🥛|f
chis-te|😂|m
o-cho|8️⃣|m
llu-via|🌧️|f
lla-ve|🔑|f
po-llo|🍗|m
ye-ma|🥚|f
yo-yó|🪀|m
za-pa-to|👞|m
ce-bra|🦓|f
ci-ne|🎬|m
ce-re-za|🍒|f
cal-ce-tín|🧦|m
ma-ce-ta|🪴|f
pi-za-rra|🧑‍🏫|f
zo-rro|🦊|m
ra-tón|🐭|m
ro-sa|🌹|f
rue-da|🛞|f
pe-rro|🐶|m
re-loj|⌚|m
ra-na|🐸|f
ro-bot|🤖|m
co-ne-jo|🐰|m
ca-me-llo|🐫|m
ca-ra-col|🐌|m
ca-ma|🛏️|f
cu-na|🛏️|f
co-co|🥥|m
ca-sa|🏠|f
ca-ra-me-lo|🍬|m
`;

const PALABRAS_LECTURA_3 = `
mi-mo ma-mi a-mo me-ma mí-a
pi-pa pa-pi Pe-pe Pe-pa Pi-po pú-a pí-o
lo-ma lo-mo li-mo pa-la pe-la li-so le-al ma-lo mal-va
Lu-pe La-lo Lo-la Mi-la Pi-li Le-o
sa-la ma-sa li-sa pi-so sa-le pa-se-o su-pe mu-sa sie-sa Su-si I-sa
ta-pa ma-ta to-ma pi-to te-te-ra lo-te to-pe tí-a tí-o ta-pe-te Ti-to Ta-ti To-más
na-ta ni-do na-na mo-na nie-to pi-no-cho a-ni-mal pin-ta-mos son-ri-sa
de-li-ca-do me-di-da ma-da-ma pa-ra-da a-do-ro dan-do mo-da me-dio
fe-liz fi-la fi-no fa-ma fo-co fa-ro fu-ma
pa-ña-les pe-ñón le-ña-dor ca-ña-ve-ral ma-ña-na
quie-to quie-re que-ri-do que-ma pa-que-tes e-qui-po a-quí
si-gue gui-sa al-guien ju-gue-mos
ki-ló-me-tro ki-mo-no
`.split(/\s+/).filter(Boolean);

const FRASES_3 = `Mi mamá me mima.
Mamá me ama.
Ema ama a mamá.
Mimí mima a Ema.
Amo a mi mamá.
Mamá mima a Ema.
Mi papá me mima.
Pepe ama a papá.
Pepa mima a Pipo.
Mamá y papá.
Ema y Pepe.
Papá mima a Pepa.
Pipo pía.
Mi mapa.
Pepe y mi puma.
Lola mima a la mula.
Mila pela la papa.
Lalo lima la pala.
El puma lame la pila.
Pili pela el palo.
Mi papá pela la papa.
La paloma pía.
Lupe ama la miel.
La mula lame la pala.
Pepe pule el palo.
Mila mima al pulpo.
Lalo y Lola.
Mi papel es lila.
La ola moja a Lola.
Susi pasea a su oso.
Sole sala la sopa.
Mi oso es lila.
El sol sale.
Susi pesa la sal.
Ese oso es mío.
Pepe se asoma.
El sapo es lila.
Sole lame la sal.
Mi mesa es lisa.
Lola pisa el palo.
Ese sapo se asoma.
Isa sale al sol.
Sole pasea sola.
El oso pasa.
Mamá sala la sopa.
Su osa es mía.
El sapo se pasea.
Tito tapa la moto.
El pato toma té.
Tita pela el tomate.
Mi maleta es lila.
Tomás tose.
El patito pasea solo.
Tito pisa la pelota.
Mi mamá toma té.
Esa moto es lila.
Tati pela la patata.
El mamut se asoma.
Tito sale a la meta.
Sole ata la maleta.
Mi pastel es lila.
Pepe tapa la sopa.
Mi tía toma sopa.
Toma la pelota.
Lalo toma el pastel.
La seta es pequeña.
Tita salta al sol.
El patito sale al sol.
La luna sale.
Mi mano es pequeña.
Nina pinta un pino.
El mono toma un limón.
Ana toca el piano.
Mi poni es manso.
Nono come pan.
Un mono salta.
La antena está en lo alto.
Tomás monta en el patinete.
Ana come melón.
El pino es alto.
Dani tira el dado.
Mi diente se mueve.
El panda come.
Dos patos nadan.
Dame la moneda.
La tienda está abierta.
Toma un dulce.
El soldado desfila.
Mi dedo está sucio.
El delfín salta.
La foto es bonita.
El elefante es enorme.
Fefa se sienta en el sofá.
Hay un fantasma en la fiesta.
Mi falda es lila.
Como fideos.
El niño mira la montaña.
La niña tiene un moño.
La araña teje.
En otoño caen hojas.
La piña está dulce.
El queso es amarillo.
Quique tiene una raqueta.
El mosquito pica.
Juego en el parque.
El paquete es grande.
Miguel toca la guitarra.
El pingüino nada.
Tengo un juguete nuevo.
Como una hamburguesa.
El águila vuela alto.
El koala duerme.
El taxi es amarillo.
Hago kárate.
El huevo es blanco.
La hormiga es pequeña.
Me gusta el helado.
El hada tiene alas.
Hay hielo en el vaso.
El tren pasa rápido.
La fresa es roja.
Leo un libro.
El dragón vuela.
El tigre ruge.
La planta crece.
Mi gato duerme en la cama.
La vaca da leche.
El perro mueve la cola.
El ratón come queso.
La gallina pone huevos.
La jirafa es muy alta.
Tengo una llave.
El zorro corre por el bosque.
La cebra tiene rayas.
El robot camina.
Hoy llueve mucho.
Mi conejo come zanahorias.
Pinto una estrella en la pizarra.
El caracol va despacio.
La ballena salta en el mar.
El búho abre los ojos de noche.
El volcán echa humo.
Lucas vuela con su capa roja.
Los niños juegan en el parque.
Mi abuela hace galletas de chocolate.
El cohete sube hasta la luna.
Por la noche miramos las estrellas.
El girasol mira al sol.
Mi hermano tiene un tambor nuevo.
El cocodrilo nada en el río.
La bruja tiene un sombrero negro.
En verano vamos a la playa.
El payaso tiene una nariz roja.
Las abejas hacen miel.
El pirata busca un tesoro.
La tortuga camina muy despacio.
Mi amigo me presta su bicicleta.
El bombero apaga el fuego.
La princesa vive en un castillo.
Los peces nadan en el agua.
El dinosaurio era muy grande.
Mañana iremos al zoo.
El médico cura a los niños.
La mariposa tiene alas de colores.
Me lavo los dientes antes de dormir.
`.split('\n').map(s => s.trim()).filter(Boolean);

const VERDAD_3 = `Mamá me ama.|v
El pie es lila.|f
El pulpo lee.|f
La mula lee.|f
La miel es de la abeja.|v
La paloma es de papel.|f
El sol sale.|v
El sol es lila.|f
La sal sala la sopa.|v
El oso es pequeño como un sapo.|f
El sapo salta.|v
La isla está en el mar.|v
El pato es lila.|f
La moto tose.|f
El tomate se pela.|v
La patata es lila.|f
El pastel es de tomate.|f
El mamut es un animal.|v
La luna sale de noche.|v
El mono come plátanos.|v
El pino es un animal.|f
El melón es una fruta.|v
La mano tiene cinco dedos.|v
El piano es una fruta.|f
El panda es blanco y negro.|v
El dado tiene seis lados.|v
Los dientes sirven para comer.|v
El delfín vive en el mar.|v
El elefante es pequeño.|f
Los fantasmas comen fideos.|f
La araña tiene ocho patas.|v
En otoño caen las hojas.|v
La piña es un animal.|f
El queso sale de la leche.|v
El mosquito es enorme.|f
El pingüino vive en el frío.|v
La guitarra es un instrumento.|v
El águila vuela.|v
El koala es azul.|f
El taxi es un animal.|f
El huevo lo pone la gallina.|v
El hielo es caliente.|f
La hormiga es más grande que el elefante.|f
El helado está frío.|v
El tren va por las vías.|v
La fresa es roja.|v
Los libros se leen.|v
El tigre tiene rayas.|v
La vaca dice miau.|f
El perro ladra.|v
El ratón es más grande que el gato.|f
La jirafa tiene el cuello largo.|v
La lluvia moja.|v
La cebra tiene rayas.|v
El caracol corre muy rápido.|f
La ballena vive en el mar.|v
El búho duerme de día.|v
El volcán echa lava.|v
Los peces vuelan por el cielo.|f
El fuego está frío.|f
La tortuga lleva su casa encima.|v
El girasol mira al sol.|v
Las abejas hacen miel.|v
La nieve es caliente.|f
El cocodrilo tiene dientes.|v`.split('\n').filter(l => l.trim()).map(l => { const [t, r] = l.split('|'); return { t: t.trim(), v: r.trim() === 'v' }; });
