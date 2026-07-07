/* =====================================================================
   Guía 100% Pokémon Esmeralda — Lógica de la interfaz
   ===================================================================== */
(function () {
  "use strict";

  var STORE_PROGRESS = "esmeralda_progreso_v1";
  var STORE_THEME = "esmeralda_tema";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------- Tema claro / oscuro ---------------- */
  var root = document.documentElement;
  var themeBtn = $("#themeBtn");
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    if (themeBtn) themeBtn.textContent = t === "light" ? "☀️" : "🌙";
  }
  applyTheme(localStorage.getItem(STORE_THEME) || "dark");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      localStorage.setItem(STORE_THEME, next);
      applyTheme(next);
    });
  }

  /* ---------------- Menú móvil ---------------- */
  var sidebar = $("#sidebar");
  var overlay = $("#overlay");
  var hamburger = $("#hamburger");
  function openMenu() { sidebar.classList.add("open"); overlay.classList.add("show"); document.body.classList.add("no-scroll"); }
  function closeMenu() { sidebar.classList.remove("open"); overlay.classList.remove("show"); document.body.classList.remove("no-scroll"); }
  if (hamburger) hamburger.addEventListener("click", openMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);
  $$("#nav .nav-link").forEach(function (a) {
    a.addEventListener("click", function () { if (window.innerWidth <= 980) closeMenu(); });
  });

  /* ---------------- Progreso / checklists ---------------- */
  var items = $$(".check-item");
  var state = {};
  try { state = JSON.parse(localStorage.getItem(STORE_PROGRESS) || "{}"); } catch (e) { state = {}; }

  function saveState() {
    try { localStorage.setItem(STORE_PROGRESS, JSON.stringify(state)); } catch (e) {}
  }

  var RING_CIRC = 2 * Math.PI * 56; // r=56

  function updateProgressUI() {
    var total = items.length, done = 0;
    var catTotals = {}, catDone = {};

    items.forEach(function (li) {
      var cat = li.getAttribute("data-cat") || "otros";
      catTotals[cat] = (catTotals[cat] || 0) + 1;
      if (li.classList.contains("done")) {
        done++;
        catDone[cat] = (catDone[cat] || 0) + 1;
      }
    });

    var pct = total ? Math.round((done / total) * 100) : 0;

    // Ring
    var ringBar = $("#ringBar");
    if (ringBar) {
      ringBar.setAttribute("stroke-dasharray", RING_CIRC.toFixed(2));
      ringBar.setAttribute("stroke-dashoffset", (RING_CIRC * (1 - done / (total || 1))).toFixed(2));
    }
    var ringPct = $("#ringPct"); if (ringPct) ringPct.textContent = pct + "%";
    var ringCount = $("#ringCount"); if (ringCount) ringCount.textContent = done + " / " + total;

    // Mini barra superior
    var miniFill = $("#miniFill"); if (miniFill) miniFill.style.width = pct + "%";
    var miniPct = $("#miniPct"); if (miniPct) miniPct.textContent = pct + "%";

    // Barras por categoría
    $$(".stat-bar[data-cat]").forEach(function (bar) {
      var cat = bar.getAttribute("data-cat");
      var t = catTotals[cat] || 0, d = catDone[cat] || 0;
      var p = t ? Math.round((d / t) * 100) : 0;
      var fill = $("[data-cat-fill]", bar); if (fill) fill.style.width = p + "%";
      var cnt = $("[data-cat-count]", bar); if (cnt) cnt.textContent = d + "/" + t;
    });
  }

  items.forEach(function (li) {
    var key = li.getAttribute("data-key");
    var input = $("input", li);
    if (state[key]) { li.classList.add("done"); if (input) input.checked = true; }

    li.addEventListener("click", function (e) {
      // evitar doble toggle por el <input> nativo
      if (e.target.tagName === "INPUT") return;
      e.preventDefault();
      toggle();
    });
    if (input) input.addEventListener("change", toggle);

    function toggle() {
      var isDone = li.classList.toggle("done");
      if (input) input.checked = isDone;
      state[key] = isDone ? 1 : 0;
      saveState();
      updateProgressUI();
    }
  });

  var resetBtn = $("#resetProgress");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      if (!confirm("¿Reiniciar todo tu progreso? Esta acción no se puede deshacer.")) return;
      state = {};
      saveState();
      items.forEach(function (li) {
        li.classList.remove("done");
        var input = $("input", li); if (input) input.checked = false;
      });
      updateProgressUI();
    });
  }

  updateProgressUI();

  /* ---------------- Acordeones ---------------- */
  $$(".accordion").forEach(function (acc) {
    var head = $(".accordion__head", acc);
    var body = $(".accordion__body", acc);
    head.setAttribute("tabindex", "0");
    head.setAttribute("role", "button");
    function setOpen(open) {
      acc.classList.toggle("open", open);
      body.style.maxHeight = open ? body.scrollHeight + "px" : "0px";
      head.setAttribute("aria-expanded", open ? "true" : "false");
    }
    setOpen(acc.classList.contains("open"));
    head.addEventListener("click", function () { setOpen(!acc.classList.contains("open")); });
    head.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(!acc.classList.contains("open")); }
    });
    // Recalcular al cambiar tamaño
    window.addEventListener("resize", function () {
      if (acc.classList.contains("open")) body.style.maxHeight = body.scrollHeight + "px";
    });
  });

  /* ---------------- Pestañas (Frontera) ---------------- */
  var tabWrap = $("#frontierTabs");
  if (tabWrap) {
    $$(".tab", tabWrap).forEach(function (tab) {
      tab.setAttribute("tabindex", "0");
      tab.setAttribute("role", "button");
      function activate() {
        var id = tab.getAttribute("data-tab");
        $$(".tab", tabWrap).forEach(function (t) { t.classList.toggle("active", t === tab); });
        $$(".tab-panel").forEach(function (p) {
          p.classList.toggle("active", p.getAttribute("data-panel") === id);
        });
      }
      tab.addEventListener("click", activate);
      tab.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); }
      });
    });
  }

  /* ---------------- Scrollspy nav ---------------- */
  var sections = $$("main .section");
  var navLinks = $$("#nav .nav-link");
  var linkByHash = {};
  navLinks.forEach(function (a) { linkByHash[a.getAttribute("href")] = a; });

  var spy = function () {
    var pos = window.scrollY + 120;
    var current = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) current = sec.id;
    });
    navLinks.forEach(function (a) { a.classList.remove("active"); });
    if (current && linkByHash["#" + current]) linkByHash["#" + current].classList.add("active");
  };
  window.addEventListener("scroll", throttle(spy, 120));
  spy();

  /* ---------------- Botón volver arriba ---------------- */
  var toTop = $("#toTop");
  window.addEventListener("scroll", throttle(function () {
    if (toTop) toTop.classList.toggle("show", window.scrollY > 600);
  }, 150));
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---------------- Buscador de secciones ---------------- */
  var navSearch = $("#navSearch");
  if (navSearch) {
    navSearch.addEventListener("input", function () {
      var q = navSearch.value.trim().toLowerCase();
      navLinks.forEach(function (a) {
        var txt = a.textContent.toLowerCase();
        a.style.display = (!q || txt.indexOf(q) !== -1) ? "" : "none";
      });
      // ocultar títulos de grupo sin resultados
      $$(".nav-group").forEach(function (g) {
        var anyVisible = $$(".nav-link", g).some(function (a) { return a.style.display !== "none"; });
        g.style.display = anyVisible ? "" : "none";
      });
    });
  }

  /* ---------------- utils ---------------- */
  function throttle(fn, wait) {
    var last = 0, timer = null;
    return function () {
      var now = Date.now();
      var remaining = wait - (now - last);
      if (remaining <= 0) {
        if (timer) { clearTimeout(timer); timer = null; }
        last = now; fn();
      } else if (!timer) {
        timer = setTimeout(function () { last = Date.now(); timer = null; fn(); }, remaining);
      }
    };
  }
})();
