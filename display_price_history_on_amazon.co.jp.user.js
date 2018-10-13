// ==UserScript==
// @name           Display price history on Amazon.co.jp
// @namespace      curipha
// @description    Import price history from Keepa.com
// @include        https://www.amazon.co.jp/*
// @exclude        https://www.amazon.co.jp/ap/*
// @exclude        https://www.amazon.co.jp/mn/*
// @exclude        https://www.amazon.co.jp/clouddrive*
// @version        0.0.1
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  'use strict';

  const width = 580;
  const height = 240;

  const pricediv = document.getElementById('unifiedPrice_feature_div');
  if (pricediv) {
    const asinform = document.getElementById('ASIN'); // or location.pathname.match(/\b[0-9A-Z]{10}\b/)
    if (asinform) {
      const asin = asinform.value;

      const history = document.createElement('div');
      history.className = 'a-section a-spacing-small';

      const anchor = document.createElement('a');
      anchor.href = `https://keepa.com/#!product/5-${asin}`;
      anchor.target = '_blank';
      anchor.rel = 'noopener';
      anchor.referrerPolicy = 'no-referrer';

      const image = document.createElement('img');
      image.src = `https://dyn.keepa.com/pricehistory.png?domain=co.jp&asin=${asin}&width=${width}&height=${height}`;
      image.alt = 'Price history';
      image.width = width;
      image.height = height;
      image.referrerPolicy = 'no-referrer';

      anchor.appendChild(image);
      history.appendChild(anchor);
      pricediv.appendChild(history);
    }
  }
})();
