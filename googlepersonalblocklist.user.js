// ==UserScript==
// @name           Google personal blocklist
// @namespace      curipha
// @description    Obscure annoying sites from search result
// @include        http://www.google.tld/search?*
// @include        https://www.google.tld/search?*
// @version        0.2.2
// @grant          none
// @noframes
// ==/UserScript==

(function(){
  var block = [
    // General doorways
    'ceron.jp/', 'page2rss.com/', 'zenback.itmedia.co.jp/', 'hatebu-graph.com/',
    'b.hatena.ne.jp/entrylist/',

    // Application doorways
    'www.altech-ads.com/', 'www.freewarelovers.com/', 'www.appbrain.com/',
    'www.vector.co.jp/soft/',
    '([^/]+.)?filehippo.com/',
    '[^/]+.soft(onic|pedia).(com|jp)/', '[^/]+.uptodown.com/',

    // SNS doorways
    '([^/]+.)?favstar.fm/',
    '([^/]+.)?(tweet|twtr)[^/.]+.(com|jp)/', // genocide...

    // Knowledge communities
    'questionbox.jp.msn.com/', 'ziddy.japan.zdnet.com/', 'soudan1.biglobe.ne.jp/', 'qanda.rakuten.ne.jp/',
    'www.itmedia.co.jp/qa/',
    'oshiete1?.(nifty.com|goo.ne.jp)/',
    '([^/]+.)?okwave.jp/', '([^/]+.)?chiebukuro(.travel)?.yahoo.co.jp/',

    // EC
    '(e?search|item).rakuten.co.jp/',
    '([^/]+.)?.animate-onlineshop.jp/',

    // Anime leakers
    'anime.dougasouko.com/',
    '([^/]+.)?anitube.se/',
    '([^/]*(anime|youtube)[^/]*|mvnavian).blog[0-9]*.(fc2.com|fc2blog.us)/',

    // Torrents
    '([^/]+.)?nyaa.se/',

    // Dll listing
    'systemexplorer.net/', '[^/]+.dll-files.com/',

    // Mobile pages
    'www.amazon.co.jp/gp/aw/'
  ];

  var opacity = 0.2;
  var pattern = new RegExp('^https?:\/\/(?:' + block.join('|').replace(/([.\/])/g, '\\$1') + ')', 'i');
  var googler = /^https?:\/\/www\.google\.com\/url\?/i;
  var t = 0;

  var blocker = function() {
    var result = document.querySelectorAll('li.g');
    for (var li of result) {
      var a = li.querySelector('h3 > a[href]');
      if (!a) continue;

      if (googler.test(a.href)) {
        var alturi = li.querySelector('cite._Rm').textContent;
        if (typeof(alturi) !== 'string') continue;

        alturi = alturi.replace(/\s+\u203A\s+/g, '/');
        var uri = /^https?:\/\//.test(uri) ? alturi : 'http://' + alturi;
      }
      else {
        var uri = a.href;
      }

      if (pattern.test(uri)) li.style.opacity = opacity;
    }
  };
  var blocker_wrap = function() {
    if (t) return;
    ｔ = setTimeout(function() {
      blocker();
      t = 0;
    }, 120);
  };

  blocker();

  var mo = new MutationObserver(blocker_wrap);
  mo.observe(document.body, { childList: true, subtree: true });
})();
