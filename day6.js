#!/usr/bin/env node --harmony --harmony_destructuring
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')

var input = fs.createReadStream(process.argv[2])
input.pipe(split()).pipe(through(transform))
input.on('end', () => {
  console.log(countOn())
})

var grid = null
var w = 1000
var h = 1000

function makeGrid () {
  var grid = new Array(w)
  for (let i = 0; i < w; i++) {
    grid[i] = new Array(h)
  }
  return grid
}

function loopOver (x1, y1, x2, y2, f) {
  for (let i = x1; i <= x2; i++) {
    for (let j = y1; j <= y2; j++) {
      f(i, j)
    }
  }
}

function countOn () {
  var cnt = 0
  loopOver(0, 0, w - 1, h - 1, (x, y) => {
    cnt += grid[x][y]
  })
  return cnt
}

function turnOn (x1, y1, x2, y2) {
  loopOver(x1, y1, x2, y2, (x, y) => {
    // grid[x][y] = 1
    grid[x][y]++
  })
}

function turnOff (x1, y1, x2, y2) {
  loopOver(x1, y1, x2, y2, (x, y) => {
    // grid[x][y] = 0
    grid[x][y] = Math.max(0, grid[x][y] - 1)
  })
}

function toggle (x1, y1, x2, y2) {
  loopOver(x1, y1, x2, y2, (x, y) => {
    //grid[x][y] ^= 1
    grid[x][y] += 2
  })
}

function transform (buffer, enc, next) {
  var line = buffer.toString()
  if (!line) {
    return next()
  }
  
  var regex = /([\w ]*) (\d*),(\d*) \w* (\d*),(\d*)/
  var match = regex.exec(line)
  var [input, action, x1, y1, x2, y2, ...other] = match
  x1 = Number(x1)
  y1 = Number(y1)
  x2 = Number(x2)
  y2 = Number(y2)

  if (action === 'turn on') {
    turnOn(x1, y1, x2, y2)
  } else if (action === 'turn off') {
    turnOff(x1, y1, x2, y2)
  } else if (action === 'toggle') {
    toggle(x1, y1, x2, y2)
  }

  next()
}

function main () {
  grid = makeGrid(w, h)
  loopOver(0, 0, w - 1, h - 1, (x, y) => grid[x][y] = 0)
}
main()
