import React, { useState, useEffect } from 'react';
import Sidebar from '../../sideBar/sideBar';
import MessageList from './MessageList';
import NavigationBar from '../Navigation';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import './Messagerie.css';
import axios from 'axios';

function Messagerie() {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const userId = parseInt(localStorage.getItem('userId'), 10);
        <ChatWindow selectedConversation={selectedConversation} messages={messages} userId={userId} />
        if (!userId) {
            console.error('UserId est vide');
            return;
        }

        // Récupérer les conversations
        axios.post('http://localhost:8081/api/conversations', { userId })
            .then(response => {
                console.log('Conversations reçues:', response.data);
                setConversations(response.data);
            })
            .catch(error => console.error('Erreur lors de la récupération des conversations:', error));
    }, []);

    const handleSelectConversation = (conversation) => {
        console.log('Conversation sélectionnée:', conversation);
        setSelectedConversation(conversation);

        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('UserId est vide');
            return;
        }

        // Récupérer tous les messages entre l'utilisateur connecté et l'interlocuteur sélectionné
        axios.post('http://localhost:8081/api/messages', { userId1: userId, userId2: conversation.interlocutorId })
            .then(response => {
                console.log('Messages reçus:', response.data);
                setMessages(response.data);
            })
            .catch(error => console.error('Erreur lors de la récupération des messages:', error));
    };

    const handleSendMessage = (messageContent) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('UserId est vide');
            return;
        }

        if (selectedConversation) {
            const newMessage = {
                contenu: messageContent,
                heure: new Date().toLocaleTimeString(),
                date: new Date().toISOString().split('T')[0],
                Id_recepteur: selectedConversation.interlocutorId,
                Id_emetteur: userId
            };

            axios.post('http://localhost:8081/api/send-message', newMessage)
                .then(response => {
                    console.log('Message envoyé:', response.data);
                    const updatedMessages = [...messages, response.data];
                    setMessages(updatedMessages);

                    const updatedConversations = conversations.map(conv => 
                        conv.interlocutorId === selectedConversation.interlocutorId
                            ? { ...conv, lastMessage: response.data }
                            : conv
                    );
                    setConversations(updatedConversations);
                })
                .catch(error => console.error('Erreur lors de l\'envoi du message:', error));
        }
    };

    return (
        <div id="Messagerie">
            <div className='sideB'>{Sidebar(4)}</div>
            <div id='header'>
                <h2>Messagerie</h2>
                <NavigationBar />
            </div>
      <hr id='ligne'/>
            <section className='Fil_de_Conversations'>
                <MessageList conversations={conversations} onSelectConversation={handleSelectConversation} />
            </section>
            {selectedConversation && (
                <section className='Conversation'>
                    <div className="chat-container">
                        <ChatWindow selectedConversation={selectedConversation} messages={messages} />
                        <MessageInput onSendMessage={handleSendMessage} />
                    </div>
                </section>
            )}
        </div>
    );
}

export default Messagerie;
