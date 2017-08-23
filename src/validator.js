var notNull = function (value, callback) {
  value !== undefined && value !== null && !Number.isNaN(value)
  ? callback(null, value)
  : callback(new Error('value have to be not null'))
};
var isNull = function (value, callback) {
  value !== null
  ? callback(null, value)
  : callback(new Error('value have to be null'))
};
var notEmpty = function (value, callback) {
  !!value && (0 !== value.length)
  ? callback(null, value)
  : callback(new Error('value have to be not empty'));
};
var min = function (value, min, callback) {
  value >= min
  ? callback(null, value)
  : callback(new Error('value have to be >= ' + min));
};
var max = function (value, max, callback) {
  value <= max
  ? callback(null, value)
  : callback(new Error('value have to be <= ' + max));
};
var range = function(value, min, max, callback) {
  (value >= min) && (value <= max)
  ? callback(null, value)
  : callback(new Error('value have to be >= ' + min + ' and >= ' + max));
};
var pattern = function (value, regexObj, callback) {
  regexObj.test(value)
  ? callback(null, value)
  : callback(new Error('value have to match with pattern'));
};
var email = function (value, callback) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  pattern(value, regex, callback);
};
var objectId = function (err, value, callback) {
  var regex = /^[a-f\d]{24}$/i;
  pattern(value, regex, callback);
};

module.exports =  {
  notNull: notNull,
  notEmpty: notEmpty,
  isNull: isNull,
  min: min,
  max: max,
  range: range,
  pattern: pattern,
  email: email,
  objectId: objectId
};
