(function () {
  "use strict";

  var sections = Array.prototype.slice.call(
    document.querySelectorAll("section.talk-section[id]")
  );
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".site-nav a[href^='#']")
  );
  var helpOverlay = document.getElementById("helpOverlay");

  function sectionIds() {
    return sections.map(function (s) {
      return s.id;
    });
  }

  function currentIndex() {
    var y = window.scrollY + 80;
    var idx = 0;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= y) idx = i;
    }
    return idx;
  }

  function goToIndex(i) {
    if (i < 0 || i >= sections.length) return;
    var el = sections[i];
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (history.replaceState) {
      history.replaceState(null, "", "#" + el.id);
    }
  }

  function setActive(id) {
    navLinks.forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === "#" + id) {
        a.classList.add("active");
        a.setAttribute("aria-current", "true");
      } else {
        a.classList.remove("active");
        a.removeAttribute("aria-current");
      }
    });
  }

  /* Sticky active section on scroll */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var idx = currentIndex();
      if (sections[idx]) setActive(sections[idx].id);
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Hash on load */
  if (location.hash) {
    var hashId = location.hash.slice(1);
    if (sectionIds().indexOf(hashId) !== -1) setActive(hashId);
  }

  function isTypingTarget(el) {
    if (!el) return false;
    var tag = el.tagName;
    return (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT" ||
      el.isContentEditable
    );
  }

  function isFilmTarget(el) {
    if (!el) return false;
    if (el.tagName === "VIDEO") return true;
    return !!(el.closest && el.closest(".film-block"));
  }

  function openHelp() {
    if (!helpOverlay) return;
    helpOverlay.hidden = false;
    helpOverlay.classList.add("open");
  }

  function closeHelp() {
    if (!helpOverlay) return;
    helpOverlay.classList.remove("open");
    helpOverlay.hidden = true;
  }

  function toggleHelp() {
    if (!helpOverlay) return;
    if (helpOverlay.classList.contains("open")) closeHelp();
    else openHelp();
  }

  document.addEventListener("keydown", function (e) {
    if (isTypingTarget(e.target)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    var key = e.key;

    if (key === "?" || (key === "/" && e.shiftKey)) {
      e.preventDefault();
      toggleHelp();
      return;
    }

    if (key === "Escape") {
      if (helpOverlay && helpOverlay.classList.contains("open")) {
        e.preventDefault();
        closeHelp();
      }
      return;
    }

    if (helpOverlay && helpOverlay.classList.contains("open")) return;
    if (isFilmTarget(e.target)) return;

    var idx = currentIndex();

    if (key === "j" || key === "ArrowDown" || key === "ArrowRight" || key === "PageDown") {
      e.preventDefault();
      goToIndex(idx + 1);
      return;
    }
    if (key === "k" || key === "ArrowUp" || key === "ArrowLeft" || key === "PageUp") {
      e.preventDefault();
      goToIndex(idx - 1);
      return;
    }
    if (key === "Home") {
      e.preventDefault();
      goToIndex(0);
      return;
    }
    if (key === "End") {
      e.preventDefault();
      goToIndex(sections.length - 1);
    }
  });

  if (helpOverlay) {
    helpOverlay.addEventListener("click", function (e) {
      if (e.target === helpOverlay) closeHelp();
    });
  }

  /* Opening film review controls */
  (function initOpeningFilm() {
    var video = document.getElementById("openingFilm");
    if (!video) return;
    var block = video.closest ? video.closest(".film-block") : null;
    if (!block) return;
    var toggleBtn = block.querySelector('[data-film="toggle"]');

    function clampTime(t) {
      var d = video.duration;
      if (!isFinite(d) || d <= 0) return Math.max(0, t);
      return Math.max(0, Math.min(t, d));
    }

    function updateToggleLabel() {
      if (!toggleBtn) return;
      if (video.paused) {
        toggleBtn.textContent = "▶ Play";
        toggleBtn.title = "Play";
      } else {
        toggleBtn.textContent = "⏸ Pause";
        toggleBtn.title = "Pause";
      }
    }

    block.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("[data-film]") : null;
      if (!btn || !block.contains(btn)) return;
      var action = btn.getAttribute("data-film");
      if (action === "restart") {
        video.currentTime = 0;
        video.play();
      } else if (action === "back") {
        video.currentTime = clampTime(video.currentTime - 10);
      } else if (action === "fwd") {
        video.currentTime = clampTime(video.currentTime + 10);
      } else if (action === "toggle") {
        if (video.paused) video.play();
        else video.pause();
      }
    });

    video.addEventListener("play", updateToggleLabel);
    video.addEventListener("pause", updateToggleLabel);
    updateToggleLabel();
  })();
})();
