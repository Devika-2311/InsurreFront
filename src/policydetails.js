import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './policydetails.css';
import { useLocation, useNavigate } from 'react-router-dom';

function PolicyDetails() {
  const [newData, setNewData] = useState('');
  const [status, setStatus] = useState('');
  const [claimData, setClaimData] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { userpolicyId } = location.state || {};

  const handleViewClick = () => {
    navigate('/renew', { state: { userpolicyId } });
  };
  const handleClaimClick = () => {
    switch (newData.policy.policyId) {
      case 1:
        navigate('/autoclaim', { state: { userpolicyId } });
        break;
      case 2:
        navigate('/termclaim', { state: { userpolicyId } });
        break;
      case 3:
        navigate('/healthclaim', { state: { userpolicyId } });
        break;
      default:
        console.error('Invalid policy ID');
    }
  };
  const fetchUserPolicyData = async () => {
    if (!userpolicyId) {
      console.error('No policy ID provided');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8007/user-policies/${userpolicyId}`);
      setNewData(response.data); // Assuming response.data is the updated policy object
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user policy data:', error);
    }
  };

  const fetchClaimData = async () => {
    if (!userpolicyId) {
      console.error('No policy ID provided');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8007/health-claims/user-policies/${userpolicyId}`);
      setClaimData(response.data); // Assuming response.data is the updated policy object
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user policy data:', error);
    }
  };

  useEffect(() => { fetchUserPolicyData() }, [userpolicyId]);
  useEffect(() => { fetchClaimData() }, [userpolicyId]);

  return (
    <div className='base'>
      <div className="top">
        <div className="content">
          <p className='heading'>Policy Details</p>
          <div className="policy-details">
            <h2 className='elements' style={{ marginBottom: '0.5rem', marginTop: '0.5rem', textAlign: 'center' }}>Your Present Policy Details</h2>
            <div className='f1'>
              <p className='elements'><span style={{ fontWeight: 'bold' }}>Premium: </span>{newData.premium}</p>
              <p className='elements'><span style={{ fontWeight: 'bold' }}>Term Period: </span>{newData.term}</p>
            </div>
            <div className='f1'>
              <p className='elements'><span style={{ fontWeight: 'bold' }}>Coverage: </span>{newData.coverage}</p>
              <p className='elements'><span style={{ fontWeight: 'bold' }}>Left: </span>{newData.leftcoverage}</p>
            </div>
            <div className='f2'>
              <p className='elements'>StartDate: {newData.startDate}</p>
              <p className='elements'>EndDate: {newData.endDate}</p>
            </div>
          </div>
          {claimData?.length !== 0 ?
            <table>
              <thead>
                <tr>
                  <th>Claim No</th>
                  <th>Amount</th>
                  <th>Date of Service</th>
                </tr>
              </thead>
              <tbody>
                {claimData?.map((e, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.claimamt}</td>
                    <td>{e.dateofservice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            : <></>}
          <div className='buttt'>
            <button className='button1' onClick={handleViewClick}>Renew</button>
            <button className='button1' onClick={handleClaimClick}>Claim</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolicyDetails;
