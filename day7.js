#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')

var input = fs.createReadStream(process.argv[2])
input.pipe(split()).pipe(through(transform2))
input.on('end', () => {
  var goal = instructions.length
  while(_.size(done) !== goal) {
    infer()
  }
  console.log(vtable)
  console.log(vtable['a'])
})

var tree = {}

function transform (buffer, enc, next) {
  var line = buffer.toString()
  if (!line) {
    return next()
  }
  
  var regex = /([\w ]+) -> (\w+)/
  var match = regex.exec(line)
  var [a, inputs, out] = match
  tree[out] = inputs

  next()
}

function evaluate (s) {
  console.log(s)
  if (/\d+/.test(s)) {
    return Number(s)
  }
  var inputs = tree[s]
  var toks = inputs.split(' ')

  switch (toks.length) {
    case 1:
      if (/\d+/.test(inputs)) {
        return Number(inputs)
      } else {
        return evaluate(inputs)
      }
    case 2:
      return 65535 - evaluate(toks[1])
    case 3:
      let op = toks[1]
      switch (op) {
        case 'AND':
          return evaluate(toks[0]) & evaluate(toks[2])
        case 'OR':
          return evaluate(toks[0]) | evaluate(toks[2])
        case 'LSHIFT':
          return evaluate(toks[0]) << evaluate(toks[2])
        case 'RSHIFT':
          return evaluate(toks[0]) >> evaluate(toks[2])
      }
  }
}

var vtable = {}
var instructions = []
var done = {}
function transform2 (buffer, enc, next) {
  var line = buffer.toString()
  if (!line) {
    return next()
  }
  
  var regex = /([\w ]+) -> (\w+)/
  var match = regex.exec(line)
  var [a, inputs, out] = match
  instructions.push([inputs, out])

  next()
}

function infer () {
  instructions.forEach((s, i) => {
    if (done[i]) {
      return
    }
    let [inputs, symbol] = s
    var toks = inputs.split(' ')

    switch (toks.length) {
      case 1:
        if (/\d+/.test(inputs)) {
          vtable[symbol] = Number(inputs)
          done[i] = true
        } else {
          let v = vtable[inputs]
          if (!_.isUndefined(v)) {
            vtable[symbol] = v
            done[i] = true
          }
        }
        break
      case 2:
        let v = vtable[toks[1]]
        if (!_.isUndefined(v)) {
          vtable[symbol] = 65535 - v
          done[i] = true
        } else if (/\d+/.test(toks[1])) {
          vtable[symbol] = 65535 - Number(toks[1])
          done[i] = true
        }
        break
      case 3:
        let op = toks[1]
        let v0 = vtable[toks[0]]
        let v2 = vtable[toks[2]]
        if (/\d+/.test(toks[0])) {
          v0 = Number(toks[0])
        }
        if (/\d+/.test(toks[2])) {
          v2 = Number(toks[2])
        }
        switch (op) {
          case 'AND':
            if (!_.isUndefined(v0) && !_.isUndefined(v2)) {
              vtable[symbol] = v0 & v2
              done[i] = true
            }
            break
          case 'OR':
            if (!_.isUndefined(v0) && !_.isUndefined(v2)) {
              vtable[symbol] = v0 | v2
              done[i] = true
            }
            break
          case 'LSHIFT':
            if (!_.isUndefined(v0)) {
              vtable[symbol] = v0 << Number(toks[2])
              done[i] = true
            }
            break
          case 'RSHIFT':
            if (!_.isUndefined(v0)) {
              vtable[symbol] = v0 >> Number(toks[2])
              done[i] = true
            }
            break
        }
    }
  })
}
