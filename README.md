userscripts
====================
[![CircleCI](https://circleci.com/gh/curipha/userscripts.svg?style=svg)](https://circleci.com/gh/curipha/userscripts)

Various userscripts to enhance browsing experience.

These userscripts works fine on:

- Greasemonkey with Firefox
- Tampermonkey with Google Chrome
- ... and also other modern browsers/extensions


Descriptions
--------------------
### google_personal_blocklist.user.js
Notes for editing the URI/domains on the block list.

- Use regular expression
  - `.` and `/` is parsed AS-IS (No escaping is needed)
- Snip off `http://` or `https://` at the beginning of URI
- Add `/` at the tail to avoid false positives

### _export.sh
Run this script to export all user script files stored in Firefox's user profile directory.

It works for **Firefox on Windows only**.

