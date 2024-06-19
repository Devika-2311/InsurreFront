import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo1 from '../src/images/logosfolder/phone.png';
import './autoclaim.css';
import axios from 'axios';

function AutoClaim() {
    const [vehicleModelNo, setVehicleModelNo] = useState('');
    const [licensePlateNo, setLicensePlateNo] = useState('');
    const [exShowroomPrice, setExShowroomPrice] = useState('');
    const [vehicleAge, setVehicleAge] = useState('');
    const [driverAge, setDriverAge] = useState('');
    const [incidentDateTime, setIncidentDateTime] = useState('');
    const [damageDescription, setDamageDescription] = useState('');
    const [repairCost, setRepairCost] = useState('');
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

    const autoClaimData = {
        vehicleModelNo: vehicleModelNo,
        licensePlateNo: licensePlateNo,
        exShowroomPrice: exShowroomPrice,
        vehicleAge: vehicleAge,
        incidentTime: incidentDateTime + 'T14:00:00',
        driverAge: driverAge,
        damageDescription: damageDescription,
        damageCost: repairCost,
        photoOfDamage: 'https://example.com/photo789.jpg',
        userPolicy: {
            userPolicyId: userpolicyId,
        },
    };

    const submitData = async () => {
        try {
            const response = await axios.post('http://localhost:8007/auto-claims/create', autoClaimData);
            console.log(response);
        } catch (error) {
            console.error(error);
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
                            <label>Vehicle Model No</label>
                            <input
                                type='text'
                                className='textfield'
                                value={vehicleModelNo}
                                onChange={handleVehicleModelNoChange}
                            />
                        </div>
                        <div className='formlevel2'>
                            <label>License Plate No</label>
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
                            <label>Ex-Showroom Price</label>
                            <input
                                type='text'
                                className='textfield'
                                value={exShowroomPrice}
                                onChange={handleExShowroomPriceChange}
                            />
                        </div>
                        <div className='formlevel2'>
                            <label>Vehicle Age</label>
                            <input
                                type='text'
                                className='textfield'
                                value={vehicleAge}
                                onChange={handleVehicleAgeChange}
                            />
                        </div>
                    </div>
                    <div className='formlevel1'>
                        <div className='formlevel2'>
                            <label>Driver’s Age</label>
                            <input
                                type='text'
                                className='textfield'
                                value={driverAge}
                                onChange={handleDriverAgeChange}
                            />
                        </div>
                        <div className='formlevel2'>
                            <label>Date and Time of Incident</label>
                            <input
                                type='text'
                                className='textfield'
                                value={incidentDateTime}
                                onChange={handleIncidentDateTimeChange}
                            />
                        </div>
                    </div>
                    <div className='formlevel1'>
                        <div className='formlevel2'>
                            <label>Damage Description</label>
                            <input
                                type='text'
                                className='textfield'
                                value={damageDescription}
                                onChange={handleDamageDescriptionChange}
                            />
                        </div>
                        <div className='formlevel2'>
                            <label>Repair Cost</label>
                            <input
                                type='text'
                                className='textfield'
                                value={repairCost}
                                onChange={handleRepairCostChange}
                            />
                        </div>
                        <img src={logo1} alt='Logo1' className='img1' />
                    </div>
                    <input type='file' accept='image/*'></input>
                    <button>Upload Proof Of Damage</button>
                    <button style={{ marginTop: '2%' }} onClick={submitData}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default AutoClaim;
