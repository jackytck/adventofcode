#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')
var Combinatorics = require('js-combinatorics')

var input = fs.readFileSync(process.argv[2]).toString().split('\n').filter(x => x).map(x => Number(x))
var cnt = 0
var stats = []

function main () {
  for (let k = 1; k <= input.length; k++) {
    for (let c of Combinatorics.combination(input, k).toArray()) {
      if (_.sum(c) === 150) {
        console.log(c)
        stats.push(_.size(c))
        cnt++
      }
    }
  }
  console.log('Part 1:\n', cnt)
  console.log('Part 2:\n', _.chain(stats).countBy().sort().value())
}
main()
