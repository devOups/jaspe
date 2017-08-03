/**
* Requires
*/
var annotationValidator = require('./annotationValidator');

/**
* Create an iterator
*
* @name makeIterator
* @param {Array|Object} obj - An object to iterate over.
* @return {Object} An iterator.
*/
function makeIterator (obj) {
  var okeys = Object.keys(obj);
  var i = -1;
  var len = okeys.length;
  return {
      hasNext: function () {
        return i < len - 1;
      },
      next: function () {
        var key = okeys[++i];
        return i < len ? { value: obj[key], key: key} : null;
      },
      length: function () {
        return len;
      }
  }
}

/**
* Call all validators for a value.
*
* @name isValid
* @param {Number|String|Boolean} value - The value is tested.
* @param {Iterator} itAnnotation - The annotation iterator.
* @param {Function} callback - containt err or null.
*/
var isValid = function(value, itAnnotation, callback) {
  if (itAnnotation.hasNext()) {
    annotationValidator.invokeValidator(itAnnotation.next().value, value, function (err) {
      if (err) {
        return callback(err);
      }
      isValid(value, itAnnotation, callback);
    });
  } else {
    callback(null, value);
  }
};

/**
* Check if contract is respected.
*
* @name check
* @param {Object} event - Object is tested.
* @param {Object} contract - The constraints that must be met.
* @param {Function} callback - return an error if constraints are broken.
*/
var check = function(event, contract, callback) {
  var iteratoor = makeIterator(contract);
  var result = [];
  var paramsValidated = [event.name];
  var obj = event.params;
  var counter = 0;

  while (iteratoor.hasNext()) {
    var require = iteratoor.next();
    if (!(require.value.type.name.toLowerCase() === typeof obj[require.key])) {
      return callback(
        new Error(
          require.key + ' type require is ' +
          require.value.type.name.toLowerCase() +
          ' but found ' +
          typeof obj[require.key]
        )
      );
    } else {
      var annotationValidators = makeIterator(require.value.constraints);
      isValid(obj[require.key], annotationValidators, function (err, value) {
        if (err) {
          result.push(err)
        }
        paramsValidated.push(value);

        if(iteratoor.length() === ++counter) {
          result.length === 0 ? callback(null, paramsValidated) : callback(result, null);
        }
      });
    }
  } // while end
};

var getContractEvent = function (eventName, contract, callback) {
  var contractEvent = contract[eventName];
  if (contractEvent === undefined) {
    return callback(new Error(eventName + ' is unknown'))
  }

  callback(null, contractEvent);
};

var validate = function(event, contract, callback) {
  getContractEvent(event.name, contract, function (err, eventContract) {
    if (err) {
      return callback(err, null);
    }

    check(event, eventContract, callback);
  });
};

module.exports = {
  validate: validate
};
