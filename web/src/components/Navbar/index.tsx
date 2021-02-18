import React from 'react';
import { Container, Row } from 'react-bootstrap';
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
    return (
      <Navbar bg="light" expand="lg">
        <div className={styles.parent}>
          <img src={FTCLogo} onClick={event =>  window.location.href='/'} className="FTC-logo" alt="ftclogo" />
          <div className={styles.child}>
          <Navbar.Brand><strong><em>Competition Database</em></strong></Navbar.Brand>
          </div>
        </div>
        
        <Nav className="mr-auto">
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/teams'>Teams</Nav.Link>
          <Nav.Link href='/rankings'>Rankings</Nav.Link>
          <Nav.Link href="/matches">Matches</Nav.Link>
        </Nav>
        { currTourn != null && 
          <Nav className="mr-right">
            <Nav.Item>
              Current Tournament: {currTourn.name}<br />
              Location: {currTourn.location}<br />
              Date: {new Date(currTourn.date).toLocaleDateString() }
              </Nav.Item>
          </Nav>
        }
      </Navbar>
    );
  }
}

export default NavbarComponent;