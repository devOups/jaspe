/*!
 * Jaspe
 * Copyright(c) 2017 Quentin SAIEB
 * MIT Licensed
 */

'use strict'

const Pipeline = require('../pipeline')
const parallel = require('../parallel')
const each = require('../each')

class Contract {
  constructor (name, services) {
    this.name = name || ''
    this.services = services || new Map()
  }

  register (service, requirements) {
    if (!service) {
      throw new Error('service must be not null undefined or empty string')
    }

    if (this.isAlreadyRegister(service)) {
      throw new Error('service: ' + service + ' with the same name already register')
    }

    if (!(requirements instanceof Map)) {
      throw new Error('requirements must be a Map instance')
    }

    this.services.set(service, requirements)
  }

  isAlreadyRegister (service) {
    return this.services.has(service)
  }

  check (service, params) {
    return new Promise((resolve, reject) => {
      if (!this.isAlreadyRegister(service)) {
        reject(new Error('service: ' + service + ' is not register'))
      } else {
        let requirements = this.services.get(service)
        each(requirements, (nameOfParam, requirement, next) => {
          // for each item in requirements
          let p = new Pipeline(nameOfParam, requirement)
          next(null, (callback) => {
            p.run(params[nameOfParam], callback)
          })
        }, (err, pipelines) => {
          if (err.length !== 0) {
            return reject(err)
          }
          // when all pipelines are built, run them
          parallel(pipelines, (err, data) => {
            if (err.length !== 0) {
              reject(err)
            } else {
              resolve(data)
            }
          })
        })
      }
    })
  }
}

module.exports = Contract
