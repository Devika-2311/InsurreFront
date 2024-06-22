import React, { useState,useContext } from "react";
import axios from 'axios';
import './help.css';
import helpme from "./images/userimages/helpme.png";
import { AppContext } from './AppContext';

function Help() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { suserId } = useContext(AppContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ticket = {
            title: title,
            description: description,
            user: { userId: suserId } // assuming userId is 1 for this example
        };

        try {
            const response = await axios.post('http://localhost:8007/api/tickets/create', ticket, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status);
            console.log('Response data:', response.data);

            if (response.status !== 201) {
                throw new Error(`Error: ${response.status}`);
            }

            console.log('Ticket created successfully:', response.data);
        } catch (error) {
            console.error('Error creating ticket:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="background">
            <div className="main-body">
                <h1 className="upperhead">Having Issues, User? Raise Ticket.</h1>
                <div className="white-box">
                    <h2 className="box-heading">Raise a Support Ticket</h2>
                    <form className="ticket-form" onSubmit={handleSubmit}>
                        <div className="form-left">
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="text-box"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-groupp">
                                <label htmlFor="description">Description:</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    className="text-boxx"
                                    rows="4"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="submittt-button">Submit</button>
                        </div>
                        <div className="form-right">
                            <img src={helpme} alt='userloginlogo' className='ag-image' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Help;
