/*!
 * Jaspe
 * Copyright(c) 2017 - 2018 Quentin SAIEB
 * MIT Licensed
 */

'use strict'

const EventEmitter = require('events')

class EntryPoint extends EventEmitter {
  invoke (service, params) {
    return new Promise((resolve, reject) => {
      let callback = (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      }

      this.emit(service, params, callback)
    })
  }
}

module.exports = EntryPoint
