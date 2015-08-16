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
  // Number of Tickets
  var selectchilditem = function(id) {
    var elem = document.getElementById(id);
    if (elem) {
      var child = elem.children[1];
      if (child) child.selected = true;
    }
  };
  selectchilditem('tc11') // Sheet S
  selectchilditem('tc21') // Sheet A
  selectchilditem('tc31') // Sheet B

  var type = document.body.querySelectorAll('input[name="rt"][value="2"]');
  for (var input of type) {
    if (input) input.checked = true;
  }
})();

