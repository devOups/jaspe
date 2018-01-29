/*!
 * Jaspe
 * Copyright(c) 2017 Quentin SAIEB
 * MIT Licensed
 */

'use strict'

const Pipeline = require('./pipeline')
const parallel = require('../parallel')
const each = require('../each')
const JaspeError = require('../exception/jaspeError')
const ContractError = require('../exception/ContractError')

class Contract {
  constructor (name, services) {
    this.name = name || ''
    this.services = services || new Map()
  }

  register (service, requirements) {
    if (!service) {
      throw new JaspeError({
        code: 'InvalidParameter',
        from: 'Contract class - register method',
        message: 'service must be not null undefined or empty string'
      })
    }

    if (this.isAlreadyRegister(service)) {
      throw new JaspeError({
        code: 'InvalideParameter',
        from: 'Contract class - register method',
        message: `service: ${service} already register`
      })
    }

    if (!(requirements instanceof Map)) {
      throw new JaspeError({
        code: 'InvalidParameter',
        from: 'Contract class - register method',
        message: 'requirements must be a Map instance'
      })
    }

    this.services.set(service, requirements)
  }

  isAlreadyRegister (service) {
    return this.services.has(service)
  }

  check (service, params) {
    return new Promise((resolve, reject) => {
      if (!this.isAlreadyRegister(service)) {
        reject(new JaspeError({
          code: 'ServiceNotFound',
          from: 'Contract class - check method',
          message: `service: ${service} is not register`
        }))
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
          parallel(pipelines, (errors, data) => {
            if (errors.length !== 0) {
              reject(new ContractError({
                code: 'ContractError',
                serviceName: service,
                errors
              }))
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
