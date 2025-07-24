import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

function MDPOUBLIER() {
    const nameApp = 'EddU';
    
    const [email, setEmail] = useState('');
    const [codeSent, setCodeSent] = useState('');
    const [codeInput, setCodeInput] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const checkEmailAndSendMail = (e) => {
        e.preventDefault();
        fetch('http://localhost:8081/check-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    sendMail();
                } else {
                    setErrorMessage("Email non trouvé. Veuillez réessayer.");
                }
            })
            .catch(error => {
                console.error('Error checking email:', error);
            });
    };

    const sendMail = () => {
        let code = Math.floor(1000 + Math.random() * 9000);
        setCodeSent(code);

        const serviceId = 'service_xunngob';
        const templateId = 'template_k25slfj';
        const publicKey = 'Z0rTp2TnBjnmC131P';
        const templateParams = {
            sender: nameApp,
            to: email,
            subject: 'Code de verification',
            message: 'Votre code de confirmation est : ' + code,
        };

        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log('Email sent successfully!', response);
                setIsCodeSent(true);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };

    const verifyCode = (e) => {
        e.preventDefault();
        if (codeInput === codeSent.toString()) {
            setIsVerified(true);
            setErrorMessage('');
        } else {
            setErrorMessage("Le code de confirmation est incorrect. Veuillez réessayer.");
        }
    };

    const updatePassword = (e) => {
        e.preventDefault();
        fetch('http://localhost:8081/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                newPassword: newPassword,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setPasswordUpdated(true);
                    alert("Mot de passe mis à jour avec succès !");
                    window.location.href = '/connecter';  // Rediriger vers la page de connexion
                } else {
                    setErrorMessage("Erreur lors de la mise à jour du mot de passe. Veuillez réessayer.");
                }
            })
            .catch(error => {
                console.error('Error updating password:', error);
            });
    };

    return (
        <section id='conecter'>
            <div className='formulaire-de-connexion'>
                <h1>Récupérez votre compte</h1>
                <h1 id='nameAPP'>{nameApp}</h1>
                {!isCodeSent ? (
                    <>
                        <p>Veuillez entrer votre adresse email.</p>
                        <form onSubmit={checkEmailAndSendMail}>
                            <label htmlFor="email"><h4>Email</h4></label>
                            <input
                                className='inputdistance'
                                type="email"
                                name="email"
                                placeholder="Entrer votre email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            <br /><br />
                            <input className='inputdistance' type="submit" id='boutonconnexion' value='Envoyer' />
                            <p>Vous n'avez pas votre email? <a id='lien' href="/ERROR">essayez une autre méthode !</a></p>
                        </form>
                    </>
                ) : !isVerified ? (
                    <>
                        <p>Un code de confirmation a été envoyé à votre email.</p>
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
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <p>Vous n'avez pas reçu de mail? <a id='lien' href="" onClick={checkEmailAndSendMail}>Renvoyer</a></p>
                    </>
                ) : !passwordUpdated ? (
                    <>
                        <p>Veuillez entrer votre nouveau mot de passe.</p>
                        <form onSubmit={updatePassword}>
                            <label htmlFor="newPassword"><h4>Nouveau mot de passe</h4></label>
                            <input
                                className='inputdistance'
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                placeholder="Entrer le nouveau mot de passe"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <br />
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label htmlFor="showPassword">Voir le mot de passe</label>
                            <br /><br />
                            <input className='inputdistance' type="submit" id='boutonconnexion' value='Mettre à jour le mot de passe' />
                        </form>
                    </>
                ) : (
                    <p>Votre mot de passe a été mis à jour avec succès !</p>
                )}
            </div>
        </section>
    );
}

export default MDPOUBLIER;
