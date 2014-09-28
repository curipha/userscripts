// ==UserScript==
// @name           Google personal blocklist
// @namespace      curipha
// @description    Remove sites from Google search results
// @include        http://www.google.tld/search?*
// @include        https://www.google.tld/search?*
// @version        0.1.0
// @grant          none
// ==/UserScript==

(function(){
  var block = [
    // General doorways
    'ceron.jp/', 'page2rss.com/', 'zenback.itmedia.co.jp/', '([^/]+.)?tweetbuzz.jp/',

    // Application doorways
    '[^/]+.softonic.jp/', 'www.freewarelovers.com/', 'www.appbrain.com/', 'www.filehippo.com/',

    // SNS doorways
    '([^/]+.)?tweettunnel.com/', 'favstar.fm/', 'twtrp.jp/', 'twtrland.com/',

    // Knowledge communities
    '([^/]+.)?chiebukuro(.travel)?.yahoo.co.jp/', '([^/]+.)?okwave.jp/', 'questionbox.jp.msn.com/',
    'ziddy.japan.zdnet.com/', 'oshiete.goo.ne.jp/', 'soudan1.biglobe.ne.jp/', 'qanda.rakuten.ne.jp',
    'www.itmedia.co.jp/qa/',

    // EC
    '(e?search|item).rakuten.co.jp',

    // Anime leakers
    '(anime(tore|post)|(tv|free)animedouga(desu)?|youtubeanisoku1|mvnavian|kodoanime01).blog[0-9]*.fc2.com/',
    'anime.dougasouko.com/',

    // Torrents
    '([^/]+.)?nyaa.se',

    // Dll listing
    'systemexplorer.net/',

    // Mobile pages
    'www.amazon.co.jp/gp/aw/'
  ];

  var opacity = 0.2;
  var pattern = new RegExp('^https?:\/\/(?:' + block.join('|').replace(/([.\/])/g, '\\$1') + ')', 'i');
  var googler = /^https?:\/\/www\.google\.com\/url\?/i;

  var result = document.querySelectorAll('li.g');
  for (var li of result) {
    var a = li.querySelector('h3 a');
    if (typeof(a.href) !== 'string') continue;

    if (googler.test(a.href)) {
      var alturi = li.querySelector('cite._Rm').textContent;
      if (typeof(alturi) !== 'string') continue;

      var uri = /^https?:\/\//.test(uri) ? alturi : 'http://' + alturi;
    }
    else {
      var uri = a.href;
    }

    if (pattern.test(uri)) {
      li.style.opacity = opacity;
    }
  }
})();
