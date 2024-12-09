const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/", (req,res)=>{
    res.send("Hello World");
})

// SSE endpoint
app.get('/events', (req, res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let counter = 0;

  // Send an initial event
  res.write(`data: Connected to the stream\n\n`);

    
  // Send periodic events
  const interval = setInterval(() => {
    counter++;
    res.write(`data: ${JSON.stringify({ message: `Event #${counter}`, timestamp: new Date() })}\n\n`);
    if(counter > 6){
        res.end();
    }
  }, 1000);

  // Clean up when the client disconnects
  req.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
