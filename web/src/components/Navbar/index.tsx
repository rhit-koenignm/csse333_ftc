import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import FTCLogo from './FTCLogo.png';

class NavbarComponent extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <img src={FTCLogo} className="FTC-logo" alt="ftclogo" />
        <Navbar.Brand>FTC Competition Database</Navbar.Brand>
      </Navbar>
    );
  }
}

export default NavbarComponent;