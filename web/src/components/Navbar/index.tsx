import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class NavbarComponent extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>FTC Competition Database</Navbar.Brand>
      </Navbar>
    );
  }
}

export default NavbarComponent;