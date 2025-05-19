// This file runs from 'node server_script.js' on the
// command line

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const socketIo = require('socket.io');
const { diffChars } = require('diff');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const wss = new WebSocket.Server({ server });

// Initial SVG content
let currentSVG = `
<svg width="800" height="600">
  <rect width="100%" height="100%" fill="white"/>
</svg>
`;


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

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

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send initial SVG to the client
  ws.send(JSON.stringify({ type: 'initialSVG', data: currentSVG }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'adminUpdate') {
      const oldSVG = currentSVG;
      currentSVG = data.svg;

      // Compute the difference between old and new SVG
      const differences = diffChars(oldSVG, currentSVG);

      // Broadcast the diff to all clients
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'svgDiff', data: differences }));
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

ws.on('close', () => {
    console.log('Client disconnected');
  });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
