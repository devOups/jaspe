var ANNOTATION_ENUM = {
  '@notNull': 0,
  '@isNull': 1,
  '@notEmpty': 2,
  '@min': 3,
  '@max': 4,
  '@range': 5,
  '@pattern': 6,
  '@email': 7,
  '@objectId': 8
};

/**
* Parse a str annotation
* ex: '@range(1,2)' ; '@min(5)' ; '@notEmpty'
*
* @name parseAnnotation
* @param {String} strAnnotation - str modeling an annotation
* @return {Object} annotation name, interger value and params
*/
var parseAnnotation = function (strAnnotation) {
  var regex = /(^@[a-zA-Z]+)(\(\s*([^)]+?)\s*\)){0,1}/;
  var match = regex.exec(strAnnotation);
  var params = [];

  if (!match) throw ('Annotation syntaxe is incorrect');

  var annotation = ANNOTATION_ENUM[match[1]];
  if (annotation === undefined) throw 'Annotation is unknown';

  if (match[3]) {
    params = match[3].split(/\s*,\s*/);
  }

  return {
    annotation: match[1],
    index: annotation,
    params: params
  };
};


module.exports = {
  enum: ANNOTATION_ENUM,
  parse: parseAnnotation
};
