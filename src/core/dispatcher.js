const Contract = require('./contract')
const EntryPoint = require('./entryPoint')

class Dispatcher {
  constructor () {
		this.registry = new Map()
	}

	dispatch (serviceName, service, params) {
		return new Promise((resolve, reject) => {
			if (!this.isAlreadyRegister(serviceName)) {
				reject(new Error('service name: ' + serviceName + ' is not register'))
			} else {
				let component = this.registry.get(serviceName)
				component.contract.check(service, params)
				.then((validParams) => {
					component.entryPoint.invoke(service, validParams)
					.then(resolve).catch(reject)
				})
				.catch(reject)
			}
		})
	}
	
	register (serviceName, contract, entryPoint) {
		if (!serviceName) {            
			throw 'serviceName must be not null undefined or empty string'
		}

		if (this.isAlreadyRegister(serviceName)) {
			throw 'service with the same name already register'
		}

		if (!(contract instanceof Contract)) {
			throw 'contract must be a Contract instance'
		}

		if (!(entryPoint instanceof EntryPoint)) {
			throw 'entryPoint must be a EntryPoint instance'
		}

		this.registry.set(serviceName, {contract, entryPoint})
	}

	isAlreadyRegister (serviceName) {
		return this.registry.has(serviceName)
	}
}

module.exports = new Dispatcher()