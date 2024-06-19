import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './usercontext';
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
  const [driverLicense, setDriverLicense] = useState(null);
  const { suserPolicyId } = useContext(UserContext);
  const [responseMessage, setResponseMessage] = useState('');
 
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    const policyDocument = {
      policyType: 'AUTO',
      vehicleModelNo: vehicleModelNo,
      licensePlateNo: licensePlateNo,
      vehicleValue: parseFloat(vehicleValue),
      vehicleType: vehicleType,
      primaryUse: primaryUse,
      driverAge: parseInt(driverAge, 10),
      cheatSheet: cheatSheet,
      driverLicense: driverLicense,
      userPolicy:{userPolicyId:suserPolicyId}
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
                <label>Vehicle Price</label>
                <input type="number" className="form-input" value={vehicleValue} onChange={(e) => setVehicleValue(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Vehicle Type</label>
                <input type="text" className="form-input" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Primary Use</label>
                <select className="form-input" value={primaryUse} onChange={(e) => setPrimaryUse(e.target.value)} required>
                  <option value="">Select</option>
                  <option value="personal">Personal</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div className="form-group">
                <label>Driver's Age</label>
                <input type="number" className="form-input" value={driverAge} onChange={(e) => setDriverAge(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Upload Clear Sheet</label>
                <input type="file" className="form-input" onChange={(e) => setCheatSheet(e.target.files[0])} />
              </div>
              <div className="form-group">
                <label>Upload Driver License</label>
                <input type="file" className="form-input" onChange={(e) => setDriverLicense(e.target.files[0])} />
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