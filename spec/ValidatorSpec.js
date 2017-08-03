var validator = require('../src/validator');


describe('notNull validator', function () {
  it ('test with null value', function (done) {
      // given : a null value
      var value = null;

      // when : call notNull validator
      var callbackError = function () {
        validator.notNull(value, function (err) {
          throw err;
        });
      };
      // expect : thrown Error
      expect(callbackError).toThrow('value have to not null');
      done();
  });
  it ('test with undefined value', function (done) {
      // given : a null value
      var value = undefined;

      // when : call notNull validator
      var callbackError = function () {
        validator.notNull(value, function (err) {
          throw err;
        });
      };
      // expect : thrown Error
      expect(callbackError).toThrow('value have to not null');
      done();
  });
  it ('test with NaN value', function (done) {
      // given : a null value
      var value = NaN;

      // when : call notNull validator
      var callbackError = function () {
        validator.notNull(value, function (err) {
          throw err;
        });
      };
      // expect : thrown Error
      expect(callbackError).toThrow('value have to not null');
      done();
  });
  it ('test with [] value', function (done) {
      // given : a null value
      var value = [];

      // when : call notNull validator
      validator.notNull(value, function (err) {
        // expect : value is not null
        expect(err).toBeNull();
        done();
      });
  });
  it ('test with {} value', function (done) {
      // given : a null value
      var value = {};

      // when : call notNull validator
      validator.notNull(value, function (err) {
        // expect : value is not null
        expect(err).toBeNull();
        done();
      });
  });
  it ('test with "" value', function (done) {
      // given : a null value
      var value = "";

      // when : call notNull validator
      validator.notNull(value, function (err) {
        // expect : value is not null
        expect(err).toBeNull();
        done();
      });
  });
  it ("test with '' value", function (done) {
      // given : a null value
      var value = '';

      // when : call notNull validator
      validator.notNull(value, function (err) {
        // expect : value is not null
        expect(err).toBeNull();
        done();
      });
  });
  it ('test with false value', function (done) {
      // given : a null value
      var value = false;

      // when : call notNull validator
      validator.notNull(value, function (err) {
        // expect : value is not null
        expect(err).toBeNull();
        done();
      });
  });
  it ('test with 0 value', function (done) {
      // given : a null value
      var value = 0;

      // when : call notNull validator
      validator.notNull(value, function (err) {
        // expect : value is not null
        expect(err).toBeNull();
        done();
      });
  });
});


describe('isNull validator', function () {
  it ('test with null value', function (done) {
    // given : a null value
    var value = null;

    // when : call notNull validator
    var callbackError = function () {
      validator.isNull(value, function (err) {
        throw err;
      });
    };
    // expect : thrown Error
    expect(callbackError).toThrow('value have to not null');
    done();
  });
});
