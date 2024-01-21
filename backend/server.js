const express = require('express');
const cors = require('cors');
const app = express();

// const corsOption = {
//   origin: 'http://localhost:3001',
// };

app.use(cors());

app.get('/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  let eventId = 0;

  // send SSE every second
  const intervalId = setInterval(() => {
    const data = { message: `hello world! (${new Date().toString()})`, id: eventId++ };
    console.log('sent:', data);
    
    res.write(`id: ${eventId}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 1000);

  // Close the connection if the client disconnects
  req.on('close', () => {
    clearInterval(intervalId);
    console.log('Client disconnected. Stopping SSE.');
    res.end();
  });
});

app.listen(3000, () => console.log('Server is listening on port 3000'));
