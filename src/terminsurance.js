import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './lifeinsurance.css';
import trendinglogo from '../src/images/logosfolder/trendinglogo.png';
import termlogo from '../src/images/userimages/terminsurancemain.png';
 
const TermInsurance = ({ addPolicy }) => {
  const navigate = useNavigate();
 
 
  const handleBuyNowClick = () => {
    navigate('/term-policy-form');
  };
  const handleBuyNow = async () => {
    const policyData = {
      policyName: 'Term Insurance',
      policyDescription: 'Security that lasts a lifetime, for the ones you cherish',
      termsAndConditons: 'Term Period, Coverage, Premium, Renewals, Optional Riders'
    };
 
    try {
      const response = await axios.post('/api/policies', policyData);
      const policy = response.data;
      addPolicy({
        name: policy.policyName,
        image: termlogo
      });
      navigate('/mypolicies');
    } catch (error) {
      console.error('There was an error creating the policy!', error);
    }
  };
 
  return (
    <div>
      <div className="bodyt">
        <div className="buyterm">
          <h1>Term life Insurance Shield</h1>
          <p className="sub">Security that lasts a lifetime, for the ones you cherish</p>
          <p className="sub1">It provides coverage for a specific term and pays a benefit in the event of the insured's death during that term. It is designed to provide financial protection for your loved ones.</p>
          <img src={termlogo} alt="termlogo" className="termlogo" />
          <div className="trending-a">
            <img src={trendinglogo} alt="trendinglogo" className="trendinglogo" />
            <p className="trending">Trending</p>
          </div>
          <div className="tax-a">
            <p className="tax">Tax Saver</p>
          </div>
          <p className="terms">Terms and Conditions:</p>
          <ul className="items">
            <li>Term Period: Typically choose up the period to secure your loved ones after your demise.</li>
            <li>Coverage: Death benefit paid to beneficiaries if the insured dies during the term.</li>
            <li>Premium: Determined based on factors such as age, health conditions, term period and Optional Riders.</li>
            <li>Renewals: Renew your policy towards the end of term life for continued protection and peace of mind.</li>
          </ul>
          <p className="optional">Optional Riders</p>
          <ol className="items-1">
            <li>Accidental Death Benefit</li>
            <li>Critical Illness Rider</li>
            <li>Waiver of Premium</li>
          </ol>
          <button className="buynow" onClick={handleBuyNowClick}>Buy now</button>
        </div>
      </div>
    </div>
  );
}
 
export default TermInsurance;
 