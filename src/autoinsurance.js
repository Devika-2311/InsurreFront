import React from "react";
import { useNavigate } from 'react-router-dom';
import './lifeinsurance.css';
import trendinglogo from "../src/images/logosfolder/trendinglogo.png";
import termlogo from "../src/images/userimages/autoinsurancemain.png";
function AutoInsurance() {
    const navigate = useNavigate();
 
    const handleBuyNowClick = () => {
      navigate('/auto-policy-form');
    };
 
    return (
        <div>
        <div className="bodyt">
        <div className="buyterm">
        <h1>Auto Insurance Sheild</h1>
        <p className="sub">Sheilding your journey with reliable coverage</p>
        <p className="sub1">It provides financial protection against physical damage or bodily injury resulting from traffic collisions and against liability that could also arise from incidents in a vehicle.</p>
        <img src={termlogo} alt="termlogo" className="termlogo"/>
        <div className="trending-a">
        <img src={trendinglogo} alt="trendinglogo" className="trendinglogo"/>
        <p className="trending">Trending</p>
        </div>
        <div className="tax-a">
        <p className="tax">Tax Saver</p>
        </div>
        <p className="terms">Terms and Conditions:</p>
        <ul className="items">
          <li>Term Period: Typically choose up the period to shield your vehicle ( vary based on policy) .</li>
<li>Coverage: Comprehensive coverage including damage to the insured vehicle, liability for bodily injury or property damage and more.</li>
<li>Premium: Determined based on factors such as the type of vehicle, vehicle cost, driver's age, driving record,coverage limits and Optional Riders .</li>
<li>Renewals: Renew your policy towards the end of term life for continued protection and peace of mind.</li>
        </ul>
        <p className="optional">Optional Riders</p>
        <ol className="items-1">
          <li>Roadside Assistance</li>
<li>Zero Depreciation Cover</li>
<li>Engine Protection</li>
 
        </ol>
        <button className="buynow" onClick={handleBuyNowClick}>Buy now</button>
       
        </div>
        </div>
       
        </div>
      );
}
 
export default AutoInsurance;