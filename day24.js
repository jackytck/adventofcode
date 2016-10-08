#!/usr/bin/env node --harmony --harmony_destructuring --max-old-space-size=8192
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')
var Combinatorics = require('js-combinatorics')
var Queue = require('buckets-js').Queue
var PriorityQueue = require('buckets-js').PriorityQueue

var input = fs.readFileSync(process.argv[2]).toString().split('\n').filter(x => x).map(x => Number(x))
var balance = _.sum(input) / 4
console.log(input)
console.log(balance)

function check (bag) {
  var left = input.filter(x => !_.includes(bag, x))
  for (let i = 1; i < left.length; i++) {
    var others = Combinatorics.combination(left, i).toArray().filter(x => _.sum(x) === balance)
    if (others.length) {
      return true
    }
  }
  return false
}

function main () {
  var bags = []
  for (let i = 1; i < input.length; i++) {
    bags = Combinatorics.combination(input, i).toArray().filter(x => _.sum(x) === balance)
    if (bags.length) {
      break
    }
  }
  console.log(bags)
  bags = bags.filter(x => check(x))
  console.log(bags)
  bags = bags.map(b => {
    return b.reduce((p, c) => p * c, 1)
  })
  console.log(bags)
  console.log('ans:', _.min(bags))
}

main()
