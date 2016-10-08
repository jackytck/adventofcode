#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')
var Combinatorics = require('js-combinatorics')

var input = '3113322113'

function next (a) {
  var c = ''
  var cnt = 0
  var ret = ''
  for (let i = 0; i < a.length; i++) {
    if (c === '') {
      c = a[i]
      cnt++
    } else if (a[i] === c) {
      cnt++
    } else {
      ret += `${cnt}${c}`
      c = a[i]
      cnt = 1
    }
  }
  if (cnt) {
    ret += `${cnt}${c}`
  }
  return ret
}

for (let i = 0; i < 50; i++) {
  input = next(input)
  console.log(i + 1, input)
}
console.log(input.length)
