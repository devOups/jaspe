const dispatcher = require('../src/core/dispatcher')
const accountContract = require('./AccountComponent/contract')
import entryPoint from './AccountComponent/entryPoint'

dispatcher.register('AccountService', accountContract, entryPoint)