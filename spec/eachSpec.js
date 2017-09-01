const each = require('../src/each')

describe('Testing each function', function () {
  it ('with valid params', function () {
    // given
    let map = new Map()

    // and add key => value
    map.set('one', 1)
    map.set('two', 2)
    map.set('three', 3)

    // and function to apply on each item of the map
    let make = (key, value, next) => {
      let obj = {}
      obj[key] = value + 1
      next(null, obj)
    }

    // when
    each(map, make, (errors, results) => {
      // then
      expect(errors).toEqual([])
      expect(results).toEqual([{one: 2}, {two: 3}, {three: 4}])
    })
  })
})