import React, { useState, useEffect ,useContext} from 'react';
import logo from './images/logosfolder/applogo.png';
import './loginComponent.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';
 
const LoginComponent = ({  imageUrl, welcomsmsg,role }) => {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const { suserId, setUserId } = useContext(AppContext);
 
    const navigate = useNavigate();
    
 
    const handlehomeclick = () => {
        
        navigate("/navbar");
    
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('emailId', emailId);
            formData.append('password', password);
            formData.append('role', role);
    
            const response = await fetch('http://localhost:8007/users/login', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok&& role==="user") {
                const data = await response.json();
                console.log('Login response:', data);
                
                // Update suserId state
                setUserId(data); 
    
                // Now, suserId will not be immediately updated here due to the asynchronous nature
                console.log(suserId); // This may still log the old value of suserId
    
                if (data) {
                    // Save user data in session or local storage if needed
                    setLoggedIn(true);
                    sessionStorage.setItem('user', JSON.stringify(data));
                    navigate('/section2', { state: { user: data } }); // Navigate to dashboard or appropriate page
                } else {
                    setError('Invalid email or password');
                }
            } 
            else if(response.ok && role==="admin")
                {
 navigate('/admindashboard');

                }
                else if(response.ok && role==="agent")
                    {
     navigate('/agentdashboard');
    
                    }
                else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
        }
    };
    
 
    return (
        <div>
            <div className='top-total'>
                <div className='top-le'>
                    <img src={logo} alt="Logo" className="logo" />
                    <h1 id='ins'>Insurre</h1>
                </div>
                <div className='top-ri'>
                    <a onClick={handlehomeclick}>user</a>
                </div>
            </div>
            <div className='body-us'>
                <div className='body-us-left'>
                    <h1 id='say-hola'>Holla,</h1>
                    <h2 id='hellomsg'>{welcomsmsg}</h2>
                    <h3 id='after-hola'>Hey, Welcome back to your special place</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='fld-head'>Email:</label>
                            <br />
                            <input className='fld' type="email" placeholder="Type your Email" value={emailId} onChange={(e) => setEmailId(e.target.value)} required />
                        </div>
                        <div>
                            <label className='fld-head'>Password:</label>
                            <br />
                            <input className='fld' type="password" placeholder="Type your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className='btm-ct'>
                            <a id='forget-password' >forget password?</a>
                            <br />
                            <button id='signin' type="submit">signin</button>
                        </div>
                    </form>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <h3>Don't have an account? <span> <a id='signup-op' href="#" onClick={() => handleSubmit()}> Sign up </a></span> </h3>
                </div>
                <div className='body-us-right'>
                    <img src={imageUrl} alt="Logo" className="right-im-bt" />
                </div>
            </div>
        </div>
    );
};
 
export default LoginComponent;