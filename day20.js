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
var input = 33100000

// part 1
function* primeFactors (x) {
  while (x % 2 === 0) {
    yield 2
    x /= 2
  }
  var i = 3
  while (i <= Math.sqrt(x) + 1) {
    if (x % i === 0) {
      yield i
      x /= i
    } else {
      i += 2
    }
  }
  if (x > 1) {
    yield x
  }
}

function presents (x) {
  var pfs = [...primeFactors(x)]
  var cnt = _.countBy(pfs)
  return _.reduce(cnt, (pre, e, p) => {
    p = Number(p)
    return pre * (Math.pow(p, e + 1) - 1) / (p - 1)
  }, 10)
}

function part1 () {
  var ret = 1
  var p = presents(ret)
  while (p < input) {
    p = presents(ret)
    console.log(ret, p)
    ret++
  }
  console.log('ans', ret - 1)
}

// part 2
function factors (x) {
  var ret = new Set()
  for (let i = 1; i < Math.sqrt(x) + 1; i++) {
    if (x % i === 0) {
      ret.add(i)
      ret.add(x / i)
    }
  }
  return ret
}

function* factors50 (x) {
  for (let f of factors(x)) {
    if (f * 50 >= x) {
      yield f
    }
  }
}

function presents2 (x) {
  return _.sum([...factors50(x)]) * 11
}

function part2 () {
  var ret = 720720
  var p = presents2(ret)
  while (p < input) {
    p = presents2(ret)
    console.log(ret, p)
    ret++
  }
  console.log('ans', ret - 1)
}

part2()
