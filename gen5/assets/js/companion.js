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
  "81": "Magnemite",
  "88": "Grimer",
  "109": "Koffing",
  "131": "Lapras",
  "132": "Ditto",
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
  "350": "Milotic",
  "377": "Regirock",
  "378": "Regice",
  "379": "Registeel",
  "442": "Spiritomb",
  "445": "Garchomp",
  "447": "Riolu",
  "448": "Lucario",
  "465": "Tangrowth",
  "471": "Glaceon",
  "486": "Regigigas",
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
    "name": "Aspertia City (Ciudad Losar)",
    "emoji": "🏙️",
    "goal": "Elige inicial, consigue la Pokédex y derrota a Cheren en el 1er gimnasio.",
    "gym": "Medalla Básica",
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
        "d": "Bianca te da a elegir: <b>Snivy</b> (Planta), <b>Tepig</b> (Fuego) u <b>Oshawott</b> (Agua). Todos completan el juego bien; Oshawott lo tiene algo más fácil en los primeros gimnasios.",
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
        "d": "Solo obtienes <b>un inicial por partida</b>: los otros dos requieren intercambio (o PKHeX en emulador). Elige con calma; luego, en Castelia, te darán además el <b>mono elemental</b> que hace ventaja a tu inicial.",
        "link": "emulador",
        "mons": []
      },
      {
        "cat": "boss",
        "t": "Gimnasio 1: Cheren",
        "d": "Tipo Normal. Patrat Nv.11 y <b>Lillipup Nv.13</b>. Golpes fuertes o un tipo Lucha bastan. Da <b>MT83 Ánimo</b> y la Medalla Básica.",
        "link": "gimnasios",
        "mons": [
          504,
          506
        ]
      },
      {
        "cat": "item",
        "t": "Mirador y Vídeo-Llave",
        "d": "Habla con todos: consigues la <b>Pokédex</b>, la <b>Vídeo-Llave (C-Gear)</b> y la Lista de Hábitats. No te saltes el mirador de la ciudad.",
        "link": "",
        "mons": []
      }
    ]
  },
  {
    "area": "Rutas 19-20",
    "name": "Rancho Floccesy y Pueblo Floccesy",
    "emoji": "🌾",
    "goal": "Primeras capturas, echa a Team Plasma del rancho y prueba las Cuevas Ocultas.",
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
        "t": "Riolu (missable/raro)",
        "d": "La <b>Cueva Oculta</b> del rancho puede contener a <b>Riolu</b>, capturable muy pronto. Es aleatorio: entra y sal para reintentar. ¡No lo dejes pasar!",
        "link": "secretos",
        "mons": [
          447
        ]
      },
      {
        "cat": "catch",
        "t": "Fauna temprana",
        "d": "Purrloin, Pidove, Psyduck y Azurill. Buen momento para formar un equipo variado antes de Roxie.",
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
        "t": "Team Plasma en el rancho",
        "d": "Ayudas a recuperar al Herdier perdido y te enfrentas a tu rival Hugh y a grunts de Plasma. Combate sencillo pero deja buena experiencia.",
        "link": "",
        "mons": []
      }
    ]
  },
  {
    "area": "Ciudad costera",
    "name": "Virbank City (Ciudad Mayólica)",
    "emoji": "🎬",
    "goal": "Explora el Complejo Virbank, rueda en Pokéstar Studios y vence a Roxie.",
    "gym": "Medalla Tóxica",
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
        "t": "Gimnasio 2: Roxie",
        "d": "Tipo Veneno. Koffing Nv.16 y <b>Whirlipede Nv.18</b>. Lleva <b>Psíquico o Tierra</b>. Da <b>MT09 Ecoveneno</b> y la Medalla Tóxica.",
        "link": "gimnasios",
        "mons": [
          109,
          544
        ]
      },
      {
        "cat": "catch",
        "t": "Complejo Virbank",
        "d": "Zona industrial con Magnemite, Grimer, Koffing y Trubbish; niveles algo más altos, útil para subir rápido.",
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
        "t": "Pokéstar Studios",
        "d": "Minijuego único: ruedas películas con tu equipo contra atrezo. Totalmente opcional pero da objetos y es exclusivo de esta gen.",
        "link": "secretos",
        "mons": []
      }
    ]
  },
  {
    "area": "Gran ciudad",
    "name": "Castelia City (Ciudad Porcelana)",
    "emoji": "🌆",
    "goal": "Cruza las alcantarillas, consigue tu mono elemental y vence a Burgh.",
    "gym": "Medalla Insecto",
    "mons": [
      511,
      513,
      515,
      542,
      557
    ],
    "highlights": [
      {
        "cat": "item",
        "t": "Mono elemental de regalo",
        "d": "Te regalan <b>Pansage/Pansear/Panpour</b> según tu inicial (el que le hace ventaja). Cobertura gratis para los siguientes combates.",
        "link": "",
        "mons": [
          511,
          513,
          515
        ]
      },
      {
        "cat": "boss",
        "t": "Gimnasio 3: Burgh",
        "d": "Tipo Bicho. Swadloon y Dwebble Nv.22 y <b>Leavanny Nv.24</b>. El <b>Fuego</b> lo arrasa. Da <b>MT76 Estoicidad</b> y la Medalla Insecto.",
        "link": "gimnasios",
        "mons": [
          542,
          557
        ]
      },
      {
        "cat": "catch",
        "t": "Alcantarillas de Castelia",
        "d": "Team Plasma acecha aquí. Encuentras Grimer, Rattata y objetos escondidos; usa el Rastreador para no dejar nada.",
        "link": "",
        "mons": [
          88
        ]
      }
    ]
  },
  {
    "area": "Ruta 4 y desierto",
    "name": "Desierto Resort y Castillo Relic",
    "emoji": "🏜️",
    "goal": "Captura fauna del desierto y anota el Castillo Relic para el postgame.",
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
        "t": "Castillo Relic (nota para luego)",
        "d": "En su interior más profundo espera <b>Volcarona Nv.35</b>, accesible en el postgame. Recuerda volver: es de los mejores atacantes especiales.",
        "link": "legendarios",
        "mons": [
          637
        ]
      },
      {
        "cat": "tip",
        "t": "Join Avenue",
        "d": "Se abre camino a <b>Join Avenue</b> (en Fayenza): tu avenida de tiendas. Cuanto más la desarrolles, mejores recompensas.",
        "link": "secretos",
        "mons": []
      }
    ]
  },
  {
    "area": "Ciudad de ocio",
    "name": "Nimbasa City (Ciudad Fayenza)",
    "emoji": "🎡",
    "goal": "Recorre el parque de atracciones y derrota a Elesa.",
    "gym": "Medalla Voltaje",
    "mons": [
      587,
      180,
      522,
      523
    ],
    "highlights": [
      {
        "cat": "boss",
        "t": "Gimnasio 4: Elesa",
        "d": "Tipo Eléctrico. Emolga Nv.28 (inmune a Tierra), Flaaffy Nv.28 y <b>Zebstrika Nv.30</b>. Lleva <b>Roca/Hielo</b> para Emolga y Tierra para el resto. Da <b>MT72 Voltiocambio</b> y la Medalla Voltaje.",
        "link": "gimnasios",
        "mons": [
          587,
          180,
          523
        ]
      },
      {
        "cat": "secret",
        "t": "Metro de Combate y Anville",
        "d": "Desde la estación llegas a <b>Anville Town</b> (objetos raros) y más adelante al <b>Metro de Combate</b>, gran reto de postgame.",
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
    "name": "Ruta 5 y Puente Levadizo de Driftveil",
    "emoji": "🌉",
    "goal": "Avanza hacia Driftveil capturando en las orillas.",
    "gym": "",
    "mons": [
      580,
      510
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "Ducklett y Liepard",
        "d": "Ducklett (Agua/Volador) aparece en el agua; buen HM-slave y atacante de Vendaval a futuro.",
        "link": "",
        "mons": [
          580,
          510
        ]
      },
      {
        "cat": "tip",
        "t": "Entrenadores en fila",
        "d": "El puente y la ruta están llenos de entrenadores: aprovecha para nivelar antes del duro gimnasio de Clay.",
        "link": "",
        "mons": []
      }
    ]
  },
  {
    "area": "Ciudad mercado",
    "name": "Driftveil City (Ciudad Esmalte)",
    "emoji": "⛏️",
    "goal": "Descubre el PWT, frena a Team Plasma en el almacén frío y vence a Clay.",
    "gym": "Medalla Temblor",
    "mons": [
      552,
      28,
      530,
      615,
      582
    ],
    "highlights": [
      {
        "cat": "boss",
        "t": "Gimnasio 5: Clay",
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
        "t": "Torneo Mundial de Combates (PWT)",
        "d": "El <b>PWT</b> se estrena aquí: torneos contra líderes y campeones de todas las regiones. Contenido estrella del postgame.",
        "link": "secretos",
        "mons": []
      },
      {
        "cat": "catch",
        "t": "Almacén Frío",
        "d": "Team Plasma se esconde en el almacén; entre el hielo capturas <b>Cryogonal</b> y Vanillite. Combate importante de historia.",
        "link": "",
        "mons": [
          615,
          582
        ]
      }
    ]
  },
  {
    "area": "Ruta 6 y cueva",
    "name": "Ruta 6 y Cueva Loza (Mistralton Cave)",
    "emoji": "🕳️",
    "goal": "Explora la Cueva Loza y prepárate para Chargestone.",
    "gym": "",
    "mons": [
      585,
      588,
      590,
      529
    ],
    "highlights": [
      {
        "cat": "tip",
        "t": "Los espadachines (postgame)",
        "d": "Los <b>tres espadachines</b> son capturas de <b>postgame</b>: <b>Cobalion Nv.45</b> aparece en la <b>Ruta 13</b>, y al tratar con él surgen <b>Virizion</b> (Ruta 11) y <b>Terrakion</b> (Ruta 22). En la Cueva Loza usa <b>Fuerza</b> para llegar a rincones con objetos.",
        "link": "legendarios",
        "mons": [
          638
        ]
      },
      {
        "cat": "catch",
        "t": "Fauna de la Ruta 6",
        "d": "Deerling (cambia de color con la estación), Karrablast y Foongus. Deerling da un Sawsbuck útil y bonito.",
        "link": "",
        "mons": [
          585,
          588,
          590
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
        "t": "Colress y los imanes",
        "d": "El científico Colress aparece por la historia. Mueve las rocas imán para abrir paso y descubrir objetos ocultos.",
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
    "name": "Mistralton City (Ciudad Loza)",
    "emoji": "✈️",
    "goal": "Sube la Torre Celeste y vence a Skyla.",
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
        "t": "Gimnasio 6: Skyla",
        "d": "Tipo Volador. Swoobat y Skarmory Nv.37 y <b>Swanna Nv.39</b> (usa Vendaval infalible). Lleva un <b>Eléctrico fuerte</b> (x4 a Swanna) y Fuego para Skarmory. Da <b>MT62 Acróbata</b> y la Medalla Jet.",
        "link": "gimnasios",
        "mons": [
          227,
          581
        ]
      },
      {
        "cat": "catch",
        "t": "Torre Celeste",
        "d": "Torre-cementerio con <b>Litwick, Elgyem y Golett</b>. En la cima suena la campana ligada a la historia; captura antes de subir.",
        "link": "secretos",
        "mons": [
          607,
          605
        ]
      }
    ]
  },
  {
    "area": "Ruta 7 y montaña",
    "name": "Ruta 7 y Twist Mountain (Monte Espira)",
    "emoji": "❄️",
    "goal": "Cruza la montaña, revive un fósil y sigue hacia el este.",
    "gym": "",
    "mons": [
      613,
      614,
      533,
      525,
      564
    ],
    "highlights": [
      {
        "cat": "missable",
        "t": "Fósil del Monte Espira (elección única)",
        "d": "Un minero te da <b>un solo fósil</b>: <b>Cubierta</b> (→Tirtouga/Carracosta) o <b>Pluma</b> (→Archen/Archeops). Se revive en el <b>Museo de Nacrene City</b>. La elección es <b>irreversible</b>: para tener el otro necesitas intercambio (o PKHeX en emulador).",
        "link": "emulador",
        "mons": [
          564,
          566
        ]
      },
      {
        "cat": "catch",
        "t": "Fauna de hielo y roca",
        "d": "Cubchoo, Gurdurr, Boldore y (en zonas frías) Cryogonal. Gurdurr evoluciona por intercambio a Conkeldurr.",
        "link": "emulador",
        "mons": [
          613,
          533,
          525
        ]
      }
    ]
  },
  {
    "area": "Pueblo volcánico",
    "name": "Lentimas Town y Monte Reverso",
    "emoji": "🌋",
    "goal": "Atraviesa el volcán hacia Undella y resuelve la Casa Misteriosa.",
    "gym": "",
    "mons": [
      555,
      328,
      329,
      330,
      631
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "Monte Reverso",
        "d": "Interior volcánico con <b>Darmanitan, Trapinch, Grumpig y Heatmor</b>. Trapinch→Flygon es un pseudo-dragón excelente.",
        "link": "",
        "mons": [
          555,
          328,
          329,
          330,
          631
        ]
      },
      {
        "cat": "secret",
        "t": "La Casa Misteriosa",
        "d": "Sidequest de fantasmas con puzle de muñecas cerca de la salida. Resuélvelo para llevarte un objeto útil.",
        "link": "secretos",
        "mons": []
      }
    ]
  },
  {
    "area": "Pueblo playero",
    "name": "Undella Town",
    "emoji": "🏖️",
    "goal": "Descansa en la playa y anota la villa de Cynthia para el postgame.",
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
        "t": "Bahía de Undella",
        "d": "Buceando/surfeando aparecen Frillish, Alomomola, Wailmer y Mantyke; en postgame la bahía se llena de rarezas.",
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
        "t": "Villa de Cynthia",
        "d": "En <b>primavera</b> Cynthia está en su villa con un equipo Nv.70+ para un combate opcional durísimo. Vuelve preparado en el postgame.",
        "link": "secretos",
        "mons": [
          445
        ]
      }
    ]
  },
  {
    "area": "Pueblo de la leyenda",
    "name": "Lacunosa Town",
    "emoji": "🌙",
    "goal": "Escucha la leyenda de Kyurem y avanza hacia Opelucid.",
    "gym": "",
    "mons": [
      646,
      585
    ],
    "highlights": [
      {
        "cat": "tip",
        "t": "La leyenda de Kyurem",
        "d": "El pueblo teme a <b>Kyurem</b>, que baja de la montaña a devorar. Es el aviso de la trama final del Abismo Sombrío.",
        "link": "legendarios",
        "mons": [
          646
        ]
      },
      {
        "cat": "catch",
        "t": "Rutas 12-13",
        "d": "De camino aparecen Deerling y Pokémon de agua; entrena antes del enorme salto de nivel de Drayden.",
        "link": "",
        "mons": [
          585
        ]
      }
    ]
  },
  {
    "area": "Ciudad dragón",
    "name": "Opelucid City (Ciudad Caolín)",
    "emoji": "🐉",
    "goal": "Enfréntate a Drayden en el 7º gimnasio, el pico de dificultad.",
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
        "t": "Gimnasio 7: Drayden",
        "d": "Tipo Dragón. Druddigon Nv.46, Flygon Nv.46 y <b>Haxorus Nv.48</b>. Lleva <b>Hielo</b> (y ojo con Cola Dragón, que fuerza cambios). Da <b>MT82 Cola Dragón</b> y la Medalla Leyenda.",
        "link": "gimnasios",
        "mons": [
          621,
          330,
          612
        ]
      },
      {
        "cat": "tip",
        "t": "Gran salto de nivel",
        "d": "Del gimnasio 6 al 7 hay un salto enorme; llega sobre Nv.48-50. El Metro/PWT ya activos ayudan a nivelar.",
        "link": "",
        "mons": []
      }
    ]
  },
  {
    "area": "Ruta 9 y puente",
    "name": "Ruta 9 y Village Bridge",
    "emoji": "🛍️",
    "goal": "Compra en el centro comercial y sigue hacia Humilau.",
    "gym": "",
    "mons": [
      626,
      587
    ],
    "highlights": [
      {
        "cat": "item",
        "t": "Centro comercial (Ruta 9)",
        "d": "Gran tienda con objetos que no encuentras en otros sitios: MT, objetos de mejora y curación en cantidad. Ven con dinero.",
        "link": "",
        "mons": []
      },
      {
        "cat": "catch",
        "t": "Village Bridge",
        "d": "Puente-poblado con músicos y una Cueva Oculta cercana; Bouffalant y Emolga rondan la zona.",
        "link": "secretos",
        "mons": [
          626,
          587
        ]
      }
    ]
  },
  {
    "area": "Ciudad flotante",
    "name": "Humilau City (Ciudad Ondina)",
    "emoji": "🌊",
    "goal": "Vence a Marlon, el último líder, y consigue la 8ª medalla.",
    "gym": "Medalla Onda",
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
        "t": "Gimnasio 8: Marlon",
        "d": "Tipo Agua. Carracosta Nv.49, Wailord Nv.49 y <b>Jellicent Nv.51</b> (inmune a Normal/Lucha). Lleva <b>Eléctrico/Planta</b> y Siniestro/Fantasma para Jellicent. Da <b>MT55 Escaldar</b> y la Medalla Onda.",
        "link": "gimnasios",
        "mons": [
          565,
          321,
          593
        ]
      },
      {
        "cat": "catch",
        "t": "Aguas de Humilau",
        "d": "Surfeando ves Frillish, Alomomola y Mantine; buen sitio para completar tu equipo de agua antes de la recta final.",
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
    "name": "Cueva Costera, Fragata Plasma y Abismo Sombrío",
    "emoji": "🧊",
    "goal": "Frena a Team Plasma, enfréntate a Ghetsis y captura a Kyurem.",
    "gym": "",
    "mons": [
      603,
      604,
      646,
      635,
      529
    ],
    "highlights": [
      {
        "cat": "boss",
        "t": "Ghetsis y Kyurem",
        "d": "En el <b>Abismo Sombrío</b>, Team Plasma fusiona a Kyurem y luego Ghetsis te reta con un equipo Nv.50+ (Hydreigon incluido). Combate durísimo: lleva revivir y curas de estado.",
        "link": "legendarios",
        "mons": [
          646,
          635
        ]
      },
      {
        "cat": "catch",
        "t": "Kyurem (Nv.70)",
        "d": "Tras la trama, en el cráter interior reaparece <b>Kyurem Nv.70</b>. Debilítalo, paralízalo/congélalo y usa Ultra/Turno Balls. Después obtienes la <b>Punta ADN</b>.",
        "link": "legendarios",
        "mons": [
          646
        ]
      },
      {
        "cat": "catch",
        "t": "Cueva Costera",
        "d": "De camino capturas Tynamo→Eelektrik y Boldore. Eelektross (sin debilidades) es un buen cierre de equipo.",
        "link": "",
        "mons": [
          603,
          604
        ]
      }
    ]
  },
  {
    "area": "Camino a la Liga",
    "name": "Victory Road (Calle Victoria)",
    "emoji": "🏔️",
    "goal": "Supera la Calle Victoria y captura a Terrakion antes de la Liga.",
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
        "d": "En la <b>Ruta 22</b> (tras tratar con Cobalion) está <b>Terrakion Nv.45</b>, el tercer espadachín. No sigas de largo.",
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
    "name": "Pokémon League (Alto Mando y Campeona)",
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
        "d": "Shauntal (Fantasma, as <b>Chandelure</b>), Grimsley (Siniestro, as <b>Bisharp</b>), Caitlin (Psíquico, as <b>Gothitelle</b>) y Marshal (Lucha, as <b>Conkeldurr</b>), todos Nv.56-58. Elige el orden según tus counters.",
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
        "d": "Equipo Dragón mixto rematado por <b>Haxorus Nv.59</b>. El <b>Hielo</b> arrasa medio equipo, pero reserva Lucha/Tierra para Aggron y Planta/Lucha para Lapras. Lleva antiparálisis.",
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
    "area": "Torre norte",
    "name": "Torre Dragóspira: Zekrom / Reshiram",
    "emoji": "🐲",
    "goal": "Captura el dragón legendario de tu versión.",
    "mons": [
      644,
      643
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "El dragón de N",
        "d": "<b>Negro 2 → Zekrom</b> (Piedra Oscura); <b>Blanco 2 → Reshiram</b> (Piedra Clara), ambos Nv.70.",
        "link": "legendarios",
        "mons": [
          644,
          643
        ]
      },
      {
        "cat": "tip",
        "t": "Procedimiento",
        "d": "<ol><li>Completa la historia y consigue la piedra correspondiente.</li><li>Sube a lo alto de la <b>Torre Dragóspira</b> con la piedra en la mochila.</li><li>Interactúa con la piedra para liberar al dragón (Nv.70).</li><li>Si huyes o lo debilitas, <b>reaparece</b> tras volver a entrar en el Salón de la Fama.</li></ol>",
        "link": "legendarios",
        "mons": []
      }
    ]
  },
  {
    "area": "Abismo Sombrío",
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
        "d": "<ol><li>Captura a <b>Kyurem</b> en el cráter interior (Nv.70) y coge la <b>Punta ADN</b>.</li><li>Ten a Zekrom (o Reshiram) en el equipo.</li><li>Usa la Punta ADN sobre Kyurem: se fusiona en <b>Kyurem Negro</b> (con Zekrom) o <b>Kyurem Blanco</b> (con Reshiram).</li><li>Puedes separarlos cuando quieras sin perder al dragón absorbido.</li></ol>",
        "link": "legendarios",
        "mons": [
          646
        ]
      }
    ]
  },
  {
    "area": "Cuevas de Teselia",
    "name": "Espadachines: Cobalion, Virizion, Terrakion",
    "emoji": "⚔️",
    "goal": "Completa el trío de los tres mosqueteros.",
    "mons": [
      638,
      640,
      639
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "Orden de captura",
        "d": "<ol><li><b>Cobalion</b> Nv.45 en la <b>Ruta 13</b>.</li><li>Tratar con él activa a <b>Virizion</b> Nv.45 en la <b>Ruta 11</b>.</li><li>Y a <b>Terrakion</b> Nv.45 en la <b>Ruta 22</b>.</li></ol>",
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
    "name": "Keldeo y Tajo Sagrado",
    "emoji": "🦄",
    "goal": "Consigue al 4º mosquetero (mítico).",
    "mons": [
      647
    ],
    "highlights": [
      {
        "cat": "secret",
        "t": "Solo por evento",
        "d": "<b>Keldeo</b> es de distribución oficial. En emulador: inyecta el regalo (.pgf), edita con PKHeX o usa cheat. Con los tres espadachines en el equipo aprende <b>Tajo Sagrado</b> y pasa a su Forma Brío.",
        "link": "emulador",
        "mons": [
          647
        ]
      }
    ]
  },
  {
    "area": "Santuario Pradera",
    "name": "Trío del clima: Tornadus, Thundurus y Landorus",
    "emoji": "🌪️",
    "goal": "Reúne a los genios y consigue el Espejo Veraz.",
    "mons": [
      641,
      642,
      645
    ],
    "highlights": [
      {
        "cat": "catch",
        "t": "Cómo aparece Landorus",
        "d": "<ol><li>Consigue <b>Tornadus</b> y <b>Thundurus</b> (no nativos: transferencia de Negro/Blanco, Dream Radar o, en emulador, PKHeX/intercambio local).</li><li>Ponlos <b>ambos</b> en el equipo (con tu ID).</li><li>Entra en el <b>Santuario Pradera</b>: aparece <b>Landorus Nv.65</b>.</li></ol>",
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
        "d": "Lleva a Landorus al santuario y un anciano te dará el <b>Espejo Veraz</b>, que cambia a los tres genios entre Forma Avatar y la más fuerte Forma Tótem.",
        "link": "secretos",
        "mons": [
          645
        ]
      }
    ]
  },
  {
    "area": "Castillo Relic",
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
        "d": "<ol><li>Vuelve al <b>Castillo Relic</b> (Desierto Resort) en el postgame.</li><li>Baja hasta la sala más profunda.</li><li>Te espera <b>Volcarona Nv.35</b>, uno de los mejores especiales del juego. Solo hay uno: guarda antes.</li></ol>",
        "link": "legendarios",
        "mons": [
          637
        ]
      }
    ]
  },
  {
    "area": "Clay Tunnel",
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
        "d": "<ol><li><b>Regirock</b> Nv.65 en las <b>Ruinas Subterráneas</b> del Clay Tunnel (bajo Ciudad Esmalte; con Fuerza y Surf). Resuelve el puzle de losas.</li><li>Capturarlo te da la <b>Llave de Hierro</b> (Negro 2 → <b>Registeel</b>) o la <b>Llave de Hielo</b> (Blanco 2 → <b>Regice</b>), ambos Nv.65. La llave contraria se recibe por el Unova Link.</li></ol>",
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
        "d": "Con los <b>tres Regi</b> en el equipo, baja a lo más hondo del <b>Monte Espira</b> (Twist Mountain) para despertar a <b>Regigigas Nv.68</b>.",
        "link": "legendarios",
        "mons": [
          486
        ]
      }
    ]
  },
  {
    "area": "Ciudad Esmalte",
    "name": "Torneo Mundial de Combates (PWT)",
    "emoji": "🏆",
    "goal": "Compite contra líderes y campeones de todas las regiones.",
    "mons": [],
    "highlights": [
      {
        "cat": "secret",
        "t": "El gran reto competitivo",
        "d": "En Driftveil, el <b>PWT</b> ofrece torneos temáticos (Teselia, Kanto, campeones...). Recompensa con BP para comprar objetos raros y MT. Contenido estrella del postgame.",
        "link": "secretos",
        "mons": []
      }
    ]
  },
  {
    "area": "Ciudad Fayenza",
    "name": "Metro de Combate",
    "emoji": "🚉",
    "goal": "Encadena victorias en el metro para ganar BP.",
    "mons": [],
    "highlights": [
      {
        "cat": "secret",
        "t": "Rachas y BP",
        "d": "El <b>Metro de Combate</b> (individual, dobles, multi) es el sucesor de la Torre. Encadena combates para subir tu racha y ganar Puntos de Combate. Sin objetos de curación entre rondas: prepara un equipo autosuficiente.",
        "link": "secretos",
        "mons": []
      }
    ]
  },
  {
    "area": "Este del mapa",
    "name": "Torre Negra / Arboleda Blanca",
    "emoji": "🗼",
    "goal": "Supera el reto de combates por pisos exclusivo de tu versión.",
    "mons": [],
    "highlights": [
      {
        "cat": "secret",
        "t": "Reto por versión",
        "d": "En el postgame se abre un camino hacia la <b>Torre Negra</b> (Negro 2) o la <b>Arboleda Blanca</b> (Blanco 2): oleadas de entrenadores por pisos con jefes al final. Da experiencia y objetos, y sube de rango según tu progreso.",
        "link": "secretos",
        "mons": []
      }
    ]
  },
  {
    "area": "Undella Town",
    "name": "Combate contra Cynthia",
    "emoji": "💎",
    "goal": "Derrota a la ex-Campeona de Sinnoh en su villa.",
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
        "d": "<ol><li>Ve a la <b>villa de Cynthia</b> en Undella <b>en primavera</b>.</li><li>Su equipo (Garchomp, Spiritomb, Lucario, Milotic, Glaceon, Braviary/Eelektross) ronda Nv.70+.</li><li>Lleva coberturas variadas y objetos de sobra: es un test de nivel real.</li></ol>",
        "link": "secretos",
        "mons": [
          445,
          442,
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
        "t": "Victini (Isla Liberty)",
        "d": "El <b>Pase Liberty</b> (2011) llevaba a la Isla Liberty a capturar a <b>Victini</b>. En B2W2 la isla es accesible pero <b>Victini ya no aparece</b> sin evento/transferencia. En emulador: inyecta la Carta Regalo (.pgf) o el propio Victini con PKHeX. Si lo llevas a la isla, sale de la Ball y baila.",
        "link": "emulador",
        "mons": [
          494
        ]
      },
      {
        "cat": "secret",
        "t": "Solo distribución",
        "d": "<b>Meloetta</b> (aprende Canto Relicto en el Café de Fayenza para su Forma Danza) y <b>Genesect</b> (con Módulos que cambian Tecno Explosión) solo se obtenían por evento.",
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
    "area": "Puente Maravilla",
    "name": "Reserva Natural (Nature Preserve)",
    "emoji": "🌿",
    "goal": "Explora la reserva secreta con Pokémon poco comunes.",
    "mons": [
      132,
      221,
      465
    ],
    "highlights": [
      {
        "cat": "secret",
        "t": "Cruzando el Puente Maravilla",
        "d": "Al este, tras el <b>Puente Maravilla</b>, se abre la Reserva Natural: hierba con Pokémon inusuales (Ditto, Tangrowth, Piloswine...) y objetos ocultos. Perfecta para rellenar huecos de la Pokédex.",
        "link": "pokedex",
        "mons": [
          132,
          221,
          465
        ]
      }
    ]
  },
  {
    "area": "Toda Teselia",
    "name": "Cuevas Ocultas y Habilidades Ocultas",
    "emoji": "🔎",
    "goal": "Farmea Pokémon con Habilidad Oculta y objetos raros.",
    "mons": [],
    "highlights": [
      {
        "cat": "secret",
        "t": "Contenido rotativo",
        "d": "<ol><li>Localiza las <b>Cuevas Ocultas</b> repartidas por el mapa.</li><li>Su contenido rota con el tiempo real: ajusta el reloj del emulador para forzar cambios.</li><li>Consigues Pokémon con <b>Habilidad Oculta</b> (Eevee, Rufflet, Riolu...) y objetos raros.</li></ol>",
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
