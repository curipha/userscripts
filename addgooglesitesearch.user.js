// ==UserScript==
// @name           Add Google site search
// @namespace      curipha
// @description    Add site search form to all pages.
// @include        http://*
// @include        https://*
// @exclude        http://*.google.tld/*
// @exclude        https://*.google.tld/*
// @version        0.1.1
// @grant          GM_addStyle
// @noframes
// ==/UserScript==

(function(){
  if (document.contentType !== 'text/html') return;

  var css =
  // "z-index" should be less than 255 because an indicator of Autopagerize is at 256.
    '#userjs-add_google { background: #ddd; padding: 10px; line-height: 1; min-width: 200px; border: 2px solid #ccc; position: fixed; top: 0; right: 0; z-index: 255; } '+
    '#userjs-add_google form { margin: 0 !important; padding: 0 !important; } '+
    '#userjs-add_google input { font: 18px monospace !important; margin: 0 !important; padding: 0.3em !important; display: inline !important; width: 14em !important; height: auto !important; } '+
    '#userjs-add_google input[type="submit"] { display: none !important; } '+
    '#userjs-add_google_del { color: #000 !important; font: bold 24px sans-serif !important; margin-right: 8px !important; cursor: pointer !important; }';
  GM_addStyle(css);

  var form = document.createElement('div');
  form.id = 'userjs-add_google';
  form.style.opacity = 0;
  form.innerHTML = '&nbsp;';
  form.addEventListener('mouseover', init, false);
  form.addEventListener('mouseout', hide, false);
  document.body.appendChild(form);

  function init() {
    this.innerHTML =
      '<form action="https://www.google.com/search" method="get" accept-charset="UTF-8" target="_top">'+
      '<span id="userjs-add_google_del">&times;</span>'+
      '<input type="text" name="q" placeholder="' + document.domain + ' を検索" /><input type="submit" value="Search" />'+
      '<input type="hidden" name="as_sitesearch" value="' + document.domain + '" />'+
      '<input type="hidden" name="safe" value="off" />'+
      '</form>';

    this.style.opacity = 1;
    this.removeEventListener('mouseover', init, false);
    this.addEventListener('mouseover', show, false);

    document.getElementById('userjs-add_google_del').addEventListener('click', remove, false);
  }
  function remove() { document.body.removeChild(form); }

  function hide() { form.style.opacity = 0; }
  function show() { form.style.opacity = 1; }
})();
