import React from 'react';
import './VehiculeForm.css'; // Assurez-vous de créer ce fichier CSS pour styliser le formulaire si nécessaire
import { Formik, Form, Field, ErrorMessage } from 'formik';
import StepBar from '../StepBar/StepBar';
const VehiculeForm = ({ nextStep, prevStep }) => {
  const initialValues = {
    immatriculation: '',
    marque: '',
    annee: '',
    couleur: '',
    modele: '',
    permis: '',
    carteGrise: ''
  };

  const handleSubmit = (values, actions) => {
    // Traitez la soumission du formulaire ici
    console.log(values);
    // Passer à l'étape suivante
    nextStep();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="signup-container">
{StepBar(3)}         
  <div className="form-group">
            <label htmlFor="immatriculation" className="label">Numéro d'immatriculation</label>
            <Field type="text" id="immatriculation" name="immatriculation" />
            <ErrorMessage name="immatriculation" component="div" className="error-message" />
          </div>

        <div className='marque-annee'>
        <div className="form-group">
            <label htmlFor="marque" className="label">Marque</label>
            <Field type="text" id="marque" name="marque" />
            <ErrorMessage name="marque" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="annee" className="label">Année</label>
            <Field type="text" id="annee" name="annee" />
            <ErrorMessage name="annee" component="div" className="error-message" />
          </div>
        </div>
          
        <div className='couleur-modele'>
        <div className="form-group">
            <label htmlFor="couleur" className="label">Couleur</label>
            <Field type="text" id="couleur" name="couleur" />
            <ErrorMessage name="couleur" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="modele" className="label">Modèle</label>
            <Field type="text" id="modele" name="modele" />
            <ErrorMessage name="modele" component="div" className="error-message" />
          </div>
        </div>
         

          <div className="form-group">
            <label htmlFor="permis" className="label">Permis de conduire</label>
            <Field type="file" id="permis" name="permis" />
            <ErrorMessage name="permis" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="carteGrise" className="label">Carte grise</label>
            <Field type="file" id="carteGrise" name="carteGrise" />
            <ErrorMessage name="carteGrise" component="div" className="error-message" />
          </div>

          {/* Boutons "Suivant" et "Revenir" */}
          <div className="button-container">
             <a href="/Coordonnees"><button type="button"  className='btnRevenir'>Revenir</button></a>
             <button type="submit"  className='btnSuivre'><a href="/Confirmation">Suivant</a></button>
           </div>
        </Form>
      )}
    </Formik>
  );
};

export default VehiculeForm;

