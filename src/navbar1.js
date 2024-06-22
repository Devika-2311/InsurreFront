import React from 'react';
import { Link } from 'react-router-dom';
import './navbar1.css';
import logo from '../src/images/logosfolder/applogo.png';
 
 
function Navbar1() {
  return (
    <nav className="navbar">
   
      <div>
        <div>
          <img src={logo} alt="Logo" className="logo" />
          <h1 class="logo-name">Insurre</h1>
        </div>
      </div>
      <div>
        <ul>
          <li className="home"><a href="#">Home</a></li>
          <li className="username"><a href="#">Username</a></li>
          <li className="mypolicies"><Link to="/mypolicies">mypolicies</Link></li>
          <li className="viewTickets"><Link to="/viewTickets">view Tickets</Link></li>
          <li className="helpme"><Link to="/helpme">Helpme</Link></li>
          <li className="logout"><a href="#">logout</a></li>
        </ul>
      </div>
    </nav>
  );
}
 
export default Navbar1;