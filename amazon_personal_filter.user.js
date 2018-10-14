// ==UserScript==
// @name           Amazon personal filter
// @namespace      curipha
// @description    Obscure annoying contents from search result and best sellers
// @include        https://www.amazon.co.jp/gp/bestsellers/*
// @include        https://www.amazon.co.jp/gp/search*
// @include        https://www.amazon.co.jp/s/*
// @version        0.2.1
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  'use strict';

  const block = [
    '無料',
    '(お(試|ため)し|分冊|単話|立ち読み|ダイジェスト|Web)版',
    '試し?読', '(立ち|ためし)読み', 'スターターブック', 'STARTER BOOK',
    '\\[雑誌\\]',
    '【(見本|ばら売り|単話売?)】',

    '第[0-9０-９一二三四五六七八九十]+話',
    '([Vv]ol|VOL)[. ．　]*[0０]+($|\\s)',
    '([^0-9０-９][0０]|創刊)号($|\\s)',
    '20[0-9]{2}年[0-9]{2}月号$',

    'プチ(キス|デザ)',
    'おためしCOMICリュウ',
  ];
  const label = [
    '0マガ',
    'arca comics', 'B-Levo', 'Blancblue', 'BL★オトメチカ', 'BL宣言', 'Charaコミックス', 'Colorful!', 'COMIC維新(|ZERO|★GIRLS)',
    'Framu?', 'G☆Girls', 'HertZ&CRAFT', 'KATTS', 'MENSスクリーモ', 'moment', 'motto!いけない愛恋', 'NINO',
    'piccomics', 'PsycheLoss', 'TL(★オトメチカ|スクリーモ)',
    'アメイロ', 'アンプリール', 'イキッパ！！comics', 'いけない愛恋', 'いちごみるくコミック', 'エロマンガ島', '大人の極嬢絵本', 'ｵﾔｼﾞｽﾞﾑ', '女の子のヒミツ',
    '快感倶楽部', '家庭サスペンス', 'カワイスギ！', '黒猫書房', '黒ひめコミック', '恋するｿﾜﾚ', 'コイハナ', 'KoiYui（恋結）', 'コミックBookmark！', 'コミックHIMEクリ[ア-ンー]+',
    'シガリロS?', '秋水社/MAHK', 'ジューシーラブ', 'ｽｷして\\?桃色日記', 'ズズズキュン！', 'ズレット！', '絶対領域R!',
    'ナイトコミック', '濃蜜エクスタシー120%',
    'ハーレクインコミックス', '肌恋（コミックノベル）', '肌恋BL\\(コミックノベル\\)', '侍侍', '秘蜜クラブ', 'ピーチピンクコミックス', 'フェアボーイコミックス',
    'メンズ宣言', 'もえスタBEAST', 'モバイル恋愛宣言', 'モバスペBOOK', '桃色ｴﾝｼﾞｪﾙ',
    'ヤング宣言',
    'ラブきゅんコミック', 'ラブドキッ。Bookmark！', 'らぶまん☆(|boyz)', 'らめぇコミック', 'ラルーナコミックス', 'リア×ロマ', 'リリィベル', '恋愛宣言',
  ];

  const opacity = 0.2;
  const pattern = new RegExp(`(${block.join('|')}|${label.map(v => `\\(${v}\\)$`).join('|')})`, 'u');

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
