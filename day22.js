#!/usr/bin/env node --harmony --harmony_destructuring --max-old-space-size=8192
'use strict'
var fs = require('fs')
var split = require('split')
var through = require('through2')
var _ = require('lodash')
var Combinatorics = require('js-combinatorics')
var Queue = require('buckets-js').Queue
var PriorityQueue = require('buckets-js').PriorityQueue

// var input = fs.readFileSync(process.argv[2]).toString().split('\n').filter(x => x)
// console.log(input)

// Hit Points, Damage
var Boss = [55, 8]
// Hit Points, Damage, Armor, Mana, Magic, timer
var Player = [50, 0, 0, 500, [], []]
// var Boss = [14, 8]
// var Player = [10, 0, 0, 250, [], []]

// Cost Mana, damage, heals, armor, turns, stay, add mana
var Magics = [
  [53, 4, 0, 0, 1, false, 0],
  [73, 2, 2, 0, 1, false, 0],
  [113, 0, 0, 7, 6, true, 0],
  [173, 3, 0, 0, 6, false, 0],
  [229, 0, 0, 0, 5, false, 101]
]

function* playerTurn (player, boss) {
  var magic = player[4]
  var timer = player[5]
  var nextMagic = []
  var nextTimer = []
  if (magic.length) {
    magic.forEach((m, i) => {
      var [mana, damage, heals, armor, turns, stay, addMama] = Magics[m]
      timer[i]--
      if (!stay) {
        player[0] += heals
        player[3] += addMama
        if (damage > 0) {
          boss[0] -= Math.max(1, damage)
        }
      } else {
        if (timer[i] === turns - 1) {
          player[2] += armor
        } else if (timer[i] === 0) {
          player[2] -= armor
        }
      }
      if(timer[i] > 0) {
        nextMagic.push(m)
        nextTimer.push(timer[i])
      }
    })
  }

  var casts = Magics.map((m, i) => {
    if (!_.includes(nextMagic, i) && player[3] >= m[0]) {
      return i
    } else {
      return null
    }
  }).filter(x => x !== null)
  for (let i = 0; i < casts.length; i++) {
    var c = casts[i]
    var p = _.clone(player)
    var b = _.clone(boss)
    p[3] -= Magics[c][0]
    p[4] = nextMagic.concat(c)
    p[5] = nextTimer.concat(Magics[c][4])
    yield [p, b, Magics[c][0]]
  }
}

function bossTurn (player, boss) {
  var magic = player[4]
  var timer = player[5]
  var nextMagic = []
  var nextTimer = []
  if (magic.length) {
    magic.forEach((m, i) => {
      var [mana, damage, heals, armor, turns, stay, addMama] = Magics[m]
      timer[i]--
      if (!stay) {
        player[0] += heals
        player[3] += addMama
        if (damage > 0) {
          boss[0] -= Math.max(1, damage)
        }
      } else {
        if (timer[i] === turns - 1) {
          player[2] += armor
        } else if (timer[i] === 0) {
          player[2] -= armor
        }
      }
      if(timer[i] > 0) {
        nextMagic.push(m)
        nextTimer.push(timer[i])
      }
    })
  }

  var damage = Math.max(1, boss[1] - player[2])
  player[0] -= damage
  player[4] = nextMagic
  player[5] = nextTimer
  return [player, boss, 0]
}

function main () {
  var allWins = []

  // player, boss, turns, mana used
  var root = [Player, Boss, 0, 0, 1]
  var q = new Queue()
  q.add(root)
  while (!q.isEmpty()) {
    var [player, boss, who, cost, turns] = q.dequeue()

    if (who === 0) {
      player[0]--
    }

    // check hit points
    if (boss[0] <= 0) {
      allWins.push(cost)
      console.log('\nBegin:')
      if (who === 0)
        console.log(`Player turns ${turns}:`, 'player', player, 'boss', boss, 'cost', cost)
      else
        console.log(`Boss turns ${turns}`, 'player', player, 'boss', boss, 'cost', cost)
      continue
    }
    if (player[0] <= 0 || player[3] <= 0) {
      continue
    }

    // next turn
    if (who === 0) {
      // console.log('Next:')
      for (let t of playerTurn(player, boss)) {
        var [np, nb, nc] = t
        q.add([np, nb, 1, cost + nc, turns + 1])
        // console.log('Player Turns:', 'player', np, 'boss', nb, 'cost', cost + nc)
      }
    } else {
      var [np, nb] = bossTurn(player, boss) 
      q.add([np, nb, 0, cost, turns + 1])
      // console.log('Next:')
      // console.log('Boss Turns:', 'player', np, 'boss', nb, 'cost', cost)
    }
  }

  // console.log(allWins)
  console.log('ans:', _.min(allWins))
}

main()
