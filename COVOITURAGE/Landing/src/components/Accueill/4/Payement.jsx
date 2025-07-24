import React, { useState, useEffect } from 'react';
import Sidebar from '../../sideBar/sideBar';
import NavigationBar from '../Navigation';



import '../2/MesTrajets.css'; // Import the CSS for styling
import './Payement.css'

function Payement() {
   

    return (
        <div className="mes-trajets">
            <div className='sideB'>{Sidebar(3)}</div>
            <div className='content'>
                <div id='headerrTrajet'>
                    <h2 id='Titre'>Payement</h2>
                    <NavigationBar />
                </div>
                <hr />
               <section className='Card-info'>
              
                <div className="radio-group">
                               <label htmlFor="type">Methode de payement</label>
                               <br /><br />
                            <input type="radio" id="Edahabia" name="type" value="Edahabia"  />
                            <label htmlFor="Edahabia">Edahabia</label>
                            <input type="radio" id="CIB" name="type" value="CIB" />
                            <label htmlFor="CIB">CIB</label>
                            
                        </div><br />
                        <form >
                        <div className="form-group">
                        <label htmlFor="Nom titulaire de la carte">Votre Nom</label><br />
                        <input type="text" name='Nom titulaire de la carte' id='Nom-titulaire-de-la-carte' placeholder='Nom titulaire de la carte'  /><br />
                        <label htmlFor="Numero de la carte">Numero de la carte</label><br />
                        <input type="text" id='Numero-de-la-carte' name='Numero-de-la-carte' placeholder='1234  5678  9101  1121' /><br />
                        <div><label htmlFor="DateE">Date d'expiration</label><br />
                        <input type="text" name='DateE' id='DateE' placeholder='00/00' /></div>
                        <div className='Colled'>
                        <label htmlFor="CVC2/CVV2">CVC2/CVV2</label><br />
                        <input type="text" id='CVC2' name='CVC2/CVV2' placeholder='123' /></div>
                  
                    
                    </div>
                    <button className='ButtonPayer'>Payer 600 Da</button>
                        </form>
               </section>
               <section className='Trajet-à-payer'></section>
             
            </div>
        </div>
    );
}

export default Payement;
