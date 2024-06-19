import logo from './logo.svg';
import './App.css';
// import LoginComponent from './login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import DashboardComponent from './dashboard';
import Navbar from './navbar';
import UserLogin from './user';
import Section2 from './section2';
import Calculator from './premiumCalculator';
import DashboardComponent from './dashboard';
import AutoInsurance from './autoinsurance';
import TermInsurance from './terminsurance';
import HealthInsurance from './healthinsurance';
import HealthPolicyForm from './healthform';
import AutoPolicyForm from './autoform';
import TermPolicyForm from './termpolicyform';
import MyPolicies from './mypolicy';
import PolicyDetails from './policydetails';
import PolicyRenewal from './renew';
import AutoClaim from './autoclaim';
import HealthClaim from './healthclaim';

function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path='/user' element={<UserLogin />} />
            <Route path='/section2' element={<Section2 />} />
            <Route path='/' element={<Navbar />} />
            <Route path="/autoinsurance" element={<AutoInsurance/>} />
            <Route path="/terminsurance" element={<TermInsurance/>} />
            <Route path="/healthinsurance" element={<HealthInsurance/>} />
            <Route path="/healthform" element={<HealthPolicyForm/>} />
            <Route path="/auto-policy-form" element={<AutoPolicyForm/>} />
            <Route path="/term-policy-form" element={<TermPolicyForm/>} />
            <Route path="/mypolicies" element={<MyPolicies/>} />
            <Route path="/policydetails" element={<PolicyDetails/>} />
            <Route path="/renew" element={<PolicyRenewal/>} />
            <Route path="/autoclaim" element={<AutoClaim/>} />
            <Route path="/healthclaim" element={<HealthClaim/>} />
          </Routes>
         
        </Router>
       
    </>
  );
}

export default App;
