import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dh.css';
 
function Dasb() {
    const navigate = useNavigate();
 
    const handleNavigation = (path) => {
        navigate(path);
    };
 
    return (
        <div className="dashbody">
            <div className="leftside-div">
                <h4 className='xyz' onClick={() => handleNavigation('/dash')}>Dashboard</h4>
                <h4 className='mno' onClick={() => handleNavigation('/open-tickets')}>Open Tickets</h4>
                <h4 className='jkl' onClick={() => handleNavigation('/closed-tickets')}>Closed Tickets</h4>
            </div>
        </div>
    );
}
 
export default Dasb;