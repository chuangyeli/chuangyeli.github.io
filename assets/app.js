
(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (btn && nav) btn.addEventListener('click', function () { nav.classList.toggle('open'); });

  var q = document.getElementById('q');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.res-card'));

  function setCards(v) { cards.forEach(function (c) { c.style.display = v; }); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c];
    });
  }

  var idx = null, loading = false, timer = null;

  function loadIdx(cb) {
    if (idx) return cb(idx);
    if (loading) { setTimeout(function () { loadIdx(cb); }, 120); return; }
    loading = true;
    fetch('/data/search-index.json?v=3330e3e8').then(function (r) { return r.json(); })
      .then(function (d) { idx = d; loading = false; cb(idx); })
      .catch(function () { loading = false; cb(null); });
  }

  function resultBox() {
    var b = document.getElementById('search-results');
    if (!b) {
      b = document.createElement('div');
      b.id = 'search-results';
      b.className = 'section';
      var sb = document.querySelector('.search-box');
      if (sb && sb.parentNode) sb.parentNode.insertBefore(b, sb.nextSibling);
      else document.body.insertBefore(b, document.body.firstChild);
    }
    return b;
  }

  function showHits(kw, hits) {
    var b = resultBox();
    if (!hits.length) {
      b.innerHTML = '<div class="empty">\u672a\u627e\u5230\u4e0e\u300c' + esc(kw) + '\u300d\u76f8\u5173\u7684\u8d44\u6e90</div>';
      return;
    }
    var h = '<div class="section-head"><h2 class="section-title">\u641c\u7d22\u7ed3\u679c</h2><span class="section-count">' + hits.length + ' \u6761</span></div><div class="card-grid three">';
    hits.forEach(function (it) {
      h += '<a class="res-card" href="' + esc(it.u) + '" target="_blank" rel="noopener nofollow">'
        + '<div class="res-card-body"><h3 class="res-title">' + esc(it.t) + '</h3>'
        + '<span class="res-meta">' + esc(it.c) + '</span></div><span class="res-arrow">\u2192</span></a>';
    });
    h += '</div>';
    b.innerHTML = h;
  }

  if (q) {
    q.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var kw = q.value.trim().toLowerCase();
        var old = document.getElementById('search-results');
        if (!kw) { if (old) old.remove(); setCards(''); return; }
        loadIdx(function (d) {
          if (!d) {
            resultBox().innerHTML = '<div class="empty">\u641c\u7d22\u7d22\u5f15\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc</div>';
            return;
          }
          setCards('none');
          var hits = [];
          for (var i = 0; i < d.length && hits.length < 80; i++) {
            if (String(d[i].t).toLowerCase().indexOf(kw) !== -1) hits.push(d[i]);
          }
          showHits(q.value.trim(), hits);
        });
      }, 200);
    });
  }
})();
