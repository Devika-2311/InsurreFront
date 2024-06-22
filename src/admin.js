import React from 'react';
import LoginComponent from './login';
import adminlogin from './images/loginimages/adminlogin.png';
 
const AdminLogin = () => {
    return (
        <div>
            <LoginComponent
                
                welcomsmsg="Welcome back Admin"
                imageUrl={adminlogin}
                role="admin"
            />
 
        </div>
    );
};
 
export default AdminLogin;
 