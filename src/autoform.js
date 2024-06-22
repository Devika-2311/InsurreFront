import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from './AppContext';
import './autoPolicyForm.css'; // Assuming you have a CSS file for styling
import Navbar1 from './navbar1';

const AutoPolicyForm = () => {
  const [vehicleModelNo, setVehicleModelNo] = useState('');
  const [licensePlateNo, setLicensePlateNo] = useState('');
  const [vehicleValue, setVehicleValue] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [primaryUse, setPrimaryUse] = useState('');
  const [driverAge, setDriverAge] = useState('');
  const [cheatSheet, setCheatSheet] = useState(null);
  const { suserPolicyId } = useContext(AppContext);
  const [responseMessage, setResponseMessage] = useState('');

  const handleFileChange = (e) => {
    setCheatSheet(e.target.files[0]); // Update state with the selected file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('policyType', 'AUTO');
    formData.append('vehicleModelNo', vehicleModelNo);
    formData.append('licensePlateNo', licensePlateNo);
    formData.append('vehicleValue', vehicleValue ? Number(vehicleValue) : null);
    formData.append('primaryUse', primaryUse);
    formData.append('vehicleType', vehicleType);
    formData.append('driverAge', driverAge ? parseInt(driverAge, 10) : null);
    formData.append('cheatSheet', cheatSheet);
    formData.append('userPolicyId', suserPolicyId);

    try {
      const response = await axios.post('http://localhost:8007/policy-documents/create/auto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponseMessage('Policy document created successfully!');
    } catch (error) {
      console.error('Error creating policy document:', error);
      setResponseMessage('Error creating policy document.');
    }
  };

  return (
    <div>
      <Navbar1 />
      <div className="auto-form-container">
        <h1 className="form-title">Auto Insurance</h1>
        <p className="form-subtitle">Shielding your Journey with reliable coverage</p>
        <div className="form-content">
          <div className="form-left">
            <button className="purchase-request">Purchase Request</button>
            <img src={require('../src/images/userimages/purchaseimage.png')} alt="Auto Insurance" className="form-image" />
          </div>
          <div className="form-right">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Vehicle Model No</label>
                <input type="text" className="form-input" value={vehicleModelNo} onChange={(e) => setVehicleModelNo(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>License Plate No</label>
                <input type="text" className="form-input" value={licensePlateNo} onChange={(e) => setLicensePlateNo(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Vehicle Value</label>
                <input type="number" className="form-input" value={vehicleValue} onChange={(e) => setVehicleValue(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Primary Use</label>
                <input type="text" className="form-input" value={primaryUse} onChange={(e) => setPrimaryUse(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Vehicle Type</label>
                <input type="text" className="form-input" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Driver's Age</label>
                <input type="number" className="form-input" value={driverAge} onChange={(e) => setDriverAge(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Upload Cheat Sheet</label>
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

export default AutoPolicyForm;
