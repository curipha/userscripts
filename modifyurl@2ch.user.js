// ==UserScript==
// @name           Modify URL @2ch
// @namespace      curipha
// @description    Modify texts starting with "ttp://" to anchor and redirect URIs to direct link
// @include        http://*.2ch.net/*
// @include        http://*.bbspink.com/*
// @version        0.1.1
// @grant          none
// @noframes
// ==/UserScript==

(function(){
  'use strict';

  var anchor  = document.getElementsByTagName('a');

  for (var a of anchor) {
    if (a.href.indexOf('http://jump.2ch.net/?') === 0) {
      a.href = decodeURIComponent(a.href.slice(21)); // 'http://jump.2ch.net/?'.length -> 21
    }
    else if (a.href.indexOf('http://pinktower.com/?') === 0) {
      a.href = decodeURIComponent('http://' + a.href.slice(22)); // 'http://pinktower.com/?'.length -> 22
    }
  }

  var dd  = document.getElementsByTagName('dd');
  var ttp = /([^h])(ttps?:\/\/[\x21\x23-\x3b\x3d\x3f-\x7E]+)/ig;

  for (var d of dd) {
    d.innerHTML = d.innerHTML.replace(ttp, '$1<a href="h$2">$2</a>');
  }
})();
