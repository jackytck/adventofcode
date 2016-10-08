#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')
var Combinatorics = require('js-combinatorics')

var input = fs.readFileSync(process.argv[2]).toString().split('\n').filter(x => x)
var goal = 2503

function* points () {
  for (let i = 1; i < 97; i++) {
    for (let j = 1; j < 97; j++) {
      for (let k = 1; k < 97; k++) {
        for (let l = 1; l < 97; l++) {
          if (i + j + k + l === 100) {
            yield [i, j, k, l]
          }
        }
      }
    }
  }
}

function* points2 () {
  for (let i = 1; i < 97; i++) {
    for (let j = 1; j < 97; j++) {
      if (i + j === 100) {
        yield [i, j]
      }
    }
  }
}


function transpose (m) {
  return _.zip(...m)
}

function dot (a, b) {
  return Math.max(0, _.sum(_.zip(a, b).map(([x, y]) => x * y)))
}

function part1 () {
  var maxScore = 0
  var table = []
  var calories = []

  input.forEach((line, idx) => {
    var regex = /([+|-]?\d+)/g
    var match = line.match(regex).map(x => Number(x))
    var [c, d, f, t, cal] = match
    table.push([c, d, f, t])
    calories.push(cal)
  })
  table = transpose(table)
  console.log(table, calories)

  for (let p of points()) {
    let s = 1
    // console.log(table, p)
    if (dot(calories, p) === 500) {
      
      for (let t of table) {
        s *= dot(t, p)
      }
      if (s > maxScore) {
        console.log(s, p)
      }
      maxScore = Math.max(maxScore, s)
    }
  }

  console.log(maxScore)
}
part1()
