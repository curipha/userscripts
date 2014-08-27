// ==UserScript==
// @id             Modify URL @2ch
// @name           Modify URL @2ch
// @version        0.0.6
// @namespace      curipha
// @author         curipha
// @description    Modify "ttp://" text to anchor and redirect URIs to direct link.
// @include        http://*.2ch.net/*
// @include        http://*.bbspink.com/*
// @run-at         document-end
// @grant          none
// ==/UserScript==

(function(){
  var anchor  = document.getElementsByTagName('a');
  var pattern = /^http:\/\/([^\/]+\.)?(ime\.(nu|st)\/|pinktower\.com\/|jump\.2ch\.net\/\?)/i;

  for (var a of anchor) {
    if (a.href.indexOf('http') !== 0) continue;

    uri = a.href.replace(pattern, 'http://');
    a.href = decodeURIComponent(uri);
  }

  var dd  = document.getElementsByTagName('dd');
  var ttp = /([^h])(ttps?:\/\/[\x21\x23-\x3b\x3d\x3f-\x7E]+)/ig;

  for (var d of dd) {
    d.innerHTML = d.innerHTML.replace(ttp, '$1<a href="h$2">$2</a>');
  }
})();
