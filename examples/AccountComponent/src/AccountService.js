const Account = require('./Account')

class AccountService {
  create ({username, email, age}, callback) {
    let account = new Account(username, email, age)
    callback(null, account)
  }

  delete ({accountId}, callback) {
    console.log('delete account: ' + accountId)
    callback(null, true)
  }
}

module.exports = new AccountService()
