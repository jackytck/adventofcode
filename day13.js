#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')
var Combinatorics = require('js-combinatorics')

var input = fs.readFileSync(process.argv[2]).toString().split('\n').filter(x => x)

var graph = new Map()
input.forEach(line => {
  var regex = /(\w+) would (\w+) (\d+)[\w| ]* (\w+)./
  var match = regex.exec(line)
  var [o, p1, sign, happiness, p2] = match
  sign = sign === 'gain' ? 1 : -1
  happiness = sign * Number(happiness)

  if (!graph.has(p1)) {
    graph.set(p1, new Map())
  }
  graph.get(p1).set(p2, happiness)
})

function part2 () {
  var map = new Map()
  var keys = [...graph.keys()]
  var vals = [...graph.values()]
  keys.forEach(p => map.set(p, 0))
  vals.forEach(m => m.set('me', 0))
  graph.set('me', map)
}
part2()

var perm = Combinatorics.permutation([...graph.keys()]).toArray()
var size = graph.size
var maxHappiness = perm.reduce((maxScore, seat) => {
  var score = seat.reduce((pre, cur, index) => {
    return pre + graph.get(cur).get(seat[(index - 1 + size) % size]) +  graph.get(cur).get(seat[(index + 1 + size) % size])
  }, 0)
  return Math.max(maxScore, score)
}, 0)
console.log(maxHappiness)
