#!/usr/bin/env node --harmony --harmony_destructuring --max-old-space-size=8192
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')
var Combinatorics = require('js-combinatorics')
var Queue = require('buckets-js').Queue
var PriorityQueue = require('buckets-js').PriorityQueue

// var input = fs.readFileSync(process.argv[2]).toString().split('\n').filter(x => x)
// console.log(input)

var Boss = [104, 8, 1]

var Weapons = [
  [8, 4, 0],
  [10, 5, 0],
  [25, 6, 0],
  [40, 7, 0],
  [74, 8, 0]
]

var Armors = [
  [0, 0, 0],
  [13, 0, 1],
  [31, 0, 2],
  [53, 0, 3],
  [75, 0, 4],
  [102, 0, 5]
]

var Rings = [
  [25, 1, 0],
  [100, 3, 0],
  [20, 0, 1],
  [40, 0, 2],
  [80, 0, 3]
]

var Rings2 = Combinatorics.combination(Rings, 2).toArray().map(x => [x[0][0] + x[1][0], x[0][1] + x[1][1], x[0][2] + x[1][2]])

function win(player, boss) {
  var ph = 100
  var bh = boss[0]
  var pa = Math.max(1, player[1] - boss[2])
  var ba = Math.max(1, boss[1] - player[2])
  return Math.ceil(bh / pa) <= Math.ceil(ph / ba)
}

function main () {
  var cp1 = Combinatorics.cartesianProduct(Weapons, Armors).toArray()
  var cp2 = Combinatorics.cartesianProduct(Weapons, Armors, Rings).toArray()
  var cp3 = Combinatorics.cartesianProduct(Weapons, Armors, Rings2).toArray()
  var cp = cp1.concat(cp2).concat(cp3).map(x => _.zip(...x).map(y => _.sum(y)))
  var play = cp.map(p => [win(p, Boss), p[0]])
  console.log(cp)
  // console.log(win([0, 5, 5], [12, 7, 2]))
  var minWin = play.filter(x => x[0])
  // console.log(play)
  var min = _.min(minWin, p => p[1])
  console.log('Part 1:', min)

  var maxLoss = play.filter(x => !x[0])
  // console.log(play)
  var max = _.max(maxLoss, p => p[1])
  console.log('Part 2:', max)
}

main()
