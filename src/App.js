import React from 'react';
import BookingPage from './pages/BookingPage';
import ManagementPage from './pages/ManagementPage';
import './App.css';
import logo from './logo.png';
import { Navbar } from 'react-bootstrap';
function App() {
  return (
    <div className="App">
      <Navbar id="logoBar-mobile" expand="sm" >
        <Navbar.Brand href="#home">
          <img src={logo}>
          </img>
        </Navbar.Brand>
      </Navbar>
      <BookingPage />
      {/* <ManagementPage /> */}
    </div>
  );
}

export default App;
