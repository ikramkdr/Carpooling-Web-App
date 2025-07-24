import React, { useState } from 'react';
import './MessageInput.css';

function MessageInput({ onSendMessage }) {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <div className="message-input">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ecrivez votre message ici..."
            />
            <button onClick={handleSend}>Envoyer</button>
        </div>
    );
}

export default MessageInput;
