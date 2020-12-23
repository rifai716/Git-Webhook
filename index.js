const express = require('express')
var bodyParser = require("body-parser");
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.hivemq.com')

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


app.post('/', (req, res) => {
  console.log(req.body.toString());
  client.publish('deerdeveloper_webhook_test/data', req.body.branch);
  res.send(req.body.branch);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
