#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')
var Combinatorics = require('js-combinatorics')

var input = fs.readFileSync(process.argv[2]).toString().split('\n').filter(x => x)
// console.log(input)

function* neighbor (m, x, y) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue
      }
      yield m[[x + i, y + j]] || 0
    }
  }
}

function countOn (m, x, y) {
  return _.sum([...neighbor(m, x, y)])
}

function main () {
  var m = {}
  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input.length; y++) {
      m[[x, y]] = input[x][y] === '#' ? 1 : 0
    }
  }

  // part 2
  m[[0, 0]] = 1
  m[[input.length - 1, 0]] = 1
  m[[0, input.length - 1]] = 1
  m[[input.length - 1, input.length - 1]] = 1

  var iter = 100
  var pre = m
  for (let i = 0; i < iter; i++) {
    let next = {}
    for (let x = 0; x < input.length; x++) {
      for (let y = 0; y < input.length; y++) {
        // part 1
        var c = countOn(pre, x, y)
        if (pre[[x, y]]) {
          if (c === 2 || c === 3) {
            next[[x, y]] = 1
          } else {
            next[[x, y]] = 0
          }
        } else {
          if (c === 3) {
            next[[x, y]] = 1
          } else {
            next[[x, y]] = 0
          }
        }
        // part 2
        next[[0, 0]] = 1
        next[[input.length - 1, 0]] = 1
        next[[0, input.length - 1]] = 1
        next[[input.length - 1, input.length - 1]] = 1
      }
    }
    pre = next
  }
  console.log(_.sum(pre))
  // for (let x = 0; x < input.length; x++) {
  //   for (let y = 0; y < input.length; y++) {
  //     process.stdout.write(String(pre[[x, y]]))
  //   }
  //   console.log('')
  // }
}
main()
