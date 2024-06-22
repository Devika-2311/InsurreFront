import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './renew.css'
// import pic from '../Assets/renewpic.png'
import axios from 'axios';
const PolicyRenewal = () => {
    const [newTermPeriod, setNewTermPeriod] = useState('');
    const [renew, setRenew] = useState(false);
 
    const [newData, setNewData] = useState('');
    const [status, setStatus] = useState('');
    const location = useLocation();
    const { userpolicyId } = location.state || {};
  
    const claim_type=localStorage.getItem('claim_type');
   
 
    const fetchUserPolicyData = async () => {
        
        try {
            const response = await axios.get(`http://localhost:8007/user-policies/readOne/${userpolicyId}`);
            setNewData(response.data); // Assuming response.data is the updated policy object
           
        } catch (error) {
            console.error('Error fetching user policy data:', error);
        }
    }
    const incrementedEndDate = new Date(newData.endDate);
    useEffect(() => { fetchUserPolicyData() }, [newData])
    const submit1 = async () => {
      
        var confirmation = window.confirm('Are you sure you want to submit');
        if (confirmation) {
            try {
                const response = await axios.put(`http://localhost:8007/user-policies/renew/${userpolicyId}`);
               
                setStatus(response);
                const expireResponse = await axios.put(`http://localhost:8007/${claim_type}/expire/${userpolicyId}`);
             
                // setStatus(expireResponse.status === 200);
            } catch (error) {
                console.error(error?.response?.data?.message);
                window.alert(error?.response?.data?.message);
            }
        }
    }
    // }
 
    // const incrementedEndDate = new Date(newData.endDate);
    incrementedEndDate.setFullYear(incrementedEndDate.getFullYear() + parseInt(newData.term));
    //const incrementedEndDateString = incrementedEndDate.toLocaleDateString('en-GB');
    const incrementedEndDateString = `${incrementedEndDate.getFullYear()}-${String(incrementedEndDate.getMonth() + 1).padStart(2, '0')}-${String(incrementedEndDate.getDate()).padStart(2, '0')}`;
   
 
    const newterm = parseInt(newData.term) + parseInt(newTermPeriod);
    const coveragePerYear = parseInt(newData.coverage) / parseInt(newData.term);
    const newcov = coveragePerYear * newterm;
    const newleft = (coveragePerYear * parseInt(newTermPeriod)) + parseInt(newData.leftcoverage);
 
    //const newenddate=Date.parse(newData.endDate);
 
    // console.log(typeof(newenddate+1),newenddate);
 
    const [newPolicy, setNewPolicy] = useState(false);
    const newp = (e) => {
        setNewTermPeriod(e);
        if (e.length == 0)
            setNewPolicy(false);
        else setNewPolicy(true);
    }
    const renewp = (e) => {
        if (!e) {
            setRenew(false);
            setNewPolicy(false);
        }
        else {
            setNewTermPeriod('');
            setRenew(true)
        };
    }
 
 
 
    return (
        <div className='base'>
            {/* <img className='pic' src={pic} alt='Image'></img> */}
            <div className="top">
                <div className="content">
                    <p className='heading'>Renew Your Policy</p>
                    <div className="policy-details">
                        <h2 className='elements' style={{ marginBottom: '0.5rem', marginTop: '0.5rem', textAlign: 'center' }}>Your Present Policy Details</h2>
                        <div className='f1'>
                            <p className='elements'><span style={{ fontWeight: 'bold' }}>Premium: </span>{newData.premium}</p>
                            <p className='elements'><span style={{ fontWeight: 'bold' }}>Term Period: </span>{newData.term}</p>
                        </div>
                        <div className='f1'>
                            <p className='elements'><span style={{ fontWeight: 'bold' }}>Coverage: </span>{newData.coverage}</p>
                            <p className='elements'><span style={{ fontWeight: 'bold' }}>Left: </span>{newData.leftcoverage}</p>
                        </div>
                        <div className='f2'>
                            <p className='elements'>StartDate: {newData.startDate}</p>
                            <p className='elements'>EndDate: {newData.endDate}</p>
                        </div>
                        <p className='f3'>Want to renew your policy:
                            <label className='elements'><input type="radio" name="renew" value="yes" onChange={() => renewp(true)} /> Yes</label>
                            <label className='elements'><input type="radio" name="renew" value="no" onChange={() => renewp(false)} /> No</label>
                        </p>
                        {/* <div className='f4'>
                            {
                                renew ?
                                    <div className='f5'><p>Renew your policy by new Term Period:</p>
                                        <input
                                            type="text"
                                            value={newTermPeriod}
                                            onChange={(e) => newp(e.target.value)}
                                        /></div>
                                    : <></>}
                        </div> */}
                        {renew ?
                            <div className='f6'>
                                <h2 className='elements' style={{ marginBottom: '0.5rem' }}>Updated Policy Details</h2>
                                <div className='f1'>
                                    <p className='elements'><span style={{ fontWeight: 'bold' }}>Premium: </span>{newData.premium}</p>
                                    <p className='elements'><span style={{ fontWeight: 'bold' }}>Term Period: </span>{newData.term}</p>
                                </div>
                                <div className='f1'>
                                    <p className='elements'><span style={{ fontWeight: 'bold' }}>Coverage: </span>{newData.coverage}</p>
                                    <p className='elements'><span style={{ fontWeight: 'bold' }}>Left: </span>{newData.coverage}</p>
                                </div>
                                <div className='f2'>
                                    <p className='elements'>StartDate: {newData.endDate}</p>
                                    <p className='elements'>EndDate: {incrementedEndDateString}</p>
                                </div>
                                <button className='button1' onClick={submit1}>Renew</button>
                            </div>
                            : <></>}
                        {/* <button onClick={submit1}>Renew</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default PolicyRenewal;