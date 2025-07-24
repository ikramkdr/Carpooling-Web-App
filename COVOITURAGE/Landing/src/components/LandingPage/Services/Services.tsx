import { Fragment } from 'react/jsx-runtime';
import './NosServices.css';
import S from "../../../assets/search.svg";
import Ticket from "../../../assets/ticket.svg";
import IM from "../../../assets/image.svg";
import Do from "../../../assets/dots.svg";
import H from "../../../assets/hand.svg";
import HS from "../../../assets/hands.svg";

function Services(){

    return(


    <section className='sectionn' >

    <h3>Nos Services</h3>
    <div id='passagerService'>
<div>
    <img src={S}alt="" />
    <h4>Trouver un trajet</h4>
    <p>Entrez votre origine et votre destination</p>
</div>
<hr />
<div>
    <img src={Ticket} alt="" />
    <h4>Réserver une place</h4>
    <p>Sécurisez votre siège en quelques clics</p>
</div>
<hr />
<div>
    <img src={IM}alt="" />
    <h4>Proffiter d'un trajet</h4>
    <p>Installez-vous confortablement, détendez-vous</p>
</div></div>
<div id='conducterService'>
    
<div>
    <img src={Do} alt="" />
    <h4>Publier un trajet</h4>
    <p>Entrez votre origine et votre destination</p>
</div>
<hr />
<div>
    <img src={H} alt="" />
    <h4>Recevoir des réservations</h4>
    <p> choisissez vos compagnons de route</p>
</div>
<hr />
<div>
    <img src={HS} alt="" />
    <h4>Rencontrer et conduire</h4>
    <p>démarrez le moteur de l'amitié, et parcourez la route</p>
</div>
</div>
</section>
);
}
export default Services;