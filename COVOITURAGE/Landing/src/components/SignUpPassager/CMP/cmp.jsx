import './cm2.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import StepBar2 from '../StepBar2/SB2';
function Cmp(){
return(
    <Formik>
<Form className="signup-container">
{StepBar2(3)} 
         
          <div className="form-group">
            <p>Veuillez s'il vous plait consulter votre boite de reception sur XXXX@gmail.com </p>
          <br /><br /><br />
          <div className='nono'>
          <label htmlFor="code" className="label">Le code de 4 chiffres</label>
            <Field type="text" id="code" name="code" />
            <ErrorMessage name="code" component="div" className="error-message" />
          </div>
          </div>
           {/* Boutons "Suivant" et "Revenir" */}
           <div className="button-container">
              <button type="submit" className='btnSuivre'><a href="/Accuiel_Publier_Un_Trajet">Finir</a></button>
            </div>
          </Form>
    </Formik>);
}
export  default Cmp;