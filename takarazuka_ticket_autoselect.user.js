// ==UserScript==
// @name           Takarazuka ticket autoselect
// @namespace      curipha
// @description    Choose sheet category and number automatically
// @include        https://ent-kageki.e-tix.jp/ticket/seatnumberselect.html*
// @version        0.1.1
// @grant          none
// @noframes
// ==/UserScript==

(function(){
  'use strict';

  // Number of Tickets
  const selectchilditem = function(id) {
    const elem = document.getElementById(id);
    if (elem) {
      const child = elem.children[1];
      if (child) child.selected = true;
    }
  };
  selectchilditem('tc11'); // Sheet S
  selectchilditem('tc21'); // Sheet A
  selectchilditem('tc31'); // Sheet B

  // Seat location category
  const type = document.body.querySelectorAll('input[name="rt"][value="2"]');
  for (let input of type) {
    if (input) input.checked = true;
  }

  // Go to bottom of page
  window.scrollTo(0, document.body.scrollHeight);
})();

