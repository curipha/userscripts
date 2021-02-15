// ==UserScript==
// @name           Google personal blocklist
// @namespace      curipha
// @description    Obscure annoying pages from search result
// @include        https://www.google.tld/search?*
// @version        0.5.0
// @grant          none
// @noframes
// ==/UserScript==

(function(){
  'use strict';

  const block = [
    // Social bookmarks
    'b.hatena.ne.jp/',
    '[^/]+.s.hatena.ne.jp/',

    // Knowledge communities
    'soudan1?.biglobe.ne.jp/', 'oshiete1?.goo.ne.jp/',
    'answers.microsoft.com/',
    '([^/]+.)?okwave.jp/', '([^/]+.)?chiebukuro.yahoo.co.jp/',

    // EC
    '(e?search|item).rakuten.co.jp/',

    // Mirror & Copy
    'wpedia.goo.ne.jp/', 'sssslide.com/', 'ref.xaio.jp/',

    // Translated copy
    'code.i-harness.com/', 'code-examples.net/', 'stackoverrun.com/',
    'kotaeta.com/', 'codeday.me/', 'tutorialmore.com/', 'python5.com/',
    'www.it-swarm.dev/', 'www.it-swarm-ja.tech/', 'www.thinbug.com/',
    'bugsdb.com/', 'qastack.jp/', 'www.366service.com/',
    '([^/]+.)?stackovernet.com/', '[^/]+.coder.work/',

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
