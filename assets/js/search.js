/* =====================================================================
   Buscador de la guía — busca en todo el contenido de la página actual
   (secciones, tarjetas, tablas, acordeones y fichas de la compañera).
   Atajos: Ctrl+K o "/" para abrir, Esc para cerrar.
   ===================================================================== */
(function () {
  "use strict";

  var FOLD = { "á":"a","é":"e","í":"i","ó":"o","ú":"u","ü":"u","ñ":"n",
               "Á":"a","É":"e","Í":"i","Ó":"o","Ú":"u","Ü":"u","Ñ":"n" };
  function fold(s) {
    var o = "";
    for (var i = 0; i < s.length; i++) { var c = s[i]; o += (FOLD[c] || c).toLowerCase(); }
    return o;
  }
  function clean(el) { return el ? el.textContent.replace(/\s+/g, " ").trim() : ""; }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" }[c]; }); }

  /* ---------- índice de contenido ---------- */
  function buildIndex() {
    var items = [];

    // Compañera paso a paso (jugando.html)
    document.querySelectorAll(".wt-stop").forEach(function (stop) {
      var sec = clean(stop.querySelector(".wt-card__area")) + " · " + clean(stop.querySelector(".wt-card__name"));
      items.push({ el: stop, sec: "📍 Parada", title: sec, body: clean(stop.querySelector(".wt-goal")) });
      stop.querySelectorAll(".wt-hl").forEach(function (hl) {
        items.push({ el: hl, sec: sec, title: clean(hl.querySelector(".wt-hl__t")), body: clean(hl.querySelector(".wt-hl__d")) });
      });
    });

    // Guía de referencia (index.html)
    document.querySelectorAll("main .section").forEach(function (section) {
      var secName = clean(section.querySelector("h2")) || section.id;
      section.querySelectorAll("h3, .card, .mon-card, .accordion, .check-item, .callout, tbody tr").forEach(function (el) {
        // evitar duplicados por anidación (p.ej. tr dentro de accordion)
        var title = "", body = "";
        if (el.matches("h3")) { title = clean(el); }
        else if (el.matches(".card")) { title = clean(el.querySelector("h4")); body = clean(el); }
        else if (el.matches(".mon-card")) { title = clean(el.querySelector(".mon-card__name")); body = clean(el.querySelector(".mon-card__body")); }
        else if (el.matches(".accordion")) { title = clean(el.querySelector(".accordion__head")); body = clean(el.querySelector(".accordion__inner")); }
        else if (el.matches(".check-item")) { title = clean(el.querySelector(".label")); }
        else if (el.matches(".callout")) { body = clean(el); title = body.slice(0, 70) + (body.length > 70 ? "…" : ""); }
        else { body = clean(el); title = clean(el.querySelector("td")); }
        if (title || body) items.push({ el: el, sec: secName, title: title, body: body });
      });
    });

    // Líneas evolutivas (si la página carga evolutions.js + evoview.js):
    // permite consultar CUALQUIER especie aunque no aparezca en el contenido.
    if (window.EVOS && window.EvoView) {
      Object.keys(window.EVOS).forEach(function (id) {
        id = parseInt(id, 10);
        items.push({ kind: "evo", id: id, sec: "🧬 Evolución",
                     title: window.EvoView.name(id), body: window.EvoView.summary(id) });
      });
    }

    return items;
  }

  /* ---------- búsqueda ---------- */
  function doSearch(index, q) {
    var words = fold(q).split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    var res = [];
    index.forEach(function (it) {
      var ft = fold(it.title), fb = fold(it.body);
      var score = 0, ok = true;
      for (var i = 0; i < words.length; i++) {
        var w = words[i];
        if (ft.indexOf(w) !== -1) score += 3;
        else if (fb.indexOf(w) !== -1) score += 1;
        else { ok = false; break; }
      }
      if (ok) res.push({ it: it, score: score });
    });
    res.sort(function (a, b) { return b.score - a.score; });
    return res.slice(0, 30);
  }

  function snippet(it, words) {
    var text = it.body || it.title;
    var f = fold(text), pos = -1;
    for (var i = 0; i < words.length; i++) { var p = f.indexOf(words[i]); if (p !== -1) { pos = p; break; } }
    var start = Math.max(0, (pos < 0 ? 0 : pos) - 40);
    var end = Math.min(text.length, (pos < 0 ? 0 : pos) + 100);
    var s = (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
    // resaltar coincidencias (fold es 1:1 en longitud)
    var sf = fold(s), out = "", idx = 0;
    while (idx < s.length) {
      var hit = 0;
      for (var wI = 0; wI < words.length; wI++) {
        var w = words[wI];
        if (w && sf.substr(idx, w.length) === w) { hit = w.length; break; }
      }
      if (hit) { out += "<mark>" + esc(s.substr(idx, hit)) + "</mark>"; idx += hit; }
      else { out += esc(s[idx]); idx++; }
    }
    return out;
  }

  /* ---------- revelar el resultado ---------- */
  function reveal(el) {
    var acc = el.closest(".accordion");
    if (acc && !acc.classList.contains("open")) {
      acc.classList.add("open");
      var b = acc.querySelector(".accordion__body");
      if (b) b.style.maxHeight = b.scrollHeight + "px";
    }
    var card = el.closest(".wt-card") || (el.classList && el.classList.contains("wt-stop") ? el.querySelector(".wt-card") : null);
    if (card) card.classList.add("open");
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("search-flash");
    setTimeout(function () { el.classList.remove("search-flash"); }, 2200);
  }

  /* ---------- UI ---------- */
  var prefix = /\/gen\d\//.test(location.pathname) ? "../" : "";
  var overlay = document.createElement("div");
  overlay.className = "search-overlay";
  overlay.innerHTML =
    '<div class="search-box" role="dialog" aria-label="Buscador">' +
      '<div class="search-box__row">' +
        '<span class="search-box__icon">🔎</span>' +
        '<input type="search" class="search-box__input" id="searchInput" placeholder="Buscar en esta guía… (p. ej. Ticket Auréola, Feebas, Regice)" autocomplete="off">' +
        '<button class="search-box__close" id="searchClose" aria-label="Cerrar">✕</button>' +
      "</div>" +
      '<div class="search-results" id="searchResults"><div class="search-hint">Escribe para buscar en toda la página: secretos, objetos, capturas, tablas…</div></div>' +
      '<div class="search-other">¿No está en esta guía? Busca en: ' +
        '<a href="' + prefix + 'index.html">🟢 Esmeralda</a>' +
        '<a href="' + prefix + 'gen4/index.html">🔵 Sinnoh</a>' +
        '<a href="' + prefix + 'gen5/index.html">⚫ Teselia</a>' +
        '<a href="' + prefix + 'gen6/index.html">🔴 Kalos</a>' +
      "</div>" +
    "</div>";
  document.body.appendChild(overlay);

  var input = overlay.querySelector("#searchInput");
  var resultsBox = overlay.querySelector("#searchResults");
  var index = null, results = [], selected = -1;

  function open() {
    // en la compañera, quita el filtro para que todo sea alcanzable
    var allChip = document.querySelector('.wt-chip[data-filter="all"]:not(.active)');
    if (allChip) allChip.click();
    index = buildIndex();
    overlay.classList.add("show");
    document.body.classList.add("no-scroll");
    input.value = "";
    renderResults([]);
    setTimeout(function () { input.focus(); }, 40);
  }
  function close() {
    overlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }

  function renderResults(res) {
    results = res; selected = -1;
    if (!input.value.trim()) {
      resultsBox.innerHTML = '<div class="search-hint">Escribe para buscar en toda la página: secretos, objetos, capturas, tablas…</div>';
      return;
    }
    if (!res.length) {
      resultsBox.innerHTML = '<div class="search-hint">Sin resultados en esta guía. Prueba con otra palabra o en otra guía (abajo).</div>';
      return;
    }
    var words = fold(input.value).split(/\s+/).filter(Boolean);
    resultsBox.innerHTML = res.map(function (r, i) {
      return '<div class="search-item" data-i="' + i + '">' +
        '<div class="search-item__sec">' + esc(r.it.sec) + "</div>" +
        '<div class="search-item__title">' + esc(r.it.title) + "</div>" +
        (r.it.body ? '<div class="search-item__snip">' + snippet(r.it, words) + "</div>" : "") +
      "</div>";
    }).join("");
  }

  function pick(i) {
    if (i < 0 || i >= results.length) return;
    var it = results[i].it;
    close();
    if (it.kind === "evo") {
      setTimeout(function () { window.EvoView.open(it.id); }, 60);
      return;
    }
    setTimeout(function () { reveal(it.el); }, 60);
  }

  input.addEventListener("input", function () { renderResults(doSearch(index, input.value)); });
  input.addEventListener("keydown", function (e) {
    var items = resultsBox.querySelectorAll(".search-item");
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!items.length) return;
      selected = e.key === "ArrowDown" ? Math.min(selected + 1, items.length - 1) : Math.max(selected - 1, 0);
      items.forEach(function (it, i) { it.classList.toggle("sel", i === selected); });
      items[selected].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      pick(selected >= 0 ? selected : 0);
    }
  });
  resultsBox.addEventListener("click", function (e) {
    var item = e.target.closest(".search-item");
    if (item) pick(parseInt(item.getAttribute("data-i"), 10));
  });
  overlay.querySelector("#searchClose").addEventListener("click", close);
  overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });

  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); overlay.classList.contains("show") ? close() : open(); }
    else if (e.key === "Escape" && overlay.classList.contains("show")) close();
    else if (e.key === "/" && !overlay.classList.contains("show")) {
      var t = e.target.tagName;
      if (t !== "INPUT" && t !== "TEXTAREA") { e.preventDefault(); open(); }
    }
  });

  // botón en la topbar
  var themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    var btn = document.createElement("button");
    btn.className = "icon-btn";
    btn.id = "searchBtn";
    btn.setAttribute("aria-label", "Buscar (Ctrl+K)");
    btn.title = "Buscar (Ctrl+K)";
    btn.textContent = "🔎";
    themeBtn.parentNode.insertBefore(btn, themeBtn);
    btn.addEventListener("click", open);
  }
})();
