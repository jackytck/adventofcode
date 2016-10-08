#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')

var input = fs.createReadStream(process.argv[2])
input.pipe(split()).pipe(through(transform))
input.on('end', () => {
  console.log(diff, diff2)
})

var diff = 0
var diff2 = 0
function transform (buffer, enc, next) {
  var line = buffer.toString()
  if (!line) {
    return next()
  }
  var mem = line.replace(/\\x\w{2}|\\"|\\\\/g, '@')
  var mem2 = line.replace(/\"|\\/g, '@@')
  console.log(line, ' --> ', mem, ' --> ', mem2)

  diff += line.length - mem.length + 2
  diff2 += mem2.length - line.length + 2
  
  next()
}
