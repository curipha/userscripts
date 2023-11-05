// ==UserScript==
// @name           Google personal blocklist
// @namespace      curipha
// @description    Obscure annoying pages from search result
// @include        https://www.google.tld/search?*
// @version        0.5.4
// @grant          none
// @noframes
// ==/UserScript==

(function(){
  'use strict';

  const block = [
    // Social bookmarks
    'b.hatena.ne.jp/',

    // Knowledge communities
    '([^/]+.)?chiebukuro.yahoo.co.jp/',
    '([^/]+.)?okwave.jp/',
    'answers.microsoft.com/',
    'oshiete1?.goo.ne.jp/',
    'soudan1.biglobe.ne.jp/',

    // EC
    '(e?search|item).rakuten.co.jp/',

    // Mirror & Copy
    'ref.xaio.jp/',
    'sssslide.com/',
    'wpedia.goo.ne.jp/',

    // Translated copy
    '[^/]+.asklobster.com/',
    '[^/]+.coder.work/',
    'code-examples.net/',
    'code.i-harness.com/',
    'codeday.me/',
    'coderedirect.com/',
    'kotaeta.com/',
    'qastack.jp/',
    'tutorialmore.com/',
    'www.it-swarm(-ja)?.(dev|tech|jp.net)/',
    'www.thinbug.com/',
    'www.web-dev-qa-db-ja.com/',
    'www.webdevqa.jp.net/',

    // Rubbish
    'www.sejuku.net/',
  ];

  const opacity = 0.2;
  const pattern = new RegExp(`^https?://(?:${block.join('|').replace(/([./])/g, '\\$1')})`, 'i');


  const obscure = function(target) {
    const results = target.getElementsByClassName('g');
    for (const li of results) {
      const a = li.querySelector('a[href^="http"]'); // Get the first element
      if (a && pattern.test(a.href)) {
        li.style.opacity = opacity;
      }
    }
  };

  obscure(document.body);


  // Update the results when addtional results are loaded
  const target = document.getElementById('botstuff');
  if (target) {
    const hide_loaded_results = (mutations) => {
      for (const mutation of mutations.filter((m) => m.addedNodes.length > 0)) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === 'DIV' && node.getAttribute('data-async-context')) {
            obscure(node)
          }
        });
      };
    };

    const mo = new MutationObserver(hide_loaded_results);
    mo.observe(target, { subtree: true, childList: true });
  }
})();
