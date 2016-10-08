#!/usr/bin/env node --harmony --harmony_destructuring --max-old-space-size=8192
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')
var Combinatorics = require('js-combinatorics')
var Queue = require('buckets-js').Queue
var PriorityQueue = require('buckets-js').PriorityQueue

var input = fs.readFileSync(process.argv[2]).toString().split('\n').filter(x => x)
// console.log(input)

var medicine = 'CRnSiRnCaPTiMgYCaPTiRnFArSiThFArCaSiThSiThPBCaCaSiRnSiRnTiTiMgArPBCaPMgYPTiRnFArFArCaSiRnBPMgArPRnCaPTiRnFArCaSiThCaCaFArPBCaCaPTiTiRnFArCaSiRnSiAlYSiThRnFArArCaSiRnBFArCaCaSiRnSiThCaCaCaFYCaPTiBCaSiThCaSiThPMgArSiRnCaPBFYCaCaFArCaCaCaCaSiThCaSiRnPRnFArPBSiThPRnFArSiRnMgArCaFYFArCaSiRnSiAlArTiTiTiTiTiTiTiRnPMgArPTiTiTiBSiRnSiAlArTiTiRnPMgArCaFYBPBPTiRnSiRnMgArSiThCaFArCaSiThFArPRnFArCaSiRnTiBSiThSiRnSiAlYCaFArPRnFArSiThCaFArCaCaSiThCaCaCaSiRnPRnCaFArFYPMgArCaPBCaPBSiRnFYPBCaFArCaSiAl'
// medicine = 'HOH'

String.prototype.replaceAt = function (index, from, to) {
  return this.substr(0, index) + to + this.substr(index + from.length)
}

var converter = input.map(line => {
  var toks = line.split(' ')
  return [_.first(toks), _.last(toks)]
})
// console.log(converter)

var converter2 = input.map(line => {
  var toks = line.split(' ')
  return [_.last(toks), _.first(toks)]
})
console.log(converter2)

function part1 (med) {
  var set = new Set()
  converter2.forEach(([from, to]) => {
    var re = new RegExp(from, 'g')
    var m
    while ((m = re.exec(med)) !== null) {
      var replaced = med.replaceAt(m.index, from, to)
      set.add(replaced)
    }
  })
  // console.log(set)
  return set
}

var ans1 = part1(medicine)
console.log(ans1.size)

function diff (s) {
  var d = medicine.length
  for (let i = 0; i < medicine.length; i++) {
    if (medicine[i] === s[i]) {
      d--
    } else {
      break
    }
  }
  return d
}

function diff2 (s) {
  return s.length
}

function part2 () {
  var root = [medicine, 0]
  var visit = new Map()
  // var q = new Queue()
  var q = new PriorityQueue((a, b) => {
    var [s1, l1] = a
    var [s2, l2] = b
    return diff2(s2) - diff2(s1)
  })
  q.add(root)
  while (!q.isEmpty()) {
    var [f, s] = q.dequeue()
    // if (visit.get(f) || f.length > medicine.length) {
    if (visit.get(f)) {
      continue
    }
    console.log(f, s)
    visit.set(f, true)
    if (f === 'e') {
      return s
    }
    for (let c of part1(f)) {
      q.add([c, s + 1])
    }
  }
}
console.log(part2())
