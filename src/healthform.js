import React, { useState, useContext } from 'react';
import { AppContext } from './AppContext';
import axios from 'axios';
import './autoinsurance.css'; // Import styles similar to AutoInsurance (adjust as needed)
import Navbar1 from './navbar1';

const HealthPolicyForm = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [smoke, setSmoke] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [bp, setBp] = useState(false);
  const [diabetics, setDiabetics] = useState(false);
  const [criticalDisease, setCriticalDisease] = useState('');
  const [healthReport, setHealthReport] = useState(null);
  const { suserPolicyId } = useContext(AppContext);
  const [responseMessage, setResponseMessage] = useState('');

  const handleFileChange = (e) => {
    setHealthReport(e.target.files[0]); // Update state with the selected file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('policyType', 'HEALTH');
    formData.append('age', parseInt(age, 10));
    formData.append('height', parseFloat(height));
    formData.append('weight', parseFloat(weight));
    formData.append('smoke', smoke); // Convert Boolean to String
    formData.append('alcohol', alcohol); // Convert Boolean to String
    formData.append('bp', bp); // Assuming bp is correctly set
    formData.append('diabetics', diabetics); // Convert Boolean to String
    formData.append('criticalDisease', criticalDisease);
    formData.append('healthReport', healthReport); // Should be a File object
    formData.append('userPolicyId', suserPolicyId);

    try {
      const response = await axios.post('http://localhost:8007/policy-documents/create/health', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Policy document created successfully:', response.data); // Log response if needed
      setResponseMessage('Policy document created successfully!');
    } catch (error) {
      console.error('Error creating policy document:', error);
      setResponseMessage('Error creating policy document.');
    }
  };

  return (
    <div className="auto-policy-page">
      <Navbar1 />
      <div className="auto-policy-container">
        <div className="policy-info">
          <div className="premium-calculator">
            <h2 className="calculator-title">Health Policy Form</h2>
            <form className="form-main" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  className="form-control"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Weight(kg)</label>
                <input
                  type="number"
                  className="form-control"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Height(Inch)</label>
                <input
                  type="number"
                  className="form-control"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Do you Smoke?</label>
                <div className="form-options">
                  <input
                    type="radio"
                    name="smoke"
                    value="true"
                    checked={smoke === true}
                    onChange={() => setSmoke(true)}
                  />{' '}
                  Yes
                  <input
                    type="radio"
                    name="smoke"
                    value="false"
                    checked={smoke === false}
                    onChange={() => setSmoke(false)}
                  />{' '}
                  No
                </div>
              </div>
              <div className="form-group">
                <label>Do you consume alcohol?</label>
                <div className="form-options">
                  <input
                    type="radio"
                    name="alcohol"
                    value="true"
                    checked={alcohol === true}
                    onChange={() => setAlcohol(true)}
                  />{' '}
                  Yes
                  <input
                    type="radio"
                    name="alcohol"
                    value="false"
                    checked={alcohol === false}
                    onChange={() => setAlcohol(false)}
                  />{' '}
                  No
                </div>
              </div>
              <div className="form-group">
                <label>Do you have high B.P?</label>
                <div className="form-options">
                  <input
                    type="radio"
                    name="bp"
                    value="true"
                    checked={bp === 'true'}
                    onChange={() => setBp('true')}
                  />{' '}
                  Yes
                  <input
                    type="radio"
                    name="bp"
                    value="false"
                    checked={bp === 'false'}
                    onChange={() => setBp('false')}
                  />{' '}
                  No
                </div>
              </div>
              <div className="form-group">
                <label>Do you have high diabetes?</label>
                <div className="form-options">
                  <input
                    type="radio"
                    name="diabetics"
                    value="true"
                    checked={diabetics === true}
                    onChange={() => setDiabetics(true)}
                  />{' '}
                  Yes
                  <input
                    type="radio"
                    name="diabetics"
                    value="false"
                    checked={diabetics === false}
                    onChange={() => setDiabetics(false)}
                  />{' '}
                  No
                </div>
              </div>
              <div className="form-group">
                <label>Any other critical illness?</label>
                <textarea
                  className="form-control"
                  value={criticalDisease}
                  onChange={(e) => setCriticalDisease(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Upload Health Report</label>
                <input type="file" className="form-input" onChange={handleFileChange} required />
              </div>
              <div className="form-group">
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
              {responseMessage && (
                <div className="alert alert-info mt-4">{responseMessage}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthPolicyForm;