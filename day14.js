#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')
var Combinatorics = require('js-combinatorics')

var input = fs.readFileSync(process.argv[2]).toString().split('\n').filter(x => x)
var goal = 2503

function part1 (time) {
  var dists = new Array(input.length)
  _.fill(dists, 0)

  input.forEach((line, idx) => {
    var regex = /(\d+)/g
    var match = line.match(regex).map(x => Number(x))
    var [speed, duration, rest] = match
    // console.log(speed, duration, rest)

    var f = duration + rest
    var m = time / f
    var w = _.floor(m)
    var d = 0
    if (time > f) {
      d = w * speed * duration
      var r = time - w * f
      if (r > duration) {
        d += speed * duration
      } else {
        d += speed * r
      }
    } else if (time > duration) {
      d = speed * duration
    } else {
      d = speed * time
    }

    dists[idx] = d
  })

  var maxDist = _.max(dists)
  var leading = dists.map((x, i) => x === maxDist ? i : null).filter(x => x != null)

  return [leading, maxDist]
}

function part2 () {
  var scores = new Array(input.length)
  _.fill(scores, 0)
  for (let t = 1; t <= goal; t++) {
    var [deers, d] = part1(t)
    deers.forEach(deer => scores[deer]++)
  }
  console.log(scores)
  console.log(_.max(scores))
}
// console.log(part1(goal))
// goal = 1000
part2()
