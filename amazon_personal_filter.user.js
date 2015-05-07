// ==UserScript==
// @name           Amazon personal filter
// @namespace      curipha
// @description    Obscure annoying contents from search result and best sellers
// @include        http://www.amazon.co.jp/*
// @include        https://www.amazon.co.jp/*
// @version        0.0.2
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  if (document.contentType !== 'text/html') return;

  var opacity = 0.2;
  var pattern = /(無料|立ち?読み|お試し|試し?読|スターター|STARTER)/;

  // Search result
  if (document.getElementById('searchTemplate')) {
    var opaque_result = function() {
      var result = document.body.querySelectorAll('#searchTemplate .s-result-item');
      for (var item of result) {
        var title = item.querySelector('h2');
        if (!title) continue;
        if (pattern.test(title.innerHTML)) item.style.opacity = opacity;
      }
    };

    var mo_sr = new MutationObserver(opaque_result);
    mo_sr.observe(document.body, { childList: true, subtree: true });
  }
  if (document.getElementById('mainResults')) {
    var opaque_result2 = function() {
      var result = document.body.querySelectorAll('#mainResults [id^="result_"]');
      for (var item of result) {
        var title = item.querySelector('h3 .lrg');
        if (!title) continue;
        if (pattern.test(title.innerHTML)) item.style.opacity = opacity;
      }
    };

    var mo_sr2 = new MutationObserver(opaque_result2);
    mo_sr2.observe(document.body, { childList: true });
  }

  // Best sellers
  if (document.getElementById('zg_col1')) {
    var opaque_bestseller = function() {
      var result = document.body.querySelectorAll('#zg_col1 .zg_item_compact');
      for (var item of result) {
        var title = item.querySelector('.zg_title');
        if (!title) continue;
        if (pattern.test(title.innerHTML)) item.style.opacity = opacity;
      }
    };

    var mo_bs = new MutationObserver(opaque_bestseller);
    mo_bs.observe(document.body, { childList: true });
  }

  // General item list
  var opaque_itemlist = function() {
    var result = document.getElementsByClassName('s9hl');
    for (var item of result) {
      var title = item.querySelector('a.title[title]');
      if (!title) continue;
      if (pattern.test(title.getAttribute('title'))) item.style.opacity = opacity;
    }
  };

  var mo_il = new MutationObserver(opaque_itemlist);
  mo_il.observe(document.body, { childList: true });
})();
