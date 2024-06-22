import React ,{useState,useContext} from "react";
import { useNavigate } from 'react-router-dom';
import './autoinsurance.css';
import axios from 'axios';
import { AppContext } from './AppContext';
import trendinglogo from "../src/images/logosfolder/trendinglogo.png";
import termlogo from "../src/images/userimages/autoinsurancemain.png";
function AutoInsurance() {
    
     
   

      const [vehicleValue, setVehicleValue] = useState('');
      const [coverageType, setCoverageType] = useState('BASIC');
      const [driverAge, setDriverAge] = useState('');
      const [vehicleAge, setVehicleAge] = useState('');
      const [primaryUse, setPrimaryUse] = useState('');
      const [roadsideAssistance, setRoadsideAssistance] = useState(false);
      const [zeroDepreciation, setZeroDepreciation] = useState(false);
      const [engineProtection, setEngineProtection] = useState(false);
      const [paymentFrequency, setPaymentFrequency] = useState('annually');
      const [premiumResult, setPremiumResult] = useState('');
      const [idvResult, setIDVResult] = useState('');
      const [showModal, setShowModal] = useState(false);
      const { suserId, suserPolicyId, setUserPolicyId } = useContext(AppContext);
  const navigate = useNavigate();
 
    const handleBuyNowClick = () => {
      navigate('/auto-policy-form');
    };
      const calculatePremium = () => {
        let primaryUses = document.getElementById('primaryUse').value;
        const basePremium = coverageType === 'BASIC' ? 5000 : coverageType === 'STANDARD' ? 15000 : 25000;
       
        let UseFactor = (primaryUses === 'commercial') ? 0.15 : 0.05;

        let adjustedPremium = basePremium  + (basePremium * UseFactor);
     
        if (roadsideAssistance) adjustedPremium += 2000;
        if (zeroDepreciation) adjustedPremium += 3000;
        if (engineProtection) adjustedPremium += 1000;
     
        const frequencyMultiplier = paymentFrequency === 'annually' ? 1 : paymentFrequency === 'half-yearly' ? 0.5 : paymentFrequency === 'quarterly' ? 0.25 : 0.083;
        const finalPremium = adjustedPremium * frequencyMultiplier;
     
        setPremiumResult(`${finalPremium.toFixed(2)}`);
      
      };
      const calculateIDV = () => {
        let exShowroomPrice = parseFloat(document.getElementById('vehicleValue').value);
        let vehicleAge = parseInt(document.getElementById('vehiclege').value);

        let depreciationRate = 0.50;

        if (vehicleAge <= 0.5) {
            depreciationRate = 0.05;
        } else if (vehicleAge <= 1) {
            depreciationRate = 0.15;
        } else if (vehicleAge <= 2) {
            depreciationRate = 0.20;
        } else if (vehicleAge <= 3) {
            depreciationRate = 0.30;
        } else if (vehicleAge <= 4) {
            depreciationRate = 0.40;
        }

        let idv = exShowroomPrice * (1 - depreciationRate);

        setIDVResult(idv.toFixed(2));
    };
     
      const handleSave = () => {
        
  const currentDate = new Date();
  const formattedStartDate = currentDate.toISOString();
  
  // Convert formattedStartDate to a Date object
  const StartDate = new Date(formattedStartDate);
  
  // Calculate endDate: Add one year to startDate
  const endDate = new Date(StartDate);
  endDate.setFullYear(StartDate.getFullYear() + 1);
  
 
        const dataToSave = {
          coverage: idvResult, 
          term: 1,
          premiumTerm: document.getElementById('paymentFrequency').value,
          premium: premiumResult,
          premiumCount: 0,
          startDate: StartDate,
          endDate: endDate ,
          status: "pending",
          leftcoverage:0,
          policy: { policyId: 1 },
          user:{userId:suserId},
        };
        console.log('suserId:', suserId);
        console.log('premiumResult:', premiumResult);
      
        axios.post('http://localhost:8007/user-policies/create', dataToSave)
          .then(response => {
            console.log('Full response:', response);
            // Ensure this matches your response structure
            console.log('Extracted policyId:', response.data);
            setUserPolicyId(response.data);
            console.log('suserPolicyId after setUserPolicyId:', response.data);
             // Log the value right after setting it
          })
          .catch(error => {
            console.error('Error saving data:', error.response?.data || error.message);
          });
        setShowModal(false);
        alert("Data saved successfully!");
      };
     
      return (
        <div className="auto-policy-page">
          <div className="auto-policy-container">
            <div className="policy-info">
              <h2>Auto Insurance Shield</h2>
              <p className="subtitle">Shielding your journey with reliable coverage</p>
              <p>It provides financial protection against physical damage or bodily injury resulting from traffic collisions and against liability that could also arise from incidents in a vehicle.</p>
              <div className="badges">
                <div className="badge">Trending</div>
                <div className="badge">Tax Saver</div>
              </div>
              <h3>Terms and Conditions:</h3>
              <ul>
                <li>Term Period: Typically choose up the period to shield your vehicle (vary based on policy).</li>
                <li>Coverage: Comprehensive coverage including damage to the insured vehicle, liability for bodily injury or property damage and more.</li>
                <li>Premium: Determined based on factors such as the type of vehicle, vehicle cost, driver's age, driving record, coverage limits, and Optional Riders.</li>
                <li>Renewals: Renew your policy towards the end of term life for continued protection and peace of mind.</li>
              </ul>
              <h3>Optional Riders:</h3>
              <ul>
                <li>Roadside Assistance</li>
                <li>Zero Depreciation Cover</li>
                <li>Engine Protection</li>
              </ul>
              <button className="buy-now-button" onClick={handleBuyNowClick}>Buy Now</button>
            </div>
            <div className="premium-calculator">
              <h2 className="calculator-title">Premium Calculator</h2>
              <form className="form-main">
                <div className="form-group">
                  <label htmlFor="vehicleValue">Vehicle Value (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="vehicleValue"
                    value={vehicleValue}
                    onChange={(e) => setVehicleValue(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="coverageType">Coverage Type</label>
                  <select
                    className="form-control"
                    id="coverageType"
                    value={coverageType}
                    onChange={(e) => setCoverageType(e.target.value)}
                    required
                  >
                    <option value="BASIC">Basic</option>
                    <option value="STANDARD">Standard</option>
                    <option value="COMPREHENSIVE">Comprehensive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="vehicleAge">vehicleAge</label>
                  <input
                    type="number"
                    className="form-control"
                    id="driverAge"
                    value={vehicleAge}
                    onChange={(e) => setVehicleAge(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="primaryUse">Primary Use</label>
                  <select
                    className="form-control"
                    id="primaryUse"
                    value={primaryUse}
                    onChange={(e) => setPrimaryUse(e.target.value)}
                    required
                  >
                    <option value="personal">Personal</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Optional Riders</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="roadsideAssistance"
                      checked={roadsideAssistance}
                      onChange={(e) => setRoadsideAssistance(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="roadsideAssistance">
                      Roadside Assistance
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="zeroDepreciation"
                      checked={zeroDepreciation}
                      onChange={(e) => setZeroDepreciation(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="zeroDepreciation">
                      Zero Depreciation
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="engineProtection"
                      checked={engineProtection}
                      onChange={(e) => setEngineProtection(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="engineProtection">
                      Engine Protection
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="paymentFrequency">Payment Frequency:</label>
                  <select
                    className="form-control"
                    id="paymentFrequency"
                    value={paymentFrequency}
                    onChange={(e) => setPaymentFrequency(e.target.value)}
                  >
                    <option value="annually">Annually</option>
                    <option value="half-yearly">Half-Yearly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="button-group">
                  <button type="button" className="calculate-button" onClick={() => { calculatePremium(); calculateIDV(); }}>
                    Calculate Premium
                  </button>
                  <button type="button" className="save-button" onClick={() => setShowModal(true)}>
                    Save
                  </button>
                </div>
                {premiumResult && (
            <div className="premium-result">
              Heyoo!! Here is your calculated premium is ₹{premiumResult}
              {idvResult && (
                            <div className="idv-result">
                                Your Insurance Declared Value (IDV): ₹{idvResult}
                            </div>
                        )}
            </div>
          )}
              </form>
            </div>
          </div>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>Calculated Premium: {premiumResult}</h3>
                <p>Do you want to save the data?</p>
                <div className="modal-buttons">
                  <button onClick={handleSave} className="btn btn-success">
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)} className="btn btn-danger">
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };
     
    
 
 
export default AutoInsurance;