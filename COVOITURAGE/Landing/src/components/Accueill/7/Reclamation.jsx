import React, { useState } from 'react';
import Sidebar from "../../sideBar/sideBar";
import NavigationBar from "../Navigation";
import axios from 'axios';
import './Reclamation.css'
function Reclamation() {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCondId, setCurrentCondId] = useState(null);
    const [reclamationText, setReclamationText] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleSearch = () => {
        axios.get(`http://localhost:8081/api/search-conducteurs`, { params: { query: searchQuery } })
            .then(response => {
                setResults(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la recherche des conducteurs:', error);
            });
    };

    const handleOpenModal = (idCond) => {
        setCurrentCondId(idCond);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setReclamationText('');
    };
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem('userId');
            const response = await axios.post('http://localhost:8081/api/reclamations', { description, currentCondId, userId });
            console.log(response.data);
            setLoading(false);
            setDescription('');
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    return (
        <>
            <div className="mes-trajets">
                <div className='sideB'>{Sidebar(6)}</div>
                <div className='content'>
                    <div id='headerrTrajet'>
                        <h2 id='Titre'>Reclamations</h2>
                        <NavigationBar />
                    </div>
                    <hr />
                    <div className='search-container'>
                        <input 
                            type="text" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            placeholder="Rechercher par username, nom, prénom ou email" 
                        />
                        <button id='bouttonn' onClick={handleSearch}>Rechercher</button>
                    </div>
                    <div className="scrollable-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID Utilisateur</th>
                                    <th>Username</th>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map(user => (
                                    <tr key={user.Id_User}>
                                        <td>{user.Id_User}</td>
                                        <td>{user.username}</td>
                                        <td>{user.nom}</td>
                                        <td>{user.prenom}</td>
                                        <td>{user.email}</td>
                                        <td><button id='supprimer'onClick={() => handleOpenModal(user.Id_Cond)}>Reclamer</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Vous allez Reclamer sur le Conducteur N° {currentCondId}</h2>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Écrivez votre réclamation ici..." />
            <button id='SendingReclamation' onClick={handleSubmit} disabled={loading}>Envoyer</button>
            {error && <p>Erreur lors de l'envoi de la réclamation: {error}</p>}
                        <button id='AnnulerReclamation' onClick={handleCloseModal}>Annuler</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Reclamation;
