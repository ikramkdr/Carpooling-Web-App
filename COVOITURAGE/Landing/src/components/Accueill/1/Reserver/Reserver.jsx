import './Reserver.css';
import Sidebar from '../../../sideBar/sideBar';
import CustomMap2 from '../../../Map/CustomMap2';
import { APIProvider } from "@vis.gl/react-google-maps";
import React, { useState } from 'react';

import Person from '../../../../assets/person.svg';
import Avatar from "../../../../assets/Avatar.svg";
import Fromto from '../../../../assets/fromto.svg';

import NavigationBar from '../../Navigation';
import axios from 'axios';

function Reserver() {
    const username = localStorage.getItem('username') || '';






    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        seats: 0,
        paymentMethod: '',
        comfort_airConditioning: false,
        comfort_wifi: false,
        comfort_music: false,
        petsAllowed: false,
        babySeat: false,
    });


const handleReservation = async () => {
    try {
        const response = await axios.post('http://localhost:8081/api/reservation', {
            id_trj: selectedTrajet.id,
            id_pass: username,
            seats: formData.seats,
            babySeat: formData.babySeat,
            priceType: '', // Remplacez par la logique de tarification appropriée
            paymentMethod: formData.paymentMethod,
            petsAllowed: formData.petsAllowed,
            stops: selectedTrajet.stops,
            companyGender: selectedTrajet.companyGender,
            comfort_airConditioning: selectedTrajet.comfort_airConditioning,
            comfort_wifi: selectedTrajet.comfort_wifi,
            comfort_music: selectedTrajet.comfort_music,
            statut: 'En attente', // Remplacez par la logique de statut de réservation appropriée
          
        });
        console.log('Réservation créée:', response.data);

            // Mettre à jour l'état de la réservation pour désactiver le bouton
            setReservationSent(true);
        } catch (error) {
            console.error('Erreur lors de la création de la réservation:', error);
            // Afficher un message d'erreur
        }
    };
    const [results, setResults] = useState([]);
    const [selectedTrajet, setSelectedTrajet] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [reservationSent, setReservationSent] = useState(false); // Nouvel état pour suivre l'état de la réservation

    const handleIncrement = () => {
        setFormData(prevData => ({ ...prevData, seats: prevData.seats + 1 }));
    };
    
   

    const handleDecrement = () => {
        setFormData(prevData => ({ ...prevData, seats: prevData.seats - 1 }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/recherche', {
                origin: formData.origin,
                destination: formData.destination,
                numberOfSeats: formData.seats
            });
            setResults(response.data);
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
        }
    };

    const handleDetails = (trajet) => {
        setSelectedTrajet(trajet); // Mettre à jour l'état avec le trajet sélectionné
        setShowDetails(true); // Afficher les détails
    };

    const handleCloseDetails = () => {
        setShowDetails(false); // Masquer les détails
    };

    return (
        <section id='accueil'>
            <div className='right'>
                <div id='heeaderr'>
                    <h2>Accueil / Reserver un trajet</h2>
                    <NavigationBar />
                </div>
           <hr />
                <form className="trajet-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" name='origin' id='origin' placeholder='Origin' value={formData.origin} onChange={handleChange} />
                        <input type="text" id='destination' name='destination' placeholder='Destination' value={formData.destination} onChange={handleChange} />
                    </div>
                    <br /><br />
                    <div className="form-group">
                        <div className="number-input-container">
                            <label htmlFor="">Places à reserver </label>
                            <button type="button" className="number-button" onClick={handleDecrement}>-</button>
                            <input type="number" name='seats' className="number-input" value={formData.seats} onChange={handleChange} />
                            <button type="button" className="number-button" onClick={handleIncrement}>+</button>
                        </div>
                    </div>
                    <br />
                    <div className="form-" id='priix'>
                        <label htmlFor="paymentMethod"> Methode de paiement</label>
                        <select name="paymentMethod" id="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                            <option value="">méthode de paiement</option>
                            <option value="Carte">Carte</option>
                            <option value="En especes">En espèces</option>
                        </select>
                    </div>
                    <br /><br /><br />
                    <div className="form-group">
                        <label htmlFor="confort">Que Exigez vous ?</label>
                        <input type="checkbox" id="comfort_airConditioning" name="comfort_airConditioning" checked={formData.comfort_airConditioning} onChange={handleChange} />
                        <label htmlFor="comfort_airConditioning">Climatisation</label>
                        <input type="checkbox" id="comfort_music" name="comfort_music" checked={formData.comfort_music} onChange={handleChange} />
                        <label htmlFor="comfort_music">Musique</label>
                        <input type="checkbox" id="comfort_wifi" name="comfort_wifi" checked={formData.comfort_wifi} onChange={handleChange} />
                        <label htmlFor="comfort_wifi">Wifi</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="petsAllowed">Apportez vous un animal de compagnie ?</label>
                        <input type="checkbox" id="petsAllowed" name="petsAllowed" checked={formData.petsAllowed} onChange={handleChange} />
                        <br /><br /> 
                        <div id="babySea">
                            <label htmlFor="babySeat" id='siege'>Exigez vous un siège pour bébé ?</label>
                            <input type="checkbox" name="babySeat" checked={formData.babySeat} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit"id='boutton'>Rechercher</button>
                    </div>
                    <br /><br />
                    <hr />
                </form>

                <br />
                <div className="appp">
                    <APIProvider apiKey='AIzaSyCZh1osLfEaBPEwNZOrfI37ICjXuB8GnoA'>
                        <CustomMap2 />
                    </APIProvider>
                </div> 
               
                <div className="results">
                    {results.length > 0 ? (
                        results.map(trajet => (
                            <div className='Resultat' key={trajet.id}>
                                <p className="DATEES">{new Date(trajet.date).toLocaleDateString()}</p>
                                <button className="reserve" onClick={() => handleDetails(trajet)}>Details</button> 
                                <p className="times">{new Date(`1970-01-01T${trajet.time}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                <div className="FromToo"><img src={Fromto} alt="" /></div>
                                <p className="Origines">{trajet.origin}</p>
                                <p className="destinations">{trajet.destination}</p>
                                <p className="NbPlace">{trajet.seats}<img src={Person} alt="" /></p>
                                <hr />
                                <br />
                                <div id="avatar_containe"><img src={Avatar} alt="" /><br /><p>{trajet.idConducteur}</p></div>
                                <p id="prixx">{trajet.price} DA</p> 
                            </div>
                        ))
                    ) : (
                        <p>Aucun trajet trouvé.</p>
                    )}
                </div>
                {selectedTrajet && (
                <div className={`trajet-details ${showDetails ? 'show' : ''}`} onClick={handleCloseDetails}>
                    <div className="details-container" onClick={(e) => e.stopPropagation()}>
                       <button className="close-btn" onClick={handleCloseDetails}>X</button>
                            <h3>Détails du Trajet N° {selectedTrajet.id}</h3>
                            
                           
                        <br />
                        <p>Origine: {selectedTrajet.origin}</p>
                        <p>Destination: {selectedTrajet.destination}</p>
                        <p>Conducteur: {selectedTrajet.idConducteur}</p>
                        <p>Date: {new Date(selectedTrajet.date).toLocaleDateString()}</p>
                        <p>Heure: {new Date(`1970-01-01T${selectedTrajet.time}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p>Type: {selectedTrajet.type}</p>
                        <p>Places : {selectedTrajet.seats}</p>
                        <p>Siège bébé: {selectedTrajet.babySeat ? 'Oui' : 'Non'}</p>
                        <p>compagnie: {selectedTrajet.companyGender}</p>
                        <p>Climatisation: {selectedTrajet.comfort_airConditioning ? 'Oui' : 'Non'}</p>
                        <p>Wifi: {selectedTrajet.comfort_wifi ? 'Oui' : 'Non'}</p>
                        <p>Musique: {selectedTrajet.comfort_music ? 'Oui' : 'Non'}</p>
                        <p>Arrêts: {selectedTrajet.stops ? 'Oui' : 'Non'}</p>
                        <p>Animaux autorisés: {selectedTrajet.petsAllowed ? 'Oui' : 'Non'}</p>
                        <p id='Price'>Prix: {selectedTrajet.price} DA</p>
                        <button 
                            className={`Button ${reservationSent ? 'disabled' : ''}`} 
                            onClick={handleReservation} 
                            disabled={reservationSent}
                        >
                            {reservationSent ? 'Demande de réservation envoyée' : 'Demander une réservation'}
                        </button>  </div>
                    </div>
                )}
            </div>
            <div id='sidee'><Sidebar /></div>
        </section>
    );
}

export default Reserver;