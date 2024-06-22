import React, { useEffect, useState ,useContext} from 'react';
import './viewtickets.css';
import { AppContext } from './AppContext';
function SolvedTickets() {
    const [tickets, setTickets] = useState([]);
const{suserId}= useContext(AppContext);
 
    useEffect(() => {
        fetchSolvedTickets();
    }, []);
 
    const fetchSolvedTickets = async () => {
        try {
            const response = await fetch(`http://localhost:8007/api/tickets/user/${suserId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch solved tickets. Status: ${response.status}`);
            }
            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error('Error fetching solved tickets:', error);
        }
    };
 
    return (
        <div>
           
            <div className="mainbox">
                <h1 className="heading">Solved Tickets</h1>
                <table className="tickets-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Response</th>
                            <th>Response At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.title}</td>
                                <td>{ticket.description}</td>
                                <td>{ticket.responseTxt}</td>
                                <td>{ticket.responseAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
 
export default SolvedTickets;
 