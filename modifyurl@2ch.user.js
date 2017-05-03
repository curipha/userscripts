// ==UserScript==
// @name           Modify URL @2ch
// @namespace      curipha
// @description    Modify texts starting with "ttp://" to anchor and redirect URIs to direct link
// @match          http://*.2ch.net/*
// @match          https://*.2ch.net/*
// @match          http://*.bbspink.com/*
// @match          https://*.bbspink.com/*
// @version        0.2.3
// @grant          none
// @noframes
// ==/UserScript==

(function(){
  'use strict';

  const escapeHTML = function(str) {
    const conv = {
      '&' : '&amp;',
      '<' : '&lt;',
      '>' : '&gt;',
      '"' : '&quot;',
      "'" : '&#039;'
    };

    return str.replace(/[&<>"']/g, function(m) { return conv[m]; });
  };

  // Remove intermediate link
  const anchor  = document.getElementsByTagName('a');
  const pattern = /^http:\/\/(?:jump\.2ch\.net|(?:www\.)?pinktower\.com)\/\?(https?:\/\/)?/i;

  for (let a of anchor) {
    a.href = a.href.replace(pattern, function(m, p1) { return p1 ? p1 : 'http://'; } );
  }

  // Linkification
  let res = document.getElementsByTagName('dd');
  if (res.length < 1) res = document.getElementsByClassName('message');

  const ttp = /([^h]|^)(ttps?:\/\/[\x21-\x7E]+)/ig;

  for (let d of res) {
    d.innerHTML = d.innerHTML.replace(
                                ttp,
                                function(m, p1, p2) {
                                  return `${p1}<a href="${encodeURI('h'+p2)}" target="_blank">${escapeHTML(p2)}</a>`;
                                }
                              );
  }
})();
