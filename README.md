userscripts
===========
These user scripts are for Greasemonkey/Scriptish on Firefox.
Maybe they run fine on Google Chrome and/or other browsers.

About scripts
-------------

### addgooglesitesearch.user.js
- Add site search form to all pages.


### amazonage-verificationautoredirect.user.js
- Automatic click "I'm over 18." link at amazon.co.jp.


### googlepersonalblocklist.user.js
- Remove sites from Google search results

#### Blocklist
You can add any URI/domains to the block list.
There are some notes for adding the new URI/domains to the list:

- You have to snip "http://" and "https://" from the head of URI.
- Generally the expression is treated as RegExp. However "." and "/" is parsed AS-IS. (No escaping is needed.)
- We suppose to add "/" at the last. The last "/" prevent to false positive.

### modifyurl@2ch.user.js
- Modify "ttp://" text to anchor
- Redirect URIs to direct link.

