import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Tournament, TournamentsService } from 'src/services/tournaments';
import FTCLogo from './FTCLogo.png';
import styles from './NavBar.module.scss'

interface Props {

}

interface State {
  currentTournament?: Tournament;
}

class NavbarComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    let _this = this;
    let tournId = TournamentsService.getSelectedTournament();
    if(tournId != null) {
      TournamentsService.fetchTournament(tournId)
        .then((tournament) => {
          _this.setState({
            currentTournament: tournament,
          });
        });
    }
  }

  render() {
    let currTourn = this.state.currentTournament;
    let loggedInEmail = localStorage.getItem('loggedInEmail');
    return (
      <Navbar bg="light" expand="lg">
        <div className={styles.parent}>
          <img src={FTCLogo} onClick={event =>  window.location.href='/'} className="FTC-logo" alt="ftclogo" />
          <div className={styles.child}>
          <Navbar.Brand><strong><em>Competition Database</em></strong></Navbar.Brand>
          </div>
        </div>
        
        <Nav className="mr-auto">
          { loggedInEmail &&
            [
            <Nav.Link href='/'>Home</Nav.Link>,
            <Nav.Link href='/teams'>Teams</Nav.Link>,
            <Nav.Link href='/rankings'>Rankings</Nav.Link>,
            <Nav.Link href="/matches">Matches</Nav.Link>,
            ]
          }
        </Nav>
          <Nav className="mr-right">
          { currTourn != null && 
            <Nav.Item style={{marginRight: '2em'}}>
              Current Tournament: {currTourn.name}<br />
              Location: {currTourn.location}<br />
              Date: {new Date(currTourn.date).toLocaleDateString() }<br />
              <Button style={{marginTop: '1em'}} onClick={this.switchTournament}>Switch</Button>
            </Nav.Item>
          }
          { loggedInEmail &&
            <Nav.Item>
              Logged in as<br />
              {loggedInEmail}
              <br />
              <Button style={{marginTop: '1em'}} onClick={this.signOut}>Sign Out</Button>
            </Nav.Item>}
          </Nav>
      </Navbar>
    );
  }

  switchTournament = () => {
    sessionStorage.removeItem('currentTournamentId');
    setTimeout(() => {
      window.location.assign('/selectTournament');
    }, 500);
  }

  signOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
      window.location.assign('/login');
    }, 500);
    this.setState({ currentTournament: undefined });
  }
}

export default NavbarComponent;