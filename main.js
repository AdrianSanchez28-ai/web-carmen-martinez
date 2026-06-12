(function () {
  /* ==========================================================================
     PERRUQUERIA I ESTÈTICA CARMEN MARTÍNEZ — main.js
     Patrón IIFE clásico (sin modules). Cada init va envuelto en safe():
     si una pieza falla, el resto de la web sigue viva.
     ========================================================================== */
  "use strict";

  /* ---------- Helpers (convención de la skill) ---------- */
  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  var escHTML = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }
  function pad2(n) { return n < 10 ? "0" + n : "" + n; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  var data = window.__CARMEN__ || {};
  var brand = data.brand || {};

  /* ---------- Iconos SVG (line-art poligonal) ---------- */
  var SVC_ICONS = {
    tijeras: '<polygon class="svc-fill" points="60,52 70,66 60,80 50,66"/><path class="svc-stroke" pathLength="1" d="M38 22 L74 78"/><path class="svc-stroke" pathLength="1" d="M82 22 L46 78"/><path class="svc-stroke" pathLength="1" d="M46 78 L34 86 L26 100 L34 110 L48 104 L52 90 L46 78 Z"/><path class="svc-stroke" pathLength="1" d="M74 78 L86 86 L94 100 L86 110 L72 104 L68 90 L74 78 Z"/>',
    gota: '<polygon class="svc-fill" points="60,64 76,76 72,94 48,94 44,76"/><path class="svc-stroke" pathLength="1" d="M60 14 L80 48 L88 72 L80 94 L60 104 L40 94 L32 72 L40 48 Z"/><path class="svc-stroke" pathLength="1" d="M48 78 L54 88 L66 90"/>',
    mano: '<polygon class="svc-fill" points="52,26 58,26 58,36 52,36"/><path class="svc-stroke" pathLength="1" d="M36 106 L36 70 L34 46 L40 42 L46 46 L46 66"/><path class="svc-stroke" pathLength="1" d="M46 66 L46 34 L52 30 L58 34 L58 64"/><path class="svc-stroke" pathLength="1" d="M58 64 L58 38 L64 34 L70 38 L70 66"/><path class="svc-stroke" pathLength="1" d="M70 66 L70 46 L76 42 L82 46 L82 72 L78 92 L70 106"/><path class="svc-stroke" pathLength="1" d="M36 84 L28 72 L32 64 L40 72"/><path class="svc-stroke" pathLength="1" d="M36 106 L70 106"/>',
    pie: '<polygon class="svc-fill" points="78,86 92,86 92,96 78,96"/><path class="svc-stroke" pathLength="1" d="M26 96 L30 70 L42 50 L58 40 L76 42 L88 54 L92 72 L92 96 Z"/><path class="svc-stroke" pathLength="1" d="M26 96 L20 88 L24 80 L30 84"/><path class="svc-stroke" pathLength="1" d="M38 96 L38 88 M50 96 L50 86 M62 96 L62 88"/>',
    una: '<polygon class="svc-fill" points="60,106 40,72 44,52 76,52 80,72"/><path class="svc-stroke" pathLength="1" d="M60 12 L78 42 L82 72 L60 106 L38 72 L42 42 Z"/><path class="svc-stroke" pathLength="1" d="M44 40 L60 48 L76 40"/>',
    frasco: '<polygon class="svc-fill" points="36,74 84,74 84,96 36,96"/><path class="svc-stroke" pathLength="1" d="M50 14 L70 14 L70 32 L50 32 Z"/><path class="svc-stroke" pathLength="1" d="M54 32 L54 44 L66 44 L66 32"/><path class="svc-stroke" pathLength="1" d="M42 44 L78 44 L86 64 L86 100 L34 100 L34 64 Z"/>',
    pincel: '<polygon class="svc-fill" points="34,92 44,80 52,88 42,100"/><path class="svc-stroke" pathLength="1" d="M92 14 L98 20 L58 64 L50 56 Z"/><path class="svc-stroke" pathLength="1" d="M50 56 L58 64 L40 96 L28 102 L24 98 L30 86 Z"/><path class="svc-stroke" pathLength="1" d="M66 88 L74 84 L82 88 L90 84"/>',
    hoja: '<polygon class="svc-fill" points="60,28 80,46 82,68 60,98 60,28"/><path class="svc-stroke" pathLength="1" d="M60 12 L84 38 L88 68 L60 108 L32 68 L36 38 Z"/><path class="svc-stroke" pathLength="1" d="M60 20 L60 100"/><path class="svc-stroke" pathLength="1" d="M60 44 L44 56 M60 60 L76 72 M60 76 L46 86"/>',
    onda: '<polygon class="svc-fill" points="60,56 68,64 60,72 52,64"/><path class="svc-stroke" pathLength="1" d="M18 38 L34 26 L50 38 L66 26 L82 38 L98 26"/><path class="svc-stroke" pathLength="1" d="M18 64 L34 52 L50 64 L66 52 L82 64 L98 52"/><path class="svc-stroke" pathLength="1" d="M18 90 L34 78 L50 90 L66 78 L82 90 L98 78"/>',
    trenza: '<polygon class="svc-fill" points="60,42 72,56 60,70 48,56"/><path class="svc-stroke" pathLength="1" d="M44 12 L76 40 L44 68 L76 96 L60 110"/><path class="svc-stroke" pathLength="1" d="M76 12 L44 40 L76 68 L44 96 L60 110"/>'
  };

  var SCH_ICONS = {
    reloj: '<path d="M12 3 L19 7 L19 17 L12 21 L5 17 L5 7 Z M12 8 L12 12 L15 14" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    luna: '<path d="M15 3 L10 6 L8 12 L10 18 L15 21 L11 21 L6 17 L4 12 L6 7 L11 3 Z" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    estrella: '<path d="M12 2 L14.5 8.5 L21 9 L16 13.5 L17.5 20 L12 16.5 L6.5 20 L8 13.5 L3 9 L9.5 8.5 Z" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    sol: '<path d="M12 7 L16 9.5 L16 14.5 L12 17 L8 14.5 L8 9.5 Z M12 1 L12 4 M12 20 L12 23 M1 12 L4 12 M20 12 L23 12 M4.5 4.5 L6.5 6.5 M17.5 17.5 L19.5 19.5 M19.5 4.5 L17.5 6.5 M6.5 17.5 L4.5 19.5" fill="none" stroke="currentColor" stroke-width="1.6"/>'
  };

  /* ============================================================
     MOUNTS — idempotentes: reconstruyen desde manifest si existe
     (el HTML ya trae el mismo contenido hardcodeado como respaldo)
     ============================================================ */
  function mountServices() {
    var track = $("[data-svc-track]");
    if (!track || track.dataset.mounted || !Array.isArray(data.services) || !data.services.length) return;
    track.dataset.mounted = "1";
    track.innerHTML = data.services.map(function (s) {
      var icon = SVC_ICONS[s.icon] || SVC_ICONS.gota;
      var tone = s.tone === "nude" ? "tone-nude" : "tone-sage";
      var includes = (s.includes || []).map(function (i) { return "<li>" + escHTML(i) + "</li>"; }).join("");
      return '<article class="svc-card ' + tone + '" data-svc-card>' +
        '<div class="svc-visual"><svg class="svc-icon" viewBox="0 0 120 120" aria-hidden="true">' + icon + "</svg></div>" +
        '<div class="svc-info">' +
        '<span class="svc-serie">' + escHTML(s.serie || "") + "</span>" +
        '<h3 class="svc-name">' + escHTML(s.name || "") + "</h3>" +
        '<p class="svc-sub">' + escHTML(s.subtitle || "") + "</p>" +
        '<ul class="svc-list">' + includes + "</ul>" +
        '<p class="svc-text">' + escHTML(s.text || "") + "</p>" +
        "</div></article>";
    }).join("");
    var total = $("[data-svc-total]");
    var head = $(".services-progress");
    if (head) {
      var bs = head.querySelectorAll("b");
      if (bs[1]) bs[1].textContent = pad2(data.services.length);
    }
  }

  function mountSchedule() {
    var box = $("[data-schedule]");
    if (!box || box.dataset.mounted || !Array.isArray(data.schedule) || !data.schedule.length) return;
    box.dataset.mounted = "1";
    box.innerHTML = data.schedule.map(function (d) {
      var icon = SCH_ICONS[d.icon] || SCH_ICONS.reloj;
      var tone = d.tone === "nude" ? "tone-nude" : d.tone === "stone" ? "tone-stone" : "tone-sage";
      return '<div class="sch-row ' + tone + (d.closed ? " is-closed" : "") + '" data-day="' + (d.day | 0) + '">' +
        '<svg class="sch-icon" viewBox="0 0 24 24" aria-hidden="true">' + icon + "</svg>" +
        '<b class="sch-day">' + escHTML(d.name || "") + "</b>" +
        '<span class="sch-hours">' + escHTML(d.hours || "") + "</span>" +
        '<span class="sch-note">' + escHTML(d.note || "") + "</span>" +
        "</div>";
    }).join("");
  }

  function mountGallery() {
    var lanes = $$(".gal-track");
    var imgs = data.gallery;
    if (!lanes.length || !Array.isArray(imgs) || !imgs.length) return;
    if (lanes[0].dataset.mounted) return;
    var third = Math.ceil(imgs.length / 3);
    var groups = [imgs.slice(0, third), imgs.slice(third, third * 2), imgs.slice(third * 2)];
    if (!groups[2].length) groups[2] = groups[0].slice().reverse();
    lanes.forEach(function (lane, i) {
      lane.dataset.mounted = "1";
      var g = groups[i] && groups[i].length ? groups[i] : imgs;
      var html = g.map(function (src) {
        return '<img src="' + escHTML(src) + '" alt="" loading="lazy" decoding="async">';
      }).join("");
      lane.innerHTML = html + html; /* duplicado para bucle infinito */
    });
  }

  function syncBrand() {
    if (!brand.whatsapp) return;
    var waBase = "https://wa.me/" + brand.whatsapp;
    $$("[data-wa-link]").forEach(function (a) {
      var m = (a.getAttribute("href") || "").match(/text=([^&]*)/);
      a.setAttribute("href", waBase + (m ? "?text=" + m[1] : ""));
    });
    $$("[data-tel-link]").forEach(function (a) {
      a.setAttribute("href", "tel:+" + brand.whatsapp);
      if (brand.phoneDisplay && /\d/.test(a.textContent)) a.textContent = brand.phoneDisplay;
    });
    var rail = $(".rail-text");
    if (rail && brand.phoneDisplay) rail.textContent = "CITA PREVIA · " + brand.phoneDisplay;

    if (brand.mapsQuery) {
      var mapsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(brand.mapsQuery);
      $$("[data-maps-link]").forEach(function (a) { a.setAttribute("href", mapsUrl); });
    }

    var promo = data.promo || {};
    var pt = $("[data-promo-title]");
    if (pt && promo.title && pt.textContent.trim() !== promo.title.trim()) pt.textContent = promo.title;
    var px = $("[data-promo-text]");
    if (px && promo.text && px.textContent.trim() !== promo.text.trim()) px.textContent = promo.text;
    var pw = $("[data-promo-wa]");
    if (pw) {
      if (promo.whatsappMessage) pw.setAttribute("href", waBase + "?text=" + encodeURIComponent(promo.whatsappMessage));
      if (promo.cta && pw.firstChild && pw.firstChild.nodeType === 3) pw.firstChild.nodeValue = promo.cta + " ";
    }
  }

  /* ============================================================
     INITS
     ============================================================ */
  function initSplash() {
    var splash = $("[data-splash]");
    if (!splash) return;
    var hide = function () { splash.classList.add("is-out"); };
    if (document.readyState === "complete") setTimeout(hide, 900);
    else window.addEventListener("load", function () { setTimeout(hide, 500); });
    setTimeout(hide, 4000); /* red de seguridad JS (la CSS actúa a los 4.5s) */
  }

  function initNav() {
    var nav = $("[data-nav]");
    var burger = $("[data-burger]");
    if (!nav) return;
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (burger) {
      burger.addEventListener("click", function () {
        var open = document.body.classList.toggle("nav-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      $$(".nav-links a").forEach(function (a) {
        a.addEventListener("click", function () {
          document.body.classList.remove("nav-open");
          burger.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  function initCursor() {
    if (!fineHover) return;
    var root = $(".cursor");
    var ring = $(".cursor-ring");
    var label = $(".cursor-label");
    if (!root || !ring) return;
    var x = 0, y = 0, rx = 0, ry = 0, first = false, raf = null;
    function loop() {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
      if (label) label.style.transform = "translate3d(" + rx + "px," + ry + "px,0) translate(-50%,-50%)";
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY;
      if (!first) {
        first = true; rx = x; ry = y;
        root.classList.add("is-ready");
        loop();
      }
    }, { passive: true });
    /* mouseover/out con relatedTarget (gotcha A.5 de la skill) */
    var SEL = "[data-cursor], a, button, select, input, textarea";
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest && e.target.closest(SEL);
      if (!t) return;
      root.classList.add("is-hover");
      if (label) label.textContent = t.getAttribute("data-cursor") || "";
    });
    document.addEventListener("mouseout", function (e) {
      var t = e.target.closest && e.target.closest(SEL);
      if (!t) return;
      if (t.contains(e.relatedTarget)) return;
      root.classList.remove("is-hover");
    });
  }

  function initReveals() {
    var items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    items.forEach(function (el) { io.observe(el); });
    /* Red de seguridad obligatoria (6s): nada se queda invisible */
    setTimeout(function () {
      $$(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      });
    }, 6000);
  }

  function initServices() {
    var section = $("[data-services]");
    var viewport = $("[data-svc-viewport]");
    var track = $("[data-svc-track]");
    var curEl = $("[data-svc-current]");
    if (!section || !viewport || !track) return;
    var cards = $$("[data-svc-card]", track);
    var N = cards.length;
    if (!N) return;

    /* Trazado de iconos al entrar cada tarjeta */
    if ("IntersectionObserver" in window) {
      var ioDraw = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-drawn");
            ioDraw.unobserve(en.target);
          }
        });
      }, { threshold: 0.05 });
      cards.forEach(function (c) { ioDraw.observe(c); });
    } else {
      cards.forEach(function (c) { c.classList.add("is-drawn"); });
    }
    setTimeout(function () {
      cards.forEach(function (c) {
        if (!c.classList.contains("is-drawn") && c.getBoundingClientRect().left < window.innerWidth * 1.2) {
          c.classList.add("is-drawn");
        }
      });
    }, 6000);

    function setCurrent(i) {
      if (curEl) curEl.textContent = pad2(clamp(i, 1, N));
    }
    setCurrent(1);

    /* --- Modo escritorio: pin + avance horizontal por scroll vertical --- */
    var mq = matchMedia("(min-width: 960px)");
    var pinActive = false;
    var distance = 0;
    var ticking = false;

    function computePin() {
      track.style.transform = "";
      distance = track.scrollWidth - viewport.clientWidth;
      if (distance < 0) distance = 0;
      section.style.setProperty("--svc-h", (window.innerHeight + distance) + "px");
    }
    function onScrollPin() {
      if (!pinActive || ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var total = section.offsetHeight - window.innerHeight;
        if (total <= 0) return;
        var y = clamp(-section.getBoundingClientRect().top, 0, total);
        var p = y / total;
        track.style.transform = "translate3d(" + (-p * distance) + "px,0,0)";
        setCurrent(Math.floor(p * (N - 0.0001)) + 1);
      });
    }
    function enablePin() {
      if (pinActive) return;
      pinActive = true;
      section.classList.add("js-pin");
      computePin();
      window.addEventListener("scroll", onScrollPin, { passive: true });
      onScrollPin();
    }
    function disablePin() {
      if (!pinActive) return;
      pinActive = false;
      section.classList.remove("js-pin");
      section.style.removeProperty("--svc-h");
      track.style.transform = "";
      window.removeEventListener("scroll", onScrollPin);
    }
    function applyMode() {
      if (mq.matches) enablePin(); else disablePin();
    }
    applyMode();
    if (mq.addEventListener) mq.addEventListener("change", applyMode);
    window.addEventListener("resize", function () { if (pinActive) computePin(); });

    /* --- Modo móvil: swipe nativo + progreso por posición --- */
    var tickM = false;
    viewport.addEventListener("scroll", function () {
      if (pinActive || tickM) return;
      tickM = true;
      requestAnimationFrame(function () {
        tickM = false;
        var center = viewport.scrollLeft + viewport.clientWidth / 2;
        var best = 1, bestD = Infinity;
        cards.forEach(function (c, i) {
          var cc = c.offsetLeft + c.offsetWidth / 2;
          var d = Math.abs(cc - center);
          if (d < bestD) { bestD = d; best = i + 1; }
        });
        setCurrent(best);
      });
    }, { passive: true });
  }

  function initTilt() {
    if (matchMedia("(hover: none)").matches) return;
    $$("[data-tilt]").forEach(function (el) {
      if (el.dataset.tiltBound) return;
      el.dataset.tiltBound = "1";
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", (px * 5) + "deg");
        el.style.setProperty("--rx", (-py * 5) + "deg");
      });
      el.addEventListener("pointerleave", function () {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  }

  function initScheduleToday() {
    var today = new Date().getDay();
    var row = $('[data-schedule] [data-day="' + today + '"]');
    if (row) row.classList.add("is-today");
  }

  function initForm() {
    var form = $("[data-cita-form]");
    if (!form) return;
    var err = $("[data-form-error]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = (form.nombre.value || "").trim();
      var tel = (form.telefono.value || "").trim();
      var servicio = form.servicio ? form.servicio.value : "";
      var dia = (form.dia.value || "").trim();
      var nota = (form.nota.value || "").trim();
      if (!nombre || !tel) {
        if (err) err.hidden = false;
        return;
      }
      if (err) err.hidden = true;
      var msg = "Hola! Soy " + nombre + " y quiero pedir cita 💇‍♀️\n" +
        "· Servicio: " + servicio + "\n" +
        "· Día preferido: " + (dia || "me adapto") + "\n" +
        "· Mi teléfono: " + tel +
        (nota ? "\n· Nota: " + nota : "");
      var wa = brand.whatsapp || "34962541073";
      window.open("https://wa.me/" + wa + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  /* ============================================================
     BOOT (orden de la skill: mounts → inits)
     ============================================================ */
  function boot() {
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");

    safe(mountServices, "mountServices");
    safe(mountSchedule, "mountSchedule");
    safe(mountGallery, "mountGallery");
    safe(syncBrand, "syncBrand");

    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initCursor, "initCursor");
    safe(initReveals, "initReveals");
    safe(initServices, "initServices");
    safe(initTilt, "initTilt");
    safe(initScheduleToday, "initScheduleToday");
    safe(initForm, "initForm");

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
