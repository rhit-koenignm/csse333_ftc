import * as React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './TeamsPage.module.scss';
import { actions as teamActions, Team } from 'src/services/teams';
import { RootState } from 'src/store/modules';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';

interface OwnProps {
    
}

interface StoreProps {
    teams: Team[];
}

interface DispatchProps {
    fetchAllTeams: () => void;
    updateTeam: (id: string, team: Partial<Team>) => void;
    deleteTeam: (id: string) => void;
}

type Props = OwnProps & StoreProps & DispatchProps;

interface State {
    showAdd: boolean;
    showEdit: boolean;
    showDelete: boolean;
    show: boolean;
    teamId?: string;
    teamNumber?: string;
    teamName?: string;
}


class TeamsPage extends React.Component<Props, State> {

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
        console.log('mounted');
        console.log(this.props.teams);
        this.props.fetchAllTeams();
    }

    showAddModal = () => {
        this.setState({ showAdd: true });
    }

    hideAddModal = () => {
        this.setState({ showAdd: false });
    }

    showEditModal = (teamId: string) => {
        const team = this.props.teams.find(t => t.id === teamId);
        if(!team) {
            return;
        }
        this.setState({ 
            showEdit: true,
            teamId,
            teamName: team.team_name,
            teamNumber: team.team_number.toString(),
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
                <Row className={styles.welcomeMsg}><h1>Current List of Teams</h1></Row>

                {/* Submit Modal */}

                <Modal show={this.state.showAdd} onHide={this.hideAddModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Team</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Team Number</Form.Label>
                                <Form.Control type="number" placeholder="Team Number" value={this.state.teamNumber} onChange={(e) => this.setState({ teamNumber: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter FTC Team Number! 
                                </Form.Text>
                            </Form.Group>
    
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Team Name</Form.Label>
                                <Form.Control type="text" placeholder="Team Name" value={this.state.teamName} onChange={(e) => this.setState({ teamName: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter FTC Team Name! 
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
                                <Form.Label>Team Number</Form.Label>
                                <Form.Control type="number" placeholder="Team Number" value={this.state.teamNumber} onChange={(e) => this.setState({ teamNumber: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter FTC Team Number! 
                                </Form.Text>
                            </Form.Group>
    
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Team Name</Form.Label>
                                <Form.Control type="text" placeholder="Team Name" value={this.state.teamName} onChange={(e) => this.setState({ teamName: e.target.value})} />
                                <Form.Text className="text-muted">
                                    Please enter FTC Team Name! 
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
                        <Button variant="primary" onClick={this.deleteTeam}>
                            Yes
                    </Button>
                    </Modal.Footer>
                </Modal>

                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Team Number</th>
                            <th>Team Name</th>
                            <th>Modify</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.props.teams && this.props.teams.map(team => (
                            <tr>
                                <td>{team.team_number}</td>
                                <td>{team.team_name}</td>
                                <td>
                                    <Button className={styles.editBtn} onClick={() => this.showEditModal(team.id)}><FontAwesomeIcon icon={faEdit} size="sm"/></Button>
                                    <Button className={styles.editBtn} onClick={this.showDeleteModal}><FontAwesomeIcon icon={faTrashAlt} size="sm"/></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className={styles.addBtn}>
                    <Button onClick={this.showAddModal}><FontAwesomeIcon icon={faPlusCircle} /></Button> 
                </div>
            </Container>
        )
    }

    updateTeam() {
        if(this.state.teamId) {
            this.props.updateTeam(this.state.teamId, { 
                team_name: this.state.teamName,
                team_number: Number(this.state.teamNumber),
            });
        }
    }

    deleteTeam() {
        if(this.state.teamId) {
            this.props.deleteTeam(this.state.teamId);
        }
    }
}

const mapStateToProps = (state: RootState): StoreProps => ({
    teams: state.teams.teams,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
    fetchAllTeams: () => {
        dispatch(teamActions.fetchAllTeams());
    },
    updateTeam: (teamId: string, team: Partial<Team>) => {
        dispatch(teamActions.updateTeam(teamId, team));
    },
    deleteTeam: (teamId: string) => {
        dispatch(teamActions.deleteTeam(teamId));
    },
});

export default connect<StoreProps, DispatchProps, OwnProps, RootState>
    (mapStateToProps, mapDispatchToProps)(TeamsPage);