function each(iterable, make, callback) {
  let length = iterable.size
  let index = 0
  let results = []
  let completed = 0

  iterable.forEach((value, key) => {
    make(key, value, (err, result) => {
      results.push(result)

      if ((++completed === length)) {
        callback(null, results)
      }
    })
  })    
}

module.exports = each
