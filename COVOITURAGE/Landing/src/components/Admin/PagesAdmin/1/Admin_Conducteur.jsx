import React, { useState } from 'react';
import SidebarAdmin from "../../SideBarAdmin/SideBarAdmin";
import NavigationBar from "../../../Accueill/Navigation";
import axios from 'axios';
import './Admin_Conducteur.css';

function Admin_Conducteur() {
    const [conducteurs, setConducteurs] = useState([]);
    const [demande, setDemande] = useState([]);
    const [isComptesActive, setIsComptesActive] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [isDemandesCreationActive, setIsDemandesCreationActive] = useState(false);


    const handleFetchConducteurs = () => {
        setIsComptesActive(true);
        setIsDemandesCreationActive(false);

        axios.get('http://localhost:8081/api/conducteurs')
            .then(response => {
                setConducteurs(response.data);
                
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des conducteurs:', error);
            });
    };

    const handleFetchDemandesCreation = () => {
        setIsComptesActive(false);
        setIsDemandesCreationActive(true);
        axios.get('http://localhost:8081/api/conducteurs')
        .then(response => {
            setConducteurs(response.data);
            
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des conducteurs:', error);
        });
    };

    const handleDeleteConducteur = (Id_User) => {
        setUserIdToDelete(Id_User);
        setShowAlert(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:8081/api/utilisateur/${userIdToDelete}`)
            .then(response => {
                console.log(response.data.message);
                // Mettre à jour la liste des conducteurs après la suppression
                handleFetchConducteurs();
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du conducteur:', error);
            });
        setShowAlert(false);
    };

    const cancelDelete = () => {
        setShowAlert(false);
    };const handleValiderDemande = (userId) => {
        alert('aya bien'+userId);
        const nouvelEtatValide = 1; // Nouvelle valeur du champ valide
        axios.put(`http://localhost:8081/api/validationcompte/${userId}`, { valide: nouvelEtatValide })
            .then(response => {
                
                console.log(response.data.message); // Afficher un message indiquant que la demande a été validée avec succès
                // Mettez à jour l'état local pour refléter les modifications dans l'UI
                setConducteurs(conducteurs.map(conducteur => 
                    conducteur.Id_User === userId ? { ...conducteur, valide: nouvelEtatValide } : conducteur
                ));
            })
            .catch(error => {
                console.error('Erreur lors de la validation de la demande:', error);
            });
    };
    

    return (
        <div className="mes-trajets">
            <SidebarAdmin />
            <div className='content'>
                <div id='headerrTrajet'>
                    <h2 id='Titre'>Conducteurs</h2>
                    <NavigationBar />
                </div>
                <hr />
                <div>
                    <button className={`gestion ${isComptesActive ? 'active-button' : ''}`} onClick={handleFetchConducteurs}>Comptes</button>
                    <button className={`gestion ${isDemandesCreationActive ? 'active-button' : ''}`} onClick={handleFetchDemandesCreation}>Demandes création</button>
                </div>
                
                {isComptesActive && (
    <div className="scrollable-table">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>User Name</th>                    
                    <th>Email</th>
                    <th>Actions</th> {/* Nouvelle colonne pour les actions */}
                </tr>
            </thead>
            <tbody>
                {conducteurs.length > 0 ? conducteurs.map(conducteur => (
                      conducteur.valide==1 &&(
                    <tr key={conducteur.Id_User}>
                        <td>{conducteur.Id_User}</td>
                        <td>{conducteur.nom}</td>
                        <td>{conducteur.prenom}</td>
                        <td>{conducteur.username}</td>
                        <td>{conducteur.email}</td>
                        <td>
                            <button id='supprimer' onClick={() => handleDeleteConducteur(conducteur.Id_User)}>Supprimer</button>
                        </td>
                    </tr>)
                )) : <tr><td colSpan="5">Aucun conducteur à afficher</td></tr>}
            </tbody>
        </table>
    </div>
)}

{isDemandesCreationActive && (
    <div className="scrollable-table">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Télephone</th>
                    <th>Statut</th>
                    <th>Action</th> {/* Nouvelle colonne pour les actions */}
                </tr>
            </thead>
            <tbody>
                {conducteurs.length > 0 ? conducteurs.map(conducteur => (
                  conducteur.valide==0 &&(
                    <tr key={conducteur.Id_User}>
                        <td>{conducteur.Id_User}</td>
                        <td>{conducteur.nom}</td>
                        <td>{conducteur.prenom}</td>
                        <td>{conducteur.email}</td>
                        <td>{conducteur.Téléphone}</td> 
                        <td>{conducteur.statut}</td> 
                        <td>
                            <button id='valider' onClick={() => handleValiderDemande(conducteur.Id_User)}>Valider</button>
                        </td>
                    </tr>)
                )) : <tr><td colSpan="5">Aucune demande de création à afficher</td></tr>}
            </tbody>
        </table>
    </div>
)}


                {showAlert && (
                    <div className="alert-overlay">
                        <div className="alert-box">
                            <p className="alert-message">Êtes-vous sûr de vouloir supprimer ce conducteur définitivement?</p>
                            <div className="alert-buttons">
                                <button className="primary" onClick={confirmDelete}>Oui</button>
                                <button className="secondary" onClick={cancelDelete}>Non</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Admin_Conducteur;
