// ==UserScript==
// @name           Modify URL @2ch
// @namespace      curipha
// @description    Modify texts starting with "ttp://" to anchor and redirect URIs to direct link
// @include        http://*.2ch.net/*
// @include        http://*.bbspink.com/*
// @version        0.2.0
// @grant          none
// @noframes
// ==/UserScript==

(function(){
  'use strict';

  var escapeHTML = function(str) {
    var conv = {
      '&' : '&amp;',
      '<' : '&lt;',
      '>' : '&gt;',
      '"' : '&quot;',
      "'" : '&#039;'
    };

    return str.replace(/[&<>"']/g, function(m) { return conv[m]; });
  };

  // Remove intermediate link
  var anchor  = document.getElementsByTagName('a');
  var pattern = /^http:\/\/(?:jump\.2ch\.net|pinktower\.com)\/\?(https?:\/\/)?/i;

  for (var a of anchor) {
    a.href = a.href.replace(pattern, function(m, p1) { return p1 ? p1 : 'http://'; } );
  }

  // Linkification
  var res = document.getElementsByTagName('dd');
  if (res.length < 1) res = document.getElementsByClassName('message');

  var ttp = /([^h]|^)(ttps?:\/\/[\x21-\x7E]+)/ig;

  for (var d of res) {
    d.innerHTML = d.innerHTML.replace(
                                ttp,
                                function(m, p1, p2) {
                                  return `${p1}<a href="${encodeURI('h'+p2)}" target="_blank">${escapeHTML(p2)}</a>`;
                                }
                              );
  }
})();
