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
    showAdd: boolean;
    showEdit: boolean;
    showDelete: boolean;
    show: boolean;
    matchID?: string
    teamNumber?: string;
    color?: string;
    results?: string;
    time?: string;
    redScore?: string;
    blueScore?: string;

    // teamId?: string;
    // teamName?: string;
}


class MatchesPage extends React.Component<Props, State> {

    public constructor(props: Props) {
        super(props);
        this.state = {
            showAdd: false,
            showEdit: false,
            showDelete: false,
            show: false
        };
    }

    componentDidMount() {
        // console.log('mounted');
        // console.log(this.props.teams);
        // this.props.fetchAllTeams();
    }

    showAddModal = () => {
        this.setState({ showAdd: true });
    }

    hideAddModal = () => {
        this.setState({ showAdd: false });
    }

    showEditModal = () => {
        // const team = this.props.teams.find(t => t.id === teamId);
        // if(!team) {
        //     return;
        // }
        this.setState({ 
            showEdit: true,
            // teamId,
            // teamName: team.team_name,
            // teamNumber: team.team_number.toString(),
        });
    }

    hideEditModal = () => {
        this.setState({ showEdit: false });
    }

    showDeleteModal = () => {
        this.setState({ showDelete: true });
    }

    hideDeleteModal = () => {
        this.setState({ showDelete: false });
    }

    public render() {
        return (

            <Container className={styles.tableStyle}>
                <Row className={styles.welcomeMsg}><h1>Matches</h1></Row>
                <Row className={styles.subtitleMsg}><p>You are viewing the current Match Results</p></Row>

                {/* Submit Modal */}

                <Modal show={this.state.showAdd} onHide={this.hideAddModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add MatchID</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>MatchID</Form.Label>
                                <Form.Control type="text" placeholder="MatchID" value={this.state.matchID} onChange={(e) => this.setState({ matchID: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter MatchID! 
                                </Form.Text>
                            </Form.Group>
    
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Team#</Form.Label>
                                <Form.Control type="number" placeholder="Team#" value={this.state.teamNumber} onChange={(e) => this.setState({ teamNumber: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter FTC Team Number! 
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Color</Form.Label>
                                <Form.Control type="text" placeholder="MatchID" value={this.state.color} onChange={(e) => this.setState({ color: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter Match Color! 
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Results</Form.Label>
                                <Form.Control type="number" placeholder="Results" value={this.state.results} onChange={(e) => this.setState({ results: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter Results! 
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Time</Form.Label>
                                <Form.Control type="time" placeholder="Time" value={this.state.time} onChange={(e) => this.setState({ time: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter Time! 
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Red Score</Form.Label>
                                <Form.Control type="number" placeholder="Red Score" value={this.state.redScore} onChange={(e) => this.setState({ redScore: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter Red Score! 
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Blue Score</Form.Label>
                                <Form.Control type="number" placeholder="Blue Score" value={this.state.blueScore} onChange={(e) => this.setState({ blueScore: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter Blue Score! 
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideAddModal}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={this.hideAddModal}>
                            Sumbit
                    </Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit Modal */}

                <Modal show={this.state.showEdit} onHide={this.hideEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Team</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>MatchID</Form.Label>
                                <Form.Control type="text" placeholder="MatchID" value={this.state.matchID} onChange={(e) => this.setState({ matchID: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter MatchID! 
                                </Form.Text>
                            </Form.Group>
    
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Team#</Form.Label>
                                <Form.Control type="number" placeholder="Team#" value={this.state.teamNumber} onChange={(e) => this.setState({ teamNumber: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter FTC Team Number! 
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Color</Form.Label>
                                <Form.Control type="text" placeholder="MatchID" value={this.state.color} onChange={(e) => this.setState({ color: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter Match Color! 
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Results</Form.Label>
                                <Form.Control type="number" placeholder="results" value={this.state.results} onChange={(e) => this.setState({ results: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter Results! 
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Time</Form.Label>
                                <Form.Control type="time" placeholder="time" value={this.state.time} onChange={(e) => this.setState({ time: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter Time! 
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Red Score</Form.Label>
                                <Form.Control type="number" placeholder="redScore" value={this.state.redScore} onChange={(e) => this.setState({ redScore: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter Red Score! 
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Blue Score</Form.Label>
                                <Form.Control type="number" placeholder="blueScore" value={this.state.blueScore} onChange={(e) => this.setState({ blueScore: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter Blue Score! 
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideEditModal}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={this.updateTeam.bind(this)}>
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>

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
                        <Button variant="primary" onClick={this.hideDeleteModal}>
                            Yes
                    </Button>
                    </Modal.Footer>
                </Modal>

                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>MatchID</th>
                            <th>Team#</th>
                            <th>Color</th>
                            <th>Results</th>
                            <th>Time</th>
                            <th>Red Score</th>
                            <th>Blue Sccore</th>
                            <th>Modify</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Button className={styles.editBtn} onClick={this.showEditModal}><FontAwesomeIcon icon={faEdit} size="sm"/></Button>
                                <Button className={styles.editBtn} onClick={this.showDeleteModal}><FontAwesomeIcon icon={faTrashAlt} size="sm"/></Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className={styles.addBtn}>
                    <Button onClick={this.showAddModal}><FontAwesomeIcon icon={faPlusCircle} /></Button> 
                </div>
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
    // teams: state.teams.teams,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
    // fetchAllTeams: () => {
    //     dispatch(teamActions.fetchAllTeams());
    // },
    // updateTeam: (teamId: string, team: Partial<Team>) => {
    //     dispatch(teamActions.updateTeam(teamId, team));
    // }
});

// export default connect<StoreProps, DispatchProps, OwnProps, RootState>
//     (mapStateToProps, mapDispatchToProps)(MatchesPage);

export default MatchesPage;