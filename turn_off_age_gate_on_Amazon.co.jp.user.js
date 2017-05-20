// ==UserScript==
// @name           Turn off age gate on Amazon.co.jp
// @namespace      curipha
// @description    Click "I'm over 18" automatically
// @include        https://www.amazon.co.jp/*
// @exclude        https://www.amazon.co.jp/ap/*
// @exclude        https://www.amazon.co.jp/mn/*
// @exclude        https://www.amazon.co.jp/clouddrive*
// @version        0.4.2
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  'use strict';

  // Adult
  const a = document.body.querySelector('center a[href*="black-curtain-redirect.html"]')
            || document.body.querySelector('#centerBelowPlus a[href$="&fap=1"]')
            || document.body.querySelector('#centerPlus a[href$="&fap=1"]');
  if (a)  {
    location.href = a.href;
    return;
  }
})();
