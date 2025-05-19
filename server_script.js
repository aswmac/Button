// This file runs from 'node server_script.js' on the
// command line

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
	const connectTime = new Date().toISOString();
	console.log(connectTime, ': A user connected'); // why (ISO maybe?) "${dateTime}" does not print?
		
	socket.on('sendRequest', () => {
		// Notify the administrator
		io.emit('notification', 'User has sent a request!');
		console.log('Notification sent to all clients');
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
