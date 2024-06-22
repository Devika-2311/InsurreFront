import React from 'react';
import './adminnav.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFileAlt, FaUsers, FaShoppingCart, FaHandsHelping, FaSignOutAlt, FaEdit } from 'react-icons/fa';
 
function AdminNav() {
    const [user, setUser] = useState({});
 
    useEffect(() => {
        // Fetch admin data
        axios.get(`http://localhost:7001/admin/admin`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the user data!', error);
            });
    }, []);
 
        return (
            <div>
                <div className='appheader'>
                    <img className='applogo' src="applogo.png" alt="App Logo" />
                    <h2>Insurre</h2>
                    <div className='user-info'>
                        <img className='userlogo' src='userlogo.png' alt="User Logo" />
                        <p className='adminname'>{user.firstName}</p>
                    </div>
                </div>
                <nav className="adminnavbar">
                    <ul className="adminnavbar-list">
                        <li><FaHome /><Link to="/">Dashboard</Link></li>
                        <li><FaFileAlt /><Link to="/policy">Policy</Link></li>
                        <li><FaUsers /><Link to="/customers">Customers</Link></li>
                        <li><FaShoppingCart /><Link to="/buy">Buy Request</Link></li>
                        <li><FaHandsHelping /><Link to="/claim">Claim Request</Link></li>
                        <li><FaEdit /><Link to="/edit">Edit Profile</Link></li>
                        <li><FaSignOutAlt /><Link to="/edit">Logout</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
 
export default AdminNav;
 