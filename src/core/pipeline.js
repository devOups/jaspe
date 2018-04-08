/*!
 * Jaspe
 * Copyright(c) 2017 - 2018 Quentin SAIEB
 * MIT Licensed
 */
'use strict'

const JaspeError = require('../exception/jaspeError')

class Pipeline {
  constructor (name, steps) {
    this.name = name || ''
    this.currentStep = 0
    this.steps = []

    if (steps) {
      let index = 0
      const length = steps.length
      while (index < length) {
        this.add(
          steps[index].name,
          steps[index].validator,
          steps[index].params
        )
        ++index
      }
    }
  }

  add (name, fn, params) {
    if (typeof fn !== 'function') {
      throw new JaspeError({
        code: 'InvalidParameter',
        from: 'Pipeline class - add method',
        message: 'fn has to be a Function'
      })
    }

    this.steps.push({name, fn, params})
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

  next (err, value) {
    if (err) {
      err.message = (this.name || 'Contract error') + ' : ' + err.message
      this.end(err, value)
    } else if (this.currentStep >= this.steps.length) {
      this.end(null, value)
    } else {
      const step = this.steps[this.currentStep++]
      const done = (err, result) => this.next(err, result)
      step.params !== undefined
        ? step.fn(value, step.params, done)
        : step.fn(value, done)
    }
  }

  end (err, value) {
    // es2015 computed property names is very slow...
    const result = {}
    result[this.name] = value
    this.endOfPipeline(err, result)
  }
}

module.exports = Pipeline
