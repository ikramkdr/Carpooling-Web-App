import React, { useEffect, useRef } from 'react';
import './ChatWindow.css';
import Avatar from '../../../assets/avatar.svg'


function ChatWindow({ selectedConversation, messages }) {
    const userId = parseInt(localStorage.getItem('userId'), 10);
    const chatBodyRef = useRef(null);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chat-window">
            <div className="chat-header">
            <img src={Avatar}  className="avatar" />
                <h3>{selectedConversation.interlocutorName}</h3>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${parseInt(msg.Id_emetteur, 10) === userId ? 'my-message' : 'their-message'}`}>
                        <p>{msg.contenu}</p>
                        <p className="message-time">{msg.heure}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatWindow;
