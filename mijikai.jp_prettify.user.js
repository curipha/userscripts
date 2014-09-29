// ==UserScript==
// @name        Mijikai.jp prettify
// @namespace   curipha
// @description Tweak mijikai.jp
// @include     http://mijikai.jp/
// @version     0.0.1
// @grant       none
// ==/UserScript==

(function() {
  var tds = document.querySelectorAll('td[width="8%"]');
  var pattern = /^.*[fjkloqy-].*\.jp$/;

  for (var td of tds) {
    td.innerHTML = td.textContent.toLowerCase();

    if (pattern.test(td.textContent)) {
      td.style.color = "#ddd";
      //td.innerHTML = '';
    }
  }
})();
