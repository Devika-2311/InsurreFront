import React from "react";
import { useNavigate } from "react-router-dom";
import './lifeinsurance.css';
import trendinglogo from "../src/images/logosfolder/trendinglogo.png";
import termlogo from "../src/images/userimages/healthinsurancemain.png";
 
function HealthInsurance() {
    const navigate = useNavigate();
 
    const handleBuyNow = () => {
        navigate('/healthform');
    };
 
    return (
        <div>
            <div className="bodyt">
                <div className="buyterm">
                    <h1>Health Insurance Shield</h1>
                    <p className="sub">Peace of mind that never expires, with every heartbeat</p>
                    <p className="sub1">It helps cover the cost of medical and surgical expenses. It provides financial protection against unexpected healthcare costs and promotes access to preventive care.</p>
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
                        <li>Term Period: Typically choose up the period to secure your life (vary based on policy).</li>
                        <li>Coverage: Comprehensive coverage including hospitalization, surgery, prescription, and more.</li>
                        <li>Premium: Determined based on factors such as age, health conditions, location cost, and Optional Riders.</li>
                        <li>Renewals: Renew your policy towards the end of term life for continued protection and peace of mind.</li>
                    </ul>
                    <p className="optional">Optional Riders</p>
                    <ol className="items-1">
                        <li>Critical Illness Cover (3000/-)</li>
                        <li>Maternity Cover (2000/-)</li>
                        <li>Daily Hospital Cash (500/-)</li>
                    </ol>
                    <button className="buynow" onClick={handleBuyNow}>Buy now</button>
                </div>
            </div>
        </div>
    );
}
 
export default HealthInsurance;
 