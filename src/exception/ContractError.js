/*!
 * Jaspe
 * Copyright(c) 2018 Quentin SAIEB
 * MIT Licensed
 */

'use strict'

class ContractError extends Error {
  constructor ({code, serviceName, errors}) {
    super(`Invoke ${serviceName} service provides by a component with invalid parameters`)
    this.code = code
    this.serviceName = serviceName
    this.errors = errors || []
  }

  toString () {
    return `${this.code}: ${this.message}: ${this.errors.join(' - ')}`
  }
}

module.exports = ContractError
