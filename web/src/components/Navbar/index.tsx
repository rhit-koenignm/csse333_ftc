import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import FTCLogo from './FTCLogo.png';
import styles from './NavBar.module.scss'

class NavbarComponent extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <div className={styles.parent}>
          <img src={FTCLogo} onClick={event =>  window.location.href='/'} className="FTC-logo" alt="ftclogo" />
          <div className={styles.child}>
          <Navbar.Brand><strong><em>Competition Database</em></strong></Navbar.Brand>
          </div>
        </div>
        
        <Nav className="mr-right">
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/teams'>Teams</Nav.Link>
          <Nav.Link href='/rankings'>Rankings</Nav.Link>
          <Nav.Link href="/matches">Matches</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default NavbarComponent;