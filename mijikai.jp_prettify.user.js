// ==UserScript==
// @name        Mijikai.jp prettify
// @namespace   curipha
// @description Tweak mijikai.jp
// @include     http://mijikai.jp/
// @version     0.0.4
// @grant       none
// @noframes
// ==/UserScript==

(function() {
  var tds = document.querySelectorAll('td[width="8%"]');
  var pattern = /^(.*\-.*|((?=.*([0-9][a-z]|[a-z][0-9])).+))\.jp$/;

  for (var td of tds) {
    td.textContent = td.textContent.toLowerCase();

    if (pattern.test(td.textContent)) {
      td.style.color = "#ddd";
      //td.innerHTML = '';
    }
  }
})();
