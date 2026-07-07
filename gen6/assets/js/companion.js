/* =====================================================================
   Compañera de juego — Kalos (Pokémon X / Y) · datos de la ruta + interacción
   ===================================================================== */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var SPRITE = function (id) {
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/" + id + ".png";
  };

  var NAME = {"1":"Bulbasaur","4":"Charmander","7":"Squirtle","25":"Pikachu","131":"Lapras","132":"Ditto","133":"Eevee","143":"Snorlax","144":"Articuno","145":"Zapdos","146":"Moltres","150":"Mewtwo","282":"Gardevoir","359":"Absol","447":"Riolu","448":"Lucario","460":"Abomasnow","650":"Chespin","651":"Quilladin","652":"Chesnaught","653":"Fennekin","654":"Braixen","655":"Delphox","656":"Froakie","657":"Frogadier","658":"Greninja","659":"Bunnelby","661":"Fletchling","663":"Talonflame","664":"Scatterbug","666":"Vivillon","667":"Litleo","668":"Pyroar","669":"Flabébé","671":"Florges","672":"Skiddo","673":"Gogoat","674":"Pancham","675":"Pangoro","676":"Furfrou","677":"Espurr","678":"Meowstic","679":"Honedge","681":"Aegislash","682":"Spritzee","683":"Aromatisse","684":"Swirlix","685":"Slurpuff","686":"Inkay","687":"Malamar","688":"Binacle","689":"Barbaracle","690":"Skrelp","692":"Clauncher","694":"Helioptile","695":"Heliolisk","696":"Tyrunt","697":"Tyrantrum","698":"Amaura","699":"Aurorus","700":"Sylveon","701":"Hawlucha","702":"Dedenne","703":"Carbink","704":"Goomy","706":"Goodra","707":"Klefki","708":"Phantump","710":"Pumpkaboo","711":"Gourgeist","712":"Bergmite","713":"Avalugg","714":"Noibat","715":"Noivern","716":"Xerneas","717":"Yveltal","718":"Zygarde","719":"Diancie","720":"Hoopa","721":"Volcanion"};

  // Categorías: boss, catch, item, secret, missable, tip
  var CAT = {
    boss:    { ic:"🥊", tag:"Combate",  label:"Combates" },
    catch:   { ic:"🎯", tag:"Captura",  label:"Capturas" },
    item:    { ic:"🎁", tag:"Objeto",   label:"Objetos"  },
    secret:  { ic:"🗝️", tag:"Secreto",  label:"Secretos" },
    missable:{ ic:"⚠️", tag:"No perder",label:"No perder"},
    tip:     { ic:"💡", tag:"Consejo",  label:"Consejos" }
  };

  // atajos de enlaces a la guía de referencia (por palabra clave de sección)
  var L = {
    gimnasios:  { t:"Los 8 Gimnasios", href:"index.html#gimnasios" },
    liga:       { t:"Alto Mando y Campeona", href:"index.html#liga" },
    legendarios:{ t:"Legendarios de Kalos", href:"index.html#legendarios" },
    secretos:   { t:"Secretos de Kalos", href:"index.html#secretos" },
    pokedex:    { t:"Completar la Pokédex", href:"index.html#pokedex" },
    emulador:   { t:"Emulador y trucos", href:"index.html#emulador" }
  };

  /* ---------------- Datos originales (formato del contenido) ---------------- */
  var ROUTE_STOPS = [{"area":"Kalos Central","name":"Pueblo Boceto","emoji":"🏡","goal":"Salir de casa, conocer a tus vecinos y arrancar la aventura.","gym":"","mons":[650,653,656],"highlights":[{"cat":"tip","t":"Ajusta bien la hora del sistema","d":"Muchos eventos de Kalos dependen del reloj: <b>megapiedras (20:00-21:00)</b>, crecimiento de bayas, fases del Safari y aves errantes. En emulador, configura una hora coherente desde el principio.","link":"secretos"},{"cat":"tip","t":"AZ volverá aquí","d":"Recuerda este pueblo: tras la Liga, el gigante <b>AZ</b> aparece aquí para un combate y te regala un Floette especial.","link":"secretos","mons":[671]}]},{"area":"Kalos Central","name":"Pueblo Acuarela","emoji":"🎨","goal":"Elegir inicial, recibir la Pokédex y unirte a tus compañeros.","gym":"","mons":[650,653,656],"highlights":[{"cat":"tip","t":"Elige inicial con cabeza","d":"<b>Chespin</b>→Chesnaught (Planta/Lucha, tanque), <b>Fennekin</b>→Delphox (Fuego/Psíquico, atacante especial), <b>Froakie</b>→Greninja (Agua/Siniestro, velocista letal). Greninja es el más cómodo para toda la historia.","link":"","mons":[652,655,658]},{"cat":"secret","t":"Tu inicial decide tu ave legendaria","d":"El postgame te da un ave según el inicial: <b>Chespin→Articuno</b>, <b>Fennekin→Zapdos</b>, <b>Froakie→Moltres</b>. Tenlo en cuenta si quieres una concreta.","link":"legendarios","mons":[144,145,146]},{"cat":"item","t":"Pokédex y Poké Balls","d":"La ayudante de Ciprés te da la <b>Pokédex</b> y tus primeras Poké Balls. A partir de aquí, a capturar.","link":""}]},{"area":"Kalos Central","name":"Rutas 1-2 y Bosque de Novarte","emoji":"🌳","goal":"Cruzar el bosque camino de Ciudad Novarte y empezar tu equipo.","gym":"","mons":[25,664,661],"highlights":[{"cat":"catch","t":"Pikachu, solo aquí de momento","d":"En el <b>Bosque de Novarte</b> aparece Pikachu, un eléctrico temprano estupendo. También Caterpie/Weedle, Pansear y Fletchling.","link":"","mons":[25]},{"cat":"catch","t":"Empieza tu Vivillon (20 patrones)","d":"Captura <b>Scatterbug</b>; evoluciona a Spewpa y luego a Vivillon, cuyo patrón de alas depende de la región del sistema. Hay <b>20 patrones</b> (18 regionales, el tuyo Continental en España, más Fancy y Poké Ball de evento). El resto se consigue por intercambio o con PKHeX.","link":"secretos","mons":[664,666]},{"cat":"item","t":"Barre objetos por el suelo","d":"Hay Poké Balls, Antídotos y bayas ocultas. Habla con el explorador para recibir MTs y objetos de ayuda.","link":""}]},{"area":"Kalos Central","name":"Ciudad Novarte (Santalune)","emoji":"🐛","goal":"Vencer a Violeta y ganar tu primera medalla.","gym":"Medalla Bicho","mons":[666,661,659],"highlights":[{"cat":"boss","t":"Gimnasio: Violeta (Bicho)","d":"Equipo: <b>Surskit (Nv10)</b> y <b>Vivillon (Nv12)</b>. Usa Fuego, Volador o Roca. Recompensa: <b>MT83 Acoso</b> y la Medalla Bicho.","link":"gimnasios","mons":[666]},{"cat":"item","t":"Rollerpatín y boutique","d":"Aquí desbloqueas el rollerpatín para moverte rápido y la primera tienda de ropa para personalizar tu personaje.","link":""},{"cat":"tip","t":"Explora la Ruta 22 al oeste","d":"Camino sin salida útil para entrenar y capturar (Bunnelby, Mankey). Vuelve luego con MO para rincones con objetos.","link":"","mons":[659]}]},{"area":"Kalos Central","name":"Ciudad Luminalia (1ª visita)","emoji":"🗼","goal":"Visitar el laboratorio de Ciprés y hacerte con un inicial de Kanto.","gym":"","mons":[1,4,7],"highlights":[{"cat":"missable","t":"Inicial de Kanto + Megapiedra GRATIS","d":"El Prof. Ciprés te regala <b>Bulbasaur, Charmander o Squirtle</b> y su Megapiedra (Venusaurita / Charizardita / Blastoisita). <b>Solo eliges uno</b> por partida.","link":"secretos","mons":[1,4,7]},{"cat":"secret","t":"Charizard tiene dos Megas","d":"Si eliges Charmander: en <b>X</b> recibes la Charizardita X (Fuego/Dragón) y en <b>Y</b> la Charizardita Y (Fuego/Volador).","link":"secretos","mons":[4]},{"cat":"tip","t":"El gimnasio está cerrado aún","d":"El gimnasio de Lem (5º) no se abre hasta más adelante. Vuelve luego a esta ciudad enorme por boutiques, cafés y el Hotel Richissime.","link":"gimnasios"}]},{"area":"Kalos Central","name":"Pueblo Vánitas y Palacio Vergel","emoji":"🏰","goal":"Despertar al Snorlax dormido y explorar el palacio.","gym":"","mons":[143,676],"highlights":[{"cat":"missable","t":"Snorlax bloquea la Ruta 7","d":"Consigue la <b>Flauta Poké</b> en el Palacio Vergel y despierta al <b>Snorlax (Nv15)</b> para combatirlo/capturarlo. Es único; guarda antes.","link":"secretos","mons":[143]},{"cat":"item","t":"Palacio Vergel (Parfum Palace)","d":"Ayuda al chico rico a encontrar su <b>Furfrou</b> y explora los jardines por objetos, dinero y TMs.","link":"","mons":[676]},{"cat":"tip","t":"Guardería en la Ruta 7","d":"Deja Pokémon para criar Huevos y subir de nivel de forma pasiva. Al lado hay campos de bayas.","link":""}]},{"area":"Kalos Costa","name":"Cueva Conexión, Ruta 8 y Pueblo Petroglifo","emoji":"🐚","goal":"Llegar a la costa, recoger un fósil y visitar el acuario.","gym":"","mons":[696,698,688],"highlights":[{"cat":"catch","t":"Elige tu fósil","d":"En el Instituto Paleontológico revives fósiles: <b>Fósil Mandíbula→Tyrunt</b> (Roca/Dragón) o <b>Fósil Aleta→Amaura</b> (Roca/Hielo). Hallarás más en la Cueva Brillante.","link":"","mons":[696,698]},{"cat":"catch","t":"Agua de la Ruta 8","d":"Aparecen Binacle, Inkay y los exclusivos de versión <b>Clauncher (X)</b> / <b>Skrelp (Y)</b>. Buen momento para variar el equipo.","link":"","mons":[688,692,690,686]},{"cat":"secret","t":"Magikarp dorado en el acuario","d":"En la planta baja del acuario hay una gran estatua de un <b>Magikarp variocolor (dorado)</b>. Guiño para cazadores de shiny.","link":"secretos"}]},{"area":"Kalos Costa","name":"Ruta 9 y Cueva Brillante","emoji":"⛏️","goal":"Primer encontronazo con el Team Flare y más fósiles.","gym":"","mons":[686,687,696],"highlights":[{"cat":"boss","t":"El Team Flare aparece","d":"Roban fósiles en la cueva. Combates contra reclutas con tipos Siniestro/Veneno; nada complicado pero trae curas.","link":""},{"cat":"secret","t":"Malamar por giro de consola","d":"Captura <b>Inkay</b> aquí y evoluciónalo a <b>Malamar</b> girando la 3DS al subir a Nv30. En emulador, activa el giroscopio en ese instante.","link":"emulador","mons":[686,687]},{"cat":"item","t":"Fósiles y objetos raros","d":"La Cueva Brillante esconde fósiles adicionales y objetos de evolución. Explórala entera antes de salir.","link":""}]},{"area":"Kalos Costa","name":"Ruta 10 y Ciudad Relieve (Cyllage)","emoji":"🪨","goal":"Conseguir la bici y vencer a Lino (Roca).","gym":"Medalla Muro","mons":[697,699,133],"highlights":[{"cat":"boss","t":"Gimnasio: Lino (Roca)","d":"Gimnasio de escalada. Lleva <b>Amaura (Nv25)</b> y su as <b>Tyrunt (Nv25)</b> (igual en ambas versiones). Usa Agua, Planta, Acero o Lucha. Premio: <b>MT39 Trampa Rocas</b> y Medalla Muro.","link":"gimnasios","mons":[697,699]},{"cat":"item","t":"Bicicleta gratis","d":"En la tienda de bicis de la ciudad te regalan la <b>Bicicleta</b>. Acelera muchísimo el resto del juego.","link":""},{"cat":"catch","t":"Eevee y sus 8 evoluciones","d":"En la <b>Ruta 10</b> aparece Eevee. Captura varios: con afecto + movimiento Hada se vuelve <b>Sylveon</b>; también Vaporeon/Jolteon/Flareon (piedras), Espeon/Umbreon (afecto día/noche), <b>Leafeon</b> (musgo de la Cueva Reflejo) y <b>Glaceon</b> (roca helada de la Gruta Helada). Cría con Ditto para completarlas todas.","link":"secretos","mons":[133,700]}]},{"area":"Kalos Costa","name":"Cueva Reflejo y Ciudad Yantra (Shalour)","emoji":"✊","goal":"Obtener la Megaevolución y vencer a Corelia (Lucha).","gym":"Medalla Lid","mons":[448,447,703],"highlights":[{"cat":"item","t":"Anillo Mega + Lucario (regalo)","d":"En la <b>Torre Maestría</b> te dan un <b>Riolu/Lucario</b> y el <b>Anillo Mega</b> con la Lucarita: ¡ya puedes megaevolucionar!","link":"secretos","mons":[447,448]},{"cat":"boss","t":"Gimnasio: Corelia (Lucha)","d":"Mienfoo (Nv29), Machoke (Nv28) y su as <b>Hawlucha (Nv32)</b>. Usa Psíquico, Hada, Volador o Eléctrico. El Lucario y el Anillo Mega te los dan aparte, en la Torre Maestría. Premio: <b>MT98 Puño Incremento</b>.","link":"gimnasios","mons":[701]},{"cat":"secret","t":"Vuelve tras la Liga","d":"Corelia mejora tu Anillo Mega en el postgame para hallar megapiedras de <b>20:00 a 21:00</b>.","link":"secretos"}]},{"area":"Kalos Costa","name":"Ruta 12 y Ciudad Témpera (Coumarine)","emoji":"🌿","goal":"Conseguir un Lapras y vencer a Amaro (Planta).","gym":"Medalla Hoja","mons":[673,131,676],"highlights":[{"cat":"missable","t":"Lapras GRATIS","d":"Un hombre en una casa de la <b>Ruta 12</b> te regala un <b>Lapras</b> (Agua/Hielo). Es único y sirve de MO surf/cascada; no te lo pierdas.","link":"secretos","mons":[131]},{"cat":"boss","t":"Gimnasio: Amaro (Planta)","d":"Jumpluff, Weepinbell y <b>Gogoat (Nv34)</b>. Fuego, Hielo y Volador lo barren. Premio: <b>MT86 Hierba Lazo</b> y Medalla Hoja.","link":"gimnasios","mons":[673]},{"cat":"tip","t":"Monorraíl y zona alta","d":"Un monorraíl divide la ciudad en dos niveles; explora ambos por objetos y entrenadores.","link":""}]},{"area":"Kalos Central","name":"Ruta 13 y Gimnasio de Luminalia","emoji":"⚡","goal":"Volver a Luminalia y superar el 5º gimnasio.","gym":"Medalla Voltaje","mons":[695,702],"highlights":[{"cat":"boss","t":"Gimnasio: Lem (Eléctrico)","d":"Resuelve el mini-quiz del ascensor. Equipo con Emolga, Magneton y <b>Heliolisk (Nv37)</b>. Un tipo <b>Tierra</b> es inmune a sus ataques. Premio: <b>MT24 Rayo</b>.","link":"gimnasios","mons":[695]},{"cat":"catch","t":"Dedenne por la zona","d":"Captura <b>Dedenne</b> (Eléctrico/Hada), útil y con habilidad de recoger bayas. La Ruta 13 es un desierto con arenas movedizas: cuidado.","link":"","mons":[702]}]},{"area":"Kalos Montaña","name":"Ruta 15, Hotel Abandonado y Fábrica de Poké Balls","emoji":"🏭","goal":"Frenar al Team Flare en la fábrica y explorar el hotel.","gym":"","mons":[686,687,708],"highlights":[{"cat":"boss","t":"Team Flare en la Fábrica","d":"Derrota a los reclutas y admins que asaltan la <b>Fábrica de Poké Balls</b>. Consigues Poké Balls especiales de recompensa.","link":""},{"cat":"secret","t":"Hotel Abandonado (Lost Hotel)","d":"Refugio de entrenadores punk (por la noche). Esconde MTs valiosas, objetos y patines/skates. Explóralo entero.","link":"secretos"},{"cat":"catch","t":"Fantasmas nocturnos","d":"Por las Rutas 14-16 aparecen <b>Phantump</b> y <b>Pumpkaboo</b>, que evolucionan por intercambio.","link":"emulador","mons":[708,710]}]},{"area":"Kalos Montaña","name":"Ciudad Romantis (Laverre)","emoji":"🎀","goal":"Vencer a Valeria (Hada).","gym":"Medalla Hada","mons":[700,683,685],"highlights":[{"cat":"boss","t":"Gimnasio: Valeria (Hada)","d":"Mawile, Mr. Mime y <b>Sylveon (Nv42)</b>. Acero y Veneno resisten y pegan fuerte. Premio: <b>MT99 Brillo Mágico</b> y Medalla Hada.","link":"gimnasios","mons":[700]},{"cat":"catch","t":"Spritzee/Swirlix (exclusivos)","d":"<b>Swirlix (X)</b> / <b>Spritzee (Y)</b>. Evolucionan a Slurpuff/Aromatisse solo por <b>intercambio con objeto</b> (Nata Montada / Aromático).","link":"emulador","mons":[684,682,685,683]}]},{"area":"Kalos Montaña","name":"Ruta 16 y Pueblo Fresco (Dendemille)","emoji":"🌬️","goal":"Preparar la subida nevada hacia la Gruta Helada.","gym":"","mons":[704,714,703],"highlights":[{"cat":"catch","t":"Goomy → Goodra (pseudolegendario)","d":"Captura <b>Goomy</b> en zonas húmedas. Sliggoo evoluciona a <b>Goodra</b> subiendo de nivel <b>con lluvia</b> (Nv50). Es de los mejores del equipo.","link":"secretos","mons":[704,706]},{"cat":"catch","t":"Noibat en cuevas","d":"<b>Noibat</b> aparece en cuevas oscuras y evoluciona a Noivern (Nv48), gran volador rápido.","link":"","mons":[714,715]},{"cat":"tip","t":"La Ruta 17 se cruza sobre un Mamoswine","d":"La nieve profunda solo se atraviesa montando un Mamoswine automáticamente. Prepárate para el frío y el Team Flare.","link":""}]},{"area":"Kalos Montaña","name":"Gruta Helada (Frost Cavern)","emoji":"❄️","goal":"Echar al Team Flare y capturar tipos Hielo.","gym":"","mons":[460,712,703],"highlights":[{"cat":"boss","t":"Team Flare secuestra a un Abomasnow","d":"Derrota al admiral del Team Flare que ha capturado a un <b>Abomasnow</b> por su energía. Trae Pokémon de Fuego/Acero.","link":"","mons":[460]},{"cat":"catch","t":"Tipos Hielo","d":"<b>Bergmite</b> (→Avalugg), Cryogonal, Snover y Vanillite. Útiles para el gimnasio de Dragón/Volador y para la Liga.","link":"","mons":[712]},{"cat":"item","t":"Objetos de hielo y MTs","d":"La cueva esconde MTs y objetos ocultos entre las estalactitas. Explora los recovecos.","link":""}]},{"area":"Kalos Montaña","name":"Ciudad Fluxus (Anistar)","emoji":"🔮","goal":"Vencer a Ástrid (Psíquico) y desatar la fase final.","gym":"Medalla Psique","mons":[678,703],"highlights":[{"cat":"boss","t":"Gimnasio: Ástrid (Psíquico)","d":"Sigilyph, Slowking y <b>Meowstic ♂/♀ (Nv48)</b>. Siniestro, Fantasma, Bicho y Hada la superan. Premio: <b>MT04 Paz Mental</b> y Medalla Psique.","link":"gimnasios","mons":[678]},{"cat":"secret","t":"El reloj solar de Anistar","d":"El gigantesco reloj solar brilla al llevar la clave y dispara la recta final de la historia contra el Team Flare.","link":""},{"cat":"tip","t":"Prepara el equipo","d":"El Team Flare ataca a lo grande justo ahora. Sube niveles, compra Balextra y curas antes de continuar.","link":""}]},{"area":"Kalos Central","name":"Laboratorios de Lysandre","emoji":"🧬","goal":"Infiltrarte en los laboratorios de Lysandre y frenar al Team Flare.","gym":"","mons":[716,717,687],"highlights":[{"cat":"boss","t":"Xerosic y admins","d":"Bajo Ciudad Luminalia. Resuelve los puzles de ascensores por colores y derrota a los mandos del Team Flare.","link":""},{"cat":"tip","t":"El legendario NO se captura aquí","d":"En estos laboratorios activas el arma y vences a Xerosic; el legendario de portada (<b>Xerneas</b> en X / <b>Yveltal</b> en Y, Nv50) lo atraparás en el <b>Cuartel del Team Flare</b> de Pueblo Crómlech (siguiente parada).","link":"legendarios","mons":[716,717]},{"cat":"tip","t":"Cuidado con Malamar","d":"Los reclutas usan mucho Siniestro/Veneno (Malamar). Lleva un tipo Hada o Lucha.","link":"","mons":[687]}]},{"area":"Kalos Central","name":"Pueblo Crómlech (Geosenge) — Arma Suprema","emoji":"💥","goal":"Capturar al legendario de portada, destruir el arma y derrotar a Lysandre.","gym":"","mons":[717,716],"highlights":[{"cat":"catch","t":"Xerneas (X) / Yveltal (Y) Nv50","d":"En el <b>Cuartel del Team Flare</b>, bajo Pueblo Crómlech, atrapas al legendario de portada en su capullo (Nv50). <b>Guarda antes</b> y lánzale la Master Ball o debilítalo con estados.","link":"legendarios","mons":[716,717]},{"cat":"boss","t":"Jefe final: Lysandre","d":"Desciende al arma bajo los menhires. Lysandre remata con <b>Mega-Gyarados (Nv53)</b>. Tras vencerlo se destruye el arma y aparece AZ con su historia.","link":""},{"cat":"secret","t":"AZ te reta tras la Liga","d":"Recuerda a <b>AZ</b>: después de la Liga te espera en Pueblo Boceto para un combate y te regala un Floette Eterno único.","link":"secretos","mons":[671]}]},{"area":"Kalos Montaña","name":"Ruta 18, Cueva Desenlace y Pueblo Mosaico","emoji":"🐉","goal":"Avanzar al 8º gimnasio (y marcar Zygarde para el postgame).","gym":"","mons":[718,701],"highlights":[{"cat":"catch","t":"Zygarde te espera (mejor en postgame)","d":"En lo más profundo de la <b>Cueva Desenlace (Terminus)</b> está Zygarde (Nv70). Es durísimo: vuelve tras la Liga bien preparado.","link":"legendarios","mons":[718]},{"cat":"catch","t":"Hawlucha y dragones","d":"Por la zona aparece <b>Hawlucha</b> (Lucha/Volador) y buenos tipos Dragón/Tierra. Refuerza el equipo para la recta final.","link":"","mons":[701]},{"cat":"tip","t":"Pueblo Mosaico","d":"Pueblo escénico de cataratas con entrenadores fuertes; buen sitio para subir niveles antes de Snowbelle.","link":""}]},{"area":"Kalos Montaña","name":"Ciudad Fractal (Snowbelle)","emoji":"🧊","goal":"Encontrar a Édel y ganar la última medalla.","gym":"Medalla Iceberg","mons":[713,712],"highlights":[{"cat":"boss","t":"Gimnasio: Édel (Hielo)","d":"Abomasnow, Cryogonal y <b>Avalugg (Nv59)</b>. Acero, Fuego, Lucha y Roca ganan; su Avalugg es un muro físico enorme. Premio: <b>MT13 Rayo Hielo</b>.","link":"gimnasios","mons":[713]},{"cat":"missable","t":"Édel no está: ve a la Ruta 20","d":"Al llegar, el líder está fuera. Primero cruza la <b>Ruta 20 (Bosque Sombrío)</b> hasta el Pueblo Escondido; luego vuelve a retarlo.","link":""}]},{"area":"Kalos Montaña","name":"Bosque Sombrío y Pueblo Escondido","emoji":"🌲","goal":"Explorar el refugio Pokémon y localizar la Cueva Desconocida.","gym":"","mons":[132,133,150],"highlights":[{"cat":"catch","t":"Ditto y Pokémon abandonados","d":"El <b>Pueblo Escondido</b> alberga <b>Ditto</b> (clave para la cría), Amoonguss, Audino y más. Zona ideal para completar Pokédex.","link":"secretos","mons":[132]},{"cat":"secret","t":"Cueva Desconocida = Mewtwo","d":"Junto al pueblo se abrirá el acceso a la <b>Cueva Desconocida</b>, donde en el postgame está <b>Mewtwo (Nv70)</b> con su Megapiedra.","link":"legendarios","mons":[150]},{"cat":"tip","t":"Trae MO Corte/Fuerza","d":"Hay rincones con objetos que requieren MO. Vuelve con ellas para vaciar el bosque.","link":""}]},{"area":"Kalos Montaña","name":"Ruta 21, Camino Victoria y Liga Pokémon","emoji":"🏆","goal":"Superar la Ruta Victoria y coronarte Campeón/a.","gym":"","mons":[663,681,282],"highlights":[{"cat":"tip","t":"Camino Victoria","d":"Cascadas, escaladas y entrenadores Nv55-58. Trae <b>Repelente</b>, revivir, muchas curas y equilibra tipos.","link":"liga"},{"cat":"boss","t":"Alto Mando (orden libre, Nv63-65)","d":"<b>Malva</b> (Fuego), <b>Narciso</b> (Agua), <b>Tileo</b> (Acero) y <b>Drácena</b> (Dragón). Puedes retarlos en el orden que quieras.","link":"liga","mons":[663,689,681,715]},{"cat":"boss","t":"Campeona Dianta (Nv64-68)","d":"Equipo variadísimo rematado con <b>Mega-Gardevoir</b>. Lleva Acero, Veneno, Fantasma, Hielo y Hada.","link":"liga","mons":[282]}]}];

  var POSTGAME_STOPS = [{"area":"Postgame","name":"Pase TAV y Ciudad Batik (Kiloude)","emoji":"🚄","goal":"Desbloquear el sur de Kalos y sus instalaciones de combate.","gym":"","mons":[448],"highlights":[{"cat":"item","t":"Consigue el Pase TAV","d":"<ol><li>Entra en el Salón de la Fama (gana la Liga).</li><li>Ve a la <b>Estación de tren de Ciudad Luminalia</b>.</li><li>El Prof. Ciprés te da el Pase TAV.</li><li>Toma el tren a <b>Ciudad Batik</b>.</li></ol>","link":""},{"cat":"boss","t":"Mansión Batalla (Battle Maison)","d":"Frente de batalla de Kalos: Individual, Dobles, Triple, Rotación y Multi. Gana <b>PC</b> para comprar MT/objetos. Con racha de 50 retas a una de las damas (<b>Nocta</b> en Individual; <b>Vésper</b>, <b>Meridia</b> o <b>Aurora</b> según el formato).","link":"secretos"},{"cat":"secret","t":"Safari Amigo","d":"Al norte de Batik. Da Pokémon según los amigos de tu lista 3DS, muchos con habilidad oculta y mayor tasa de variocolor.","link":"emulador"},{"cat":"boss","t":"Revancha del rival y de Ciprés","d":"En Batik puedes rebatir a tu rival y al profesor con equipos de alto nivel para subir XP.","link":""}]},{"area":"Postgame","name":"Mewtwo — Cueva Desconocida","emoji":"🧿","goal":"Capturar a Mewtwo (Nv70) y quedarte su Megapiedra.","gym":"","mons":[150],"highlights":[{"cat":"catch","t":"Cómo llegar y capturarlo","d":"<ol><li>Vuelve al <b>Pueblo Escondido</b> (Ruta 20).</li><li>Al noreste se abre la grieta a la <b>Cueva Desconocida</b>.</li><li>Al fondo está <b>Mewtwo Nv70</b>.</li><li>Baja sus PS con Falso Tortazo, duérmelo/paralízalo y lanza Ultra Balls o Balextra de noche.</li></ol> Porta la <b>Mewtwoita X</b> (X) o <b>Y</b> (Y).","link":"legendarios"}]},{"area":"Postgame","name":"Zygarde — Cueva Desenlace","emoji":"🐍","goal":"Capturar a Zygarde (Nv70) al fondo de Terminus.","gym":"","mons":[718],"highlights":[{"cat":"catch","t":"Ruta y captura","d":"<ol><li>Ve a la <b>Ruta 18</b> y entra en la Cueva Desenlace.</li><li>Cruza el laberinto de rocas (necesitas Fuerza) hasta el fondo.</li><li>Enfréntate a <b>Zygarde Nv70</b> (Dragón/Tierra).</li><li>Es sensible a Hielo, Dragón y Hada; guarda antes y usa Balextra.</li></ol>","link":"legendarios"}]},{"area":"Postgame","name":"Ave legendaria errante","emoji":"🦅","goal":"Capturar tu Articuno / Zapdos / Moltres según tu inicial.","gym":"","mons":[144,145,146],"highlights":[{"cat":"catch","t":"Cuál te toca","d":"Depende del inicial: <b>Chespin→Articuno</b>, <b>Fennekin→Zapdos</b>, <b>Froakie→Moltres</b>. Nivel 70, vuela por toda Kalos.","link":"legendarios","mons":[144,145,146]},{"cat":"tip","t":"Cómo cazarla","d":"<ol><li>Tras entrar en el Salón de la Fama, es el <b>primer Pokémon salvaje</b> que aparece en la hierba alta y deambula por varias rutas.</li><li>Huye tras un turno: lanza una <b>Ball Veloz</b> el primer turno.</li><li>Si falla, ve reduciéndole PS entre encuentros (recuerda su vida) y reintenta.</li></ol>","link":"legendarios"}]},{"area":"Postgame","name":"Megapiedras de 20:00 a 21:00","emoji":"💎","goal":"Mejorar el Anillo Mega y recolectar megapiedras.","gym":"","mons":[448],"highlights":[{"cat":"item","t":"Mejora el Anillo Mega","d":"<ol><li>Ya como Campeón/a, vuelve a la <b>Torre Maestría</b> (Ciudad Yantra).</li><li>Combate de nuevo con <b>Corelia</b>.</li><li>Tu Anillo brilla: ahora, <b>solo de 20:00 a 21:00</b>, aparecen megapiedras brillantes por rutas y ciudades.</li></ol>","link":"secretos"},{"cat":"tip","t":"Fuerza la franja horaria","d":"En emulador, ajusta la hora del sistema a las 20:00 para farmear megapiedras (Garchompita, Latiasita/Latiosita, etc.).","link":"emulador"},{"cat":"secret","t":"Pinsirita / Heracronita","d":"En el <b>Bosque de Novarte</b>, tras el juego, aparece la <b>Pinsirita (X)</b> o la <b>Heracronita (Y)</b>.","link":"secretos"}]},{"area":"Postgame","name":"Completar la Pokédex y el Amuleto Iris","emoji":"📘","goal":"Rellenar la Pokédex y ganar recompensas de variocolor.","gym":"","mons":[282,658],"highlights":[{"cat":"secret","t":"Recompensas por Pokédex","d":"<ol><li>Completa la Pokédex <b>Central</b> → el Prof. Ciprés te da el <b>Radar Pokémon</b>.</li><li>Completa la <b>Costa</b> y la <b>Montaña</b> → diplomas/objetos.</li><li>Completa la <b>Nacional</b> → el director del juego en el <b>Hotel Richissime (Luminalia)</b> te da el <b>Amuleto Iris</b> (más variocolor).</li></ol>","link":"pokedex"},{"cat":"tip","t":"Necesitarás intercambiar","d":"Hay exclusivos de versión y evoluciones por intercambio: usa el modo enlace local del emulador para completarla (ver notas de emulador).","link":"emulador"}]},{"area":"Postgame","name":"Caza de variocolor (shiny)","emoji":"✨","goal":"Conseguir Pokémon variocolor de forma eficiente.","gym":"","mons":[658,700],"highlights":[{"cat":"secret","t":"Cadena de pesca","d":"Pesca en el mismo punto sin fallar; cada captura consecutiva sube la probabilidad de variocolor (hasta ~1/100 con cadenas largas). El método más rápido de la gen.","link":"secretos"},{"cat":"secret","t":"Radar Pokémon","d":"Encadena avistamientos en la hierba con el Radar para variocolor de ruta. Combínalo con el <b>Amuleto Iris</b> para acumular suerte.","link":"secretos"}]},{"area":"Postgame","name":"Agencia del Detective Mirto (Looker)","emoji":"🕵️","goal":"Resolver la trama secundaria postgame de Luminalia.","gym":"","mons":[359],"highlights":[{"cat":"secret","t":"Los casos de Emma y Essentia","d":"<ol><li>Tras la Liga, ve a la <b>Agencia de Mirto</b> en la avenida de Ciudad Luminalia.</li><li>Completa los cinco casos con Emma/Essentia.</li><li>Recompensa: dinero, un conjunto de ropa exclusivo y una historia estupenda.</li></ol>","link":"secretos"}]},{"area":"Postgame","name":"Restaurantes de Luminalia","emoji":"🍽️","goal":"Farmear dinero y experiencia rápidamente.","gym":"","mons":[663],"highlights":[{"cat":"tip","t":"Restaurante Le Wow","d":"Combates dobles/triples de alto nivel: gran fuente de <b>dinero</b> (con el Poder O de recompensa + Amuleto Moneda) y de XP para subir el equipo de postgame. Reserva tus mejores Pokémon.","link":""}]},{"area":"Postgame","name":"Míticos por evento (Diancie, Hoopa, Volcanion)","emoji":"🎁","goal":"Obtener los Pokémon míticos de la generación.","gym":"","mons":[719,720,721],"highlights":[{"cat":"catch","t":"Diancie","d":"Normalmente por código de Regalo Misterioso. Megaevoluciona a <b>Mega-Diancie</b> con la Diancita.","link":"emulador","mons":[719]},{"cat":"catch","t":"Hoopa y Volcanion","d":"Distribuciones oficiales ya cerradas. En emulador se obtienen inyectándolos con PKHeX.","link":"emulador","mons":[720,721]},{"cat":"tip","t":"En emulador (PKHeX + Carta Regalo)","d":"Con los servidores caídos, la vía práctica es <b>PKHeX</b>: usa la <i>Mystery Gift Database</i> con la carta exacta — <span class=\"code\">Diancie Gift</span>, <span class=\"code\">Hoopa distribution!</span> y la Carta Regalo <span class=\"code\">Volcanion</span> — o importa un .pk6 legal de cada mítico. Ver la tabla de eventos en las notas de emulador.","link":"emulador"}]},{"area":"Postgame","name":"Cría, EVs y afecto","emoji":"🥚","goal":"Preparar un equipo competitivo o para el Frente de Batalla.","gym":"","mons":[132,133],"highlights":[{"cat":"tip","t":"Guardería + Ditto","d":"Con <b>Ditto</b> (Pueblo Escondido) y la Guardería de la Ruta 7 crías IVs, naturalezas y movimientos huevo. Usa objetos como la Piedra Eterna y el Pañuelo Seda.","link":"","mons":[132]},{"cat":"tip","t":"Súper Entrenamiento y Poké Recreo","d":"El <b>Súper Entrenamiento</b> reparte EVs a la carta; el <b>Poké Recreo (Pokémon-Amie)</b> sube afecto para más XP, esquivar golpes, más críticos y evolucionar a Sylveon.","link":""}]}];

  /* ---------------- Normalización al formato del renderer ---------------- */
  function normalize(list) {
    return list.map(function (s) {
      return {
        area: s.area,
        name: s.name,
        emo: s.emoji,
        gym: s.gym || "",
        goal: s.goal,
        mons: s.mons || [],
        hl: (s.highlights || []).map(function (h) {
          var o = { cat: h.cat, t: h.t, d: h.d };
          if (h.mons) o.mons = h.mons;
          if (h.link && L[h.link]) o.link = L[h.link];
          return o;
        })
      };
    });
  }

  var STOPS = normalize(ROUTE_STOPS).concat(normalize(POSTGAME_STOPS));

  /* ---------------- Estado ---------------- */
  var K_CUR = "gen6_wt_current";
  var K_FILTER = "gen6_wt_filter";
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
