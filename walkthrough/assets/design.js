(function () {
  var scenes = [].slice.call(document.querySelectorAll('.scene'));
  if (!scenes.length) return;
  var names = { entry: 'Entrance', living: 'Living room', kitchen: 'Kitchen', bedroom: 'Bedroom', bath: 'Bathroom' };
  var rooms = ['entry', 'living', 'kitchen', 'bedroom', 'bath'];
  var tourGs = [].slice.call(document.querySelectorAll('.tour .plan g'));
  var bigGs = [].slice.call(document.querySelectorAll('.planbg .plan g'));
  var no = document.getElementById('roomNo'), nm = document.getElementById('roomName');
  function set(room) {
    scenes.forEach(function (s) { s.classList.toggle('on', s.dataset.room === room); });
    tourGs.forEach(function (g) { g.classList.toggle('on', g.dataset.room === room); });
    var i = rooms.indexOf(room);
    if (no) no.textContent = '0' + (i + 1);
    if (nm) nm.textContent = names[room];
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) set(e.target.dataset.room); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  scenes.forEach(function (s) { io.observe(s); });
  set('entry');
  // the hero plan wanders through the rooms on its own
  var k = 0;
  setInterval(function () {
    bigGs.forEach(function (g) { g.classList.toggle('on', g.dataset.room === rooms[k % 5]); });
    k++;
  }, 2200);
})();
