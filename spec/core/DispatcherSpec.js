'use strict'

const Contract = require('../../src/core/contract')
const dispatcher = require('../../src/core/dispatcher')
const EntryPoint = require('../../src/core/entryPoint')

describe("Dispatcher class - Testing constructor", function () {
  it ("with default valid params", function () {
    // given
    dispatcher

    // then
    expect(dispatcher.registry).toEqual(new Map())
  })
})

describe('Dispatcher class - Testing register method', function () {
  it ("with null service name", function () {
    // given
    dispatcher
    
    // and serviceName
    let serviceName = null

    // and the linked contract
    let contract = new Contract()

    // when
    let thrown = function () {
      dispatcher.register(serviceName, contract)
    }
    
    // then
    expect(thrown).toThrowError('serviceName must be not null undefined or empty string')
  })
  it ("with undefined service name", function () {
    // given
    dispatcher
    
    // and serviceName
    let serviceName = undefined

    // and the linked contract
    let contract = new Contract()

    // when
    let thrown = function () {
      dispatcher.register(serviceName, contract)
    }
    
    // then
    expect(thrown).toThrowError('serviceName must be not null undefined or empty string')
  })
  it ("with empty service name", function () {
    // given
    dispatcher
    
    // and serviceName
    let serviceName = ''

    // and the linked contract
    let contract = new Contract()

    // when
    let thrown = function () {
      dispatcher.register(serviceName, contract)
    }
    
    // then
    expect(thrown).toThrowError('serviceName must be not null undefined or empty string')
  })
  it ("with service name already register", function () {
    // given
    dispatcher

    // and mock isAlreadyRegister method
    spyOn(dispatcher, 'isAlreadyRegister').and.returnValue(true)
    
    // and serviceName
    let serviceName = 'AlreadyService'

    // and the linked contract
    let contract = new Contract()

    // when
    let thrown = function () {
      dispatcher.register(serviceName, contract)
    }
    
    // then
    expect(thrown).toThrowError('service with the same name already register')
  })
  it ("with invalid param contract", function () {
    // given
    dispatcher

    // and mock isAlreadyRegister method
    spyOn(dispatcher, 'isAlreadyRegister').and.returnValue(false)
    
    // and serviceName
    let serviceName = 'serviceName'

    // and an invalid linked contract
    let contract = null

    // when
    let thrown = function () {
      dispatcher.register(serviceName, contract)
    }
    
    // then
    expect(thrown).toThrowError('contract must be a Contract instance')
  })
  it ("with invalid param entryPoint", function () {
    // given
    dispatcher

    // and mock isAlreadyRegister method
    spyOn(dispatcher, 'isAlreadyRegister').and.returnValue(false)
    
    // and serviceName
    let serviceName = 'serviceName'

    // and the linked contract
    let contract = new Contract()

    // and an invalid entryPoint
    let entryPoint = null

    // when
    let thrown = function () {
      dispatcher.register(serviceName, contract, entryPoint)
    }
    
    // then
    expect(thrown).toThrowError('entryPoint must be a EntryPoint instance')
  })
  it ("with valid params", function () {
    // given
    dispatcher
    
    // and serviceName
    let serviceName = 'serviceName'

    // and the linked contract
    let contract = new Contract()

    // and mock isAlreadyRegister method
    spyOn(dispatcher, 'isAlreadyRegister').and.returnValue(false)

    // and an entryPoint
    let entryPoint = new EntryPoint()

    // when
    dispatcher.register(serviceName, contract, entryPoint)

    // then
    expect(dispatcher.registry.size).toBe(1)
    expect(dispatcher.registry.has(serviceName)).toBe(true)
    expect(dispatcher.registry.get(serviceName)).toEqual({contract, entryPoint})
  })
})

describe('Dispatcher class - Testing isAlreadyRegister method', function () {
  beforeEach(function () {
    dispatcher.registry.clear()
  })

  it ('with service name already register', function () {
    // given
    dispatcher
    
    // and service name
    let serviceName = 'serviceName'

    // and a linked contract
    let contract = new Contract()

    // and add tuple servicename => contract
    dispatcher.registry.set(serviceName, contract)

    // when 
    let isAlreadyRegister = dispatcher.isAlreadyRegister(serviceName)

    // then
    expect(isAlreadyRegister).toBe(true)
  })
  it ("with service name doesn't register", function () {
    // given
    dispatcher

    // and service name
    let serviceName = 'serviceName'

    // and a linked contract
    let contract = new Contract()

    // when 
    let isAlreadyRegister = dispatcher.isAlreadyRegister(serviceName)

    // then
    expect(isAlreadyRegister).toBe(false)
  })
})

describe('Dispatcher class - Testing dispatch method', function () {
  it ('without the service name in register', function () {
    // given
    dispatcher

    // and service name
    let serviceName = 'serviceName'

    // and service
    let service = 'create'

     // and mock isAlreadyRegister
    spyOn(dispatcher, 'isAlreadyRegister').and.returnValue(false)

    // when
    return new Promise((resolve, reject) => {
      dispatcher.dispatch(serviceName, service)
      .catch(reject)
    })
    .catch(function (err) {
      expect(err.message).toBe('service name: ' + serviceName + ' is not register')
    })
  })
  it ('with the service name in register', function () {
    // given
    dispatcher

    // and service name
    let serviceName = 'serviceName'

    // and service
    let service = 'create'
    
    // and create contract
    // and mock check method
    let contract = new Contract()
    spyOn(contract, 'check').and.callFake(function () {
      let p = new Promise((resolve, reject) => {
         resolve()
      })
     
      return p
    })

    // and create entryPoint
    // and mock invoke method
    let entryPoint = new EntryPoint()
    spyOn(entryPoint, 'invoke').and.callFake(function () {
      let p = new Promise((resolve, reject) => {
        resolve()
      })

      return p
    })
  
    // and mock isAlreadyRegister
    spyOn(dispatcher, 'isAlreadyRegister').and.returnValue(true)

    // and mock return of registry.get
    spyOn(dispatcher.registry, 'get').and.returnValue({contract, entryPoint})

    // when
    return new Promise((resolve, reject) => {
      dispatcher.dispatch(serviceName, service)
      .then(resolve)
    })
    .then(() => {
      // then
      expect(contract.check).toHaveBeenCalled()
      expect(contract.check.calls.count()).toEqual(1)
      expect(contract.check.calls.argsFor(0)).toEqual([service, undefined])
      
      // and
      expect(entryPoint.invoke).toHaveBeenCalled()
      expect(entryPoint.invoke.calls.count()).toEqual(1)
      expect(entryPoint.invoke.calls.argsFor(0)).toEqual([service, undefined])
    })
  })
})

describe('Dispatcher class - Testing use method', function () {
  it('with invalid serviceName in register', function (done) {
    // given
    dispatcher

    // and
    let register = [{
      serviceName: '',
      contract: null,
      entryPoint: null
    }]

    // when
    let callbackError = function () {
      dispatcher.use(register)
    }

    // then
    expect(callbackError).toThrowError('serviceName must be not null undefined or empty string')
    done()
  })
  it('with invalid contract in register', function (done) {
    // given
    dispatcher

    // and
    let register = [{
      serviceName: 'jaspeTest',
      contract: null,
      entryPoint: null
    }]

    // when
    let callbackError = function () {
      dispatcher.use(register)
    }

    // then
    expect(callbackError).toThrowError('contract must be a Contract instance')
    done()
  })
  it('with invalid entrypoint in register', function (done) {
    // given
    dispatcher

    // and
    let register = [{
      serviceName: 'jaspeTest',
      contract: new Contract(),
      entryPoint: null
    }]

    // when
    let callbackError = function () {
      dispatcher.use(register)
    }

    // then
    expect(callbackError).toThrowError('entryPoint must be a EntryPoint instance')
    done()
  })
  it('with valid register', function () {
    // given
    dispatcher

    // and contract
    let contract = new Contract()

    // and entryPoint
    let entrypoint = new EntryPoint()
    // and
    let register = [{
      serviceName: 'jaspeTest',
      contract: contract,
      entryPoint: entrypoint
    }]

    // when
    dispatcher.use(register)

    // then
    expect(dispatcher.registry.size).toBe(1)
    expect(dispatcher.registry.has('jaspeTest')).toBe(true)
    expect(dispatcher.registry.get('jaspeTest').contract).toBe(contract)
    expect(dispatcher.registry.get('jaspeTest').entryPoint).toBe(entrypoint)
  })
})
