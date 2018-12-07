var express = require("express"); //looks into node_modules folder for express and require it in this file so we can use it
var socket = require("socket.io");

//App setup
var app = express();
var server = app.listen(4000, function() {
    console.log("Listening to requests on port 4000")
});

//Static files
app.use(express.static("public"));

//Socket setup
var io = socket(server); //takes a parameter, which is the server that we created and wanna work with - socket.io sits around on the server now, waiting for a client/browser to make a connection and set up a websocket between the 2 -> so we can listen out for when that connection is made

//listen out for an event called 'connection' - when the connection is detected, it's firing the callback function
io.on('connection', function(socket) {
    console.log("Made socket connection", socket.id);
    
    //listen for the message that's been sent from the client
    socket.on("chat", function(data) {
        io.sockets.emit("chat", data); //refers to all of the sockets connected to the server
    });
    
    socket.on("typing", function(data) {
        //broadcast the message to every other client except this one
        socket.broadcast.emit("typing", data);
    });
});