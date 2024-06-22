import React, { useEffect, useState,useContext} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';

import './mypolicy.css';
 
const MyPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const policiesPerPage = 8; // Number of policies per page (3 rows of 4 cards each)
  const { suserId } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleViewClick = (userpolicyId) => {
    navigate('/policydetails', { state: { userpolicyId } });
  };
  const handlePayClick = (userpolicyId) => {
    navigate('/payment', { state: { userpolicyId } });
  };

 
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`http://localhost:8007/user-policies/user/${suserId}`);
        const initialPolicies = response.data;
        console.log(response.data);
        if (location.state && location.state.newPolicy) {
          initialPolicies.push(location.state.newPolicy);
        }
        console.log('Fetched policies:', initialPolicies);
        setPolicies(initialPolicies);
      } catch (error) {
        console.error('Error fetching policies:', error);
      }
    };
    if (suserId) {
        fetchPolicies();
      }
    }, [suserId], [location.state]);
 
   
 
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };
 
  const filteredPolicies = policies.filter(policy =>
    policy.status && policy.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  // Get current policies for pagination
  const indexOfLastPolicy = currentPage * policiesPerPage;
  const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage;
  const currentPolicies = filteredPolicies.slice(indexOfFirstPolicy, indexOfLastPolicy);
 
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  return (
    <div className="my-policies">
      <h2 className='h2'>Active Policies</h2>
      <input
        type="text"
        placeholder="Search by status..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar-small"
      />
      <div className="policy-cards">
        {currentPolicies.map(policy => (
          <div key={policy.userPolicyId} className="policy-card">
            {policy.policy ? (
              <>
                <h3>{policy.policy.policyType} Insurance</h3>
                <p>Policy Name: {policy.policy.policyName}</p> {/* Display the policy name */}
                <p>Status: {policy.status}</p>
                <p>Premium: ₹{policy.premium}</p>
                {policy.status === 'pending' ? (
                  <button className="status-pending">Status: Pending</button>
                ) : (
                  <>
                    <button className="buy-again"  onClick={() => handleViewClick(policy.userPolicyId)}>view</button>
                    <button className="pay-premium"  onClick={() => handlePayClick(policy.userPolicyId)}>Pay Premium</button>
                  </>
                )}
              </>
            ) : (
              <>
                <h3>Policy ID: {policy.userPolicyId}</h3>
                <p>Status: {policy.status}</p>
                <p>Premium: ₹{policy.premium}</p>
                <p>Policy data is missing</p>
              </>
            )}
          </div>
        ))}
      </div>
      {filteredPolicies.length > policiesPerPage && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredPolicies.length / policiesPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`page-link ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
 
export default MyPolicies;
 