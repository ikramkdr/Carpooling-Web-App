import React from 'react';
import './StepBar.css'; // Assurez-vous d'avoir les styles CSS nécessaires pour la barre d'étapes
import { Formik, Form, Field, ErrorMessage } from 'formik';
function StepBar(i){
  if (i==1 ){
    return (
      <div className="step-bar">
        <div className="On">1</div>
        <div className='activat_bar'></div>
        <div className="Off">2</div>
        <div className='activat_bar'></div>
        <div className="Off">3</div>
        <div className='activat_bar'></div>
        <div className="Off">4</div>
    
    </div>
  );
  }
  if (i==2 ){
    return (
      
      <div className="step-bar">
        <div className="On">1</div>
        <div className='activat_bar_On'></div>
        <div className="On">2</div>
        <div className='activat_bar'></div>
        <div className="Off">3</div>
        <div className='activat_bar'></div>
        <div className="Off">4</div>
    
    </div>

    );
  }
  if (i==3 ){
    return (
      
      <div className="step-bar">
        <div className="On">1</div>
        <div className='activat_bar_On'></div>
        <div className="On">2</div>
        <div className='activat_bar_On'></div>
        <div className="On">3</div>
        <div className='activat_bar'></div>
        <div className="Off">4</div>
    
    </div>
    );
  }
  

if (i==4 ){
  return (
    
    <div className="step-bar">
      <div className="On">1</div>
      <div className='activat_bar_On'></div>
      <div className="On">2</div>
      <div className='activat_bar_On'></div>
      <div className="On">3</div>
      <div className='activat_bar_On'></div>
      <div className="On">4</div>
  
  </div>
  );
}

};

export default StepBar;
