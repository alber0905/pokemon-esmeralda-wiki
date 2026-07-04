/* =====================================================================
   Compañera de juego (Gen 4 · Sinnoh / Platino) — datos de la ruta + interacción
   Mismo renderer, filtros, "estoy aquí" y progreso en localStorage que la
   guía de Esmeralda, adaptado a la 4.ª generación.
   ===================================================================== */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var SPRITE = function (id) {
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/" + id + ".png";
  };

  var NAME = {"41":"Zubat","54":"Psyduck","74":"Geodude","82":"Magneton","92":"Gastly","129":"Magikarp","133":"Eevee","137":"Porygon","175":"Togepi","200":"Misdreavus","201":"Unown","208":"Steelix","215":"Sneasel","220":"Swinub","307":"Meditite","355":"Duskull","377":"Regirock","378":"Regice","379":"Registeel","387":"Turtwig","388":"Grotle","389":"Torterra","390":"Chimchar","391":"Monferno","392":"Infernape","393":"Piplup","394":"Prinplup","395":"Empoleon","396":"Starly","399":"Bidoof","401":"Kricketot","403":"Shinx","405":"Luxray","406":"Budew","407":"Roserade","408":"Cranidos","410":"Shieldon","412":"Burmy","415":"Combee","420":"Cherubi","425":"Drifloon","427":"Buneary","433":"Chingling","440":"Happiny","441":"Chatot","442":"Spiritomb","443":"Gible","445":"Garchomp","447":"Riolu","448":"Lucario","449":"Hippopotas","453":"Croagunk","459":"Snover","466":"Electivire","479":"Rotom","480":"Uxie","481":"Mesprit","482":"Azelf","483":"Dialga","484":"Palkia","485":"Heatran","486":"Regigigas","487":"Giratina","488":"Cresselia","489":"Phione","490":"Manaphy","491":"Darkrai","492":"Shaymin","493":"Arceus"};

  // Categorías: boss, catch, item, secret, missable, tip
  var CAT = {
    boss:    { ic:"🥊", tag:"Combate",  label:"Combates" },
    catch:   { ic:"🎯", tag:"Captura",  label:"Capturas" },
    item:    { ic:"🎁", tag:"Objeto",   label:"Objetos"  },
    secret:  { ic:"🗝️", tag:"Secreto",  label:"Secretos" },
    missable:{ ic:"⚠️", tag:"No perder",label:"No perder"},
    tip:     { ic:"💡", tag:"Consejo",  label:"Consejos" }
  };

  // atajos de enlaces a la guía de referencia (secciones de gen4/index.html)
  var L = {
    gimnasios:  { t:"Los 8 gimnasios", href:"index.html#gimnasios" },
    liga:       { t:"Alto Mando y Campeona", href:"index.html#liga" },
    legendarios:{ t:"Legendarios", href:"index.html#legendarios" },
    secretos:   { t:"Secretos", href:"index.html#secretos" },
    pokedex:    { t:"Pokédex", href:"index.html#pokedex" },
    emulador:   { t:"Emulador y trucos", href:"index.html#emulador" }
  };

  /* ---------------- Datos de la ruta (Sinnoh / Platino) ---------------- */
  var routeStops = [{"area":"Inicio","name":"Pueblo Hoja Doble","emoji":"🏠","goal":"Sal de casa, coge a tu rival y ve al Lago Veraz","mons":[387,390,393],"highlights":[{"cat":"tip","t":"Configura el reloj","d":"Ajusta bien la hora del sistema: muchos eventos (árboles de miel, Pokémon diurnos/nocturnos, evoluciones por felicidad) dependen del reloj interno.","link":""},{"cat":"secret","t":"El maletín en el Lago Veraz","d":"Al ir al lago con tu rival, el Prof. Serbal huye dejando el maletín. Un ataque de Pokémon salvajes te obliga a elegir inicial: <b>Turtwig</b> (Planta, el más fácil para gimnasios 1-2), <b>Chimchar</b> (Fuego, MVP contra 4 gimnasios y el Alto Mando) o <b>Piplup</b> (Agua, seguro).","link":""}]},{"area":"Pueblo","name":"Pueblo Arena","emoji":"🔬","goal":"Consigue la Pokédex y las Poké Ball","mons":[396,399],"highlights":[{"cat":"item","t":"Pokédex y Poké Ball","d":"Serbal te da la Pokédex y su ayudante 5 Poké Ball. Habla con todos en el laboratorio para pillar objetos.","link":"pokedex"},{"cat":"tip","t":"Bidoof no es basura","d":"Bidoof aprende MUCHAS MO (Corte, Fuerza, Surf, Cascada...). Captura uno para usarlo de \"burro de carga\" y no ensuciar el moveset de tus combatientes.","link":""}]},{"area":"Ruta","name":"Ruta 202","emoji":"🌿","goal":"Aprende a capturar y sube de nivel","mons":[396,399,403,401],"highlights":[{"cat":"catch","t":"Shinx desde el principio","d":"<b>Shinx</b> (→Luxray) es un Eléctrico con pegada física y buen movimiento. Uno de los mejores compañeros tempranos.","link":""},{"cat":"missable","t":"Baya y objetos ocultos","d":"Hay objetos invisibles por la ruta; usa el Buscaobjetos (Pokéreloj) más adelante para no dejarte nada.","link":""}]},{"area":"Ciudad","name":"Ciudad Jubileo","emoji":"🏙️","goal":"Consigue el Pokéreloj y la Caña Vieja; frena a Galaxia","mons":[441,54],"highlights":[{"cat":"item","t":"Pokéreloj","d":"Tras el minijuego de los mensajeros consigues el <b>Pokéreloj</b>. Ve sumando apps: el Buscaobjetos y el Rastreador (para legendarios errantes) son clave.","link":""},{"cat":"item","t":"Caña Vieja","d":"Un pescador en el muelle te da la Caña Vieja: podrás pescar Magikarp para más adelante criar un Gyarados.","link":""},{"cat":"boss","t":"Primeros grunts Galaxia","d":"Los reclutas del Equipo Galaxia usan Zubat y Wurmple; nada peligroso, pero es tu presentación al villano de la generación.","link":""}]},{"area":"Ciudad","name":"Ciudad Pirita","emoji":"⛏️","goal":"Consigue un fósil y gana la 1ª Medalla","mons":[74,408,410],"highlights":[{"cat":"item","t":"Museo y fósil","d":"En el Museo de la Mina revives fósiles. Baja a la mina para conseguir tu fósil y encontrar a Roco antes del combate.","link":""},{"cat":"boss","t":"Gimnasio 1 · Roco (Roca)","d":"As <b>Cranidos Lv14</b>. Lleva Agua/Planta/Lucha. Recompensa: Medalla Carbón + <b>MT76 Trampa Rocas</b>.","link":"gimnasios"},{"cat":"catch","t":"Geodude y Onix","d":"En la Puerta de Pirita y la mina abunda Geodude; buen Roca/Tierra si no quieres depender del fósil.","link":""}]},{"area":"Ruta / Pueblo","name":"Pueblo Flores y Central Eólica","emoji":"🌸","goal":"Recupera la llave y expulsa a Galaxia de la Central Eólica","mons":[406,415,420],"highlights":[{"cat":"boss","t":"Comandante Marte","d":"Primera comandante Galaxia. Su as es <b>Purugly</b>. Ataques de Lucha o simplemente potencia bruta bastan.","link":""},{"cat":"item","t":"Miel para árboles","d":"Aquí compras/consigues Miel. Úntala en árboles para atraer Combee, Cherubi, Aipom y, con suerte, Munchlax.","link":"secretos"},{"cat":"catch","t":"Budew","d":"<b>Budew</b> (→Roserade) es un gran Planta/Veneno especial que evoluciona por felicidad; consíguelo pronto.","link":""}]},{"area":"Bosque","name":"Bosque Vetusto","emoji":"🌲","goal":"Cruza el bosque con Cheryl y localiza la Mansión Vieja","mons":[412,427,92],"highlights":[{"cat":"catch","t":"Buneary y Silcoon/Wurmple","d":"<b>Buneary</b> (→Lopunny) y varios Bicho. Cheryl te cura entre combates, así que aprovecha para gastar PP sin miedo.","link":""},{"cat":"secret","t":"Mansión Vieja (Rotom)","d":"Explora la mansión: hay objetos y, tras la Medalla Bosque y con Corte, la tele que oculta a <b>Rotom</b> (Lv20) de noche.","link":"secretos"},{"cat":"item","t":"Roca Musgo","d":"Dentro del bosque está la Roca Musgo: sube de nivel a Eevee junto a ella para obtener <b>Leafeon</b>.","link":""}]},{"area":"Ciudad","name":"Ciudad Vetusta","emoji":"🚲","goal":"Consigue la Bici, gana la 2ª Medalla y limpia el edificio Galaxia","mons":[407,415],"highlights":[{"cat":"boss","t":"Gimnasio 2 · Gardenia (Planta)","d":"As <b>Roserade Lv22</b>. Fuego/Vuelo/Bicho la barren. Recompensa: Medalla Bosque + <b>MT86 Hierba Lazo</b>.","link":"gimnasios"},{"cat":"item","t":"Bicicleta","d":"Recupera la bici robada de Ferruca (Rad Rickshaw) tras el edificio Galaxia; es imprescindible para el Camino Bici.","link":""},{"cat":"missable","t":"Huevo de Togepi","d":"Al despejar el edificio Galaxia, Cintia te da un <b>Huevo de Togepi</b>. No lo ignores: rareza y punto de Pokédex.","link":"secretos"},{"cat":"item","t":"MO01 Corte","d":"Consigues Corte por esta zona: enséñaselo a tu Bidoof burro de carga, no a un combatiente.","link":""}]},{"area":"Ciudad","name":"Ciudad Corazón","emoji":"❤️","goal":"Consigue apps, el Huevo de Happiny y prepárate para volver a por Fantina","mons":[440,433,175],"highlights":[{"cat":"item","t":"Huevo de Happiny","d":"Una entrenadora en la Plaza Amistad te da un <b>Huevo</b> de Happiny (→Chansey→Blissey). Con Piedra Oval de día evoluciona a Chansey.","link":""},{"cat":"tip","t":"Fantina llega después","d":"El Gimnasio de Fantina está cerrado en tu primera visita. Volverás tras conseguir Surf en Ciudad Sonograma; de momento sigue al este.","link":"gimnasios"},{"cat":"catch","t":"Plaza Amistad","d":"En la Plaza Amistad puedes pasear con ciertos Pokémon y encontrar objetos/accesorios de concurso a diario.","link":""}]},{"area":"Ruta","name":"Ruta 209 y Torre Perdida","emoji":"🗼","goal":"Cruza hacia Sosiego pasando por la Torre Perdida","mons":[425,355,200],"highlights":[{"cat":"catch","t":"Fantasmas de la Torre","d":"En la Torre Perdida abundan <b>Gastly</b> y <b>Misdreavus/Golbat</b>. Buenos contra el futuro gimnasio Psíquico y contra Fantina.","link":""},{"cat":"secret","t":"Piedra Rara (Spiritomb)","d":"La \"Torre Vetusta\" de la ruta esconde el ritual de <b>Spiritomb</b>: coloca la Piedra Rara e interactúa tras hablar con 32 personas en el Subsuelo.","link":"secretos"},{"cat":"catch","t":"Drifloon los viernes","d":"<b>Drifloon</b> aparece en la Central Eólica solo los viernes; anótalo para completar la Pokédex.","link":"pokedex"}]},{"area":"Pueblo","name":"Pueblo Sosiego","emoji":"🥚","goal":"Usa la Guardería y explora las Ruinas Solaceon","mons":[201,399],"highlights":[{"cat":"secret","t":"Ruinas Solaceon (Unown)","d":"Captura las 26 formas de <b>Unown</b> según los muros de braille. Necesarias para la Pokédex Nacional y desbloquean recompensas.","link":"pokedex"},{"cat":"tip","t":"Guardería para criar","d":"Aquí crías Pokémon: ideal para preparar un equipo competitivo o cadenas de huevos con movimientos de crianza.","link":""}]},{"area":"Ciudad","name":"Ciudad Rocavelo","emoji":"🥋","goal":"Gana la 3ª Medalla, saquea el Almacén Galaxia y usa la tienda","mons":[307,448,137],"highlights":[{"cat":"boss","t":"Gimnasio 3 · Brega (Lucha)","d":"As <b>Lucario Lv32</b>. Psíquico/Volador/Hada mandan. Recompensa: Medalla Adoquín + <b>MT60 Puño Drenaje</b>.","link":"gimnasios"},{"cat":"secret","t":"Almacén Galaxia","d":"En el almacén detrás del edificio Galaxia recoges objetos. Aparte, un hombre en una casa al norte del Centro Pokémon de Rocavelo te regala un <b>Porygon</b> (ten un hueco libre en el equipo).","link":"secretos"},{"cat":"item","t":"Gran Centro Comercial","d":"El Centro Comercial de Rocavelo vende MTs, vitaminas y objetos de combate. Punto clave para preparar el Alto Mando.","link":""}]},{"area":"Ciudad","name":"Ciudad Pantanal","emoji":"🐊","goal":"Gana la 4ª Medalla y visita el Parque Pantanal","mons":[453,54,129],"highlights":[{"cat":"boss","t":"Gimnasio 4 · Fausto (Agua)","d":"As <b>Floatzel Lv37</b> con Aqua Jet. Planta/Eléctrico lo hunden. Recompensa: Medalla Ciénaga + <b>MT55 Salmuera</b>.","link":"gimnasios"},{"cat":"catch","t":"Parque Pantanal (safari)","d":"El safari de Sinnoh: Croagunk, Carnivine, Skorupi y muchos exclusivos. Usa Barro/comida y bolas de safari; cambia según el día.","link":"pokedex"},{"cat":"item","t":"MO Fuerza / Buceo no existe","d":"Recuerda: en Sinnoh no hay Buceo. Las MO que priorizar son Surf, Vuelo, Fuerza, Corte, Golpe Roca, Deflagración... digo Anticipo (Defog) y Escalada.","link":""}]},{"area":"Pueblo","name":"Pueblo Sonograma (Celestic)","emoji":"🌊","goal":"Consigue MO03 Surf y aprende la leyenda","mons":[443,449],"highlights":[{"cat":"item","t":"MO03 Surf","d":"La abuela de Cintia te da <b>Surf</b> tras expulsar a un grunt Galaxia. Ahora puedes volver a por Fantina y explorar el agua.","link":""},{"cat":"catch","t":"Gible en la Cueva Extravío","d":"En la Cueva Extravío (bajo el Camino Bici, Ruta 206; necesitas la bici para su zona secreta) atrapa a <b>Gible</b> (→Garchomp), el pseudolegendario y una de las mejores capturas del juego.","link":"secretos"}]},{"area":"Ciudad","name":"Vuelta a Ciudad Corazón","emoji":"👻","goal":"Gana la 5ª Medalla contra Fantina","mons":[200,92],"highlights":[{"cat":"boss","t":"Gimnasio 5 · Fantina (Fantasma)","d":"As <b>Mismagius Lv36</b> con Bola Sombra. Lleva un Siniestro (Stunky/Skuntank) o tu propio Fantasma. Recompensa: Medalla Reliquia + <b>MT65 Garra Umbría</b>.","link":"gimnasios"},{"cat":"tip","t":"Escala de niveles","d":"A estas alturas tu equipo debería rondar Lv36-40. Aprovecha el Camino Bici y los entrenadores de las rutas para nivelar antes del Monte Corona.","link":""}]},{"area":"Ciudad","name":"Ciudad Canal","emoji":"⚓","goal":"Gana la 6ª Medalla y visita la Isla Hierro","mons":[208,82,447],"highlights":[{"cat":"boss","t":"Gimnasio 6 · Acerón (Acero)","d":"As <b>Bastiodon Lv41</b>. Lucha/Tierra/Fuego lo rompen. Recompensa: Medalla Mina + <b>MT91 Foco Resplandor</b>.","link":"gimnasios"},{"cat":"item","t":"Huevo de Riolu","d":"En la Isla Hierro, Riley te da un <b>Huevo de Riolu</b>. Críalo y evolúcialo a Lucario (felicidad, de día): brutal para el resto del juego.","link":"secretos"},{"cat":"secret","t":"Biblioteca de Canal","d":"Lee los libros de la biblioteca para desbloquear el evento de <b>Darkrai</b> (si tienes el Carné de socio) vía el marinero.","link":"legendarios"}]},{"area":"Lagos","name":"Asalto a los lagos (Valor y Veraz)","emoji":"💥","goal":"Persigue a Galaxia por los lagos hasta el norte","mons":[482,481],"highlights":[{"cat":"boss","t":"Comandantes en cadena","d":"Galaxia bombardea el Lago Valor y ataca el Veraz. Te enfrentas a Saturno, Marte y Júpiter en sucesión: lleva curas de sobra.","link":""},{"cat":"missable","t":"Se libera el trío del lago","d":"Tras los eventos, <b>Azelf</b> (Lago Valor) y <b>Uxie</b> (Lago Agudeza) esperan quietos, pero <b>Mesprit</b> empieza a deambular. Actívalo con cuidado para poder rastrearlo luego.","link":"legendarios"}]},{"area":"Ruta / Ciudad","name":"Ruta 217 y Ciudad Nevada","emoji":"❄️","goal":"Cruza la ventisca y gana la 7ª Medalla","mons":[459,215,220],"highlights":[{"cat":"boss","t":"Gimnasio 7 · Inverna (Hielo)","d":"As <b>Froslass Lv44</b>. Fuego/Acero/Lucha mandan; un Infernape aquí gana casi solo. Recompensa: Medalla Carámbano + <b>MT72 Alud</b>.","link":"gimnasios"},{"cat":"item","t":"Roca Helada","d":"En la Ruta 217 está la Roca Helada: sube de nivel a Eevee a su lado para obtener <b>Glaceon</b>.","link":""},{"cat":"missable","t":"Templo Nevado (para luego)","d":"El Templo esconde a <b>Regigigas</b>, pero necesitas a los tres Regis. Anótalo para el postgame.","link":"legendarios"}]},{"area":"Base Galaxia","name":"Base Galaxia (Rocavelo)","emoji":"🛸","goal":"Infiltra la base, consigue la Master Ball y libera al trío","mons":[482,480,481],"highlights":[{"cat":"item","t":"Master Ball","d":"Dentro de la base Galaxia consigues la <b>Master Ball</b>. Guárdala para el legendario errante que más te cueste (Cresselia o Mesprit).","link":""},{"cat":"boss","t":"Cyrus y Saturno","d":"Derrota a Saturno y luego a Cyrus (as <b>Weavile/Honchkrow/Crobat</b>). Libera al trío del lago que abre la ruta a la Columna Lanza.","link":""}]},{"area":"Montaña","name":"Monte Corona · Columna Lanza","emoji":"⛰️","goal":"Frustra el plan de Cyrus y cruza al Mundo Distorsión","mons":[483,484,487],"highlights":[{"cat":"boss","t":"Cyrus en la cima","d":"En la Columna Lanza, Cyrus usa las Cadenas Rojas para invocar a Dialga y Palkia. Tras vencerle, Giratina irrumpe y abre un portal.","link":"legendarios"},{"cat":"boss","t":"Mundo Distorsión · Giratina","d":"Persigue a Cyrus por el Mundo Distorsión (física invertida). Antes del final, <b>Giratina Lv47</b> (Forma Origen) se enfrenta a ti: <b>guarda partida y captúralo</b>.","link":"legendarios"}]},{"area":"Ciudad","name":"Ciudad Marina","emoji":"⚡","goal":"Gana la 8ª Medalla y consigue MO07 Cascada","mons":[466,405],"highlights":[{"cat":"boss","t":"Gimnasio 8 · Lectro (Eléctrico)","d":"As <b>Electivire Lv50</b>. Un Torterra o Hippowdon (inmunes y con Terremoto) lo destrozan. Recompensa: Medalla Faro + <b>MT57 Rayo Carga</b>.","link":"gimnasios"},{"cat":"item","t":"MO07 Cascada","d":"Necesaria para llegar a la Calle Victoria por la Ruta 223 (surfeando). Enséñasela a tu burro de carga.","link":""},{"cat":"tip","t":"Flint te reta","d":"El miembro del Alto Mando Flint deambula por la ciudad; sirve de aviso de lo que viene en la Liga.","link":"liga"}]},{"area":"Liga","name":"Calle Victoria y Liga Pokémon","emoji":"🏆","goal":"Supera la Calle Victoria y conquista el Alto Mando + Campeona","mons":[445,392,395],"highlights":[{"cat":"tip","t":"Prepárate para el Alto Mando","d":"Lleva: un Hielo potente (para Garchomp de Cintia), Agua/Roca (Flint), Siniestro (Lucian), Agua/Planta (Bertha) y Tierra/Lucha (Aaron). Reabastece Restaura Todo y revivir en Rocavelo.","link":"liga"},{"cat":"boss","t":"Alto Mando + Cintia","d":"Aaron (Bicho)→Bertha (Tierra)→Flint (Fuego)→Lucian (Psíquico)→<b>Cintia</b> con su temido <b>Garchomp Lv62</b>. No hay Centro Pokémon entre medias: cura con objetos.","link":"liga"},{"cat":"missable","t":"MO08 Escalada","d":"Necesitarás Escalada (obtenida cerca de la Ruta 217/Nevada) para tramos de la Calle Victoria; asegúrate de tenerla enseñada.","link":""}]}];

  var postgameStops = [{"area":"Postgame","name":"Pokédex Nacional","emoji":"📕","goal":"Desbloquea la Pokédex Nacional para acceder a legendarios y Pokémon de otras gens","mons":[483,133,479],"highlights":[{"cat":"tip","t":"Cómo obtenerla","d":"<ol><li>Sé Campeón/a.</li><li>Consigue ver los 210 Pokémon de la Pokédex de Sinnoh (usa la Guía Dex y los avistamientos de entrenadores; no hace falta capturarlos, solo verlos).</li><li>El Prof. Serbal y Oak te la entregan en el laboratorio de Pueblo Arena.</li></ol>","link":"pokedex"},{"cat":"secret","t":"Qué se desbloquea","d":"Se activan Rotom (Mansión Vieja de noche), el regalo de Eevee de Bebe, el acceso a la Columna Lanza (Dialga/Palkia), el Parque Compi (migración) y muchos Pokémon en zonas ya visitadas.","link":""}]},{"area":"Postgame","name":"Columna Lanza · Dialga y Palkia","emoji":"🕐","goal":"Captura a los dos legendarios de portada","mons":[483,484],"highlights":[{"cat":"boss","t":"Ambos disponibles","d":"<ol><li>Con la Pokédex Nacional, vuelve a subir el Monte Corona hasta la Columna Lanza.</li><li>Aparece <b>Dialga Lv47</b> (Acero/Dragón) o <b>Palkia Lv47</b> (Agua/Dragón) según el evento; en Platino accedes a ambos.</li><li>Debilita con Hada... (inexistente) o baja PS con cuidado; usa Ball Veloz/Ultra.</li></ol>","link":"legendarios"}]},{"area":"Postgame","name":"Trío del lago (captura)","emoji":"🔷","goal":"Captura a Azelf y Uxie; rastrea a Mesprit","mons":[482,480,481],"highlights":[{"cat":"catch","t":"Azelf y Uxie (quietos)","d":"En el Lago Valor (Azelf) y el Lago Agudeza (Uxie), ambos a Lv50, esperan en su cueva. No huyen: puedes debilitarlos a gusto.","link":"legendarios"},{"cat":"catch","t":"Mesprit errante","d":"<ol><li>Mesprit Lv50 deambula por Sinnoh.</li><li>Instala el Rastreador del Pokéreloj para localizarlo.</li><li>Usa un Pokémon con Bucle Falso + Cepo/Hipnosis y Ball Veloz, o gástale la Master Ball.</li></ol>","link":"legendarios"}]},{"area":"Postgame","name":"Cresselia (errante)","emoji":"🌙","goal":"Resuelve la pesadilla de Ciudad Canal y caza a Cresselia","mons":[488],"highlights":[{"cat":"catch","t":"Isla Plenilunio","d":"<ol><li>Habla con el hombre y la niña enferma en Ciudad Canal.</li><li>El marinero te lleva a la Isla Plenilunio; recoge la Pluma Lunar (cura la pesadilla).</li><li>Cresselia Lv50 empieza a deambular: rastréala y captúrala (candidata a Master Ball).</li></ol>","link":"legendarios"}]},{"area":"Postgame","name":"Isla Batalla · Monte Recio · Heatran","emoji":"🔥","goal":"Viaja a la Isla Batalla y captura a Heatran","mons":[485],"highlights":[{"cat":"tip","t":"Llegar a la Isla Batalla","d":"Desde Ciudad Nevada toma el barco. Allí están las tres islas (Combate, Sobrevive, Batalla) y entrenadores de alto nivel.","link":""},{"cat":"boss","t":"Heatran en el Magma Stone","d":"<ol><li>Cruza el Monte Recio ayudando a Buck (una vez completo, vuelve solo).</li><li>Cuando Buck retira el Magma Stone, <b>Heatran Lv50</b> (Fuego/Acero) aparece en su lugar.</li><li>Guarda antes de tocarlo; es de género aleatorio.</li></ol>","link":"legendarios"}]},{"area":"Postgame","name":"Templo Nevado · Regigigas","emoji":"🗿","goal":"Despierta al coloso con los tres Regis","mons":[486,377,378,379],"highlights":[{"cat":"catch","t":"Requisito imprescindible","d":"<ol><li>Transfiere a <b>Regirock, Regice y Registeel</b> desde la Gen 3 (vía Parque Compi).</li><li>Con los tres en el equipo, baja al sótano del Templo Nevado de Ciudad Nevada.</li><li>La estatua despierta como <b>Regigigas Lv1</b>: fácil de capturar pero cuidado de no debilitarlo.</li></ol>","link":"legendarios"}]},{"area":"Postgame","name":"Frente de Batalla","emoji":"🎖️","goal":"Domina las 5 instalaciones y gana Impresos de Batalla","mons":[445,448,395],"highlights":[{"cat":"tip","t":"Las 5 instalaciones","d":"Torre, Fábrica, Sótano (Arcade), Castillo y Sala de Batalla. Combates a Lv50/Nivel Abierto con reglas propias. Ganas Impresos para canjear por objetos y MTs raras.","link":""},{"cat":"boss","t":"Ases Frontera","d":"Derrota a los líderes (como Palmer, el padre de tu rival, en la Torre) tras rachas de victorias para las medallas de plata y oro.","link":""}]},{"area":"Postgame · Evento","name":"Darkrai (Carné de socio)","emoji":"😴","goal":"Captura al Pokémon de las pesadillas","mons":[491],"highlights":[{"cat":"catch","t":"Isla Lunanueva","d":"<ol><li>Consigue el <b>Carné de socio</b> (evento). En emulador, inyéctalo con PKHeX o usa un código Action Replay.</li><li>Con él, el marinero de Ciudad Canal te lleva a la Isla Lunanueva.</li><li><b>Darkrai Lv50</b> duerme junto al árbol: guarda y captúralo.</li></ol>","link":"emulador"}]},{"area":"Postgame · Evento","name":"Shaymin (Carta del Profesor Oak)","emoji":"🌼","goal":"Accede al Jardín Floral y captura a Shaymin","mons":[492],"highlights":[{"cat":"catch","t":"Jardín Floral","d":"<ol><li>Consigue la <b>Carta del Profesor Oak</b> (Oak's Letter); en emulador, inyéctala o usa código.</li><li>El Prof. Oak te lleva a la Ruta 224; cruza la caseta al Jardín Floral.</li><li><b>Shaymin Lv30</b> aparece; con la Gracídea cambia a Forma Cielo de día.</li></ol>","link":"emulador"}]},{"area":"Postgame · Evento","name":"Arceus (Flauta Azur)","emoji":"✨","goal":"Sube a la Sala Origen y captura al Pokémon Alfa","mons":[493],"highlights":[{"cat":"catch","t":"Sala Origen","d":"<ol><li>Consigue la <b>Flauta Azur</b> (evento nunca distribuido oficialmente en muchos territorios); en emulador se inyecta con PKHeX o Action Replay.</li><li>Súbela a la Columna Lanza y tócala para revelar una escalera.</li><li>Sube a la Sala Origen y enfréntate a <b>Arceus Lv80</b>.</li></ol>","link":"emulador"}]},{"area":"Postgame","name":"Rotom y sus formas","emoji":"🔌","goal":"Captura a Rotom y desbloquea sus 5 formas","mons":[479],"highlights":[{"cat":"catch","t":"La tele de la Mansión Vieja","d":"Ve de noche a la sala del fondo de la Mansión Vieja (Bosque Vetusto) e interactúa con la tele para enfrentar a <b>Rotom Lv20</b> (disponible desde media partida, tras la Medalla Bosque y con Corte; no requiere Pokédex Nacional).","link":"secretos"},{"cat":"secret","t":"Llave secreta","d":"El evento de la Llave secreta abre una sala secreta en el Edificio Galáctico de Ciudad Vetusta con electrodomésticos: cambia la forma de Rotom (Calor, Lavado, Frío, Ventilador, Corte). En emulador inyecta la Llave secreta.","link":"emulador"}]},{"area":"Postgame","name":"Migración y Manaphy/Phione","emoji":"🐣","goal":"Completa la Pokédex Nacional con Parque Compi y crianza","mons":[490,489],"highlights":[{"cat":"tip","t":"Parque Compi","d":"En la Ruta 221 está el Parque Compi: migra hasta 6 Pokémon al día desde juegos de GBA (Rubí/Zafiro/Esmeralda/RojoFuego/VerdeHoja) para rellenar la Dex Nacional.","link":"pokedex"},{"cat":"catch","t":"Manaphy y Phione","d":"<ol><li>Obtén el Huevo de Manaphy (evento Pokémon Ranger); en emulador, inyéctalo.</li><li>Eclosiona a <b>Manaphy</b>.</li><li>Críalo con Ditto en la Guardería para obtener <b>Phione</b>.</li></ol>","link":"emulador"}]},{"area":"Postgame","name":"El Subsuelo y las Placas","emoji":"⛏️","goal":"Explora el Subsuelo, monta base y reúne objetos raros","mons":[442,377],"highlights":[{"cat":"secret","t":"Excavación","d":"Cava paredes para conseguir fósiles, esferas (déjalas enterradas y crecen), trozos de evolución y las <b>Placas</b> que modifican el tipo de Arceus.","link":"secretos"},{"cat":"secret","t":"Saludos para Spiritomb","d":"Habla/saluda con 32 personas distintas en el Subsuelo (con 2 instancias de melonDS conectadas) para poder invocar a <b>Spiritomb</b> en la Ruta 209.","link":"secretos"}]}];

  /* ---------------- Transformación al formato del renderer ---------------- */
  // La plantilla usa 'emo' y 'hl'; mapeamos emoji->emo y highlights->hl,
  // y el campo link (palabra clave) a {t, href} usando el mapa L.
  function toStop(s) {
    return {
      area: s.area,
      name: s.name,
      emo: s.emoji,
      gym: s.gym,
      goal: s.goal,
      mons: s.mons,
      hl: (s.highlights || []).map(function (h) {
        var o = { cat: h.cat, t: h.t, d: h.d };
        if (h.mons) o.mons = h.mons;
        if (h.link && L[h.link]) o.link = L[h.link];
        return o;
      })
    };
  }
  var STOPS = routeStops.concat(postgameStops).map(toStop);

  /* ---------------- Estado ---------------- */
  var K_CUR = "gen4_wt_current";
  var K_FILTER = "gen4_wt_filter";
  var current = parseInt(localStorage.getItem(K_CUR) || "0", 10) || 0;
  var filter = localStorage.getItem(K_FILTER) || "all";
  if (current >= STOPS.length) current = 0;

  /* ---------------- Sprite HTML ---------------- */
  function spriteHTML(id, sm) {
    var nm = NAME[id] || ("#" + id);
    return '<span class="wt-sprite' + (sm ? ' wt-sprite--sm' : '') +
      '" title="' + nm + '"><img src="' + SPRITE(id) + '" alt="' + nm +
      '" loading="lazy" onerror="this.parentNode.classList.add(\'failed\')"><b>' + nm + '</b></span>';
  }

  /* ---------------- Render ---------------- */
  var timeline = $("#wtTimeline");

  function stopMatchesFilter(stop) {
    if (filter === "all") return true;
    return stop.hl.some(function (h) { return h.cat === filter; });
  }

  function render() {
    timeline.innerHTML = STOPS.map(function (stop, i) {
      var visibleHls = stop.hl.filter(function (h) { return filter === "all" || h.cat === filter; });
      var stateCls = i < current ? "done" : (i === current ? "current" : "");
      var hidden = !stopMatchesFilter(stop);
      var open = (filter !== "all" && visibleHls.length) || i === current;

      var hlsHTML = visibleHls.map(function (h) {
        var c = CAT[h.cat];
        var mons = h.mons ? '<div class="wt-hl__mons">' + h.mons.map(function (id) { return spriteHTML(id, true); }).join("") + '</div>' : "";
        var link = h.link ? '<a class="wt-hl__link" href="' + h.link.href + '">📖 ' + h.link.t + ' →</a>' : "";
        return '<div class="wt-hl cat-' + h.cat + '">' +
          '<div class="wt-hl__ic">' + c.ic + '</div>' +
          '<div class="wt-hl__main">' +
          '<div class="wt-hl__t">' + h.t + ' <span class="wt-hl__tag">' + c.tag + '</span></div>' +
          '<div class="wt-hl__d">' + h.d + '</div>' + mons +
          (link ? '<div>' + link + '</div>' : '') +
          '</div></div>';
      }).join("");

      var goal = (stop.goal && (filter === "all")) ? '<div class="wt-goal">🎯 <b>Objetivo:</b> ' + stop.goal + '</div>' : "";
      var sprites = (stop.mons || []).slice(0, 5).map(function (id) { return spriteHTML(id); }).join("");
      var gymBadge = stop.gym ? '<span class="wt-badge-gym">🏅 ' + stop.gym + '</span>' : "";

      return '<div class="wt-stop ' + stateCls + '" data-i="' + i + '"' + (hidden ? ' style="display:none"' : '') + '>' +
        '<div class="wt-node"><span class="wt-node-emo">' + stop.emo + '</span></div>' +
        '<div class="wt-card' + (open ? ' open' : '') + '">' +
          '<div class="wt-card__head" data-toggle>' +
            '<div class="wt-card__titles">' +
              '<div class="wt-card__area">' + stop.area + '</div>' +
              '<div class="wt-card__name">' + stop.name + ' ' + gymBadge + '</div>' +
            '</div>' +
            '<div class="wt-card__sprites">' + sprites + '</div>' +
            '<div class="wt-card__meta"><span class="wt-card__count">' + visibleHls.length + '</span><span class="wt-chev">›</span></div>' +
          '</div>' +
          '<div class="wt-card__body"><div class="wt-card__inner">' +
            goal + hlsHTML +
            '<button class="wt-hereBtn" data-here="' + i + '">📍 Estoy aquí</button>' +
          '</div></div>' +
        '</div>' +
      '</div>';
    }).join("");

    updateHereBar();
  }

  function updateHereBar() {
    var stop = STOPS[current];
    $("#wtHereName").textContent = stop.area + " — " + stop.name;
    var pct = Math.round((current / (STOPS.length - 1)) * 100);
    $("#wtHereFill").style.width = pct + "%";
    $("#wtHerePct").textContent = pct + "%";
  }

  /* ---------------- Eventos ---------------- */
  timeline.addEventListener("click", function (e) {
    if (e.target.closest(".wt-hl__link")) return; // dejar navegar los enlaces
    var hereBtn = e.target.closest("[data-here]");
    var toggle = e.target.closest("[data-toggle]");
    if (hereBtn) {
      e.stopPropagation();
      current = parseInt(hereBtn.getAttribute("data-here"), 10);
      localStorage.setItem(K_CUR, current);
      render();
      var el = timeline.querySelector('.wt-stop[data-i="' + current + '"]');
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (toggle) {
      toggle.closest(".wt-card").classList.toggle("open");
    }
  });

  $$(".wt-chip").forEach(function (chip) {
    chip.classList.toggle("active", chip.getAttribute("data-filter") === filter);
    chip.addEventListener("click", function () {
      filter = chip.getAttribute("data-filter");
      localStorage.setItem(K_FILTER, filter);
      $$(".wt-chip").forEach(function (c) { c.classList.toggle("active", c === chip); });
      render();
    });
  });

  render();

  if (current > 0) {
    setTimeout(function () {
      var el = timeline.querySelector('.wt-stop[data-i="' + current + '"]');
      if (el) el.scrollIntoView({ behavior: "auto", block: "center" });
    }, 60);
  }
})();
