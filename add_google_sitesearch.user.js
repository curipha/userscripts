// ==UserScript==
// @name           Add Google site search
// @namespace      curipha
// @description    Add a site search form to all pages
// @include        http://*
// @include        https://*
// @exclude        https://*.google.tld/*
// @exclude        https://*.amazon.tld/*
// @version        0.2.2
// @grant          GM_addStyle
// @noframes
// ==/UserScript==

(function(){
  'use strict';

  if (document.contentType !== 'text/html') return;

  // "z-index" should be less than 255 because an indicator of Autopagerize is at 256.
  const css = `
#userjs-add_google {
  background: #ddd;
  padding: 10px;
  font: 18px sans-serif;
  line-height: 1;
  min-width: 200px;
  border: 2px solid #ccc;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 255;
}
#userjs-add_google form {
  margin: 0 !important;
  padding: 0 !important;
}
#userjs-add_google input {
  font: 18px monospace !important;
  background: #fff !important;
  margin: 0 !important;
  padding: 0.3em !important;
  border: 0 none !important;
  border-radius: 0 !important;
  outline: 0 none !important;
  box-shadow: none !important;
  display: inline !important;
  width: 14em !important;
  height: auto !important;
}
#userjs-add_google input[type="submit"] {
  display: none !important;
}
#userjs-add_google_del {
  color: #000 !important;
  font: bold 24px sans-serif !important;
  margin-right: 8px !important;
  cursor: pointer !important;
}`;
  GM_addStyle(css);

  const form = document.createElement('div');
  form.id = 'userjs-add_google';
  form.style.opacity = 0;
  form.innerHTML = `
<form action="https://www.google.com/search" method="get" accept-charset="UTF-8" target="_top">
  <span id="userjs-add_google_del">&times;</span>
  <input type="text" name="q" placeholder="${document.domain} を検索" />
  <input type="submit" value="Search" />
  <input type="hidden" name="sitesearch" value="${document.domain}" />
  <input type="hidden" name="safe" value="off" />
</form>`;
  document.body.appendChild(form);

  const toggle_opacity = function() { this.style.opacity ^= 1; };
  form.addEventListener('mouseenter', toggle_opacity, false);
  form.addEventListener('mouseleave', toggle_opacity, false);

  const hidden = function() { document.getElementById('userjs-add_google').style.visibility = 'hidden'; };
  document.getElementById('userjs-add_google_del').addEventListener('click', hidden, false);
})();
