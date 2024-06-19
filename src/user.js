import React from 'react';
import LoginComponent from './login';
import userlogimg from './images/loginimages/userlogin.png';
 
const UserLogin = () => {
    return (
        <div>
            <LoginComponent
                loginUrl="http://localhost:8007/users/login"
                welcomsmsg="Welcome back User"
                imageUrl={userlogimg}
                role="user"
            />
        </div>
    );
};
 
export default UserLogin;
 