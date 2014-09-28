// ==UserScript==
// @name           Amazon age-verification autoredirect
// @namespace      curipha
// @description    Click the "I'm over 18" link automatically at amazon.co.jp.
// @include        http://www.amazon.co.jp/*
// @include        https://www.amazon.co.jp/*
// @version        0.1.2
// @grant          none
// ==/UserScript==

(function() {
  var pattern = /black\-curtain\-redirect\.html/;
  var t = 0;

  var clickit = function(elem) {
    var hrefs = elem.getElementsByTagName('a');

    for (var a of hrefs) {
      if (pattern.test(a.href)) {
        location.href = a.href;
        return;
      }
    }
  };
  var clickit_wrap = function(mr) {
    if (t) return;
    ｔ = setTimeout(function() {
      for (var mre of mr) {
        if (mre.target.id !== 'nav_flyout_anchor') continue;

        clickit(mre.target);
      }
      t = 0;
    }, 120);
  };

  clickit(document.body);

  var mo = new MutationObserver(clickit_wrap);
  mo.observe(document.getElementById('nav-cross-shop'), { childList: true, subtree: true });
})();
