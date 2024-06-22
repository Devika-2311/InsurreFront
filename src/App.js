import logo from './logo.svg';
import './App.css';
// import LoginComponent from './login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import DashboardComponent from './dashboard';
import Navbar from './navbar';
import UserLogin from './user';
import Section2 from './section2';

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
import { UserProvider } from './usercontext';
import { AppProvider } from './AppContext';
import AdminLogin from './admin';
import Main from './admindashboard';
import Nav from './adminnav';
import Customers from './Customer';
import Buy from './buy';
import PurchaseDetails from './purchaseDetails';
import Claim from './claim';
import ClaimDetails from './claimdetails';
import CustomerDetails from './customerDetails';
import EditProfile from './adminProfile';
import Help from './help';
import ViewTickets from './viewTickets';
import TermClaim from './termclaim';
import SecurePayment from './securePayment';
import PaymentHistory from './payementHistory';
import OpenTickets from './opentickets';
import AgentClosedTicket from './closetickets';
import ViewOpenTickets from './viewopentickets';
import ViewClosedTickets from './viewclosedtickets';
import Dashmain from './dashmain';
import AgentLogin from './agentcomponent';

function App() {
  return (

    <AppProvider>
       <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
      
      

    </AppProvider>


  );
}

const UserRoutes = () => {
  return (
   
        <Routes>
          <Route path='/user' element={<UserLogin />} />
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admindashboard' element={<Main />} />
          <Route path='/section2' element={<Section2 />} />
          <Route path='/' element={<Navbar />} />
          <Route path='/helpme' element={<Help />} />
          <Route path="/autoinsurance" element={<AutoInsurance />} />
          <Route path="/terminsurance" element={<TermInsurance />} />
          <Route path="/healthinsurance" element={<HealthInsurance />} />
          <Route path="/health-policy-form" element={<HealthPolicyForm />} />
          <Route path="/auto-policy-form" element={<AutoPolicyForm />} />
          <Route path="/term-policy-form" element={<TermPolicyForm />} />
          <Route path="/mypolicies" element={<MyPolicies />} />
          <Route path="/policydetails" element={<PolicyDetails />} />
          <Route path="/renew" element={<PolicyRenewal />} />
          <Route path="/viewTickets" element={<ViewTickets />} />
          <Route path="/autoclaim" element={<AutoClaim />} />
          <Route path="/healthclaim" element={<HealthClaim />} />
          <Route path="/termclaim" element={<TermClaim />} />
          <Route path="/payment" element={<SecurePayment />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/open-tickets" element={<OpenTickets />} />
                <Route path="/closed-tickets" element={<AgentClosedTicket />} />
                <Route path="/view-open-ticket/:ticketId" element={<ViewOpenTickets />} />
                <Route path="/view-closed-ticket/:ticketId" element={<ViewClosedTickets />} />
                <Route path="/agentdashboard" element={<Dashmain/>}/>
                <Route path='/agent' element={<AgentLogin />} />
        </Routes>

    
  );
};

const AdminRoutes = () => {
  return (
  
        
          <div className='page'>
            
            <div className='admincontent'>
              <Routes>
              <Nav/>
                <Route path="/" element={<Main />} />
                {/* <Route path="/policy" element={<Policy />} /> */}
                <Route path="/customers" element={<Customers />} />
                <Route path="/customer-details" element={<CustomerDetails />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/purchase-details" element={<PurchaseDetails />} />
                <Route path="/claim" element={<Claim />} />
                <Route path="/claim-details" element={<ClaimDetails />} />
                <Route path="/edit" element={<EditProfile />} />
              </Routes>
            </div>
         </div>

  );
};


export default App;
