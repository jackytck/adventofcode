#!/usr/bin/env node
'use strict'
var fs = require('fs')
var through = require('through2')

var input = fs.createReadStream(process.argv[2])
var floor = 0
var first
input.pipe(through((buffer, _, next) => {
  [...buffer.toString()].forEach((c, i) => {
    if (c === '(') {
      floor++
    } else if (c === ')') {
      floor--
    }
    if (!first && floor === -1) {
      first = i + 1
    }
  })
  next()
}))
input.on('end', () => {
  console.log(floor, first)
})
