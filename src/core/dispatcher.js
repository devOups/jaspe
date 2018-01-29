/*!
 * Jaspe
 * Copyright(c) 2017 Quentin SAIEB
 * MIT Licensed
 */

'use strict'

const Contract = require('./contract')
const EntryPoint = require('./entryPoint')
const JaspeError = require('../exception/jaspeError')
const DispatcherError = require('../exception/DispatcherError')

class Dispatcher {
  constructor () {
    this.registry = new Map()
  }

  dispatch (serviceName, service, params) {
    return new Promise((resolve, reject) => {
      if (!this.isAlreadyRegister(serviceName)) {
        reject(new JaspeError({
          code: 'ServiceNotFound',
          from: 'Dispatcher class - dispatch method',
          message: `service name: ${serviceName} is not register`
        }))
      } else {
        let component = this.registry.get(serviceName)
        component.contract.check(service, params)
        .then((validParams) => component.entryPoint.invoke(service, validParams))
        .then(resolve)
        .catch((contractError) => {
          reject(
            new DispatcherError({
              componentName: serviceName,
              contractError
            })
          )
        })
      }
    })
  }

  register (serviceName, contract, entryPoint) {
    if (!serviceName) {
      throw new JaspeError({
        code: 'InvalidParameter',
        from: 'Dispatcher class - register method',
        message: 'serviceName must be not null undefined or empty string'
      })
    }

    if (this.isAlreadyRegister(serviceName)) {
      throw new JaspeError({
        code: 'InvalidParameter',
        from: 'Dispatcher class - register method',
        message: 'service with the same name already register'
      })
    }

    if (!(contract instanceof Contract)) {
      throw new JaspeError({
        code: 'InvalidParameter',
        from: 'Dispatcher class - register method',
        message: 'contract must be a Contract instance'
      })
    }

    if (!(entryPoint instanceof EntryPoint)) {
      throw new JaspeError({
        code: 'InvalidParameter',
        from: 'Dispatcher class - register method',
        message: 'entryPoint must be a EntryPoint instance'
      })
    }

    this.registry.set(serviceName, {contract, entryPoint})
  }

  isAlreadyRegister (serviceName) {
    return this.registry.has(serviceName)
  }

  use (register) {
    let length = register.length
    let index = 0

    for (; index < length; index++) {
      try {
        this.register(
          register[index].serviceName,
          register[index].contract,
          register[index].entryPoint
        )
      } catch (err) {
        throw err
      }
    }
  }
}

module.exports = new Dispatcher()
