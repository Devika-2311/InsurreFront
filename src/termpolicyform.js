import React, { useState, useContext } from 'react';
import Navbar1 from './navbar1';
import { AppContext } from './AppContext';
import axios from 'axios';
import './termpolicyform.css'; // Ensure to create a CSS file for styling

const TermPolicyForm = () => {
  const [annualIncome, setAnnualIncome] = useState('');
  const [anyDisease, setAnyDisease] = useState(false);
  const [nomineeName, setNomineeName] = useState('');
  const [nomineeRelation, setNomineeRelation] = useState('');
  const [nomineeEmail, setNomineeEmail] = useState('');
  const [nomineeProof, setNomineeProof] = useState(null);
  const { suserPolicyId } = useContext(AppContext);
  const [responseMessage, setResponseMessage] = useState('');

  const handleFileChange = (e) => {
    setNomineeProof(e.target.files[0]); // Update state with the selected file
  };
  console.log(suserPolicyId);

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('policyType', 'TERM');
    formData.append('annualIncome', annualIncome? Number(annualIncome) : null);
    formData.append('anyDisease', anyDisease);
    formData.append('nomineeName', nomineeName);
    formData.append('nomineeRelation', nomineeRelation);
    formData.append('nomineeEmail', nomineeEmail);
    formData.append('nomineeProof', nomineeProof); // Ensure this matches the backend
    formData.append('userPolicyId', suserPolicyId);
    console.log(formData);

    try {
      const response = await axios.post('http://localhost:8007/policy-documents/create/term', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      setResponseMessage('Policy document created successfully!');
    } catch (error) {
      console.error('Error creating policy document:', error);
      setResponseMessage('Error creating policy document.');
    }
  };

  return (
    <div>
      <Navbar1/>
      <div className="term-form-container">
        <h1 className="form-title">Term Insurance</h1>
        <p className="form-subtitle">Secure your future with a term insurance policy</p>
        <div className="form-content">
          <div className="form-left">
            <button className="purchase-request">Purchase Request</button>
            <img src={require('../src/images/userimages/purchaseimage.png')} alt="Term Insurance" className="form-image" />
          </div>
          <div className="form-right">
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Annual Income</label>
                <input type="number" className="form-input" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Any Disease</label>
                <div className="form-options">
                  <input type="radio" name="anyDisease" value="true" checked={anyDisease === true} onChange={() => setAnyDisease(true)} /> Yes
                  <input type="radio" name="anyDisease" value="false" checked={anyDisease === false} onChange={() => setAnyDisease(false)} /> No
                </div>
              </div>
              <div className="form-group">
                <label>Nominee Name</label>
                <input type="text" className="form-input" value={nomineeName} onChange={(e) => setNomineeName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Nominee Relation</label>
                <input type="text" className="form-input" value={nomineeRelation} onChange={(e) => setNomineeRelation(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Nominee Email</label>
                <input type="email" className="form-input" value={nomineeEmail} onChange={(e) => setNomineeEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Nominee Proof</label>
                <input type="file" className="form-input" onChange={handleFileChange} required />
              </div>
              
              <div className="form-group">
                <button type="submit" className="submit">Submit</button>
              </div>
            </form>
            {responseMessage && <div className="alert alert-info mt-4">{responseMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermPolicyForm;
