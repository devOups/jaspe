const v = require('../../../src/validator')
const Contract = require('../../../src/core/contract')

let services = new Map()

/**
 * Create service
 */
let create_requirements = new Map()
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

requirements.set('age', [
  {
    name: 'typeof integer',
    validator: v.isInteger
  },
  {
    name: 'notNull',
    validator: v.notNull
  },
  {
    name: 'range(0, 110)',
    validator: v.range,
    params: {min: 0, max: 110}
  }

])
services.set('create', requirements)

/**
 * Delete service
 */
let delete_requirements = new Map()
delete_requirements.set('accountId', [
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
    validator: v.notEmpty,
  }
])
services.set('delete', delete_requirements)


module.exports = new Contract('AccountContract', services)
