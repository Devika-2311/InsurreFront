import React from 'react';
import LoginComponent from './login';
import agentlogin from './images/loginimages/agentlogin.png';
 
const AgentLogin = () => {
    return (
        <div>
            <LoginComponent       
                welcomsmsg="Welcome back Agent"
                imageUrl={agentlogin}
                role="agent"
            />
 
        </div>
    );
};
 
export default AgentLogin;
 