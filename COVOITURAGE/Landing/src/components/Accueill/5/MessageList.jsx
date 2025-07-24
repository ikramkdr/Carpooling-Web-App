import React from 'react';
import './MessageList.css';
import Avatar from '../../../assets/avatar.svg';

function MessageList({ conversations, onSelectConversation }) {
    return (
        <div className="message-list">
            {conversations.map((conversation, index) => (
                <div key={index} className="message-item" onClick={() => onSelectConversation(conversation)}>
                    <img src={Avatar} alt={conversation.interlocutorName} className="avatar" />
                    <div className="message-info">
                        <p className="message-sender">{conversation.interlocutorName}</p>
                        <p className="message-preview">{conversation.lastMessage.text}</p>
                        <p className="message-time">{conversation.lastMessage.time}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MessageList;
