'use strict'

const parallel = require('../src/parallel')

describe('Testing parallel function', function () {
  it('with valid params', function () {
    // given
    let callOrder = []

    // and a first task
    let task1 = (callback) => {
      setTimeout(() => {
        callOrder.push(1)
        callback(null, {a: 1})
      }, 50)
    }

    // and a second task
    let task2 = (callback) => {
      setTimeout(() => {
        callOrder.push(2)
        callback(null, {b: 2})
      }, 100)
    }

    // and third task
    let task3 = (callback) => {
      setTimeout(() => {
        callOrder.push(3)
        callback(null, {c: 3})
      }, 150)
    }

    // when run tasks in parallel
    return new Promise((resolve, reject) => {
      parallel([task1, task2, task3], (errors, results) => {
        // then
        expect(errors).toEqual([])
        expect(results).toEqual({a: 1, b: 2, c: 3})
        expect(callOrder).toEqual([1, 2, 3])
        resolve()
      })
    })
  })
  it('with empty array', function () {
    // given an empty array
    let tab = []

    // when
    parallel(tab, (errors, results) => {
      // then
      expect(errors).toBe(null)
      expect(results).toEqual(undefined)
    })
  })
  it('with tasks return error', function () {
    // given
    let callOrder = []

    // and a first task
    let task1 = (callback) => {
      setTimeout(() => {
        callOrder.push(1)
        callback(new Error())
      }, 50)
    }

    // and a second task
    let task2 = (callback) => {
      setTimeout(() => {
        callOrder.push(2)
        callback(new Error())
      }, 100)
    }

    // and third task
    let task3 = (callback) => {
      setTimeout(() => {
        callOrder.push(3)
        callback(null, {c: 3})
      }, 150)
    }

    // when
    return new Promise((resolve, reject) => {
      parallel([task1, task2, task3], (errors, results) => {
        // then
        expect(errors.length).toBe(2)
        expect(results).toEqual({c: 3})
        expect(callOrder).toEqual([1, 2, 3])
        resolve()
      })
    })
  })
})
