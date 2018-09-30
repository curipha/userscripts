// ==UserScript==
// @name           Google personal blocklist
// @namespace      curipha
// @description    Obscure annoying sites from search result
// @include        https://www.google.tld/search?*
// @version        0.3.4
// @grant          none
// @noframes
// ==/UserScript==

(function(){
  'use strict';

  const block = [
    // General doorways
    'ceron.jp/', 'page2rss.com/', 'hatebu-graph.com/',
    'b.hatena.ne.jp/', 'web.kamel.io/',
    '[^/]+.s.hatena.ne.jp/',

    // Application doorways
    'www.altech-ads.com/', 'www.freewarelovers.com/', 'www.appbrain.com/',
    'download.cnet.com/',
    'www.vector.co.jp/soft/',
    '([^/]+.)?filehippo.com/',
    '(?!news)[^/]+.soft(onic|pedia).(com|jp)/', '[^/]+.uptodown.com/',
    '[^/]+.apportal.jp', '[^/]+.brothersoft.jp',

    // SNS doorways
    '([^/]+.)?favstar.fm/',
    '([^/]+.)?twilog.org/',

    // Knowledge communities
    'ziddy.japan.zdnet.com/', 'soudan1.biglobe.ne.jp/', 'qanda.rakuten.ne.jp/',
    'www.itmedia.co.jp/qa/',
    'oshiete1?.(nifty.com|goo.ne.jp)/',
    '([^/]+.)?okwave.jp/', '([^/]+.)?chiebukuro(.travel)?.yahoo.co.jp/',

    // Curation media
    'matome.naver.jp/',

    // EC
    '(e?search|item).rakuten.co.jp/',
    '([^/]+.)?.animate-onlineshop.jp/',

    // Community
    'www.nicovideo.jp/',

    // Anime leakers
    'anime.dougasouko.com/',
    '([^/]+.)?anitube.se/',
    '([^/]*(anime|youtube)[^/]*|mvnavian).blog[0-9]*.(fc2.com|fc2blog.us)/',

    // Torrents
    '([^/]+.)?nyaa.se/',

    // Dll listing
    'systemexplorer.net/', '[^/]+.dll-files.com/',

    // Linux package listing
    'packages.(debian|ubuntu).(com|org)/',

    // Mirror & Copy
    'wpedia.goo.ne.jp/', 'sssslide.com/', 'code.i-harness.com/', 'code-examples.net/',

    // Mobile pages
    'www.amazon.co.jp/gp/aw/', 'mobile.twitter.com/'
  ];

  const opacity = 0.2;
  const pattern = new RegExp('^https?://(?:' + block.join('|').replace(/([./])/g, '\\$1') + ')', 'i');

  let t = 0;

  const blocker = function() {
    const result = document.getElementsByClassName('g');
    for (let li of result) {
      const a = li.querySelector('h3 > a[href]');
      if (!a) continue;

      if (pattern.test(a.href)) li.style.opacity = opacity;
    }
  };
  const blocker_wrap = function() {
    if (t) return;
    t = setTimeout(function() {
      blocker();
      t = 0;
    }, 120);
  };

  blocker();

  (new MutationObserver(blocker_wrap)).observe(document.body, { childList: true, subtree: true });
})();
