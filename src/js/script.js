// =============================================================
//  AMOPH · script.js (ELEVENTY VERSION)
// =============================================================

// ─── MOBILE NAV ──────────────────────────────────────────────

function toggleMobileNav() {
  var nav = document.getElementById('mobile-nav');
  var hamburger = document.getElementById('hamburger');
  if (!nav || !hamburger) return;

  var isOpen = nav.classList.contains('open');

  document.body.classList.toggle('nav-open');

  if (isOpen) {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  } else {
    nav.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }
}

function closeMobileNav() {
  var nav = document.getElementById('mobile-nav');
  var hamburger = document.getElementById('hamburger');

  if (nav) nav.classList.remove('open');

  if (hamburger) {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  document.body.classList.remove('nav-open');
}

// ─── DOM READY ───────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {

  // HAMBURGER
  var hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMobileNav();
    });
  }

  // CLOSE ON ESCAPE
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
  });

  // ACTIVE NAV
  var path = window.location.pathname;
  document.querySelectorAll('.site-header__links a').forEach(function (link) {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });

  // CLOSE MENU ON LINK CLICK
  document.querySelectorAll('#mobile-nav a').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  // CLOSE NAV ON OUTSIDE CLICK
  document.addEventListener('click', function (e) {
    var nav = document.getElementById('mobile-nav');
    var hb = document.getElementById('hamburger');
    if (nav && nav.classList.contains('open')) {
      if (!nav.contains(e.target) && hb && !hb.contains(e.target)) {
        closeMobileNav();
      }
    }
  });

  // NAVBAR SCROLL EFFECT
  window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
  });

});