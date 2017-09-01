function each(map, make, callback) {
  let length = map.size
  let index = 0
  let results = []
  let errors = []
  let completed = 0

  map.forEach((value, key) => {
    make(key, value, (err, result) => {      
      if (err) {
        errors.push(err)
      } else {
        results.push(result)
      }
      
      if ((++completed === length)) {
        callback(errors, results)
      }
    })
  })    
}

module.exports = each
