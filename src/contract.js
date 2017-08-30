const Pipeline = require('./pipeline')
const v = require('./validator')
const parallel = require('./parallel')
const Contract = require('./core/contract')

let requirements = new Map()

let username = new Pipeline('AccountContract > CREATE service > username')
username.add('typeOf string', v.typeOf, {typeOf: 'string'})
username.add('notNull', v.notNull)
username.add('notEmpty', v.notEmpty)
requirements.set('username', username)

let email = new Pipeline('AccountContract > CREATE service > email')
email.add('typeOf string', v.typeOf, {typeOf: 'string'})
email.add('notNull', v.notNull)
email.add('notEmpty', v.notEmpty)
email.add('email', v.email)
requirements.set('email', email)

let age = new Pipeline('AccountContract > CREATE service > age')
age.add('typeOf integer', v.isInteger)
age.add('notNull', v.notNull)
age.add('range(0, 110)', v.range, {min: 0, max: 110})
requirements.set('age', age)


module.exports = new Contract( 
  'AccountContract',
  {
    'create': requirements
  }
)

