// ==UserScript==
// @name           Modify URL @2ch
// @namespace      curipha
// @description    Modify texts starting with "ttp://" to anchor and redirect URIs to direct link
// @include        http://*.2ch.net/*
// @include        http://*.bbspink.com/*
// @version        0.1.2
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

  var anchor  = document.getElementsByTagName('a');

  for (var a of anchor) {
    if (a.href.indexOf('http://jump.2ch.net/?') === 0) {
      a.href = decodeURIComponent(a.href.slice(21)); // 'http://jump.2ch.net/?'.length -> 21
    }
    else if (a.href.indexOf('http://pinktower.com/?') === 0) {
      a.href = decodeURIComponent('http://' + a.href.slice(22)); // 'http://pinktower.com/?'.length -> 22
    }
  }

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
