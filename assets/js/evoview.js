/* =====================================================================
   EvoView — ficha emergente de líneas evolutivas + vista Pokédex (#evoDex)
   Requiere assets/js/evolutions.js (window.EVOS, window.EVOS_ORDER).

   Uso:
   - Cualquier elemento con data-evo="<id nacional>" abre la ficha al clic.
   - EvoView.open(id)     → abre la ficha de esa especie.
   - EvoView.summary(id)  → resumen en texto de su cadena (para el buscador).
   ===================================================================== */
(function () {
  "use strict";
  if (!window.EVOS) return;

  var EVOS = window.EVOS;
  var $ = function (s, c) { return (c || document).querySelector(s); };

  var SPRITE = function (id) {
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/" + id + ".png";
  };

  var METHOD = {
    level:     { ic: "📈", lbl: "Nivel" },
    stone:     { ic: "💎", lbl: "Piedra" },
    trade:     { ic: "🔁", lbl: "Intercambio" },
    happiness: { ic: "💞", lbl: "Amistad" },
    beauty:    { ic: "✨", lbl: "Belleza" },
    special:   { ic: "✨", lbl: "Especial" }
  };

  /* ---------- parentescos (hijo → padre) ---------- */
  var PREV = {};
  Object.keys(EVOS).forEach(function (id) {
    (EVOS[id].ev || []).forEach(function (e) { PREV[e.to] = +id; });
  });
  function rootOf(id) { while (PREV[id]) id = PREV[id]; return id; }

  function familyIds(id, acc) {
    acc = acc || [];
    acc.push(id);
    (EVOS[id].ev || []).forEach(function (e) { familyIds(e.to, acc); });
    return acc;
  }

  function name(id) { return EVOS[id] ? EVOS[id].n : ("#" + id); }

  function edgeLabel(e) {
    if (e.lbl) return e.lbl;
    switch (e.m) {
      case "level":     return "Nv. " + e.lv;
      case "stone":     return e.item;
      case "trade":     return e.item ? "Intercambio + " + e.item : "Intercambio";
      case "happiness": return "Amistad alta";
      case "beauty":    return "Belleza máx. + nivel";
      default:          return e.cond || "Especial";
    }
  }

  /* ---------- resumen en texto (buscador) ---------- */
  function chainText(id) {
    var sp = EVOS[id];
    if (!sp || !sp.ev || !sp.ev.length) return name(id);
    var parts = sp.ev.map(function (e) {
      return chainText(e.to).replace(/^([^ →]+)/, "$1 (" + edgeLabel(e) + ")");
    });
    return sp.n + " → " + parts.join("  /  ");
  }
  function summary(id) {
    var root = rootOf(id);
    var sp = EVOS[root];
    if (!sp.ev || !sp.ev.length) return (EVOS[id].note || "No evoluciona.");
    return chainText(root);
  }

  /* ---------- HTML de la cadena ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function cardHTML(id, me) {
    var nm = esc(name(id));
    return '<span class="evo-card' + (me === id ? " is-me" : "") + '">' +
      '<img src="' + SPRITE(id) + '" alt="' + nm + '" loading="lazy" onerror="this.style.display=\'none\'">' +
      "<b>" + nm + "</b></span>";
  }

  function nodeHTML(id, me) {
    var sp = EVOS[id];
    var html = cardHTML(id, me);
    if (!sp || !sp.ev || !sp.ev.length) return '<div class="evo-node">' + html + "</div>";
    var kids = sp.ev.map(function (e) {
      var m = METHOD[e.m] || METHOD.special;
      return '<div class="evo-branch">' +
        '<span class="evo-arrow"><i>' + m.ic + " " + esc(edgeLabel(e)) + "</i><b>➜</b></span>" +
        nodeHTML(e.to, me) +
        "</div>";
    }).join("");
    return '<div class="evo-node">' + html + '<div class="evo-children">' + kids + "</div></div>";
  }

  /* ---------- notas de la familia ---------- */
  function notesHTML(ids) {
    var out = [];
    ids.forEach(function (id) {
      var sp = EVOS[id];
      if (sp.get)  out.push("<li>📥 <b>" + esc(sp.n) + ":</b> " + esc(sp.get) + "</li>");
      if (sp.note) out.push("<li>ℹ️ <b>" + esc(sp.n) + ":</b> " + esc(sp.note) + "</li>");
      (sp.ev || []).forEach(function (e) {
        if (!e.how && !e.note && !e.link) return;
        var m = METHOD[e.m] || METHOD.special;
        var link = e.link ? ' <a class="evo-link" href="' + e.link.href + '">📖 ' + esc(e.link.t) + " →</a>" : "";
        out.push("<li>" + m.ic + " <b>" + esc(sp.n) + " → " + esc(name(e.to)) + "</b> (" + esc(edgeLabel(e)) + "): " +
          esc((e.how || "") + (e.note ? (e.how ? " " : "") + e.note : "")) + link + "</li>");
      });
    });
    return out.length ? '<ul class="evo-notes">' + out.join("") + "</ul>" : "";
  }

  /* ---------- ficha emergente ---------- */
  var overlay = document.createElement("div");
  overlay.className = "evo-overlay";
  overlay.innerHTML =
    '<div class="evo-sheet" role="dialog" aria-modal="true" aria-label="Línea evolutiva">' +
      '<div class="evo-sheet__head">' +
        '<span class="evo-sheet__title" id="evoTitle">🧬 Línea evolutiva</span>' +
        '<button class="evo-sheet__close" id="evoClose" aria-label="Cerrar">✕</button>' +
      "</div>" +
      '<div class="evo-sheet__body" id="evoBody"></div>' +
      '<div class="evo-sheet__foot"><a href="index.html#evoluciones">🧬 Ver todas las evoluciones de Hoenn →</a></div>' +
    "</div>";
  document.body.appendChild(overlay);

  function open(id) {
    if (!EVOS[id]) return;
    var root = rootOf(id);
    var ids = familyIds(root);
    $("#evoTitle").textContent = "🧬 " + name(id) + " · Línea evolutiva";
    var single = ids.length === 1;
    $("#evoBody").innerHTML =
      '<div class="evo-tree">' + nodeHTML(root, id) + "</div>" +
      (single && !(EVOS[id].note || EVOS[id].get) ? '<p class="evo-noev">Este Pokémon no evoluciona.</p>' : "") +
      notesHTML(ids);
    overlay.classList.add("show");
    document.body.classList.add("no-scroll");
  }
  function close() {
    overlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }

  $("#evoClose", overlay).addEventListener("click", close);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
    // al navegar por un enlace de la ficha (anclas de la misma página incluidas), cerrarla
    else if (e.target.closest("a")) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("show")) close();
  });

  /* clic global en cualquier [data-evo] */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-evo]");
    if (!t) return;
    e.preventDefault();
    open(parseInt(t.getAttribute("data-evo"), 10));
  });

  /* ---------- vista Pokédex (#evoDex, en index.html) ----------
     Lista plana en orden de la Pokédex de Hoenn: clic → ficha de evolución. */
  function ownMethods(id) {
    var ev = EVOS[id] && EVOS[id].ev;
    if (!ev || !ev.length) return ["none"];
    var ms = {};
    ev.forEach(function (e) { ms[e.m === "beauty" ? "special" : e.m] = 1; });
    return Object.keys(ms);
  }

  function rowMeta(id) {
    var ev = EVOS[id] && EVOS[id].ev;
    if (!ev || !ev.length) return "—";
    return ev.map(function (e) {
      var m = METHOD[e.m] || METHOD.special;
      return m.ic + " " + edgeLabel(e);
    }).join(" / ");
  }

  function initDex() {
    var box = document.getElementById("evoDex");
    if (!box || !window.EVOS_DEX) return;

    var chips = [
      ["all", "Todo"], ["level", "📈 Nivel"], ["stone", "💎 Piedra"],
      ["trade", "🔁 Intercambio"], ["happiness", "💞 Amistad"],
      ["special", "✨ Especial"], ["none", "🚫 No evoluciona"]
    ];
    box.innerHTML =
      '<div class="evo-chips">' + chips.map(function (c, i) {
        return '<span class="evo-chip' + (i === 0 ? " active" : "") + '" data-evofilter="' + c[0] + '">' + c[1] + "</span>";
      }).join("") + "</div>" +
      '<div class="evo-list">' + window.EVOS_DEX.map(function (id, i) {
        var num = ("00" + (i + 1)).slice(-3);
        return '<button class="evo-row" type="button" data-evo="' + id + '" data-methods="' + ownMethods(id).join(" ") + '">' +
          '<span class="evo-row__num">#' + num + "</span>" +
          '<img src="' + SPRITE(id) + '" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'">' +
          "<b>" + esc(name(id)) + "</b>" +
          '<span class="evo-row__meta">' + esc(rowMeta(id)) + "</span>" +
          "</button>";
      }).join("") + "</div>";

    box.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-evofilter]");
      if (!chip) return;
      var f = chip.getAttribute("data-evofilter");
      box.querySelectorAll("[data-evofilter]").forEach(function (c) { c.classList.toggle("active", c === chip); });
      box.querySelectorAll(".evo-row").forEach(function (row) {
        var show = f === "all" || row.getAttribute("data-methods").split(" ").indexOf(f) !== -1;
        row.style.display = show ? "" : "none";
      });
    });
  }
  initDex();

  window.EvoView = { open: open, close: close, summary: summary, name: name };
})();
