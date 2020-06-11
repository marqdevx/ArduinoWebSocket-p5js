//Server to just give the HTML content to the client
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, { origins: '*:*'});
var port = process.env.PORT || 3000;
var path = require('path');

//Read and write line commands
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Send html to the user
app.get('/', function(req, res){
  res.sendFile(path.normalize(__dirname + '/../index.html'));
});
//Listen to the port "port"
http.listen(port, function(){
  console.log('listening on *:' + port);
});

//WebSocket client to read the Arduino Create plugin messages
var ioClient = require('socket.io-client');
var arduinoSocket = ioClient('http://127.0.0.1:8991');

//Command line
//Send the input via websocket to the Arduino Plugin
rl.on('line', (input) => {
  arduinoSocket.emit('command', input);
});

//When we've been connected to the Arduino Plugin server
arduinoSocket.on('connect', () => {
  console.log("Connected"); // 'G5p5...'
});

//If you want to print in the console the websockets received uncomment this
/*
arduinoSocket.on('message', function (data) {
  console.log(data); // 'G5p5...'
});
*/


