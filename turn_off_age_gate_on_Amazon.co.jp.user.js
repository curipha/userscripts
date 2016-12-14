// ==UserScript==
// @name           Turn off age gate on Amazon.co.jp
// @namespace      curipha
// @description    Click "I'm over 18" automatically
// @include        http://www.amazon.co.jp/*
// @include        https://www.amazon.co.jp/*
// @version        0.4.0
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  'use strict';

  if (document.contentType !== 'text/html') return;

  // Adult
  var a = document.body.querySelector('center a[href*="black-curtain-redirect.html"]')
            || document.body.querySelector('#centerBelowPlus a[href$="&fap=1"]')
            || document.body.querySelector('#centerPlus a[href$="&fap=1"]');
  if (a)  {
    location.href = a.href;
    return;
  }

  // Alcohol
  var input = document.body.querySelector('.dobBody form input[type="image"]');
  if (input) {
    input.click();
    return;
  }

  // Adult (shown up in delay)
  if (!location.pathname.includes('/dp/')) {
    var mo;
    var clickit_mo = function(mr) {
      for (var mrl of mr) {
        for (var i = 0; i < mrl.addedNodes.length; i++) {
          if (mrl.addedNodes[i].className === 'a-modal-scroller a-declarative') {
            mo.disconnect();
            setTimeout(function() { mrl.addedNodes[i].querySelector('[data-sx-lift-black-curtain-action]').click(); }, 120);
            return;
          }
        }
      }
    };
    mo = new MutationObserver(clickit_mo);
    mo.observe(document.body, { childList: true });
  }
})();
