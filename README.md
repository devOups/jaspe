# Jaspe
Framework for NodeJs to design software component with contract paradigm

## Installation
```bash
$ npm install jaspe
```

## Context

* Builder of NodeJs Back-end application.
* Component paradigm : https://en.wikipedia.org/wiki/Component-based_software_engineering#Software_component
* Contract paradigm (currently only precondition) : https://en.wikipedia.org/wiki/Design_by_contract

## Philosophy

The Jaspe philosophy is to provide small, robust tooling to create NodeJs Back-end. 
It a great solution to develop your software component. Jaspe is compatible with
Framework that provides tooling for HTTP servers like [Express](https://github.com/expressjs/express).

**_Jaspe is not an other HTTP servers_**.

With Jaspe develop your robust and reuse sofware component.For each software component provides his contract
that specifie requirement to use these services. For example you define AccountComponent with 'create' and 'delete' services.

## Example: AccountComponent
#### Contract part
##### Json format
This json file describe contract to use AccountComponent. 
For each parameter of the service you define all constraints, for example :
```json
{
  "component": "Account",
	"name": "AccountContract",
	"services": [{
    "name": "CREATE",
		"requirements": [{
			"username": {
				"typeOf": "String",
				"constraints": ["@notNull", "@notEmpty"]
			},
			"email": {
				"typeOf": "String",
				"constraints": ["@notNull", "@notEmpty", "@email"]
			},
			"age": {
				"typeOf": "Number",
				"constraints": ["@notNull", "@range(0, 110)"]
			}
		}]
	}, {
		"name": "DELETE",
		"requirements": [{
			"accountId": {
				"typeOf": "String",
				"constraints": ["@notNull", "@notEmpty", "@objectId"]
			}
		}]
	}]
}
```
* _'username'_ must be a not null and not empty string
* _'email'_ must be a not null and not empty string and be match with pattern email
* _'age'_ must be an integer and must be in 0 < age < 110 range

Next, when you invoke 'create' service of AccountComponenent parameters are automatically check. 

**_=> If there are errors during the check, the service is not invoked !_** 

##### JavaScript format

Currently, Jaspe not provides features to parse Json contract file to JavaScript contract file.
So you don't have to define Json contract but is recommended to use parsing features in the next
Jaspe release. **JavaScript contract is inevitable !**
                          
```
 See example/AccountComponent/contract/contract.js
```

### Component part

To define component two files are very important : contract file and the entryPoint file

#### entryPoint file

 This file expose all services that provide by the component (in this example AccountComponent).
 When Jaspe invoke component service,he used entryPoint. So each componenent has an unique
 entry point. 
 
 > The EntryPoint class of Jaspe Framework extends EventEmitter.
```js
const EntryPoint = require('../../src/core/entryPoint')
const accountService = require('./src/AccountService')

let accountEntryPoint = new EntryPoint()

accountEntryPoint.on('create', accountService.create)
accountEntryPoint.on('delete', accountService.delete)

module.exports = accountEntryPoint

```
In this case accountService is directly linked like callback of the _'on'_ method, but you can linked an other 
and apply a pre-processing before call accocountservice method

### Register part

Finally, register your component and her contract and entryPoint in the register. This register is used to 
find service and invoke him during the runtime. 
Create register.js
```js
let register = [{
  serviceName: 'AccountService', 
  contract: require('./AccountComponent/contract/contract'), 
  entryPoint: require('./AccountComponent/entryPoint')
}]

module.exports = register
```

### Main part

Now, the contract and component are develop and you have register them in register file, 
you can use them into main.js file
```js
const dispatcher = require('../src/core/dispatcher')
const register = require('./register')

// add register to dispatcher
try {
  dispatcher.use(register)
} catch (err) {
  console.log(err)
  
  return
}

let params = {
  username: 'jaspe-username',
  email: 'jaspe@hotmail.fr',
  age: 24
}

dispatcher.dispatch('AccountService', 'create', params)
.then(function (account) {
  console.log(account)
})
.catch(function (err) {
  console.log(err)
})
```

## Example: with Express app
In your main file of your Express application, import Jaspe dispatcher and your register.
Use Jaspe directly into route handler, body parameters not need a pre-validation (expect a specific case)
because contraints define into component contract are apply before invoke service. Thank you Jaspe :) !

```js
const express = require('express')
const bodyParser = require('body-parser');
const dispatcher = require('../src/core/dispatcher')
const register = require('./register')
let app = express()


// add register to dispatcher
try {
  dispatcher.use(register)
} catch (err) {
  console.log(err)
  
  return
}

app.post('/signin', function (req, res) {
  dispatcher.dispatch('AccountService', 'create', {req.body.username, req.body.email, req.body.age})
  .then(function (account) {
   res.json(account)
  })
  .catch(function (err) {
    res.json({err: err})
  })  
})

app.listen(3000)
```
**/!\ In catch method err is an array, because Jaspe validate parameters in parallel, so this array perhaps contains 
an error for the username and an other for email parameter.** 


This example showing the real interest of the Jaspe Framework. Because with Jaspe you can reuse your component in an ohter
Express application or other kind of application. Here, there are no dependances between Express app and your Jaspe component.

## Example: with three components

## License
[MIT](LICENSE)
