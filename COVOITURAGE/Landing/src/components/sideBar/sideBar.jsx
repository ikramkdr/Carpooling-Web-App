import React from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { TbRoute } from "react-icons/tb";
import { MdFavoriteBorder, MdOutlinePayment, MdOutlineReport, MdOutlinePeopleOutline } from "react-icons/md";
import { BsChatRightDots } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import './sidebar.css'; 
import logoo from '../../../src/assets/logo.svg';

function Sidebar(i) {
    const nameApp = 'EddU';

    let Accueilm = "itemOn";
    let MesTrajets = 'itemOff';
    let Favories = 'itemOff';
    let Payement = 'itemOff';
    let Messagerie = 'itemOff';
    let Communauté = 'itemOff';
    let Reclamation = 'itemOff';

    if (i === 1) {
        Accueilm = "itemOff";
        MesTrajets = 'itemOn';
    } else if (i === 2) {
        Accueilm = "itemOff";
        Favories = 'itemOn';
    } else if (i === 3) {
        Accueilm = "itemOff";
        Payement = 'itemOn';
    } else if (i === 4) {
        Accueilm = "itemOff";
        Messagerie = 'itemOn';
    } else if (i === 5) {
        Accueilm = "itemOff";
        Communauté = 'itemOn';
    } else if (i === 6) {
        Accueilm = "itemOff";
        Reclamation = 'itemOn';
    }

    function handleAccueilClick(event) {
        event.preventDefault();
        const userType = parseInt(localStorage.getItem('userType'), 10);


        console.log(`User type is: ${userType}`);
        if (userType === 1) {
            window.location.href = '/Accueil-reserver_Un_Trajet';
        } else if (userType === 2) {
            window.location.href = '/Accuiel_Publier_Un_Trajet';
        } else {
            console.error('Unknown user type');
        }
    }

    function deconexion(event) {
        event.preventDefault();
        localStorage.setItem('username', '');
        localStorage.setItem('userType', '');
        window.location.href = '/home';

        // Remplacer l'URL actuelle sans ajouter une nouvelle entrée dans l'historique
        window.history.replaceState(null, null, window.location.href);
    }

    return (
        <div className='menu'>
            <div className='logo-container'>
                <img id='logoimg' src={logoo} alt="" />
                <h2>{nameApp}</h2>
            </div>

            <div className='menu-list'>
                <a href="#" onClick={handleAccueilClick} className={Accueilm}>
                    <IoHomeOutline className='icon' />
                    Accueil
                </a>
                <a href="/MesTrajets" className={MesTrajets}>
                    <TbRoute className='icon' />
                    Mes trajets
                </a>
                <a href="/Favoris" className={Favories}>
                    <MdFavoriteBorder className='icon' />
                    Favoris
                </a>
                <a href="/Payement" className={Payement}>
                    <MdOutlinePayment className='icon' />
                    Payment
                </a>
                <a href="/Messagerie" className={Messagerie}>
                    <BsChatRightDots className='icon' />
                    Messagerie
                </a>
                <a href="/Communauté" className={Communauté}>
                    <MdOutlinePeopleOutline className='icon' />
                    Communauté
                </a>
                <a href="/Reclamations" className={Reclamation}>
                    <MdOutlineReport className='icon' />
                    Réclamation
                </a>
            </div>

            <div className='logout'>
                <a href="#" className='itemOff' onClick={deconexion}>
                    <TbLogout className='icon' />
                    Déconnexion
                </a>
            </div>
        </div>
    );
}

export default Sidebar;
