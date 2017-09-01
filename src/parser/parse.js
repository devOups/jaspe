const fs = require('fs');
const Pipeline = require('../Pipeline');

fs.readFile('contract.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let contract = JSON.parse(data)

  for (var service in contract.services) {
    if (service.hasOwnProperty(requirements)) {
      let pipeline = new Pipeline(
        [contract.name,service.name].join('-')
      )
      pipeline.add(
        s
      )
    }
  }

});
