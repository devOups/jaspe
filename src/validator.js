

var notNull = function (value, callback) {
  value !== undefined && value !== null && !Number.isNaN(value) ? callback(null) : callback(new Error ('value have to not null'));
};
var isNull = function (value, callback) {
  value !== null ? callback(new Error('value have to null')) : callback(null) ;
};
var notEmpty = function (value, callback) {
  !!value && (0 !== value.length) ? callback(null) : callback(new Error('value have to not empty'));
};
var min = function (value, min, callback) {
  value >= min ? callback(null) : callback(new Error('value have to >= ' + min));
};
var max = function (value, max, callback) {
  value <= max ? callback(null) : callback(new Error('value have <= ' + max));
};
var range = function(value, min, max, callback) {
  (value >= min) && (value <= max) ? callback(null) : callback(new Error('value have to >= ' + min + ' and >= ' + max));
};
var pattern = function (value, regexObj, callback) {
  regexObj.test(value) ? callback(null) : callback(new Error('value have to match with regex'));
};
var email = function (value, callback) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  pattern(value, regex, callback);
};
var objectId = function (value, callback) {
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
