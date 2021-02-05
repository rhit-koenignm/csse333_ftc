import * as React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './MatchOverview.module.scss';
import { RootState } from 'src/store/modules';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { actions as matchesActions, Match, MatchTeam } from '../../services/matches';

interface OwnProps {
    match: {
        params: {
            matchId: string,
        }
    }
}

interface StoreProps {
    matches: Match[];
}

interface DispatchProps {
    fetchMatch: (matchId: string) => void;
}

type Props = OwnProps & StoreProps & DispatchProps;

interface State {
    showRed: boolean;
    showBlue: boolean;
    show: boolean;
    matchNumber?: string
    teamNumber?: string;
    results?: string;
    time?: string;
    redScore?: string;
    blueScore?: string;

    // teamId?: string;
    // teamName?: string;
}


class MatchOverviewPage extends React.Component<Props, State> {

    public constructor(props: Props) {
        super(props);
        this.state = {
            showRed: false,
            showBlue: false,
            show: false
        };
    }

    componentDidMount() {
        this.props.fetchMatch(this.props.match.params.matchId);
    }

    showRedModal = () => {
        this.setState({ 
            showRed: true,
        });
    }
    showBlueModal = () => {
        this.setState({ 
            showBlue: true,
        });
    }

    hideRedModal = () => {
        this.setState({ showRed: false });
    }

    hideBlueModal = () => {
        this.setState({ showBlue: false });
    }

    public render() {
        let match = this.props.matches?.find(match => match.id === this.props.match.params.matchId);
        // todo: handle the case where this is a string
        let teams: MatchTeam[] = (match?.teams || []) as MatchTeam[];
        let redTeams: MatchTeam[] = teams.filter(team => team.alliance_color === 'Red');
        let blueTeams: MatchTeam[] = teams.filter(team => team.alliance_color === 'Blue');
        return (
            <Container className={styles.tableStyle}>
                <Row className={styles.welcomeMsg}><h1>Match Details</h1></Row>
                <hr></hr>
                <Row className={styles.matchNumber}><h4>Match Number: {match?.number || 'Loading' }</h4></Row>
                <Row className={styles.subtitleMsg}><h4>Time: {match?.scheduled_time || 'Loading' }</h4></Row>
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th colSpan={2} className={styles.blueAllianceTitle}>Blue Team</th> 
                            <th colSpan={2} className={styles.redAllianceTitle}>Red Team</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Container>
                                    <Row>{blueTeams[0]?.team_name || 'Loading' }</Row>
                                    <Row>{blueTeams[0]?.team_number || 'Loading' }</Row>
                                    <Row><label><input type="checkbox" value="Present"/>  Present</label></Row>
                                </Container>
                            </td>
                            <td>
                                <Container>
                                    <Row>{blueTeams[1]?.team_name || 'Loading' }</Row>
                                    <Row>{blueTeams[1]?.team_number || 'Loading' }</Row>
                                    <Row><label><input type="checkbox" value="Present"/>  Present</label></Row>
                                </Container>
                            </td>
                            <td>
                                <Container>
                                    <Row>{redTeams[0]?.team_name || 'Loading' }</Row>
                                    <Row>{redTeams[0]?.team_number || 'Loading' }</Row>
                                    <Row><label><input type="checkbox" value="Present"/>  Present</label></Row>
                                </Container>
                            </td>
                            <td>
                                <Container>
                                    <Row>{redTeams[1]?.team_name || 'Loading' }</Row>
                                    <Row>{redTeams[1]?.team_number || 'Loading' }</Row>
                                    <Row><label><input type="checkbox" value="Present"/>  Present</label></Row>
                                </Container>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div>
                    <Button className={styles.addRedBtn} onClick={this.showRedModal}><FontAwesomeIcon icon={faPlusCircle} /></Button> 
                
                
                    <Button className={styles.addBlueBtn} onClick={this.showBlueModal}><FontAwesomeIcon icon={faPlusCircle} /></Button> 
                </div>

                <Modal show={this.state.showBlue} onHide={this.hideBlueModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modify Blue Score</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Modify Blue Score</Form.Label>
                                <Form.Control type="text" placeholder="Enter Blue Score" value={this.state.blueScore} onChange={(e) => this.setState({ blueScore: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Update Blue Score 
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideBlueModal}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={this.updateTeam.bind(this)}>
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showRed} onHide={this.hideRedModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modify Red Score</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Modify Red Score</Form.Label>
                                <Form.Control type="text" placeholder="Enter Red Score" value={this.state.redScore} onChange={(e) => this.setState({ redScore: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Update Red Score 
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideRedModal}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={this.updateTeam.bind(this)}>
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }

    updateTeam() {
        // if(this.state.teamId) {
        //     this.props.updateTeam(this.state.teamId, { 
        //         team_name: this.state.teamName,
        //         team_number: Number(this.state.teamNumber),
        //     });
        // }
    }
}

const mapStateToProps = (state: RootState): StoreProps => ({
    matches: state.matches.matches,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
    // fetchAllTeams: () => {
    //     dispatch(teamActions.fetchAllTeams());
    // },
    fetchMatch: (matchId: string) => {
        dispatch(matchesActions.fetchOneMatch(matchId));
    }
});

// export default connect<StoreProps, DispatchProps, OwnProps, RootState>
//     (mapStateToProps, mapDispatchToProps)(MatchesPage);

export default connect<StoreProps, DispatchProps, OwnProps, RootState>
    (mapStateToProps, mapDispatchToProps)(MatchOverviewPage);