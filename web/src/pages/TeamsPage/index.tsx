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

interface TeamsPageProps {

}

interface TeamsPageState {
    showAdd: boolean;
    showEdit: boolean;
    showDelete: boolean;
    show: boolean;
    teamNumber?: string;
}


class TeamsPage extends React.Component<TeamsPageProps, TeamsPageState> {

    public constructor(props: TeamsPageProps) {
        super(props);
        this.state = {
            showAdd: false,
            showEdit: false,
            showDelete: false,
            show: false
        };
    }

    showAddModal = () => {
        this.setState({ showAdd: true });
    }

    hideAddModal = () => {
        this.setState({ showAdd: false });
    }

    showEditModal = () => {
        this.setState({ showEdit: true });
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
                                <Form.Control type="text" placeholder="Team Name" />
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
                                <Form.Control type="text" placeholder="Team Name" />
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
                        <Button variant="primary" onClick={this.hideEditModal}>
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
                            <th>Team Number</th>
                            <th>Team Name</th>
                            <th>Modify</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Test Team Name</td>
                            <td>
                                <Button className={styles.editBtn}><Button onClick={this.showEditModal}><FontAwesomeIcon icon={faEdit} size="sm"/></Button> </Button>
                                <Button className={styles.editBtn}><Button onClick={this.showDeleteModal}><FontAwesomeIcon icon={faTrashAlt} size="sm"/></Button> </Button>
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


    AddTeamModal = () => {
    
        const handleClose = () => this.setState({showAdd: false});
        const handleShow = () => this.setState({showAdd: true});
    
        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
            </Button>
    
                <Modal showAdd={this.state.showAdd} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Team</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Team Number</Form.Label>
                                <Form.Control type="text" placeholder="Team Number" />
                                <Form.Text className="text-muted">
                                    Please enter FTC Team Number! 
                                </Form.Text>
                            </Form.Group>
    
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Team Name</Form.Label>
                                <Form.Control type="text" placeholder="Team Name" />
                                <Form.Text className="text-muted">
                                    Please enter FTC Team Name! 
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default TeamsPage;