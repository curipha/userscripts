userscripts [![CircleCI](https://circleci.com/gh/curipha/userscripts.svg?style=svg)](https://circleci.com/gh/curipha/userscripts)
====================
Various userscripts to enhance browsing experience.

These userscripts work fine with modern web browsers/extensions.

- [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) with Google Chrome
- [Greasemonkey](https://addons.mozilla.org/ja/firefox/addon/greasemonkey/) with Firefox


Notes
--------------------
### google_personal_blocklist.user.js
Notes for editing the URI/domains on the block list.

- Use regular expression
  - `.` and `/` is parsed AS-IS (No escaping is needed)
- Snip off `http://` or `https://` at the beginning of URI
- Add `/` at the tail to avoid false positives

### _export.rb
Run this script to convert Tampermonkey exported JSON file to standard `user.js` files.

```bash
$ ./_export.rb ./path/to/tampermonkey-backup-chrome-yyyy-mm-ddThh_mm_ss.sssZ.txt
```

