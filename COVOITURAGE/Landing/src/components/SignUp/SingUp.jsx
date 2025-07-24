import React, { useState } from 'react';
import StepBar  from './StepBar/StepBar';
import CoordonneesForm from './CoordonneesForm/CoordonneesForm';
import InformationForm from './InformationForm/InformationForm';
import VehiculeForm from './VehiculeForm/VehiculeForm';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [accountType, setAccountType] = useState('Conducteur');

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8081/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('User registered successfully');
      } else {
        alert('Failed to register user');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred while registering the user');
    }
  };

  return (
    <div className="signup">
      <StepBar step={step} />
      {step === 1 && <InformationForm nextStep={nextStep} prevStep={prevStep} userData={userData} setUserData={setUserData} />}
      {step === 2 && <CoordonneesForm nextStep={nextStep} prevStep={prevStep} userData={userData} setUserData={setUserData} />}
      {step === 3 && <VehiculeForm nextStep={handleSubmit} prevStep={prevStep} userData={userData} setUserData={setUserData} />}
    </div>
  );
};

export default Signup;
