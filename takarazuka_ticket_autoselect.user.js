// ==UserScript==
// @name           Takarazuka ticket autoselect
// @namespace      curipha
// @description    Choose sheet category and number automatically
// @include        https://ent-kageki.e-tix.jp/ticket/seatnumberselect.html*
// @version        0.0.1
// @grant          none
// @noframes
// ==/UserScript==

(function(){
  document.getElementById('tc11').children[1].selected = true;  // Sheet S
  document.getElementById('tc21').children[1].selected = true;  // Sheet A
  document.getElementById('tc31').children[1].selected = true;  // Sheet B

  var type = document.body.querySelectorAll('input[name="rt"][value="2"]');
  for (var input of type) {
    if (input) input.checked = true;
  }
})();

