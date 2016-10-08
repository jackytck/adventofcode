#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')

var input = fs.createReadStream(process.argv[2])
input.pipe(split()).pipe(through(transform))
input.on('end', () => {
  console.log(area, ribbon)
})

var area = 0
var ribbon = 0
function transform (buffer, enc, next) {
  var line = buffer.toString()
  if (!line) {
    return next()
  }
  var [l, w, h] = _.sortBy(line.split('x').map(Number))
  area += 2 * (l * w + l * h + w * h) + l * w
  ribbon += 2 * (l + w) + l * w * h
  next()
}
