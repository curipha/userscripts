// ==UserScript==
// @name           Close ordered item page on Amazon.co.jp
// @namespace      curipha
// @description    Close ordered item page automatically
// @include        https://www.amazon.co.jp/gp/product/*
// @include        https://www.amazon.co.jp/dp/*
// @include        https://www.amazon.co.jp/*/dp/*
// @exclude        https://www.amazon.co.jp/ap/*
// @exclude        https://www.amazon.co.jp/hz/*
// @exclude        https://www.amazon.co.jp/clouddrive*
// @version        0.0.3
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  'use strict';

  if (document.getElementById('ebooksInstantOrderUpdate')) {
    window.open('about:blank', '_self').close();
  }
})();
