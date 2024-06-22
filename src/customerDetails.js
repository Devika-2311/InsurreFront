import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
 
function CustomerDetails() {
  const location = useLocation();
  const { selectedCustomer } = location.state;
 
  return (
    <div className="purchase-details">
      <h2>Policy Details</h2>
      <p>Policy ID: {selectedCustomer.policy.policyId}</p>
      <p>Policy Name: {selectedCustomer.policy.policyName}</p>
      <p>Policy Coverage: {selectedCustomer.coverage}</p>
      <p>Policy Start Date: {selectedCustomer.startDate}</p>
      <p>Policy End Date: {selectedCustomer.endDate}</p>
      <p>Policy Premium: {selectedCustomer.premium}</p>
      <p>Policy Premium Count: {selectedCustomer.premiumCount}</p>
      <p>Policy Premium Term: {selectedCustomer.premiumTerm}</p>
      <p>Policy Term: {selectedCustomer.term}</p>
     
    </div>
  );
}
 
export default CustomerDetails;