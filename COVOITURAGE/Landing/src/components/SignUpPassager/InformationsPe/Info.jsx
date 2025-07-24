// Importation des bibliothèques et des styles
import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import StepBar2 from '../StepBar2/SB2';
import './info.css'; // Assurez-vous que le chemin est correct

const InfoP = ({ nextStep, prevStep }) => {
  const wilayas = 
  [{"id":"1","code":"1","nom":"Adrar"},
   {"id":"2","code":"2","nom":"Chlef"},
    {"id":"3","code":"3","nom":"Laghouat"},
     {"id":"4","code":"4","nom":"Oum El Bouaghi"},
      {"id":"5","code":"5","nom":"Batna"},
       {"id":"6","code":"6","nom":"Bejaia"},
        {"id":"7","code":"7","nom":"Biskra"},
         {"id":"8","code":"8","nom":"Bzchar"},
          {"id":"9","code":"9","nom":"Blida"},
           {"id":"10","code":"10","nom":"Bouira"},
            {"id":"11","code":"11","nom":"Tamanrasset"},
             {"id":"12","code":"12","nom":"Tebessa"},
              {"id":"13","code":"13","nom":"Tlemcen"},
               {"id":"14","code":"14","nom":"Tiaret"},
                {"id":"15","code":"15","nom":"Tizi Ouzou"},
                 {"id":"16","code":"16","nom":"Alger"},
                  {"id":"17","code":"17","nom":"Djelfa"},
                   {"id":"18","code":"18","nom":"Jijel"},
                    {"id":"19","code":"19","nom":"Setif"},
                     {"id":"20","code":"20","nom":"Saida"},
                      {"id":"21","code":"21","nom":"Skikda"},
                       {"id":"22","code":"22","nom":"Sidi Bel Abbas"},
                        {"id":"23","code":"23","nom":"Annaba"},
                         {"id":"24","code":"24","nom":"Guelma"},
                          {"id":"25","code":"25","nom":"Constantine"},
                           {"id":"26","code":"26","nom":"Media"},
                            {"id":"27","code":"27","nom":"Mostaganem"},
                             {"id":"28","code":"28","nom":"M'Sila"},
                              {"id":"29","code":"29","nom":"Maascar"},
                               {"id":"30","code":"30","nom":"Ouargla"},
                                {"id":"31","code":"31","nom":"Oran"},
                                 {"id":"32","code":"32","nom":"El Bayadh"},
                                  {"id":"33","code":"33","nom":"Illizi"},
                                   {"id":"34","code":"34","nom":"Bordj Bou Arreridj"},
                                    {"id":"35","code":"35","nom":"Boumerdes"},
                                     {"id":"36","code":"36","nom":"El Tarf"},
                                      {"id":"37","code":"37","nom":"Tindouf"},
                                       {"id":"38","code":"38","nom":"Tissemsilt"},
                                        {"id":"39","code":"39","nom":"El Oued"},
                                         {"id":"40","code":"40","nom":"Khenchela"},
                                          {"id":"41","code":"41","nom":"Souk Ahras"},
                                           {"id":"42","code":"42","nom":"Tipaza"},
                                            {"id":"43","code":"43","nom":"Mila"},
                                             {"id":"44","code":"44","nom":"Ain Defla"},
                                              {"id":"45","code":"45","nom":"Naama"},
                                               {"id":"46","code":"46","nom":"Ain Timouchent"},
                                                {"id":"47","code":"47","nom":"Ghardaia"},
                                                 {"id":"48","code":"48","nom":"Relizane"}];

    const initialValues = {
        prenom: '',
        nom: '',
        dob: '',
        address: '',
        wilaya: '',
        commune: '',
        statut: '',
        genre: '',
        type: '1' // Valeur par défaut du type
    };

    const handleSubmit = (values, actions) => {
        console.log(values);
        nextStep(); // Passer à l'étape suivante
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting, isValid }) => (
                <Fragment>
                    <Form className="signup-container">
                        {StepBar2(1)} {/* Barre de progression */}
                        {/* Champs du formulaire */}
                        <div className='nom-prenom'>
                            {/* Champ Prénom */}
                            <div className="form-group">
                                <label htmlFor="prenom" className="label">Prenom</label>
                                <Field type="text" id="prenom" name="prenom" />
                                <ErrorMessage name="prenom" component="div" className="error-message" />
                            </div>
                            {/* Champ Nom */}
                            <div className="form-group">
                                <label htmlFor="nom" className="label">Nom</label>
                                <Field type="text" id="nom" name="nom"/>
                                <ErrorMessage name="nom" component="div" className="error-message" />
                            </div>    
                        </div>
                        {/* Champ Date de Naissance */}
                        <div className="form-group">
                            <label htmlFor="dob" className="label">Date de Naissance</label>
                            <Field type="date" id="dob" name="dob" />
                            <ErrorMessage name="dob" component="div" className="error-message" />
                        </div>
                        {/* Champ Adresse */}
                        <div className="form-group">
                            <label htmlFor="address" className="label">Adresse</label>
                            <Field type="text" id="address" name="address" />
                            <ErrorMessage name="address" component="div" className="error-message" />
                        </div>
                        {/* Champs Wilaya et Commune */}
                        <div className='wilaya-commune'>
                            {/* Champ Wilaya */}
                            <div className="form-group">
                                <div>  
                                    <label htmlFor="wilaya" className="label">Wilaya</label>
                                    <Field as="select" name="commune" id='wilaya'>
                                        {/* Option par défaut */}
                                        <option value="">-- Sélectionnez une wilaya --</option>
                                        {/* Ajouter les options pour chaque wilaya */}
                                        {wilayas.map(wilaya => (
                                            <option key={wilaya.id} value={wilaya.id}>{wilaya.nom}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="wilaya" component="div" className="error-message" />
                                </div>
                            </div>
                            {/* Champ Commune */}
                            <div className="form-group">
                                <label htmlFor="commune" className="label">Commune</label>
                                <Field as="select" id="commune" name="commune">
                                    <option value="">Sélectionnez une commune</option>
                                </Field>
                                <ErrorMessage name="commune" component="div" className="error-message" />
                            </div>
                        </div>
                        {/* Champ Statut */}
                        <div className="form-group statut">
                            <label className="label">Statut</label>
                            <div className='form-statut'>
                                <Field type="radio" id="etudiant" name="statut" value="etudiant" />
                                <label htmlFor="etudiant">Étudiant</label>
                                <Field type="radio" id="employe" name="statut" value="employe" />
                                <label htmlFor="employe">Employé</label>
                                <Field type="radio" id="nonDefini" name="statut" value="non_defini" />
                                <label htmlFor="nonDefini">Non défini</label>
                                <Field type="radio" id="retraite" name="statut"
                                value="retraite" />
                                <label htmlFor="retraite">Retraité</label>
                            </div>
                        </div>
                        {/* Champ Genre */}
                        <div className="form-group genre">
                            <label className="label">Genre</label>
                            <div className='form-genre'>
                                <Field type="radio" id="homme" name="genre" value="homme" />
                                <label htmlFor="homme">Homme</label>
                                <Field type="radio" id="femme" name="genre" value="femme" />
                                <label htmlFor="femme">Femme</label>
                            </div>
                        </div>
                        {/* Champ Type (ajouté) */}
                        <Field type="hidden" name="type" value="1" />

                        {/* Boutons "Suivant" et "Revenir" */}
                        <div className="button-container">
                            <button type="button" onClick={prevStep} className='btnRevenir'>Revenir</button>
                            <button type="submit" disabled={!isValid} className='btnSuivre'>Suivant</button>
                        </div>
                    </Form>
                </Fragment>
            )}
        </Formik>
    );
};

export default InfoP;
