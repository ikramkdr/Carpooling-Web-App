import './connecter.css';
import React, { useState } from 'react';
import axios from 'axios';

function Connecter() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/login', { email, password })
            .then(res => {
                if (res.data.status === 'success') {
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('userId', res.data.userId);
                    localStorage.setItem('userType', res.data.Type); // Store user type in local storage
                    switch (res.data.Type) {
                        case '1':
                            window.location.href = '/Accueil-reserver_Un_Trajet';
                            break;
                        case '2':
                            window.location.href = '/Accuiel_Publier_Un_Trajet';
                            break;
                        case '3':
                            window.location.href = '/admin';
                            break;
                        default:
                            setErrorMessage('Invalid user type.');
                    }
                } else {
                    setErrorMessage(res.data.message);
                }
            })
            .catch(err => {
                setErrorMessage('An error occurred. Please try again later.');
                console.log(err);
            });
    }

    return (
        <section id='conecter'>
            <div className='formulaire-de-connexion'>
                <h1>Se connecter à votre compte</h1>
                <h1 id='nameAPP'>EddU</h1>
                <p>Veuillez vous connecter pour accéder à votre compte.</p>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form id='conne' onSubmit={handleSubmit}>
                    <label htmlFor="email" id='emmm'><h4>Email</h4></label>
                    <input className='inputdistance' type="email" name="email" placeholder="Entrer votre email" onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="password"><h4>Mot de passe</h4></label>
                    <input className='inputdistance' type="password" name="password" placeholder="Entrer votre mot de passe" onChange={e => setPassword(e.target.value)} />
                    <br />
                    <a id="mdpoublier" href="/réinitialisation_mot_de_passe">mot de passe oublié?</a>
                    <br />
                    <input className='inputdistance' type="submit" id='boutonconnexion' value='Se connecter' />
                </form>
            </div>
            <p id='end'>Vous n'avez pas de compte? <a id='lien' href="/Type">Créez-en un !</a></p>
        </section>
    );
}

export default Connecter;
