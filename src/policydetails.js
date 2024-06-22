import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './policydetails.css';
import { useLocation, useNavigate } from 'react-router-dom';

function PolicyDetails() {
    const [newData, setNewData] = useState(null);
    const [claimData, setClaimData] = useState([]);
    const [claim_type, setClaimType] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { userpolicyId } = location.state || {};
    const [myData,setMyData]=useState('');

        const fetchUserPolicyData = async () => {
            try {
                const response = await axios.get(`http://localhost:8007/user-policies/readOne/${userpolicyId}`);
                setNewData(response?.data);
                console.log(response?.data?.policy?.policyId);

                switch (response?.data?.policy?.policyId) {
                    case 1:
                        setClaimType('auto-claims');
                        break;
                    case 2:
                        setClaimType('term-claims');
                        break;
                    case 3:
                        setClaimType('health-claims');
                        break;
                    default:
                        throw 'No Claim found';
                }
            } catch (error) {
                console.error('Error fetching user policy data:', error);
            }
        }

        const claimclick = () => {
            switch (newData?.policy?.policyId) {
                case 1:
                    navigate('/autoclaim', { state: { userpolicyId } });
                    break;
                case 2:
                    navigate('/termclaim', { state: { userpolicyId } });
                    break;
                case 3:
                    navigate('/healthclaim', { state: { userpolicyId } });
                    break;
                default:
                    console.error('Invalid policy ID');
            }
        }

   
        const fetchClaimData = async () => {
            try {
                console.log(claim_type, "TYYPEEEE");
                const response = await axios.get(`http://localhost:8007/${claim_type}/user-policies/${userpolicyId}`);
                setMyData(response.data); // Update myData state using setMyData
               // console.log("MyDataaaaa=", myData);
            //    myData=response.data;
            //     //setClaimData(response.data);
                console.log("Responsedata=",response);
                //myData=response.data;
                //setClaimData(response.data);
              console.log("MyDataaaaa=",myData);
                //console.log(claimData, "Hii"); // Ensure data is fetched correctly
            } catch (error) {
                console.error('Error fetching claim data:', error);
            }
        }
        console.log("MyDataaaaa=", myData);

    useEffect(()=>{fetchUserPolicyData()},[]);
    useEffect(()=>{fetchClaimData()},[newData]);

    localStorage.setItem('claim_type',claim_type);

    console.log(claim_type," My claim type");
    console.log("ClaimData=", myData);
    console.log("Type Mydata=",typeof(myData))

    return (
        <div className='base'>
            <div className="top">
                <div className="content">
                    <p className='heading'>Policy Details</p>
                    <div className="policy-details">
                        <h2 className='elements' style={{ marginBottom: '0.5rem', marginTop: '0.5rem', textAlign: 'center' }}>Your Present Policy Details</h2>
                        <div className='f1'>
                            <p className='elements'><span style={{ fontWeight: 'bold' }}>Premium: </span>{newData?.premium}</p>
                            <p className='elements'><span style={{ fontWeight: 'bold' }}>Term Period: </span>{newData?.term}</p>
                        </div>
                        <div className='f1'>
                            <p className='elements'><span style={{ fontWeight: 'bold' }}>Coverage: </span>{newData?.coverage}</p>
                            <p className='elements'><span style={{ fontWeight: 'bold' }}>Left: </span>{newData?.leftcoverage}</p>
                        </div>
                        <div className='f2'>
                            <p className='elements'>StartDate: {newData?.startDate}</p>
                            <p className='elements'>EndDate: {newData?.endDate}</p>
                        </div>
                    </div>
                    {myData!= null ? (
                        <div className="claim-table">
                            <h2 className='elements' style={{ marginBottom: '0.5rem', marginTop: '1rem', textAlign: 'center' }}>Your Claims</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Claim No</th>
                                        <th>Amount</th>
                                        <th>Date of Service</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myData.map((claim, index) => (
                                        <tr key={index}>
                                            {claim_type === 'auto-claims' && (
                                                <>
                                                    <td>{index + 1}</td>
                                                    <td>{claim.damageCost}</td>
                                                    <td>{claim.incidentTime}</td>
                                                </>
                                            )}
                                            {claim_type === 'health-claims' && (
                                                <>
                                                    <td>{index + 1}</td>
                                                    <td>{claim.claimamt}</td>
                                                    <td>{claim.dateofservice}</td>
                                                </>
                                            )}
                                            {claim_type === 'term-claims' && (
                                                <>
                                                    <td>{index + 1}</td>
                                                    <td>{claim.userPolicy?.coverage}</td>
                                                    <td>{claim.dateofdemise}</td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="no-claims">No claims available.</p>
                    )}
                    <div className='buttt'>
                        <button className='button1' onClick={() => navigate('/renew', { state: { userpolicyId } })}>Renew</button>
                        <button className='button1' onClick={claimclick}>Claim</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PolicyDetails;
