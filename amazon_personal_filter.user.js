// ==UserScript==
// @name           Amazon personal filter
// @namespace      curipha
// @description    Obscure annoying contents from search result and best sellers
// @include        https://www.amazon.co.jp/gp/bestsellers/*
// @include        https://www.amazon.co.jp/s*
// @version        0.3.1
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  'use strict';

  const block = [
    '無料',
    '第[0-9０-９一二三四五六七八九十]+話',
  ];

  const opacity = 0.2;
  const pattern = new RegExp(`(${block.join('|')})`, 'u');

  const opaque = (list_selector, item_selector) => {
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

        // Hide sponser product (Only for search result pages)
        const spprod = item.querySelector('h2 > a[href^="/gp/slredirect/"]');
        if (spprod) {
          item.style.opacity = opacity;
        }
      }
    };
  };

  const observe = (area_id, list_selector, item_selector) => {
    const area = document.getElementById(area_id);
    if (area) {
      const mo = new MutationObserver(opaque(`#${area_id} ${list_selector}`, item_selector));
      mo.observe(area, { childList: true, subtree: true });
    }
  };


  // Search result
  observe('search', '.s-result-item', 'h2');

  // Best sellers
  observe('zg', '.zg-item-immersion', '.p13n-sc-truncated');
})();
