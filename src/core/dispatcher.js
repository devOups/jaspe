const Contract = require('./contract')

class Dispatcher {
  constructor () {
	this.registry = new Map()
	}

	dispatch (serviceName, service, params) {
		return new Promise((resolve, reject) => {
			if (!this.isAlreadyRegister(serviceName)) {
				reject(new Error('service name is not register'))
			} else {
				let contract = this.registry.get(serviceName)
				contract.check(service, params)
				.then(resolve)
				.catch(reject)
			}
		})
	}

	register (serviceName, contract) {
		if (!serviceName) {            
			throw 'serviceName must be not null undefined or empty string'
		}

		if (this.isAlreadyRegister(serviceName)) {
			throw 'service with the same name already register'
		}

		if (!(contract instanceof Contract)) {
			throw 'contract must be a Contract instance'
		}

		this.registry.set(serviceName, contract)
	}

	isAlreadyRegister (serviceName) {
		return this.registry.has(serviceName)
	}
}

module.exports = new Dispatcher()