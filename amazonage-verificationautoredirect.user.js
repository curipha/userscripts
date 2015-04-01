// ==UserScript==
// @name           Amazon age-verification autoredirect
// @namespace      curipha
// @description    Click the "I'm over 18" link automatically at amazon.co.jp.
// @include        http://www.amazon.co.jp/*
// @include        https://www.amazon.co.jp/*
// @version        0.3.2
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

  if (location.pathname.indexOf('/dp/') < 0) {
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


  // Alcohol
  var clickit_a = function(elem) {
    var input = elem.querySelector('.dobBody form input[type="image"]');
    if (input) input.click();
  };
  clickit_a(document.body);
})();
