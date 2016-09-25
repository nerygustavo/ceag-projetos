'use strict';

(function() {
  const mqtt = require('mqtt');
  const express = require('express');
  const app = express();

  var host = (process.env.VCAP_APP_HOST || 'localhost');
  var port = (process.env.VCAP_APP_PORT || 3000);

  var server = require('http').createServer(app);
  var io = require('socket.io')(server);
  io.on('connection', function(){
    console.log('socket connected');
  });

  app.use(express.static('public', { index: "views/index.html" }));

  const mqttOptions = {
    'clientId': 'a:nk8de8:nodemcu-'+Date.now(),
    'keepalive': 0,
    'username': 'a-nk8de8-ehmxpw4axc',
    'password': 'Hr4fIUN4ri++sE6Z9&'
  };

  const client  = mqtt.connect('mqtts://nk8de8.messaging.internetofthings.ibmcloud.com:8883', mqttOptions);

  client.on('connect', function () {
    console.log('connected to mqtt...');
    client.subscribe('iot-2/type/nodemcu/id/sala/evt/+/fmt/json')
  });

  client.on('message', function (topic, message) {
    // message is Buffer
    const payload = JSON.parse(message.toString());
    console.log(payload);
    io.emit('message', payload);
  });

  server.listen(port);

})();
