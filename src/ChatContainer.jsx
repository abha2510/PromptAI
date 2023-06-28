import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";

const ChatContainer = () => {
  const [inputText, setInputText] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    try {     
       const response = await axios.post('https://gentle-crab-umbrella.cyclic.app/conversation', {
        mode:"no-cors",
        user_input: inputText,
      });

      const completionText = response.data.response;

      // Update conversation history
      setConversation((prevConversation) => [
        ...prevConversation,
        { role: 'user', content: inputText },
        { role: 'assistant', content: completionText },
      ]);

      setInputText('');
      
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="chat-container">
         <h1>Quote Generator</h1>
         <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Genrate Quotes</button>
      </form>
      {isLoading ? (
        <div ><img className="loader" src="https://www.wpfaster.org/wp-content/uploads/2013/06/loading-gif.gif" alt="" /></div>
      ) : (
        <div className="chat-history">
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.role === 'user' ? 'user' : 'assistant'
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
      )}
     
    </div>
  );
};

export default ChatContainer;
