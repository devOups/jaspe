/*!
 * Jaspe
 * Copyright(c) 2017 Quentin SAIEB
 * MIT Licensed
 */

'use strict'

function each (map, make, callback) {
  let length = map.size
  let results = []
  let errors = []
  let completed = 0

  map.forEach((value, key) => {
    make(key, value, (err, result) => {
      if (err) {
        errors.push(err)
      } else {
        results.push(result)
      }

      if ((++completed === length)) {
        callback(errors, results)
      }
    })
  })
}

module.exports = each
