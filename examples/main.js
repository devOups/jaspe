const dispatcher = require('../src/core/dispatcher')
const contract = require('./contract')

var startTime = new Date().getTime();
var elapsedTime = 0;

dispatcher.register('AccountService', contract)

params = {
  username: 'quentin',
  email: 'quentinsaieb@hotmail.fr',
  age: 24
}

dispatcher.dispatch('AccountService', 'create', params)
.then(function (data) {
  console.log('contract is ok')
  console.log(data)
})
.catch(function (err) {
  console.log(err)
})
