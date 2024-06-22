import React, { useState } from 'react';
import axios from 'axios';
// import logo1 from '../Assets/phone.png'; // Adjust path as per your project structure
import './autoclaim.css';
import { useLocation } from 'react-router-dom';
 
function AutoClaim() {
    const [vehicleModelNo, setVehicleModelNo] = useState('');
    const [licensePlateNo, setLicensePlateNo] = useState('');
    const [exShowroomPrice, setExShowroomPrice] = useState('');
    const [vehicleAge, setVehicleAge] = useState('');
    const [driverAge, setDriverAge] = useState('');
    const [incidentDateTime, setIncidentDateTime] = useState('');
    const [damageDescription, setDamageDescription] = useState('');
    const [repairCost, setRepairCost] = useState('');
    const [photoOfDamage, setPhotoOfDamage] = useState(null); // State to hold the selected file
    const [status, setStatus] = useState('Pending'); // Default status value
    const [formValid, setFormValid] = useState(false); // State to track form validity
    const [res, setRes] = useState("");
    const location = useLocation();
    const { userpolicyId } = location.state || {};
 
    const handleVehicleModelNoChange = (event) => {
        setVehicleModelNo(event.target.value);
    };
 
    const handleLicensePlateNoChange = (event) => {
        setLicensePlateNo(event.target.value);
    };
 
    const handleExShowroomPriceChange = (event) => {
        setExShowroomPrice(event.target.value);
    };
 
    const handleVehicleAgeChange = (event) => {
        setVehicleAge(event.target.value);
    };
 
    const handleDriverAgeChange = (event) => {
        setDriverAge(event.target.value);
    };
 
    const handleIncidentDateTimeChange = (event) => {
        setIncidentDateTime(event.target.value);
    };
 
    const handleDamageDescriptionChange = (event) => {
        setDamageDescription(event.target.value);
    };
 
    const handleRepairCostChange = (event) => {
        setRepairCost(event.target.value);
    };
 
    const handleFileChange = (event) => {
        setPhotoOfDamage(event.target.files[0]); // Update state with the selected file
    };
 
    const validateForm = () => {
        // Validate all mandatory fields
        return (
            vehicleModelNo !== '' &&
            licensePlateNo !== '' &&
            exShowroomPrice !== '' &&
            vehicleAge !== '' &&
            driverAge !== '' &&
            incidentDateTime !== '' &&
            damageDescription !== '' &&
            repairCost !== '' &&
            photoOfDamage !== null
        );
    };
 
    const submitData = async () => {
        if (!validateForm()) {
            alert('Please fill out all mandatory fields before submitting.');
            return;
        }
 
        const formData = new FormData();
        formData.append('vehicleModelNo', vehicleModelNo);
        formData.append('licensePlateNo', licensePlateNo);
        formData.append('exShowroomPrice', exShowroomPrice);
        formData.append('vehicleAge', vehicleAge);
        formData.append('incidentTime', incidentDateTime);
        formData.append('driverAge', driverAge);
        formData.append('damageDescription', damageDescription);
        formData.append('damageCost', repairCost);
        formData.append('photoOfDamage', photoOfDamage); // Ensure this matches the backend
        formData.append('status', status); // New field for status
        formData.append('userPolicyId', userpolicyId); // Assuming a fixed userPolicyId for demo purposes
 
        try {
            const response = await axios.post('http://localhost:9988/auto-claims/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            setRes(response);
            if (response?.status === 201) {
                alert("Submitted Successfully");
            }
            // Clear form fields or handle success message as needed
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.error('Server responded with error data:', error.response.data);
                console.error('Status code:', error.response.status);
                console.error('Headers:', error.response.headers);
                alert('Claim submission failed: ' + error?.response?.data?.message);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                alert('No response received from server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up request:', error.message);
                alert('Error setting up request. Please try again later.');
            }
            console.error('Error submitting claim:', error);
        }
    };
 
    return (
        <div className='top1'>
            <div className='AutoText'>
                <p id='auto'>Auto Insurance</p>
                <p id='msg'>Shielding your Journey with reliable coverage</p>
            </div>
            <div className='claimform1'>
                <h4>Claim Request</h4>
                <div className='formlevel0'>
                    <div className='formlevel1'>
                        <div className='formlevel2'>
                            <label>Vehicle Model No *</label>
                            <input
                                type='text'
                                className='textfield'
                                value={vehicleModelNo}
                                onChange={handleVehicleModelNoChange}
                            />
                        </div>
                        <div className='formlevel2'>
                            <label>License Plate No *</label>
                            <input
                                type='text'
                                className='textfield'
                                value={licensePlateNo}
                                onChange={handleLicensePlateNoChange}
                            />
                        </div>
                    </div>
                    <div className='formlevel1'>
                        <div className='formlevel2'>
                            <label>Ex-Showroom Price *</label>
                            <input
                                type='number'
                                className='textfield'
                                value={exShowroomPrice}
                                onChange={handleExShowroomPriceChange}
                            />
                        </div>
                        <div className='formlevel2'>
                            <label>Vehicle Age *</label>
                            <input
                                type='number'
                                className='textfield'
                                value={vehicleAge}
                                onChange={handleVehicleAgeChange}
                            />
                        </div>
                    </div>
                    <div className='formlevel1'>
                        <div className='formlevel2'>
                            <label>Driver’s Age *</label>
                            <input
                                type='number'
                                className='textfield'
                                value={driverAge}
                                onChange={handleDriverAgeChange}
                            />
                        </div>
                        <div className='formlevel2'>
                            <label>Date of Incident *</label>
                            <input
                                type='date'
                                className='textfield'
                                value={incidentDateTime}
                                onChange={handleIncidentDateTimeChange}
                            />
                        </div>
                    </div>
                    <div className='formlevel1'>
                        <div className='formlevel2'>
                            <label>Damage Description *</label>
                            <input
                                type='text'
                                className='textfield'
                                value={damageDescription}
                                onChange={handleDamageDescriptionChange}
                            />
                        </div>
                        <div className='formlevel2'>
                            <label>Repair Cost *</label>
                            <input
                                type='text'
                                className='textfield'
                                value={repairCost}
                                onChange={handleRepairCostChange}
                            />
                        </div>
                        {/* <div className='formlevel2'>
                            <label>Status *</label>
                            <select value={status} onChange={handleStatusChange} className='textfield'>
                                <option value='Pending'>Pending</option>
                                <option value='In Progress'>In Progress</option>
                                <option value='Completed'>Completed</option>
                            </select>
                        </div> */}
                        {/* <img src={logo1} alt='Logo1' className='img1' /> */}
                    </div>
                    <div className='formlevel2'>
                        <label>Upload Proof Of Damage *</label>
                        <input type='file' onChange={handleFileChange}></input>
                    </div>
                    <div className='formlevel2'>
                        <button style={{ marginTop: '2%' }} onClick={submitData} disabled={!validateForm()}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default AutoClaim;