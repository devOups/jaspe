const jaspe = require('./utils')

var Pipeline = function (name) {
  this.steps = []
  this.currentStep = 0
  this.name = name || ''
}

Pipeline.prototype.add = function (name, fn, args) {
  if (typeof fn !== 'function') {
    throw 'fn has to be a Function'
  }

  this.steps.push({
    name: name,
    fn: fn,
    args: args
  })
}

Pipeline.prototype.run = function (param, callback) {
  if (typeof callback !== 'function') {
    throw 'callback has to be a Function'
  }
  this.endOfPipeline = callback
  this.next.call(this, null, param)
}

Pipeline.prototype.next = function (err, param) {
  if (err) {
    err.message = (this.name || 'Contract error') + ' : ' + err.message
    this.end.call(this, err, param)
  } else if (this.currentStep >= this.steps.length) {
    this.end.call(this, null, param)
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

module.exports = Pipeline;
