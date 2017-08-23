const v = require('../src/validator');

describe('Validator - Testing notNull validator', function () {
  it ('with null value', function (done) {
      // given : a null value
      var value = null;

      // when : call notNull validator
      var callbackError = function () {
        v.notNull(value, function (err) {
          throw err;
        });
      };

      // then
      expect(callbackError).toThrowError('value have to be not null');
      done();
  });
  it ('with undefined value', function (done) {
      // given : a null value
      var value = undefined;

      // when : call notNull validator
      var callbackError = function () {
        v.notNull(value, function (err) {
          throw err;
        });
      };

      // then
      expect(callbackError).toThrowError('value have to be not null');
      done();
  });
  it ('with NaN value', function (done) {
      // given : a null value
      var value = NaN

      // when : call notNull validator
      var callbackError = function () {
        v.notNull(value, function (err) {
          throw err
        })
      }

      // then
      expect(callbackError).toThrowError('value have to be not null')
      done()
  });
  it ('with [] value', function (done) {
      // given : a null value
      var value = []

      // when : call notNull validator
      v.notNull(value, function (err) {
        // then : value is not null
        expect(err).toBeNull()
        done()
      });
  });
  it ('test with {} value', function (done) {
      // given : a null value
      var value = {}

      // when : call notNull validator
      v.notNull(value, function (err) {
        // then : value is not null
        expect(err).toBeNull()
        done()
      });
  });
  it ('test with "" value', function (done) {
      // given : a null value
      var value = "";

      // when : call notNull validator
      v.notNull(value, function (err) {
        // expect : value is not null
        expect(err).toBeNull();
        done();
      });
  });
  it ("test with '' value", function (done) {
      // given : a null value
      var value = '';

      // when : call notNull validator
      v.notNull(value, function (err) {
        // expect : value is not null
        expect(err).toBeNull();
        done();
      });
  });
  it ('test with false value', function (done) {
      // given : a null value
      var value = false;

      // when : call notNull validator
      v.notNull(value, function (err) {
        // expect : value is not null
        expect(err).toBeNull();
        done();
      });
  });
  it ('test with 0 value', function (done) {
      // given : a null value
      var value = 0;

      // when : call notNull validator
      v.notNull(value, function (err) {
        // expect : value is not null
        expect(err).toBeNull();
        done();
      });
  });
});


describe('Validator - Testing isNull validator', function () {
  it ('with null value', function (done) {
    // given : a null value
    var value = null

    // when : call notNull validator
    var callbackError = function () {
      v.isNull(value, function (err) {
        throw err
      })
    }

    // then
    expect(callbackError).toThrowError('value have to be null')
    done()
  });
});
