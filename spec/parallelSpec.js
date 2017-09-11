'use strict'

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
    return new Promise((resolve, reject) => {
      parallel([task1, task2, task3], (errors, results) => {
        // then
        expect(errors).toEqual([])
        expect(results).toEqual([1, 2, 3])
        expect(call_order).toEqual([1, 2, 3])
        resolve()
      })
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
    return new Promise((resolve, reject) => {
      parallel([task1, task2, task3], (errors, results) => {
        // then
        expect(errors.length).toBe(2)
        expect(results.length).toBe(1)
        expect(results).toEqual([3])
        expect(call_order).toEqual([1, 2, 3])
        resolve()
      })
    })    
  })
})