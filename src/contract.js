const Pipeline = require('./pipeline')
const v = require('./validator')
const parallel = require('./parallel')

let username = new Pipeline('AccountContract > CREATE service > username')
username.add('typeOf string', v.typeOf, {typeOf: 'string'})
username.add('notNull', v.notNull)
username.add('notEmpty', v.notEmpty)

let email = new Pipeline('AccountContract > CREATE service > email')
email.add('typeOf string', v.typeOf, {typeOf: 'string'})
email.add('notNull', v.notNull)
email.add('notEmpty', v.notEmpty)
email.add('email', v.email)

let age = new Pipeline('AccountContract > CREATE service > age')
age.add('typeOf integer', v.isInteger)
age.add('notNull', v.notNull)
age.add('range(0, 110)', v.range, {min: 0, max: 110})

parallel([
  function(callback) {
    username.run(
      'quentin',
      callback
    )
  },
  function(callback) {
    email.run(
      'quentinsaieb@hotmail.fr',
      callback
    )
  },
  function(callback) {
    age.run(
      24,
      callback
    )
  }
], function (err, result) {
  if (err.length !== 0) {
    console.log(err)
  } else {
    console.log(result)
    console.log('contract is ok !')
  }
})


// module.exports = {
//   create: [
//     username,
//     email,
//     age
//   ]
// }
