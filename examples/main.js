const dispatcher = require('../src/core/dispatcher')
const accountContract = require('./AccountComponent/contract/contract')
const accountEntryPoint = require('./AccountComponent/entryPoint')

dispatcher.register('AccountService', accountContract, accountEntryPoint)

var t0 = new Date().getTime()
params = {
  username: 'quentin',
  email: 'quentinsaieb@hotmail.fr',
  age: 24
}

dispatcher.dispatch('AccountService', 'create', params)
.then(function (account) {
  console.log(account)
})
.catch(function (err) {
  console.log(err)
})

// dispatcher.dispatch('AccountService', 'create', params)
// .then(function (account) {
//   var t1 = new Date().getTime()
//   console.log(account)
//   console.log("Finished in " + (t1 - t0) + " milliseconds.")
// })
// .catch(function (err) {
//   console.log(err)
// })
