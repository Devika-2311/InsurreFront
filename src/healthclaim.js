import React, { useState } from "react";
// import logo1 from "../Assets/phone.png";
import { useLocation } from 'react-router-dom';
import "./healthclaim.css";
import axios from "axios";
function HealthClaim() {
    const [diseaseOccured, setdiseaseOccured] = useState("");
    const [dateOfService, setdateOfService] = useState("");
    const [hospName, sethospName] = useState("");
    const [drCharge, setdrCharge] = useState("");
    const [hostAdd, sethostAdd] = useState("");
    const [claimAmt, setclaimAmt] = useState("");
    const [medicalBill, setmedicalBill] = useState(null); // State to hold the selected file
    const [status, setStatus] = useState('Pending');
    const [res, setRes] = useState("");
    const location = useLocation();
    const { userpolicyId } = location.state || {};
    const healthClaimData = {
        disease: diseaseOccured,
        dateofservice: dateOfService,
        hospitalname: hospName,
        doctorincharge: drCharge,
        address: hostAdd,
        claimamt: claimAmt,
        status: "Pending",
        medicalBill: medicalBill,
        userPolicy: {
            userPolicyId: userpolicyId,
        },
    };
 
 
    const submitdata = async (e) => {
        e.preventDefault();
        if (!diseaseOccured || !dateOfService || !hospName || !drCharge || !hostAdd || !claimAmt || !medicalBill) {
            alert("Please fill out all mandatory fields before submitting.");
            return;
        }
 
        var confirmation = window.confirm('Are you sure you want to submit?');
        if (confirmation) {
            const formData = new FormData();
            formData.append('disease', diseaseOccured);
            formData.append('dateOfService', dateOfService);
            formData.append('hospitalName', hospName);
            formData.append('doctorInCharge', drCharge);
            formData.append('address', hostAdd);
            formData.append('claimAmt', claimAmt);
            formData.append('status', status);
            formData.append('userPolicyId', userpolicyId); // Assuming a fixed userPolicyId for demo purposes
            formData.append('medicalBill', medicalBill); // Append the selected file
 
            try {
                const response = await axios.post(
                    "http://localhost:9988/health-claims/create",
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                console.log(response);
                setRes(response);
                if (response?.status === 201) {
                    alert("Submitted Successfully");
                }
            } catch (error) {
                console.error('Claim submission failed:', error);
                console.error('Error details:', error?.response?.data?.message);
                window.alert("Claim Request Failed as " + error?.response?.data?.message);
            }
        }
    };
    console.log(res);
    return (
        <div className="top3">
            <div className="HealthText">
                <p id="auto">Health Insurance</p>
                <p id="msg">Peace of mind that never expires,with every hearbeat</p>
            </div>
            <div className="claimform3">
                <h4>Claim Request</h4>
                {/* <div className='formlevel0'> */}
                <div className="claimformlevel1">
                    <div className="claimformlevel2">
                        <label>Disease Occured *</label>
                        <input required
                            type="text"
                            className="textfield3"
                            onChange={(e) => setdiseaseOccured(e.target.value)}
                        ></input>
                    </div>
                    <div className="claimformlevel2">
                        <label>Date Of Service *</label>
                        <input required
                            type="date"
                            className="textfield3"
                            onChange={(e) => setdateOfService(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="claimformlevel1">
                    <div className="fl">
                        <div className="claimformlevel2">
                            <label>Hospital Name *</label>
                            <input required
                                type="text"
                                className="textfield3"
                                onChange={(e) => sethospName(e.target.value)}
                            ></input>
                        </div>
                        <div className="claimformlevel2">
                            <label>Doctor Incharge *</label>
                            <input required
                                type="text"
                                className="textfield3"
                                onChange={(e) => setdrCharge(e.target.value)}
                            ></input>
                        </div>
                        <div className="claimformlevel2">
                            <label>Claim Amount *</label>
                            <input required
                                type="number"
                                className="textfield3"
                                onChange={(e) => setclaimAmt(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className="claimformlevel2">
                        <label>Hospital Address *</label>
                        {/* <input type='text' className='textarea'></input> */}
                        <textarea required
                            className="textarea1"
                            onChange={(e) => sethostAdd(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                {/* </div> */}
                {/* <img src={logo1} alt="Logo1" className="img1"></img> */}
                <div className="but">
                    <label>Upload Medical Bill *</label>
                    <input type='file' onChange={(e) => setmedicalBill(e.target.files[0])} accept="image/*"></input>
                    {/* <button style={{ width: "fit-content" }}>Upload Medical Bill</button> */}
                    <button
                        style={{ marginTop: "2%", width: "fit-content" }}
                        onClick={(e) => submitdata(e)}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default HealthClaim;