/*!
 * Jaspe
 * Copyright(c) 2017 - 2018 Quentin SAIEB
 * MIT Licensed
 */

'use strict'

function parallel (tasks, callback) {
  let index = 0
  let completed = 0
  let results = {}
  const errors = []
  const length = tasks.length

  if (length === 0) {
    callback(null)
  }

  while (index < length) {
    tasks[index]((error, result) => {
      if (error) {
        errors.push(error)
      } else {
        Object.assign(results, result)
      }

      if ((++completed === length)) {
        callback(errors, results)
      }
    })
    ++index
  }
}

module.exports = parallel
