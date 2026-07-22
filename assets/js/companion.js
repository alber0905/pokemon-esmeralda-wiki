/* =====================================================================
   Compañera de juego — datos de la ruta + interacción
   ===================================================================== */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var SPRITE = function (id) {
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/" + id + ".png";
  };
  var NAME = {
    252:"Treecko",255:"Torchic",258:"Mudkip",261:"Poochyena",263:"Zigzagoon",265:"Wurmple",
    276:"Taillow",278:"Wingull",280:"Ralts",285:"Shroomish",287:"Slakoth",289:"Slaking",
    290:"Nincada",291:"Ninjask",292:"Shedinja",293:"Whismur",296:"Makuhita",299:"Nosepass",
    302:"Sableye",303:"Mawile",304:"Aron",306:"Aggron",309:"Electrike",310:"Manectric",
    311:"Plusle",312:"Minun",316:"Gulpin",318:"Carvanha",319:"Sharpedo",320:"Wailmer",
    322:"Numel",324:"Torkoal",66:"Machop",327:"Spinda",328:"Trapinch",330:"Flygon",
    331:"Cacnea",333:"Swablu",334:"Altaria",335:"Zangoose",336:"Seviper",337:"Lunatone",
    338:"Solrock",343:"Baltoy",349:"Feebas",350:"Milotic",351:"Castform",352:"Kecleon",
    356:"Dusclops",357:"Tropius",359:"Absol",360:"Wynaut",365:"Walrein",371:"Bagon",
    373:"Salamence",374:"Beldum",376:"Metagross",227:"Skarmory",230:"Kingdra",183:"Marill",
    382:"Kyogre",383:"Groudon",384:"Rayquaza",380:"Latias",381:"Latios",
    377:"Regirock",378:"Regice",379:"Registeel",
    151:"Mew",249:"Lugia",250:"Ho-Oh",385:"Jirachi",386:"Deoxys",
    202:"Wobbuffet",321:"Wailord",369:"Relicanth",235:"Smeargle"
  };

  // Categorías: boss, catch, item, secret, missable, tip
  var CAT = {
    boss:    { ic:"🥊", tag:"Combate",  label:"Combates" },
    catch:   { ic:"🎯", tag:"Captura",  label:"Capturas" },
    item:    { ic:"🎁", tag:"Objeto",   label:"Objetos"  },
    secret:  { ic:"🗝️", tag:"Secreto",  label:"Secretos" },
    missable:{ ic:"⚠️", tag:"No perder",label:"No perder"},
    tip:     { ic:"💡", tag:"Consejo",  label:"Consejos" }
  };

  // atajos de enlaces a la guía de referencia
  var L = {
    gym:      { t:"Todos los gimnasios", href:"index.html#gimnasios" },
    liga:     { t:"Alto Mando y Campeona", href:"index.html#liga" },
    leg:      { t:"Legendarios", href:"index.html#legendarios" },
    puzzles:  { t:"Puzzles y Braille", href:"index.html#puzzles" },
    islas:    { t:"Islas y áreas secretas", href:"index.html#islas" },
    tickets:  { t:"Tickets de evento", href:"index.html#tickets" },
    frontera: { t:"Frontera de Batalla", href:"index.html#frontera" },
    pokedex:  { t:"Completar la Pokédex", href:"index.html#pokedex" },
    feebas:   { t:"Feebas → Milotic", href:"index.html#feebas" },
    mtmo:     { t:"MTs y MOs", href:"index.html#mtmo" },
    tutores:  { t:"Tutores de movimientos", href:"index.html#tutores" },
    concursos:{ t:"Concursos y Pokoblocks", href:"index.html#concursos" },
    bases:    { t:"Bases y bayas", href:"index.html#bases" },
    objetos:  { t:"Objetos raros", href:"index.html#objetos" },
    cria:     { t:"Cría, EVs e IVs", href:"index.html#cria" },
    emu:      { t:"Emulador y trucos", href:"index.html#emulador" },
    evos:     { t:"Todas las evoluciones", href:"index.html#evoluciones" }
  };

  var STOPS = [
    { area:"Inicio", name:"Villa Raíz", emo:"🏡", mons:[258,255,252],
      goal:"Coge tu inicial, equípate y sal por la Ruta 101.",
      hl:[
      { cat:"tip", t:"Elige inicial con criterio", d:"<b>Mudkip</b>→Marshtomp→Swampert (Agua/Tierra): la curva más suave, domina los gimnasios de Roca y Lucha y es <b>inmune al Eléctrico</b> (3.º). <b>Torchic</b>→Blaziken (Fuego/Lucha) pega muchísimo y arrasa el 5.º y 6.º, pero sufre al principio. <b>Treecko</b>→Sceptile (Planta) para reto: rápido pero frágil." },
      { cat:"item", t:"Zapatillas de correr + Poción del PC", d:"Tu madre te da las <b>Zapatillas</b> (mantén B para correr). Abre el PC de tu cuarto: hay una <b>Poción</b> gratis." },
      { cat:"tip", t:"Ajusta el reloj interno (RTC) ya", d:"Controla el crecimiento de <b>bayas</b>, la <b>Isla Espejismo</b>, mareas y el <b>Sorteo de Lotería</b>. Ponlo a tu hora real desde el inicio.", link:L.bases }
    ]},
    { area:"Ruta 101 · Pueblo Escaso", name:"Los primeros pasos", emo:"🌱", mons:[263,261,265],
      goal:"Salva al Prof. Abedul, consigue la Pokédex y abastécete en Pueblo Escaso.",
      hl:[
      { cat:"boss", t:"Rescata al Prof. Abedul", d:"Coge un inicial de su mochila para salvarlo del Pokémon salvaje. Te da la <b>Pokédex</b> y 5 <b>Poké Balls</b>." },
      { cat:"catch", t:"Zigzagoon: tu recolector para siempre", d:"Su habilidad <b>Recogida (Pickup)</b> encuentra objetos gratis al caminar (¡incluso raros como Caramelos Raros!). Ten uno en el equipo toda la partida. Wurmple y Poochyena también caen aquí.", mons:[263,261] },
      { cat:"tip", t:"Aprende a ver objetos ocultos", d:"En Pueblo Escaso un chico te habla del <b>Buscaobjetos</b>. Compra Poké Balls y Pociones antes de seguir." }
    ]},
    { area:"Rutas 102–103", name:"Primer rival y capturas clave", emo:"⚔️", mons:[280,183],
      goal:"Gana a tu rival en la Ruta 103 y caza un Ralts si tienes paciencia.",
      hl:[
      { cat:"boss", t:"Primer combate rival (Ruta 103)", d:"May/Brendan con su inicial Nv. 5. Sube algún nivel en la hierba antes de retarlo." },
      { cat:"catch", t:"⭐ Ralts (raro ~4%) en la Ruta 102", d:"Merece MUCHO la caza: <b>Gardevoir</b> (Psíquico) es de lo mejor del juego y te resuelve el 2.º gimnasio y buena parte de la aventura. Ten paciencia y lleva Balls.", mons:[280], link:L.pokedex },
      { cat:"catch", t:"Otras de la zona", d:"Seedot/Lotad, Surskit (raro, →Masquerain) y Marill surfeando más adelante.", mons:[183] }
    ]},
    { area:"Ruta 104 · Bosque Petalia", name:"El bosque", emo:"🌳", mons:[285,287,265,276],
      goal:"Cruza el bosque hacia Ciudad Férrica ayudando al investigador de Devon.",
      hl:[
      { cat:"secret", t:"Wurmple: la evolución es ALEATORIA", d:"No depende del nivel sino del <b>valor de personalidad</b> oculto: sale Silcoon→Beautifly o Cascoon→Dustox al azar. Si quieres uno concreto, captura varios Wurmple.", mons:[265] },
      { cat:"catch", t:"Shroomish y Slakoth (imprescindibles)", d:"<b>Shroomish</b>→Breloom (Planta/Lucha) con Bomba Germen/Puño Certero es un monstruo. <b>Slakoth</b>→Vigoroth→Slaking pega brutal (pero Slaking tiene Ausente: actúa turno sí, turno no).", mons:[285,287] },
      { cat:"item", t:"🫐 Planta bayas cuanto antes", d:"En la parcela de la florista (Ruta 104). Tardan horas reales en crecer, así que empieza ya: las necesitarás para <b>Pokoblocks</b>, concursos y <b>Milotic</b>.", link:L.bases },
      { cat:"boss", t:"Recluta en el bosque", d:"Ayudas al investigador de Devon contra un recluta de Aqua/Magma. Recoge los objetos ocultos del bosque (revísalo con calma)." },
      { cat:"catch", t:"Taillow y Wingull", d:"<b>Taillow</b>→Swellow (Normal/Volador rápido) y Wingull→Pelipper. Buenos voladores tempranos.", mons:[276,278] }
    ]},
    { area:"Ciudad Férrica", name:"Gimnasio 1 · Petra (Roca)", emo:"🥇", gym:"Piedra", mons:[299],
      goal:"Vence a Petra, entrega los Bienes de Devon y hazte con dos objetos clave.",
      hl:[
      { cat:"boss", t:"Petra — tipo Roca (Nosepass Nv. 15)", d:"Agua+Planta la barren (Mudkip, Lotad, Shroomish). Cuidado si llevas Torchic. Premio: Medalla Piedra y <b>MT39 Bola Roca</b>.", mons:[299], link:L.gym },
      { cat:"item", t:"⭐ Repartir Experiencia (Exp. Share)", d:"Tras el gimnasio persigues al ladrón de los <b>Bienes de Devon</b> (Ruta 116/Túnel). Al devolverlos, el <b>Sr. Stone</b> en Devon Corp te da el Exp. Share. Póntelo a un Pokémon flojo y súbelo sin esfuerzo. ¡Objeto que MUCHA gente se pierde!" },
      { cat:"item", t:"MO01 Corte + PokéNav", d:"La <b>MO01 Corte</b> te la da un hombre en la casa junto a la entrada norte. Devon te da el <b>PokéNav</b> (llamadas y revanchas con entrenadores).", link:L.mtmo }
    ]},
    { area:"Ruta 116 · Túnel Rusturf", name:"Nincada y el truco Shedinja", emo:"🕳️", mons:[290,291,292],
      goal:"Recupera los Bienes de Devon y captura Nincada para el truco de Shedinja.",
      hl:[
      { cat:"secret", t:"🥷 Consigue Shedinja GRATIS", d:"Captura <b>Nincada</b> (Ruta 116) y evoluciónalo (Nv. 20): se convierte en Ninjask, y si tienes <b>un hueco libre en el equipo + una Poké Ball de sobra en la mochila</b>, aparecerá ADEMÁS un <b>Shedinja</b> (Bicho/Fantasma con Superguarda: solo le dañan ataques supereficaces). Dos Pokémon por el precio de uno.", mons:[290,291,292], link:L.pokedex },
      { cat:"catch", t:"Whismur y Skitty", d:"<b>Whismur</b>→Loudred→Exploud (Normal, buen especial). Skitty es raro pero mono para concursos.", mons:[293] },
      { cat:"item", t:"Anota: MO04 Fuerza está aquí", d:"En el túnel también vive la <b>MO04 Fuerza</b>, pero para llegar necesitas <b>Golpe Roca</b> (llega con la 3.ª medalla). Vuelve entonces a por ella y a reunir a la pareja.", link:L.mtmo }
    ]},
    { area:"Pueblo Azuliza", name:"Gimnasio 2 · Marcial (Lucha)", emo:"🥊", gym:"Puño", mons:[296],
      goal:"Llega en barco con el Sr. Briney, vence a Marcial y lleva la carta a Steven.",
      hl:[
      { cat:"boss", t:"Marcial — tipo Lucha (Makuhita Nv. 16)", d:"Volador o <b>Psíquico</b> (¡tu Ralts/Kirlia!) lo destrozan. Ojo con Sacrificio de Makuhita. Premio: Medalla Puño y <b>MT08 Corpulencia</b>.", mons:[296], link:L.gym },
      { cat:"item", t:"Caña Vieja", d:"Un pescador del pueblo te la regala. Empieza a pescar Magikarp/Tentacool para completar Pokédex." },
      { cat:"secret", t:"🎣 La frase de moda de Azuliza", d:"El chico 'moderno' del pueblo fija una <b>frase de moda</b>. Esa frase determina en el postgame las 6 casillas donde vive <b>Feebas</b> en la Ruta 119. Tenlo muy presente.", link:L.feebas },
      { cat:"tip", t:"Recado para Steven", d:"Entrega la carta a Steven en la <b>Cueva Granito</b>. De paso coge la <b>MO05 Destello</b> de un excursionista y úsala dentro." }
    ]},
    { area:"Cueva Granito", name:"Minerales y bichos raros", emo:"⛏️", mons:[304,303,302],
      goal:"Entrega la carta a Steven y llévate una Piedra Eterna y buenas capturas.",
      hl:[
      { cat:"catch", t:"Aron, Mawile y Sableye", d:"<b>Aron</b>→Lairon→Aggron (Acero/Roca, tanque brutal). En <b>Esmeralda salen los dos</b> exclusivos: Mawile (Zafiro) y Sableye (Rubí). También Geodude y Makuhita.", mons:[304,303,302] },
      { cat:"item", t:"Piedra Eterna (Everstone)", d:"Escondida en la cueva. Sirve para <b>evitar evoluciones</b> y, en la cría, para <b>heredar la naturaleza</b>. Muy útil en el postgame competitivo.", link:L.cria },
      { cat:"tip", t:"Zonas con Mach Bike", d:"Partes de la cueva (con paredes escalables) requieren la <b>Mach Bike</b>: guardan objetos. Vuelve cuando la tengas." }
    ]},
    { area:"Ciudad Portual (Slateport)", name:"Mercado, museo y servicios", emo:"⚓", mons:[320,318,319],
      goal:"Frena a Aqua/Magma en el Museo y aprovecha tiendas, tutores y concursos.",
      hl:[
      { cat:"boss", t:"Team Aqua/Magma en el Museo Oceánico", d:"Combate de trama contra reclutas y un jefe. Antes, entrega los Bienes de Devon al Capitán Stern." },
      { cat:"item", t:"Caja Monedas + Borra-movimientos + Tutores", d:"Consigue la <b>Caja Monedas</b> (una señora) para el Casino. Aquí puedes <b>borrar MOs</b> y hay <b>tutores</b> de movimientos.", link:L.tutores },
      { cat:"catch", t:"Wailmer y Carvanha", d:"Pescando/surfeando. <b>Carvanha</b>→Sharpedo (Agua/Siniestro) es un atacante rapidísimo con Velocidad Extrema/Colmillo.", mons:[320,318,319] },
      { cat:"tip", t:"Mercado, Concursos y Battle Tent", d:"El <b>Mercado</b> vende objetos útiles (y bayas). Hay <b>Casa de Concursos</b> y una <b>Carpa de Combate</b> para practicar." }
    ]},
    { area:"Ruta 110", name:"Casa del Timo y tu bici", emo:"🚲", mons:[309,311,312],
      goal:"Consigue una bici en Malvalona y descubre la Casa del Timo.",
      hl:[
      { cat:"secret", t:"🏠 La Casa del Timo (Trick House)", d:"El Trick Master abre un <b>puzzle NUEVO tras cada medalla</b> con premios (MTs, objetos, muebles de base). Vuelve después de cada gimnasio; es facilísimo de olvidar." },
      { cat:"item", t:"Bici Mach o Acro (gratis, intercambiable)", d:"Rydel, en Malvalona, te da una. <b>Mach</b> = velocidad (Torre Celeste, cuestas). <b>Acro</b> = saltos (Torre Espejismo, atajos). Cámbiala gratis cuando quieras." },
      { cat:"catch", t:"Electrike, Plusle/Minun, Gulpin", d:"<b>Electrike</b>→Manectric (Eléctrico veloz). Plusle/Minun para dobles; Gulpin→Swalot.", mons:[309,311,312] }
    ]},
    { area:"Malvalona (Mauville)", name:"Gimnasio 3 · Erico (Eléctrico)", emo:"⚡", gym:"Dínamo", mons:[310],
      goal:"Gana a Erico (fácil con Tierra), coge Golpe Roca y vuelve a por Fuerza.",
      hl:[
      { cat:"boss", t:"Erico — tipo Eléctrico (Manectric/Magneton)", d:"<b>Marshtomp/cualquier tipo Tierra es INMUNE</b> al Eléctrico: paseo. Premio: Medalla Dínamo y <b>MT34 Onda Voltio</b>.", mons:[310], link:L.gym },
      { cat:"item", t:"MO06 Golpe Roca → vuelve a por Fuerza", d:"Un hombre te da <b>Golpe Roca</b>. Ahora ya puedes volver al <b>Túnel Rusturf</b> a por la <b>MO04 Fuerza</b> que dejaste pendiente.", link:L.mtmo },
      { cat:"secret", t:"Nueva Malvalona (New Mauville)", d:"Erico te manda arreglar la central eléctrica al sur: dentro hay objetos, <b>Voltorb/Magnemite</b> y un premio. Contenido opcional que casi nadie visita." },
      { cat:"item", t:"Casino (fichas → premios)", d:"El <b>Casino</b> canjea fichas por MTs y Pokémon. Con la Caja Monedas ya puedes jugar.", link:L.objetos }
    ]},
    { area:"Rutas 111–112 · Camino Ardiente", name:"Camino a Lavacalda", emo:"🌋", mons:[322,324,66],
      goal:"Sube por el Camino Ardiente y frena a los villanos en el Monte Cenizo.",
      hl:[
      { cat:"catch", t:"Camino Ardiente: capturas de Fuego", d:"<b>Numel</b>→Camerupt (Fuego/Tierra), <b>Torkoal</b> (Fuego, defensa altísima, SOLO aquí), <b>Machop</b>→Machamp, Grimer, Koffing y Slugma.", mons:[322,324,66] },
      { cat:"boss", t:"Aqua/Magma en la cima del Monte Cenizo", d:"Detén su plan con el teleférico → consigues el <b>Meteorito</b> para la trama." },
      { cat:"item", t:"Objetos del Paso Quemado y teleférico", d:"Recoge MTs y objetos ocultos por la zona (Paso Quemado, Ruta 112) antes de bajar a Lavacalda." }
    ]},
    { area:"Lavacalda (Lavaridge)", name:"Gimnasio 4 · Candela (Fuego)", emo:"♨️", gym:"Calor", mons:[324],
      goal:"Recoge el Huevo de las termas, vence a Candela y cruza el desierto.",
      hl:[
      { cat:"missable", t:"🥚 Huevo de Wynaut (¡NO te lo saltes!)", d:"Habla con la anciana de las <b>aguas termales</b>: te regala un Huevo que nace en <b>Wynaut</b> (→Wobbuffet). Único y facilísimo de perderse.", mons:[360], link:L.cria },
      { cat:"boss", t:"Candela — tipo Fuego (Torkoal Nv. 29)", d:"Agua/Tierra/Roca. Su Torkoal tiene <b>Humo Blanco</b> y usa Sofoco. Premio: Medalla Calor y <b>MT50 Sofoco</b>.", mons:[324], link:L.gym },
      { cat:"item", t:"Gafas Protectoras (Go-Goggles)", d:"Tras el Monte Cenizo, May/Brendan te las da: sin ellas la <b>tormenta de arena</b> del desierto (Ruta 111) te bloquea el paso. También hay una <b>Herboristería</b> con curas baratas (amargas)." }
    ]},
    { area:"Ruta 111 · Desierto", name:"Fósiles y joyas del desierto", emo:"🏜️", mons:[328,330,331],
      goal:"Con las Gafas, cruza el desierto: fósil, base secreta y Trapinch.",
      hl:[
      { cat:"catch", t:"⭐ Trapinch → Flygon", d:"<b>Trapinch</b>→Vibrava→<b>Flygon</b> (Tierra/Dragón) es de los mejores de toda la partida. También Cacnea→Cacturne, Sandshrew y Baltoy→Claydol.", mons:[328,330,331], link:L.pokedex },
      { cat:"item", t:"Torre Espejismo → tu fósil", d:"Sube con la <b>Acro Bike</b> y elige UN fósil: <b>Garra</b> (→Anorith→Armaldo) o <b>Raíz</b> (→Lileep→Cradily). El otro se consigue en el postgame. Revívelo en el <b>Museo de Devon</b> (Portual).", link:L.objetos },
      { cat:"secret", t:"MT43 Daño Secreto → tu Base Secreta", d:"Una chica en una casa del desierto te da la <b>MT43</b>: úsala en arbustos/árboles/paredes marcadas para crear y decorar tu <b>Base Secreta</b>.", link:L.bases }
    ]},
    { area:"Petalia (Petalburg)", name:"Gimnasio 5 · Normo (Normal)", emo:"🏅", gym:"Equilibrio", mons:[289],
      goal:"Con 4 medallas, enfréntate a tu padre y consigue Surf.",
      hl:[
      { cat:"boss", t:"Tu padre Normo — tipo Normal (Slaking Nv. 31)", d:"Necesitas <b>4 medallas</b> para entrar. Equipo: Spinda, Vigoroth, Linoone y <b>Slaking</b>. Slaking descansa turno sí/turno no (<b>Ausente</b>): pega fuerte en su descanso. Lucha lo revienta. Premio: Medalla Equilibrio y <b>MT42 Cara Susto</b>.", mons:[289], link:L.gym },
      { cat:"item", t:"MO03 Surf", d:"Tras el gimnasio, en Petalia te dan la <b>MO03 Surf</b>: se abre medio mapa (rutas de agua). Enséñasela a un Agua o a un esclavo MO.", link:L.mtmo }
    ]},
    { area:"Rutas 118–119 · Casa del Tiempo", name:"Hacia Arborada", emo:"🌧️", mons:[357,352,351,349],
      goal:"Recupera la Casa del Tiempo, consigue Vuelo y el Devon Scope.",
      hl:[
      { cat:"boss", t:"Casa del Tiempo → regalo Castform", d:"Expulsa a Aqua/Magma de la <b>Casa del Tiempo</b> (Ruta 119) y un científico te regala <b>Castform</b> (cambia de tipo según el clima). Único.", mons:[351], link:L.pokedex },
      { cat:"item", t:"MO02 Vuelo + Devon Scope", d:"Una chica de la Ruta 119 te da <b>Vuelo</b> (viajas entre ciudades). En la Ruta 120 consigues el <b>Devon Scope</b>: revela a los <b>Kecleon invisibles</b> (uno bloquea el puente).", mons:[352], link:L.mtmo },
      { cat:"secret", t:"🐟 Feebas vive aquí (Ruta 119)", d:"Solo en <b>6 casillas al azar</b> ligadas a la frase de moda de Azuliza, y solo pica con caña. Puedes empezar a buscarlo ya o dejarlo para el 100% postgame.", mons:[349], link:L.feebas },
      { cat:"catch", t:"Tropius, Zangoose/Seviper, Oddish", d:"<b>Tropius</b> (Planta/Volador) solo aquí. En Esmeralda salen tanto Zangoose como Seviper según zona.", mons:[357] },
      { cat:"item", t:"Caña Buena", d:"Un pescador de la Ruta 118 te la da: mejores capturas de agua que la Vieja." }
    ]},
    { area:"Arborada (Fortree)", name:"Gimnasio 6 · Alana (Volador)", emo:"🪶", gym:"Pluma", mons:[334],
      goal:"Aparta al Kecleon del puente y derrota a Alana.",
      hl:[
      { cat:"boss", t:"Alana — tipo Volador (Altaria Nv. 33)", d:"Eléctrico/Hielo/Roca. Su <b>Skarmory</b> (Acero/Volador) es duro; su <b>Altaria</b> es Dragón: el <b>Hielo</b> lo funde. Cuidado con Danza Dragón. Premio: Medalla Pluma y <b>MT40 Golpe Aéreo</b>.", mons:[334,227], link:L.gym },
      { cat:"catch", t:"Swablu → Altaria", d:"En rutas cercanas. Altaria (Dragón/Volador) es sólido, resiste mucho y luce en concursos de Hermosura.", mons:[333] },
      { cat:"tip", t:"Recuerda el Devon Scope", d:"Sin él no cruzas a Arborada: un <b>Kecleon invisible</b> tapa el puente de madera. Púlsale con el objeto puesto." }
    ]},
    { area:"Rutas 120–121 · Monte Pírico · Lilycove", name:"Safari y gran ciudad", emo:"🎡", mons:[359,335],
      goal:"Explora el Monte Pírico, la Zona Safari y los Grandes Almacenes.",
      hl:[
      { cat:"catch", t:"🏞️ Zona Safari (Lilycove) — botín enorme", d:"Exclusivos que no salen fuera: <b>Pikachu, Pinsir, Heracross, Rhyhorn, Phanpy, Miltank, Doduo, Natu…</b>. Lleva Balls Safari, comida y paciencia (no puedes usar tus ataques).", link:L.pokedex },
      { cat:"boss", t:"Monte Pírico → Orbe Rojo/Azul", d:"Frena a Aqua/Magma en la cima; obtienes el <b>Orbe</b> que despierta al legendario. Debajo, tumbas con objetos (Amuleto?)." },
      { cat:"catch", t:"Absol y compañía", d:"<b>Absol</b> (Siniestro) en la Ruta 120: gran atacante físico. Zangoose/Seviper según versión de zona.", mons:[359,335] },
      { cat:"item", t:"Grandes Almacenes + Caña Súper", d:"Los <b>Almacenes de Lilycove</b> venden vitaminas, MTs, objetos de tipo… La <b>Caña Súper</b> (pescador Ruta 121) es la pesca definitiva. Aquí está la <b>Casa de Concursos</b> principal.", link:L.concursos },
      { cat:"secret", t:"Maestro de las Bayas (Ruta 123)", d:"Regala bayas raras cada día si le dices el <b>lema</b> correcto. Fuente clave de bayas para Pokoblocks de calidad.", link:L.bases }
    ]},
    { area:"Algaria (Mossdeep)", name:"Gimnasio 7 · Vito y Leti (Psíquico)", emo:"🧠", gym:"Mente", mons:[338,337],
      goal:"Gana el combate doble, consigue Buceo y un Beldum de Steven.",
      hl:[
      { cat:"boss", t:"Vito y Leti — combate DOBLE (Psíquico)", d:"Solrock+Lunatone se curan y apoyan mutuamente. Lleva ataques en <b>área</b> (Terremoto, Surf) y tipos <b>Siniestro/Fantasma/Bicho</b>. Premio: Medalla Mente y <b>MT04 Paz Mental</b>.", mons:[338,337], link:L.gym },
      { cat:"item", t:"MO07 Buceo", d:"Te la da Steven. Imprescindible para el fondo marino, la Cámara Sellada (Regis) y la trama.", link:L.mtmo },
      { cat:"catch", t:"⭐ Beldum en casa de Steven", d:"Steven te regala un <b>Beldum</b>→Metang→<b>Metagross</b> (Acero/Psíquico), de lo mejor del competitivo. No salgas de Algaria sin recogerlo.", mons:[374,376], link:L.pokedex },
      { cat:"boss", t:"Centro Espacial", d:"Aqua/Magma intentan robar combustible: combate de trama con Steven de aliado." }
    ]},
    { area:"Rutas 124–128 · Bajo el mar", name:"Cueva Submarina y Rayquaza", emo:"🌊", mons:[384,371],
      goal:"Detén la crisis del clima capturando a Rayquaza en la Torre Celeste.",
      hl:[
      { cat:"boss", t:"Cueva del Origen del Mar (Seafloor Cavern)", d:"Bucea hasta ella: se libera Kyogre/Groudon y el clima enloquece (lluvia/sol extremos)." },
      { cat:"boss", t:"🐉 Rayquaza — Torre Celeste (Nv. 70)", d:"Ve a Pueblo Oromar y sube la <b>Torre Celeste</b> con la <b>Mach Bike</b> a toda velocidad por los suelos que se rompen. Cálmalo y captúralo aquí mismo.", mons:[384], link:L.leg },
      { cat:"catch", t:"Buceo: Relicanth y Clamperl", d:"<b>Relicanth</b> es una de las 'llaves' (con Wailord) para desbloquear los <b>Regis</b> en el postgame: cázalo ya. Clamperl→Huntail/Gorebyss por intercambio con objeto.", link:L.puzzles }
    ]},
    { area:"Arrecípolis (Sootopolis)", name:"Gimnasio 8 · Galán/Juan (Agua)", emo:"💧", gym:"Lluvia", mons:[230],
      goal:"Resuelve la crisis del legendario y vence al último líder.",
      hl:[
      { cat:"boss", t:"Juan — tipo Agua (Kingdra Nv. 46)", d:"Planta/Eléctrico para casi todo. Su <b>Kingdra</b> (Agua/Dragón) solo teme a Dragón/Hada: combina Hielo+Planta o pega con un Dragón. Premio: Medalla Lluvia y <b>MT03 Hidropulso</b>.", mons:[230], link:L.gym },
      { cat:"item", t:"MO08 Cascada", d:"Tras la crisis, Wallace/Máximo te la da: abre el <b>Camino Victoria</b>.", link:L.mtmo }
    ]},
    { area:"Camino Victoria · Calagua", name:"Alto Mando y Campeona", emo:"👑", mons:[359,356,365,373,350],
      goal:"Supera el Camino Victoria y encadena a los 5 rivales de la Liga.",
      hl:[
      { cat:"boss", t:"Los 4 + la Campeona, SIN curar entre ellos", d:"<b>Sixto</b> (Siniestro) → <b>Fátima</b> (Fantasma) → <b>Glacia</b> (Hielo) → <b>Dracón</b> (Dragón) → Campeona <b>Alana/Wallace</b> (Agua). Lleva <b>muchos Restaurar Todo</b>, Éter y revivir.", mons:[359,356,365,373,350], link:L.liga },
      { cat:"tip", t:"Dos ataques resuelven media Liga", d:"Un buen <b>Hielo</b> arrasa a Dracón (dragones) y <b>Eléctrico/Planta</b> hunde el equipo Agua de la Campeona. Milotic es un muro especial: usa físicos o estados." },
      { cat:"catch", t:"Camino Victoria", d:"Lairon, Hariyama, Mawile, Sableye, Medicham, Golbat… y objetos valiosos (Full Restore, MTs) escondidos." }
    ]},
    /* ==================== CAPÍTULO POSTGAME ==================== */
    { area:"🏆 POSTGAME", name:"Prepárate para el 100%", emo:"🏆", mons:[382,383,384],
      goal:"Tras el Salón de la Fama se abre casi todo. Desbloquea el Nacional y equípate para cazar legendarios.",
      hl:[
      { cat:"tip", t:"Desbloquea el Pokédex Nacional (primero de todo)", d:"Es requisito para varias evoluciones y para registrar bien la colección.<ol><li>Debes haber <b>visto los ~200 Pokémon de Hoenn</b> (los combates de líderes, Alto Mando y entrenadores completan casi todos los avistamientos).</li><li>Ve al laboratorio del <b>Prof. Abedul</b> en Villa Raíz: te amplía la Pokédex al <b>modo Nacional</b>.</li></ol>", link:L.pokedex },
      { cat:"item", t:"🎒 Kit de cazador de legendarios", d:"Antes de salir, abastécete:<ul><li><b>20+ Ultra Balls</b> y varias <b>Ball Turno</b> (Timer Ball: más eficaz cuantos más turnos pasan).</li><li>Un Pokémon con <b>Falso Tortazo</b> (deja al rival a 1 PS sin debilitarlo) y otro con <b>Hipnosis/Paralizador</b> o Cara Susto para infligir estado.</li><li>Para los <b>errantes</b> (la Lati): un Pokémon con <b>Mal de Ojo</b> o un <b>Wobbuffet</b> (habilidad Sombra Trampa) para que no huyan.</li></ul>", mons:[202] },
      { cat:"tip", t:"Método de captura universal", d:"<b>Guarda SIEMPRE dentro del juego antes de tocar al legendario.</b> Baja sus PS con Falso Tortazo, <b>duérmelo o paralízalo</b>, y lanza Balls con paciencia. En emulador, un <b>save state</b> justo antes de la tirada te deja reintentar hasta capturarlo o sacar buena naturaleza.", link:L.emu }
    ]},
    { area:"🏆 POSTGAME · Eón", name:"Latios y Latias", emo:"💠", mons:[380,381],
      goal:"Consigue uno errando por Hoenn (según el color que elijas) y el otro en la Isla Sur.",
      hl:[
      { cat:"boss", t:"La Lati errante (Nv. 40)", d:"<ol><li>Ve a tu casa de Villa Raíz y <b>mira la televisión</b>: sale una noticia y tu madre/Norman te pregunta por un <b>color</b>.</li><li><b>Azul → Latios</b>; <b>Rojo → Latias</b>. Ese Pokémon empieza a <b>deambular</b> por todo Hoenn.</li><li>Rastréalo con el mapa del <b>PokéNav</b>. Al toparte con él, usa <b>Mal de Ojo</b> o Sombra Trampa (Wobbuffet) para que no escape y captúralo con calma (huye cada turno si no lo atrapas).</li></ol>", mons:[380,381], link:L.leg },
      { cat:"item", t:"El otro Lati con el Ticket Eón (Nv. 50)", d:"<ol><li>Consigue el <b>Ticket Eón</b> (era evento; en emulador se añade con código Gameshark).</li><li>Ve al <b>puerto de Ciudad Portual</b> y embarca hacia la <b>Isla Sur</b>.</li><li>Allí te espera, quieto y fácil, el Latios/Latias que NO deambula.</li></ol>", link:L.tickets }
    ]},
    { area:"🏆 POSTGAME · Torre Celeste", name:"Rayquaza", emo:"🐉", mons:[384],
      goal:"Si no lo capturaste en la historia, vuelve a por él a la cima de la Torre Celeste.",
      hl:[
      { cat:"boss", t:"Rayquaza (Nv. 70)", d:"Tras calmar la crisis de Arrecípolis, Rayquaza <b>vuelve a la cima de la Torre Celeste</b> (este de Pueblo Oromar). Sube con la <b>Mach Bike</b> por los suelos que se agrietan sin frenar. Guarda antes; es de Nv. 70, ten paciencia con las Balls.", mons:[384], link:L.leg }
    ]},
    { area:"🏆 POSTGAME · Cueva Marina", name:"Kyogre", emo:"🌊", mons:[382],
      goal:"Provoca lluvia anómala para que aparezca la Cueva Submarina y captura a Kyogre.",
      hl:[
      { cat:"secret", t:"Cómo forzar su aparición", d:"Kyogre vive en la <b>Cueva Submarina (Marine Cave)</b>, que solo aparece con clima anómalo.<ol><li>Recorre rutas del este/sur hasta ver el aviso de <b>tiempo extraño</b> (lluvia intensa). El <b>meteorólogo de la Casa del Tiempo</b> (Ruta 119) te orienta.</li><li>Ve a esa ruta y busca la nueva entrada surfeando/buceando.</li><li>La ubicación <b>rota</b> entre varias rutas; si sales sin capturarlo, el ciclo se reinicia.</li></ol>" },
      { cat:"boss", t:"Kyogre (Nv. 42)", d:"Recorre el laberinto de agua hasta el fondo. <b>Guarda antes.</b> Falso Tortazo + Sueño y Ball Turno. Con lluvia, su Hidrobomba pega fortísimo: lleva algo resistente al Agua (Planta/Dragón).", mons:[382], link:L.leg }
    ]},
    { area:"🏆 POSTGAME · Cueva Terrestre", name:"Groudon", emo:"🌋", mons:[383],
      goal:"Igual que Kyogre pero con sequía: aparece la Cueva Terrestre.",
      hl:[
      { cat:"secret", t:"Cómo forzar su aparición", d:"Groudon vive en la <b>Cueva Terrestre (Terra Cave)</b>, ligada a clima de <b>sequía/sol abrasador</b>.<ol><li>Recorre rutas hasta ver el aviso de tiempo extraño (sol intenso); confírmalo con el meteorólogo de la Ruta 119.</li><li>Busca la entrada a la cueva en esa ruta.</li><li>Como con Kyogre, la posición rota y se reinicia si sales sin capturarlo.</li></ol>" },
      { cat:"boss", t:"Groudon (Nv. 42)", d:"Cruza la cueva de roca hasta el fondo. <b>Guarda antes.</b> Con sol, sus ataques de Fuego/Tierra son demoledores: lleva Agua/Planta resistente y usa estado + Ball Turno.", mons:[383], link:L.leg }
    ]},
    { area:"🏆 POSTGAME · Cámara Sellada", name:"Desbloquear a los Regis", emo:"🔓", mons:[321,369],
      goal:"Abre la Cámara Sellada para liberar los tres santuarios Regi.",
      hl:[
      { cat:"item", t:"Lo que necesitas antes", d:"MO <b>Buceo</b>, <b>Fuerza</b> y <b>Excavar</b>, más un <b>Wailord</b> (o Wailmer) y un <b>Relicanth</b> en el equipo: son las 'llaves'.", mons:[321,369] },
      { cat:"secret", t:"Abrir la Cámara Sellada (paso a paso)", d:"<ol><li>En la <b>Ruta 134</b> (oeste de Pueblo Oromar) navega por las corrientes hasta el <b>punto de buceo</b>.</li><li><b>Bucea</b> hasta el fondo; encuentra el Braille que indica subir y <b>emerge</b> ahí para entrar en la Cámara Sellada.</li><li>Lee el Braille del norte y usa <b>Excavar</b> para abrir la sala interior.</li><li>Coloca <b>Wailord el 1.º</b> y <b>Relicanth el último</b> del equipo.</li><li>Interactúa con la <b>pared Braille del fondo</b>: la cueva tiembla y los tres santuarios quedan abiertos.</li></ol>", link:L.puzzles }
    ]},
    { area:"🏆 POSTGAME · Santuarios", name:"Los tres Regis", emo:"🗿", mons:[377,378,379],
      goal:"Resuelve cada santuario. Los tres son de Nv. 40 y no tienen género (llévate varias Balls).",
      hl:[
      { cat:"secret", t:"Regirock — Ruinas Desérticas (Ruta 111)", d:"En la cámara, desde el panel central: muévete <b>2 pasos a la IZQUIERDA</b>, luego <b>2 pasos ABAJO</b> y usa <b>Golpe Roca</b> ahí mismo. (En Esmeralda el paso final es Golpe Roca.)", mons:[377] },
      { cat:"secret", t:"Regice — Cueva Ancestral (Ruta 105)", d:"En Esmeralda: <b>da una vuelta COMPLETA a la sala pegado a la pared</b> (recorre todo el perímetro sin cortar por el centro). Al cerrar la vuelta aparece Regice.", mons:[378] },
      { cat:"secret", t:"Registeel — Tumba Ancestral (Ruta 120)", d:"Colócate en el <b>centro EXACTO</b> de la sala (usa el patrón del suelo) y usa <b>Destello</b>. (En Esmeralda es Destello, no Fuerza como en Rubí/Zafiro.)", mons:[379] }
    ]},
    { area:"🏆 POSTGAME · Isla Génesis", name:"Deoxys", emo:"🛸", mons:[386],
      goal:"Con el Ticket Auréola, resuelve el puzzle del triángulo.",
      hl:[
      { cat:"item", t:"Cómo llegar", d:"Consigue el <b>Ticket Auréola</b> (evento; en emulador, código Gameshark) y embarca desde <b>Ciudad Portual</b> hacia la <b>Isla Génesis (Birth Island)</b>.", link:L.tickets },
      { cat:"secret", t:"El puzzle del triángulo", d:"Verás un triángulo negro en el centro. Al tocarlo se teletransporta al lado <b>opuesto</b> a tu movimiento; debes ir acorralándolo hasta dejarlo en el centro (~10 toques). <ol><li>Avanza hacia él y pulsa A; repite persiguiendo el clon reducido.</li><li>Si te pierdes, <b>sal y vuelve a entrar</b> en la isla para reiniciarlo.</li><li>Cuando el triángulo quede quieto en el centro, tócalo: aparece <b>Deoxys (Nv. 30)</b>, en su forma <b>Velocidad</b>.</li></ol> La secuencia exacta paso a paso está en la guía.", mons:[386], link:L.puzzles }
    ]},
    { area:"🏆 POSTGAME · Isla Lejana", name:"Mew", emo:"🐱", mons:[151],
      goal:"Con la Carta Naval Vieja, acorrala a Mew en la hierba.",
      hl:[
      { cat:"item", t:"Cómo llegar", d:"Consigue la <b>Carta Naval Vieja (Old Sea Map)</b> (evento; en emulador, código Gameshark) y navega desde <b>Ciudad Portual</b> a la <b>Isla Lejana (Faraway Island)</b>.", link:L.tickets },
      { cat:"secret", t:"La persecución de Mew", d:"Cruza el tronco hasta la hierba alta. Mew se esconde y <b>huye</b> al acercarte. Muévete despacio y ve <b>acorralándolo contra un borde</b>; al alcanzarlo entra el combate contra <b>Mew (Nv. 30)</b>. Guarda antes.", mons:[151], link:L.leg }
    ]},
    { area:"🏆 POSTGAME · Roca Ombligo", name:"Ho-Oh y Lugia", emo:"🌈", mons:[250,249],
      goal:"Con el Ticket Místico, captura a los dos: uno arriba y otro abajo.",
      hl:[
      { cat:"item", t:"Cómo llegar", d:"Consigue el <b>Ticket Místico</b> (evento; en emulador, código Gameshark) y embarca desde <b>Ciudad Portual</b> a la <b>Roca Ombligo (Navel Rock)</b>.", link:L.tickets },
      { cat:"boss", t:"Ho-Oh (arriba) y Lugia (abajo) — Nv. 70", d:"Dentro, un camino sube a <b>Ho-Oh</b> y otro baja a <b>Lugia</b>. Ambos de Nv. 70: <b>guarda antes</b> de cada uno, usa estado + Ball Turno y ten paciencia. Puedes capturar los dos en la misma visita.", mons:[250,249], link:L.leg }
    ]},
    { area:"🏆 POSTGAME · Evento", name:"Jirachi (y Deoxys de Colosseum)", emo:"⭐", mons:[385],
      goal:"Completar la colección de 386 requiere este de evento externo.",
      hl:[
      { cat:"item", t:"Jirachi no sale en la partida", d:"Venía del <b>disco extra de Pokémon Colosseum</b>. Para el 386 de colección, en emulador se obtiene con <b>editor de guardado (PKHeX)</b> o con la distribución del bonus disc emulada. Sin él no se cierra la Pokédex Nacional.", mons:[385], link:L.pokedex }
    ]},
    { area:"🏆 POSTGAME · Ruta 119", name:"Feebas → Milotic", emo:"🐟", mons:[349,350],
      goal:"Encuentra Feebas en sus 6 casillas y evolúcialo maximizando la Belleza.",
      hl:[
      { cat:"secret", t:"Encontrar a Feebas (lo más esquivo)", d:"<ol><li>Ve a la <b>Ruta 119</b> (zona de agua junto a la Casa del Tiempo).</li><li>Feebas vive solo en <b>6 de las ~400 casillas</b> de agua. Pesca <b>casilla por casilla</b> con cualquier caña (¡vale la Vieja!).</li><li>Las casillas dependen de la <b>frase de moda de Azuliza</b>: si cambias la frase (hablando con el chico moderno de Dewford), <b>cambian las casillas</b>.</li><li>Cuando piques un Feebas, esa es una de las 6: quédate ahí y captura varios.</li></ol>", mons:[349], link:L.feebas },
      { cat:"secret", t:"Evolucionar a Milotic", d:"Feebas evoluciona al <b>subir de nivel con la Belleza al máximo</b>:<ol><li>Cocina <b>Pokoblocks azules</b> (bayas secas/azules) que suben <b>Belleza</b>.</li><li>Dáselos a Feebas hasta llenar su barra de Belleza (una naturaleza que no reduzca ese sabor ayuda).</li><li>Con la Belleza al máximo, <b>sube 1 nivel</b> (un Caramelo Raro o un combate) → <b>Milotic</b>.</li></ol>", mons:[350], link:L.concursos }
    ]},
    { area:"🏆 POSTGAME · Colección", name:"Completar la Pokédex Nacional", emo:"📕", mons:[386,151,385],
      goal:"Cierra los 386. Sin intercambios es imposible: planifícalo.",
      hl:[
      { cat:"tip", t:"Qué te faltará y cómo conseguirlo", d:"<ul><li><b>Iniciales</b>: solo tienes 1 de 3 → cría copias e intercámbialas.</li><li><b>Exclusivos de versión</b> y líneas de <b>Kanto/Johto</b> → intercambio con Rubí/Zafiro/Rojo Fuego/Verde Hoja.</li><li><b>Evoluciones por intercambio</b>: Kadabra→Alakazam, Machoke→Machamp, Graveler→Golem, Haunter→Gengar, etc.</li></ul>", link:L.pokedex },
      { cat:"tip", t:"Intercambiar tú solo en emulador", d:"Abre <b>dos instancias</b> de mGBA (o multiplayer), ambas con el <b>Nacional</b> desbloqueado, y usa el <b>Club de Intercambio</b> (2.ª planta del Centro Pokémon). Alternativa de colección: inyectar con <b>PKHeX</b>.", link:L.emu }
    ]},
    { area:"🏆 POSTGAME · El gran reto", name:"Frontera de Batalla", emo:"⚔️", mons:[376,373,350],
      goal:"Gana los 14 símbolos (plata y oro) de las 7 instalaciones.",
      hl:[
      { cat:"boss", t:"Las 7 instalaciones y sus Cerebros", d:"<ul><li>🗼 <b>Torre</b> (Anabel) · combates 3vs3 clásicos.</li><li>🏛️ <b>Cúpula</b> (Tucker) · torneo, ves al rival antes.</li><li>🏯 <b>Palacio</b> (Spenser) · no das órdenes: mandan las naturalezas.</li><li>🥊 <b>Arena</b> (Greta) · combates de 3 turnos.</li><li>🏭 <b>Fábrica</b> (Noland) · Pokémon de alquiler.</li><li>🐍 <b>Ruleta</b> (Lucy) · puertas al azar.</li><li>🔺 <b>Pirámide</b> (Brandon) · pisos a oscuras.</li></ul> Cada una da <b>símbolo de plata</b> (1.ª victoria) y <b>de oro</b> (2.ª, mucho más difícil).", mons:[376,373], link:L.frontera },
      { cat:"item", t:"Puntos de Combate (PC/BP)", d:"Ganas PC que canjeas por <b>vitaminas, MTs, objetos de fuerza (para EVs) y tutores</b>. Es la mejor fuente de material competitivo: prepara un buen equipo (Metagross, Salamence, Milotic…) antes de ir en serio.", link:L.cria }
    ]},
    { area:"🏆 POSTGAME · Concursos", name:"Rango Maestro en las 5 categorías", emo:"🎀", mons:[350],
      goal:"Gana el Rango Maestro de Belleza, Hermosura, Dulzura, Ingenio y Dureza.",
      hl:[
      { cat:"secret", t:"Cómo dominarlos", d:"<ol><li>Cocina <b>Pokoblocks</b> del sabor de cada categoría (mejor en multijugador, salen de más calidad).</li><li>Sube el atributo del Pokémon sin pasarte del máximo y enséñale movimientos que <b>encadenen combos</b> en escena.</li><li>Sube de rango: <b>Normal → Súper → Hiper → Maestro</b> en las 5 categorías.</li></ol> Ganar los 5 Maestros te da un <b>retrato</b> en el museo de Lilycove.", mons:[350], link:L.concursos }
    ]},
    { area:"🏆 POSTGAME · Rincones ocultos", name:"Áreas secretas restantes", emo:"🗺️", mons:[235,360],
      goal:"Visita las zonas que casi nadie encuentra para no dejarte nada.",
      hl:[
      { cat:"secret", t:"🌴 Isla Espejismo (Mirage Island)", d:"Frente a la Ruta 130. Solo aparece los días en que un <b>valor aleatorio diario</b> coincide con el valor oculto de un Pokémon de tu equipo (rarísimo). Pregunta al <b>anciano de Pueblo Oromar</b> si hoy es visible. Dentro: <b>Wynaut</b> salvajes y bayas raras.", mons:[360] },
      { cat:"secret", t:"🎨 Cueva Artesana (Artisan Cave)", d:"Cerca de la Frontera de Batalla. Llena de <b>Smeargle</b> (aprende cualquier movimiento con Esquema) y minerales.", mons:[235] },
      { cat:"secret", t:"🦴 Pasadizo Desértico (Desert Underpass)", d:"Bajo la casa del Maníaco de los Fósiles (Ruta 114). Tras completar el <b>Pokédex Nacional</b>, aquí reaparece el <b>fósil que NO elegiste</b> en la Torre Espejismo: así consigues ambos.", link:L.islas },
      { cat:"secret", t:"🏟️ Monte Batalla / Trainer Hill", d:"Cerca de Pueblo Verdegal: retos de combate en cadena por premios. Parte del contenido dependía del <b>e-Reader</b>; el acceso básico sigue disponible.", link:L.islas }
    ]},
    { area:"🏆 POSTGAME · Perfección", name:"Cría, EVs e IVs (competitivo)", emo:"🥚", mons:[374],
      goal:"Opcional: crea el equipo perfecto para dominar la Frontera.",
      hl:[
      { cat:"tip", t:"Lo esencial", d:"<ul><li><b>Cría</b> en la Guardería (Ruta 117): naturaleza heredable con <b>Piedra Eterna</b>, movimientos huevo del padre.</li><li><b>EVs</b>: máx. 510 (252 por stat útil). Acelera con <b>vitaminas</b> y objetos de la Frontera.</li><li><b>IVs</b> (0–31): aleatorios; para estacionarios haz <b>soft reset</b> (A+B+Start+Select) hasta buena naturaleza/IVs.</li></ul>", mons:[374], link:L.cria }
    ]},
    { area:"🏆 ¡100% COMPLETADO!", name:"Lo tienes todo", emo:"🎉", mons:[386,151,385,382,384],
      goal:"Pokédex Nacional + todos los legendarios + Liga + 14 símbolos + 5 concursos Maestro.",
      hl:[
      { cat:"tip", t:"¡Enhorabuena, entrenador!", d:"Si has marcado todo esto tienes uno de los saves más completos posibles de Pokémon Esmeralda. <b>Haz una copia de seguridad de tu <code>.sav</code></b> y presume de colección. 🏆", mons:[386,151,385] },
      { cat:"item", t:"Repaso final del 100%", d:"Comprueba en la guía de referencia la <b>checklist maestra</b> por si queda alguna casilla suelta (símbolos dorados, algún legendario, algún concurso).", link:{ t:"Checklist maestra", href:"index.html#checklist" } }
    ]}
  ];

  /* ---------------- Estado ---------------- */
  var K_CUR = "esmeralda_wt_current";
  var K_FILTER = "esmeralda_wt_filter";
  var current = parseInt(localStorage.getItem(K_CUR) || "0", 10) || 0;
  var filter = localStorage.getItem(K_FILTER) || "all";
  if (current >= STOPS.length) current = 0;

  /* ---------------- Sprite HTML ---------------- */
  function spriteHTML(id, sm) {
    var nm = NAME[id] || (window.EVOS && window.EVOS[id] ? window.EVOS[id].n : "#" + id);
    return '<span class="wt-sprite' + (sm ? ' wt-sprite--sm' : '') +
      '" data-evo="' + id + '" title="' + nm + ' · ver evolución"><img src="' + SPRITE(id) + '" alt="' + nm +
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
    if (e.target.closest("[data-evo]")) return;   // los sprites abren la ficha de evolución (evoview.js)
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
