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

var PC = 0
var register = {
  a: 1,
  b: 0
}

function execute (line) {
  console.log('begin', PC+1, register)
  var [inc, reg, adr] = line.split(' ')
  // console.log('inc', inc, 'reg', reg, 'adr', adr)
  console.log(line)
  if (inc === 'jmp') {
  }
  switch (inc) {
    case 'hlf':
      register[reg] /= 2
      PC++
      break
    case 'tpl':
      register[reg] *= 3
      PC++
      break
    case 'inc':
      register[reg]++
      PC++
      break
    case 'jmp':
      adr = Number(reg)
      PC += adr
      break
    case 'jie':
      if (register[reg.split(',')[0]] % 2 === 0) {
        PC += Number(adr)
      } else {
        PC++
      }
      break
    case 'jio':
      if (register[reg.split(',')[0]] === 1) {
        PC += Number(adr)
      } else {
        PC++
      }
      break
  }
  console.log('end', PC+1, register)
  if (PC >= input.length || PC < 0) {
    return false
  }
  return true
}

function main () {
  while(execute(input[PC])) {
  }
  console.log(register)
}

main()
