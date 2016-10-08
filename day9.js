#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')
var Combinatorics = require('js-combinatorics')

var input = fs.createReadStream(process.argv[2])
input.pipe(split()).pipe(through(transform))
input.on('end', () => {
  exhaust()
  console.log(minDist, maxDist)
})

var minDist = 0
var maxDist = 0
var cities = {}

function transform (buffer, enc, next) {
  var line = buffer.toString()
  if (!line) {
    return next()
  }
  var regex = /(\w+) to (\w+) = (\d+)/
  var match = regex.exec(line)
  var [all, from, to, dist] = match
  if (!cities[from]) {
    cities[from] = {}
  }
  if (!cities[to]) {
    cities[to] = {}
  }
  cities[from][to] = Number(dist)
  cities[to][from] = Number(dist)

  next()
}

function exhaust () {
  var locations = Object.keys(cities)
  var perm = Combinatorics.permutation(locations).toArray()
  perm.forEach(route => {
    var d = 0
    for (let i = 0; i < route.length - 1; i++) {
      d += cities[route[i]][route[i + 1]]
    }
    if (minDist === 0) {
      minDist = d
    }
    if (maxDist === 0) {
      maxDist = d
    }
    minDist = Math.min(minDist, d)
    maxDist = Math.max(maxDist, d)
  })
}
