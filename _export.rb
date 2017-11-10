#!/usr/bin/env ruby

require 'json'
require 'base64'

abort "Usage: #{$0} <exported JSON file>" if ARGV.count < 1

file = ARGV.first
abort "JSON file does not exist: #{file}" unless File.exist?(file)


json = JSON.load(File.read(file))

json['scripts'].each do |js|
  name = js['name'].downcase

  File.open("./#{name.gsub(/[ \/]/, '_')}.user.js", 'w', 0644) do |fp|
    fp.puts Base64.strict_decode64(js['source']).strip
  end
end

