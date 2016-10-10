// ==UserScript==
// @name        Add AWS region to title
// @namespace   curipha
// @description Help to know where I am now
// @include     https://console.aws.amazon.com/*
// @include     https://*.console.aws.amazon.com/*
// @version     0.0.1
// @grant       none
// @noframes
// ==/UserScript==

(function() {
  'use strict';

  var regelem = document.getElementById('nav-regionMenu');

  if (regelem) {
    var region = regelem.textContent.trim();
    document.title += ` (${ region.length > 0 ? region : '???' })`
  }
})();