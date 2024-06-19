import React, { useState ,useContext} from 'react';
import { UserContext } from './usercontext';
import axios from 'axios';
import './healthform.css';
import Navbar1 from './navbar1';
 
const HealthPolicyForm = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [smoke, setSmoke] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [bp, setBp] = useState('');
  const [diabetics, setDiabetics] = useState(false);
  const [criticalDisease, setCriticalDisease] = useState('');
  const [healthReport, setHealthReport] = useState('');
  const { suserPolicyId } = useContext(UserContext);
  const [responseMessage, setResponseMessage] = useState('');
 
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    const policyDocument = {
      policyType: 'HEALTH',
      age: parseInt(age, 10),
      height: parseFloat(height),
      weight: parseFloat(weight),
      smoke: smoke,
      alcohol: alcohol,
      bp: bp,
      diabetics: diabetics,
      criticalDisease: criticalDisease,
      healthReport: healthReport,
      userPolicy:{userPolicyId:suserPolicyId},
      policyType: 'HEALTH'
    };
 
    try {
      const response = await axios.post('http://localhost:8007/policy-documents/create', policyDocument);
      setResponseMessage('Policy document created successfully!');
    } catch (error) {
      console.error('Error creating policy document:', error);
      setResponseMessage('Error creating policy document.');
    }
  };
 
  return (
    <div>
      <Navbar1/>
      <div className="health-form-container">
        <h1 className="form-title">Health Insurance</h1>
        <p className="form-subtitle">Peace of mind that never expires, with every heartbeat</p>
        <div className="form-content">
          <div className="form-left">
            <button className="purchase-request">Purchase Request</button>
            <img src={require('../src/images/userimages/purchaseimage.png')} alt="Health Insurance" className="form-image" />
          </div>
          <div className="form-right">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Age</label>
                <input type="number" className="form-input" value={age} onChange={(e) => setAge(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Weight(kg)</label>
                <input type="number" className="form-input" value={weight} onChange={(e) => setWeight(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Height(Inch)</label>
                <input type="number" className="form-input" value={height} onChange={(e) => setHeight(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Do you Smoke?</label>
                <div className="form-options">
                  <input type="radio" name="smoke" value="true" checked={smoke === true} onChange={() => setSmoke(true)} /> Yes
                  <input type="radio" name="smoke" value="false" checked={smoke === false} onChange={() => setSmoke(false)} /> No
                </div>
              </div>
              <div className="form-group">
                <label>Do you consume alcohol?</label>
                <div className="form-options">
                  <input type="radio" name="alcohol" value="true" checked={alcohol === true} onChange={() => setAlcohol(true)} /> Yes
                  <input type="radio" name="alcohol" value="false" checked={alcohol === false} onChange={() => setAlcohol(false)} /> No
                </div>
              </div>
              <div className="form-group">
                <label>Do you have high B.P?</label>
                <div className="form-options">
                  <input type="radio" name="bp" value="true" checked={bp === 'true'} onChange={() => setBp('true')} /> Yes
                  <input type="radio" name="bp" value="false" checked={bp === 'false'} onChange={() => setBp('false')} /> No
                </div>
              </div>
              <div className="form-group">
                <label>Do you have high diabetes?</label>
                <div className="form-options">
                  <input type="radio" name="diabetics" value="true" checked={diabetics === true} onChange={() => setDiabetics(true)} /> Yes
                  <input type="radio" name="diabetics" value="false" checked={diabetics === false} onChange={() => setDiabetics(false)} /> No
                </div>
              </div>
              <div className="form-group">
                <label>Any other critical illness?</label>
                <textarea className="form-input" value={criticalDisease} onChange={(e) => setCriticalDisease(e.target.value)} required></textarea>
              </div>
              <div className="form-group">
                <button className="upload-report">Upload Health Report</button>
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
 
export default HealthPolicyForm;