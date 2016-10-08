#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')
var Combinatorics = require('js-combinatorics')

var input = 'hxbxwxba'
var letters = _.range(26).reduce((p, c) => p + String.fromCharCode(c + 'a'.charCodeAt()), '')

function increment (word) {
  var z = 'z'.charCodeAt()
  var last = word[word.length - 1]
  var left = word.substr(0, word.length - 1)
  if (last !== 'z') {
    return left + String.fromCharCode(last.charCodeAt() + 1)
  } else {
    return increment(left) + 'a'
  }
}

function rule1 (word) {
  for (let i = 0; i < word.length - 2; i++) {
    let abc = word.substr(i, 3)
    if (_.includes(letters, abc)) {
      return true
    }
  }
  return false
}

function rule2 (word) {
  var exclude = 'iol'
  return _.every(word, e => !_.includes(exclude, e))
}

function rule3 (word) {
  var pairs = {}
  for (let i = 0; i < word.length - 1; i++) {
    let [a, b] = word.substr(i, 2)
    if (a === b) {
      pairs[a] = true
    }
  }
  return _.size(pairs) >= 2
}

input = 'hxbxxyzz'
let i = 1

while (true) {
  input = increment(input)
  let r1 = rule1(input) 
  let r2 = rule2(input) 
  let r3 = rule3(input) 
  console.log(i, input, r1, r2, r3)
  if (r1 && r2 && r3) {
    break
  }
  i++
}
