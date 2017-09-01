var Annotation = require('../../src/parser/annotation.js');

describe('annotation initaliaze', function() {
  it ('annotations provide', function() {
    // given : an original annotation enum
    var annotation_enum = Annotation.enum;

    // expected
    expect(annotation_enum['@notNull']).toBe(0);
    expect(annotation_enum['@isNull']).toBe(1);
    expect(annotation_enum['@notEmpty']).toBe(2);
    expect(annotation_enum['@min']).toBe(3);
    expect(annotation_enum['@max']).toBe(4);
    expect(annotation_enum['@range']).toBe(5);
    expect(annotation_enum['@pattern']).toBe(6);
    expect(annotation_enum['@email']).toBe(7);
    expect(annotation_enum['@objectId']).toBe(8);
  });
});

describe('annotations parseAnnotation method', function () {
  it ('test with unknown annotation', function () {
    // given : an unknown annotation
    var unknownAnnotation = '@unknown';

    // when : parse this annotation
    var parsedAnnotation = function () {
      Annotation.parse(unknownAnnotation);
    };

    // expected : thrown Error
    expect(parsedAnnotation).toThrow('Annotation is unknown');
  });

  it ('test without @ tag on the first character', function () {
    // given : an unknown annotation
    var invalidAnnotation = 'unknown';

    // when : parse this annotation
    var parsedAnnotation = function () {
      Annotation.parse(invalidAnnotation);
    };

    // expected : thrown Error
    expect(parsedAnnotation).toThrow('Annotation syntaxe is incorrect');
  });

  it ('test with the first characters are number', function () {
    // given : an unknown annotation
    var invalidAnnotation = '@45612';

    // when : parse this annotation
    var parsedAnnotation = function () {
      Annotation.parse(invalidAnnotation);
    };

    // expected : thrown Error
    expect(parsedAnnotation).toThrow('Annotation syntaxe is incorrect');
  });

  it ('test with empty params', function () {
    // given : an unknown annotation
    var invalidAnnotation = '@min()';

    // when : parse this annotation
    var parsedAnnotation = Annotation.parse(invalidAnnotation);

    // expected : thrown Error
    expect(parsedAnnotation.annotation).toBe('@min');
    expect(parsedAnnotation.index).toBe(3);
    expect(parsedAnnotation.params).toEqual([]);
  });

  it ('test without params', function () {
    // given : an unknown annotation
    var invalidAnnotation = '@min';

    // when : parse this annotation
    var parsedAnnotation = Annotation.parse(invalidAnnotation);

    // expected : thrown Error
    expect(parsedAnnotation.annotation).toBe('@min');
    expect(parsedAnnotation.index).toBe(3);
    expect(parsedAnnotation.params).toEqual([]);
  });

  it ('test with param', function () {
    // given : an unknown annotation
    var invalidAnnotation = '@range(1, 5)';

    // when : parse this annotation
    var parsedAnnotation = Annotation.parse(invalidAnnotation);

    // expected : thrown Error
    expect(parsedAnnotation.annotation).toBe('@range');
    expect(parsedAnnotation.index).toBe(5);
    expect(parsedAnnotation.params).toEqual(['1' ,'5']);
  });

  it ('test @notNull annotation', function () {
    // given : an unknown annotation
    var invalidAnnotation = '@notNull';

    // when : parse this annotation
    var parsedAnnotation = Annotation.parse(invalidAnnotation);

    // expected : thrown Error
    expect(parsedAnnotation.annotation).toBe('@notNull');
    expect(parsedAnnotation.index).toBe(0);
    expect(parsedAnnotation.params).toEqual([]);
  });

  it ('test @isNull annotation', function () {
    // given : an unknown annotation
    var invalidAnnotation = '@isNull';

    // when : parse this annotation
    var parsedAnnotation = Annotation.parse(invalidAnnotation);

    // expected : thrown Error
    expect(parsedAnnotation.annotation).toBe('@isNull');
    expect(parsedAnnotation.index).toBe(1);
    expect(parsedAnnotation.params).toEqual([]);
  });

  it ('test @notEmpty annotation', function () {
    // given : an unknown annotation
    var invalidAnnotation = '@notEmpty';

    // when : parse this annotation
    var parsedAnnotation = Annotation.parse(invalidAnnotation);

    // expected : thrown Error
    expect(parsedAnnotation.annotation).toBe('@notEmpty');
    expect(parsedAnnotation.index).toBe(2);
    expect(parsedAnnotation.params).toEqual([]);
  });

  it ('test @min annotation', function () {
    // given : an unknown annotation
    var invalidAnnotation = '@min(5)';

    // when : parse this annotation
    var parsedAnnotation = Annotation.parse(invalidAnnotation);

    // expected : thrown Error
    expect(parsedAnnotation.annotation).toBe('@min');
    expect(parsedAnnotation.index).toBe(3);
    expect(parsedAnnotation.params).toEqual(['5']);
  });

  it ('test @max annotation', function () {
    // given : an unknown annotation
    var invalidAnnotation = '@max(5)';

    // when : parse this annotation
    var parsedAnnotation = Annotation.parse(invalidAnnotation);

    // expected : thrown Error
    expect(parsedAnnotation.annotation).toBe('@max');
    expect(parsedAnnotation.index).toBe(4);
    expect(parsedAnnotation.params).toEqual(['5']);
  });

  it ('test @pattern annotation', function () {
    // given : an unknown annotation
    var invalidAnnotation = '@pattern(/[a-z]/)';

    // when : parse this annotation
    var parsedAnnotation = Annotation.parse(invalidAnnotation);

    // expected : thrown Error
    expect(parsedAnnotation.annotation).toBe('@pattern');
    expect(parsedAnnotation.index).toBe(6);
    expect(parsedAnnotation.params).toEqual(['/[a-z]/']);
  });

  it ('test @email annotation', function () {
    // given : an unknown annotation
    var invalidAnnotation = '@email';

    // when : parse this annotation
    var parsedAnnotation = Annotation.parse(invalidAnnotation);

    // expected : thrown Error
    expect(parsedAnnotation.annotation).toBe('@email');
    expect(parsedAnnotation.index).toBe(7);
    expect(parsedAnnotation.params).toEqual([]);
  });
  it ('test @objectId annotation', function () {
    // given : an unknown annotation
    var invalidAnnotation = '@objectId';

    // when : parse this annotation
    var parsedAnnotation = Annotation.parse(invalidAnnotation);

    // expected : thrown Error
    expect(parsedAnnotation.annotation).toBe('@objectId');
    expect(parsedAnnotation.index).toBe(8);
    expect(parsedAnnotation.params).toEqual([]);
  });
});
