import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './cm.css';
import StepBar from '../StepBar/StepBar';

function EmailVerificationForm({ email }) {
    const [codeInput, setCodeInput] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const verifyCode = (e) => {
        e.preventDefault();
        // Hardcoded for now, replace with actual verification logic
        const correctCode = '1234'; // Replace with the correct code received by the user
        if (codeInput === correctCode) {
            setIsVerified(true);
            alert('Code de vérification correct. Vous pouvez continuer.');
        } else {
            alert("Le code de confirmation est incorrect. Veuillez réessayer.");
        }
    };
    return (
        <section id='conecter'>
            <div className='formulaire-de-connexion'>
                <StepBar step={3} />
                <h1>Vérifiez votre email</h1>
                {!isVerified ? (
                    <>
                        <p>Entrez le code de vérification reçu par email à <strong>{email}</strong>.</p>
                        <form onSubmit={verifyCode}>
                            <label htmlFor="code"><h4>Code de Confirmation</h4></label>
                            <input
                                className='inputdistance'
                                type="text"
                                name="code"
                                placeholder="Entrer le code de confirmation"
                                value={codeInput}
                                onChange={(e) => setCodeInput(e.target.value)}
                            />
                            <br /><br />
                            <input className='inputdistance' type="submit" id='boutonconnexion' value='Vérifier' />
                        </form>
                    </>
                ) : (
                    <p>Votre email a été vérifié avec succès !</p>
                )}
            </div>
        </section>
    );
}

export default EmailVerificationForm;
