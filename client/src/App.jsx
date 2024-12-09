import React, { useEffect, useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Establish connection to the event stream
    const eventSource = new EventSource('http://localhost:5000/events');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    eventSource.onerror = (e) => {
      console.error('Error occurred in the EventStream', e);
      eventSource.close();
    };

    // Cleanup on component unmount
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>EventStream Client</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.message} - {new Date(msg.timestamp).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
