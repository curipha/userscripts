// ==UserScript==
// @name           Amazon age-verification autoredirect
// @namespace      curipha
// @description    Click the "I'm over 18" automatically
// @include        http://www.amazon.co.jp/*
// @include        https://www.amazon.co.jp/*
// @version        0.3.3
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  if (document.contentType !== 'text/html') return;

  // Adult
  var a = document.body.querySelector('center a[href*="black-curtain-redirect.html"]');
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


  // Adult shown up in delay
  if (!location.pathname.contains('/dp/')) {
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
