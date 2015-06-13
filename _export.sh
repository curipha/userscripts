#!/usr/bin/env bash

# Userscripts extractor
# * Extract *.user.js from Firefox profile directory

FXPROFILE="${USERPROFILE//\\/\/}/AppData/Roaming/Mozilla/Firefox/Profiles"
USERJSEXT=.user.js


# Change directory to the same level as this script
cd `dirname "${0}"`


# Remove current user.js
rm -f *"${USERJSEXT}"


# Copy userscripts from Firefox's user profile directory
find "${FXPROFILE}" -type f -iname "*${USERJSEXT}" -ipath "*/*_scripts/*" -exec cp {} . \;


# Change linefeed code to LF only
for file in `ls -1 *"${USERJSEXT}"`; do
  echo Processing "${file}"...

  tr -d "\r" < "${file}" | sed -e 's/ \+$//' > "${file}.lf"
  mv "${file}.lf" "${file}"
done

# Update mode
chmod 0644 *"${USERJSEXT}"

