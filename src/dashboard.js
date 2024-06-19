import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
const DashboardComponent = () => {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [address, setAddress] = useState(user ? user.address : '');
    const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
 
    const handleLogout = () => {
        sessionStorage.removeItem('user'); // or sessionStorage.clear();
        navigate('/login'); // Redirect to login page
    };
 
    const handleEditProfile = async (e) => {
        e.preventDefault();
 
        try {
            const params = new URLSearchParams();
            params.append('emailId', user.emailId);
            if (address !== '') {
                params.append('address', address);
            }
            if (phoneNumber !== '') {
                params.append('phoneNumber', phoneNumber);
            }
 
            const response = await fetch('http://localhost:8007/users/editprofile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            });
 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
 
            const updatedUser = await response.json();
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
            setSuccess('Profile updated successfully');
            setError('');
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
            setSuccess('');
        }
    };
 
    return (
        <div>
            {user ? (
                <div>
                <h1>hello user</h1>
                    <h2>Welcome, {user.firstName}</h2>
                    <p>Email: {user.emailId}</p>
                    <p>Address: {user.address}</p>
                    <p>Phone Number: {user.phoneNumber}</p>
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={() => setShowEditProfile(true)}>Edit Profile</button>
                    {showEditProfile && (
                        <form onSubmit={handleEditProfile}>
                            <div>
                                <label>Address:</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Phone Number:</label>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <button type="submit">Update Profile</button>
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                            {success && <div style={{ color: 'green' }}>{success}</div>}
                        </form>
                    )}
                </div>
            ) : (
                <div>
                    <p>No user data available.</p>
                </div>
            )}
        </div>
    );
};
 
export default DashboardComponent;