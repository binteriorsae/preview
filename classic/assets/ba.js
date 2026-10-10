(function () {
  // keep "Portfolio" highlighted in the menu on project pages
  var nav = document.querySelector('nav.main a[href="portfolio.html"]');
  if (nav) nav.classList.add('active');

  [].forEach.call(document.querySelectorAll('.ba'), function (b) {
    var r = b.querySelector('input');
    function set(v) { b.style.setProperty('--pos', v + '%'); }
    r.addEventListener('input', function () { set(r.value); b.classList.add('touched'); });

    // small intro sweep the first time the slider scrolls into view
    var played = false;
    new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting || played || b.classList.contains('touched')) return;
      played = true;
      var t0 = performance.now(), from = 10, to = 50;
      (function tick(t) {
        if (b.classList.contains('touched')) return;
        var p = Math.min((t - t0) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
        var v = from + (to - from) * e; set(v); r.value = v;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }, { threshold: .5 }).observe(b);
  });
})();
