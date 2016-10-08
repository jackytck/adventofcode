#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')
var Combinatorics = require('js-combinatorics')

var input = fs.readFileSync(process.argv[2]).toString().split('\n').filter(x => x)

var search = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1
}

// Part 1
function check (k, v) {
  return v === search[k]
}

// Part 2
function check2 (k, v) {
  if (k === 'cats' || k === 'trees') {
    return v > search[k]
  } else if (k === 'pomeranians' || k === 'goldfish') {
    return v < search[k]
  } else {
    return v === search[k]
  }
}

function main () {
  input.forEach((line, idx) => {
    var regex = /Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/
    var match = line.match(regex)
    var [o, aunt, k1, v1, k2, v2, k3, v3] = match
    v1 = Number(v1)
    v2 = Number(v2)
    v3 = Number(v3)
    // if (check(k1, v1) && check(k2, v2) && check(k3, v3)) {
    if (check2(k1, v1) && check2(k2, v2) && check2(k3, v3)) {
      console.log(o)
    }
  })
}
main()
