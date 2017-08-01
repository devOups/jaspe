const Pipeline = require('../src/pipeline');

describe("Pipeline class - Testing constructor", function () {
  it ("with default valid params", function () {
    // given
    let pipeline = new Pipeline()

    // then
    expect(pipeline.currentStep).toBe(0);
    expect(pipeline.name).toBe('');
    expect(pipeline.steps).toEqual([]);
  });
  it ("with defined name", function () {
    // given
    let pipeline = new Pipeline('pipeline')

    // then
    expect(pipeline.currentStep).toBe(0);
    expect(pipeline.name).toBe('pipeline');
    expect(pipeline.steps).toEqual([]);
  });
});
describe('Pipeline class - Testing add method', function () {
  it ('with valid params', function () {
    // given
    let pipeline = new Pipeline()
    let fn = function () {}

    // when
    pipeline.add('P1', fn)

    // then
    expect(pipeline.steps.length).toEqual(1)
    expect(pipeline.steps[0]).toEqual({name: 'P1', fn: fn})
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
    expect(thrown).toThrow('fn has to be a Function')
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
    expect(thrown).toThrow('callback has to be a Function')
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
  it ('without step', function () {
    // given
    let pipeline = new Pipeline();

    // and mock pipeline.end method
    spyOn(pipeline, 'end')

    // when
    pipeline.next()

    // then
    expect(pipeline.end).toHaveBeenCalled();
    expect(pipeline.end.calls.count()).toEqual(1);
    expect(pipeline.end.calls.argsFor(0)).toEqual([undefined, undefined]);
  })
  it ('with one step', function () {
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
      .toEqual([null, 1, jasmine.any(Function)]);
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
