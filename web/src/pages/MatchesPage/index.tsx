import * as React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './MatchesPage.module.scss';
import { actions as teamActions, Team } from 'src/services/teams';
import { RootState } from 'src/store/modules';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Match } from 'src/services/matches';
import { TournamentsService } from 'src/services/tournaments';

interface OwnProps {
    
}

interface StoreProps {
    // teams: Team[];
}

interface DispatchProps {
    // fetchAllTeams: () => void;
    // updateTeam: (id: string, team: Partial<Team>) => void;
}

type Props = OwnProps & StoreProps & DispatchProps;

interface State {
    showDelete: boolean;
    matches: Match[];

}


class MatchesPage extends React.Component<Props, State> {

    public constructor(props: Props) {
        super(props);
        this.state = {
            showDelete: false,
            matches: [],
        };
    }

    componentDidMount() {
        let tournId = TournamentsService.getSelectedTournament();
        if(tournId != null) {
            this.fetchMatches(tournId);
        }
    }

    fetchMatches = (tournId: string) => {
        TournamentsService.fetchTournamentMatches(tournId)
            .then(matches => {
                this.setState({ matches })
            });
    }

    showDeleteModal = () => {
        this.setState({ showDelete: true });
    }

    hideDeleteModal = () => {
        this.setState({ showDelete: false });
    }

    editMatch = (matchId: string) => {
        window.location.assign(`/matches/${matchId}`);
    }

    generateMatches = () => {
        let tournId = TournamentsService.getSelectedTournament() || '';
        if(!tournId) {
            return;
        }
        TournamentsService.generateTournamentMatches(tournId)
            .then(matches => {
                this.fetchMatches(tournId);
            });
    }

    deleteMatches = () => {
        let tournId = TournamentsService.getSelectedTournament() || '';
        if(!tournId) {
            return;
        }
        TournamentsService.deleteTournamentMatches(tournId)
            .then(res => {
                this.hideDeleteModal();
                this.fetchMatches(tournId);
            });
    }

    public render() {
        return (

            <Container className={styles.tableStyle}>
                <Row className={styles.welcomeMsg}><h1>Matches</h1></Row>
                <Row className={styles.subtitleMsg}><p>You are viewing all matches in the selected tournament</p></Row>

                {/* Delete Modal */}

                <Modal show={this.state.showDelete} onHide={this.hideDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete FTC Team</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to make these changes?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideDeleteModal}>
                            No
                    </Button>
                        <Button variant="primary" onClick={this.deleteMatches}>
                            Yes
                    </Button>
                    </Modal.Footer>
                </Modal>

                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Match#</th>
                            <th>Time</th>
                            <th className={styles.blueAllianceTitle}>Blue Alliance Teams</th>
                            <th style={{backgroundColor:'red', color: 'white'}}>Red Alliance Teams</th>
                            <th>Red Score</th>
                            <th>Blue Score</th>
                            <th>Modify</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.matches && this.state.matches.map(match => {
                            let redTeams = match.red_teams || ['unknown', 'unknown'];
                            let blueTeams = match.blue_teams || ['unknown', 'unknown'];
                            return (
                                <tr key={match.id}>
                                    <td>{match.number}</td>
                                    <td>{match.scheduled_time}</td>
                                    <td style={{backgroundColor:'blue', color: 'white'}}>{blueTeams[0]}<br />{blueTeams[1]}</td>
                                    <td style={{backgroundColor:'red', color: 'white'}}>{redTeams[0]}<br />{redTeams[1]}</td>
                                    <td>{match.red_score}</td>
                                    <td>{match.blue_score}</td>
                                    <td>
                                        {/*<Button className={styles.editBtn} onClick={this.showDeleteModal}><FontAwesomeIcon icon={faEdit} size="sm"/>     Delete Match</Button>*/}
                                        <Button className={styles.editBtn} onClick={() => this.editMatch(match.id)}><FontAwesomeIcon icon={faEdit} size="sm" />     Edit Details</Button>
                                        {/* <Button className={styles.editBtn} onClick={this.showDeleteModal}><FontAwesomeIcon icon={faTrashAlt} size="sm"/></Button> */}
                                    </td>
                                </tr>
                        )})}
                    </tbody>
                </Table>
                {this.state.matches.length === 0 &&
                    <Row><Button onClick={this.generateMatches}>Generate Matches</Button></Row> ||
                    <Row><Button onClick={this.showDeleteModal}>Delete All Matches</Button></Row>}
            </Container>
        )
    }
}

export default MatchesPage;