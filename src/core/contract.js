class Contract {
  constructor (name, services) {
    this.name = '' || name
    this.services = [] || services
  }

  addService (service) {
    this.services.push(service)
  }

  check (service, params) {
    return new Promise((resolve, reject) => {
      
    })
  }
}

module.exports = Contract