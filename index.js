const express = require('express')
const app = express()
const port = 3000

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  client.subscribe('deerdeveloper_webhook_test', function (err) {
    if (!err) {
      client.publish('deerdeveloper_webhook_test/running', 'Hello i am running')
    }
  })
})

client.on('message', function (topic, message) {
  console.log(message.toString())
})


app.get('/', (req, res) => {
  console.log(req);
  client.publish('deerdeveloper_webhook_test/data', req);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})