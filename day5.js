#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')

var input = fs.createReadStream(process.argv[2])
input.pipe(split()).pipe(through(transform2))
input.on('end', () => {
  console.log(nice)
})

var nice = 0
var vowels = 'aeiou'
var dissallow = ['ab', 'cd', 'pq', 'xy']

function transform (buffer, enc, next) {
  var line = buffer.toString()
  if (!line) {
    return next()
  }

  var chars = [...line]
  var set = _.uniq(chars)
  var p1 = 0
  var p2 = false
  var p3 = true

  // Property 1: At least three vowels
  for (let c of line) {
    if (_.includes(vowels, c)) {
      p1++
    }
  }
  // Property 2: At least one double letter
  for (let c of set) {
    if (_.includes(line, c + c)) {
      p2 = true
      break
    }
  }
  // Property 3: Does not contain dissallowed strings
  for (let s of dissallow) {
    if (_.includes(line, s)) {
      p3 = false
      break
    }
  }
  if (p1 >= 3 && p2 && p3) {
    nice++
  }
  next()
}

function transform2 (buffer, enc, next) {
  var line = buffer.toString()
  if (!line) {
    return next()
  }

  // var pairs = _.zip(line.substr(0, line.length - 1), line.substr(1, line.length))
  // var pairsCnt = _.countBy(pairs, p => p[0] + p[1])
  // var p1 = _.some(pairsCnt, p => p >= 2)

  var p1 = false
  var p2 = false

  for (let i = 0; i < line.length - 1; i++) {
    var ab = line[i] + line[i + 1]
    var left = line.substr(0, i)
    var right = line.substr(i + 2)
    if (_.includes(left, ab) || _.includes(right, ab)) {
      p1 = true
      break
    }
  }

  for (let i = 0; i < line.length - 2; i++) {
    if (line[i] === line[i + 2]) {
      p2 = true
      break
    }
  }

  if (p1 && p2) {
    nice++
  }
  next()
}
