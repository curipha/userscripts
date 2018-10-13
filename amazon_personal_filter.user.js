// ==UserScript==
// @name           Amazon personal filter
// @namespace      curipha
// @description    Obscure annoying contents from search result and best sellers
// @include        https://www.amazon.co.jp/*
// @exclude        https://www.amazon.co.jp/ap/*
// @exclude        https://www.amazon.co.jp/mn/*
// @exclude        https://www.amazon.co.jp/clouddrive*
// @version        0.1.9
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  'use strict';

  const block = [
    '無料', '期間限定', '見本',
    '(試し?|ためし|立ち?)読', 'お(試|ため)し', 'スターター', 'STARTER', 'ダイジェスト', '分冊', '単話', '(話|ばら)売り',
    '雑誌', 'Web版', '未分類',
    '([^0-9０-９][0０]|創刊)号', '([Vv]ol|VOL)[. ．　]*[0０]([^0-9０-９]|$)',

    // Rubbish label
    'プチ(キス|デザ|ララ)', 'ハーレクイン', 'セキララ文庫', 'ラブきゅんコミック', '夢ちゅうこみっくす', 'いけない愛恋',
    '(ラブドキッ。|コミック)Bookmark！', '女の子のヒミツ', '純愛革命G!', '黒猫書房', 'モバスぺBook', 'ｽｷして\\?桃色日記', 'リア×ロマ',
    '(BL|恋愛|少女)宣言', '極上男子F!', 'Sプリ', 'ジューシーラブ', '濃蜜エクスタシー120%', 'アンプリール', '絶対恋愛Sweet',
    '家庭サスペンス', '蜜愛エスカレーション', 'コミックジンガイ', 'ペット宣言', 'COMIC維新', 'コミックHIMEクリ', '絶対領域R!',
    'BLスクリーモ', '肌恋', '恋するｿﾜﾚ', 'ｵﾔｼﾞｽﾞﾑ', 'アリアンローズコミックス', 'ロマンス宣言', 'モバスペBOOK', 'カワイスギ！',
    'ピーチピンクコミックス', 'フェアボーイコミックス', '黒ひめコミック'
  ];

  const opacity = 0.2;
  const pattern = new RegExp('(' + block.join('|') + ')', 'u');

  const opaque = function(list_selector, item_selector) {
    return function() {
      const result = document.body.querySelectorAll(list_selector);
      for (let item of result) {
        const title = item.querySelector(item_selector);
        if (title) {
          if (pattern.test((title.getAttribute('title') || title.textContent).trim())) {
            item.style.opacity = opacity;
          }
          else if (item.style.opacity === opacity) {
            item.style.opacity = 1;
          }
        }
      }
    };
  };

  const observe = function(area_id, list_selector, item_selector) {
    const area = document.getElementById(area_id);
    if (area) {
      const mo = new MutationObserver(opaque(`#${area_id} ${list_selector}`, item_selector));
      mo.observe(area, { childList: true, subtree: true });
    }
  };


  // Search result
  observe('searchTemplate', '.s-result-item', 'h2');
  observe('mainResults', '[id^="result_"]', 'h3 .lrg');

  // Best sellers
  observe('zg_col1', '.zg_item_compact', '.p13n-sc-truncated');
})();
