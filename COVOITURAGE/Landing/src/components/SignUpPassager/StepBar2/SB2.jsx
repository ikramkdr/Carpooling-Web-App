import React from 'react';
import './StepBar2.css';
function StepBar2(i){
  if (i==1 ){
    return (
      <div className="step-bar">
        <div className="On">1</div>
        <div className='activat_bar'></div>
        <div className="Off">2</div>
        <div className='activat_bar'></div>
        <div className="Off">3</div>
    
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
     
    
    </div>

    );}
    
  if (i==3 ){
    return (
      
      <div className="step-bar">
        <div className="On">1</div>
        <div className='activat_bar_On'></div>
        <div className="On">2</div>
        <div className='activat_bar_On'></div>
        <div className="On">3</div>
     
    
    </div>

    );}
};

export default StepBar2;
