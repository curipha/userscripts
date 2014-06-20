// ==UserScript==
// @id             Google personal blocklist
// @name           Google personal blocklist
// @version        0.0.3
// @namespace      curipha
// @author         curipha
// @description    Remove sites from Google search results
// @include        http://www.google.tld/search?*
// @include        https://www.google.tld/search?*
// @run-at         document-end
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
    
    // Mobile pages
    'www.amazon.co.jp/gp/aw/'
  ];

  var opacity = 0.2;
  var pattern = new RegExp('^https?:\/\/(?:' + block.join('|').replace(/([.\/])/g, '\\$1') + ')', 'i');

  for (var li of document.getElementsByClassName('g')) {
    if (li.nodeName.toLowerCase() !== 'li') continue;

    for (var a of li.getElementsByTagName('a')) {
      if (a.parentElement.nodeName.toLowerCase() !== 'h3') continue;
      if (typeof(a.href) !== 'string') continue;

      if (pattern.test(a.href)) {
        li.style.opacity = opacity;
        break;
      }
    }
  }
})();
