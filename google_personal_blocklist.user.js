// ==UserScript==
// @name           Google personal blocklist
// @namespace      curipha
// @description    Obscure annoying pages from search result
// @include        https://www.google.tld/search?*
// @version        0.5.1
// @grant          none
// @noframes
// ==/UserScript==

(function(){
  'use strict';

  const block = [
    // Social bookmarks
    '[^/]+.s.hatena.ne.jp/',
    'b.hatena.ne.jp/',

    // Knowledge communities
    '([^/]+.)?chiebukuro.yahoo.co.jp/',
    '([^/]+.)?okwave.jp/',
    'answers.microsoft.com/',
    'oshiete1?.goo.ne.jp/',
    'soudan1?.biglobe.ne.jp/',

    // EC
    '(e?search|item).rakuten.co.jp/',

    // Mirror & Copy
    'ref.xaio.jp/',
    'sssslide.com/',
    'wpedia.goo.ne.jp/',

    // Translated copy
    '([^/]+.)?stackovernet.com/',
    '[^/]+.coder.work/',
    'bugsdb.com/',
    'code-examples.net/',
    'code.i-harness.com/',
    'codeday.me/',
    'kotaeta.com/',
    'python5.com/',
    'qastack.jp/',
    'stackoverrun.com/',
    'tutorialmore.com/',
    'www.366service.com/',
    'www.it-swarm(-ja)?.(dev|tech|jp.net)/',
    'www.thinbug.com/',

    // Rubbish
    'www.sejuku.net/',
  ];

  const opacity = 0.2;
  const pattern = new RegExp(`^https?://(?:${block.join('|').replace(/([./])/g, '\\$1')})`, 'i');

  const results = document.getElementsByClassName('g');
  for (const li of results) {
    const a = li.querySelector('a[href^="http"]'); // Get the first element
    if (a && pattern.test(a.href)) {
      li.style.opacity = opacity;
    }
  }
})();
