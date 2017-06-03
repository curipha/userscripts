// ==UserScript==
// @name           Amazon personal filter
// @namespace      curipha
// @description    Obscure annoying contents from search result and best sellers
// @include        https://www.amazon.co.jp/*
// @exclude        https://www.amazon.co.jp/ap/*
// @exclude        https://www.amazon.co.jp/mn/*
// @exclude        https://www.amazon.co.jp/clouddrive*
// @version        0.1.8
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  'use strict';

  const block = [
    '無料', '期間限定', '見本',
    '(試し?|ためし|立ち?)読', 'お(試|ため)し', 'スターター', 'STARTER', 'ダイジェスト', '分冊', '単話', '(1話|ばら)売り',
    '雑誌', 'Web版', '未分類',
    '([^0-9０-９][0０]|創刊)号', '([Vv]ol|VOL)[. ．　]*[0０]([^0-9０-９]|$)',

    // Rubbish label
    'プチ(キス|デザ|ララ)', 'ハーレクイン', 'セキララ文庫', 'ラブきゅんコミック', '夢ちゅうこみっくす', 'いけない愛恋',
    'ラブドキッ。Bookmark！', '女の子のヒミツ', '純愛革命G!', '黒猫書房', 'モバスぺBook', 'ｽｷして\\?桃色日記', 'リア×ロマ',
    'BL宣言', '極上男子F!'
  ];

  const opacity = 0.2;
  const pattern = new RegExp('(' + block.join('|') + ')', 'u');

  const opaque = function(list_selector, item_selector, title_func) {
    const gettitle = title_func || (function(elem) { return elem.getAttribute('title') || elem.textContent; });

    return function() {
      const result = document.body.querySelectorAll(list_selector);
      for (let item of result) {
        const title = item.querySelector(item_selector);
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

  const mo = [];

  // Search result
  if (document.getElementById('searchTemplate')) {
    mo.push(new MutationObserver(opaque('#searchTemplate .s-result-item', 'h2')));
  }
  if (document.getElementById('mainResults')) {
    mo.push(new MutationObserver(opaque('#mainResults [id^="result_"]', 'h3 .lrg')));
  }

  // Best sellers
  if (document.getElementById('zg_col1')) {
    mo.push(new MutationObserver(opaque('#zg_col1 .zg_item_compact', '.p13n-sc-truncated')));
  }


  mo.map(function(m) { m.observe(document.body, { childList: true, subtree: true }); });
})();
