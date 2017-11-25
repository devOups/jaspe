'use strict'

const Pipeline = require('../../src/core/pipeline');

describe('Pipeline class - Testing constructor', function () {
  it ('with default valid params', function () {
    // given
    let pipeline = new Pipeline()

    // then
    expect(pipeline.currentStep).toBe(0)
    expect(pipeline.name).toBe('')
    expect(pipeline.steps).toEqual([])
  });
  it ("with defined name", function () {
    // given
    let pipeline = new Pipeline('pipeline')

    // then
    expect(pipeline.currentStep).toBe(0);
    expect(pipeline.name).toBe('pipeline');
    expect(pipeline.steps).toEqual([]);
  });
  it ("with defined name and steps", function () {
    // given initial steps
    let fn = () => {}
    let steps = [
      {
        name: 'test',
        validator: fn
      }
    ]

    // and create pipeline
    let pipeline = new Pipeline('pipeline', steps)

    // then
    expect(pipeline.currentStep).toBe(0)
    expect(pipeline.steps.length).toBe(1)
    expect(pipeline.name).toBe('pipeline')
    expect(pipeline.steps[0].name).toBe('test')
    expect(pipeline.steps[0].fn).toBe(fn)
    expect(pipeline.steps[0].params).toBe(undefined)
  });
});
describe('Pipeline class - Testing add method', function () {
  it ('with valid params', function () {
    // given
    let pipeline = new Pipeline()
    let fn = function () {}
    let args = {min: 0, max: 10}

    // when
    pipeline.add('P1', fn, args)

    // then
    expect(pipeline.steps.length).toEqual(1)
    expect(pipeline.steps[0]).toEqual({name: 'P1', fn: fn, args: args})
  })
  it ('with fn param is not a Function', function () {
    // given
    let pipeline = new Pipeline()
    let fn = []

    // when
    var thrown = function () {
      pipeline.add('P1', fn)
    }

    // then
    expect(thrown).toThrowError('fn has to be a Function')
  })
})
describe('Pipeline class - Testing run method', function () {
  it ('with callback param is not a Function', function () {
    // given
    let pipeline = new Pipeline()

    // and mock end function
    spyOn(pipeline, 'end');

    // when
    let thrown = function () {
      pipeline.run(1, undefined);
    }

    // then
    expect(thrown).toThrowError('callback has to be a Function')
  })
  it ('with valid params', function () {
    // given
    let pipeline = new Pipeline()

    // and mock pipeline.next function
    spyOn(pipeline, 'next')

    // and param and callback
    let param = 1
    let callback = function () {}

    // when
    pipeline.run(param, callback);

    // then
    expect(pipeline.next).toHaveBeenCalled()
    expect(pipeline.next.calls.count()).toEqual(1)
    expect(pipeline.next.calls.argsFor(0)).toEqual([null, param])
    expect(pipeline.endOfPipeline).toBe(callback)
  })
})
describe('Pipeline class - Testing next method', function () {
  it ('without step and error', function () {
    // given
    let pipeline = new Pipeline();

    // and mock pipeline.end method
    spyOn(pipeline, 'end')

    // when
    pipeline.next()

    // then
    expect(pipeline.end).toHaveBeenCalled();
    expect(pipeline.end.calls.count()).toEqual(1);
    expect(pipeline.end.calls.argsFor(0)).toEqual([null, undefined]);
  })
  it ('with error and no step', function () {
    // given
    let pipeline = new Pipeline()

    // and mock pipeline.end method
    spyOn(pipeline, 'end')

    // and an error
    let error =  new Error('test failed')

    // when
    pipeline.next(error)

    // then
    expect(pipeline.end).toHaveBeenCalled();
    expect(pipeline.end.calls.count()).toEqual(1);
    expect(pipeline.end.calls.argsFor(0)).toEqual([error, undefined]);
    expect(error.message).toBe('Contract error : test failed');
  })
  it ('with error and one step', function () {
    // given
    let pipeline = new Pipeline()

    // and mock pipeline.end method
    spyOn(pipeline, 'end')

    // and an error
    let error =  new Error('test failed')

    // and : one step and mock step.fn function
    let step = {
      name: 'S1',
      fn: function () {}
    }
    spyOn(step, 'fn')

    // and : add step
    pipeline.steps.push(step);

    // when
    pipeline.next(error, 1)

    // then
    expect(pipeline.end).toHaveBeenCalled();
    expect(pipeline.end.calls.count()).toEqual(1);
    expect(pipeline.end.calls.argsFor(0)).toEqual([error, 1]);
    expect(error.message).toBe('Contract error : test failed');
  })
  it ('with one step without args', function () {
    // given
    let pipeline = new Pipeline();

    // and : one step and mock step.fn function
    let step = {
      name: 'S1',
      fn: function () {}
    }
    spyOn(step, 'fn')

    // and : add step
    pipeline.steps.push(step);

    // when
    pipeline.next(null, 1)

    // then
    expect(step.fn).toHaveBeenCalled();
    expect(step.fn.calls.count()).toEqual(1);
    expect(step.fn.calls.argsFor(0))
      .toEqual([1, jasmine.any(Function)]);
  })
  it ('with one step with args', function () {
    // given
    let pipeline = new Pipeline();

    // and : one step and mock step.fn function
    let step = {
        name: 'S1',
        fn: function () {},
        args: {min: 0, max: 10}
    }
    spyOn(step, 'fn')

    // and : add step
    pipeline.steps.push(step);

    // when
    pipeline.next(null, 1)

    // then
    expect(step.fn).toHaveBeenCalled();
    expect(step.fn.calls.count()).toEqual(1);
    expect(step.fn.calls.argsFor(0))
      .toEqual([1, 0, 10, jasmine.any(Function)]);
  })
})
describe('Pipeline class - Testing end method', function () {
  it ('with valid params', function () {
    // given
    let pipeline = new Pipeline()

    // and : mock pipeline.endOfPipeline
    pipeline.endOfPipeline = function () {}
    spyOn(pipeline, 'endOfPipeline')

    // when
    pipeline.end()

    // then
    expect(pipeline.endOfPipeline).toHaveBeenCalled()
    expect(pipeline.endOfPipeline.calls.count()).toEqual(1)
    expect(pipeline.endOfPipeline.calls.argsFor(0))
      .toEqual([undefined, undefined])
  })
})
