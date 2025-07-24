import React from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { TbRoute } from "react-icons/tb";
import { MdFavoriteBorder, MdOutlinePayment, MdOutlineReport, MdOutlinePeopleOutline } from "react-icons/md";
import { BsChatRightDots } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import './SideBarAdmin.css'; 
import '../../sideBar/sideBar.css'
import logoo from '../../../assets/logo.svg'

function SidebarAdmin(i) {
    const nameApp = 'EddU';

    let Accueilm = "itemOn";
    let MesTrajets = 'itemOff';
    let Favories = 'itemOff';
    let Payement = 'itemOff';
 

    if (i === 1) {
        Accueilm = "itemOff";
        MesTrajets = 'itemOn';
    } else if (i === 2) {
        Accueilm = "itemOff";
        Favories = 'itemOn';
    } else if (i === 3) {
        Accueilm = "itemOff";
        Payement = 'itemOn';
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
                <a href="/admin"  className={Accueilm}>
                    <IoHomeOutline className='icon' />
                    Conducteur
                </a>
                <a href="/utilisateur" className={MesTrajets}>
                    <TbRoute className='icon' />
                    Utilisateur
                </a>
                <a href="/trajet" className={Favories}>
                    <MdFavoriteBorder className='icon' />
                    Trajet
                </a>
                <a href="/reclamationss" className={Payement}>
                    <MdOutlinePayment className='icon' />
                    Reclamation
                </a>
            </div>
            <div className='LogginOUT'>
                <a href="#" className='itemOff' onClick={deconexion}>
                    <TbLogout className='icon' />
                    Déconnexion
                </a>
            </div>
        </div>
    );
}

export default SidebarAdmin;
