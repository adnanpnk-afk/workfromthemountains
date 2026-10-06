/* Work From The Mountains · draft site script (no dependencies)
   1) loads the concept flyover video only when it makes sense
   2) handles the waitlist form through a pluggable backend            */

/* ================= FORM BACKEND SETTINGS (edit at launch) =================
   "local"    : DRAFT MODE. Shows the thank-you message, sends nothing anywhere.
   "netlify"  : Netlify Forms. Site must be hosted on Netlify with form detection on.
   "endpoint" : any service that accepts a POST (Formspree, Getform, Basin...).
                Put its URL in FORM_ENDPOINT, e.g. "https://formspree.io/f/XXXXXXX".
   ========================================================================== */
var FORM_MODE = "local";
var FORM_ENDPOINT = ""; // PLACEHOLDER: only used when FORM_MODE = "endpoint"

(function () {
  "use strict";

  /* ---------- 1. concept flyover video ---------- */
  var v = document.getElementById("flyover");
  if (v) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var c = navigator.connection || {};
    var saveData = c.saveData || /(^|-)2g$/.test(c.effectiveType || "");
    if (reduce || saveData) {
      v.setAttribute("poster", "assets/img/flyover-still.webp"); // still image only, no download
    } else {
      var add = function (src, type) { var s = document.createElement("source"); s.src = src; s.type = type; v.appendChild(s); };
      add(v.dataset.webm, "video/webm");
      add(v.dataset.mp4, "video/mp4");
      v.preload = "auto";
      v.autoplay = true;
      v.load();
      var p = v.play(); if (p && p.catch) p.catch(function () {});
      // pause when off-screen to save battery
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (es) {
          es.forEach(function (e) { if (e.isIntersecting) { var q = v.play(); if (q && q.catch) q.catch(function(){}); } else v.pause(); });
        }, { threshold: 0.1 }).observe(v);
      }
    }
  }

  /* ---------- 2. waitlist form ---------- */
  var yr = document.getElementById("yr"); if (yr) yr.textContent = new Date().getFullYear();

  var form = document.getElementById("waitlist-form");
  var done = document.getElementById("form-done");
  if (!form || !done) return;
  var err = form.querySelector(".form-error");
  var btn = form.querySelector('button[type="submit"]');

  function markInvalid() {
    var first = null;
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.willValidate || el.name === "bot-field") return;
      var bad = !el.checkValidity();
      var target = el.type === "checkbox" ? el.closest(".consent") : el;
      if (target) target.classList.toggle("invalid", bad);
      if (bad && !first) first = el;
    });
    return first;
  }
  form.addEventListener("input", function (e) {
    var el = e.target, t = el.type === "checkbox" ? el.closest(".consent") : el;
    if (t && t.classList.contains("invalid") && el.checkValidity()) t.classList.remove("invalid");
  });

  function showDone(isDraft) {
    form.hidden = true;
    done.hidden = false;
    if (isDraft) document.getElementById("draft-note").hidden = false;
    done.focus();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    err.hidden = true;
    var first = markInvalid();
    if (first) {
      err.textContent = "Please check the highlighted fields.";
      err.hidden = false;
      first.focus();
      return;
    }
    if (form.elements["bot-field"] && form.elements["bot-field"].value) { showDone(false); return; } // bot

    if (FORM_MODE === "local") { showDone(true); return; } // DRAFT: nothing leaves the browser

    var data = new FormData(form);
    var req;
    if (FORM_MODE === "netlify") {
      req = fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
                         body: new URLSearchParams(data).toString() });
    } else if (FORM_MODE === "endpoint" && FORM_ENDPOINT) {
      req = fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
    } else {
      err.textContent = "The waitlist isn't connected yet. Please follow us on Instagram for now.";
      err.hidden = false; return;
    }
    btn.disabled = true; btn.textContent = "Sending…";
    req.then(function (r) {
      if (!r.ok) throw new Error(r.status);
      showDone(false);
    }).catch(function () {
      err.textContent = "Sorry, that didn't go through. Please try again in a moment.";
      err.hidden = false;
    }).then(function () { btn.disabled = false; btn.textContent = "Join the waitlist"; });
  });

})();
