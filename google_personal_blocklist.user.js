// ==UserScript==
// @name           Google personal blocklist
// @namespace      curipha
// @description    Obscure annoying pages from search result
// @include        https://www.google.tld/search?*
// @version        0.3.7
// @grant          none
// @noframes
// ==/UserScript==

(function(){
  'use strict';

  const block = [
    // Social bookmarks
    'ceron.jp/', 'b.hatena.ne.jp/', 'hatebu-graph.com/',
    '[^/]+.s.hatena.ne.jp/',

    // Application listings
    'www.altech-ads.com/', 'www.freewarelovers.com/', 'www.appbrain.com/',
    'download.cnet.com/',
    'www.vector.co.jp/soft/',
    '([^/]+.)?filehippo.com/',
    '(?!news)[^/]+.soft(onic|pedia).(com|jp)/',
    '[^/]+.uptodown.com/', '[^/]+.apportal.jp', '[^/]+.brothersoft.jp',

    // Twitter mirrors
    '([^/]+.)?twilog.org/',

    // Knowledge communities
    'ziddy.japan.zdnet.com/', 'soudan1.biglobe.ne.jp/', 'qanda.rakuten.ne.jp/',
    'www.itmedia.co.jp/qa/', 'qa.itmedia.co.jp/', 'answers.microsoft.com/',
    'oshiete1?.(nifty.com|goo.ne.jp)/',
    '([^/]+.)?okwave.jp/', '([^/]+.)?chiebukuro(.travel)?.yahoo.co.jp/',

    // Curation media
    'matome.naver.jp/',

    // EC
    '(e?search|item).rakuten.co.jp/',

    // Community
    'www.nicovideo.jp/',

    // Anime leakers
    'anime.dougasouko.com/',
    '([^/]+.)?anitube.se/',
    '([^/]*(anime|youtube)[^/]*|mvnavian).blog[0-9]*.(fc2.com|fc2blog.us)/',

    // DLL listings
    'systemexplorer.net/', '[^/]+.dll-files.com/',

    // Linux package listings
    'packages.(debian|ubuntu).(com|org)/',

    // Mirror & Copy
    'wpedia.goo.ne.jp/', 'sssslide.com/', 'ref.xaio.jp/',
    'code.i-harness.com/', 'code-examples.net/', 'stackoverrun.com/',
    'kotaeta.com/', 'codeday.me/', 'tutorialmore.com/', 'www.it-swarm.dev/',
    'bugsdb.com/', 'qastack.jp/',
    '([^/]+.)?stackovernet.com/', '[^/]+.coder.work/',

    // Mobile pages
    'mobile.twitter.com/',

    // Rubbish
    'www.sejuku.net/',
  ];

  const opacity = 0.2;
  const pattern = new RegExp('^https?://(?:' + block.join('|').replace(/([./])/g, '\\$1') + ')', 'i');

  const result = document.getElementsByClassName('g');
  for (let li of result) {
    const a = li.querySelector('.rc > .r > a[href]');
    if (a && pattern.test(a.href)) {
      li.style.opacity = opacity;
    }
  }
})();
