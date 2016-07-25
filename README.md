userscripts
====================
These user scripts are for Greasemonkey on Firefox.

Maybe they can run fine on Google Chrome, Scriptish on Firefox and/or other modern browsers/extensions.


Remarks
--------------------
### google_personal_blocklist.user.js
There are some notes for adding the new URI/domains to the list:

- Written in modified regular expression
  - `.` and `/` is parsed AS-IS (No escaping is needed)
- Snip off `http://` or `https://` at the beginning of URI
- Last `/` prevents to false positive

### _export.sh
Run this script to export all user script files stored in Firefox's user profile directory.

It works for **Firefox on Windows only**.

