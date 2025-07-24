import './Accueil.css';
import Sidebar from '../../../sideBar/sideBar';
import CustomMap from '../../../Map/CustomMap';
import { APIProvider } from "@vis.gl/react-google-maps";
import React, { useState } from 'react';

import NavigationBar from '../../Navigation';
import axios from 'axios';

function Accueil(){
    const username = localStorage.getItem('username') || '';

    const handleButtonClick = () => {
        window.location.href = '/Accueil-reserver_Un_Trajet';
    };


    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        idConducteur: username,  // Utiliser le nom d'utilisateur récupéré
        type: '',
        date: '',
        time: '00:00',
        seats: 0,
        babySeat: false,
        price: '',
        paymentMethod: '',
        companyGender: '',
        comfort_airConditioning: false,
        comfort_wifi: false,
        comfort_music: false,
        stops: false,
        petsAllowed: false,
        autoReservation: false
    });

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
            const response = await axios.post('http://localhost:8081/api/trajets', formData);
            alert('Trajet publié avec succès');
        } catch (error) {
            console.error('Erreur lors de la création du trajet:', error);
        }
    };

    return (
        <section id='accueil'>
            <div className='right'>
                <div id='headerrr'>
                    <h2>Accueil / Proposer un trajet</h2>
                <NavigationBar/>
                <button className='SwitchMode' onClick={handleButtonClick}>
                        Réserver
                    </button>
                </div>
                
                <form className="trajet-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" name='origin' id='origin' placeholder='Origin' value={formData.origin} onChange={handleChange} />
                        <input type="text" id='destination' name='destination' placeholder='Destination' value={formData.destination} onChange={handleChange} />
                    </div>
                    <br /><br />
                    <div className="form-group">
                     
                        <div className="radio-group">
                               <label htmlFor="type">Type du trajet</label>
                            <input type="radio" id="regulier" name="type" value="Regulier" checked={formData.type === 'Regulier'} onChange={handleChange} />
                            <label htmlFor="regulier">Régulier</label>
                            <input type="radio" id="occasionnel" name="type" value="Occasionnel" checked={formData.type === 'Occasionnel'} onChange={handleChange} />
                            <label htmlFor="occasionnel">Occasionnel</label>
                            <input type="radio" id="evenmentiel" name="type" value="Evenmentiel" checked={formData.type === 'Evenmentiel'} onChange={handleChange} />
                            <label htmlFor="evenmentiel">Événementiel</label>
                            <input type="radio" id="scolaire" name="type" value="Scolaire" checked={formData.type === 'Scolaire'} onChange={handleChange} />
                            <label htmlFor="scolaire">Scolaire</label>
                        </div></div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" placeholder='JJ/MM/AA' value={formData.date} onChange={handleChange} />
                        <label htmlFor="heure">Heure</label>
                        <input type="time" name="time" className="time-input" value={formData.time} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label id='place' htmlFor="seats">Places disponibles</label>
                        <div className="number-input-container">
                            <button type="button" className="number-button" onClick={handleDecrement}>-</button>
                            <input type="number" name='seats' className="number-input" value={formData.seats} onChange={handleChange} />
                            <button type="button" className="number-button" onClick={handleIncrement}>+</button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="" id='siege'>Siège pour bébé</label>
                        <input type="checkbox" id="babySeat" name="babySeat" checked={formData.babySeat} onChange={handleChange} />
                    </div>
                    <br />
                    <div className="form-group" id='priix'>
                        <label htmlFor="price">Prix</label>
                        <input type="text" name="price" id="price" placeholder='Le prix en DA' value={formData.price} onChange={handleChange} />
                  
                        <label htmlFor="paymentMethod">Paiement</label>
                        <select name="paymentMethod" id="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                            <option value="">méthode de paiement</option>
                            <option value="Carte">Carte</option>
                            <option value="En especes">En espèces</option>
                            <option value="Aleatoire">Les deux</option>
                        </select>
                    </div><br /><br /><br />
                    <div className="form-group">
                        <label htmlFor="companyGender">Accompagnement genre</label>
                        <select name="companyGender" id="companyGender" value={formData.companyGender} onChange={handleChange}>
                            <option value=""> genre de l'accompagnement</option>
                            <option value="Homme">Homme</option>
                            <option value="Femme">Femme</option>
                            <option value="Aleatoire">Les deux</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confort">Le confort de la voiture</label>
                        <input type="checkbox" id="comfort_airConditioning" name="comfort_airConditioning" checked={formData.comfort_airConditioning} onChange={handleChange} />
                        <label htmlFor="comfort_airConditioning">Climatisation</label>
                        <input type="checkbox" id="comfort_music" name="comfort_music" checked={formData.comfort_music} onChange={handleChange} />
                        <label htmlFor="comfort_music">Musique</label>
                        <input type="checkbox" id="comfort_wifi" name="comfort_wifi" checked={formData.comfort_wifi} onChange={handleChange} />
                        <label htmlFor="comfort_wifi">Wifi</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="stops">Arrêts prévus en cours du trajet</label>
                        <input type="checkbox" id="stops" name="stops" checked={formData.stops} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="petsAllowed">Animal de compagnie autorisé</label>
                        <input type="checkbox" id="petsAllowed" name="petsAllowed" checked={formData.petsAllowed} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="autoReservation">Validation des réservations automatique</label>
                        <input type="checkbox" id="autoReservation" name="autoReservation" checked={formData.autoReservation} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" id='bouton'>Ajouter l'annonce</button>
                    </div>
                </form>
                
                <div className="app">
                    <APIProvider apiKey='AIzaSyCZh1osLfEaBPEwNZOrfI37ICjXuB8GnoA'>
                        <CustomMap />
                    </APIProvider>
                </div>
            </div>
            
            <Sidebar />
        </section>
    );
}

export default Accueil;
