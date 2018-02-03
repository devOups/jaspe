'use strict'

const EntryPoint = require('../../src/core/entryPoint')

describe('Entrypoint class - Testing invoke method', function () {
  it('with valid params', function () {
    // given
    let entryPoint = new EntryPoint()

    // and mock emit method
    spyOn(entryPoint, 'emit').and.callFake((s, {username, email}, cb) => {
      cb(null)
    })

    // and service
    let service = 'create'

    // and params
    let params = {username: 'username', email: 'email@email.fr'}

    // when
    return new Promise((resolve, reject) => {
      entryPoint.invoke(service, params).then(resolve)
    }).then(() => {
      // then
      expect(entryPoint.emit).toHaveBeenCalled()
      expect(entryPoint.emit.calls.count()).toEqual(1)
      expect(entryPoint.emit.calls.argsFor(0))
        .toEqual([service, params, jasmine.any(Function)])
    })
  })
  it('with error', function () {
    // given
    let entryPoint = new EntryPoint()

    // and mock emit method
    spyOn(entryPoint, 'emit').and.callFake((s, {username, email}, cb) => {
      cb(new Error('return fake error'))
    })

    // and service
    let service = 'create'

    // and params
    let params = {username: 'username', email: 'email@email.fr'}

    // when
    return new Promise((resolve, reject) => {
      entryPoint.invoke(service, params).catch(reject)
    }).catch((err) => {
      // then
      expect(err.message).toBe('return fake error')
    })
  })
})
