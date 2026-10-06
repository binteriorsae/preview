(function () {
  var sw = [].slice.call(document.querySelectorAll('.sw'));
  sw.forEach(function (s) {
    s.addEventListener('click', function () {
      var on = s.classList.contains('on');
      sw.forEach(function (x) { x.classList.remove('on'); });
      if (!on) s.classList.add('on');
    });
  });
})();
