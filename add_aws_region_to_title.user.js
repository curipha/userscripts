// ==UserScript==
// @name           Add AWS region to title
// @namespace      curipha
// @description    Help to know where I am now
// @match          https://console.aws.amazon.com/*
// @match          https://*.console.aws.amazon.com/*
// @version        0.0.3
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  'use strict';

  const regelem = document.getElementById('nav-regionMenu');
  if (regelem) {
    const region = regelem.textContent.trim();
    document.title += ` (${ region.length > 0 ? region : '???' })`;
  }
})();
