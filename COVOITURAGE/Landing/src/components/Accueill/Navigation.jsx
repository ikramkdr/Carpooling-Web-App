import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import avatar from '../../assets/avatar.svg';
import '../Accueill/Navigation.css';

function NavigationBar() {
    const [username, setUsername] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationsRef = useRef();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        if (showNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications]);

    const fetchNotifications = () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:8081/notifications/${userId}`)
                .then(response => {
                    setNotifications(response.data);
                    setShowNotifications(true);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des notifications:', error);
                });
        }
    };

    const handleAccept = (notificationId) => {
        axios.put(`http://localhost:8081/notifications/${notificationId}`, { etat: '1' })
            .then(() => {
                setNotifications(notifications.filter(notification => notification.id_notif !== notificationId));
            })
            .catch(error => {
                console.error('Erreur lors de la validation de la notification:', error);
            });
    };

    const handleReject = (notificationId) => {
        axios.put(`http://localhost:8081/notifications/${notificationId}`, { etat: '2' })
        .then(() => {
            setNotifications(notifications.filter(notification => notification.id_notif !== notificationId));
        })
        .catch(error => {
            console.error('Erreur lors de la validation de la notification:', error);
        });
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <div id='personne'>
                <h1 className='notif' onClick={fetchNotifications}>notification</h1>
                <img id='avatar-container' src={avatar} alt="" />
                <div className='Name-container'>
                    <p>{username}</p>
                    <h5>parametres</h5>
                </div>
            </div>
            {showNotifications && (
                <div ref={notificationsRef} className='notifications-container'>
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
                            <div key={notification.id_notif} className='notification-item'>
                                <div className='notification-content'>
                                    <p>{notification.contenu}</p>
                                    <small>{formatDate(notification.date_notification)} {notification.heur}</small>
                                </div>
                                <div className='notification-actions'>
                                    <button className='accept-btn' onClick={() => handleAccept(notification.id_notif)}></button>
                                    <button className='reject-btn' onClick={() => handleReject(notification.id_notif)}></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Aucune notification</p>
                    )}
                </div>
            )}
        </>
    );
}

export default NavigationBar;
