import React from 'react';
import './Cordo.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import StepBar2 from '../StepBar2/SB2';
const Cordo = ({ accountType, nextStep, prevStep }) => {
  const initialValues = {
    username: '',
    phone: '',
    smsCode: '',
    nationalId: '',
  };
  let MDPType='password';
  function changePSW(){
    if (MDPType=='password'){MDPType='Text';}
    else{
      MDPType='password'
    }
    
  }
  const handleSubmit = (values, actions) => {
    // Traitez la soumission du formulaire ici
    console.log(values);
    // Passer à l'étape suivante
    nextStep();
  };

let buttonLabel = "Suivant";
if (accountType === "Passager") {
  buttonLabel = "Enregistrer";
}


  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="signup-container">
{StepBar2(2)} 
          {/* Champs du formulaire */}
          <div className="form-group">
          
            <label htmlFor="username" className="label">Nom d'utilisateur</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="label">Numéro de téléphone</label>
            <Field type="tel" id="phone" name="phone" placeholder="+213" />
            <ErrorMessage name="phone" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="E-mail" className="label">E-mail</label>
            <Field type="email" id="E-mail" name="Email" placeholder="XXX@gmail.com"  />
            <ErrorMessage name="E-mail" component="div" className="error-message" />
          </div>
          
          <div className="form-group">
            <label htmlFor="Mdp" className="label">Mot de passe</label>
            <Field type={MDPType} id="mdp" name="MDP"  placeholder="********" />
            <ErrorMessage name="E-mail" component="div" className="error-message" />
          </div>
          <div id='checkk'> 
          <label htmlFor='checkbox'>Affiché le mot de passe</label>
          <input type="checkbox" id='checkbox' onClick={changePSW}/>
          </div>
        
          
          <div className="form-group">
            <label htmlFor="MdpConfirmation" className="label">Confirmer le Mot de passe</label>
            <Field type={MDPType} id="mdp" name="MDPConfirmation"  placeholder="********" />
            <ErrorMessage name="E-mail" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="nationalId" className="label">Carte nationale</label>
            <Field type="file" id="nationalId" name="nationalId" />
            <ErrorMessage name="nationalId" component="div" className="error-message" />
          </div>
          {/* Boutons "Suivant" et "Revenir" */}
          <div className="button-container">
              <a href="/Conducteur"><button type="button"  className='btnRevenir'>Revenir</button></a>
              <button type="submit" className='btnSuivre'><a href="/ConfirmationP">suivant</a></button>
            </div> </Form>
      )}
    </Formik>
  );
}
export default Cordo;
