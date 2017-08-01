var Pipeline = function (name) {
  this.steps = []
  this.currentStep = 0
  this.name = name || ''
}

Pipeline.prototype.add = function (name, fn) {
  if (typeof fn !== 'function') {
    throw 'fn has to be a Function'
  }

  this.steps.push({
    name: name,
    fn: fn
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
  if (this.currentStep >= this.steps.length) {
    this.end.call(this, err, param)
  } else {
    this.steps[this.currentStep++]
      .fn.call(
        null,
        err,
        param,
        this.next.bind(this)
      )
    }
}

Pipeline.prototype.end = function (err, result) {
  this.endOfPipeline.call(null, err, result)
}

module.exports = Pipeline;
