import React, { useState, useEffect } from 'react';
import SidebarAdmin from "../../SideBarAdmin/SideBarAdmin";
import NavigationBar from "../../../Accueill/Navigation";
import axios from 'axios';

function Utilisateur() {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [recherche, setRecherche] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/api/utilisateurs')
            .then(response => {
                setUtilisateurs(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            });
    }, []);

    const getTypeLabel = (type) => {
        switch (type) {
            case '0':
                return 'Passager';
            case '1':
                return 'Conducteur';
            case '3':
                return 'Admin';
            default:
                return 'Passager';
        }
    };

    const handleRechercheChange = (event) => {
        setRecherche(event.target.value);
    };

    const filteredUtilisateurs = utilisateurs.filter(utilisateur =>
        utilisateur.username.toLowerCase().includes(recherche.toLowerCase()) ||
        utilisateur.nom.toLowerCase().includes(recherche.toLowerCase()) ||
        utilisateur.prenom.toLowerCase().includes(recherche.toLowerCase()) ||
        utilisateur.wilaya.toLowerCase().includes(recherche.toLowerCase())
    );

    return (
        <div className="mes-trajets">
            {SidebarAdmin(1)}
            <div className='content'>
                <div id='headerrTrajet'>
                    <h2 id='Titre'>Utilisateurs</h2>
                    <NavigationBar />
                </div>
                <hr />
                
                <div>
                    <input id='barrecherche'
                        type="text"
                        placeholder="Filtrer par UserName/Nom/prenom/wilaya"
                        value={recherche}
                        onChange={handleRechercheChange}
                    />
                </div>
                
                <div className="scrollable-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Nom</th>
                                <th>Prénom</th>  
                                <th>Wilaya</th>
                                <th>Statut</th>
                                <th>Genre</th>
                                <th>Email</th>
                               
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUtilisateurs.length > 0 ? filteredUtilisateurs.map(utilisateur => (
                                <tr key={utilisateur.Id_User}>
                                    <td>{utilisateur.Id_User}</td>
                                    <td>{utilisateur.username}</td>
                                    <td>{utilisateur.nom}</td>
                                    <td>{utilisateur.prenom}</td>
                                    <td>{utilisateur.wilaya}</td>
                                    <td>{utilisateur.statut}</td>
                                    <td>{utilisateur.genre}</td>
                                    <td>{utilisateur.email}</td>
                                   
                                    <td>{getTypeLabel(utilisateur.Type)}</td>
                                </tr>
                            )) : <tr><td colSpan="13">Aucun utilisateur à afficher</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Utilisateur;
