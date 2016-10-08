#!/usr/bin/env node --harmony --harmony_destructuring --max-old-space-size=8192
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')
var Combinatorics = require('js-combinatorics')
var Queue = require('buckets-js').Queue
var PriorityQueue = require('buckets-js').PriorityQueue

// var input = fs.readFileSync(process.argv[2]).toString().split('\n').filter(x => x).map(x => Number(x))
// console.log(input)

var w = 2978
var h = 3083

function naive () {
  // w = 10
  // h = 10
  var table = new Array(w * 3)
  for (let i = 0; i < w * 3; i++) {
    table[i] = new Array(h * 3)
  }
  table[0][0] = 20151125
  // table[0][0] = 1
  var x = 0
  var y = 0

  function nextValue(v) {
    // return v + 1
    return v * 252533 % 33554393
  }

  function fill () {
    var nx = x - 1
    var ny = y + 1
    if (nx >= 0) {
      table[nx][ny] = nextValue(table[x][y])
      x = nx
      y = ny
    } else {
      nx = y + 1
      ny = 0
      table[nx][ny] = nextValue(table[x][y])
      x = nx
      y = ny
    }
  }

  // for (let j = 0; j < w * h * 3; j++) {
  while (!table[w - 1][h - 1]) {
    fill()
  }
  // console.log(table)
  console.log('ans:', table[w - 1][h - 1])
}

function better () {
  var idx = 1
  var row = 1
  var col = 1
  while (row < w || col < h) {
    if (row === 1) {
      row = col + 1
      col = 1
    } else {
      row--
      col++
    }
    idx++
  }
  var code = 20151125
  for (let i = 0; i < idx - 1; i++) {
    code = code * 252533 % 33554393
  }
  console.log('ans:', code)
}
// naive()
better()
