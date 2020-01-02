// ==UserScript==
// @name           Add Google sitesearch
// @namespace      curipha
// @description    Add a site search form to all pages
// @include        http://*
// @include        https://*
// @exclude        https://*.google.tld/*
// @exclude        https://*.amazon.tld/*
// @version        0.3.0
// @grant          none
// @noframes
// ==/UserScript==

(function(){
  'use strict';

  if (!document || !document.head || !document.body || document.contentType !== 'text/html') return;

  const style = document.createElement('style');
  style.type = 'text/css';
  style.textContent = `
#userjs-add_google {
  all: initial;
  background: #555;
  font: 18px/1 sans-serif;
  border: 4px solid #555;
  border-radius: 4px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 20000;
  opacity: 0;
  transition: opacity 80ms;
}
#userjs-add_google:hover {
  opacity: 1;
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
  width: 1em;
  height: auto;
  transition: width 80ms;
}
#userjs-add_google_input:hover {
  width: 14em;
}
#userjs-add_google_del {
  all: initial;
  color: #ccc;
  font: bold 18px/1 sans-serif;
  cursor: pointer;
}`;
  document.head.appendChild(style);

  const form = document.createElement('div');
  form.id = 'userjs-add_google';
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

  const hidden = function() { document.body.removeChild(form); };
  document.getElementById('userjs-add_google_del').addEventListener('click', hidden, false);
})();
