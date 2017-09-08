# Jaspe
Framework for NodeJs to design software component with contract paradigm

## Installation
```bash
$ npm install jaspe
```

## Context

* Builder of NodeJs Back-end application.
* Component paradigm: https://en.wikipedia.org/wiki/Component-based_software_engineering#Software_component
* Contract paradigm: https://en.wikipedia.org/wiki/Design_by_contract

## Philosophy

The Jaspe philosophy is to provide small, robust tooling to create NodeJs Back-end. 
It is a great solution to develop your software component. Jaspe is compatible with
Framework that provides tooling for HTTP servers like [Express](https://github.com/expressjs/express).

**_Jaspe is not an other HTTP servers_**.

Thank you to Jaspe, your own robust and reusable sofware component can be developed. 
For each component describe specific requirements to use its services. 
For example, define AccountComponent with AccountProviderService interface which proposes 'create 'and' delete 'service.


# Present software component paradigm 

The software component paradigm is a reuse-based approach to defining, implementing and composing slightly coupled independent components into systems.
Rather than using concepts as classes and methods, this paradigms adopts new concepts as service provider and  service require.
Indeed, a software component either provide a service or require others in order to accomplish its task.

It's the same approach with the class model although the first Jaspe component doesn't need a reference to the second component there is no depandence between each other !! 
So, it is very interesting to reuse this component independently to another one.
In software component paradigm, the resusable notion is really important. 


More information : https://en.wikipedia.org/wiki/Component-based_software_engineering#Software_component


## Component approach 

**_Example: I want to develop a service which proposes to create an account. When the account is created I want to notify
user by email._**

* First step : define services provides and services requires
* Second step: think about reusing the component according to the question: Do I want to always reuse component together or separatly?

### First step
Services provides: 
* Create account
* Notify user

Services requires: 
Who to need whom ? 

If I want to create an account and next to notify user, account needs to use "notifier" service !

**So account service _requires_ notifier service**

### Second step

After the first step, this model is obtained:

![alt text](https://raw.githubusercontent.com/devOups/jaspe-signup/master/img/jaspe-Account-Notifier-Component.png)

Now think about reusing, the question which has to be asked is : 

If I want to reuse Account in other project, do I really need Notifier service ?
Not necessary ! But according to this model **AccountComponent cannot be reused without NotifierComponent**.


The more judicious solution is to use a third component like this : 

![alt text](https://raw.githubusercontent.com/devOups/jaspe-signup/master/img/jaspe-AccountNotifierComponent.png)


AccountNotifierComponent provides a service named _create_. This service enables to create new account by using AccountComponent and notify user by using NotifierComponent.
In this way, you could reuse component seperatly or together through this aggregation component. 

So Jaspe helps you to create this model with NodeJs ! :) 

_Jaspe also provides features as contract paradigm, go to the next part !_

# Present contract paradigm

Contract paradigm proposes to define contract on methods or models to garanty any properties and assertions.
The [Eiffel language](https://en.wikipedia.org/wiki/Eiffel_(programming_language)) offers complete approach and tools to program with contract paradigm. 
There are three important notions
with contract paradigm. : 
1. pre-conditions
2. post-conditions
3. Invariant

More informations here : https://en.wikipedia.org/wiki/Design_by_contract

> Currently, Jaspe proposes only pre-conditions features

## Pre-conditions

In Jaspe, uses pre-conditions to garanty value of parameter when services are called. To take up the previous example with AccountComponent,
you have to define contract by describing constraints for each parameter used by the service.

'create' service needs a username, an email and the age of the user to create account. 
I would like describe pre-conditions of those parameters to guarantee their value into my 'create' service.

Tradionaly use if conditions to check value of parameter. Jaspe proposes a new concept to adopt the Contract.
This concept enables for each service to define contract by describing constraints for each parameter used by the service.
Next, any time when you call service, parameters are checked automatically. 
It's very intersting to reuse component without be careful to the if conditions. 

### Jaspe validators

#### Pipeline chain
Jaspe engine uses validator to check parameter. The back stage of this algorithm, is pipeline algorithm like Linux command line.

Linux commande line 
```bash
$ cut -d" " -f1 < access.log | sort | uniq -c | sort -rn | less
```
Jaspe validator: pipeline algorithm
```js
IsString | notNull | notEmpty
```

In this example there are three validators.
* First check if value is a string, and pass value to the next validator
* Second check if value is notNull, and pass value to the next validator
* etc...

If value doesn't valid then a validator throw an exception and the pipeline chain is broken.

#### Run validator in parallel

A second particularity of the Jaspe validator algorithm, is 'parallel' validation.
Jaspe uses native asynchone state of the NodeJs and run validator in 'parallel'. 
When Jaspe runs username pipeline validator and the email pipeline validator into asynchrone tasks.
So it checks email and username in 'the same time'.

```
check parameters for 'create' service
Start asynchrone validation. | ---- run username pipeline ------- . synchronisation point (end of validation)
			     | ---- run email pipeline ---------/
	                     | ---- run age pipeline ---------/
```
When validation is finished two states are possible.
* whitout error, and the result is an array contains value of parameters.
* with errors, and the result is an array contains errors.
So errors array could contains an error for the username and for the email.

> Some validators needs parameter to make validation. For example min validator needs min value to make comparison with value.
> Jaspe includes this options into validation algorithm, read how to define contract for a component part to watch an example.


#### How to define contract for a component

> Jaspe proposes validators and Contract class to write contract file.

To define contract for a component, create a _contract.js_ file.
Next, for each parameters descibe constraints like this : 
```js
const jaspe = require('jaspe')
const v = jaspe.validator
const Contract = jaspe.Contract

let services = new Map()

/**
 * Create service
 */
let create_requirements = new Map()
requirements.set('username', [
  {
    name: 'typeOf string',
    validator: v.typeOf,
    params: {typeOf: 'string'}
  },
  {
    name: 'notNull',
    validator: v.notNull
  },
  {
    name: 'notEmpty',
    validator: v.notEmpty
  }
])

requirements.set('email', [
  {
    name: 'typeOf string',
    validator: v.typeOf,
    params: {typeOf: 'string'}
  },
    {
    name: 'notNull',
    validator: v.notNull
  },
  {
    name: 'notEmpty',
    validator: v.notEmpty
  },
  {
    name: 'email',
    validator: v.email
  }
])

requirements.set('age', [
  {
    name: 'typeof integer',
    validator: v.isInteger
  },
  {
    name: 'notNull',
    validator: v.notNull
  },
  {
    name: 'range(0, 110)',
    validator: v.range,
    params: {min: 0, max: 110}
  }

])
services.set('create', requirements)
[...]
module.exports = new Contract('AccountContract', services)
```

For example, age parameter must be an integer and not null and must be between 0 & 110.
 
> * name: is the name of validator.
> * validator: is the function to validate value.
> * params: is parameters are injected when de validator is called.


# How to create a component with Jaspe

To create component with Jaspe, create a new directory with this pattern 'NameOfComponent'Component (ex: AccountComponent, NotifierComponent)
and two very important files :
* the first is contract file, seen previous part
* the second is the entry point file.

> For better project structure, it's recommended to create a directory named 'contract' and to put contract file inside.
> Put entry point file to the top of component directory

See example directory for more helps.

## entryPoint file

This file describe all services which provided by the component. It's a link between provider service and the
real code of the component. Each componenent has an unique entry point.

> Jaspe provides the EntryPoint class and all entries point must extends this class

For example: AccountComponent provides two services 'create' and 'delete'

```js
const jaspe = require('jaspe')
const EntryPoint = jaspe.EntryPoint
const accountService = require('./src/AccountService') // import code of the component

let accountEntryPoint = new EntryPoint()

accountEntryPoint.on('create', accountService.create)
accountEntryPoint.on('delete', accountService.delete)

module.exports = accountEntryPoint
```
In this case accountService is directly linked like callback of the 'on' method, but you can linked an other function and apply a pre-processing before call accocountservice method

## outPoint file

If your component require one or more services, it needs the out point file. 
Like a entry point file this file is unique for each component.
There is no constraint about structure of this file.

```js
const jaspe = require('jaspe')


module.exports.require = (NameOfProviderService, service, params) => {
  return jaspe.invoke(NameOfProviderService, service, params)
}
```
> For better project structure, it's recommended to create a directory named 'requires' and to put outpoint file inside.

For this example I have only export one method. It's just a wrapper of Jaspe invoke method. 
But it's can be more complex function.

> Jaspe.invoke method return a promise !

### Use outPoint file into the code of the component

When your component requires service use your out point file like this : 

```js
 outpoint.require('AccountService', 'create', {username, email, age})
  .then((account) => {
    // your code after account is created
  })
  .catch((err) => {
   // your code after a error is thrown
  })
```

> It is not recommended to use Jaspe.invoke method directly in source code of the component. Prefer use outpoint file


## Src directory

Inside this directory put the source code of the component as you want to :).

> For better project structure, it's recommended to create a directory named 'src' and to put the source code of the component inside.

# How to use component

## register file

Finally, when your component and its contract and its entry point are developed, component must be registry in the _register.js_ file.
Jaspe engine use this file to find service and invoke him during the runtime. 

```js
let register = [
  {
    serviceName: 'AccountService', 
    contract: require('./AccountComponent/contract/contract'), 
    entryPoint: require('./AccountComponent/entryPoint')
  },
  {
    serviceName: 'NotifierService',
    contract: require('./NotifierComponent/contract/contract'),
    entryPoint: require('./NotifierComponent/entryPoint')
  }, [...]

module.exports = register
```

> For better project structure, put this file on the top of appComponent directory

## main file
It's time to use your first Jaspe application ! To use it, create main.js file
and add this code :
```js
const jaspe = require('jaspe')
const register = require('./appComponent/register')

try {
  jaspe.init(register)
} catch (err) {
  console.error(err)
  process.exit(1)
}

var params = {
  username: 'jaspe',
  email: 'jaspe@jaspe.com',
  age: 24
}

jaspe.invoke('AccountService', 'create', params)
.then((account) => {
  console.log(account)
})
.catch((err) => {
  console.error(err)
})
```
* First, import Jaspe and your file register.
* Next, initialize Jaspe with the register, this step could throw an exception if the register file contains errors.
* Finally, use Jaspe to invoke your AccountService with parameters.


Run:
```bash
$ node main.js
```

# Example: with three components

Go to [jaspe-signup](https://github.com/devOups/jaspe-signup) application to consult more complex example

## License
[MIT](LICENSE)
