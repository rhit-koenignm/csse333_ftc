import * as React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from './HomePage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface TeamsPageProps {

}

interface TeamsPageState {
    show: boolean;
    teamNumber?: string;
}


class TeamsPage extends React.Component<TeamsPageProps, TeamsPageState> {

    public constructor(props: TeamsPageProps) {
        super(props);
        this.state = {
            show: false,
        };
    }

    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ show: false });
    }

    public render() {
        return (
            <Container>
                <Modal show={this.state.show} onHide={this.hideModal}>
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
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideModal}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={this.hideModal}>
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Team Number</th>
                            <th>Team Name</th>
                            <th>Update</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
                <Button onClick={this.showModal}>Add Team</Button>
            </Container>
        )
    }


    AddTeamModal = () => {
    
        const handleClose = () => this.setState({show: false});
        const handleShow = () => this.setState({show: true});
    
        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
            </Button>
    
                <Modal show={this.state.show} onHide={handleClose}>
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