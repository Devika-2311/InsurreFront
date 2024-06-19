import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import logo1 from '../src/images/logosfolder/phone.png';
import './healthclaim.css';

function HealthClaim() {
  const [diseaseOccured, setDiseaseOccured] = useState('');
  const [dateOfService, setDateOfService] = useState('');
  const [hospName, setHospName] = useState('');
  const [drCharge, setDrCharge] = useState('');
  const [hostAdd, setHostAdd] = useState('');
  const [claimAmt, setClaimAmt] = useState('');
  const location = useLocation();
  const { userpolicyId } = location.state || {};

  const healthClaimData = {
    disease: diseaseOccured,
    dateofservice: dateOfService + 'T10:00:00',
    hospitalname: hospName,
    doctorincharge: drCharge,
    address: hostAdd,
    claimamt: claimAmt,
    status: 'Pending',
    userPolicy: {
      userPolicyId: userpolicyId,
    },
  };

  const submitData = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8007/health-claims/create',
        healthClaimData
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="top3">
      <div className="HealthText">
        <p id="auto">Health Insurance</p>
        <p id="msg">Peace of mind that never expires, with every heartbeat</p>
      </div>
      <div className="claimform3">
        <h4>Claim Request</h4>
        <div className="claimformlevel1">
          <div className="claimformlevel2">
            <label>Disease Occurred</label>
            <input
              type="text"
              className="textfield3"
              onChange={(e) => setDiseaseOccured(e.target.value)}
            ></input>
          </div>
          <div className="claimformlevel2">
            <label>Date Of Service</label>
            <input
              type="date"
              className="textfield3"
              onChange={(e) => setDateOfService(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="claimformlevel1">
          <div className="fl">
            <div className="claimformlevel2">
              <label>Hospital Name</label>
              <input
                type="text"
                className="textfield3"
                onChange={(e) => setHospName(e.target.value)}
              ></input>
            </div>
            <div className="claimformlevel2">
              <label>Doctor Incharge</label>
              <input
                type="text"
                className="textfield3"
                onChange={(e) => setDrCharge(e.target.value)}
              ></input>
            </div>
            <div className="claimformlevel2">
              <label>Claim Amount</label>
              <input
                type="text"
                className="textfield3"
                onChange={(e) => setClaimAmt(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="claimformlevel2">
            <label>Hospital Address</label>
            <textarea
              className="textarea1"
              onChange={(e) => setHostAdd(e.target.value)}
            ></textarea>
          </div>
        </div>
        <img src={logo1} alt="Logo1" className="img1"></img>
        <div className="but">
          <button style={{ width: 'fit-content' }}>Upload Medical Bill</button>
          <button
            style={{ marginTop: '2%', width: 'fit-content' }}
            onClick={() => submitData()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default HealthClaim;
