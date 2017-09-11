const Account = require('./Account')

class AccountService {
  create (name, email, age, callback) {
    let account = new Account(name, email, age)
    callback(null, account)
  }

  delete (accountId, callback) {
    console.log('delete account: ' + accountId)
    callback(null, true)
  }
}

// export default new AccountService()
module.exports = new AccountService()