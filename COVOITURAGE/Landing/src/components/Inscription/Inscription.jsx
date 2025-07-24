import React, { useState } from 'react';
import './Inscription.css';

function Inscription() {
    // Initialisation de l'état local pour les données du formulaire
    const [formData, setFormData] = useState({
        username: '',
        nom: '',
        prenom: '',
        date_de_naissance: '',
        Adresse: '',
        wilaya: '',
        commune: '',
        statut: '',
        genre: '',
        email: '',
        Téléphone: '',
        mot_de_passe_: '',
        Type: ''
    });

    // Fonction pour mettre à jour l'état local lorsque les champs du formulaire sont modifiés
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Fonction pour soumettre le formulaire lors de l'inscription
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Envoi de la requête POST au backend avec les données du formulaire
            const response = await fetch('http://localhost:8081/api/register-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Récupération de la réponse du backend
            const data = await response.json();
            console.log(data);
            // Rediriger vers /confirm si la création est réussie
            if (data.success) { 
                // Assurez-vous que votre backend envoie une réponse avec un indicateur de succès
            } else {
                // Gérer les erreurs ici
                window.location.href = '/confirm';
                console.error('Erreur lors de la création du compte:', data.message);

             
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
            // Gérer les erreurs ici
        }
    };

    return (
        <div className='totale'>
        <div className='Tou'>
            
            <div className="inscription-container">
                <h2>Créez votre compte EddU</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">UserName</label><br/><br/>
                    <input type="text" id='tarikh' name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                    <label htmlFor="">Nom</label><br/><br/>
                    <input type="text" id='tarikh' name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" />
                    <label htmlFor="">Prenom</label><br/><br/>
                    <input type="text" id='tarikh' name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" />
                     <label htmlFor="">Date de naissance</label><br/><br/>
                    <input type="date" className='Dt' id='tarikh' name="date_de_naissance" value={formData.date_de_naissance} onChange={handleChange} />
                    <label htmlFor="">Adresse</label><br/><br/>
                    <input type="text" id='tarikh' name="Adresse" value={formData.Adresse} onChange={handleChange} placeholder="Adresse" />
                     <label htmlFor="">Wilaya</label><br/><br/>
                    <input type="text" id='tarikh' name="wilaya" value={formData.wilaya} onChange={handleChange} placeholder="Wilaya" />
                     <label htmlFor="">Commune</label><br/><br/>
                    <input type="text" id='tarikh' name="commune" value={formData.commune} onChange={handleChange} placeholder="Commune" />
                    <label htmlFor="">Email</label><br/><br/>
                    <input type="email" id='tarikh' name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                    <label htmlFor="">Télephone</label><br/><br/>
                    <input type="text" id='tarikh' name="Téléphone" value={formData.Téléphone} onChange={handleChange} placeholder="Téléphone" />
                    <label htmlFor="">Statut</label><br/><br/>
                    <select id='tarikh' name="statut" value={formData.statut} onChange={handleChange}>
                        <option value="">Sélectionnez un statut</option>
                        <option value="étudiant">Étudiant</option>
                        <option value="employé">Employé</option>
                        <option value="retraité">Retraité</option>
                        <option value="non défini">Non défini</option>
                    </select>
                    <label htmlFor="">Genre</label><br/><br/>
                    <select name="genre" id='tarikh' value={formData.genre} onChange={handleChange}>
                        <option value="">Sélectionnez un genre</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                    </select>
                    <label htmlFor="">Type</label><br/><br/>
                    <select id='tarikh' className='hope' name="Type" value={formData.Type} onChange={handleChange}>
                        <option value="">Sélectionnez un type</option>
                        <option value="1">Passager</option>
                        <option value="2">Conducteur</option>
                    </select>
                    <button type="submit">S'inscrire</button>
                </form>
               
            </div>
        </div></div>
    );
}

export default Inscription;
