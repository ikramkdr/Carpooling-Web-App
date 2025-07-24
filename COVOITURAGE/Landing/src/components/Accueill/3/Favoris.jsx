import React, { useState, useEffect } from 'react';
import Sidebar from '../../sideBar/sideBar';
import axios from 'axios';
import NavigationBar from '../Navigation';
import Person from '../../../assets/person.svg';
import Avatar from "../../../assets/Avatar.svg";

import MessageIcon from '../../../assets/message.svg';
import heartt from '../../../assets/Vector.svg';
import Fromto from '../../../assets/fromto.svg';


function Favories() {
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const username = localStorage.getItem('username');

        if (!username) {
            setError('Username is missing from local storage');
            return;
        }

        axios.post('http://localhost:8081/api/user-trips', { username })
            .then(response => {
                if (response.data.status === 'success') {
                    setTrips(response.data.trips);
                } else {
                    setError('Failed to fetch trips: ' + response.data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching trips:', error);
                setError('Error fetching trips: ' + error.message);
            });
    }, []);

    const sendMessage = (idConducteur) => {
        const userId = localStorage.getItem('userId'); 

        axios.post('http://localhost:8081/api/get-user-id', { idConducteur })
            .then(response => {
                if (response.data.status === 'success') {
                    const idUser = response.data.idUser;
                    const newMessage = {
                        contenu: 'Salut',
                        heure: new Date().toLocaleTimeString(),
                        date: new Date().toISOString().split('T')[0],
                        Id_recepteur:  idUser,
                        Id_emetteur: userId
                    };
                    axios.post('http://localhost:8081/api/send-message', newMessage).then(response => {
                      
                    console.log('Message envoyé:', response.data);
                    window.location.href = '/Messagerie';

    
                })
                .catch(error => console.error('Erreur lors de l\'envoi du message:', error));
        
                } else {
                    console.error('Failed to fetch user ID:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching user ID:', error);
            });
    };

    return (
        <div className="mes-trajets">
            <div className='sideB'>{Sidebar(2)}</div>
            <div className='content'>
                <div id='headerrTrajet'>
                    <h2 id='Titre'>Favoris</h2>
                    <NavigationBar />
                </div>
                <hr />
                {error && <p className="error-message">{error}</p>}

                <div className="results">
                    {trips.length > 0 ? trips.map((trip, index) => (
                        <div key={index}>
                            <div className='Resultat' key={trip.id}>
                                <p className="DATEES">{new Date(trip.date).toLocaleDateString()}</p>
                                <p className="times">{new Date(`1970-01-01T${trip.time}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                <div className="FromToo"><img src={Fromto} alt="" /></div>
                                <p className="Origines">{trip.origin}</p>
                                <p className="destinations">{trip.destination}</p>
                                <p className="NbPlace">{trip.seats}<img src={Person} alt="" /></p>
                                <hr />
                                <br />
                                <div id="avatar_containe"><img src={Avatar} alt="" /><br /><p>{trip.idConducteur}</p></div>
                                <button className='messageSend' onClick={() => sendMessage(trip.idConducteur)}><img src={MessageIcon} alt="Envoyer message " /></button>
                                <button className='Liked'><img src={heartt} alt="liker" /></button>
                            </div>
                        </div>
                    )) : <p>Aucun trajet trouvé.</p>}
                </div>
            </div>
        </div>
    );
}

export default Favories;
