#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var crypto = require('crypto')
var _ = require('lodash')

var secret = fs.readFileSync(process.argv[2]).toString().trim()
function hash (code) {
  return crypto.createHash('md5').update(code).digest('hex')
}
var i = 0
while (hash(`${secret}${++i}`).substr(0, 6) !== '000000') {}
console.log(i)
