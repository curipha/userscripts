// ==UserScript==
// @name           Amazon personal filter
// @namespace      curipha
// @description    Obscure annoying contents from search result and best sellers
// @include        http://www.amazon.co.jp/*
// @include        https://www.amazon.co.jp/*
// @version        0.0.1
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
        var h2 = item.querySelector('h2');
        if (!h2) continue;
        if (pattern.test(h2.innerHTML)) item.style.opacity = opacity;
      }
    };

    var mo = new MutationObserver(opaque_result);
    mo.observe(document.body, { childList: true, subtree: true });
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

    var mo = new MutationObserver(opaque_bestseller);
    mo.observe(document.body, { childList: true });
  }
})();
