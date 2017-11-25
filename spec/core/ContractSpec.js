'use strict'

const JaspeError = require('../../src/exception/jaspeError.js')
const Contract = require('../../src/core/contract')
const v = require('../../src/validator')

describe('Contract class - Testing constructor', function () {
  it ('with default param', function () {
    // given
    let contract = new Contract()

    // then
    expect(contract.name).toBe('')
    expect(contract.services).toEqual(new Map())
  })
})

describe('Contract class - Testing isAlreadyRegister method', function () {
  it ("with service doesn't register", function () {
    // given
    let contract = new Contract()

    // when
    let isExists = contract.isAlreadyRegister('service')

    // then
    expect(isExists).toBe(false)
  })
  it ("with register service", function () {
    // given
    let service = 'service'

    // and create services map
    let services = new Map()
    services.set('service', {})

    // and create contract
    let contract = new Contract(
      'TestContract',
      services
    )

    // when
    let isExists = contract.isAlreadyRegister(service)

    // then
    expect(isExists).toBe(true)
  })
})

describe('Contract class - Testing register method', function () {
  it('with service already register', function () {
    // given
    let contract = new Contract()

    // and a service
    let service = null

    // and mock isAlreadyRegister
    spyOn(contract, 'isAlreadyRegister').and.returnValue(true)

    // when
    let thrown = function () {
      contract.register(service)
    }

    // then
    expect(thrown).toThrowError(JaspeError, 'service must be not null undefined or empty string')    
  })
  it('with service already register', function () {
     // given
    let contract = new Contract()

    // and a service
    let service = 'test'

    // and mock isAlreadyRegister
    spyOn(contract, 'isAlreadyRegister').and.returnValue(true)

    // when
    let thrown = function () {
      contract.register(service)
    }

    // then
    expect(thrown).toThrowError(JaspeError, `service: ${service} already register`)
  })
  it ('with requirements of the service is not map instance', function () {
    // given
    let contract = new Contract()

    // and mock isAlreadyRegister
    spyOn(contract, 'isAlreadyRegister').and.returnValue(false)

    // when
    let thrown = function () {
      contract.register('service', [])
    }

    // then
    expect(thrown).toThrowError(JaspeError, 'requirements must be a Map instance')
  })
  it ('with valid params', function () {
    // given
    let contract = new Contract()

    // and mock isAlreadyRegister
    spyOn(contract, 'isAlreadyRegister').and.returnValue(false)

    // and a service
    let service = 'test'

    // and requirements
    let requirements = new Map()

    // when
    contract.register(service, requirements)

    // then
    expect(contract.services.size).toBe(1)
    expect(contract.services.has(service)).toBe(true)
    expect(contract.services.get(service)).toBe(requirements)
  })
})

describe('Contract class - Testing check method', function () {
  it ('without the service is register', function () {
    // given
    let contract = new Contract()

    // and service name
    let service = 'create'

    // and mock isAlreadyRegister
    spyOn(contract, 'isAlreadyRegister').and.returnValue(false)

    // when
    return new Promise((resolve, reject) => {
      contract.check(service)
      .catch(reject)
    })
    .catch(function (err) {
      expect(err.message).toBe('service: ' + service + ' is not register')
      expect(err.from).toBe('Contract class - check method')
    })
  })
  it('with valid param', function () {
    // given
    let contract = new Contract()

    // and service name
    let service = 'create'

    // and requirements
    let requirements = new Map()
    requirements.set('username', [
      {
        name: 'typeOf string',
        validator: v.typeOf,
        params: {typeOf: 'string'}
      },
      {
        name: 'notNull',
        validator: v.notNull
      },
      {
        name: 'notEmpty',
        validator: v.notEmpty
      }
    ])
    requirements.set('email', [
      {
        name: 'typeOf string',
        validator: v.typeOf,
        params: {typeOf: 'string'}
      },
      {
        name: 'notNull',
        validator: v.notNull
      },
      {
        name: 'notEmpty',
        validator: v.notEmpty
      },
      {
        name: 'email',
        validator: v.email
      }
    ])

    // and mock isAlreadyRegister
    spyOn(contract, 'isAlreadyRegister').and.returnValue(true)

    // and get method
    spyOn(contract.services, 'get').and.returnValue(requirements)

    // and parameters
    let username = 'jaspe'
    let email = 'jaspe@jaspe.fr'

    // when
    return new Promise((resolve, reject) => {
      contract.check(service, {username, email})
      .then(resolve)
    })
    .then(function (result) {
      // then
      expect(result.length).toBe(2)
      expect(result).toEqual([username, email])
    })
  })
  it('with valid invalid params', function () {
    // given
    let contract = new Contract()

    // and service name
    let service = 'create'

    // and requirements
    let requirements = new Map()
    requirements.set('username', [
      {
        name: 'typeOf string',
        validator: v.typeOf,
        params: {typeOf: 'string'}
      },
      {
        name: 'notNull',
        validator: v.notNull
      },
      {
        name: 'notEmpty',
        validator: v.notEmpty
      }
    ])
    requirements.set('email', [
      {
        name: 'typeOf string',
        validator: v.typeOf,
        params: {typeOf: 'string'}
      },
      {
        name: 'notNull',
        validator: v.notNull
      },
      {
        name: 'notEmpty',
        validator: v.notEmpty
      },
      {
        name: 'email',
        validator: v.email
      }
    ])

    // and mock isAlreadyRegister
    spyOn(contract, 'isAlreadyRegister').and.returnValue(true)

    // and get method
    spyOn(contract.services, 'get').and.returnValue(requirements)

    // and parameters
    let username = ''
    let email = 'jaspejaspe.fr'

    // when
    return new Promise((resolve, reject) => {
      contract.check(service, {username, email})
      .catch(reject)
    })
    .catch(function (err) {
      // then
      expect(err.length).toBe(2)
      expect(err[0].message).toEqual('username : value have to be not empty')
      expect(err[1].message).toEqual('email : value have to match with pattern')
    })
  })
})