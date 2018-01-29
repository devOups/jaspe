class DispatcherError extends Error {
  constructor ({code, componentName, contractError= {}}) {
    super(`Impossible to invoke ${contractError.serviceName} of the ${componentName}, because contract is not respected`)
    this.code = 'DispatcherError'
    this.componentName = componentName
    this.contractError = contractError
  }

  toString () {
    return `${this.code}: ${this.message} - ${this.contractError.toString()}`
  }
}

module.exports = DispatcherError
