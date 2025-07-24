import React, { useState, useEffect } from 'react';
import SidebarAdmin from "../../SideBarAdmin/SideBarAdmin";
import NavigationBar from "../../../Accueill/Navigation";
import axios from 'axios';

function Trajet() {
    const [trajets, setTrajets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/trajets')
            .then(response => {
                setTrajets(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des trajets:', error);
            });
    }, []);

    const handleDeleteTrajet = (id) => {
        axios.delete(`http://localhost:8081/api/trajets/${id}`)
            .then(response => {
                console.log(response.data.message);
                // Mettre à jour la liste des trajets après la suppression
                setTrajets(trajets.filter(trajet => trajet.id !== id));
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du trajet:', error);
            });
    };

    return (
        <div className="mes-trajets">
            {SidebarAdmin(2)}
            <div className='content'>
                <div id='headerrTrajet'>
                    <h2 id='Titre'>Trajets</h2>
                    <NavigationBar />
                </div>
                <hr />
                
                <div className="scrollable-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Actions</th>
                                <th>ID</th>
                                <th>Origine</th>
                                <th>Destination</th>
                                <th>ID Conducteur</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Heure</th>
                                <th>Places</th>
                                <th>Siège bébé</th>
                                <th>Prix</th>
                                <th>Méthode de paiement</th>
                                <th>Genre de compagnie</th>
                                <th>Confort</th>
                                <th>Arrêts</th>
                                <th>Animaux autorisés</th>
                                <th>Réservation automatique</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trajets.map(trajet => (
                                <tr key={trajet.id}>
                                    <button className='Sup'onClick={() => handleDeleteTrajet(trajet.id)}></button>
                                    <td>{trajet.id}</td>
                                    <td>{trajet.origin}</td>
                                    <td>{trajet.destination}</td>
                                    <td>{trajet.idConducteur}</td>
                                    <td>{trajet.type}</td>
                                    <td>{new Date(trajet.date).toLocaleDateString()}</td>
                                    <td>{new Date(`1970-01-01T${trajet.time}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td>{trajet.seats}</td>
                                    <td>{trajet.babySeat}</td>
                                    <td>{trajet.price}</td>
                                    <td>{trajet.paymentMethod}</td>
                                    <td>{trajet.companyGender}</td>
                                    <td>{trajet.comfort_airConditioning ? 'Climatisation' : ''} {trajet.comfort_wifi ? 'Wifi' : ''} {trajet.comfort_music ? 'Musique' : ''}</td>
                                    <td>{trajet.stops}</td>
                                    <td>{trajet.petsAllowed}</td>
                                    <td>{trajet.autoReservation}</td>
                                    <td>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Trajet;
