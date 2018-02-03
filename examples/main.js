const dispatcher = require('../src/core/dispatcher')
const register = require('./register')

// add register to dispatcher
try {
  dispatcher.use(register)
} catch (err) {
  console.log(err)

  process.exit()
}

let params = {
  username: 'quentin',
  email: 'pitoux16+jaspe@gmail.com',
  age: 25
}

dispatcher.dispatch('AccountService', 'create', params)
.then(function (account) {
  console.log(account)
})
.catch(function (err) {
  console.log(err.contractError.toString())
})

dispatcher.dispatch('AccountService', 'delete', {accountId: '45'})
.then(function (result) {
  console.log(result)
})
.catch(function (err) {
  console.log(err)
})
