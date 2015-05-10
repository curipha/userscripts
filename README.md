userscripts
===========
These user scripts are for Greasemonkey on Firefox.
Maybe they can run fine on Google Chrome, Scriptish on Firefox and/or other browsers/extensions.

Description describes only what appears to be necessary.

About scripts
-------------

### google_personal_blocklist.user.js
You can add any URI/domains to the block list.
There are some notes for adding the new URI/domains to the list:

- It needs to snip `http://` and/or `https://` at the beginning of URI
- The defined rule is interpreted as regular expression
  - However `.` and `/` is parsed AS-IS (No escaping is needed)
- Last `/` prevents to false positive

About script
------------

### _export.sh
Just execute this script on this directory.
Then all script files stored in Firefox's user profile directory will be extracted.

This is prepared for backup easily :D

I create this script for Firefox on Windows.

