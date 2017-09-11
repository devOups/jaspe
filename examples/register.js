let register = [
  {
    serviceName: 'AccountService', 
    contract: require('./AccountComponent/contract/contract'), 
    entryPoint: require('./AccountComponent/entryPoint')  
  }
]

module.exports = register