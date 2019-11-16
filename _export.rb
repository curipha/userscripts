#!/usr/bin/env ruby

require 'json'
require 'base64'

file = ARGV.first || Dir.glob(File.expand_path('~/Desktop/tampermonkey-backup-*.txt')).first
abort 'JSON file does not exist.' if file.nil? || !File.exist?(file)

json = JSON.load(File.read(file))

json['scripts'].each do |js|
  name = js['name'].downcase

  File.open("./#{name.gsub(/[ \/]/, '_')}.user.js", 'w', 0644) do |fp|
    fp.puts Base64.strict_decode64(js['source']).strip
  end
end

File.delete(file)
