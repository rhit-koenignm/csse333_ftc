import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import FTCLogo from './FTCLogo.png';

class NavbarComponent extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <img src={FTCLogo} className="FTC-logo" alt="ftclogo" />
        <Navbar.Brand>FTC Competition Database</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/teams'>Teams</Nav.Link>
          <Nav.Link href='/rankings'>Rankings</Nav.Link>
          <Nav.Link href="#pricing">Matches</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default NavbarComponent;