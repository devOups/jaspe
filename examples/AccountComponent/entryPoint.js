const EntryPoint = require('../../src/core/entryPoint')
const accountService = require('./src/AccountService')

let accountEntryPoint = new EntryPoint()

accountEntryPoint.on('create', accountService.create)
accountEntryPoint.on('delete', accountService.delete)

// export default accountEntryPoint
module.exports = accountEntryPoint
