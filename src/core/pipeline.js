/*!
 * Jaspe
 * Copyright(c) 2017 - 2018 Quentin SAIEB
 * MIT Licensed
 */
'use strict'

const jaspe = require('../utils')
const JaspeError = require('../exception/jaspeError')

class Pipeline {
  constructor (name, steps) {
    this.name = name || ''
    this.currentStep = 0
    this.steps = []

    if (steps) {
      let index = 0
      let length = steps.length
      for (; index < length; index++) {
        this.add(
          steps[index].name,
          steps[index].validator,
          steps[index].params
        )
      }
    }
  }

  add (name, fn, args) {
    if (typeof fn !== 'function') {
      throw new JaspeError({
        code: 'InvalidParameter',
        from: 'Pipeline class - add method',
        message: 'fn has to be a Function'
      })
    }

    this.steps.push({
      name: name,
      fn: fn,
      args: args
    })
  }

  run (value, callback) {
    if (typeof callback !== 'function') {
      throw new JaspeError({
        code: 'InvalidParameter',
        from: 'Pipeline class - run method',
        message: 'callback has to be a Function'
      })
    }
    this.endOfPipeline = callback
    this.next(null, value)
  }

  next (err, param) {
    if (err) {
      err.message = (this.name || 'Contract error') + ' : ' + err.message
      this.end(err, param)
    } else if (this.currentStep >= this.steps.length) {
      this.end(null, param)
    } else {
      let step = this.steps[this.currentStep++]
      let stepArgs = []
      if (step.args !== undefined) {
        stepArgs = jaspe.arrayFromObject(step.args)
      }
      let args = [param, ...stepArgs, this.next.bind(this)]

      jaspe.apply(step.fn, null, args)
    }
  }

  end (err, result) {
    this.endOfPipeline.call(null, err, result)
  }
}

module.exports = Pipeline
