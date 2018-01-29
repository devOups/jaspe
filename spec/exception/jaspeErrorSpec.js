'use strict'

const JaspeError = require('../../src/exception/jaspeError')

describe('JaspeError class - Testing constructor', function () {
  it ('with default params', function () {
    // given a code error
    const code = 'codeError'

    // when
    let jaspeError = new JaspeError({code})

    // then
    expect(jaspeError.code).toBe(code)
    expect(jaspeError.from).toBe('')
    expect(jaspeError.message).toBe(code)
  })
  it ('with specific params', function () {
    // given
    const dataError = {
      code: 'codeError',
      from: 'unit test - it',
      message: 'unit test'
    }

    // when
    let jaspeError = new JaspeError(dataError)

    // then
    expect(jaspeError.code).toBe(dataError.code)
    expect(jaspeError.from).toBe(dataError.from)
    expect(jaspeError.message).toBe(dataError.message)
  })
})

describe('JaspeError class - Testing longMessage getter', function () {
  it('with empty from and message', function () {
    // given a code error
    const codeError = 'codeError'
  
    // when
    let jaspeError = new JaspeError({code: codeError})

    // then
    expect(jaspeError.longMessage()).toBe(codeError)
  })
  it ('with specific params', function () {
    // given
    const dataError = {
      code: 'codeError',
      from: 'unit test - it',
      message: 'unit test'
    }

    // when
    let jaspeError = new JaspeError(dataError)

    // then
    expect(jaspeError.longMessage()).toBe(`${dataError.message} from: ${dataError.from}`)
  })
})
