import "./faq.css";
import React, { Fragment, useEffect, useState, useRef } from "react";

import ArrowDown from "../../../assets/arrowdown.svg";
function FAQ() {
  const d1=useRef();
  const d2=useRef();
  const d3=useRef();
  const d4=useRef();
  const d5=useRef();
  const d6=useRef();
  const d7=useRef();
  
  const change1=()=>{
   if(d1.current.className=='question'){
    d1.current.classList.remove("question");
    d1.current.classList.add("RE"); return;}
   if(d1.current.className=='RE'){
    d1.current.classList.remove("RE");
    d1.current.classList.add("question"); return;
  }}

  const change2=()=>{
    if(d2.current.className=='question'){
     d2.current.classList.remove("question");
     d2.current.classList.add("RE"); return;}
    if(d2.current.className=='RE'){
     d2.current.classList.remove("RE");
     d2.current.classList.add("question"); return;
   }}

   const change3=()=>{
    if(d3.current.className=='question'){
     d3.current.classList.remove("question");
     d3.current.classList.add("RE"); return;}
    if(d3.current.className=='RE'){
     d3.current.classList.remove("RE");
     d3.current.classList.add("question"); return;
   }}

   const change4=()=>{
    if(d4.current.className=='question'){
     d4.current.classList.remove("question");
     d4.current.classList.add("RE"); return;}
    if(d4.current.className=='RE'){
     d4.current.classList.remove("RE");
     d4.current.classList.add("question"); return;
   }}

   const change5=()=>{
    if(d5.current.className=='question'){
     d5.current.classList.remove("question");
     d5.current.classList.add("RE"); return;}
    if(d5.current.className=='RE'){
     d5.current.classList.remove("RE");
     d5.current.classList.add("question"); return;
   }}

   const change6=()=>{
    if(d6.current.className=='question'){
     d6.current.classList.remove("question");
     d6.current.classList.add("RE"); return;}
    if(d6.current.className=='RE'){
     d6.current.classList.remove("RE");
     d6.current.classList.add("question"); return;
   }}

   const change7=()=>{
    if(d7.current.className=='question'){
     d7.current.classList.remove("question");
     d7.current.classList.add("RE"); return;}
    if(d7.current.className=='RE'){
     d7.current.classList.remove("RE");
     d7.current.classList.add("question"); return;
   }}
      
   
  return (
    <section className="sectionnn" >
      <h3>Vos questions</h3>
      <div className='question' ref={d1}>
        <img src={ArrowDown} onClick={change1}/>
        <p>Pour quoi nous choisir ?</p>
        <div className="REPh">
        Nous sommes votre meilleur choix pour le covoiturage en Algérie grâce à notre réseau étendu qui assure une disponibilité maximale des trajets. Notre priorité est votre sécurité, avec des contrôles rigoureux des conducteurs et des mécanismes de feedback pour maintenir la qualité du service. Vous économiserez considérablement sur vos trajets tout en contribuant à réduire l'empreinte carbone en partageant les véhicules. Notre application conviviale garantit une réservation simple et rapide, vous permettant de trouver et de partager des trajets en quelques clics.
        </div>
      </div>

      <div className="question" ref={d2}>
        <img src={ArrowDown} alt="" onClick={change2}/>
        <p>Y a-t-il des frais pour utiliser la plateforme?</p>
        <div id="REPh">Non, il n'y a pas de frais pour utiliser notre plateforme. L'inscription et l'utilisation de notre service de covoiturage sont entièrement gratuits. Nous voulons rendre le covoiturage aussi accessible que possible pour tout le monde, sans frais cachés.</div>
      </div>
      <div className="question" ref={d3}>
        <img src={ArrowDown} alt="" onClick={change3} />
        <p>
          Quelles sont les options de sécurité mises en place pour les
          utilisateurs?
        </p>
        <div id="REPh">La sécurité de nos utilisateurs est notre priorité absolue. Pour garantir leur protection, nous avons mis en place plusieurs mesures, notamment :<br/><br/>
1. Vérification des conducteurs : Nous effectuons des vérifications approfondies des antécédents des conducteurs, y compris leur permis de conduire, leur historique de conduite et leur assurance.<br/>
2. Système de notation et de commentaires : Les passagers peuvent évaluer et laisser des commentaires sur chaque trajet, ce qui contribue à maintenir la qualité du service et à signaler tout problème éventuel.<br/>
3. Confidentialité des données : Nous nous engageons à protéger les informations personnelles de nos utilisateurs conformément aux normes de confidentialité les plus strictes.
      </div></div>
      <div className="question" ref={d4}>
        <img src={ArrowDown} alt="" onClick={change4}/>
        <p>
          Quelles sont les règles concernant les bagages et les animaux de
          compagnie?
        </p>
        <div id="REPh">
        Chez nous, chaque conducteur a le pouvoir de définir ses propres règles concernant les bagages et les animaux de compagnie. Lors de la réservation, les passagers sont invités à indiquer leurs besoins spécifiques en matière de bagages et d'animaux de compagnie. Le conducteur peut alors accepter ou refuser en fonction de ses préférences. Cette flexibilité permet de s'assurer que chaque trajet répond aux attentes et aux besoins tant des conducteurs que des passagers.
        </div>
      </div>
      <div className="question" ref={d5}>
        <img src={ArrowDown} alt="" onClick={change5} />
        <p>Puis-je réserver un trajet pour plusieurs personnes?</p>
        <div id="REPh">Oui, vous pouvez réserver un trajet pour plusieurs personnes, sous réserve de la disponibilité de places dans le véhicule. Lors de la réservation, veuillez indiquer le nombre de personnes supplémentaires qui vous accompagneront. Le conducteur confirmera ensuite la disponibilité des places et pourra accepter votre réservation en conséquence.</div>
      </div>
      <div className="question" ref={d6}>
        <img src={ArrowDown} alt="" onClick={change6} />
        <p>
          Quelles sont les options en cas de panne ou d'urgence pendant le
          trajet?
        </p>
        <div id="REPh">Lorsque vous voyagez avec nous, votre sécurité est notre priorité absolue. En cas de panne ou d'urgence pendant le trajet, nous proposons un système de dépannage pour vous venir en aide rapidement. Vous pouvez contacter notre équipe d'assistance disponible 24h/24 et 7j/7 via notre application pour signaler tout problème. Nous mettrons alors tout en œuvre pour vous fournir une assistance immédiate et vous aider à reprendre votre voyage en toute sécurité.</div>
      </div>
      <div className="question" ref={d7}>
        <img src={ArrowDown} alt="" onClick={change7} />
        <p>Quelles informations dois-je fournir lors de l'inscription?</p>
        <div id="REPh">Lors de l'inscription, vous devrez fournir des informations de base telles que votre nom complet, une adresse e-mail valide, un numéro de téléphone et un mot de passe sécurisé. De plus, nous pourrions vous demander une photo de profil pour faciliter l'identification. Ces informations nous aident à créer votre compte et à vous offrir une expérience de covoiturage sécurisée et personnalisée.</div>
      </div>
    </section>
  );
  }
export default FAQ;
