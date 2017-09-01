const parallel = require('../src/parallel')

describe('Testing parallel function', function () {
  it ('with valid params', function () {
    // given
    let call_order = []

    // and a first task
    let task1 = (callback) => {
      setTimeout(() => {
        call_order.push(1)
        callback(null, 1)
      }, 50)
    }

    // and a second task
    let task2 = (callback) => {
      setTimeout(() => {
        call_order.push(2)
        callback(null, 2)
      }, 100)
    }

    // and third task
    let task3 = (callback) => {
      setTimeout(() => {
          call_order.push(3)
          callback(null, 3)
      }, 150)
    }

    // when run tasks in parallel
    parallel([task1, task2, task3], (errors, results) => {
      // then
      expect(errors).toBe(null)
      expect(results).toEqua([1 ,2 ,3])
      expect(call_order).toEqua([1 ,2 ,3])
    })
  })
  it ('with empty array', function () {
    // given an empty array
    let tab = []

    // when
    parallel(tab, (errors, results) => {
      // then
      expect(errors).toBe(null)
      expect(results).toBe(undefined)
    })
  })
  it ('with tasks return error', function () {
    // given
    let call_order = []

    // and a first task
    let task1 = (callback) => {
      setTimeout(() => {
        call_order.push(1)
        callback(new Error())
      }, 50)
    }

    // and a second task
    let task2 = (callback) => {
      setTimeout(() => {
        call_order.push(2)
        callback(new Error())
      }, 100)
    }

    // and third task
    let task3 = (callback) => {
      setTimeout(() => {
          call_order.push(3)
          callback(null, 3)
      }, 150)
    }

    // when
    parallel([task1, task2, task3], (errors, results) => {
      // then
      expect(errors.length).toBe(2)
      expect(results.length).toBe(1)
      expect(results).toEqual([1])
      expect(call_order).toEqua([1 ,2 ,3])
    })
  })
})