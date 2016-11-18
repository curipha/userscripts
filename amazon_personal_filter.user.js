// ==UserScript==
// @name           Amazon personal filter
// @namespace      curipha
// @description    Obscure annoying contents from search result and best sellers
// @include        http://www.amazon.co.jp/*
// @include        https://www.amazon.co.jp/*
// @version        0.1.1
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  'use strict';

  if (document.contentType !== 'text/html') return;

  var opacity = 0.2;
  var pattern = /(無料|期間限定|(試|立ち?)読|(試|ため)し|スターター|STARTER|ダイジェスト|分冊|単話|(1話|ばら)売り|雑誌|Web版|未分類|プチ(キス|デザ|ララ)|ハーレクイン|([^0-9０-９][0０]|創刊)号|[Vv]ol[\s．\.]*[0０]([^0-9０-９]|$))/;

  var opaque = function(list_selector, item_selector, title_func) {
    var gettitle = title_func || (function(elem) { return elem.getAttribute('title') || elem.textContent });

    return function() {
      var result = document.body.querySelectorAll(list_selector);
      for (var item of result) {
        var title = item.querySelector(item_selector);
        if (title) {
          if (pattern.test(gettitle(title).trim())) {
            item.style.opacity = opacity;
          }
          else {
            if (item.style.opacity == opacity) item.style.opacity = 1;
          }
        }
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
    var mo_bs = new MutationObserver(opaque('#zg_col1 .zg_item_compact', '.a-col-right .a-link-normal[rel]'));
    mo_bs.observe(document.body, { childList: true });
  }

  // Personalized item list
  var mo_il = new MutationObserver(opaque('.s9hl', 'a.title[title]'));
  mo_il.observe(document.body, { childList: true });
  var mo_il2 = new MutationObserver(opaque('#buttonWrapper .shoveler-cell', '.p13n-link div[class^="p13n-sc-"]'));
  mo_il2.observe(document.body, { childList: true, subtree: true });
})();
