#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var through = require('through2')
var _ = require('lodash')

var input = fs.createReadStream(process.argv[2])
input.pipe(through(transform))
input.on('end', () => {
  console.log(_.size(visited))
})

var visited = {
}
var posSanta = [0, 0]
var posRobot = [0, 0]
var santaTurn = true
var dir = {
  '^': [0, -1],
  'v': [0, 1],
  '>': [1, 0],
  '<': [-1, 0]
}

visited[posSanta.toString()] = true
function transform (buffer, enc, next) {
  var line = buffer.toString().trim()
  if (!line) {
    return next()
  }
  [...line].forEach(c => {
    var pos = posSanta
    if (!santaTurn) {
      pos = posRobot
    }
    var [dx, dy] = dir[c]
    pos[0] += dx
    pos[1] += dy
    visited[pos.toString()] = true
    santaTurn = !santaTurn
  })
  next()
}
