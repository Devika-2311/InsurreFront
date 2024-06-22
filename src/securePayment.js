import React, { useState, useEffect } from 'react';
import './payment.css';
import creditCardIcon from '../src/images/logosfolder/credit.png';
import debitCardIcon from '../src/images/logosfolder/debit.png';
import upiIcon from '../src/images/logosfolder/upi.png';
import axios from 'axios';
import { useNavigate ,useLocation} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
function SecurePayment() {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [premiumCount, setPremiumCount] = useState(0);
    const [maxPayments, setMaxPayments] = useState(0);
    const [policy, setPolicy] = useState({});
    const location = useLocation();
    const { userpolicyId } = location.state || {};
    
    const navigate = useNavigate();
 console.log(userpolicyId);
    useEffect(() => {
        axios.get(`http://localhost:8007/user-policies/readOne/${userpolicyId}`)
            .then(response => {
                const policyData = response.data;
                setPolicy(policyData);
                setPremiumCount(policyData.premiumCount);
 
                // Calculate maximum payments
                const startDate = new Date(policyData.startDate);
                const endDate = new Date(policyData.endDate);
                const premiumTerm = policyData.premiumTerm;
 
                let totalPayments = 0;
                const diffInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
                if (premiumTerm === 'monthly') {
                    totalPayments = diffInMonths + 1;
                } else if (premiumTerm === 'quarterly') {
                    totalPayments = Math.floor(diffInMonths / 3) + 1;
                } else if (premiumTerm === 'semi-annually') {
                    totalPayments = Math.floor(diffInMonths / 6) + 1;
                } else if (premiumTerm === 'annually') {
                    totalPayments = Math.floor(diffInMonths / 12) + 1;
                }
               
                setMaxPayments(totalPayments);
            })
            .catch(error => {
                console.error('Error fetching policy data:', error);
            });
    }, [userpolicyId]);
 
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };
 
    const handleCompletePayment = () => {
        if (premiumCount >= maxPayments) {
            alert('You have completed paying all your premiums.');
            return;
        }
 
        axios.put(`http://localhost:8007/user-policies/increment/${userpolicyId}`)
            .then(response => {
                setPremiumCount(response.data.premiumCount);
                const nextDueDate = calculateNextDueDate(policy.premiumTerm);
                toast.success(`Payment completed successfully! Your next due date is ${nextDueDate}`, {
                    autoClose: 5000, // Duration in milliseconds (5000ms = 5 seconds)
                });
                setTimeout(() => {
                    navigate(`/payment-history`,{ state: { userpolicyId } });
                }, 5000);
            })
            .catch(error => {
                console.error('Error completing payment:', error);
            });
    };
 
    const calculateNextDueDate = (premiumTerm) => {
        const currentDate = new Date();
        let nextDueDate;
 
        if (premiumTerm === 'monthly') {
            nextDueDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        } else if (premiumTerm === 'quarterly') {
            nextDueDate = new Date(currentDate.setMonth(currentDate.getMonth() + 3));
        } else if (premiumTerm === 'semi-annually') {
            nextDueDate = new Date(currentDate.setMonth(currentDate.getMonth() + 6));
        } else if (premiumTerm === 'annually') {
            nextDueDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
        }
 
        return nextDueDate.toLocaleDateString();
    };
 
    return (
        <div className="secure-payment-page">
            <header></header>
            <main>
                <h1>Secure Payment Gateway</h1>
                <p>Complete your payment for your plan</p>
                <div className="payment-methods">
                    <div className={`method ${paymentMethod === 'credit' ? 'selected' : ''}`} onClick={() => handlePaymentMethodChange('credit')}>
                        <img src={creditCardIcon} alt="Credit Card" />
                        <p>Credit Card</p>
                    </div>
                    <div className={`method ${paymentMethod === 'debit' ? 'selected' : ''}`} onClick={() => handlePaymentMethodChange('debit')}>
                        <img src={debitCardIcon} alt="Debit Card" />
                        <p>Debit Card</p>
                    </div>
                    <div className={`method ${paymentMethod === 'upi' ? 'selected' : ''}`} onClick={() => handlePaymentMethodChange('upi')}>
                        <img src={upiIcon} alt="UPI ID" />
                        <p>UPI ID</p>
                    </div>
                </div>
                <div className="payment-form">
                    {paymentMethod === 'credit' || paymentMethod === 'debit' ? (
                        <>
                            <div className="form-group">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input type="text" id="cardNumber" name="cardNumber" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cardHolderName">Card Holder Name</label>
                                <input type="text" id="cardHolderName" name="cardHolderName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                                <input type="text" id="expiryDate" name="expiryDate" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input type="text" id="cvv" name="cvv" />
                            </div>
                        </>
                    ) : paymentMethod === 'upi' ? (
                        <div className="form-group">
                            <label htmlFor="upiId">UPI ID</label>
                            <input type="text" id="upiId" name="upiId" />
                        </div>
                    ) : null}
                    <button className="complete-payment-button" onClick={handleCompletePayment}>Complete Payment</button>
                </div>
                <div className="premium-count">
                    <h3>Premium Count: {premiumCount}/{maxPayments}</h3>
                </div>
                <ToastContainer autoClose={5000} />
            </main>
        </div>
    );
}
 
export default SecurePayment;