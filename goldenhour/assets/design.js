(function () {
  var T = [
    { k: 'morning', n: 'Morning', t: '7:40 am' },
    { k: 'midday', n: 'Midday', t: '12:30 pm' },
    { k: 'golden', n: 'Golden hour', t: '6:05 pm' },
    { k: 'evening', n: 'Evening', t: '8:45 pm' }
  ];
  var cur = 2;
  try { var s = parseInt(sessionStorage.getItem('gh-time'), 10); if (s >= 0 && s <= 3) cur = s; } catch (e) {}
  var ov = document.createElement('div'); ov.id = 'gh-overlay'; document.body.appendChild(ov);
  var ctl = document.createElement('div'); ctl.id = 'gh-ctl';
  ctl.innerHTML = '<svg viewBox="0 0 104 42" aria-hidden="true"><path class="arc" d="M6 38Q52 -26 98 38"/><circle class="sun" r="7" cx="6" cy="38"/></svg>' +
    '<div class="lbl"><b></b><span></span></div>' +
    '<input type="range" min="0" max="3" step="1" aria-label="Time of day">';
  document.body.appendChild(ctl);
  var inp = ctl.querySelector('input'), sun = ctl.querySelector('.sun'), b = ctl.querySelector('b'), sp = ctl.querySelector('span');
  function pt(t) {  // point along the arc (quadratic bezier)
    var x = (1 - t) * (1 - t) * 6 + 2 * (1 - t) * t * 52 + t * t * 98;
    var y = (1 - t) * (1 - t) * 38 + 2 * (1 - t) * t * (-26) + t * t * 38;
    return [x, y];
  }
  function set(i) {
    cur = i;
    document.documentElement.setAttribute('data-time', T[i].k);
    b.textContent = T[i].n; sp.textContent = T[i].t;
    var p = pt(i / 3); sun.setAttribute('cx', p[0]); sun.setAttribute('cy', p[1]);
    inp.value = i;
    try { sessionStorage.setItem('gh-time', i); } catch (e) {}
  }
  inp.addEventListener('input', function () { set(+inp.value); });
  set(cur);
})();
