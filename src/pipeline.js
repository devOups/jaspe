'use strict'

const jaspe = require('./utils')

var Pipeline = function (name, steps) {
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

Pipeline.prototype.add = function (name, fn, args) {
  if (typeof fn !== 'function') {
    throw new Error('fn has to be a Function')
  }

  this.steps.push({
    name: name,
    fn: fn,
    args: args
  })
}

Pipeline.prototype.run = function (value, callback) {
  if (typeof callback !== 'function') {
    throw new Error('callback has to be a Function')
  }
  this.endOfPipeline = callback
  this.next(null, value)
}

Pipeline.prototype.next = function (err, param) {
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

Pipeline.prototype.end = function (err, result) {
  this.endOfPipeline.call(null, err, result)
}

module.exports = Pipeline
