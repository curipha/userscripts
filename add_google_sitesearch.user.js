// ==UserScript==
// @name           Add Google sitesearch
// @namespace      curipha
// @description    Add a site search form to all pages
// @include        http://*
// @include        https://*
// @exclude        https://*.google.tld/*
// @exclude        https://*.amazon.tld/*
// @version        0.2.6
// @grant          GM_addStyle
// @noframes
// ==/UserScript==

(function(){
  'use strict';

  if (document.contentType !== 'text/html') return;

  const css = `
#userjs-add_google {
  all: initial;
  background: #555;
  font: 18px/1 sans-serif;
  min-width: 200px;
  border: 4px solid #555;
  border-radius: 4px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 20000;
}
#userjs-add_google_form {
  all: initial;
  margin: 0;
  padding: 0;
}
#userjs-add_google_input {
  all: initial;
  font: 18px/1 monospace;
  background: #eee;
  margin: 0;
  padding: 5px;
  border-radius: 2px;
  width: 14em;
  height: auto;
}
#userjs-add_google_del {
  all: initial;
  color: #ccc;
  font: bold 18px/1 sans-serif;
  cursor: pointer;
}`;
  GM_addStyle(css);

  const form = document.createElement('div');
  form.id = 'userjs-add_google';
  form.style.opacity = 0;
  form.innerHTML = `
<form id="userjs-add_google_form" action="https://www.google.com/search" method="get" accept-charset="UTF-8" target="_top">
  <span id="userjs-add_google_del">&times;</span>
  <input id="userjs-add_google_input" type="search" name="q" placeholder="&#x1f50e ${document.domain}" />
  <input type="hidden" name="sitesearch" value="${document.domain}" />
  <input type="hidden" name="safe" value="off" />
</form>`;
  document.body.appendChild(form);

  const stop_event = function(event) { event.stopImmediatePropagation(); };
  document.getElementById('userjs-add_google_input').addEventListener('keydown', stop_event, true);

  const toggle_opacity = function() { this.style.opacity ^= 1; };
  form.addEventListener('mouseenter', toggle_opacity, false);
  form.addEventListener('mouseleave', toggle_opacity, false);

  const hidden = function() { document.body.removeChild(form); };
  document.getElementById('userjs-add_google_del').addEventListener('click', hidden, false);
})();
