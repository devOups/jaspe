'use strict'

function parallel (tasks, callback) {
  let index = 0
  let completed = 0
  let results = []
  let errors = []
  let length = tasks.length

  if (length === 0) {
    callback(null)
  }

  for (; index < length; index++) {
    tasks[index].call(null, (error, result) => {
      if (error) {
        errors.push(error)
      } else {
        results.push(result)
      }

      if ((++completed === length)) {
        callback(errors, results)
      }
    })
  }
}

module.exports = parallel
