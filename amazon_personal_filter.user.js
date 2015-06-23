// ==UserScript==
// @name           Amazon personal filter
// @namespace      curipha
// @description    Obscure annoying contents from search result and best sellers
// @include        http://www.amazon.co.jp/*
// @include        https://www.amazon.co.jp/*
// @version        0.0.3
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  if (document.contentType !== 'text/html') return;

  var opacity = 0.2;
  var pattern = /(無料|立ち?読み|お試し|(試し?|ためし)読|スターター|STARTER|ダイジェスト|雑誌|([^0-9０-９][0０]|創刊)号|[Vv]ol *[．\.] *[0０]([^0-9０-９]|$))/;

  var opaque = function(list_selector, item_selector) {
    return function() {
      var result = document.body.querySelectorAll(list_selector);
      for (var item of result) {
        var title = item.querySelector(item_selector);
        if (!title) continue;
        if (pattern.test(title.textContent)) item.style.opacity = opacity;
      }
    };
  };

  // Search result
  if (document.getElementById('searchTemplate')) {
    var mo_sr = new MutationObserver(opaque('#searchTemplate .s-result-item', 'h2'));
    mo_sr.observe(document.body, { childList: true, subtree: true });
  }
  if (document.getElementById('mainResults')) {
    var mo_sr2 = new MutationObserver(opaque('#mainResults [id^="result_"]', 'h3 .lrg'));
    mo_sr2.observe(document.body, { childList: true });
  }

  // Best sellers
  if (document.getElementById('zg_col1')) {
    var mo_bs = new MutationObserver(opaque('#zg_col1 .zg_item_compact', '.zg_title'));
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
