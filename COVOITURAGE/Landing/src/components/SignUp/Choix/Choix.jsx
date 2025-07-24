import React from 'react';
import ConducteurImage from"../../../assets/POLICE.svg";
import PassagerImage from "../../../assets/IDK.svg";
import LogoImage from '../../../assets/LOGO.svg';
import './Choix.css'


function Choix({ nextStep }) {
  const handleChoice = (type) => {
    // Appeler la fonction nextStep avec le type choisi (Conducteur ou Passager)
    nextStep(type);
  };

  return (
    <div className="container">
      <img src={LogoImage} alt="Logo" className="logo" />
      <h1>Bienvenue à <span>XOXO</span></h1>
      <div>
        <a href="/Conducteur">
        <div className="Conducteur" >
          <img src={ConducteurImage} alt="" />
          <h4>Conducteur</h4>
          <p>Proposez des trajets sécurisés, conviviaux, respectez les horaires convenus.</p>
        </div></a>

        <div className="Passager" onClick={() => handleChoice('Passager')}>
          <img src={PassagerImage} alt="" />
          <h4>Passager</h4>
          <p>Trouvez des trajets, communiquez, respectez horaires convenus, partagez les coûts.</p>
        </div>
      </div>
    </div>
  );
}

export default Choix;
