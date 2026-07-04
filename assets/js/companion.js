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
    280:"Ralts",285:"Shroomish",287:"Slakoth",289:"Slaking",290:"Nincada",291:"Ninjask",292:"Shedinja",
    293:"Whismur",296:"Makuhita",299:"Nosepass",302:"Sableye",303:"Mawile",304:"Aron",
    309:"Electrike",310:"Manectric",318:"Carvanha",320:"Wailmer",322:"Numel",324:"Torkoal",66:"Machop",
    327:"Spinda",328:"Trapinch",330:"Flygon",331:"Cacnea",333:"Swablu",334:"Altaria",335:"Zangoose",
    337:"Lunatone",338:"Solrock",343:"Baltoy",349:"Feebas",350:"Milotic",352:"Kecleon",356:"Dusclops",
    357:"Tropius",359:"Absol",360:"Wynaut",365:"Walrein",371:"Bagon",373:"Salamence",374:"Beldum",
    376:"Metagross",230:"Kingdra",382:"Kyogre",383:"Groudon",384:"Rayquaza",170:"Chinchou"
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

  var STOPS = [
    { area:"Inicio", name:"Villa Raíz", emo:"🏡", mons:[258,255,252], hl:[
      { cat:"tip", t:"Elige inicial con cabeza", d:"<b>Mudkip</b> (→Marshtomp Agua/Tierra) es la curva más suave: domina los gimnasios de Roca, Lucha y es <b>inmune</b> al Eléctrico. <b>Torchic</b>→Blaziken (Fuego/Lucha) pega muchísimo pero sufre los 2 primeros gimnasios. <b>Treecko</b> para reto." },
      { cat:"item", t:"Zapatillas de correr", d:"Te las da tu madre. Mantén <b>B</b> para correr por todas partes." },
      { cat:"tip", t:"Ajusta bien el reloj interno", d:"El reloj (RTC) controla bayas, sorteos, mareas y la Isla Espejismo. Ponlo a tu hora real desde el principio." }
    ]},
    { area:"Ruta 101 · Pueblo Escaso", name:"Los primeros pasos", emo:"🌱", mons:[263,261], hl:[
      { cat:"boss", t:"Rescata al Prof. Abedul", d:"Coges un inicial de su mochila para salvarlo → recibes la <b>Pokédex</b> y 5 Poké Balls." },
      { cat:"catch", t:"Pilla un Zigzagoon", d:"Su habilidad <b>Recogida (Pickup)</b> te da objetos gratis (incluso raros) durante toda la partida. Uno en el equipo es oro.", mons:[263] }
    ]},
    { area:"Rutas 102–103", name:"Rival y capturas tempranas", emo:"⚔️", mons:[280], hl:[
      { cat:"boss", t:"Primer combate rival", d:"En la Ruta 103. Sin misterio, pero sube nivel antes." },
      { cat:"catch", t:"Ralts (raro, ~4%) en la Ruta 102", d:"Ten paciencia: <b>Gardevoir</b> es de lo mejor del juego (Psíquico durísimo) y te resuelve el 2.º gimnasio. Merece la caza.", mons:[280] }
    ]},
    { area:"Ruta 104 · Bosque Petalia", name:"El bosque", emo:"🌳", mons:[285,287,265], hl:[
      { cat:"secret", t:"Wurmple: la evolución es aleatoria", d:"No depende del nivel sino del <b>valor de personalidad</b>: hacia Silcoon/Beautifly o Cascoon/Dustox. Si quieres uno concreto, captura varios.", mons:[265] },
      { cat:"catch", t:"Shroomish y Slakoth", d:"<b>Shroomish</b>→Breloom (Planta/Lucha) es un monstruo. <b>Slakoth</b>→Slaking pega brutal pero con Ausente (turno sí, turno no).", mons:[285,287] },
      { cat:"tip", t:"Planta bayas YA", d:"En la parcela de la florista de la Ruta 104. Tardan en crecer y las necesitarás para Pokoblocks y para <b>Milotic</b> en el postgame." }
    ]},
    { area:"Ciudad Férrica", name:"Gimnasio 1 · Petra (Roca)", emo:"🥇", gym:"Piedra", mons:[299], hl:[
      { cat:"boss", t:"Petra — tipo Roca", d:"Marshtomp/Lombre la barren con Agua+Planta. Premio: Medalla Piedra y <b>MT39 Bola Roca</b>.", mons:[299] },
      { cat:"item", t:"⭐ Repartir Experiencia (Exp. Share)", d:"Tras devolver los <b>Bienes de Devon</b>, el Sr. Stone te lo regala en Devon Corp. Póntelo a un Pokémon flojo y súbelo sin esfuerzo. ¡Objeto clave que mucha gente se pierde!" },
      { cat:"item", t:"MO01 Corte", d:"En la casa junto a la entrada del bosque (el 'cortador'). Necesaria para avanzar." }
    ]},
    { area:"Ruta 116 · Túnel Rusturf", name:"Nincada y el truco Shedinja", emo:"🕳️", mons:[290,291,292], hl:[
      { cat:"secret", t:"🥷 Consigue Shedinja gratis", d:"Captura <b>Nincada</b> y evoluciónalo (Nv. 20) a Ninjask: si tienes <b>un hueco libre en el equipo y una Poké Ball de sobra</b>, aparecerá también un <b>Shedinja</b> (Superguarda: solo le dañan ataques supereficaces).", mons:[290,291,292] },
      { cat:"catch", t:"Whismur y Skitty", d:"Whismur→Exploud (buen especial). Skitty es raro pero majo.", mons:[293] },
      { cat:"item", t:"Recuerda: MO04 Fuerza está aquí", d:"Rescatas a Peeko del recluta. La MO Fuerza también vive en este túnel, pero para cogerla necesitarás <b>Golpe Roca</b> (3.ª medalla). Anótalo y vuelve." }
    ]},
    { area:"Pueblo Azuliza", name:"Gimnasio 2 · Marcial (Lucha)", emo:"🥊", gym:"Puño", mons:[296], hl:[
      { cat:"boss", t:"Marcial — tipo Lucha", d:"Volador o <b>Psíquico</b> (¡tu Ralts!) lo destrozan. Premio: Medalla Puño y <b>MT08 Corpulencia</b>.", mons:[296] },
      { cat:"item", t:"Caña Vieja", d:"Un pescador del pueblo te la da. Empieza a pescar Magikarp/Tentacool." },
      { cat:"secret", t:"🎣 La frase de moda de Azuliza", d:"El chico 'moderno' fija una frase de moda que, en el postgame, determina las 6 casillas donde vive <b>Feebas</b>. Tenlo presente." }
    ]},
    { area:"Cueva Granito", name:"Minerales y bichos raros", emo:"⛏️", mons:[304,303,302], hl:[
      { cat:"boss", t:"Entrega la carta a Steven", d:"En el fondo de la cueva. Coge de un excursionista la <b>MO05 Destello</b> y úsala para ver dentro." },
      { cat:"catch", t:"Aron, Mawile y Sableye", d:"<b>Aron</b>→Aggron (Acero/Roca, tanque). En Esmeralda salen <b>tanto Mawile como Sableye</b>, exclusivos de Rubí/Zafiro respectivamente.", mons:[304,303,302] }
    ]},
    { area:"Ciudad Portual", name:"Mercado, museo y concursos", emo:"⚓", mons:[320,318], hl:[
      { cat:"boss", t:"Team Aqua/Magma en el Museo Oceánico", d:"Combate de trama. De paso, sube nivel." },
      { cat:"item", t:"Borra-movimientos y tutores", d:"Aquí puedes borrar MOs y aprender movimientos. Consigue la <b>Caja Monedas</b> para el Casino." },
      { cat:"catch", t:"Wailmer y Carvanha", d:"Pescando/surfeando. <b>Carvanha</b>→Sharpedo (Agua/Siniestro) es un atacante rapidísimo.", mons:[320,318] }
    ]},
    { area:"Ruta 110", name:"Casa del Timo y la bici", emo:"🚲", mons:[309], hl:[
      { cat:"secret", t:"🏠 La Casa del Timo (no la olvides)", d:"El Trick Master abre un <b>puzzle nuevo tras CADA medalla</b>. Vuelve después de cada gimnasio y llévate MTs y objetos. Muy fácil de pasar por alto." },
      { cat:"item", t:"Tu primera bici", d:"Rydel (en Malvalona) te da <b>Mach</b> (velocidad) o <b>Acro</b> (saltos). Cámbiala gratis cuando la necesites." },
      { cat:"catch", t:"Electrike", d:"→Manectric (Eléctrico rápido). Útil contra Voladores y Aguas.", mons:[309] }
    ]},
    { area:"Malvalona", name:"Gimnasio 3 · Erico (Eléctrico)", emo:"⚡", gym:"Dínamo", mons:[310], hl:[
      { cat:"boss", t:"Erico — tipo Eléctrico", d:"Marshtomp/Tierra es <b>inmune</b> al Eléctrico: paseo. Premio: Medalla Dínamo y <b>MT34 Onda Voltio</b>.", mons:[310] },
      { cat:"item", t:"MO06 Golpe Roca", d:"Te la da un hombre. Ahora vuelve al <b>Túnel Rusturf</b> a por la MO04 Fuerza que dejaste pendiente." },
      { cat:"secret", t:"Nueva Malvalona (New Mauville)", d:"Erico te pide arreglar la central: dentro hay objetos, <b>Voltorb/Magnemite</b> y un buen premio. Contenido opcional que casi nadie visita." }
    ]},
    { area:"Rutas 111–112 · Camino Ardiente", name:"Monte Cenizo", emo:"🌋", mons:[322,324,66], hl:[
      { cat:"catch", t:"Numel, Torkoal, Machop", d:"En el Camino Ardiente. <b>Torkoal</b> (Fuego, gran defensa) solo aquí; <b>Machop</b>→Machamp por intercambio.", mons:[322,324,66] },
      { cat:"boss", t:"Aqua/Magma en la cima", d:"Detén su plan → consigues el <b>Meteorito</b>." }
    ]},
    { area:"Lavacalda", name:"Gimnasio 4 · Candela (Fuego)", emo:"♨️", gym:"Calor", mons:[324], hl:[
      { cat:"missable", t:"🥚 Huevo de Wynaut (¡no te lo saltes!)", d:"En las <b>aguas termales</b>, una anciana te regala un Huevo que nace en <b>Wynaut</b>. Único y fácil de perderse.", mons:[360] },
      { cat:"boss", t:"Candela — tipo Fuego", d:"Agua/Tierra/Roca. Premio: Medalla Calor y <b>MT50 Sofoco</b>.", mons:[324] },
      { cat:"item", t:"Gafas Protectoras (Go-Goggles)", d:"Tras el Monte Cenizo, tu rival te las da para cruzar la tormenta de arena del desierto." }
    ]},
    { area:"Ruta 111 · Desierto", name:"Fósiles y joyas del desierto", emo:"🏜️", mons:[328,330,331], hl:[
      { cat:"catch", t:"⭐ Trapinch → Flygon", d:"<b>Trapinch</b> (Vibrava→<b>Flygon</b>, Tierra/Dragón) es de los mejores de toda la partida. También Cacnea, Sandshrew y Baltoy.", mons:[328,330,331] },
      { cat:"item", t:"Torre Espejismo y un fósil", d:"Sube con la <b>Acro Bike</b> y elige <b>Garra</b> (→Anorith) o <b>Raíz</b> (→Lileep). El otro llega en el postgame. Revívelo en el Museo de Devon (Portual)." },
      { cat:"secret", t:"MT43 Daño Secreto → Base Secreta", d:"Una chica en una casa del desierto te la da; con ella creas y decoras tu <b>Base Secreta</b>." }
    ]},
    { area:"Petalia", name:"Gimnasio 5 · Normo (Normal)", emo:"🏅", gym:"Equilibrio", mons:[289], hl:[
      { cat:"boss", t:"Tu padre Normo — tipo Normal", d:"Necesitas 4 medallas para entrar. <b>Slaking</b> descansa turno sí/turno no (Ausente): pega fuerte en su descanso. Lucha lo revienta. Premio: Medalla Equilibrio y <b>MT42 Cara Susto</b>.", mons:[289] }
    ]},
    { area:"Rutas 118–119 · Casa del Tiempo", name:"Camino a Arborada", emo:"🌧️", mons:[357,352,349], hl:[
      { cat:"item", t:"MO02 Vuelo", d:"Una chica de la Ruta 119 te la da. A partir de aquí te mueves volando entre ciudades." },
      { cat:"catch", t:"Kecleon invisible + Devon Scope", d:"En la Ruta 120 consigues el <b>Devon Scope</b>: revela a <b>Kecleon</b> (uno bloquea el puente a Arborada). Captúralo, es único por zona.", mons:[352,357] },
      { cat:"secret", t:"🐟 Feebas ya está aquí", d:"Vive solo en <b>6 casillas al azar</b> de la Ruta 119 y solo pica con caña. Puedes empezar a buscarlo ya o dejarlo para el 100% postgame.", mons:[349] },
      { cat:"item", t:"Caña Buena", d:"Un pescador de la Ruta 118 te la da. Mejores capturas de agua." }
    ]},
    { area:"Arborada", name:"Gimnasio 6 · Alana (Volador)", emo:"🪶", gym:"Pluma", mons:[334], hl:[
      { cat:"boss", t:"Alana — tipo Volador", d:"Eléctrico/Hielo/Roca. Su <b>Altaria</b> es Dragón: el Hielo lo funde. Premio: Medalla Pluma y <b>MT40 Golpe Aéreo</b>.", mons:[334] },
      { cat:"catch", t:"Swablu → Altaria", d:"En rutas cercanas. Altaria (Dragón/Volador) es sólido y bonito para concursos.", mons:[333] }
    ]},
    { area:"Rutas 120–121 · Monte Pírico", name:"Safari y Lilycove", emo:"🎡", mons:[335], hl:[
      { cat:"catch", t:"🏞️ Zona Safari (Lilycove)", d:"Botín enorme: <b>Pikachu, Pinsir, Heracross, Rhyhorn, Phanpy, Miltank</b>… Lleva Balls Safari y paciencia." },
      { cat:"boss", t:"Monte Pírico", d:"Frena a Aqua/Magma; consigues el <b>Orbe Rojo/Azul</b>." },
      { cat:"item", t:"Caña Súper", d:"Un pescador de la Ruta 121 te la da: la pesca definitiva." }
    ]},
    { area:"Algaria", name:"Gimnasio 7 · Vito y Leti (Psíquico)", emo:"🧠", gym:"Mente", mons:[338,337], hl:[
      { cat:"boss", t:"Combate DOBLE contra los gemelos", d:"Lleva ataques en <b>área</b> y tipos Siniestro/Fantasma/Bicho. Solrock+Lunatone se apoyan mutuamente. Premio: Medalla Mente y <b>MT04 Paz Mental</b>.", mons:[338,337] },
      { cat:"item", t:"MO07 Buceo", d:"Te la da Steven. Imprescindible para el resto del juego." },
      { cat:"catch", t:"⭐ Beldum en casa de Steven", d:"Steven te regala un <b>Beldum</b> (→Metang→<b>Metagross</b>, Acero/Psíquico, top competitivo). No salgas de Algaria sin él.", mons:[374,376] }
    ]},
    { area:"Rutas 124–128 · Bajo el mar", name:"Cueva Submarina y Rayquaza", emo:"🌊", mons:[384,371], hl:[
      { cat:"boss", t:"Se despierta el gigante", d:"En la <b>Cueva del Origen del Mar</b> se libera Kyogre/Groudon y el clima se descontrola." },
      { cat:"boss", t:"🐉 Rayquaza en la Torre Celeste", d:"Ve a la cima con la <b>Mach Bike</b> (por los suelos que se rompen, sin frenar) para calmar el caos. Puedes capturarlo aquí (Nv. 70).", mons:[384] },
      { cat:"catch", t:"Buceo: Relicanth y Clamperl", d:"<b>Relicanth</b> es una de las 'llaves' para desbloquear los Regis en el postgame. Clamperl→Huntail/Gorebyss por intercambio con objeto." }
    ]},
    { area:"Arrecípolis", name:"Gimnasio 8 · Galán/Juan (Agua)", emo:"💧", gym:"Lluvia", mons:[230], hl:[
      { cat:"boss", t:"Juan — tipo Agua", d:"Planta/Eléctrico. Su <b>Kingdra</b> (Agua/Dragón) es durísimo: usa Dragón/Hada o combina Hielo+Planta. Premio: Medalla Lluvia y <b>MT03 Hidropulso</b>.", mons:[230] },
      { cat:"item", t:"MO08 Cascada", d:"Tras resolver la crisis. Te abre el Camino Victoria." }
    ]},
    { area:"Camino Victoria · Calagua", name:"Alto Mando y Campeona", emo:"👑", mons:[359,356,365,373,350], hl:[
      { cat:"boss", t:"Los 4 + la Campeona, sin curar entre medias", d:"<b>Sixto</b> (Siniestro) → <b>Fátima</b> (Fantasma) → <b>Glacia</b> (Hielo) → <b>Dracón</b> (Dragón) → Campeona <b>Alana</b> (Agua). Lleva muchos <b>Restaurar Todo</b> y Éter.", mons:[359,356,365,373,350] },
      { cat:"tip", t:"Dos ataques resuelven media Liga", d:"Un buen <b>Hielo</b> arrasa a Dracón (Dragones) y <b>Eléctrico/Planta</b> hunde el equipo Agua de Alana." }
    ]},
    { area:"¡Postgame!", name:"Empieza el 100% de verdad", emo:"🏆", mons:[382,383,380], hl:[
      { cat:"secret", t:"Se abre todo el contenido secreto", d:"Legendarios (Regis, Kyogre/Groudon, Latios/Latias, y de evento Deoxys/Mew/Ho-Oh/Lugia), <b>Frontera de Batalla</b>, Pokédex Nacional y Feebas→Milotic.", mons:[382,383,380] },
      { cat:"tip", t:"Continúa en la guía de referencia", d:"Toda la ruta del 100% postgame (puzzles, tickets, símbolos…) está en la <a href='index.html'>guía completa</a>." }
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
      // abrir por defecto: el actual, o todos los que casan cuando hay filtro
      var open = (filter !== "all" && visibleHls.length) || i === current;

      var hlsHTML = visibleHls.map(function (h) {
        var c = CAT[h.cat];
        var mons = h.mons ? '<div class="wt-hl__mons">' + h.mons.map(function (id) { return spriteHTML(id, true); }).join("") + '</div>' : "";
        return '<div class="wt-hl cat-' + h.cat + '">' +
          '<div class="wt-hl__ic">' + c.ic + '</div>' +
          '<div class="wt-hl__main">' +
          '<div class="wt-hl__t">' + h.t + ' <span class="wt-hl__tag">' + c.tag + '</span></div>' +
          '<div class="wt-hl__d">' + h.d + '</div>' + mons +
          '</div></div>';
      }).join("");

      var sprites = (stop.mons || []).slice(0, 5).map(function (id) { return spriteHTML(id); }).join("");
      var gymBadge = stop.gym ? '<span class="wt-badge-gym">🏅 ' + stop.gym + '</span>' : "";

      return '<div class="wt-stop ' + stateCls + (hidden ? ' wt-hidden' : '') + '" data-i="' + i + '"' + (hidden ? ' style="display:none"' : '') + '>' +
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
            hlsHTML +
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
    var toggle = e.target.closest("[data-toggle]");
    var hereBtn = e.target.closest("[data-here]");
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
      var card = toggle.closest(".wt-card");
      card.classList.toggle("open");
    }
  });

  // chips de filtro
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

  // Ir al paso actual al cargar (si no es el primero)
  if (current > 0) {
    setTimeout(function () {
      var el = timeline.querySelector('.wt-stop[data-i="' + current + '"]');
      if (el) el.scrollIntoView({ behavior: "auto", block: "center" });
    }, 60);
  }
})();
