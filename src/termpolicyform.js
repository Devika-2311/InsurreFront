import React, { useState, useContext } from 'react';
import Navbar1 from './navbar1';
import { UserContext } from './usercontext';
import axios from 'axios';
import './termpolicyform.css'; // Ensure to create a CSS file for styling
 
 
const TermPolicyForm = () => {
  const [annualIncome, setAnnualIncome] = useState('');
  const [anyDisease, setAnyDisease] = useState(false);
  const [nomineeName, setNomineeName] = useState('');
  const [nomineeRelation, setNomineeRelation] = useState('');
  const [nomineeEmail, setNomineeEmail] = useState('');
  const [nomineeProof, setNomineeProof] = useState('');
  const { suserPolicyId } = useContext(UserContext);
  const [responseMessage, setResponseMessage] = useState('');
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const policyDocument = {
      policyType: 'TERM',
      annualIncome: parseFloat(annualIncome),
      anyDisease: anyDisease,
      nomineeName: nomineeName,
      nomineeRelation: nomineeRelation,
      nomineeEmail: nomineeEmail,
      nomineeProof: nomineeProof,
      userPolicy:{userPolicyId:suserPolicyId}
    };
 
    try {
      const response = await axios.post('http://localhost:8006/policy-documents/create', policyDocument);
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
            <form onSubmit={handleSubmit}>
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
                <input type="text" className="form-input" value={nomineeProof} onChange={(e) => setNomineeProof(e.target.value)} required />
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
 