// ==UserScript==
// @name           Display price history on Amazon.co.jp
// @namespace      curipha
// @description    Import price history from Keepa.com
// @include        https://www.amazon.co.jp/gp/product/*
// @include        https://www.amazon.co.jp/dp/*
// @include        https://www.amazon.co.jp/*/dp/*
// @exclude        https://www.amazon.co.jp/ap/*
// @exclude        https://www.amazon.co.jp/mn/*
// @exclude        https://www.amazon.co.jp/clouddrive*
// @version        0.1.0
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  'use strict';

  const width = 580;
  const height = 240;

  let current_asin = '';

  const get_asin = function() {
    const asinform = document.getElementById('ASIN'); // or location.pathname.match(/\b[0-9A-Z]{10}\b/)
    return asinform ? asinform.value : null;
  }

  const insert_graph = function() {
    const pricediv = document.getElementById('unifiedPrice_feature_div');
    if (pricediv) {
      let asin = get_asin();
      if (asin) {
        current_asin = asin; // Update current asin value to avoid consecutive updating of graph

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
  }

  insert_graph();


  // Capture variation select and update the graph
  const target = document.getElementById('desktop_buybox') || document.getElementById('buybox_feature_div');
  if (target) {
    const update_graph = (mutations) => {
      mutations.forEach((mutation) => {
        if (get_asin() !== current_asin && mutation.addedNodes.length > 0) {
          insert_graph();
        }
      });
    };

    const mo = new MutationObserver(update_graph);
    mo.observe(target, { childList: true });
  }
})();
