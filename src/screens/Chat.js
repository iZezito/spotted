import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);
    client.connect({}, () => {
      setStompClient(client);
      client.subscribe('/topic/messages', message => {
        const newMessage = message.body;
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });
    });
  }, []);

  const handleInput = event => {
    setInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const message = input; // Envia a mensagem como uma string simples
    stompClient.send('/app/chat', {}, message);
    setInput('');
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleInput} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;

