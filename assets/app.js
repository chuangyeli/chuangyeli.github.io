
(function () {
  // 移动端导航
  var btn = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (btn && nav) btn.addEventListener('click', function () { nav.classList.toggle('open'); });

  // 客户端搜索（首页）
  var q = document.getElementById('q');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.res-card'));
  if (q && cards.length) {
    q.addEventListener('input', function () {
      var kw = q.value.trim().toLowerCase();
      cards.forEach(function (c) {
        var hay = (c.getAttribute('data-search') || '').toLowerCase();
        c.style.display = (!kw || hay.indexOf(kw) !== -1) ? '' : 'none';
      });
    });
  }
})();
