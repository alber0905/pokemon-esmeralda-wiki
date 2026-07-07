/* =====================================================================
   Compañera de juego — Gen 5 (Teselia / Unova · Negro 2 / Blanco 2)
   Datos de la ruta + interacción
   ===================================================================== */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var SPRITE = function (id) {
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/" + id + ".png";
  };

  var NAME = {
  "28": "Sandslash",
  "35": "Clefairy",
  "54": "Psyduck",
  "55": "Golduck",
  "81": "Magnemite",
  "88": "Grimer",
  "109": "Koffing",
  "131": "Lapras",
  "132": "Ditto",
  "133": "Eevee",
  "147": "Dratini",
  "180": "Flaaffy",
  "183": "Marill",
  "221": "Piloswine",
  "226": "Mantine",
  "227": "Skarmory",
  "298": "Azurill",
  "306": "Aggron",
  "320": "Wailmer",
  "321": "Wailord",
  "326": "Grumpig",
  "328": "Trapinch",
  "329": "Vibrava",
  "330": "Flygon",
  "335": "Zangoose",
  "336": "Seviper",
  "350": "Milotic",
  "377": "Regirock",
  "378": "Regice",
  "379": "Registeel",
  "380": "Latias",
  "381": "Latios",
  "442": "Spiritomb",
  "443": "Gible",
  "445": "Garchomp",
  "447": "Riolu",
  "448": "Lucario",
  "465": "Tangrowth",
  "468": "Togekiss",
  "471": "Glaceon",
  "480": "Uxie",
  "481": "Mesprit",
  "482": "Azelf",
  "485": "Heatran",
  "486": "Regigigas",
  "488": "Cresselia",
  "494": "Victini",
  "495": "Snivy",
  "496": "Servine",
  "497": "Serperior",
  "498": "Tepig",
  "499": "Pignite",
  "500": "Emboar",
  "501": "Oshawott",
  "502": "Dewott",
  "503": "Samurott",
  "504": "Patrat",
  "506": "Lillipup",
  "507": "Herdier",
  "508": "Stoutland",
  "509": "Purrloin",
  "510": "Liepard",
  "511": "Pansage",
  "513": "Pansear",
  "515": "Panpour",
  "519": "Pidove",
  "520": "Tranquill",
  "522": "Blitzle",
  "523": "Zebstrika",
  "524": "Roggenrola",
  "525": "Boldore",
  "527": "Woobat",
  "528": "Swoobat",
  "529": "Drilbur",
  "530": "Excadrill",
  "533": "Gurdurr",
  "534": "Conkeldurr",
  "540": "Sewaddle",
  "541": "Swadloon",
  "542": "Leavanny",
  "544": "Whirlipede",
  "551": "Sandile",
  "552": "Krokorok",
  "554": "Darumaka",
  "555": "Darmanitan",
  "556": "Maractus",
  "557": "Dwebble",
  "561": "Sigilyph",
  "562": "Yamask",
  "564": "Tirtouga",
  "565": "Carracosta",
  "566": "Archen",
  "567": "Archeops",
  "568": "Trubbish",
  "570": "Zorua",
  "576": "Gothitelle",
  "580": "Ducklett",
  "581": "Swanna",
  "582": "Vanillite",
  "585": "Deerling",
  "587": "Emolga",
  "588": "Karrablast",
  "590": "Foongus",
  "592": "Frillish",
  "593": "Jellicent",
  "594": "Alomomola",
  "595": "Joltik",
  "596": "Galvantula",
  "597": "Ferroseed",
  "599": "Klink",
  "602": "Tynamo",
  "603": "Eelektrik",
  "604": "Eelektross",
  "605": "Elgyem",
  "607": "Litwick",
  "609": "Chandelure",
  "610": "Axew",
  "611": "Fraxure",
  "612": "Haxorus",
  "613": "Cubchoo",
  "614": "Beartic",
  "615": "Cryogonal",
  "619": "Mienfoo",
  "620": "Mienshao",
  "621": "Druddigon",
  "622": "Golett",
  "623": "Golurk",
  "625": "Bisharp",
  "626": "Bouffalant",
  "631": "Heatmor",
  "633": "Deino",
  "634": "Zweilous",
  "635": "Hydreigon",
  "637": "Volcarona",
  "638": "Cobalion",
  "639": "Terrakion",
  "640": "Virizion",
  "641": "Tornadus",
  "642": "Thundurus",
  "643": "Reshiram",
  "644": "Zekrom",
  "645": "Landorus",
  "646": "Kyurem",
  "647": "Keldeo",
  "648": "Meloetta",
  "649": "Genesect"
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

  // Mapa de secciones de la guía de referencia (index.html de la gen 5)
  var L = {
    gimnasios:   { t:"Todos los gimnasios",       href:"index.html#gimnasios" },
    liga:        { t:"Alto Mando y Campeona",     href:"index.html#liga" },
    legendarios: { t:"Legendarios",               href:"index.html#legendarios" },
    secretos:    { t:"Secretos y curiosidades",   href:"index.html#secretos" },
    pokedex:     { t:"Completar la Pokédex",       href:"index.html#pokedex" },
    emulador:    { t:"Emulador y trucos",          href:"index.html#emulador" }
  };

  // Datos de origen (formato JSON de la guía). Se transforman a STOPS abajo.
  var routeStops = [
  {
    "area": "Ciudad de inicio",
    "name": "Ciudad Engobe (Aspertia City)",
    "emoji": "🏙️",
    "goal": "Elige inicial, consigue la Pokédex y derrota a Cheren en el 1er gimnasio.",
    "gym": "Medalla Base",
    "mons": [
      495,
      498,
      501,
      504,
      506
    ],
    "highlights": [
      {
        "cat": "tip",
        "t": "Tu inicial",
        "d": "Bel (Bianca) te da a elegir: <b>Snivy</b> (Planta), <b>Tepig</b> (Fuego) u <b>Oshawott</b> (Agua). Todos completan el juego bien; Oshawott lo tiene algo más fácil en los primeros gimnasios.",
        "link": "",
        "mons": [
          495,
          498,
          501
        ]
      },
      {
        "cat": "missable",
        "t": "Elección única (irreversible)",
        "d": "Solo obtienes <b>un inicial por partida</b>: los otros dos requieren intercambio (o PKHeX en emulador). Elige con calma; más adelante te regalarán otros Pokémon (el Zorua de N, un Eevee...), pero iniciales solo hay uno.",
        "link": "emulador",
        "mons": []
      },
      {
        "cat": "boss",
        "t": "Gimnasio 1: Cheren",
        "d": "Tipo Normal, en la Escuela de Entrenadores. Patrat Nv.11 y <b>Lillipup Nv.13</b>. Golpes fuertes o un tipo Lucha bastan; no le dejes acumular Avivar. Da <b>MT83 Avivar</b> y la Medalla Base.",
        "link": "gimnasios",
        "mons": [
          504,
          506
        ]
      },
      {
        "cat": "item",
        "t": "Mirador y Pokédex",
        "d": "Sube al <b>mirador</b> de la ciudad: allí Bel te entrega la <b>Pokédex</b> (con su Lista de Hábitats). Tu madre te dará el resto del equipo básico. Habla con todos antes de salir.",
        "link": "",
        "mons": []
      }
    ]
  },
  {
    "area": "Rutas 19-20",
    "name": "Pueblo Ocre y Rancho Ocre (Floccesy)",
    "emoji": "🌾",
    "goal": "Primeras capturas, conoce a Mirto, echa al Equipo Plasma del rancho y estrena los claros ocultos.",
    "gym": "",
    "mons": [
      509,
      519,
      447,
      298,
      54
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "Riolu (raro, ¡no lo dejes pasar!)",
        "d": "El <b>claro oculto</b> del rancho puede contener a <b>Riolu</b> (a veces con Habilidad Oculta), capturable muy pronto. Si está vacío, camina unos cientos de pasos y vuelve a mirar: el contenido se regenera.",
        "link": "secretos",
        "mons": [
          447
        ]
      },
      {
        "cat": "catch",
        "t": "Fauna temprana",
        "d": "Purrloin, Pidove, Psyduck, Azurill, Mareep... Buen momento para formar un equipo variado antes de Hiedra. Bel te enseña a capturar en la Ruta 19.",
        "link": "",
        "mons": [
          509,
          519,
          54,
          298
        ]
      },
      {
        "cat": "boss",
        "t": "Equipo Plasma en el rancho",
        "d": "Con tu rival Hugh, ayudas a recuperar al Herdier perdido y os cruzáis con un recluta de Plasma. Combate sencillo pero deja buena experiencia.",
        "link": "",
        "mons": []
      },
      {
        "cat": "tip",
        "t": "Mirto, el excampeón",
        "d": "En Pueblo Ocre vive <b>Mirto</b> (Alder), excampeón de Teselia: te acompaña un rato y te da consejos. En el postgame podrás retarlo en su casa; y al norte del pueblo está la <b>Arboleda Promesa</b> del evento de Keldeo.",
        "link": "legendarios",
        "mons": []
      }
    ]
  },
  {
    "area": "Ciudad costera",
    "name": "Ciudad Hormigón (Virbank City)",
    "emoji": "🎬",
    "goal": "Explora el Complejo Hormigón, vence a Hiedra y debuta en Pokéwood antes de zarpar.",
    "gym": "Medalla Ponzoña",
    "mons": [
      81,
      88,
      568,
      109,
      544
    ],
    "highlights": [
      {
        "cat": "boss",
        "t": "Gimnasio 2: Hiedra (Roxie)",
        "d": "Tipo Veneno. Koffing Nv.16 y <b>Whirlipede Nv.18</b>. Lleva <b>Psíquico o Tierra</b>. Da <b>MT09 Carga Tóxica</b> y la Medalla Ponzoña.",
        "link": "gimnasios",
        "mons": [
          109,
          544
        ]
      },
      {
        "cat": "catch",
        "t": "Complejo Hormigón",
        "d": "Zona industrial con Magnemite, Grimer, Koffing y Trubbish; niveles algo más altos, útil para subir rápido antes del gimnasio.",
        "link": "",
        "mons": [
          81,
          88,
          109,
          568
        ]
      },
      {
        "cat": "secret",
        "t": "Pokéwood",
        "d": "El estudio de cine de Teselia (visita obligada de la historia tras la medalla): ruedas películas con tu equipo contra atrezo. Rejugable, da objetos y es exclusivo de esta gen.",
        "link": "secretos",
        "mons": []
      }
    ]
  },
  {
    "area": "Gran ciudad",
    "name": "Ciudad Porcelana (Castelia City)",
    "emoji": "🌆",
    "goal": "Recorre las cloacas con Hugh y vence a Camus en el 3er gimnasio.",
    "gym": "Medalla Élitro",
    "mons": [
      542,
      557,
      88,
      133
    ],
    "highlights": [
      {
        "cat": "boss",
        "t": "Gimnasio 3: Camus (Burgh)",
        "d": "Tipo Bicho. Swadloon y Dwebble Nv.22 y <b>Leavanny Nv.24</b>. El <b>Fuego</b> lo arrasa; Volador también, salvo a Dwebble (Bicho/Roca). Da <b>MT76 Estoicismo</b> y la Medalla Élitro.",
        "link": "gimnasios",
        "mons": [
          542,
          557
        ]
      },
      {
        "cat": "catch",
        "t": "Cloacas de Ciudad Porcelana",
        "d": "El Equipo Plasma acecha aquí y lo recorres con Hugh. Encuentras Grimer, Rattata y Zubat, más objetos escondidos por los rincones; algunas zonas cambian según la estación.",
        "link": "",
        "mons": [
          88
        ]
      },
      {
        "cat": "tip",
        "t": "Apunta para el postgame: Eevee",
        "d": "Tras entrar en el Salón de la Fama, <b>Amanita</b> te regala un <b>Eevee con Habilidad Oculta</b> en el edificio de las medallas y el tasanombres. En esta ciudad también está el <b>Café Sonata</b>, donde Meloetta aprende Canto Arcaico.",
        "link": "secretos",
        "mons": [
          133
        ]
      }
    ]
  },
  {
    "area": "Ruta 4 y desierto",
    "name": "Zona Desierto y Castillo Ancestral",
    "emoji": "🏜️",
    "goal": "Captura fauna del desierto y anota el Castillo Ancestral para el postgame.",
    "gym": "",
    "mons": [
      551,
      554,
      556,
      561,
      562
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "Joyas del desierto",
        "d": "Sandile, Darumaka, Maractus, Sigilyph, Trapinch y Yamask. Sandile y Darumaka son grandes fichajes de equipo.",
        "link": "",
        "mons": [
          551,
          554,
          556,
          561,
          562,
          328
        ]
      },
      {
        "cat": "missable",
        "t": "Castillo Ancestral (nota para luego)",
        "d": "En su sala más profunda espera <b>Volcarona Nv.35</b>. En N2/B2 la entrada del desierto está cegada por la arena: se llega en el postgame por el <b>Pasadizo Ancestral</b> (desde el PWT). Recuerda volver: es de los mejores atacantes especiales.",
        "link": "legendarios",
        "mons": [
          637
        ]
      },
      {
        "cat": "tip",
        "t": "Avenida Unión (Join Avenue)",
        "d": "De camino a Ciudad Mayólica cruzas la <b>Avenida Unión</b>: tu propia galería de tiendas gestionada por visitantes. Cuanto más la desarrolles, mejores recompensas (objetos, niveles, bayas).",
        "link": "secretos",
        "mons": []
      }
    ]
  },
  {
    "area": "Ciudad de ocio",
    "name": "Ciudad Mayólica (Nimbasa City)",
    "emoji": "🎡",
    "goal": "Recorre el parque de atracciones y derrota a Camila.",
    "gym": "Medalla Voltio",
    "mons": [
      587,
      180,
      522,
      523
    ],
    "highlights": [
      {
        "cat": "boss",
        "t": "Gimnasio 4: Camila (Elesa)",
        "d": "Tipo Eléctrico, en la pasarela de moda. Emolga Nv.28 (inmune a Tierra), Flaaffy Nv.28 y <b>Zebstrika Nv.30</b>. Lleva <b>Roca/Hielo</b> para Emolga y Tierra para el resto. Da <b>MT72 Voltiocambio</b> y la Medalla Voltio.",
        "link": "gimnasios",
        "mons": [
          587,
          180,
          523
        ]
      },
      {
        "cat": "secret",
        "t": "Metro Batalla y Anville Town",
        "d": "En la estación de Ciudad Mayólica está el <b>Metro Batalla</b> (rachas de combates por BP, gran reto de postgame) y el tren a <b>Anville Town</b>, un pueblecito ferroviario con objetos raros los fines de semana.",
        "link": "secretos",
        "mons": []
      },
      {
        "cat": "catch",
        "t": "Blitzle",
        "d": "Blitzle ronda las rutas cercanas: un Zebstrika propio es velocidad y potencia eléctrica temprana.",
        "link": "",
        "mons": [
          522
        ]
      }
    ]
  },
  {
    "area": "Ruta 5 y puente",
    "name": "Ruta 5 y el puente levadizo de Ciudad Fayenza",
    "emoji": "🌉",
    "goal": "Avanza hacia Ciudad Fayenza; Bel te enseña el primer claro oculto en la Ruta 5.",
    "gym": "",
    "mons": [
      580,
      510
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "Ducklett y Liepard",
        "d": "Ducklett (Agua/Volador) aparece en las sombras que sobrevuelan el puente; buen porteador de MO y atacante de Vendaval a futuro.",
        "link": "",
        "mons": [
          580,
          510
        ]
      },
      {
        "cat": "secret",
        "t": "Tu primer claro oculto",
        "d": "En la Ruta 5, <b>Bel te enseña los claros ocultos</b>: huecos entre árboles con objetos o Pokémon con Habilidad Oculta. Su contenido se regenera al caminar: revísalos siempre que pases.",
        "link": "secretos",
        "mons": []
      },
      {
        "cat": "tip",
        "t": "Entrenadores en fila",
        "d": "El puente y la ruta están llenos de entrenadores (¡y artistas!): aprovecha para nivelar antes del duro gimnasio de Yakón.",
        "link": "",
        "mons": []
      }
    ]
  },
  {
    "area": "Ciudad mercado",
    "name": "Ciudad Fayenza (Driftveil City)",
    "emoji": "⛏️",
    "goal": "Vence a Yakón, estrena el PWT en el torneo de la ciudad y recibe el Zorua de N.",
    "gym": "Medalla Temblor",
    "mons": [
      552,
      28,
      530,
      570
    ],
    "highlights": [
      {
        "cat": "boss",
        "t": "Gimnasio 5: Yakón (Clay)",
        "d": "Tipo Tierra. Krokorok y Sandslash Nv.31 y <b>Excadrill Nv.33</b> (Tierra/Acero, muy rápido). Lleva <b>Agua/Planta/Lucha</b>. Da <b>MT78 Terratemblor</b> y la Medalla Temblor.",
        "link": "gimnasios",
        "mons": [
          552,
          28,
          530
        ]
      },
      {
        "cat": "secret",
        "t": "Torneo Mundial Pokémon (PWT)",
        "d": "El <b>PWT</b> se estrena aquí con el torneo de Fayenza (contra Hugh y Cheren). En el postgame ofrece torneos contra líderes y campeones de todas las regiones. Bajo el recinto se abre el <b>Pasadizo Ancestral</b>.",
        "link": "secretos",
        "mons": []
      },
      {
        "cat": "item",
        "t": "El Zorua de N (regalo)",
        "d": "Un antiguo sabio del Equipo Plasma te entrega en la ciudad el <b>Zorua de N (Nv.25)</b>, imposible de capturar en estado salvaje. Después, Hugh y tú asaltáis la <b>Fragata Plasma</b> del puerto.",
        "link": "secretos",
        "mons": [
          570
        ]
      }
    ]
  },
  {
    "area": "Ruta 6 y cueva",
    "name": "Ruta 6 y Cueva Loza (Mistralton Cave)",
    "emoji": "🕳️",
    "goal": "Sube por la Ruta 6 hacia la Cueva Electrorroca; la Cueva Loza queda para cuando tengas Surf.",
    "gym": "",
    "mons": [
      585,
      588,
      590,
      610
    ],
    "highlights": [
      {
        "cat": "tip",
        "t": "Los espadachines, durante la historia",
        "d": "A diferencia de Negro/Blanco 1, los <b>tres espadachines</b> se capturan <b>ya durante la aventura</b>: <b>Cobalion Nv.45</b> en la Ruta 13, <b>Virizion Nv.45</b> en la Ruta 11 y <b>Terrakion Nv.45</b> en la Ruta 22. Si los debilitas, vuelven a Nv.65 tras la Liga.",
        "link": "legendarios",
        "mons": [
          638,
          640,
          639
        ]
      },
      {
        "cat": "catch",
        "t": "Fauna de la Ruta 6 y regalo",
        "d": "Deerling (cambia de color con la estación), Karrablast y Foongus (¡ojo, se disfraza de Poké Ball!). En el laboratorio de las estaciones te regalarán más adelante un <b>Deerling con Habilidad Oculta</b> (tras la Pokédex Nacional).",
        "link": "",
        "mons": [
          585,
          588,
          590
        ]
      },
      {
        "cat": "secret",
        "t": "Cueva Loza (vuelve con Surf)",
        "d": "Al oeste de la Ruta 6, cruzando el agua, está la <b>Cueva Loza</b>: guarida de <b>Axew</b> (futuro Haxorus) y objetos escondidos entre rocas con Fuerza. En Negro/Blanco vivía aquí Cobalion; en N2/B2 solo queda su cámara.",
        "link": "",
        "mons": [
          610
        ]
      }
    ]
  },
  {
    "area": "Cueva imán",
    "name": "Chargestone Cave (Cueva Electrorroca)",
    "emoji": "⚡",
    "goal": "Atraviesa la cueva de imanes y captura bichos eléctricos únicos.",
    "gym": "",
    "mons": [
      595,
      596,
      597,
      599,
      602
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "Nido de tipos raros",
        "d": "<b>Joltik, Ferroseed, Klink y Tynamo</b> solo abundan aquí. Joltik→Galvantula y Klink→Klinklang son grandes fichajes.",
        "link": "",
        "mons": [
          595,
          596,
          597,
          599,
          602
        ]
      },
      {
        "cat": "tip",
        "t": "Acromo y los imanes",
        "d": "El científico <b>Acromo (Colress)</b> aparece por la historia y te reta. Mueve las rocas imán para abrir paso y descubrir objetos ocultos.",
        "link": "",
        "mons": []
      },
      {
        "cat": "secret",
        "t": "Evoluciona a Magneton",
        "d": "Si subes de nivel a Magneton/Nosepass dentro de esta cueva, evolucionan a <b>Magnezone/Probopass</b>. Recuerda el truco.",
        "link": "secretos",
        "mons": [
          81
        ]
      }
    ]
  },
  {
    "area": "Ciudad aeropuerto",
    "name": "Ciudad Loza (Mistralton City)",
    "emoji": "✈️",
    "goal": "Sube la Torre de los Cielos y vence a Gerania.",
    "gym": "Medalla Jet",
    "mons": [
      528,
      227,
      581,
      607,
      605
    ],
    "highlights": [
      {
        "cat": "boss",
        "t": "Gimnasio 6: Gerania (Skyla)",
        "d": "Tipo Volador. Swoobat y Skarmory Nv.37 y <b>Swanna Nv.39</b>. Lleva un <b>Eléctrico fuerte</b> (x4 a Swanna) y Fuego para Skarmory. Da <b>MT62 Acróbata</b> y la Medalla Jet.",
        "link": "gimnasios",
        "mons": [
          227,
          581
        ]
      },
      {
        "cat": "catch",
        "t": "Torre de los Cielos (Ruta 7)",
        "d": "Torre-cementerio con <b>Litwick y Elgyem</b>, difíciles de ver en otros sitios. En la cima puedes tocar la campana; en el postgame ahí arriba aparece <b>Mesprit</b>.",
        "link": "secretos",
        "mons": [
          607,
          605
        ]
      }
    ]
  },
  {
    "area": "Rumbo al este",
    "name": "Vuelo a Pueblo Chamota (Lentimas Town)",
    "emoji": "🛩️",
    "goal": "Gerania te lleva en su avión al este de Teselia; el oeste queda para el postgame.",
    "gym": "",
    "mons": [
      564,
      566
    ],
    "highlights": [
      {
        "cat": "tip",
        "t": "El avión de Gerania",
        "d": "Tras la 6ª medalla NO se sigue a pie: <b>Gerania te lleva en avión a Pueblo Chamota</b>. La Ruta 7 hacia el norte (Monte Tuerca, Ciudad Teja, Torre Duodraco) está cerrada hasta el postgame.",
        "link": "",
        "mons": []
      },
      {
        "cat": "missable",
        "t": "Fósil a elegir (elección única, postgame)",
        "d": "Cuando se abra el oeste, <b>Aloe</b> te dará en el <b>museo de Ciudad Esmalte</b> un solo fósil: <b>Cubierta</b> (→Tirtouga/Carracosta) o <b>Pluma</b> (→Archen/Archeops). Es <b>irreversible</b>: para el otro, intercambio o PKHeX. En el <b>Monte Tuerca</b>, un obrero regala además un fósil clásico al día.",
        "link": "emulador",
        "mons": [
          564,
          566
        ]
      }
    ]
  },
  {
    "area": "Pueblo volcánico",
    "name": "Pueblo Chamota y Montaña Reversia",
    "emoji": "🌋",
    "goal": "Atraviesa el volcán dormido hacia Pueblo Arenisca y visita la Villa Horroris.",
    "gym": "",
    "mons": [
      328,
      329,
      330,
      326,
      227
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "Montaña Reversia",
        "d": "Volcán dormido con <b>Trapinch, Grumpig (Spoink), Skorupi, Drifblim y Skarmory</b>. Trapinch→Flygon es un pseudodragón excelente. Aquí dormirá <b>Heatran</b> en el postgame (con la Piedra Magma de la Ruta 18).",
        "link": "legendarios",
        "mons": [
          328,
          329,
          330,
          326
        ]
      },
      {
        "cat": "secret",
        "t": "Villa Horroris (Strange House)",
        "d": "Casa embrujada con puzle de muñecas y muebles que se mueven, en el desvío de la montaña. Al resolverla, una chica te da la <b>Pluma Lunar</b>: guárdala, sirve para que aparezca <b>Cresselia</b> en el Puente Progreso (postgame).",
        "link": "secretos",
        "mons": []
      },
      {
        "cat": "tip",
        "t": "Tutor de movimientos",
        "d": "En Pueblo Chamota hay un <b>tutor de movimientos</b> que enseña ataques a cambio de <b>fragmentos</b> de colores (hay otros en Ciudad Fayenza, Ciudad Marga y Ciudad Esmalte). No vendas tus fragmentos.",
        "link": "secretos",
        "mons": []
      }
    ]
  },
  {
    "area": "Pueblo playero",
    "name": "Pueblo Arenisca (Undella Town)",
    "emoji": "🏖️",
    "goal": "Descansa en la playa y anota la villa de Catleya (y su invitada Cintia) para el postgame.",
    "gym": "",
    "mons": [
      592,
      593,
      594,
      320,
      321
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "Bahía Arenisca",
        "d": "Surfeando aparecen Frillish, Alomomola y Wailmer; en el postgame la bahía se llena de rarezas y desde aquí sale el <b>Acuatúnel</b> hacia Ciudad Marga.",
        "link": "",
        "mons": [
          592,
          593,
          594,
          320
        ]
      },
      {
        "cat": "missable",
        "t": "Cintia en la villa de Catleya",
        "d": "En el postgame, la excampeona de Sinnoh <b>Cintia</b> visita la villa y combate <b>solo en primavera</b>: Spiritomb, Milotic, Togekiss, Lucario y Glaceon Nv.76 y <b>Garchomp Nv.78</b>. El duelo opcional más duro del juego.",
        "link": "secretos",
        "mons": [
          445
        ]
      }
    ]
  },
  {
    "area": "Pueblo de la leyenda",
    "name": "Ruta 13 y Pueblo Ladrillo (Lacunosa Town)",
    "emoji": "🌙",
    "goal": "Captura a Cobalion en la Ruta 13 y escucha la leyenda de Kyurem.",
    "gym": "",
    "mons": [
      638,
      646,
      585
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "¡Cobalion en la Ruta 13!",
        "d": "En un alto de la <b>Ruta 13</b> te espera <b>Cobalion Nv.45</b>, el primero de los espadachines, capturable ya en la historia. Guarda antes: si lo debilitas, no vuelve hasta que revalides la Liga (a Nv.65).",
        "link": "legendarios",
        "mons": [
          638
        ]
      },
      {
        "cat": "tip",
        "t": "La leyenda de Kyurem",
        "d": "En Pueblo Ladrillo nadie sale de noche: temen a <b>Kyurem</b>, que baja del Boquete Gigante a devorar. Es el aviso de la trama final.",
        "link": "legendarios",
        "mons": [
          646
        ]
      },
      {
        "cat": "catch",
        "t": "Ruta 13",
        "d": "De camino aparecen Deerling y Pokémon de playa, y hay un claro oculto; entrena aquí antes del enorme salto de nivel de Lirio.",
        "link": "",
        "mons": [
          585
        ]
      }
    ]
  },
  {
    "area": "Rutas 12 y 11",
    "name": "Puente Villa (Village Bridge)",
    "emoji": "🎻",
    "goal": "Cruza la Ruta 12 y el Puente Villa, captura a Virizion en la Ruta 11 y sigue a Ciudad Caolín.",
    "gym": "",
    "mons": [
      640,
      55,
      183
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "¡Virizion en la Ruta 11!",
        "d": "Justo antes de Ciudad Caolín, en la <b>Ruta 11</b>, te espera <b>Virizion Nv.45</b>, el segundo espadachín. Igual que Cobalion: guarda antes de hablarle.",
        "link": "legendarios",
        "mons": [
          640
        ]
      },
      {
        "cat": "catch",
        "t": "Puente Villa",
        "d": "Puente-poblado con músicos (puedes reunir a la banda), la sidequest de los bocadillos y un <b>claro oculto</b>. En la hierba salen Golduck, Marill y Zangoose o Seviper según la versión.",
        "link": "secretos",
        "mons": [
          55,
          183
        ]
      }
    ]
  },
  {
    "area": "Ciudad dragón",
    "name": "Ciudad Caolín (Opelucid City)",
    "emoji": "🐉",
    "goal": "Enfréntate a Lirio en el 7º gimnasio, el pico de dificultad, y resiste el ataque del Equipo Plasma.",
    "gym": "Medalla Leyenda",
    "mons": [
      621,
      330,
      610,
      611,
      612
    ],
    "highlights": [
      {
        "cat": "boss",
        "t": "Gimnasio 7: Lirio (Drayden)",
        "d": "Tipo Dragón. Druddigon Nv.46, Flygon Nv.46 y <b>Haxorus Nv.48</b>. Lleva <b>Hielo</b> (y ojo con Cola Dragón, que fuerza cambios, y con la Danza Dragón de Haxorus). Da <b>MT82 Cola Dragón</b> y la Medalla Leyenda.",
        "link": "gimnasios",
        "mons": [
          621,
          330,
          612
        ]
      },
      {
        "cat": "item",
        "t": "Centro Comercial R9 (Ruta 9)",
        "d": "Al oeste de la ciudad, en la Ruta 9, está el <b>Centro Comercial R9</b>: MT, objetos de mejora y curación en cantidad (y entrenadores dentro). Ven con dinero.",
        "link": "",
        "mons": []
      },
      {
        "cat": "boss",
        "t": "El Equipo Plasma congela la ciudad",
        "d": "Tras la medalla, la <b>Fragata Plasma</b> hiela Ciudad Caolín y Ghechis roba la <b>Punta ADN</b> de Lirio. Combates seguidos contra reclutas: cúrate antes de explorar.",
        "link": "",
        "mons": []
      },
      {
        "cat": "tip",
        "t": "Gran salto de nivel",
        "d": "Del gimnasio 6 al 7 hay un salto enorme; llega sobre Nv.48-50. Los Audino de la hierba alta que tiembla dan muchísima experiencia.",
        "link": "",
        "mons": []
      }
    ]
  },
  {
    "area": "Ciudad flotante",
    "name": "Ciudad Marga (Humilau City)",
    "emoji": "🌊",
    "goal": "Vence a Ciprián, el último líder, y consigue la 8ª medalla.",
    "gym": "Medalla Ola",
    "mons": [
      565,
      321,
      593,
      592,
      594
    ],
    "highlights": [
      {
        "cat": "boss",
        "t": "Gimnasio 8: Ciprián (Marlon)",
        "d": "Tipo Agua. Carracosta Nv.49, Wailord Nv.49 y <b>Jellicent Nv.51</b> (inmune a Normal/Lucha). Lleva <b>Eléctrico/Planta</b> y Siniestro/Fantasma para Jellicent. Da <b>MT55 Escaldar</b> y la Medalla Ola.",
        "link": "gimnasios",
        "mons": [
          565,
          321,
          593
        ]
      },
      {
        "cat": "tip",
        "t": "Cómo se llega: el Acuatúnel",
        "d": "A Ciudad Marga se llega desde Pueblo Arenisca cruzando el <b>Acuatúnel</b> (Marine Tube), el túnel submarino con cúpula de cristal. Merece la pena pararse a mirar los Pokémon marinos.",
        "link": "",
        "mons": []
      },
      {
        "cat": "catch",
        "t": "Aguas de Ciudad Marga",
        "d": "Surfeando ves Frillish y Alomomola; buen sitio para completar tu equipo de agua antes de la recta final. Aquí hay otro tutor de movimientos (fragmentos amarillos).",
        "link": "",
        "mons": [
          592,
          594
        ]
      }
    ]
  },
  {
    "area": "Recta final",
    "name": "Gruta Marina, Fragata Plasma y Boquete Gigante",
    "emoji": "🧊",
    "goal": "Frena al Equipo Plasma, enfréntate a Ghechis y vence al Kyurem fusionado.",
    "gym": "",
    "mons": [
      603,
      604,
      646,
      635,
      530
    ],
    "highlights": [
      {
        "cat": "boss",
        "t": "Ghechis y el Kyurem fusionado",
        "d": "En el <b>Boquete Gigante</b>, Ghechis fusiona a Kyurem con el dragón de N (<b>Kyurem Negro/Blanco Nv.50</b>, imposible de capturar aquí) y después te reta con su equipo Nv.50-52, Hydreigon incluido. Combate durísimo: lleva revivir y curas de estado.",
        "link": "legendarios",
        "mons": [
          646,
          635
        ]
      },
      {
        "cat": "tip",
        "t": "Kyurem, para el postgame",
        "d": "Kyurem huye tras la batalla. Reaparece a <b>Nv.70</b> en la cueva del cráter <b>cuando hayas capturado a tu Zekrom/Reshiram</b> en la Torre Duodraco. Al conseguirlo obtendrás la <b>Punta ADN</b>.",
        "link": "legendarios",
        "mons": [
          646
        ]
      },
      {
        "cat": "catch",
        "t": "Gruta Marina (Ruta 21)",
        "d": "Un <b>Crustle</b> bloquea el paso (combate de historia). Dentro capturas Boldore, Woobat y, con suerte, Tynamo/Eelektrik en el sótano; Excadrill sale de las nubes de polvo. Eelektross (sin debilidades) es un buen cierre de equipo.",
        "link": "",
        "mons": [
          603,
          604,
          530
        ]
      }
    ]
  },
  {
    "area": "Camino a la Liga",
    "name": "Ruta 23 y Calle Victoria (Victory Road)",
    "emoji": "🏔️",
    "goal": "Captura a Terrakion en la Ruta 22 y supera la Calle Victoria hacia la Liga.",
    "gym": "",
    "mons": [
      639,
      621,
      633,
      634,
      623
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "Terrakion (legendario)",
        "d": "En la <b>Ruta 22</b>, junto al Boquete Gigante, te espera <b>Terrakion Nv.45</b>, el tercer espadachín. No sigas de largo: guarda y captúralo.",
        "link": "legendarios",
        "mons": [
          639
        ]
      },
      {
        "cat": "catch",
        "t": "Deino y Druddigon",
        "d": "Aparecen <b>Deino</b> (→Hydreigon, pseudolegendario) y Druddigon. Deino es raro pero merece muchísimo la pena.",
        "link": "",
        "mons": [
          633,
          621
        ]
      }
    ]
  },
  {
    "area": "Liga Pokémon",
    "name": "Liga Pokémon (Alto Mando y Campeona)",
    "emoji": "👑",
    "goal": "Vence al Alto Mando en cualquier orden y a la Campeona Iris.",
    "gym": "",
    "mons": [
      534,
      625,
      576,
      609,
      612
    ],
    "highlights": [
      {
        "cat": "boss",
        "t": "Alto Mando",
        "d": "Anís (Fantasma, as <b>Chandelure</b>), Aza (Siniestro, as <b>Bisharp</b>), Catleya (Psíquico, as <b>Gothitelle</b>) y Lotto (Lucha, as <b>Conkeldurr</b>), todos Nv.56-58. Elige el orden según tus counters.",
        "link": "liga",
        "mons": [
          609,
          625,
          576,
          534
        ]
      },
      {
        "cat": "boss",
        "t": "Campeona Iris",
        "d": "Hydreigon, Druddigon, Aggron, Archeops y Lapras Nv.57, rematados por <b>Haxorus Nv.59</b>. El <b>Hielo</b> arrasa medio equipo, pero reserva Lucha/Tierra para Aggron y Planta/Lucha para Lapras. Lleva antiparálisis.",
        "link": "liga",
        "mons": [
          612,
          635,
          306,
          131
        ]
      }
    ]
  }
];

  var postgameStops = [
  {
    "area": "Postgame · dragones",
    "name": "Castillo de N y Torre Duodraco: Zekrom / Reshiram",
    "emoji": "🐲",
    "goal": "Vence a N en su castillo y captura el dragón legendario de tu versión.",
    "mons": [
      644,
      643
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "El dragón de N",
        "d": "<b>Negro 2 → Zekrom</b> (Piedra Oscura); <b>Blanco 2 → Reshiram</b> (Piedra Clara), ambos Nv.70 en la Torre Duodraco.",
        "link": "legendarios",
        "mons": [
          644,
          643
        ]
      },
      {
        "cat": "tip",
        "t": "Procedimiento",
        "d": "<ol><li>Tras la Liga, en la <b>Calle Victoria</b> un <b>Zoroark</b> te guía por una grieta hasta el <b>Castillo de N</b>.</li><li>Vence al Zekrom/Reshiram de N: se convertirá en la <b>Piedra Oscura/Clara</b> y N te la dará.</li><li>Sube a lo alto de la <b>Torre Duodraco</b> con la piedra e interactúa para liberar al dragón (Nv.70).</li><li>Si huyes o lo debilitas, <b>reaparece</b> tras volver a entrar en el Salón de la Fama.</li></ol> N vuelve a su castillo cada estación con equipos nuevos: rétalo de vez en cuando.",
        "link": "legendarios",
        "mons": []
      }
    ]
  },
  {
    "area": "Boquete Gigante",
    "name": "Kyurem y la fusión con la Punta ADN",
    "emoji": "🧬",
    "goal": "Recaptura a Kyurem y fusiónalo para obtener Kyurem Negro/Blanco.",
    "mons": [
      646,
      644,
      643
    ],
    "highlights": [
      {
        "cat": "secret",
        "t": "Fusión de dragones",
        "d": "<ol><li>Con tu Zekrom/Reshiram ya capturado, vuelve al <b>Boquete Gigante</b>: <b>Kyurem</b> espera en la cueva del cráter a Nv.70. Captúralo y obtendrás la <b>Punta ADN</b>.</li><li>Ten a Zekrom (o Reshiram) en el equipo.</li><li>Usa la Punta ADN sobre Kyurem: se fusiona en <b>Kyurem Negro</b> (con Zekrom) o <b>Kyurem Blanco</b> (con Reshiram).</li><li>Puedes separarlos cuando quieras sin perder al dragón absorbido.</li></ol>",
        "link": "legendarios",
        "mons": [
          646
        ]
      }
    ]
  },
  {
    "area": "Rutas 13, 11 y 22",
    "name": "Espadachines: Cobalion, Virizion, Terrakion",
    "emoji": "⚔️",
    "goal": "Completa el trío de espadachines si te lo saltaste en la historia.",
    "mons": [
      638,
      640,
      639
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "Dónde esperan",
        "d": "<ol><li><b>Cobalion</b> en la <b>Ruta 13</b>.</li><li><b>Virizion</b> en la <b>Ruta 11</b>.</li><li><b>Terrakion</b> en la <b>Ruta 22</b>.</li></ol> Los tres estaban ya disponibles a Nv.45 durante la historia; si los debilitaste, reaparecen a <b>Nv.65</b> tras revalidar la Liga. Con los tres en el equipo se activa el evento de Keldeo.",
        "link": "legendarios",
        "mons": [
          638,
          640,
          639
        ]
      }
    ]
  },
  {
    "area": "Evento",
    "name": "Keldeo y la Arboleda Promesa",
    "emoji": "🦄",
    "goal": "Consigue al 4º mosquetero (mítico) y su Forma Brío.",
    "mons": [
      647
    ],
    "highlights": [
      {
        "cat": "secret",
        "t": "Solo por evento",
        "d": "<b>Keldeo</b> es de distribución oficial. En emulador: inyecta el regalo (.pgf), edita con PKHeX o usa cheat. Llévalo con <b>Cobalion, Virizion y Terrakion</b> a la <b>Arboleda Promesa</b> (norte de Pueblo Ocre): aprenderá <b>Sable Místico</b> y pasará a su Forma Brío.",
        "link": "emulador",
        "mons": [
          647
        ]
      }
    ]
  },
  {
    "area": "Santuario Abundancia",
    "name": "Trío de los genios: Tornadus, Thundurus y Landorus",
    "emoji": "🌪️",
    "goal": "Reúne a los genios (por transferencia) y consigue el Espejo Veraz.",
    "mons": [
      641,
      642,
      645
    ],
    "highlights": [
      {
        "cat": "tip",
        "t": "No se capturan en N2/B2",
        "d": "A diferencia de Negro/Blanco 1, <b>ninguno de los tres genios aparece salvaje</b> en estos juegos. Se traen de Negro/Blanco (Tornadus era de Negro y Thundurus de Blanco), del <b>Dream Radar</b> de 3DS (en Forma Tótem) o, en emulador, con PKHeX/intercambio local.",
        "link": "legendarios",
        "mons": [
          641,
          642,
          645
        ]
      },
      {
        "cat": "item",
        "t": "Espejo Veraz",
        "d": "Lleva a <b>Landorus</b> al <b>Santuario Abundancia</b> (Ruta 14, con Cascada) y recibirás el <b>Espejo Veraz</b>, que cambia a los tres genios entre Forma Avatar y la más fuerte Forma Tótem.",
        "link": "secretos",
        "mons": [
          645
        ]
      }
    ]
  },
  {
    "area": "Castillo Ancestral",
    "name": "Volcarona en el desierto",
    "emoji": "🔥",
    "goal": "Captura al gran atacante especial de fuego/bicho.",
    "mons": [
      637
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "Al fondo del castillo",
        "d": "<ol><li>Entra por el <b>Pasadizo Ancestral</b> (acceso bajo el PWT) — la entrada del desierto está cegada por la arena en N2/B2.</li><li>Avanza hasta la sala del fondo del <b>Castillo Ancestral</b>.</li><li>Te espera <b>Volcarona Nv.35</b>, uno de los mejores especiales del juego. Solo hay uno: guarda antes.</li></ol>",
        "link": "legendarios",
        "mons": [
          637
        ]
      }
    ]
  },
  {
    "area": "Túnel Yakón",
    "name": "Los colosos Regi y Regigigas",
    "emoji": "🗿",
    "goal": "Reúne al trío Regi y despierta a Regigigas.",
    "mons": [
      377,
      379,
      378,
      486
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "El trío Regi",
        "d": "<ol><li><b>Regirock</b> Nv.65 en las <b>Ruinas Subterráneas</b>, al fondo del <b>Túnel Yakón</b> (entre Ciudad Fayenza y el Monte Tuerca). Resuelve el puzle del suelo para abrir la cámara.</li><li>Capturarlo te da la <b>Clave Hierro</b> (Negro 2 → <b>Registeel</b>) o la <b>Clave Iceberg</b> (Blanco 2 → <b>Regice</b>), ambos Nv.65. La clave contraria se recibe por el <b>Nexo Teselia</b> (o con PKHeX).</li></ol>",
        "link": "legendarios",
        "mons": [
          377,
          379,
          378
        ]
      },
      {
        "cat": "catch",
        "t": "Regigigas",
        "d": "Con los <b>tres Regi</b> en el equipo, baja a lo más hondo del <b>Monte Tuerca</b> (Twist Mountain) para despertar a <b>Regigigas Nv.68</b>.",
        "link": "legendarios",
        "mons": [
          486
        ]
      }
    ]
  },
  {
    "area": "Ciudad Fayenza",
    "name": "Torneo Mundial Pokémon (PWT)",
    "emoji": "🏆",
    "goal": "Compite contra líderes y campeones de todas las regiones.",
    "mons": [],
    "highlights": [
      {
        "cat": "secret",
        "t": "El gran reto competitivo",
        "d": "En Ciudad Fayenza, el <b>PWT</b> ofrece torneos temáticos: líderes de Kanto, Johto, Hoenn, Sinnoh y Teselia, e incluso <b>campeones de todas las generaciones</b>. Recompensa con BP para objetos raros y MT. Contenido estrella del postgame.",
        "link": "secretos",
        "mons": []
      }
    ]
  },
  {
    "area": "Ciudad Mayólica",
    "name": "Metro Batalla",
    "emoji": "🚉",
    "goal": "Encadena victorias en el metro para ganar BP.",
    "mons": [],
    "highlights": [
      {
        "cat": "secret",
        "t": "Rachas y BP",
        "d": "El <b>Metro Batalla</b> (individual, dobles, multi) es el sucesor de la Torre Batalla. Encadena combates para subir tu racha y ganar Puntos de Combate. Sin objetos de curación entre rondas: prepara un equipo autosuficiente.",
        "link": "secretos",
        "mons": []
      }
    ]
  },
  {
    "area": "Este del mapa",
    "name": "Rascacielos Negro / Cavernogal Blanco",
    "emoji": "🗼",
    "goal": "Supera las 10 áreas del reto exclusivo de tu versión y vence a Guayo.",
    "mons": [
      443,
      147
    ],
    "highlights": [
      {
        "cat": "secret",
        "t": "Reto por versión",
        "d": "En <b>Ciudad Negra</b> (Negro 2) se alza el <b>Rascacielos Negro</b> y en el <b>Bosque Blanco</b> (Blanco 2), el <b>Cavernogal Blanco</b>: 10 áreas de entrenadores con jefe final. Da mucha experiencia y objetos, y sí se puede curar entre pisos.",
        "link": "secretos",
        "mons": []
      },
      {
        "cat": "boss",
        "t": "Guayo y su regalo variocolor",
        "d": "En el área 10 espera <b>Guayo (Benga)</b>, el nieto de Mirto. Al vencerlo te regala un <b>Gible variocolor</b> (Negro 2) o un <b>Dratini variocolor</b> (Blanco 2): un shiny garantizado.",
        "link": "secretos",
        "mons": [
          443,
          147
        ]
      }
    ]
  },
  {
    "area": "Pueblo Arenisca",
    "name": "Combate contra Cintia",
    "emoji": "💎",
    "goal": "Derrota a la excampeona de Sinnoh en la villa de Catleya.",
    "mons": [
      445,
      442,
      448,
      350,
      471
    ],
    "highlights": [
      {
        "cat": "boss",
        "t": "El duelo opcional más duro",
        "d": "<ol><li>Ve a la <b>villa de Catleya</b> en Pueblo Arenisca <b>en primavera</b> (cambia el mes del emulador si hace falta: solo combate en esa estación, una vez al día).</li><li>Su equipo: Spiritomb, Togekiss, Lucario, Milotic y Glaceon <b>Nv.76</b> y <b>Garchomp Nv.78</b> (en revanchas, Nv.80-82).</li><li>Lleva coberturas variadas y objetos de sobra: es un test de nivel real.</li></ol>",
        "link": "secretos",
        "mons": [
          445,
          442,
          468,
          448,
          350,
          471
        ]
      }
    ]
  },
  {
    "area": "Míticos por evento",
    "name": "Victini, Meloetta y Genesect",
    "emoji": "🎁",
    "goal": "Completa los míticos de la generación.",
    "mons": [
      494,
      648,
      649
    ],
    "highlights": [
      {
        "cat": "missable",
        "t": "Victini (Isla Libertad)",
        "d": "El <b>Pase Liberty</b> (2011) llevaba a la <b>Isla Libertad</b> a capturar a <b>Victini</b> en Negro/Blanco. En N2/B2 la isla es visitable pero <b>Victini ya no aparece</b> sin evento/transferencia. En emulador: inyecta la Carta Regalo (.pgf) o el propio Victini con PKHeX. Si lo llevas a su sala del faro, sale de la Ball y pasea.",
        "link": "emulador",
        "mons": [
          494
        ]
      },
      {
        "cat": "secret",
        "t": "Solo distribución",
        "d": "<b>Meloetta</b> (aprende <b>Canto Arcaico</b> con el músico del Café Sonata de Ciudad Porcelana para su Forma Danza) y <b>Genesect</b> (con los cartuchos hidroROM/fulgoROM/piroROM/crioROM que cambian el tipo de <b>Tecno Shock</b>) solo se obtenían por evento.",
        "link": "emulador",
        "mons": [
          648,
          649
        ]
      },
      {
        "cat": "tip",
        "t": "En emulador",
        "d": "Consíguelos con la <b>Carta Regalo</b> inyectada (.pgf, «Mystery Gift → Import → Set» en PKHeX) o como .pk5. Son necesarios para el 100% de la Pokédex Nacional (aunque no cuentan para el Diploma nativo).",
        "link": "emulador",
        "mons": []
      }
    ]
  },
  {
    "area": "Por toda Teselia",
    "name": "Legendarios de Sinnoh: Latios/Latias, lagos, Heatran y Cresselia",
    "emoji": "✨",
    "goal": "Caza los legendarios de otras regiones repartidos por Teselia.",
    "mons": [
      381,
      482,
      485,
      488
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "Latios (N2) / Latias (B2)",
        "d": "En el <b>Solar de los Sueños</b> (junto a Ciudad Gres) te espera <b>Latios</b> en Negro 2 o <b>Latias</b> en Blanco 2, a Nv.68. Al capturarlo deja el <b>Rocío Bondad</b>.",
        "link": "legendarios",
        "mons": [
          381,
          380
        ]
      },
      {
        "cat": "catch",
        "t": "El trío de los lagos",
        "d": "Presencia el evento de la cueva de la <b>Ruta 20</b> (Cave of Being) y el trío se reparte por Teselia, a Nv.65: <b>Uxie</b> frente al museo de Ciudad Esmalte, <b>Mesprit</b> en la cima de la Torre de los Cielos y <b>Azelf</b> en la Ruta 23. Pisa la baldosa exacta y responde «Sí».",
        "link": "legendarios",
        "mons": [
          480,
          481,
          482
        ]
      },
      {
        "cat": "catch",
        "t": "Heatran y Cresselia",
        "d": "<b>Heatran Nv.68</b>: recoge la <b>Piedra Magma</b> en la Ruta 18 y actívala en la sala profunda de la <b>Montaña Reversia</b>. <b>Cresselia Nv.68</b>: lleva la <b>Pluma Lunar</b> de la Villa Horroris al centro del <b>Puente Progreso</b>.",
        "link": "legendarios",
        "mons": [
          485,
          488
        ]
      }
    ]
  },
  {
    "area": "Vuelo desde Ciudad Loza",
    "name": "Reserva Natural (Nature Preserve)",
    "emoji": "🌿",
    "goal": "Gana el Pase viendo toda la Pokédex de Teselia y caza al Haxorus variocolor.",
    "mons": [
      612,
      132,
      221,
      465
    ],
    "highlights": [
      {
        "cat": "secret",
        "t": "El Pase y el Haxorus shiny",
        "d": "Cuando hayas <b>visto</b> las 297 especies no-míticas de la Pokédex de Teselia, la profesora Encina te da el <b>Pase</b>: vuela desde el aeropuerto de <b>Ciudad Loza</b> a la Reserva Natural. Allí te espera un <b>Haxorus variocolor</b> (shiny garantizado) además de hierba con rarezas (Ditto, Tangrowth, Piloswine...) y objetos ocultos.",
        "link": "pokedex",
        "mons": [
          612,
          132,
          221,
          465
        ]
      }
    ]
  },
  {
    "area": "Toda Teselia",
    "name": "Claros ocultos y Habilidades Ocultas",
    "emoji": "🔎",
    "goal": "Farmea Pokémon con Habilidad Oculta y objetos raros.",
    "mons": [],
    "highlights": [
      {
        "cat": "secret",
        "t": "Contenido que se regenera",
        "d": "<ol><li>Localiza los <b>claros ocultos</b> repartidos por el mapa (huecos entre árboles).</li><li>Su contenido se <b>regenera al caminar</b> (no depende del reloj): vacíalos y vuelve a pasar.</li><li>Consigues Pokémon con <b>Habilidad Oculta</b> (Riolu, Minccino, Pidove...) y objetos raros.</li></ol>",
        "link": "secretos",
        "mons": []
      }
    ]
  }
];

  // Transforma el formato de datos (emoji->emo, highlights->hl, link:"clave"->{t,href})
  function toStops(raw) {
    return raw.map(function (s) {
      return {
        area: s.area,
        name: s.name,
        emo: s.emoji,
        gym: s.gym || "",
        goal: s.goal,
        mons: s.mons || [],
        hl: (s.highlights || []).map(function (h) {
          var link = (h.link && L[h.link]) ? { t: L[h.link].t, href: "index.html#" + h.link } : null;
          return { cat: h.cat, t: h.t, d: h.d, mons: h.mons, link: link };
        })
      };
    });
  }

  var STOPS = toStops(routeStops).concat(toStops(postgameStops));

  /* ---------------- Estado ---------------- */
  var K_CUR = "gen5_wt_current";
  var K_FILTER = "gen5_wt_filter";
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
