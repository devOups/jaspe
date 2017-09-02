const EventEmitter = require('events')

class EntryPoint extends EventEmitter {
  invoke (service, params) {
    return new Promise((resolve, reject) => {
      let callback = (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      }

      this.emit.apply(this, [service, ...params, callback])
    })
  }
}

// export default EntryPoint
module.exports = EntryPoint