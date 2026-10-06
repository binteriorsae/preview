(function () {
  var z = 10;
  function drag(el) {
    var sx, sy, ox, oy, on = false;
    el.addEventListener('pointerdown', function (e) {
      if (window.innerWidth < 981 || e.target.closest('a')) return;
      on = true; sx = e.clientX; sy = e.clientY;
      ox = parseFloat(el.style.getPropertyValue('--dx')) || 0;
      oy = parseFloat(el.style.getPropertyValue('--dy')) || 0;
      el.setPointerCapture(e.pointerId); el.style.zIndex = ++z; el.classList.add('lift');
    });
    el.addEventListener('pointermove', function (e) {
      if (!on) return;
      el.style.setProperty('--dx', (ox + e.clientX - sx) + 'px');
      el.style.setProperty('--dy', (oy + e.clientY - sy) + 'px');
    });
    function end() { on = false; el.classList.remove('lift'); }
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  }
  [].forEach.call(document.querySelectorAll('.mb-item'), drag);
})();
