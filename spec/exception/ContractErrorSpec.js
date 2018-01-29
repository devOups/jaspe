'use strict'

const ContractError = require('../../src/exception/ContractError')

describe('ContractError class - Testing constructor', function () {
  it ('with default params', function () {
    // given a code error
    const code = 'codeError'

    // when
    let contractError = new ContractError({code})

    // then
    expect(contractError.code).toBe(code)
    expect(contractError.serviceName).toBe(undefined)
    expect(contractError.errors).toEqual([])
    expect(contractError.message).toBe(
      `Invoke ${this.contractError} service provides by a component with invalid parameters`
    )
  })
  it ('with specific params', function () {
    // given
    const dataError = {
      code: 'codeError',
      serviceName: 'service name',
      errors: ['one error']
    }

    // when
    let contractError = new ContractError(dataError)

    // then
    expect(contractError.code).toBe(dataError.code)
    expect(contractError.serviceName).toBe(dataError.serviceName)
    expect(contractError.errors.length).toBe(1)
    expect(contractError.errors).toEqual(['one error'])
    expect(contractError.message).toBe(
      `Invoke ${dataError.serviceName} service provides by a component with invalid parameters`
    )
  })
})

describe('ContractError class - Testing toString', function () {
  it('with empty serviceName and empty errors', function () {
    // given a code error
    const codeError = 'codeError'
  
    // when
    let contractError = new ContractError({code: codeError})

    // then
    expect(contractError.toString()).toBe(
      `${codeError}: Invoke undefined service provides by a component with invalid parameters: `
    )
  })
  it ('with specific params', function () {
    // given
    const dataError = {
      code: 'codeError',
      componentName: 'testComponent',
      serviceName: 'testService',
      message: 'unit test',
      errors: ['first error', 'second error']
    }

    // when
    let contractError = new ContractError(dataError)

    // then
    expect(contractError.toString()).toBe(
      `${dataError.code}: Invoke ${dataError.serviceName} service provides by a component with invalid parameters: first error - second error`
    )
  })
})
