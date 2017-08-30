const Contract = require('../src/core/contract')
const dispatcher = require('../src/core/dispatcher');

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
    expect(thrown).toThrow('serviceName must be not null undefined or empty string')
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
    expect(thrown).toThrow('serviceName must be not null undefined or empty string')
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
    expect(thrown).toThrow('serviceName must be not null undefined or empty string')
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
    expect(thrown).toThrow('service with the same name already register')
  })
  it ("with invalid param contract", function () {
    // given
    dispatcher

    // and mock isAlreadyRegister method
    spyOn(dispatcher, 'isAlreadyRegister').and.returnValue(false)
    
    // and serviceName
    let serviceName = 'serviceName'

    // and the linked contract
    let contract = null

    // when
    let thrown = function () {
      dispatcher.register(serviceName, contract)
    }
    
    // then
    expect(thrown).toThrow('contract must be a Contract instance')
  })
  it ("with valid params", function () {
    // given
    dispatcher
    
    // and serviceName
    let serviceName = 'serviceName'

    // and the linked contract
    let contract = new Contract()

    // when
    dispatcher.register(serviceName, contract)

    // then
    expect(dispatcher.registry.size).toBe(1)
    expect(dispatcher.registry.has(serviceName)).toBe(true)
    expect(dispatcher.registry.get(serviceName)).toBe(contract)
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
      expect(err.message).toBe('service name is not register')
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
  
    // and mock isAlreadyRegister
    spyOn(dispatcher, 'isAlreadyRegister').and.returnValue(true)

    // and mock return of registry.get
    spyOn(dispatcher.registry, 'get').and.returnValue(contract)

    // when
    return new Promise((resolve, reject) => {
      dispatcher.dispatch(serviceName, service)
      .then(resolve)
    })
    .then(() => {
      // then
      expect(contract.check).toHaveBeenCalled()
      expect(contract.check.calls.count()).toEqual(1)
      expect(contract.check.calls.argsFor(0)).toEqual([service, []])
    })
  })
})