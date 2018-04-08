'use strict'

const v = require('../src/validator');

describe('Validator - Testing notNull validator', function () {
  it('with null value', function (done) {
    // given : a null value
    let value = null;

    // when : call notNull validator
    let callbackError = function () {
      v.notNull(value, function (err) {
        throw err
      })
    }

    // then
    expect(callbackError).toThrowError('value have to be not null');
    done();
  })
  it('with undefined value', function (done) {
    // given : a null value
    let value

    // when : call notNull validator
    let callbackError = function () {
      v.notNull(value, function (err) {
        throw err
      });
    };

    // then
    expect(callbackError).toThrowError('value have to be not null')
    done()
  })
  it('with NaN value', function (done) {
    // given : a null value
    let value = NaN

    // when : call notNull validator
    let callbackError = function () {
      v.notNull(value, function (err) {
        throw err
      })
    }

    // then
    expect(callbackError).toThrowError('value have to be not null')
    done()
  })
  it('with [] value', function (done) {
    // given : a null value
    let value = []

    // when : call notNull validator
    v.notNull(value, function (err) {
      // then : value is not null
      expect(err).toBeNull()
      done()
    })
  })
  it('test with {} value', function (done) {
    // given : a null value
    let value = {}

    // when : call notNull validator
    v.notNull(value, function (err) {
      // then : value is not null
      expect(err).toBeNull()
      done()
    })
  })
  it('test with "" value', function (done) {
    // given : a null value
    let value = ""

    // when : call notNull validator
    v.notNull(value, function (err) {
      // expect : value is not null
      expect(err).toBeNull()
      done()
    })
  })
  it("test with '' value", function (done) {
    // given : a null value
    let value = ''

    // when : call notNull validator
    v.notNull(value, function (err) {
      // expect : value is not null
      expect(err).toBeNull()
      done()
    })
  })
  it('test with false value', function (done) {
    // given : a null value
    let value = false

    // when : call notNull validator
    v.notNull(value, function (err) {
      // expect : value is not null
      expect(err).toBeNull()
      done()
    })
  })
  it('test with 0 value', function (done) {
    // given : a null value
    let value = 0

    // when : call notNull validator
    v.notNull(value, function (err) {
      // expect : value is not null
      expect(err).toBeNull()
      done()
    })
  })
})

describe('Validator - Testing isNull validator', function () {
  it('with null value', function (done) {
    // given : a null value
    let value = null

    // when : call notNull validator
    let callbackError = function () {
      v.isNull(value, function (err) {
        throw err
      })
    }

    // then
    expect(callbackError).toThrowError('value have to be null')
    done()
  })
})

describe('Validator - Testing range validator', function () {
  it('with value is not in range', function (done) {
    // given
    let value = 15

    // and min & max value
    let min = 5
    let max = 10

    // when : call range validator
    let callbackError = function () {
      v.range(value, {min, max}, function (err) {
        throw err
      })
    }

    // then
    expect(callbackError).toThrowError('value have to be >= ' + min + ' and >= ' + max)
    done()
  })
  it('with value between min and max', function (done) {
    // given
    let value = 8

    // and min & max value
    let min = 5
    let max = 10

    // when : call range validator
    v.range(value, {min, max}, function (err, result) {
      // then
      expect(err).toBe(null)
      expect(result).toBe(value)
      done()
    })
  })
})

describe('Validator - Testing objectId validator', function () {
  it('with value not match with pattern', function (done) {
    // given 
    let value = '123'

    // when : call objectId validator
    let callbackError = () => {
      v.objectId(value, function (err) {
        throw err
      })
    }

    // then
    expect(callbackError).toThrowError('value have to match with pattern')
    done()
  })
  it('with value match with pattern', function (done) {
    // given 
    let value = '507f1f77bcf86cd799439011'

    // when : call objectId validator
    v.objectId(value, function (err, result) {      
      // then
      expect(err).toBe(null)
      expect(result).toBe(value)
      done()
    })
  })
})

describe('Validator - Testing min validator', function () {
  it('with value > min', function (done) {
    // given 
    let value = 2

    // and min
    let min = 11

    // when : call min validator
    let callbackError = () => {
      v.min(value, {min}, function (err) {
        throw err
      })
    }

    // then
    expect(callbackError).toThrowError('value have to be >= ' + min)
    done()
  })
  it('with value < min', function (done) {
    // given 
    let value = 10

    // and min
    let min = 5

    // when : call min validator
    v.min(value, {min}, function (err, result) {
      // then
      expect(err).toBe(null)
      expect(result).toBe(value)
      done()
    })
  })
})

describe('Validator - Testing max validator', function () {
  it('with value > max', function (done) {
    // given 
    let value = 123

    // and min
    let max = 10

    // when : call max validator
    let callbackError = () => {
      v.max(value, {max}, function (err) {
        throw err
      })
    }

    // then
    expect(callbackError).toThrowError('value have to be <= ' + max)
    done()
  })
  it('with value < max', function (done) {
    // given 
    let value = 10

    // and mmax
    let max = 20

    // when : call max validator
    v.max(value, {max}, function (err, result) {
      // then
      expect(err).toBe(null)
      expect(result).toBe(value)
      done()
    })
  })
})

describe('Validator - Testing isInteger validator', function () {
  it('with value is not an integer', function (done) {
    // given 
    let value = '123'

    // when : call isInteger validator
    let callbackError = function() {
      v.isInteger(value, function (err) {
        throw err
      })
    }

    // then
    expect(callbackError).toThrowError('value have to be an integer')
    done()
  })
  it('with value equal NaN', function (done) {
    // given 
    let value = NaN

    // when : call isInteger validator
    let callbackError = function() {
      v.isInteger(value, function (err) {
        throw err
      })
    }

    // then
    expect(callbackError).toThrowError('value have to be an integer')
    done()
  })
  it('with valid value', function (done) {
    // given 
    let value = 10

    // when : call isInteger validator
    v.isInteger(value, function (err, result) {
      // then
      expect(err).toBe(null)
      expect(result).toBe(value)
      done()
    })
  })
})

describe('Validator - Testing isArray validator', function () {
  it('with value is empty object', function (done) {
    // given 
    let value = {}

    // when : call isInteger validator
    let callbackError = function () {
      v.isArray(value, function (err) {
        throw err
      })
    }

    // then
    expect(callbackError).toThrowError('value have to be an array')
    done()
  })
  it('with value is a Map', function (done) {
    // given 
    let value = new Map()

    // when : call isInteger validator
    let callbackError = function () {
      v.isArray(value, function (err) {
        throw err
      })
    }

    // then
    expect(callbackError).toThrowError('value have to be an array')
    done()
  })
  it('with valid value', function (done) {
    // given 
    let value = []

    // when : call isInteger validator
    v.isArray(value, function (err, result) {
      // then
      expect(err).toBe(null)
      expect(result).toBe(value)
      done()
    })
  })
})
