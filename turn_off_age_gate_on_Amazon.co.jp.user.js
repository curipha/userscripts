// ==UserScript==
// @name           Turn off age gate on Amazon.co.jp
// @namespace      curipha
// @description    Click "I'm over 18" automatically
// @include        https://www.amazon.co.jp/*
// @exclude        https://www.amazon.co.jp/ap/*
// @exclude        https://www.amazon.co.jp/mn/*
// @exclude        https://www.amazon.co.jp/clouddrive*
// @version        0.5.1
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  'use strict';

  if (document.title === '警告：アダルトコンテンツ') {
    const a = document.body.querySelector('center a[href*="black-curtain-redirect.html"]');
    if (a)  {
      location.href = a.href;
    }
  }
})();
