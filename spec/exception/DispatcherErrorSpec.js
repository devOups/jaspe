'use strict'

const DispatcherError = require('../../src/exception/DispatcherError')


describe('DispatcherError class - Testing constructor', function () {
  it ('with default params', function () {
    // given a code error
    const code = 'DispatcherError'

    // and componentName
    const componentName = undefined;

    // and contractError
    const contractError = {}

    // when
    let dispatcherError = new DispatcherError({code})

    // then
    expect(dispatcherError.code).toBe(code)
    expect(dispatcherError.componentName).toBe(undefined)
    expect(dispatcherError.contractError).toEqual(contractError)
    expect(dispatcherError.message).toBe(
      'Impossible to invoke undefined of the undefined, because contract is not respected'
    )
  })
  it ('with specific params', function () {
    // given
    const dataError = {
      code: 'DispatcherError',
      componentName: 'componentName',
      contractError: {serviceName: 'serviceName'},
    }

    // when
    let dispatcherError = new DispatcherError(dataError)

    // then
    expect(dispatcherError.code).toBe(dataError.code)
    expect(dispatcherError.componentName).toBe(dataError.componentName)
    expect(dispatcherError.contractError).toEqual(dataError.contractError)
    expect(dispatcherError.message).toBe(
      'Impossible to invoke serviceName of the componentName, because contract is not respected'
    )
  })
})
