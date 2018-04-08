module.exports = {
  validator: require('./src/validator'),
  Contract: require('./src/core/contract'),
  EntryPoint: require('./src/core/entryPoint'),
  init: (registry) => {
    let dispatcher = require('./src/core/dispatcher')
    dispatcher.use(registry)

    module.exports.invoke = (serviceName, service, params) => {
      return dispatcher.dispatch(serviceName, service, params)
    }
  }
}