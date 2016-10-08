#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')
var Combinatorics = require('js-combinatorics')

var input = fs.readFileSync(process.argv[2]).toString()

function part1 () {
  var regex = /(-?\d+)/g
  var array = []
  var sum = 0
  while ((array = regex.exec(input)) !== null) {
    sum += Number(array[0])
    console.log(array[0])
  }
  console.log(sum)
}

var sum = 0
function part2 () {
  var json = JSON.parse(input)
  count(json)
  console.log(sum)
}

function count (item) {
  if (_.isNumber(item)) {
    sum += item
  } else if (_.isString(item) || !_.isArray(item) && _.some(item, v => v === 'red')) {
    return
  } else {
    _.forEach(item, x => count(x))
  }
}

part2()
