// ==UserScript==
// @name           Language switcher for Microsoft Docs
// @namespace      curipha
// @description    Add language menu
// @include        https://docs.microsoft.com/*
// @version        0.0.3
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  'use strict';

  const nav = document.getElementById('affixed-left-container');
  if (nav) {
    const [tolang, label] = location.pathname.substring(0,7) === '/en-us/' ? ['ja-jp', '日本語'] : ['en-us', 'English'];

    const anchor = document.createElement('a');
    anchor.href = location.pathname.replace(/(?<=^\/)[A-Za-z0-9-]+(?=\/)/, tolang) + location.search;
    anchor.className = 'button is-small is-text has-inner-focus has-margin-bottom-small has-border-top has-border-bottom';

    const icon = document.createElement('span');
    icon.className = 'icon is-size-8 has-text-subtle';

    const iconinner = document.createElement('span');
    iconinner.className = 'docon docon-locale-globe';

    const text = document.createElement('span');
    text.textContent = label;

    icon.appendChild(iconinner);
    anchor.appendChild(icon);
    anchor.appendChild(text);
    nav.prepend(anchor); // Insert 'anchor' node before the first child of the 'nav'


    const makehref = function() { this.href += location.hash; };
    anchor.addEventListener('mousedown', makehref, false);
    anchor.addEventListener('keydown', makehref, false);
  }
})();
