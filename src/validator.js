let typeOf = function (value, typeRef, callback) {
  typeof value === typeRef // eslint-disable-line
    ? callback(null, value)
    : callback(new Error('value have to be a ' + typeRef))
}
let isArray = function (value, callback) {
  Array.isArray(value)
    ? callback(null, value)
    : callback(new Error('value have to be an array'))
}
let isInteger = function (value, callback) {
  Number.isInteger(value)
    ? callback(null, value)
    : callback(new Error('value have to be an integer'))
}
let notNull = function (value, callback) {
  value !== undefined && value !== null && !Number.isNaN(value)
    ? callback(null, value)
    : callback(new Error('value have to be not null'))
}
let isNull = function (value, callback) {
  value !== null
    ? callback(null, value)
    : callback(new Error('value have to be null'))
}
let notEmpty = function (value, callback) {
  !!value && (value.length !== 0)
    ? callback(null, value)
    : callback(new Error('value have to be not empty'))
}
let min = function (value, min, callback) {
  value >= min
    ? callback(null, value)
    : callback(new Error('value have to be >= ' + min))
}
let max = function (value, max, callback) {
  value <= max
    ? callback(null, value)
    : callback(new Error('value have to be <= ' + max))
}
let range = function (value, min, max, callback) {
  (value >= min) && (value <= max)
    ? callback(null, value)
    : callback(new Error('value have to be >= ' + min + ' and >= ' + max))
}
let pattern = function (value, regexObj, callback) {
  regexObj.test(value)
    ? callback(null, value)
    : callback(new Error('value have to match with pattern'))
}
let email = function (value, callback) {
  var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  pattern(value, regex, callback)
}
let objectId = function (value, callback) {
  var regex = /^[a-f\d]{24}$/i
  pattern(value, regex, callback)
}

module.exports = {
  typeOf: typeOf,
  isInteger: isInteger,
  isArray: isArray,
  notNull: notNull,
  notEmpty: notEmpty,
  isNull: isNull,
  min: min,
  max: max,
  range: range,
  pattern: pattern,
  email: email,
  objectId: objectId
}
