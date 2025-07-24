import React, { Fragment, useState, useRef } from "react";
import "./Hero.css";
import Person from '../../../assets/person.svg';
import Calender from "../../../assets/calendar.svg";
import Near from "../../../assets/Near Me.svg";
import axios from 'axios';
import Loca from "../../../assets/location.svg";
import Side from "../../../assets/sideimg.svg";
import Avatar from "../../../assets/Avatar.svg"
import Fromto from '../../../assets/fromto.svg';
function Hero() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const pa = useRef();
  const currentDate = new Date();
  const date = currentDate.getDate().toString();
  const month = currentDate.getMonth();
  const day = currentDate.getDay();
  var days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samdi",
  ];
  var dayName = days[day];
  var Months = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Aout",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8081/search', {
        origin: origin,
        destination: destination,
        numberOfSeats: numberOfSeats
      });
      setSearchResult(response.data);
    } catch (error) {
      console.error('Une erreur s\'est produite:', error);
      setErrorMessage('Une erreur s\'est produite lors de la recherche.');
    }
  };

  var MonthName = Months[month];
  const hour = currentDate.getHours();
  const min = currentDate.getMinutes();

  return (
    <Fragment>
      <section id="landing">
        <div className='gauche'>
          
          <h3>EddU ! <br></br>Le covoiturage pour des Trajets conviviaux et économiques .</h3>
          <p>
            Si vous êtes fatigué des trajets solitaires en voiture et que vous
            souhaitez réduire vos frais de déplacement tout en préservant
            l'environnement, nous avons la solution pour vous !
          </p>
        </div>
        <div id="imgee"  >
          <img src={Side} alt="image"></img>
        </div>
        <div id="bar" ref={pa}>
          <div>
            <img src={Loca} alt="location" />
            <a href="">Origine</a>
            <p><input type="text" id="sear" placeholder="Entrer votre position"  value={origin} onChange={e => setOrigin(e.target.value)}/></p>
          </div>
          <div>
            <img src={Near} alt="Devant moi" />
            <a href="">Destination</a>
            <p><input type="text" id="sear" placeholder="Entrer votre destination" value={destination} onChange={e => setDestination(e.target.value)}/></p>
          </div>
          <div>
            <img src={Calender} alt="Date" />
            <a href="">Date</a>
            <p><input type="text" id="sear" placeholder= {dayName + " " + date + " " + MonthName + ", " + hour + ":" + min}  onChange={e => setdate(e.target.value)}/></p>
          </div>
          <div id="derniere">
            <img src={Person} alt="" />
            <a href="">Nombre</a>
            <p><input type="text" id="sear" placeholder="1" value={numberOfSeats} onChange={e => setNumberOfSeats(e.target.value)}/></p>
          </div>
          <button id='search' onClick={handleSearch}>Rechercher</button>
        </div>
      </section>
      {searchResult && (
        <div className="search-results">
           <h1 id="log">UddU</h1>
          
           <button id='hide'onClick={() => setSearchResult(null)}>X</button> {/* Ajouter ce bouton */}
          <h2 id="resultat">Recherche de trajets  </h2>
          <p>Pour de meilleurs resultats ,Connectez vous a votre compte !</p>
          <a href="/Connecter"><button  id="connecter"> Se connecter</button></a>
         <a href="/Type"> <button id="inscrire">S'inscrire</button></a>
         <br />
          {searchResult.length === 0 ? (
            <p>Aucun résultat trouvé.</p>
          ) : (
            <Fragment id='scrollici'>
             {searchResult.map((result, index) => (
  <div key={index} className="result-item">
        <p className="DATEE">{new Date(result.date).toLocaleDateString()}</p>
        <a href="/Connecter"><button className="reserver">Reserver</button></a> 

        <p className="time">{new Date(`1970-01-01T${result.time}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <div className="FromTo"><img src={Fromto} alt="" /></div>
        <p className="Origine">{result.origin}</p>
        <p className="destination">{result.destination}</p>
        <p className="NbPlaces">{result.seats}<img src={Person} alt="" /></p>
        <br /><br /><hr />
        <div id="avatar_container"><img src={Avatar} alt="" /><br /><p>{result.idConducteur}</p></div>
        <p id="prix">{result.price} DA</p> 

  
    
  </div>
))}


            </Fragment>
          )}
        </div>
      )}
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
    </Fragment>
  );
}

export default Hero;
