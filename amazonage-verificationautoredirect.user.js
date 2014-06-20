// ==UserScript==
// @id             Amazon age-verification autoredirect
// @name           Amazon age-verification autoredirect
// @version        0.0.5
// @namespace      curipha
// @author         curipha
// @description    Automatic click an "I'm over 18." link at amazon.co.jp.
// @include        http://www.amazon.co.jp/*
// @run-at         document-end
// @grant          none
// ==/UserScript==

(function() {
  var hrefs = document.getElementsByTagName('a');
  for (var a of hrefs) {
    if (/black\-curtain\-redirect\.html/.test(a.href)) {
      location.href = a.href;
      return;
    }
  }
})();
