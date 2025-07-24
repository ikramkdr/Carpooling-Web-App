import React, { useState, useEffect } from 'react';
import SidebarAdmin from "../../SideBarAdmin/SideBarAdmin";
import NavigationBar from "../../../Accueill/Navigation";
import axios from 'axios';

function ReclamationA() {
    const [reclamations, setReclamations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/Reclamationss')
            .then(response => {
                setReclamations(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            });
    }, []);

    const resoudreReclamation = (idReclamation) => {
        axios.put(`http://localhost:8081/api/reclamations/${idReclamation}`, { etat: 'Résolue' })
            .then(response => {
                // Mise à jour réussie, vous pouvez rafraîchir les données si nécessaire
                console.log('Réclamation résolue avec succès:', response.data);
                // Vous pouvez mettre à jour les données locales si nécessaire
                // Ou vous pouvez rafraîchir la page pour refléter les changements
            })
            .catch(error => {
                console.error('Erreur lors de la résolution de la réclamation:', error);
            });
    };

    return (
        <div className="mes-trajets">
            {SidebarAdmin(3)}
            <div className='content'>
                <div id='headerrTrajet'>
                    <h2 id='Titre'>Reclamation</h2>
                    <NavigationBar />
                </div>
                <hr />
                <div>
                    <h3>Liste des réclamations</h3>
                    <div className="scrollable-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID </th>
                                    <th>Id_Reclameur</th>
                                    <th>Id Conducteur</th>
                                    <th>Description</th>
                                    <th>État</th>
                                    <th>Priorité</th>
                                    <th>Email Réclameur</th>
                                    <th>Action</th>
                                    {/* Ajoutez d'autres en-têtes si nécessaire */}
                                </tr>
                            </thead>
                            <tbody>
                                {reclamations.map(reclamation => (
                                    <tr key={reclamation.id_reclam}>
                                        <td>{reclamation.id_reclam}</td>
                                        <td>{reclamation.Id_User}</td>
                                        <td>{reclamation.Id_Cond}</td>
                                        <td>{reclamation.description}</td>
                                        <td style={{ color: reclamation.etat === 'Résolue' ? 'green' : 'red' }}>{reclamation.etat}</td>
                                        <td>{reclamation.priorite}</td>
                                        <td>{reclamation.email}</td>
                                        <td>
                                            {reclamation.etat !== 'Résolue' && (
                                                <button id='Resoudre'onClick={() => resoudreReclamation(reclamation.id_reclam)}>Résoudre</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReclamationA;
