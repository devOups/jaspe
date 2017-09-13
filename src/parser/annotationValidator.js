/*!
 * Jaspe
 * Copyright(c) 2017 Quentin SAIEB
 * MIT Licensed
 */

'use strict'

const validator = require('./validator')
const annotation = require('./annotation')
const utils = require('./utils')

var annotationValidators = []
annotationValidators[annotation.enum['@notNull']] = validator.notNull
annotationValidators[annotation.enum['@isNull']] = validator.isNull
annotationValidators[annotation.enum['@notEmpty']] = validator.notEmpty
annotationValidators[annotation.enum['@min']] = validator.min
annotationValidators[annotation.enum['@max']] = validator.max
annotationValidators[annotation.enum['@range']] = validator.range
annotationValidators[annotation.enum['@pattern']] = validator.pattern
annotationValidators[annotation.enum['@email']] = validator.email
annotationValidators[annotation.enum['@objectId']] = validator.objectId

var invoke = function (strAnnotation, value, callback) {
  var annot = {}
  try {
    annot = annotation.parse(strAnnotation)
  } catch (e) {
    return callback(e)
  }

  annot.params.unshift(value)
  annot.params.push(callback)

  utils.apply(annotationValidators[annot.index], null, annot.params)
}

module.exports = {
  invokeValidator: invoke
}
